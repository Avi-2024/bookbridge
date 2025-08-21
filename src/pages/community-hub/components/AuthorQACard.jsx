import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AuthorQACard = ({ session, onJoin, onSetReminder, hasReminder = false }) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date?.toLocaleDateString('en-US', options);
  };

  const getTimeUntilSession = () => {
    const now = new Date();
    const sessionDate = new Date(session.scheduledDate);
    const diffTime = sessionDate - now;
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 0) return 'Live Now';
    if (diffHours < 24) return `In ${diffHours} hours`;
    const diffDays = Math.ceil(diffHours / 24);
    return `In ${diffDays} days`;
  };

  const isLive = () => {
    const now = new Date();
    const sessionDate = new Date(session.scheduledDate);
    const endDate = new Date(sessionDate.getTime() + (session.duration * 60 * 1000));
    return now >= sessionDate && now <= endDate;
  };

  const isPast = () => {
    const now = new Date();
    const sessionDate = new Date(session.scheduledDate);
    const endDate = new Date(sessionDate.getTime() + (session.duration * 60 * 1000));
    return now > endDate;
  };

  return (
    <div className={`card-literary p-6 hover:shadow-literary-elevated transition-smooth ${
      isLive() ? 'ring-2 ring-accent' : ''
    }`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <Image
            src={session?.author?.photo}
            alt={session?.author?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {isLive() && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-headline font-semibold text-lg text-foreground">
                {session?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                with {session?.author?.name}
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              isLive() ? 'bg-accent text-accent-foreground animate-pulse-gentle' :
              isPast() ? 'bg-muted text-muted-foreground': 'bg-primary/10 text-primary'
            }`}>
              {isLive() ? 'LIVE' : isPast() ? 'Ended' : getTimeUntilSession()}
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size={14} />
              <span>{formatDateTime(session?.scheduledDate)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Clock" size={14} />
              <span>{session?.duration} min</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground mb-4 line-clamp-2">
        {session?.description}
      </p>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Image
            src={session?.featuredBook?.cover}
            alt={session?.featuredBook?.title}
            className="w-8 h-10 object-cover rounded shadow-sm"
          />
          <div>
            <p className="text-sm font-medium text-foreground">
              {session?.featuredBook?.title}
            </p>
            <p className="text-xs text-muted-foreground">
              Featured Book
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Users" size={14} />
            <span>{session?.registeredCount} registered</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="MessageCircle" size={14} />
            <span>{session?.questionsCount} questions</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Icon name="Globe" size={14} />
          <span>Online Event</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {!isPast() && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSetReminder(session)}
              className="flex-1"
            >
              <Icon name={hasReminder ? "Bell" : "BellPlus"} size={16} />
              {hasReminder ? 'Reminder Set' : 'Set Reminder'}
            </Button>
            <Button
              variant={isLive() ? "accent" : "default"}
              size="sm"
              onClick={() => onJoin(session)}
              className="flex-1"
            >
              <Icon name={isLive() ? "Video" : "UserPlus"} size={16} />
              {isLive() ? 'Join Live' : 'Register'}
            </Button>
          </>
        )}
        {isPast() && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onJoin(session)}
            className="flex-1"
          >
            <Icon name="Play" size={16} />
            Watch Recording
          </Button>
        )}
      </div>
    </div>
  );
};

export default AuthorQACard;