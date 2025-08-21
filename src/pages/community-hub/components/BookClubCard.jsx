import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookClubCard = ({ club, onJoin, onViewDiscussion, isMember = false }) => {
  const getActivityLevel = () => {
    if (club?.recentActivity >= 50) return { level: 'High', color: 'text-success', bg: 'bg-success/10' };
    if (club?.recentActivity >= 20) return { level: 'Medium', color: 'text-warning', bg: 'bg-warning/10' };
    return { level: 'Low', color: 'text-muted-foreground', bg: 'bg-muted' };
  };

  const activity = getActivityLevel();

  return (
    <div className="card-literary p-6 hover:shadow-literary-elevated transition-smooth">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <Image
            src={club?.currentBook?.cover}
            alt={club?.currentBook?.title}
            className="w-16 h-20 object-cover rounded-md shadow-book"
          />
          {club?.isNew && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <Icon name="Sparkles" size={12} color="white" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-headline font-semibold text-lg text-foreground">
              {club?.name}
            </h3>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${activity?.bg} ${activity?.color}`}>
              {activity?.level} Activity
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Currently reading: <span className="font-medium text-foreground">{club?.currentBook?.title}</span>
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Users" size={14} />
              <span>{club?.members?.toLocaleString()} members</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="MessageCircle" size={14} />
              <span>{club?.discussions} discussions</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground mb-4 line-clamp-2">
        {club?.description}
      </p>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {club?.recentMembers?.slice(0, 3)?.map((member, index) => (
              <Image
                key={index}
                src={member?.avatar}
                alt={member?.name}
                className="w-8 h-8 rounded-full border-2 border-background object-cover"
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            +{club?.members - 3} more
          </span>
        </div>
        <div className="text-sm text-muted-foreground">
          Next meeting: {club?.nextMeeting}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDiscussion(club)}
          className="flex-1"
        >
          <Icon name="MessageCircle" size={16} />
          View Discussion
        </Button>
        {!isMember ? (
          <Button
            variant="default"
            size="sm"
            onClick={() => onJoin(club)}
            className="flex-1"
          >
            <Icon name="UserPlus" size={16} />
            Join Club
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            disabled
            className="flex-1"
          >
            <Icon name="Check" size={16} />
            Member
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookClubCard;