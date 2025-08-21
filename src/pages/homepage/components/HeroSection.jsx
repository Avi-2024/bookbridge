import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const navigate = useNavigate();

  const heroSlides = [
    {
      id: 1,
      title: "Flash Deal: Mystery Novels",
      subtitle: "Up to 70% off bestselling thrillers",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop",
      cta: "Shop Mystery Books",
      discount: "70% OFF",
      timeLeft: "2h 15m"
    },
    {
      id: 2,
      title: "New Arrivals: Science Fiction",
      subtitle: "Latest releases from top authors",
      image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?w=800&h=400&fit=crop",
      cta: "Explore Sci-Fi",
      discount: "NEW",
      timeLeft: "Just Added"
    },
    {
      id: 3,
      title: "Member Exclusive: Romance Collection",
      subtitle: "Special prices for loyalty members",
      image: "https://images.pixabay.com/photo/2016/03/27/07/32/books-1282309_1280.jpg?w=800&h=400&fit=crop",
      cta: "View Collection",
      discount: "MEMBER",
      timeLeft: "Limited Time"
    }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-10', label: 'Under $10' },
    { value: '10-20', label: '$10 - $20' },
    { value: '20-50', label: '$20 - $50' },
    { value: '50+', label: '$50+' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides?.length]);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/advanced-search-filter-hub?q=${encodeURIComponent(searchQuery?.trim())}&price=${priceRange}`);
    }
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const currentSlideData = heroSlides?.[currentSlide];

  return (
    <section className="relative bg-gradient-warm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
      {/* Hero Slider */}
      <div className="relative h-96 lg:h-[500px]">
        <div className="absolute inset-0">
          <Image
            src={currentSlideData?.image}
            alt={currentSlideData?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-2xl">
              {/* Deal Badge */}
              <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse-gentle">
                <Icon name="Zap" size={16} />
                {currentSlideData?.discount}
                <span className="text-xs opacity-90">• {currentSlideData?.timeLeft}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl lg:text-6xl font-accent font-bold text-white mb-4 text-shadow-soft">
                Great Books,
                <span className="text-accent block">Greater Value</span>
              </h1>

              <p className="text-xl text-white/90 mb-6 text-shadow-soft">
                {currentSlideData?.subtitle}
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
                  <div className="flex-1">
                    <Input
                      type="search"
                      placeholder="Search for books, authors, genres..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      className="h-12 bg-white/95 backdrop-blur-sm border-white/20 focus:border-accent"
                    />
                  </div>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e?.target?.value)}
                    className="h-12 px-4 rounded-md bg-white/95 backdrop-blur-sm border border-white/20 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    {priceRanges?.map((range) => (
                      <option key={range?.value} value={range?.value}>
                        {range?.label}
                      </option>
                    ))}
                  </select>
                  <Button type="submit" className="h-12 px-8">
                    <Icon name="Search" size={20} className="mr-2" />
                    Search
                  </Button>
                </div>
              </form>

              {/* CTA Button */}
              <Button
                variant="accent"
                size="lg"
                onClick={() => navigate('/flash-deals-center')}
                className="shadow-book-hover"
              >
                {currentSlideData?.cta}
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {heroSlides?.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-accent scale-125' :'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => handleSlideChange((currentSlide - 1 + heroSlides?.length) % heroSlides?.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-20"
        >
          <Icon name="ChevronLeft" size={24} />
        </button>
        <button
          onClick={() => handleSlideChange((currentSlide + 1) % heroSlides?.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-20"
        >
          <Icon name="ChevronRight" size={24} />
        </button>
      </div>
      {/* Trust Indicators */}
      <div className="bg-white/95 backdrop-blur-sm border-t border-white/20">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={16} className="text-trust-green" />
              <span>Secure Shopping</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Truck" size={16} className="text-trust-green" />
              <span>Free Shipping $25+</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="RotateCcw" size={16} className="text-trust-green" />
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Award" size={16} className="text-trust-green" />
              <span>Loyalty Rewards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;