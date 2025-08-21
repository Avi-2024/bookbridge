import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookCard = ({ book, viewMode = 'grid' }) => {
  const [isWishlisted, setIsWishlisted] = useState(book?.isWishlisted || false);
  const navigate = useNavigate();

  const handleWishlistToggle = (e) => {
    e?.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleBookClick = () => {
    navigate('/book-detail-pages', { state: { bookId: book?.id } });
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'new': return 'text-success bg-success/10';
      case 'like-new': return 'text-primary bg-primary/10';
      case 'very-good': return 'text-warning bg-warning/10';
      case 'good': return 'text-warning bg-warning/10';
      case 'acceptable': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatCondition = (condition) => {
    return condition?.split('-')?.map(word => 
      word?.charAt(0)?.toUpperCase() + word?.slice(1)
    )?.join(' ');
  };

  if (viewMode === 'list') {
    return (
      <div 
        className="card-literary p-4 cursor-pointer hover:shadow-literary-elevated transition-smooth"
        onClick={handleBookClick}
      >
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-20 h-28 overflow-hidden rounded-lg">
            <Image
              src={book?.coverImage}
              alt={book?.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-foreground truncate mb-1">
                  {book?.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-2">
                  by {book?.author}
                </p>
                
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={16} className="fill-warning text-warning" />
                    <span className="text-sm font-medium">{book?.rating}</span>
                    <span className="text-xs text-muted-foreground">({book?.reviewCount})</span>
                  </div>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(book?.condition)}`}>
                    {formatCondition(book?.condition)}
                  </span>
                  
                  {book?.loyaltyExclusive && (
                    <span className="community-badge">
                      <Icon name="Crown" size={12} />
                      Loyalty
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {book?.description}
                </p>
              </div>
              
              <div className="flex-shrink-0 text-right">
                <div className="flex items-center gap-2 mb-2">
                  <span className="price-highlight text-xl">${book?.currentPrice}</span>
                  {book?.originalPrice > book?.currentPrice && (
                    <span className="price-original">${book?.originalPrice}</span>
                  )}
                </div>
                
                {book?.originalPrice > book?.currentPrice && (
                  <div className="deal-badge mb-2">
                    Save ${(book?.originalPrice - book?.currentPrice)?.toFixed(2)}
                  </div>
                )}
                
                <div className="text-xs text-muted-foreground mb-3">
                  {book?.freeShipping ? 'Free shipping' : `+$${book?.shippingCost} shipping`}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    iconName="ShoppingCart"
                    iconPosition="left"
                  >
                    Add to Cart
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleWishlistToggle}
                    className="flex-shrink-0"
                  >
                    <Icon 
                      name="Heart" 
                      size={16} 
                      className={isWishlisted ? 'fill-error text-error' : 'text-muted-foreground'} 
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="card-literary p-4 cursor-pointer hover:shadow-literary-elevated transition-smooth group"
      onClick={handleBookClick}
    >
      <div className="relative mb-4">
        <div className="aspect-[3/4] overflow-hidden rounded-lg">
          <Image
            src={book?.coverImage}
            alt={book?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
        </div>
        
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-book hover:shadow-book-hover transition-smooth"
        >
          <Icon 
            name="Heart" 
            size={16} 
            className={isWishlisted ? 'fill-error text-error' : 'text-muted-foreground'} 
          />
        </button>
        
        {book?.loyaltyExclusive && (
          <div className="absolute top-2 left-2">
            <span className="community-badge">
              <Icon name="Crown" size={12} />
              Loyalty
            </span>
          </div>
        )}
        
        {book?.originalPrice > book?.currentPrice && (
          <div className="absolute bottom-2 left-2">
            <span className="deal-badge">
              Save ${(book?.originalPrice - book?.currentPrice)?.toFixed(2)}
            </span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground line-clamp-2 text-sm">
          {book?.title}
        </h3>
        
        <p className="text-muted-foreground text-xs">
          by {book?.author}
        </p>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Icon name="Star" size={14} className="fill-warning text-warning" />
            <span className="text-xs font-medium">{book?.rating}</span>
          </div>
          
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getConditionColor(book?.condition)}`}>
            {formatCondition(book?.condition)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="price-highlight text-lg">${book?.currentPrice}</span>
            {book?.originalPrice > book?.currentPrice && (
              <span className="price-original text-xs">${book?.originalPrice}</span>
            )}
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          {book?.freeShipping ? 'Free shipping' : `+$${book?.shippingCost} shipping`}
        </div>
        
        <Button
          variant="default"
          size="sm"
          className="w-full"
          iconName="ShoppingCart"
          iconPosition="left"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default BookCard;