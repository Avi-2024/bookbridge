import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadge = ({ achievement, isUnlocked = false, progress = 0 }) => {
  const getProgressPercentage = () => {
    if (isUnlocked) return 100;
    return Math.min((progress / achievement?.requirement) * 100, 100);
  };

  const getBadgeColor = () => {
    switch (achievement?.tier) {
      case 'bronze': return 'from-amber-600 to-amber-800';
      case 'silver': return 'from-gray-400 to-gray-600';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'platinum': return 'from-purple-400 to-purple-600';
      default: return 'from-primary to-secondary';
    }
  };

  return (
    <div className={`relative p-4 rounded-lg border transition-smooth ${
      isUnlocked 
        ? 'bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 shadow-literary' 
        : 'bg-muted/30 border-muted hover:bg-muted/50'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`relative w-12 h-12 rounded-full flex items-center justify-center ${
          isUnlocked 
            ? `bg-gradient-to-br ${getBadgeColor()} shadow-literary` 
            : 'bg-muted'
        }`}>
          <Icon 
            name={achievement?.icon} 
            size={24} 
            className={isUnlocked ? 'text-white' : 'text-muted-foreground'}
          />
          {isUnlocked && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={10} color="white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h4 className={`font-semibold ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
            {achievement?.title}
          </h4>
          <p className="text-sm text-muted-foreground mb-2">
            {achievement?.description}
          </p>
          
          {!isUnlocked && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Progress: {progress} / {achievement?.requirement}
                </span>
                <span className="text-muted-foreground">
                  {Math.round(getProgressPercentage())}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className="bg-primary rounded-full h-1.5 transition-all duration-500"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            </div>
          )}
          
          {isUnlocked && (
            <div className="flex items-center gap-2 text-sm">
              <div className="community-badge">
                <Icon name="Award" size={12} />
                {achievement?.points} points earned
              </div>
              <span className="text-muted-foreground">
                Unlocked {achievement?.unlockedDate}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge;