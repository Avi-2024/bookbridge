import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChallengeTracker = ({ challenges, onJoinChallenge }) => {
  const formatTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffInDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 0) return 'Ended';
    if (diffInDays === 0) return 'Ends today';
    if (diffInDays === 1) return '1 day left';
    return `${diffInDays} days left`;
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-trust-green';
    if (progress >= 75) return 'bg-accent';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-primary';
  };

  const getChallengeIcon = (type) => {
    const icons = {
      reading: 'Book',
      review: 'MessageSquare',
      social: 'Share2',
      purchase: 'ShoppingBag',
      community: 'Users'
    };
    return icons?.[type] || 'Target';
  };

  return (
    <div className="card-literary p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Target" size={24} className="text-accent" />
          <h3 className="text-xl font-headline font-semibold">Reading Challenges</h3>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="Plus" size={16} />
          Browse All
        </Button>
      </div>
      <div className="space-y-6">
        {challenges?.map((challenge) => (
          <div key={challenge?.id} className="border rounded-lg p-4 hover:shadow-book-hover transition-smooth">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Icon name={getChallengeIcon(challenge?.type)} size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{challenge?.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{challenge?.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Users" size={12} />
                      {challenge?.participants?.toLocaleString()} participants
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {formatTimeRemaining(challenge?.endDate)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-accent mb-1">
                  +{challenge?.rewardPoints}
                </div>
                <div className="text-xs text-muted-foreground">points</div>
              </div>
            </div>

            {challenge?.joined ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {challenge?.progress?.current} / {challenge?.progress?.target}
                  </span>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(challenge?.progress?.percentage)}`}
                    style={{ width: `${Math.min(challenge?.progress?.percentage, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {challenge?.progress?.percentage >= 100 ? 'Completed!' : `${challenge?.progress?.percentage}% complete`}
                  </span>
                  {challenge?.progress?.percentage >= 100 && (
                    <Button variant="success" size="sm">
                      <Icon name="Gift" size={14} />
                      Claim Reward
                    </Button>
                  )}
                </div>

                {challenge?.leaderboard && (
                  <div className="bg-muted/30 rounded-lg p-3 mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Your Rank</span>
                      <span className="text-sm font-bold text-accent">
                        #{challenge?.leaderboard?.userRank}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Top 3: {challenge?.leaderboard?.topThree?.map(user => user?.name)?.join(', ')}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="text-sm text-muted-foreground">
                  Join to track your progress and compete with others
                </div>
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => onJoinChallenge(challenge?.id)}
                >
                  <Icon name="Plus" size={14} />
                  Join Challenge
                </Button>
              </div>
            )}

            {challenge?.badges && challenge?.badges?.length > 0 && (
              <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                <span className="text-xs text-muted-foreground">Earn badges:</span>
                {challenge?.badges?.map((badge, index) => (
                  <div key={index} className="flex items-center gap-1 px-2 py-1 bg-accent/10 rounded-full">
                    <Icon name={badge?.icon} size={12} className="text-accent" />
                    <span className="text-xs text-accent font-medium">{badge?.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {challenges?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Target" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No active challenges right now</p>
          <Button variant="accent">
            <Icon name="Search" size={16} />
            Explore Challenges
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChallengeTracker;