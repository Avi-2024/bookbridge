import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoyaltyDashboard = () => {
  const [currentPoints, setCurrentPoints] = useState(0);
  const [animatedPoints, setAnimatedPoints] = useState(0);
  const navigate = useNavigate();

  const loyaltyData = {
    currentPoints: 2847,
    currentTier: "Gold Reader",
    nextTier: "Platinum Scholar",
    pointsToNext: 1153,
    totalPointsForNext: 4000,
    memberSince: "March 2023",
    booksRead: 47,
    totalSaved: 284.50
  };

  const memberDeals = [
    {
      id: 1,
      title: "Member Flash Sale",
      description: "Extra 20% off already discounted books",
      discount: "20% OFF",
      timeLeft: "4h 32m",
      icon: "Zap",
      color: "bg-accent"
    },
    {
      id: 2,
      title: "Early Access",
      description: "New releases available 24h early",
      discount: "EARLY",
      timeLeft: "2 days",
      icon: "Clock",
      color: "bg-primary"
    },
    {
      id: 3,
      title: "Free Shipping",
      description: "No minimum order for Gold+ members",
      discount: "FREE",
      timeLeft: "Always",
      icon: "Truck",
      color: "bg-trust-green"
    }
  ];

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = loyaltyData?.currentPoints / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= loyaltyData?.currentPoints) {
        setAnimatedPoints(loyaltyData?.currentPoints);
        clearInterval(timer);
      } else {
        setAnimatedPoints(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [loyaltyData?.currentPoints]);

  const progressPercentage = ((loyaltyData?.currentPoints / loyaltyData?.totalPointsForNext) * 100);

  return (
    <section className="py-12 bg-gradient-warm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-accent font-bold text-primary mb-4">
            Your Reading Rewards
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your progress, unlock exclusive deals, and earn points with every purchase
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Loyalty Card */}
          <div className="lg:col-span-2">
            <div className="card-literary p-8 bg-gradient-literary text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-accent font-bold mb-1">
                      {loyaltyData?.currentTier}
                    </h3>
                    <p className="text-white/80">Member since {loyaltyData?.memberSince}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">
                      {animatedPoints?.toLocaleString()}
                    </div>
                    <div className="text-white/80 text-sm">Points</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress to {loyaltyData?.nextTier}</span>
                    <span>{loyaltyData?.pointsToNext} points to go</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className="bg-accent h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{loyaltyData?.booksRead}</div>
                    <div className="text-white/80 text-sm">Books Read</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">${loyaltyData?.totalSaved}</div>
                    <div className="text-white/80 text-sm">Total Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">Gold</div>
                    <div className="text-white/80 text-sm">Current Tier</div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <Button
                    variant="secondary"
                    onClick={() => navigate('/loyalty-dashboard')}
                    className="w-full bg-white text-primary hover:bg-white/90"
                  >
                    View Full Dashboard
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Member Deals */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary mb-4">
              Exclusive Member Deals
            </h3>
            
            {memberDeals?.map((deal) => (
              <div key={deal?.id} className="card-literary p-4 hover:shadow-literary-elevated transition-smooth">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 ${deal?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon name={deal?.icon} size={18} color="white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground text-sm">
                        {deal?.title}
                      </h4>
                      <span className="deal-badge text-xs">
                        {deal?.discount}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs mb-2">
                      {deal?.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="Clock" size={12} />
                      <span>{deal?.timeLeft}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={() => navigate('/flash-deals-center')}
              className="w-full"
            >
              View All Deals
              <Icon name="ExternalLink" size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoyaltyDashboard;