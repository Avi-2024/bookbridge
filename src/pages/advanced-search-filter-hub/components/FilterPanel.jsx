import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, setFilters, onApplyFilters, onClearFilters, isExpanded, setIsExpanded }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const genreOptions = [
    { value: 'fiction', label: 'Fiction' },
    { value: 'non-fiction', label: 'Non-Fiction' },
    { value: 'mystery', label: 'Mystery & Thriller' },
    { value: 'romance', label: 'Romance' },
    { value: 'sci-fi', label: 'Science Fiction' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'biography', label: 'Biography' },
    { value: 'history', label: 'History' },
    { value: 'self-help', label: 'Self-Help' },
    { value: 'business', label: 'Business' },
    { value: 'cooking', label: 'Cooking' },
    { value: 'travel', label: 'Travel' }
  ];

  const conditionOptions = [
    { value: 'new', label: 'New' },
    { value: 'like-new', label: 'Like New' },
    { value: 'very-good', label: 'Very Good' },
    { value: 'good', label: 'Good' },
    { value: 'acceptable', label: 'Acceptable' }
  ];

  const sortOptions = [
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'savings', label: 'Biggest Savings' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    setFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    onApplyFilters(localFilters);
    setIsExpanded(false);
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
    setLocalFilters(clearedFilters);
    setFilters(clearedFilters);
    onClearFilters();
  };

  return (
    <div className="bg-card rounded-lg border shadow-literary">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="font-semibold text-lg">Advanced Filters</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden"
        >
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
        </Button>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <div className="p-4 space-y-6">
          {/* Price Range */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground">Price Range</h4>
            <div className="flex gap-3">
              <Input
                type="number"
                placeholder="Min $"
                value={localFilters?.priceMin}
                onChange={(e) => handleFilterChange('priceMin', e?.target?.value)}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Max $"
                value={localFilters?.priceMax}
                onChange={(e) => handleFilterChange('priceMax', e?.target?.value)}
                className="flex-1"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {['Under $5', 'Under $10', 'Under $15', 'Under $25']?.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    const maxPrice = range?.replace('Under $', '');
                    handleFilterChange('priceMax', maxPrice);
                    handleFilterChange('priceMin', '');
                  }}
                  className="px-3 py-1 text-xs bg-accent/10 text-accent hover:bg-accent/20 rounded-full transition-smooth"
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground">Condition</h4>
            <div className="space-y-2">
              {conditionOptions?.map((condition) => (
                <Checkbox
                  key={condition?.value}
                  label={condition?.label}
                  checked={localFilters?.condition?.includes(condition?.value)}
                  onChange={(e) => {
                    const updatedConditions = e?.target?.checked
                      ? [...localFilters?.condition, condition?.value]
                      : localFilters?.condition?.filter(c => c !== condition?.value);
                    handleFilterChange('condition', updatedConditions);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Genre */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground">Genre</h4>
            <Select
              placeholder="Select genres..."
              multiple
              searchable
              options={genreOptions}
              value={localFilters?.genre}
              onChange={(value) => handleFilterChange('genre', value)}
            />
          </div>

          {/* Rating */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground">Minimum Rating</h4>
            <div className="flex gap-2">
              {[4, 3, 2, 1]?.map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleFilterChange('rating', rating?.toString())}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg border transition-smooth ${
                    localFilters?.rating === rating?.toString()
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background hover:bg-muted border-border'
                  }`}
                >
                  <Icon name="Star" size={16} className="fill-current" />
                  <span className="text-sm">{rating}+</span>
                </button>
              ))}
            </div>
          </div>

          {/* Author & Publisher */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Author"
              placeholder="Search by author..."
              value={localFilters?.author}
              onChange={(e) => handleFilterChange('author', e?.target?.value)}
            />
            <Input
              label="Publisher"
              placeholder="Search by publisher..."
              value={localFilters?.publisher}
              onChange={(e) => handleFilterChange('publisher', e?.target?.value)}
            />
          </div>

          {/* Publication Year */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground">Publication Year</h4>
            <div className="flex gap-3">
              <Input
                type="number"
                placeholder="From"
                value={localFilters?.yearMin}
                onChange={(e) => handleFilterChange('yearMin', e?.target?.value)}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="To"
                value={localFilters?.yearMax}
                onChange={(e) => handleFilterChange('yearMax', e?.target?.value)}
                className="flex-1"
              />
            </div>
          </div>

          {/* Special Filters */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground">Special Offers</h4>
            <div className="space-y-2">
              <Checkbox
                label="Loyalty Member Exclusives"
                checked={localFilters?.loyaltyOnly}
                onChange={(e) => handleFilterChange('loyaltyOnly', e?.target?.checked)}
              />
              <Checkbox
                label="Free Shipping Available"
                checked={localFilters?.freeShipping}
                onChange={(e) => handleFilterChange('freeShipping', e?.target?.checked)}
              />
              <Checkbox
                label="Bulk Discount Eligible"
                checked={localFilters?.bulkDiscount}
                onChange={(e) => handleFilterChange('bulkDiscount', e?.target?.checked)}
              />
              <Checkbox
                label="Price Drop Alert Available"
                checked={localFilters?.priceDropAlert}
                onChange={(e) => handleFilterChange('priceDropAlert', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground">Sort Results</h4>
            <Select
              options={sortOptions}
              value={localFilters?.sortBy}
              onChange={(value) => handleFilterChange('sortBy', value)}
            />
          </div>
        </div>

        {/* Filter Actions */}
        <div className="p-4 border-t bg-muted/30">
          <div className="flex gap-3">
            <Button
              variant="default"
              onClick={handleApplyFilters}
              className="flex-1"
              iconName="Search"
              iconPosition="left"
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              onClick={handleClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;