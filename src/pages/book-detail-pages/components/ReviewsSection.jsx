import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ReviewsSection = ({ reviews, averageRating, totalReviews }) => {
  const [sortBy, setSortBy] = useState('helpful');
  const [filterRating, setFilterRating] = useState('all');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const sortOptions = [
    { value: 'helpful', label: 'Most Helpful' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'rating-high', label: 'Highest Rating' },
    { value: 'rating-low', label: 'Lowest Rating' }
  ];

  const ratingDistribution = [
    { stars: 5, count: 145, percentage: 72 },
    { stars: 4, count: 32, percentage: 16 },
    { stars: 3, count: 15, percentage: 8 },
    { stars: 2, count: 5, percentage: 3 },
    { stars: 1, count: 3, percentage: 1 }
  ];

  const displayedReviews = showAllReviews ? reviews : reviews?.slice(0, 3);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleHelpfulVote = (reviewId, isHelpful) => {
    // Mock implementation - would integrate with backend
    console.log(`Voted ${isHelpful ? 'helpful' : 'not helpful'} for review ${reviewId}`);
  };

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="card-literary p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Rating Overview */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-1">{averageRating}</div>
              <div className="flex items-center justify-center mb-1">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={20}
                    className={i < Math.floor(averageRating) ? 'text-warning fill-current' : 'text-muted-foreground'}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">{totalReviews} reviews</div>
            </div>

            {/* Rating Distribution */}
            <div className="flex-1 max-w-sm">
              {ratingDistribution?.map((rating) => (
                <div key={rating?.stars} className="flex items-center gap-2 mb-1">
                  <span className="text-sm w-6">{rating?.stars}</span>
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className="bg-warning h-2 rounded-full transition-smooth"
                      style={{ width: `${rating?.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{rating?.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Write Review Button */}
          <Button variant="outline" iconName="Edit3" iconPosition="left">
            Write a Review
          </Button>
        </div>
      </div>
      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="input-literary text-sm h-9 w-auto min-w-[140px]"
          >
            {sortOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>

          <select 
            value={filterRating}
            onChange={(e) => setFilterRating(e?.target?.value)}
            className="input-literary text-sm h-9 w-auto min-w-[120px]"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {displayedReviews?.length} of {reviews?.length} reviews
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews?.map((review) => (
          <div key={review?.id} className="card-literary p-6">
            <div className="flex items-start gap-4">
              {/* Reviewer Avatar */}
              <div className="flex-shrink-0">
                <Image
                  src={review?.avatar}
                  alt={review?.reviewerName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground">{review?.reviewerName}</h4>
                      {review?.verifiedPurchase && (
                        <div className="community-badge text-xs">
                          <Icon name="ShieldCheck" size={12} />
                          Verified Purchase
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)]?.map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={i < review?.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review?.date)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Title */}
                {review?.title && (
                  <h5 className="font-medium text-foreground mb-2">{review?.title}</h5>
                )}

                {/* Review Content */}
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {review?.content}
                </p>

                {/* Review Images */}
                {review?.images && review?.images?.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {review?.images?.map((image, index) => (
                      <div key={index} className="w-16 h-16 rounded-lg overflow-hidden border">
                        <Image
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Helpful Votes */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleHelpfulVote(review?.id, true)}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      <Icon name="ThumbsUp" size={14} />
                      Helpful ({review?.helpfulVotes})
                    </button>
                    <button
                      onClick={() => handleHelpfulVote(review?.id, false)}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      <Icon name="ThumbsDown" size={14} />
                      Not Helpful ({review?.notHelpfulVotes})
                    </button>
                  </div>

                  <button className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                    <Icon name="Flag" size={14} className="inline mr-1" />
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More Reviews */}
      {!showAllReviews && reviews?.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(true)}
            iconName="ChevronDown"
            iconPosition="right"
          >
            Show All {reviews?.length} Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;