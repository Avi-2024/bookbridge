import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialProof = () => {
  const [totalBooksSold, setTotalBooksSold] = useState(0);
  const [averageSavings, setAverageSavings] = useState(0);
  const [recentPurchases, setRecentPurchases] = useState([]);

  const finalStats = {
    totalBooksSold: 1247893,
    averageSavings: 42.5,
    activeCommunity: 89432,
    satisfactionRate: 98.7
  };

  const purchaseNotifications = [
    {
      id: 1,
      user: "Sarah from New York",
      book: "The Silent Patient",
      timeAgo: "2 minutes ago",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      user: "Mike from California",
      book: "Atomic Habits",
      timeAgo: "5 minutes ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      user: "Emma from Texas",
      book: "Project Hail Mary",
      timeAgo: "8 minutes ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      user: "David from Florida",
      book: "Where the Crawdads Sing",
      timeAgo: "12 minutes ago",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 5,
      user: "Lisa from Illinois",
      book: "The Seven Husbands of Evelyn Hugo",
      timeAgo: "15 minutes ago",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);

  useEffect(() => {
    // Animate counters
    const duration = 3000;
    const steps = 60;
    
    const animateCounter = (finalValue, setter) => {
      const increment = finalValue / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= finalValue) {
          setter(finalValue);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, duration / steps);
      
      return timer;
    };

    const timer1 = animateCounter(finalStats?.totalBooksSold, setTotalBooksSold);
    const timer2 = animateCounter(finalStats?.averageSavings, setAverageSavings);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
    };
  }, [finalStats?.totalBooksSold, finalStats?.averageSavings]);

  useEffect(() => {
    // Cycle through purchase notifications
    const interval = setInterval(() => {
      setCurrentNotificationIndex((prev) => (prev + 1) % purchaseNotifications?.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [purchaseNotifications?.length]);

  const trustIndicators = [
    {
      icon: "Shield",
      title: "Secure Payments",
      description: "256-bit SSL encryption",
      color: "text-trust-green"
    },
    {
      icon: "Award",
      title: "Quality Guarantee",
      description: "30-day return policy",
      color: "text-primary"
    },
    {
      icon: "Users",
      title: "Trusted Community",
      description: "89K+ active readers",
      color: "text-accent"
    },
    {
      icon: "Star",
      title: "Excellent Reviews",
      description: "4.8/5 average rating",
      color: "text-yellow-500"
    }
  ];

  return (
    <section className="py-16 bg-gradient-warm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Stats Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-accent font-bold text-primary mb-8">
            Trusted by Book Lovers Everywhere
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                {totalBooksSold?.toLocaleString()}+
              </div>
              <div className="text-muted-foreground font-medium">Books Sold</div>
              <div className="text-sm text-muted-foreground mt-1">
                And counting every day
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-accent mb-2">
                {averageSavings?.toFixed(1)}%
              </div>
              <div className="text-muted-foreground font-medium">Average Savings</div>
              <div className="text-sm text-muted-foreground mt-1">
                Compared to retail prices
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-trust-green mb-2">
                {finalStats?.activeCommunity?.toLocaleString()}+
              </div>
              <div className="text-muted-foreground font-medium">Active Readers</div>
              <div className="text-sm text-muted-foreground mt-1">
                In our community
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-crimson-cta mb-2">
                {finalStats?.satisfactionRate}%
              </div>
              <div className="text-muted-foreground font-medium">Satisfaction Rate</div>
              <div className="text-sm text-muted-foreground mt-1">
                Customer happiness score
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Purchase Notifications */}
        <div className="max-w-md mx-auto mb-12">
          <div className="card-literary p-4 bg-white/90 backdrop-blur-sm border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src={purchaseNotifications?.[currentNotificationIndex]?.avatar}
                  alt="Customer"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-trust-green rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse-gentle"></div>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="ShoppingBag" size={14} className="text-trust-green" />
                  <span className="text-sm font-medium text-foreground">
                    Recent Purchase
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">
                    {purchaseNotifications?.[currentNotificationIndex]?.user}
                  </span>
                  {" "}bought{" "}
                  <span className="font-medium">
                    "{purchaseNotifications?.[currentNotificationIndex]?.book}"
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {purchaseNotifications?.[currentNotificationIndex]?.timeAgo}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustIndicators?.map((indicator, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-literary flex items-center justify-center ${indicator?.color}`}>
                <Icon name={indicator?.icon} size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {indicator?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {indicator?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Customer Testimonial */}
        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <div className="flex justify-center mb-4">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={24}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <blockquote className="text-xl lg:text-2xl font-medium text-foreground mb-6 italic">
                "BookBridge has completely transformed my reading habits. I've discovered amazing books at incredible prices, and the community recommendations are spot-on. I've saved over $300 this year alone!"
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <Image
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
                  alt="Jennifer Martinez"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="font-semibold text-foreground">Jennifer Martinez</div>
                  <div className="text-sm text-muted-foreground">Gold Member since 2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;