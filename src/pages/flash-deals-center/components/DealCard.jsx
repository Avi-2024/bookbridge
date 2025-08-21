import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import CountdownTimer from './CountdownTimer';

const DealCard = ({ deal, size = "medium" }) => {
  const navigate = useNavigate();

  const handleViewDeal = () => {
    navigate('/book-detail-pages', { state: { bookId: deal?.id } });
  };

  const calculateSavingsPercentage = () => {
    return Math.round(((deal?.originalPrice - deal?.salePrice) / deal?.originalPrice) * 100);
  };

  const getQuantityColor = () => {
    if (deal?.quantityRemaining <= 5) return "text-error";
    if (deal?.quantityRemaining <= 20) return "text-warning";
    return "text-success";
  };

  const sizeClasses = {
    small: {
      container: "p-4",
      image: "h-32",
      title: "text-sm font-semibold",
      price: "text-lg",
      originalPrice: "text-sm"
    },
    medium: {
      container: "p-6",
      image: "h-48",
      title: "text-base font-semibold",
      price: "text-xl",
      originalPrice: "text-base"
    },
    large: {
      container: "p-8",
      image: "h-64",
      title: "text-lg font-bold",
      price: "text-2xl",
      originalPrice: "text-lg"
    }
  };

  const currentSize = sizeClasses?.[size];

  return (
    <div className={`card-literary hover:shadow-literary-elevated transition-smooth ${currentSize?.container} relative overflow-hidden`}>
      {/* Deal Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="deal-badge">
          {calculateSavingsPercentage()}% OFF
        </div>
      </div>
      {/* Quantity Alert */}
      {deal?.quantityRemaining <= 10 && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-error text-error-foreground px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
            Only {deal?.quantityRemaining} left!
          </div>
        </div>
      )}
      {/* Book Image */}
      <div className={`${currentSize?.image} mb-4 overflow-hidden rounded-lg`}>
        <Image
          src={deal?.image}
          alt={deal?.title}
          className="w-full h-full object-cover hover:scale-105 transition-smooth"
        />
      </div>
      {/* Book Details */}
      <div className="space-y-3">
        <div>
          <h3 className={`${currentSize?.title} text-foreground line-clamp-2 mb-1`}>
            {deal?.title}
          </h3>
          <p className="text-sm text-muted-foreground">by {deal?.author}</p>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-3">
          <span className={`${currentSize?.price} price-highlight font-bold`}>
            ${deal?.salePrice?.toFixed(2)}
          </span>
          <span className={`${currentSize?.originalPrice} price-original`}>
            ${deal?.originalPrice?.toFixed(2)}
          </span>
        </div>

        {/* Deal Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Icon name="Package" size={16} className={getQuantityColor()} />
            <span className={getQuantityColor()}>
              {deal?.quantityRemaining} remaining
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Star" size={16} className="text-warning fill-current" />
            <span className="text-muted-foreground">{deal?.rating}</span>
          </div>
        </div>

        {/* Countdown Timer */}
        {deal?.endTime && (
          <div className="bg-muted/50 rounded-lg p-3">
            <CountdownTimer 
              endTime={deal?.endTime} 
              title="Deal ends in"
              size="small"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="accent"
            onClick={handleViewDeal}
            className="flex-1"
            iconName="Eye"
            iconPosition="left"
          >
            View Deal
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {/* Add to wishlist logic */}}
          >
            <Icon name="Heart" size={18} />
          </Button>
        </div>

        {/* Deal Type Badge */}
        <div className="flex items-center gap-2">
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            deal?.type === 'lightning' ? 'bg-accent/10 text-accent' :
            deal?.type === 'daily' ? 'bg-primary/10 text-primary' :
            deal?.type === 'member'? 'bg-secondary/10 text-secondary' : 'bg-muted text-muted-foreground'
          }`}>
            <Icon 
              name={
                deal?.type === 'lightning' ? 'Zap' :
                deal?.type === 'daily' ? 'Clock' :
                deal?.type === 'member'? 'Crown' : 'Tag'
              } 
              size={12} 
            />
            {deal?.type === 'lightning' ? 'Lightning Deal' :
             deal?.type === 'daily' ? 'Daily Steal' :
             deal?.type === 'member'? 'Member Exclusive' : 'Special Offer'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealCard;