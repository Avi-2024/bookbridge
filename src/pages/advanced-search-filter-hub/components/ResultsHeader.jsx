import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ResultsHeader = ({ 
  totalResults, 
  currentPage, 
  totalPages, 
  viewMode, 
  setViewMode, 
  sortBy, 
  setSortBy,
  searchQuery,
  activeFilters 
}) => {
  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'savings', label: 'Biggest Savings' }
  ];

  const getActiveFiltersCount = () => {
    let count = 0;
    if (activeFilters?.priceMin || activeFilters?.priceMax) count++;
    if (activeFilters?.condition?.length > 0) count++;
    if (activeFilters?.genre?.length > 0) count++;
    if (activeFilters?.rating) count++;
    if (activeFilters?.author) count++;
    if (activeFilters?.publisher) count++;
    if (activeFilters?.yearMin || activeFilters?.yearMax) count++;
    if (activeFilters?.loyaltyOnly) count++;
    if (activeFilters?.freeShipping) count++;
    if (activeFilters?.bulkDiscount) count++;
    if (activeFilters?.priceDropAlert) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-card rounded-lg border shadow-literary p-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Results Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-semibold text-foreground">
              Search Results
            </h2>
            {searchQuery && (
              <span className="text-sm text-muted-foreground">
                for "{searchQuery}"
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              {totalResults?.toLocaleString()} books found
            </span>
            
            {activeFiltersCount > 0 && (
              <span className="flex items-center gap-1">
                <Icon name="Filter" size={14} />
                {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied
              </span>
            )}
            
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              className="min-w-[180px]"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-none border-0"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none border-0"
            >
              <Icon name="List" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-foreground">Active filters:</span>
            
            {activeFilters?.priceMin || activeFilters?.priceMax ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                Price: ${activeFilters?.priceMin || '0'} - ${activeFilters?.priceMax || '∞'}
              </span>
            ) : null}
            
            {activeFilters?.condition?.map((condition) => (
              <span key={condition} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                {condition?.charAt(0)?.toUpperCase() + condition?.slice(1)?.replace('-', ' ')}
              </span>
            ))}
            
            {activeFilters?.genre?.map((genre) => (
              <span key={genre} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                {genre?.charAt(0)?.toUpperCase() + genre?.slice(1)?.replace('-', ' ')}
              </span>
            ))}
            
            {activeFilters?.rating && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                <Icon name="Star" size={12} />
                {activeFilters?.rating}+ stars
              </span>
            )}
            
            {activeFilters?.loyaltyOnly && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                <Icon name="Crown" size={12} />
                Loyalty Only
              </span>
            )}
            
            {activeFilters?.freeShipping && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                <Icon name="Truck" size={12} />
                Free Shipping
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsHeader;