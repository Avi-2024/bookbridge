import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReviewSpotlight = ({ review, onViewBook, onHelpful, isHelpful = false }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

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
      <div className="flex items-start gap-4 mb-4">
        <Image
          src={review?.book?.cover}
          alt={review?.book?.title}
          className="w-16 h-20 object-cover rounded-md shadow-book"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-headline font-semibold text-lg text-foreground mb-1">
                {review?.book?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                by {review?.book?.author}
              </p>
            </div>
            {review?.isVerifiedPurchase && (
              <div className="community-badge">
                <Icon name="ShieldCheck" size={12} />
                Verified Purchase
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {renderStars(review?.rating)}
            </div>
            <span className="text-sm font-medium text-foreground">
              {review?.rating}/5
            </span>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <Image
            src={review?.reviewer?.avatar}
            alt={review?.reviewer?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-foreground text-sm">
              {review?.reviewer?.name}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{formatTimeAgo(review?.createdAt)}</span>
              {review?.reviewer?.totalReviews > 10 && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Icon name="Award" size={10} />
                    <span>Top Reviewer</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <h4 className="font-semibold text-foreground mb-2">
          "{review?.title}"
        </h4>
        <p className="text-muted-foreground leading-relaxed line-clamp-4">
          {review?.content}
        </p>
      </div>
      {review?.authorResponse && (
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="User" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              Author Response
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {review?.authorResponse}
          </p>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onHelpful(review)}
            className={`${isHelpful ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Icon name="ThumbsUp" size={16} />
            Helpful ({review?.helpfulCount})
          </Button>
          <div className="text-sm text-muted-foreground">
            {review?.readingTime} min read
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewBook(review?.book)}
        >
          View Book
        </Button>
      </div>
    </div>
  );
};

export default ReviewSpotlight;