import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CountdownTimer from './components/CountdownTimer';
import FeaturedDealBanner from './components/FeaturedDealBanner';
import DealsSection from './components/DealsSection';
import DealAlertSignup from './components/DealAlertSignup';
import MissedDealsSection from './components/MissedDealsSection';
import PreOrderSection from './components/PreOrderSection';

const FlashDealsCenter = () => {
  const [currentTime] = useState(new Date()?.getTime());

  // Mock data for featured deal
  const featuredDeal = {
    id: "featured-1",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    description: "A reclusive Hollywood icon finally tells her story to a young journalist, revealing shocking secrets about her glamorous and scandalous life.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    originalPrice: 16.99,
    salePrice: 4.99,
    rating: 4.8,
    reviewCount: 12847,
    quantityRemaining: 47,
    endTime: currentTime + (6 * 60 * 60 * 1000), // 6 hours from now
    type: "lightning"
  };

  // Mock data for lightning deals
  const lightningDeals = [
    {
      id: "lightning-1",
      title: "Atomic Habits",
      author: "James Clear",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      originalPrice: 18.99,
      salePrice: 7.99,
      rating: 4.9,
      quantityRemaining: 23,
      endTime: currentTime + (4 * 60 * 60 * 1000),
      type: "lightning"
    },
    {
      id: "lightning-2",
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      originalPrice: 15.99,
      salePrice: 5.99,
      rating: 4.7,
      quantityRemaining: 8,
      endTime: currentTime + (2 * 60 * 60 * 1000),
      type: "lightning"
    },
    {
      id: "lightning-3",
      title: "The Midnight Library",
      author: "Matt Haig",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      originalPrice: 14.99,
      salePrice: 6.99,
      rating: 4.6,
      quantityRemaining: 15,
      endTime: currentTime + (5 * 60 * 60 * 1000),
      type: "lightning"
    },
    {
      id: "lightning-4",
      title: "Educated",
      author: "Tara Westover",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      originalPrice: 17.99,
      salePrice: 8.99,
      rating: 4.8,
      quantityRemaining: 31,
      endTime: currentTime + (7 * 60 * 60 * 1000),
      type: "lightning"
    }
  ];

  // Mock data for daily steals
  const dailyDeals = [
    {
      id: "daily-1",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      originalPrice: 16.99,
      salePrice: 9.99,
      rating: 4.5,
      quantityRemaining: 156,
      endTime: currentTime + (20 * 60 * 60 * 1000),
      type: "daily"
    },
    {
      id: "daily-2",
      title: "Becoming",
      author: "Michelle Obama",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      originalPrice: 19.99,
      salePrice: 12.99,
      rating: 4.9,
      quantityRemaining: 89,
      endTime: currentTime + (18 * 60 * 60 * 1000),
      type: "daily"
    },
    {
      id: "daily-3",
      title: "The Alchemist",
      author: "Paulo Coelho",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      originalPrice: 13.99,
      salePrice: 7.99,
      rating: 4.4,
      quantityRemaining: 203,
      endTime: currentTime + (22 * 60 * 60 * 1000),
      type: "daily"
    }
  ];

  // Mock data for member exclusive deals
  const memberDeals = [
    {
      id: "member-1",
      title: "The Thursday Murder Club",
      author: "Richard Osman",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      originalPrice: 15.99,
      salePrice: 6.99,
      rating: 4.6,
      quantityRemaining: 67,
      endTime: currentTime + (48 * 60 * 60 * 1000),
      type: "member"
    },
    {
      id: "member-2",
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      originalPrice: 18.99,
      salePrice: 10.99,
      rating: 4.3,
      quantityRemaining: 124,
      endTime: currentTime + (36 * 60 * 60 * 1000),
      type: "member"
    }
  ];

  // Mock data for bulk deals
  const bulkDeals = [
    {
      id: "bulk-1",
      title: "Harry Potter Complete Series",
      author: "J.K. Rowling",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      originalPrice: 89.99,
      salePrice: 49.99,
      rating: 4.9,
      quantityRemaining: 45,
      endTime: currentTime + (72 * 60 * 60 * 1000),
      type: "bulk"
    },
    {
      id: "bulk-2",
      title: "Agatha Christie Mystery Collection",
      author: "Agatha Christie",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      originalPrice: 79.99,
      salePrice: 39.99,
      rating: 4.7,
      quantityRemaining: 28,
      endTime: currentTime + (60 * 60 * 60 * 1000),
      type: "bulk"
    }
  ];

  // Mock data for missed deals
  const missedDeals = [
    {
      id: "missed-1",
      title: "The Invisible Life of Addie LaRue",
      author: "V.E. Schwab",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      originalPrice: 17.99,
      salePrice: 4.99,
      currentPrice: 16.99,
      endDate: currentTime - (2 * 24 * 60 * 60 * 1000),
      purchaseCount: 1247
    },
    {
      id: "missed-2",
      title: "Project Hail Mary",
      author: "Andy Weir",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      originalPrice: 19.99,
      salePrice: 6.99,
      currentPrice: 18.99,
      endDate: currentTime - (5 * 24 * 60 * 60 * 1000),
      purchaseCount: 892
    },
    {
      id: "missed-3",
      title: "The Guest List",
      author: "Lucy Foley",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      originalPrice: 16.99,
      salePrice: 5.99,
      currentPrice: 15.99,
      endDate: currentTime - (1 * 24 * 60 * 60 * 1000),
      purchaseCount: 634
    },
    {
      id: "missed-4",
      title: "The Sanatorium",
      author: "Sarah Pearse",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      originalPrice: 15.99,
      salePrice: 7.99,
      currentPrice: 14.99,
      endDate: currentTime - (3 * 24 * 60 * 60 * 1000),
      purchaseCount: 456
    },
    {
      id: "missed-5",
      title: "The Four Winds",
      author: "Kristin Hannah",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      originalPrice: 18.99,
      salePrice: 8.99,
      currentPrice: 17.99,
      endDate: currentTime - (4 * 24 * 60 * 60 * 1000),
      purchaseCount: 723
    },
    {
      id: "missed-6",
      title: "The Vanishing Half",
      author: "Brit Bennett",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      originalPrice: 17.99,
      salePrice: 6.99,
      currentPrice: 16.99,
      endDate: currentTime - (6 * 24 * 60 * 60 * 1000),
      purchaseCount: 1089
    },
    {
      id: "missed-7",
      title: "Malibu Rising",
      author: "Taylor Jenkins Reid",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      originalPrice: 16.99,
      salePrice: 5.99,
      currentPrice: 15.99,
      endDate: currentTime - (7 * 24 * 60 * 60 * 1000),
      purchaseCount: 567
    },
    {
      id: "missed-8",
      title: "The Push",
      author: "Ashley Audrain",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      originalPrice: 15.99,
      salePrice: 7.99,
      currentPrice: 14.99,
      endDate: currentTime - (8 * 24 * 60 * 60 * 1000),
      purchaseCount: 389
    }
  ];

  // Mock data for pre-orders
  const preOrders = [
    {
      id: "preorder-1",
      title: "The Atlas Six",
      author: "Olivie Blake",
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      description: `The Alexandrian Society, caretakers of lost knowledge from the greatest civilizations of antiquity, are the foremost secret society of magical academicians in the world. Those who earn a place among the Alexandrians will secure a life of wealth, power, and prestige beyond their wildest dreams, and each decade, only the six most uniquely talented magicians are selected to be considered for initiation.`,
      genre: "Fantasy",
      pages: 432,
      format: "Hardcover",
      releaseDate: new Date(currentTime + (30 * 24 * 60 * 60 * 1000)),
      preOrderPrice: 19.99,
      regularPrice: 26.99
    },
    {
      id: "preorder-2",
      title: "The Midnight Girls",
      author: "Alicia Jasinska",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      description: `Three sisters living in an enchanted forest enter into a dangerous bargain with Baba Jaga, the witch of legend, in this captivating and lyrical novel that reimagines the classic fairy tale.`,
      genre: "Young Adult Fantasy",
      pages: 368,
      format: "Hardcover",
      releaseDate: new Date(currentTime + (45 * 24 * 60 * 60 * 1000)),
      preOrderPrice: 16.99,
      regularPrice: 22.99
    }
  ];

  useEffect(() => {
    document.title = "Flash Deals Center - BookBridge";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section with Main Flash Sale Timer */}
        <section className="bg-gradient-warm py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name="Zap" size={24} className="text-accent animate-pulse" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                  Flash Deals Center
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Lightning-fast deals on bestselling books! Limited quantities, incredible savings, 
                and the thrill of snagging amazing books at unbeatable prices.
              </p>
            </div>

            {/* Main Flash Sale Countdown */}
            <div className="bg-white rounded-2xl shadow-literary-elevated p-8 max-w-2xl mx-auto">
              <CountdownTimer 
                endTime={currentTime + (6 * 60 * 60 * 1000)}
                title="🔥 MEGA FLASH SALE ENDS IN"
                size="large"
              />
              <div className="text-center mt-6">
                <p className="text-muted-foreground mb-4">
                  Up to 75% off bestsellers • Limited quantities • Free shipping on $25+
                </p>
                <Button
                  variant="accent"
                  size="lg"
                  iconName="ArrowDown"
                  iconPosition="right"
                  onClick={() => document.getElementById('featured-deal')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Shop Flash Deals Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Featured Deal Banner */}
          <div id="featured-deal">
            <FeaturedDealBanner deal={featuredDeal} />
          </div>

          {/* Lightning Deals */}
          <DealsSection
            title="⚡ Lightning Deals"
            icon="Zap"
            description="Limited time, limited quantity - these deals disappear fast!"
            deals={lightningDeals}
            viewAllLink={true}
          />

          {/* Daily Steals */}
          <DealsSection
            title="📅 Daily Steals"
            icon="Clock"
            description="24-hour specials on popular titles"
            deals={dailyDeals}
            viewAllLink={true}
          />

          {/* Member Exclusive Deals */}
          <DealsSection
            title="👑 Member Exclusives"
            icon="Crown"
            description="Special pricing for our loyal readers"
            deals={memberDeals}
            viewAllLink={true}
          />

          {/* Bulk Bonuses */}
          <DealsSection
            title="📚 Bulk Bonuses"
            icon="Package"
            description="Save more when you buy complete series and collections"
            deals={bulkDeals}
            viewAllLink={true}
          />

          {/* Pre-Order Specials */}
          <PreOrderSection preOrders={preOrders} />

          {/* Missed Deals Section */}
          <MissedDealsSection missedDeals={missedDeals} />

          {/* Deal Alert Signup */}
          <div id="deal-alerts">
            <DealAlertSignup />
          </div>

          {/* Social Sharing & Referral Section */}
          <section className="mb-12">
            <div className="bg-primary/5 rounded-2xl p-8 text-center border border-primary/20">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Share2" size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Share the Savings</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Found an amazing deal? Share it with your book-loving friends! When they make their first purchase 
                using your referral, you both get $5 off your next order.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <Button
                  variant="primary"
                  iconName="Users"
                  iconPosition="left"
                  className="flex-1 sm:flex-none"
                >
                  Refer Friends
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Icon name="Facebook" size={18} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="Twitter" size={18} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="MessageCircle" size={18} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="Mail" size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Deal Guarantee */}
          <section className="mb-12">
            <div className="bg-success/5 rounded-xl p-8 border border-success/20">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="Shield" size={24} className="text-success" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Our Deal Guarantee</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name="DollarSign" size={20} className="text-success" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Price Protection</h4>
                  <p className="text-sm text-muted-foreground">
                    If you find a lower price within 24 hours, we'll match it and give you an extra 5% off.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name="RotateCcw" size={20} className="text-success" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Easy Returns</h4>
                  <p className="text-sm text-muted-foreground">
                    Not satisfied? Return any book within 30 days for a full refund, no questions asked.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name="Truck" size={20} className="text-success" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Fast Shipping</h4>
                  <p className="text-sm text-muted-foreground">
                    Free shipping on orders over $25, with most orders arriving within 2-3 business days.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © {new Date()?.getFullYear()} BookBridge. All rights reserved. | 
            <span className="mx-2">•</span>
            Smart Readers Shop Here
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FlashDealsCenter;