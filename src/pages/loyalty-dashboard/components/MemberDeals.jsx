import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MemberDeals = ({ deals, userTier }) => {
  const formatPrice = (price) => `$${price?.toFixed(2)}`;
  
  const calculateSavings = (originalPrice, memberPrice) => {
    const savings = originalPrice - memberPrice;
    const percentage = Math.round((savings / originalPrice) * 100);
    return { amount: savings, percentage };
  };

  return (
    <div className="card-literary p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Crown" size={24} className="text-accent" />
          <h3 className="text-xl font-headline font-semibold">Member Exclusive Deals</h3>
        </div>
        <div className="deal-badge">
          {userTier} Only
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals?.map((deal) => {
          const savings = calculateSavings(deal?.originalPrice, deal?.memberPrice);
          
          return (
            <div key={deal?.id} className="border rounded-lg overflow-hidden hover:shadow-book-hover transition-smooth group">
              <div className="relative overflow-hidden h-48">
                <Image
                  src={deal?.bookCover}
                  alt={deal?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-bold">
                  -{savings?.percentage}%
                </div>
                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  Member Only
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-foreground mb-1 line-clamp-2">{deal?.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{deal?.author}</p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="price-highlight">{formatPrice(deal?.memberPrice)}</div>
                    <div className="price-original">{formatPrice(deal?.originalPrice)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-trust-green font-semibold">
                      Save {formatPrice(savings?.amount)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {deal?.timeLeft}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < Math.floor(deal?.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {deal?.rating} ({deal?.reviewCount})
                  </span>
                </div>

                <Button variant="accent" size="sm" fullWidth>
                  <Icon name="ShoppingCart" size={16} />
                  Add to Cart
                </Button>

                {deal?.bonusPoints && (
                  <div className="mt-2 text-center text-xs text-accent font-medium">
                    +{deal?.bonusPoints} bonus points
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 text-center">
        <Button variant="outline">
          View All Member Deals
          <Icon name="ArrowRight" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default MemberDeals;