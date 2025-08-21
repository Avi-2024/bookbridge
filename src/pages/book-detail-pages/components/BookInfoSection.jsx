import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookInfoSection = ({ book }) => {
  const [selectedCondition, setSelectedCondition] = useState(book?.conditions?.[0]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const conditionOptions = book?.conditions || [
    { type: 'New', price: book?.currentPrice, shipping: 'Free', delivery: '2-3 days' },
    { type: 'Like New', price: book?.currentPrice - 2, shipping: 'Free', delivery: '3-5 days' },
    { type: 'Good', price: book?.currentPrice - 5, shipping: '$3.99', delivery: '5-7 days' }
  ];

  const savings = book?.originalPrice - selectedCondition?.price;
  const savingsPercentage = Math.round((savings / book?.originalPrice) * 100);

  return (
    <div className="lg:col-span-7 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-headline font-bold text-foreground mb-2">
              {book?.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-1">
              by <span className="text-primary font-medium hover:underline cursor-pointer">{book?.author}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Published by {book?.publisher} • {book?.publishYear}
            </p>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <div className="flex">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={16}
                    className={i < Math.floor(book?.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{book?.rating}</span>
              <span className="text-sm text-muted-foreground">({book?.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {book?.genres?.map((genre) => (
            <span
              key={genre}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-smooth cursor-pointer"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
      {/* Pricing Section */}
      <div className="card-literary p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold text-success">${selectedCondition?.price}</span>
              {savings > 0 && (
                <>
                  <span className="price-original text-lg">${book?.originalPrice}</span>
                  <div className="deal-badge">
                    Save ${savings} ({savingsPercentage}%)
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Icon name="Truck" size={14} />
                {selectedCondition?.shipping === 'Free' ? 'Free Shipping' : selectedCondition?.shipping}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Clock" size={14} />
                Delivery: {selectedCondition?.delivery}
              </span>
            </div>
          </div>

          {/* Loyalty Points */}
          <div className="text-right">
            <div className="community-badge">
              <Icon name="Award" size={14} />
              Earn {Math.round(selectedCondition?.price * 10)} points
            </div>
            {book?.memberDiscount && (
              <p className="text-xs text-accent mt-1">
                Member saves extra ${book?.memberDiscount}
              </p>
            )}
          </div>
        </div>

        {/* Condition Options */}
        <div className="space-y-2">
          <h4 className="font-medium text-foreground">Choose Condition:</h4>
          <div className="grid gap-2">
            {conditionOptions?.map((condition) => (
              <button
                key={condition?.type}
                onClick={() => setSelectedCondition(condition)}
                className={`p-3 rounded-lg border-2 text-left transition-smooth ${
                  selectedCondition?.type === condition?.type
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{condition?.type}</span>
                    <div className="text-sm text-muted-foreground">
                      {condition?.shipping} shipping • {condition?.delivery}
                    </div>
                  </div>
                  <span className="font-bold text-success">${condition?.price}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Book Details */}
      <div className="card-literary p-6">
        <h3 className="text-lg font-headline font-semibold mb-4">Book Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">ISBN:</span>
            <span className="ml-2 font-medium">{book?.isbn}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Pages:</span>
            <span className="ml-2 font-medium">{book?.pages}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Language:</span>
            <span className="ml-2 font-medium">{book?.language}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Format:</span>
            <span className="ml-2 font-medium">{book?.format}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Reading Level:</span>
            <span className="ml-2 font-medium">{book?.readingLevel}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Dimensions:</span>
            <span className="ml-2 font-medium">{book?.dimensions}</span>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="card-literary p-6">
        <h3 className="text-lg font-headline font-semibold mb-4">Description</h3>
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            {showFullDescription ? book?.fullDescription : book?.shortDescription}
          </p>
          {book?.fullDescription?.length > book?.shortDescription?.length && (
            <Button
              variant="ghost"
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-3 p-0 h-auto text-primary hover:text-primary/80"
            >
              {showFullDescription ? 'Show Less' : 'Read More'}
              <Icon 
                name={showFullDescription ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="ml-1" 
              />
            </Button>
          )}
        </div>

        {/* Key Themes */}
        {book?.keyThemes && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Key Themes:</h4>
            <div className="flex flex-wrap gap-2">
              {book?.keyThemes?.map((theme) => (
                <span
                  key={theme}
                  className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookInfoSection;