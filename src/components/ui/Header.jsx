import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = ({ className = '' }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { path: '/homepage', label: 'Home', icon: 'Home' },
    { path: '/advanced-search-filter-hub', label: 'Search', icon: 'Search' },
    { path: '/flash-deals-center', label: 'Deals', icon: 'Zap' },
    { path: '/community-hub', label: 'Community', icon: 'Users' },
    { path: '/loyalty-dashboard', label: 'Rewards', icon: 'Award' }
  ];

  const secondaryItems = [
    { path: '/book-detail-pages', label: 'Browse Books', icon: 'Book' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/advanced-search-filter-hub?q=${encodeURIComponent(searchQuery?.trim())}`);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-literary shadow-literary-elevated' : 'bg-background/95'
      } ${className}`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo Section */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavigation('/homepage')}
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-literary rounded-lg flex items-center justify-center shadow-literary group-hover:shadow-literary-elevated transition-smooth">
                  <Icon name="BookOpen" size={18} color="white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse-gentle"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-accent font-bold text-primary">
                  BookBridge
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">
                  Smart Readers Shop Here
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className={`relative transition-all duration-300 ${
                isSearchFocused ? 'transform scale-105' : ''
              }`}>
                <Input
                  type="search"
                  placeholder="Search for books, authors, or genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-12 pr-4 h-11 rounded-full border-2 border-border focus:border-primary shadow-book hover:shadow-book-hover transition-smooth"
                />
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    <Icon name="X" size={16} />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems?.slice(0, 4)?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`nav-item ${
                  isActivePath(item?.path) ? 'nav-item-active' : 'hover:bg-muted/50'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="nav-item hover:bg-muted/50">
                <Icon name="MoreHorizontal" size={18} />
                <span>More</span>
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border rounded-lg shadow-literary-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {navigationItems?.slice(4)?.concat(secondaryItems)?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-smooth flex items-center gap-3 ${
                        isActivePath(item?.path) ? 'bg-accent/10 text-accent' : 'text-foreground'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      {item?.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Input
                type="search"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-10 pr-4 h-10 rounded-full border-2 border-border focus:border-primary"
              />
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
            </div>
          </form>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t shadow-literary-elevated">
            <nav className="px-4 py-3 space-y-1">
              {navigationItems?.concat(secondaryItems)?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full text-left px-3 py-3 rounded-lg transition-smooth flex items-center gap-3 ${
                    isActivePath(item?.path) 
                      ? 'bg-accent text-accent-foreground' 
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;