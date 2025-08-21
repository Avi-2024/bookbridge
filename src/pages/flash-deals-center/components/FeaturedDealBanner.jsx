import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import CountdownTimer from './CountdownTimer';

const FeaturedDealBanner = ({ deal }) => {
  const navigate = useNavigate();

  const handleViewDeal = () => {
    navigate('/book-detail-pages', { state: { bookId: deal?.id } });
  };

  const calculateSavingsPercentage = () => {
    return Math.round(((deal?.originalPrice - deal?.salePrice) / deal?.originalPrice) * 100);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-literary text-white mb-8">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
        {/* Content Side */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="deal-badge bg-accent text-accent-foreground">
                FEATURED DEAL
              </div>
              <div className="deal-badge bg-white/20 text-white">
                {calculateSavingsPercentage()}% OFF
              </div>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
              {deal?.title}
            </h1>
            
            <p className="text-lg opacity-90">
              by {deal?.author}
            </p>
            
            <p className="text-white/80 leading-relaxed">
              {deal?.description}
            </p>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-white">
                ${deal?.salePrice?.toFixed(2)}
              </span>
              <span className="text-xl text-white/60 line-through">
                ${deal?.originalPrice?.toFixed(2)}
              </span>
              <span className="text-lg font-semibold text-accent bg-white/20 px-3 py-1 rounded-full">
                Save ${(deal?.originalPrice - deal?.salePrice)?.toFixed(2)}
              </span>
            </div>

            {/* Deal Stats */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Package" size={16} />
                <span>{deal?.quantityRemaining} remaining</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Star" size={16} className="fill-current" />
                <span>{deal?.rating} ({deal?.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Truck" size={16} />
                <span>Free shipping</span>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <CountdownTimer 
              endTime={deal?.endTime} 
              title="This amazing deal ends in"
              size="medium"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="accent"
              size="lg"
              onClick={handleViewDeal}
              className="flex-1"
              iconName="ShoppingCart"
              iconPosition="left"
            >
              Grab This Deal Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
              iconName="Heart"
              iconPosition="left"
            >
              Save for Later
            </Button>
          </div>

          {/* Social Sharing */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/20">
            <span className="text-sm text-white/80">Share this deal:</span>
            <div className="flex gap-2">
              <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-smooth">
                <Icon name="Facebook" size={16} />
              </button>
              <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-smooth">
                <Icon name="Twitter" size={16} />
              </button>
              <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-smooth">
                <Icon name="Share2" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-80 h-96 overflow-hidden rounded-xl shadow-book-hover">
              <Image
                src={deal?.image}
                alt={deal?.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-literary-elevated animate-float">
              <Icon name="Zap" size={24} className="text-white" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white text-foreground px-4 py-2 rounded-full shadow-literary-elevated">
              <div className="flex items-center gap-2">
                <Icon name="TrendingUp" size={16} className="text-success" />
                <span className="font-semibold text-sm">Bestseller</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDealBanner;