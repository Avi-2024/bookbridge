import React from 'react';
import { Star, Crown, Award, Gem, Coins, TrendingUp } from 'lucide-react';

const PointsOverview = ({ currentPoints, tierStatus, nextTierPoints, pointsToNext }) => {
  const tierConfigs = {
    Bronze: { 
      color: 'tier-bronze', 
      icon: Award, 
      bgGradient: 'from-amber-500 to-amber-600',
      ringColor: 'ring-amber-500/20'
    },
    Silver: { 
      color: 'tier-silver', 
      icon: Star, 
      bgGradient: 'from-gray-400 to-gray-500',
      ringColor: 'ring-gray-400/20'
    },
    Gold: { 
      color: 'tier-gold', 
      icon: Crown, 
      bgGradient: 'from-yellow-400 to-yellow-600',
      ringColor: 'ring-yellow-400/20'
    },
    Platinum: { 
      color: 'tier-platinum', 
      icon: Gem, 
      bgGradient: 'from-purple-500 to-purple-700',
      ringColor: 'ring-purple-500/20'
    }
  };

  const currentTier = tierConfigs?.[tierStatus] || tierConfigs?.Bronze;
  const TierIcon = currentTier?.icon;
  const progressPercentage = Math.min(((nextTierPoints - pointsToNext) / nextTierPoints) * 100, 100);

  return (
    <div className="card-modern p-8 bg-gradient-to-br from-white via-blue-50 to-amber-50 border-2 hover-lift">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
            Your Points Balance
          </h2>
          <div className="flex items-center gap-3">
            <span className="points-display">{currentPoints?.toLocaleString()}</span>
            <div className="p-2 bg-secondary/10 rounded-full">
              <Coins size={28} className="text-secondary" />
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className={`${currentTier?.color} px-6 py-3 rounded-2xl shadow-book ring-4 ${currentTier?.ringColor}`}>
            <TierIcon size={24} className="mx-auto mb-1" />
            <span className="font-semibold text-lg">{tierStatus} Member</span>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-muted-foreground" />
            <span className="text-muted-foreground font-medium">
              Progress to {tierStatus === 'Platinum' ? 'Platinum Elite' : 'Next Tier'}
            </span>
          </div>
          <div className="text-right">
            <span className="font-bold text-lg text-primary">{pointsToNext} points</span>
            <div className="text-sm text-muted-foreground">to go</div>
          </div>
        </div>
        
        {/* Enhanced Progress Bar */}
        <div className="relative">
          <div className="progress-bar bg-gray-200 h-4 rounded-full overflow-hidden shadow-inner">
            <div 
              className="progress-fill h-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {/* Progress Indicator */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-book border-2 border-primary transition-smooth"
            style={{ left: `${Math.max(progressPercentage - 2, 0)}%` }}
          >
            <div className="w-2 h-2 bg-primary rounded-full mx-auto mt-1" />
          </div>
        </div>
        
        {/* Progress Stats */}
        <div className="flex justify-between text-sm">
          <div className="text-center">
            <div className="font-semibold text-foreground">{(nextTierPoints - pointsToNext)?.toLocaleString()}</div>
            <div className="text-muted-foreground">Current Progress</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-primary">{Math.round(progressPercentage)}%</div>
            <div className="text-muted-foreground">Complete</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-foreground">{nextTierPoints?.toLocaleString()}</div>
            <div className="text-muted-foreground">Target</div>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
        <div className="flex items-center gap-2 text-sm">
          <div className="p-1 bg-primary/10 rounded-full">
            <Star size={14} className="text-primary" />
          </div>
          <span className="text-foreground font-medium">
            {pointsToNext <= 500 
              ? `You're so close! Just ${pointsToNext} more points to reach ${tierStatus === 'Bronze' ? 'Silver' : tierStatus === 'Silver' ? 'Gold' : 'Platinum'}!`
              : `Keep earning points to unlock exclusive ${tierStatus === 'Bronze' ? 'Silver' : tierStatus === 'Silver' ? 'Gold' : 'Platinum'} benefits!`
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default PointsOverview;