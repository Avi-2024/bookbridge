import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MissedDealsSection = ({ missedDeals }) => {
  const [showAll, setShowAll] = useState(false);
  const displayDeals = showAll ? missedDeals : missedDeals?.slice(0, 6);

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateSavingsPercentage = (original, sale) => {
    return Math.round(((original - sale) / original) * 100);
  };

  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Clock" size={32} className="text-error" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Deals You Missed</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Don't let FOMO get the best of you! See what amazing deals other readers snagged. 
          Set up deal alerts so you never miss out again.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {displayDeals?.map((deal) => (
          <div key={deal?.id} className="card-literary p-6 relative opacity-75 hover:opacity-90 transition-smooth">
            {/* Expired Badge */}
            <div className="absolute top-4 right-4">
              <div className="bg-error/10 text-error px-2 py-1 rounded-full text-xs font-semibold">
                EXPIRED
              </div>
            </div>

            {/* Book Image */}
            <div className="h-48 mb-4 overflow-hidden rounded-lg relative">
              <Image
                src={deal?.image}
                alt={deal?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Book Details */}
            <div className="space-y-3">
              <div>
                <h3 className="text-base font-semibold text-foreground line-clamp-2 mb-1">
                  {deal?.title}
                </h3>
                <p className="text-sm text-muted-foreground">by {deal?.author}</p>
              </div>

              {/* What They Missed */}
              <div className="bg-error/5 rounded-lg p-3 border border-error/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-error">Deal Price:</span>
                  <span className="text-lg font-bold text-error">${deal?.salePrice?.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Regular Price:</span>
                  <span className="text-muted-foreground line-through">${deal?.originalPrice?.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-success">You Could Have Saved:</span>
                  <span className="text-success">
                    ${(deal?.originalPrice - deal?.salePrice)?.toFixed(2)} ({calculateSavingsPercentage(deal?.originalPrice, deal?.salePrice)}%)
                  </span>
                </div>
              </div>

              {/* Deal Info */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={14} />
                  <span>Ended {formatDate(deal?.endDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={14} />
                  <span>{deal?.purchaseCount} bought</span>
                </div>
              </div>

              {/* Current Status */}
              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Price:</span>
                  <span className="text-base font-semibold text-foreground">
                    ${deal?.currentPrice?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show More/Less Button */}
      {missedDeals?.length > 6 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            iconName={showAll ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAll ? "Show Less" : `Show ${missedDeals?.length - 6} More Missed Deals`}
          </Button>
        </div>
      )}
      {/* Call to Action */}
      <div className="bg-accent/5 rounded-xl p-8 text-center mt-8 border border-accent/20">
        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Bell" size={24} className="text-accent" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Never Miss Another Deal</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Get instant notifications when books you love go on sale. Set up personalized deal alerts now!
        </p>
        <Button
          variant="accent"
          iconName="Bell"
          iconPosition="left"
          onClick={() => document.getElementById('deal-alerts')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Set Up Deal Alerts
        </Button>
      </div>
    </section>
  );
};

export default MissedDealsSection;