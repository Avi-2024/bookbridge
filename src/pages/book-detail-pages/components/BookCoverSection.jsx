import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookCoverSection = ({ book }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = [
    book?.coverImage,
    book?.backCover,
    book?.spineImage,
    book?.authorPhoto
  ]?.filter(Boolean);

  return (
    <div className="lg:col-span-5">
      <div className="sticky top-20">
        {/* Main Image */}
        <div className="relative mb-4">
          <div 
            className={`relative overflow-hidden rounded-lg shadow-book hover:shadow-book-hover transition-smooth cursor-zoom-in ${
              isZoomed ? 'transform scale-110' : ''
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <Image
              src={images?.[selectedImageIndex]}
              alt={`${book?.title} - Cover Image`}
              className="w-full h-96 lg:h-[500px] object-cover"
            />
            
            {/* Zoom Icon */}
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 opacity-0 hover:opacity-100 transition-smooth">
              <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={20} />
            </div>
          </div>

          {/* Deal Badge */}
          {book?.dealPercentage && (
            <div className="absolute top-4 left-4">
              <div className="deal-badge">
                <Icon name="Zap" size={14} />
                {book?.dealPercentage}% OFF
              </div>
            </div>
          )}

          {/* Condition Badge */}
          <div className="absolute bottom-4 left-4">
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
              book?.condition === 'New' ?'bg-success/10 text-success' 
                : book?.condition === 'Like New' ?'bg-primary/10 text-primary' :'bg-warning/10 text-warning'
            }`}>
              <Icon name="Star" size={14} />
              {book?.condition}
            </div>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        {images?.length > 1 && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {images?.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-16 h-20 rounded-md overflow-hidden border-2 transition-smooth ${
                  selectedImageIndex === index 
                    ? 'border-primary shadow-literary' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Image
                  src={image}
                  alt={`${book?.title} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 space-y-3">
          <Button 
            variant="default" 
            fullWidth 
            iconName="ShoppingCart" 
            iconPosition="left"
            className="h-12"
          >
            Add to Cart - ${book?.currentPrice}
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              iconName="Heart" 
              iconPosition="left"
              className="h-10"
            >
              Wishlist
            </Button>
            <Button 
              variant="outline" 
              iconName="Bell" 
              iconPosition="left"
              className="h-10"
            >
              Price Alert
            </Button>
          </div>

          <Button 
            variant="ghost" 
            fullWidth 
            iconName="Share2" 
            iconPosition="left"
            className="h-10"
          >
            Share with Book Club
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCoverSection;