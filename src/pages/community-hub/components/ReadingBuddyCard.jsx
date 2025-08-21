import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReadingBuddyCard = ({ buddy, onConnect, onViewProfile, isConnected = false }) => {
  const getCompatibilityColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-muted-foreground';
  };

  const renderGenreTags = (genres) => {
    return genres?.slice(0, 3)?.map((genre, index) => (
      <span
        key={index}
        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
      >
        {genre}
      </span>
    ));
  };

  return (
    <div className="card-literary p-6 hover:shadow-literary-elevated transition-smooth">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <Image
            src={buddy?.avatar}
            alt={buddy?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-background ${
            buddy?.isOnline ? 'bg-success' : 'bg-muted-foreground'
          }`} />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                {buddy?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {buddy?.location}
              </p>
            </div>
            <div className="text-right">
              <div className={`text-lg font-bold ${getCompatibilityColor(buddy?.compatibilityScore)}`}>
                {buddy?.compatibilityScore}%
              </div>
              <p className="text-xs text-muted-foreground">
                Match
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Icon name="BookOpen" size={14} />
              <span>{buddy?.booksRead} books read</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Star" size={14} />
              <span>{buddy?.averageRating} avg rating</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {buddy?.bio}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {renderGenreTags(buddy?.favoriteGenres)}
          {buddy?.favoriteGenres?.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{buddy?.favoriteGenres?.length - 3} more
            </span>
          )}
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="BookOpen" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">
            Currently Reading
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src={buddy?.currentlyReading?.cover}
            alt={buddy?.currentlyReading?.title}
            className="w-8 h-10 object-cover rounded shadow-sm"
          />
          <div>
            <p className="text-sm font-medium text-foreground">
              {buddy?.currentlyReading?.title}
            </p>
            <p className="text-xs text-muted-foreground">
              by {buddy?.currentlyReading?.author}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="MessageCircle" size={14} />
            <span>{buddy?.responseTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Users" size={14} />
            <span>{buddy?.mutualConnections} mutual</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {buddy?.lastActive}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewProfile(buddy)}
          className="flex-1"
        >
          <Icon name="User" size={16} />
          View Profile
        </Button>
        {!isConnected ? (
          <Button
            variant="default"
            size="sm"
            onClick={() => onConnect(buddy)}
            className="flex-1"
          >
            <Icon name="UserPlus" size={16} />
            Connect
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
          >
            <Icon name="MessageCircle" size={16} />
            Message
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReadingBuddyCard;