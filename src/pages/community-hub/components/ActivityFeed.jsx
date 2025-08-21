import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityFeed = ({ activities, onLoadMore, hasMore = true }) => {
  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - new Date(date));
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.ceil(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.ceil(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'review': return 'Star';
      case 'challenge_complete': return 'Trophy';
      case 'book_club_join': return 'Users';
      case 'reading_list': return 'BookOpen';
      case 'achievement': return 'Award';
      case 'buddy_connect': return 'UserPlus';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'review': return 'text-warning';
      case 'challenge_complete': return 'text-success';
      case 'book_club_join': return 'text-primary';
      case 'reading_list': return 'text-secondary';
      case 'achievement': return 'text-accent';
      case 'buddy_connect': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const renderActivityContent = (activity) => {
    switch (activity?.type) {
      case 'review':
        return (
          <div className="flex items-start gap-3">
            <Image
              src={activity?.book?.cover}
              alt={activity?.book?.title}
              className="w-12 h-16 object-cover rounded shadow-sm"
            />
            <div className="flex-1">
              <p className="text-sm text-foreground mb-1">
                <span className="font-medium">{activity?.user?.name}</span> reviewed{' '}
                <span className="font-medium">{activity?.book?.title}</span>
              </p>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Icon
                      key={index}
                      name="Star"
                      size={12}
                      className={index < activity?.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity?.rating}/5 stars
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                "{activity?.reviewText}"
              </p>
            </div>
          </div>
        );

      case 'challenge_complete':
        return (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="Trophy" size={20} className="text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground">
                <span className="font-medium">{activity?.user?.name}</span> completed the{' '}
                <span className="font-medium">{activity?.challenge?.title}</span> challenge!
              </p>
              <p className="text-xs text-muted-foreground">
                Earned {activity?.pointsEarned} loyalty points
              </p>
            </div>
          </div>
        );

      case 'reading_list':
        return (
          <div className="flex items-start gap-3">
            <div className="flex -space-x-1">
              {activity?.books?.slice(0, 3)?.map((book, index) => (
                <Image
                  key={index}
                  src={book?.cover}
                  alt={book?.title}
                  className="w-8 h-10 object-cover rounded border-2 border-background shadow-sm"
                />
              ))}
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground mb-1">
                <span className="font-medium">{activity?.user?.name}</span> created a new reading list:{' '}
                <span className="font-medium">"{activity?.listTitle}"</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {activity?.books?.length} books • {activity?.likes} likes
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center gap-3">
            <Image
              src={activity?.user?.avatar}
              alt={activity?.user?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-sm text-foreground">
                <span className="font-medium">{activity?.user?.name}</span> {activity?.description}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {activities?.map((activity, index) => (
        <div key={index} className="card-literary p-4 hover:shadow-book-hover transition-smooth">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon 
                name={getActivityIcon(activity?.type)} 
                size={16} 
                className={getActivityColor(activity?.type)}
              />
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(activity?.timestamp)}
              </span>
            </div>
            {activity?.isNew && (
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse-gentle" />
            )}
          </div>
          
          {renderActivityContent(activity)}
          
          {activity?.engagement && (
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-smooth">
                <Icon name="Heart" size={14} />
                {activity?.engagement?.likes}
              </button>
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-smooth">
                <Icon name="MessageCircle" size={14} />
                {activity?.engagement?.comments}
              </button>
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-smooth">
                <Icon name="Share" size={14} />
                Share
              </button>
            </div>
          )}
        </div>
      ))}
      {hasMore && (
        <div className="text-center pt-4">
          <Button
            variant="outline"
            onClick={onLoadMore}
            className="w-full"
          >
            <Icon name="ChevronDown" size={16} />
            Load More Activities
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;