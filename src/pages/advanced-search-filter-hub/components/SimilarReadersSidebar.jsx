import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SimilarReadersSidebar = () => {
  const navigate = useNavigate();

  const similarReaderBooks = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      currentPrice: 8.99,
      originalPrice: 16.99,
      rating: 4.6,
      purchaseCount: 1247,
      condition: "like-new"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
      currentPrice: 12.49,
      originalPrice: 18.00,
      rating: 4.8,
      purchaseCount: 892,
      condition: "new"
    },
    {
      id: 3,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      currentPrice: 9.99,
      originalPrice: 15.99,
      rating: 4.4,
      purchaseCount: 756,
      condition: "very-good"
    },
    {
      id: 4,
      title: "The Midnight Library",
      author: "Matt Haig",
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      currentPrice: 7.99,
      originalPrice: 14.99,
      rating: 4.3,
      purchaseCount: 634,
      condition: "good"
    },
    {
      id: 5,
      title: "Educated",
      author: "Tara Westover",
      coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop",
      currentPrice: 11.99,
      originalPrice: 17.00,
      rating: 4.7,
      purchaseCount: 523,
      condition: "like-new"
    }
  ];

  const handleBookClick = (bookId) => {
    navigate('/book-detail-pages', { state: { bookId } });
  };

  const handleViewAll = () => {
    navigate('/community-hub');
  };

  return (
    <div className="bg-card rounded-lg border shadow-literary p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Users" size={20} className="text-primary" />
          <h3 className="font-semibold text-lg text-foreground">Similar Readers Bought</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewAll}
          iconName="ExternalLink"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {similarReaderBooks?.map((book) => (
          <div
            key={book?.id}
            className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-smooth group"
            onClick={() => handleBookClick(book?.id)}
          >
            <div className="flex-shrink-0 w-12 h-16 overflow-hidden rounded">
              <Image
                src={book?.coverImage}
                alt={book?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
                {book?.title}
              </h4>
              
              <p className="text-xs text-muted-foreground mb-2">
                by {book?.author}
              </p>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={12} className="fill-warning text-warning" />
                  <span className="text-xs font-medium">{book?.rating}</span>
                </div>
                
                <span className="text-xs text-muted-foreground">
                  {book?.purchaseCount} bought
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-success">
                    ${book?.currentPrice}
                  </span>
                  {book?.originalPrice > book?.currentPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      ${book?.originalPrice}
                    </span>
                  )}
                </div>
                
                <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                  {book?.condition?.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Community Stats */}
      <div className="mt-6 pt-4 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-1">2,847</div>
          <div className="text-xs text-muted-foreground mb-3">
            readers with similar taste
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-foreground">4.6</div>
              <div className="text-xs text-muted-foreground">Avg Rating</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">$11.99</div>
              <div className="text-xs text-muted-foreground">Avg Price</div>
            </div>
          </div>
        </div>
      </div>
      {/* Join Community CTA */}
      <div className="mt-4 p-3 bg-gradient-literary rounded-lg text-center">
        <div className="text-white">
          <Icon name="Heart" size={20} className="mx-auto mb-2" />
          <p className="text-sm font-medium mb-2">Love these recommendations?</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/community-hub')}
            className="bg-white text-primary hover:bg-white/90"
          >
            Join Our Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SimilarReadersSidebar;