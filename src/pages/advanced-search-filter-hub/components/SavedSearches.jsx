import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SavedSearches = ({ currentFilters, onLoadSearch }) => {
  const [savedSearches, setSavedSearches] = useState([
    {
      id: 1,
      name: "Fiction Under $10",
      filters: {
        genre: ['fiction'],
        priceMax: '10',
        condition: ['new', 'like-new'],
        sortBy: 'price-low'
      },
      alertEnabled: true,
      lastUpdated: new Date(Date.now() - 86400000) // 1 day ago
    },
    {
      id: 2,
      name: "Sci-Fi Bestsellers",
      filters: {
        genre: ['sci-fi'],
        rating: '4',
        sortBy: 'popularity'
      },
      alertEnabled: false,
      lastUpdated: new Date(Date.now() - 172800000) // 2 days ago
    },
    {
      id: 3,
      name: "Mystery Books - Good Condition",
      filters: {
        genre: ['mystery'],
        condition: ['good', 'very-good'],
        priceMax: '15',
        freeShipping: true
      },
      alertEnabled: true,
      lastUpdated: new Date(Date.now() - 259200000) // 3 days ago
    }
  ]);

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newSearchName, setNewSearchName] = useState('');

  const handleSaveCurrentSearch = () => {
    if (!newSearchName?.trim()) return;

    const newSearch = {
      id: Date.now(),
      name: newSearchName?.trim(),
      filters: { ...currentFilters },
      alertEnabled: false,
      lastUpdated: new Date()
    };

    setSavedSearches(prev => [newSearch, ...prev]);
    setNewSearchName('');
    setShowSaveDialog(false);
  };

  const handleDeleteSearch = (searchId) => {
    setSavedSearches(prev => prev?.filter(search => search?.id !== searchId));
  };

  const handleToggleAlert = (searchId) => {
    setSavedSearches(prev => 
      prev?.map(search => 
        search?.id === searchId 
          ? { ...search, alertEnabled: !search?.alertEnabled }
          : search
      )
    );
  };

  const getFilterSummary = (filters) => {
    const parts = [];
    
    if (filters?.genre && filters?.genre?.length > 0) {
      parts?.push(`${filters?.genre?.length} genre${filters?.genre?.length > 1 ? 's' : ''}`);
    }
    
    if (filters?.priceMin || filters?.priceMax) {
      const min = filters?.priceMin || '0';
      const max = filters?.priceMax || '∞';
      parts?.push(`$${min}-${max}`);
    }
    
    if (filters?.condition && filters?.condition?.length > 0) {
      parts?.push(`${filters?.condition?.length} condition${filters?.condition?.length > 1 ? 's' : ''}`);
    }
    
    if (filters?.rating) {
      parts?.push(`${filters?.rating}+ stars`);
    }

    return parts?.length > 0 ? parts?.join(', ') : 'No filters';
  };

  const formatLastUpdated = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="bg-card rounded-lg border shadow-literary p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Bookmark" size={20} className="text-primary" />
          <h3 className="font-semibold text-lg text-foreground">Smart Searches</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSaveDialog(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Save Current
        </Button>
      </div>
      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="mb-4 p-4 bg-muted/30 rounded-lg border">
          <h4 className="font-medium text-sm text-foreground mb-3">Save Current Search</h4>
          <div className="space-y-3">
            <Input
              placeholder="Enter search name..."
              value={newSearchName}
              onChange={(e) => setNewSearchName(e?.target?.value)}
              onKeyDown={(e) => {
                if (e?.key === 'Enter') {
                  handleSaveCurrentSearch();
                } else if (e?.key === 'Escape') {
                  setShowSaveDialog(false);
                  setNewSearchName('');
                }
              }}
            />
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveCurrentSearch}
                disabled={!newSearchName?.trim()}
                className="flex-1"
              >
                Save Search
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowSaveDialog(false);
                  setNewSearchName('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Saved Searches List */}
      <div className="space-y-3">
        {savedSearches?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Search" size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No saved searches yet</p>
            <p className="text-xs">Save your current search to get alerts for new matches</p>
          </div>
        ) : (
          savedSearches?.map((search) => (
            <div
              key={search?.id}
              className="p-3 border rounded-lg hover:bg-muted/30 transition-smooth"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm text-foreground truncate">
                      {search?.name}
                    </h4>
                    {search?.alertEnabled && (
                      <Icon name="Bell" size={12} className="text-warning" />
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                    {getFilterSummary(search?.filters)}
                  </p>
                  
                  <div className="text-xs text-muted-foreground">
                    Updated {formatLastUpdated(search?.lastUpdated)}
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onLoadSearch(search?.filters)}
                    className="h-8 w-8"
                    title="Load search"
                  >
                    <Icon name="Search" size={14} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleAlert(search?.id)}
                    className="h-8 w-8"
                    title={search?.alertEnabled ? "Disable alerts" : "Enable alerts"}
                  >
                    <Icon 
                      name={search?.alertEnabled ? "BellRing" : "BellOff"} 
                      size={14} 
                      className={search?.alertEnabled ? "text-warning" : "text-muted-foreground"}
                    />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteSearch(search?.id)}
                    className="h-8 w-8 text-error hover:text-error"
                    title="Delete search"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Alert Info */}
      {savedSearches?.some(search => search?.alertEnabled) && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start gap-2">
            <Icon name="Bell" size={16} className="text-warning mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium mb-1">Email alerts enabled</p>
              <p>You'll receive notifications when new books match your saved searches.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedSearches;