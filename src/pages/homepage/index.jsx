import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import LoyaltyDashboard from './components/LoyaltyDashboard';
import FeaturedDeals from './components/FeaturedDeals';
import CommunitySpotlight from './components/CommunitySpotlight';
import DiscoveryEngine from './components/DiscoveryEngine';
import SocialProof from './components/SocialProof';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <LoyaltyDashboard />
        <FeaturedDeals />
        <CommunitySpotlight />
        <DiscoveryEngine />
        <SocialProof />
      </main>
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BB</span>
                </div>
                <span className="text-xl font-accent font-bold">BookBridge</span>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                Connecting readers with great books at unbeatable prices. Your reading journey starts here.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/advanced-search-filter-hub" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Search Books</a></li>
                <li><a href="/flash-deals-center" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Flash Deals</a></li>
                <li><a href="/community-hub" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Community</a></li>
                <li><a href="/loyalty-dashboard" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Loyalty Program</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Returns</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Newsletter</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Social Media</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Reviews</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-primary-foreground/80 text-sm">
              © {new Date()?.getFullYear()} BookBridge. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;