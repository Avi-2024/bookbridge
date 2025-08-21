import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendationsCarousel = ({ recommendations, title = "Readers Also Bought" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredBook, setHoveredBook] = useState(null);

  const itemsPerView = {
    mobile: 2,
    tablet: 3,
    desktop: 4
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView?.desktop >= recommendations?.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, recommendations?.length - itemsPerView?.desktop) : prev - 1
    );
  };

  const handleAddToCart = (book, e) => {
    e?.stopPropagation();
    console.log('Adding to cart:', book?.title);
  };

  const handleBookClick = (book) => {
    console.log('Navigating to book:', book?.title);
  };

  return (
    <div className="card-literary p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-headline font-semibold">{title}</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="w-8 h-8"
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex + itemsPerView?.desktop >= recommendations?.length}
            className="w-8 h-8"
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / itemsPerView?.desktop)}%)` 
          }}
        >
          {recommendations?.map((book) => (
            <div
              key={book?.id}
              className="flex-shrink-0 w-1/2 sm:w-1/3 lg:w-1/4 px-2"
              onMouseEnter={() => setHoveredBook(book?.id)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              <div 
                className="group cursor-pointer"
                onClick={() => handleBookClick(book)}
              >
                {/* Book Cover */}
                <div className="relative mb-3 overflow-hidden rounded-lg shadow-book group-hover:shadow-book-hover transition-smooth">
                  <Image
                    src={book?.coverImage}
                    alt={book?.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                  />
                  
                  {/* Hover Overlay */}
                  {hoveredBook === book?.id && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={(e) => handleAddToCart(book, e)}
                        iconName="ShoppingCart"
                        iconPosition="left"
                        className="shadow-literary-elevated"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  )}

                  {/* Deal Badge */}
                  {book?.dealPercentage && (
                    <div className="absolute top-2 left-2">
                      <div className="deal-badge text-xs">
                        {book?.dealPercentage}% OFF
                      </div>
                    </div>
                  )}

                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={12} className="text-warning fill-current" />
                      <span className="text-xs font-medium">{book?.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Book Info */}
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground text-sm leading-tight line-clamp-2 group-hover:text-primary transition-smooth">
                    {book?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    by {book?.author}
                  </p>

                  {/* Pricing */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="price-highlight text-base">${book?.currentPrice}</span>
                      {book?.originalPrice > book?.currentPrice && (
                        <span className="price-original text-xs">${book?.originalPrice}</span>
                      )}
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-smooth">
                      <button 
                        className="p-1 hover:bg-muted rounded"
                        onClick={(e) => {
                          e?.stopPropagation();
                          console.log('Added to wishlist:', book?.title);
                        }}
                      >
                        <Icon name="Heart" size={14} className="text-muted-foreground hover:text-error" />
                      </button>
                      <button 
                        className="p-1 hover:bg-muted rounded"
                        onClick={(e) => {
                          e?.stopPropagation();
                          console.log('Compare book:', book?.title);
                        }}
                      >
                        <Icon name="BarChart3" size={14} className="text-muted-foreground hover:text-primary" />
                      </button>
                    </div>
                  </div>

                  {/* Condition & Shipping */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Package" size={10} />
                      {book?.condition}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Truck" size={10} />
                      {book?.shipping === 'Free' ? 'Free Ship' : book?.shipping}
                    </span>
                  </div>

                  {/* Loyalty Points */}
                  <div className="community-badge text-xs">
                    <Icon name="Award" size={10} />
                    {Math.round(book?.currentPrice * 10)} pts
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ 
          length: Math.ceil(recommendations?.length / itemsPerView?.desktop) 
        })?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * itemsPerView?.desktop)}
            className={`w-2 h-2 rounded-full transition-smooth ${
              Math.floor(currentIndex / itemsPerView?.desktop) === index
                ? 'bg-primary' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
      {/* View All Link */}
      <div className="text-center mt-4">
        <Button variant="ghost" className="text-primary hover:text-primary/80">
          View All Recommendations
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default RecommendationsCarousel;