import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ searchQuery, setSearchQuery, onSearch, suggestions = [] }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const searchRef = useRef(null);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch(searchQuery?.trim());
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    setShowSuggestions(value?.length > 0);
    setSelectedSuggestion(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedSuggestion(prev => 
          prev < suggestions?.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedSuggestion >= 0) {
          handleSuggestionClick(suggestions?.[selectedSuggestion]);
        } else {
          handleSearch(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search for books, authors, genres, or ISBN..."
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full pl-12 pr-20 h-14 text-lg rounded-full border-2 border-border focus:border-primary shadow-book hover:shadow-book-hover transition-smooth"
          />
          <Icon 
            name="Search" 
            size={24} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSearchQuery('');
                  setShowSuggestions(false);
                }}
                className="h-8 w-8 rounded-full hover:bg-muted"
              >
                <Icon name="X" size={16} />
              </Button>
            )}
            <Button
              type="submit"
              variant="default"
              className="h-10 px-6 rounded-full bg-primary hover:bg-primary/90"
            >
              Search
            </Button>
          </div>
        </div>
      </form>
      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-lg shadow-literary-elevated z-50 max-h-80 overflow-y-auto">
          <div className="py-2">
            {suggestions?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full text-left px-4 py-3 hover:bg-muted transition-smooth flex items-center gap-3 ${
                  selectedSuggestion === index ? 'bg-muted' : ''
                }`}
              >
                <Icon name="Search" size={16} className="text-muted-foreground" />
                <span className="text-sm">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Quick Search Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="text-sm text-muted-foreground">Popular searches:</span>
        {['Fiction under $10', 'New releases', 'Bestsellers', 'Science fiction', 'Romance novels']?.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setSearchQuery(tag);
              onSearch(tag);
            }}
            className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 rounded-full transition-smooth"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;