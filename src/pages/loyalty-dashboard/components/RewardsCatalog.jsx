import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RewardsCatalog = ({ rewards, userPoints, onRedeem }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Rewards', icon: 'Gift' },
    { id: 'discounts', label: 'Discounts', icon: 'Percent' },
    { id: 'shipping', label: 'Shipping', icon: 'Truck' },
    { id: 'books', label: 'Free Books', icon: 'Book' },
    { id: 'exclusive', label: 'Exclusive', icon: 'Star' }
  ];

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards?.filter(reward => reward?.category === selectedCategory);

  const canAfford = (cost) => userPoints >= cost;

  return (
    <div className="card-literary p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="Gift" size={24} className="text-accent" />
        <h3 className="text-xl font-headline font-semibold">Rewards Catalog</h3>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
              selectedCategory === category?.id
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            {category?.label}
          </button>
        ))}
      </div>
      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRewards?.map((reward) => (
          <div key={reward?.id} className="border rounded-lg p-4 hover:shadow-book-hover transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Icon name={reward?.icon} size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{reward?.title}</h4>
                  <p className="text-sm text-muted-foreground">{reward?.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Icon name="Coins" size={16} className="text-accent" />
                <span className="font-bold text-accent">{reward?.cost?.toLocaleString()}</span>
              </div>
              
              <Button
                variant={canAfford(reward?.cost) ? "default" : "outline"}
                size="sm"
                disabled={!canAfford(reward?.cost)}
                onClick={() => onRedeem(reward)}
                className="min-w-20"
              >
                {canAfford(reward?.cost) ? 'Redeem' : 'Need More'}
              </Button>
            </div>

            {reward?.expiresAt && (
              <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                <Icon name="Clock" size={12} />
                Expires: {new Date(reward.expiresAt)?.toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredRewards?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No rewards available in this category</p>
        </div>
      )}
    </div>
  );
};

export default RewardsCatalog;