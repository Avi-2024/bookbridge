import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import ResultsHeader from './components/ResultsHeader';
import BookCard from './components/BookCard';
import BudgetCalculator from './components/BudgetCalculator';
import SimilarReadersSidebar from './components/SimilarReadersSidebar';
import SavedSearches from './components/SavedSearches';
import Pagination from './components/Pagination';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdvancedSearchFilterHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    condition: [],
    genre: [],
    rating: '',
    author: '',
    publisher: '',
    yearMin: '',
    yearMax: '',
    sortBy: 'popularity',
    loyaltyOnly: false,
    freeShipping: false,
    bulkDiscount: false,
    priceDropAlert: false
  });
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resultsPerPage = 24;

  // Mock search suggestions
  const searchSuggestions = [
    "The Seven Husbands of Evelyn Hugo",
    "Atomic Habits by James Clear",
    "Where the Crawdads Sing",
    "The Midnight Library",
    "Educated by Tara Westover",
    "Fiction books under $10",
    "Science fiction bestsellers",
    "Romance novels new releases",
    "Mystery thriller books",
    "Self-help books 2024"
  ];

  // Mock book data
  const mockBooks = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      currentPrice: 8.99,
      originalPrice: 16.99,
      rating: 4.6,
      reviewCount: 2847,
      condition: "like-new",
      description: `A reclusive Hollywood icon finally tells her story to a young journalist, revealing seven marriages and decades of secrets in this captivating novel about love, ambition, and the price of fame.`,
      genre: ["fiction", "romance"],
      publisher: "Atria Books",
      year: 2017,
      loyaltyExclusive: false,
      freeShipping: true,
      shippingCost: 0,
      bulkDiscount: true,
      isWishlisted: false
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
      currentPrice: 12.49,
      originalPrice: 18.00,
      rating: 4.8,
      reviewCount: 1923,
      condition: "new",
      description: `Transform your life with tiny changes that deliver remarkable results. A comprehensive guide to building good habits and breaking bad ones.`,
      genre: ["self-help", "business"],
      publisher: "Avery",
      year: 2018,
      loyaltyExclusive: true,
      freeShipping: true,
      shippingCost: 0,
      bulkDiscount: true,
      isWishlisted: true
    },
    {
      id: 3,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      currentPrice: 9.99,
      originalPrice: 15.99,
      rating: 4.4,
      reviewCount: 3156,
      condition: "very-good",
      description: `A haunting tale of nature, isolation, and resilience set in the atmospheric North Carolina marshlands.`,
      genre: ["fiction", "mystery"],
      publisher: "G.P. Putnam\'s Sons",
      year: 2018,
      loyaltyExclusive: false,
      freeShipping: false,
      shippingCost: 3.99,
      bulkDiscount: false,
      isWishlisted: false
    },
    {
      id: 4,
      title: "The Midnight Library",
      author: "Matt Haig",
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      currentPrice: 7.99,
      originalPrice: 14.99,
      rating: 4.3,
      reviewCount: 1876,
      condition: "good",
      description: `Between life and death there is a library, and within that library, the shelves go on forever. A philosophical novel about infinite possibilities.`,
      genre: ["fiction", "fantasy"],
      publisher: "Viking",
      year: 2020,
      loyaltyExclusive: false,
      freeShipping: true,
      shippingCost: 0,
      bulkDiscount: true,
      isWishlisted: false
    },
    {
      id: 5,
      title: "Educated",
      author: "Tara Westover",
      coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop",
      currentPrice: 11.99,
      originalPrice: 17.00,
      rating: 4.7,
      reviewCount: 2234,
      condition: "like-new",
      description: `A powerful memoir about education, family, and the struggle between loyalty and independence.`,
      genre: ["biography", "non-fiction"],
      publisher: "Random House",
      year: 2018,
      loyaltyExclusive: true,
      freeShipping: true,
      shippingCost: 0,
      bulkDiscount: false,
      isWishlisted: true
    },
    {
      id: 6,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
      currentPrice: 6.99,
      originalPrice: 13.99,
      rating: 4.2,
      reviewCount: 1654,
      condition: "acceptable",
      description: `A psychological thriller about a woman who refuses to speak after allegedly murdering her husband.`,
      genre: ["mystery", "thriller"],
      publisher: "Celadon Books",
      year: 2019,
      loyaltyExclusive: false,
      freeShipping: false,
      shippingCost: 2.99,
      bulkDiscount: true,
      isWishlisted: false
    },
    {
      id: 7,
      title: "Becoming",
      author: "Michelle Obama",
      coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop",
      currentPrice: 13.99,
      originalPrice: 19.99,
      rating: 4.9,
      reviewCount: 4567,
      condition: "new",
      description: `An intimate, powerful memoir by the former First Lady of the United States.`,
      genre: ["biography", "non-fiction"],
      publisher: "Crown",
      year: 2018,
      loyaltyExclusive: true,
      freeShipping: true,
      shippingCost: 0,
      bulkDiscount: true,
      isWishlisted: false
    },
    {
      id: 8,
      title: "The Alchemist",
      author: "Paulo Coelho",
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      currentPrice: 5.99,
      originalPrice: 12.99,
      rating: 4.1,
      reviewCount: 2890,
      condition: "good",
      description: `A philosophical novel about following your dreams and listening to your heart.`,
      genre: ["fiction", "philosophy"],
      publisher: "HarperOne",
      year: 1988,
      loyaltyExclusive: false,
      freeShipping: true,
      shippingCost: 0,
      bulkDiscount: false,
      isWishlisted: true
    }
  ];

  // Simulate search and filtering
  const [filteredBooks, setFilteredBooks] = useState(mockBooks);
  const totalResults = filteredBooks?.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    performSearch(query, filters);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    performSearch(searchQuery, newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      priceMin: '',
      priceMax: '',
      condition: [],
      genre: [],
      rating: '',
      author: '',
      publisher: '',
      yearMin: '',
      yearMax: '',
      sortBy: 'popularity',
      loyaltyOnly: false,
      freeShipping: false,
      bulkDiscount: false,
      priceDropAlert: false
    };
    setFilters(clearedFilters);
    setCurrentPage(1);
    performSearch(searchQuery, clearedFilters);
  };

  const performSearch = (query, currentFilters) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let results = [...mockBooks];

      // Apply search query
      if (query) {
        results = results?.filter(book => 
          book?.title?.toLowerCase()?.includes(query?.toLowerCase()) ||
          book?.author?.toLowerCase()?.includes(query?.toLowerCase()) ||
          book?.genre?.some(g => g?.toLowerCase()?.includes(query?.toLowerCase()))
        );
      }

      // Apply filters
      if (currentFilters?.priceMin) {
        results = results?.filter(book => book?.currentPrice >= parseFloat(currentFilters?.priceMin));
      }
      if (currentFilters?.priceMax) {
        results = results?.filter(book => book?.currentPrice <= parseFloat(currentFilters?.priceMax));
      }
      if (currentFilters?.condition?.length > 0) {
        results = results?.filter(book => currentFilters?.condition?.includes(book?.condition));
      }
      if (currentFilters?.genre?.length > 0) {
        results = results?.filter(book => 
          book?.genre?.some(g => currentFilters?.genre?.includes(g))
        );
      }
      if (currentFilters?.rating) {
        results = results?.filter(book => book?.rating >= parseFloat(currentFilters?.rating));
      }
      if (currentFilters?.author) {
        results = results?.filter(book => 
          book?.author?.toLowerCase()?.includes(currentFilters?.author?.toLowerCase())
        );
      }
      if (currentFilters?.loyaltyOnly) {
        results = results?.filter(book => book?.loyaltyExclusive);
      }
      if (currentFilters?.freeShipping) {
        results = results?.filter(book => book?.freeShipping);
      }
      if (currentFilters?.bulkDiscount) {
        results = results?.filter(book => book?.bulkDiscount);
      }

      // Apply sorting
      switch (currentFilters?.sortBy) {
        case 'price-low':
          results?.sort((a, b) => a?.currentPrice - b?.currentPrice);
          break;
        case 'price-high':
          results?.sort((a, b) => b?.currentPrice - a?.currentPrice);
          break;
        case 'rating':
          results?.sort((a, b) => b?.rating - a?.rating);
          break;
        case 'newest':
          results?.sort((a, b) => b?.year - a?.year);
          break;
        case 'savings':
          results?.sort((a, b) => (b?.originalPrice - b?.currentPrice) - (a?.originalPrice - a?.currentPrice));
          break;
        default: // popularity
          results?.sort((a, b) => b?.reviewCount - a?.reviewCount);
      }

      setFilteredBooks(results);
      setIsLoading(false);
    }, 500);
  };

  const handleLoadSavedSearch = (savedFilters) => {
    setFilters(savedFilters);
    setCurrentPage(1);
    performSearch(searchQuery, savedFilters);
  };

  const getCurrentPageBooks = () => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return filteredBooks?.slice(startIndex, endIndex);
  };

  useEffect(() => {
    performSearch('', filters);
  }, []);

  return (
    <div className="min-h-screen bg-warm-canvas">
      <Header />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-accent font-bold text-foreground mb-4">
              Advanced Search & Filter Hub
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Find exactly what you're looking for with our sophisticated filtering system. 
              Discover great books within your budget and save your favorite searches for future alerts.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearch={handleSearch}
              suggestions={searchSuggestions?.filter(s => 
                s?.toLowerCase()?.includes(searchQuery?.toLowerCase())
              )}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-1 space-y-6">
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
                isExpanded={isFilterExpanded}
                setIsExpanded={setIsFilterExpanded}
              />
              
              <div className="hidden lg:block">
                <BudgetCalculator />
              </div>
              
              <div className="hidden lg:block">
                <SavedSearches
                  currentFilters={filters}
                  onLoadSearch={handleLoadSavedSearch}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <ResultsHeader
                totalResults={totalResults}
                currentPage={currentPage}
                totalPages={totalPages}
                viewMode={viewMode}
                setViewMode={setViewMode}
                sortBy={filters?.sortBy}
                setSortBy={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
                searchQuery={searchQuery}
                activeFilters={filters}
              />

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="text-muted-foreground">Searching books...</span>
                  </div>
                </div>
              )}

              {/* Results Grid/List */}
              {!isLoading && (
                <>
                  {filteredBooks?.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">No books found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search terms or filters to find more results.
                      </p>
                      <Button
                        variant="outline"
                        onClick={handleClearFilters}
                        iconName="RefreshCw"
                        iconPosition="left"
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  ) : (
                    <div className={
                      viewMode === 'grid' 
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" :"space-y-4"
                    }>
                      {getCurrentPageBooks()?.map((book) => (
                        <BookCard
                          key={book?.id}
                          book={book}
                          viewMode={viewMode}
                        />
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {filteredBooks?.length > 0 && (
                    <div className="mt-8">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <SimilarReadersSidebar />
              
              {/* Mobile Budget Calculator */}
              <div className="lg:hidden">
                <BudgetCalculator />
              </div>
              
              {/* Mobile Saved Searches */}
              <div className="lg:hidden">
                <SavedSearches
                  currentFilters={filters}
                  onLoadSearch={handleLoadSavedSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdvancedSearchFilterHub;