import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChallengeCard = ({ challenge, onJoin, onViewDetails, isParticipating = false }) => {
  const getProgressPercentage = () => {
    if (!challenge?.userProgress) return 0;
    return Math.min((challenge?.userProgress / challenge?.target) * 100, 100);
  };

  const getDaysRemaining = () => {
    const endDate = new Date(challenge.endDate);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  return (
    <div className="card-literary p-6 hover:shadow-literary-elevated transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            challenge?.type === 'reading' ? 'bg-primary/10' : 
            challenge?.type === 'review' ? 'bg-accent/10' : 'bg-secondary/10'
          }`}>
            <Icon 
              name={challenge?.type === 'reading' ? 'BookOpen' : 
                    challenge?.type === 'review' ? 'Star' : 'Users'} 
              size={24} 
              className={
                challenge?.type === 'reading' ? 'text-primary' : 
                challenge?.type === 'review' ? 'text-accent' : 'text-secondary'
              }
            />
          </div>
          <div>
            <h3 className="font-headline font-semibold text-lg text-foreground">
              {challenge?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {challenge?.participants?.toLocaleString()} participants
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="deal-badge">
            {getDaysRemaining()} days left
          </div>
        </div>
      </div>
      <p className="text-muted-foreground mb-4 line-clamp-2">
        {challenge?.description}
      </p>
      {isParticipating && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Your Progress
            </span>
            <span className="text-sm text-muted-foreground">
              {challenge?.userProgress || 0} / {challenge?.target} {challenge?.unit}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary rounded-full h-2 transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Trophy" size={16} />
            <span>{challenge?.reward}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Target" size={16} />
            <span>{challenge?.target} {challenge?.unit}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(challenge)}
          >
            Details
          </Button>
          {!isParticipating ? (
            <Button
              variant="default"
              size="sm"
              onClick={() => onJoin(challenge)}
            >
              Join Challenge
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              disabled
            >
              Participating
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;