import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementGallery = ({ achievements }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: 'Award' },
    { id: 'reading', label: 'Reading', icon: 'Book' },
    { id: 'community', label: 'Community', icon: 'Users' },
    { id: 'shopping', label: 'Shopping', icon: 'ShoppingBag' },
    { id: 'special', label: 'Special', icon: 'Star' }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements?.filter(achievement => achievement?.category === selectedCategory);

  const unlockedCount = achievements?.filter(a => a?.unlocked)?.length;
  const totalCount = achievements?.length;

  const shareAchievement = (achievement) => {
    if (navigator.share) {
      navigator.share({
        title: `I earned the "${achievement?.title}" badge on BookBridge!`,
        text: achievement?.description,
        url: window.location?.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `I earned the "${achievement?.title}" badge on BookBridge! ${achievement?.description}`;
      navigator.clipboard?.writeText(text);
    }
  };

  return (
    <div className="card-literary p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Award" size={24} className="text-accent" />
          <h3 className="text-xl font-headline font-semibold">Achievement Gallery</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          {unlockedCount} of {totalCount} unlocked
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-sm text-muted-foreground">
            {Math.round((unlockedCount / totalCount) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-500"
            style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
          ></div>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-smooth ${
              selectedCategory === category?.id
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={category?.icon} size={14} />
            {category?.label}
          </button>
        ))}
      </div>
      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAchievements?.map((achievement) => (
          <div 
            key={achievement?.id} 
            className={`relative p-4 rounded-lg border-2 transition-smooth hover:shadow-book-hover ${
              achievement?.unlocked 
                ? 'border-accent bg-accent/5' :'border-border bg-muted/30'
            }`}
          >
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                achievement?.unlocked 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Icon 
                  name={achievement?.icon} 
                  size={24} 
                  className={achievement?.unlocked ? '' : 'opacity-50'} 
                />
              </div>

              <h4 className={`font-semibold mb-2 ${
                achievement?.unlocked ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {achievement?.title}
              </h4>

              <p className={`text-sm mb-3 ${
                achievement?.unlocked ? 'text-muted-foreground' : 'text-muted-foreground/70'
              }`}>
                {achievement?.description}
              </p>

              {achievement?.unlocked ? (
                <div className="space-y-2">
                  <div className="text-xs text-trust-green font-medium">
                    Unlocked {new Date(achievement.unlockedDate)?.toLocaleDateString()}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => shareAchievement(achievement)}
                    className="w-full"
                  >
                    <Icon name="Share2" size={14} />
                    Share
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {achievement?.progress && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">
                        Progress: {achievement?.progress?.current}/{achievement?.progress?.target}
                      </div>
                      <div className="w-full bg-muted rounded-full h-1">
                        <div 
                          className="bg-accent h-1 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${Math.min((achievement?.progress?.current / achievement?.progress?.target) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {achievement?.hint || 'Keep exploring to unlock!'}
                  </div>
                </div>
              )}

              {achievement?.rarity && (
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${
                  achievement?.rarity === 'legendary' ? 'bg-purple-600 text-white' :
                  achievement?.rarity === 'epic' ? 'bg-orange-600 text-white' :
                  achievement?.rarity === 'rare'? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'
                }`}>
                  {achievement?.rarity}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {filteredAchievements?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Award" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No achievements in this category yet</p>
        </div>
      )}
    </div>
  );
};

export default AchievementGallery;