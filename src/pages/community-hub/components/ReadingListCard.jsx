import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReadingListCard = ({ list, onView, onLike, onComment, isLiked = false }) => {
  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - new Date(date));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="card-literary p-6 hover:shadow-literary-elevated transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Image
            src={list?.creator?.avatar}
            alt={list?.creator?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-headline font-semibold text-lg text-foreground">
              {list?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              by {list?.creator?.name} • {formatTimeAgo(list?.createdAt)}
            </p>
          </div>
        </div>
        {list?.isFeatured && (
          <div className="deal-badge">
            <Icon name="Star" size={12} />
            Featured
          </div>
        )}
      </div>
      <p className="text-muted-foreground mb-4 line-clamp-2">
        {list?.description}
      </p>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex -space-x-1">
          {list?.books?.slice(0, 4)?.map((book, index) => (
            <Image
              key={index}
              src={book?.cover}
              alt={book?.title}
              className="w-8 h-10 object-cover rounded border-2 border-background shadow-sm"
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {list?.books?.length} books • Avg. ${list?.averagePrice}
        </span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Eye" size={14} />
            <span>{list?.views?.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Bookmark" size={14} />
            <span>{list?.saves}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {list?.tags?.slice(0, 2)?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-xs rounded-full text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(list)}
            className={`${isLiked ? 'text-accent' : 'text-muted-foreground'}`}
          >
            <Icon name={isLiked ? "Heart" : "Heart"} size={16} fill={isLiked ? "currentColor" : "none"} />
            {list?.likes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onComment(list)}
            className="text-muted-foreground"
          >
            <Icon name="MessageCircle" size={16} />
            {list?.comments}
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView(list)}
        >
          View List
        </Button>
      </div>
    </div>
  );
};

export default ReadingListCard;