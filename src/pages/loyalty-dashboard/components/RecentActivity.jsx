import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      purchase: 'ShoppingBag',
      review: 'MessageSquare',
      referral: 'Users',
      challenge: 'Target',
      bonus: 'Gift',
      redemption: 'ArrowDownCircle'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      purchase: 'text-trust-green',
      review: 'text-primary',
      referral: 'text-accent',
      challenge: 'text-purple-600',
      bonus: 'text-pink-600',
      redemption: 'text-red-600'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const formatDate = (date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffInHours = Math.floor((now - activityDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return activityDate?.toLocaleDateString();
  };

  return (
    <div className="card-literary p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="Activity" size={24} className="text-primary" />
        <h3 className="text-xl font-headline font-semibold">Recent Activity</h3>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-hide">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
            <div className={`p-2 rounded-full bg-muted ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-foreground">{activity?.description}</p>
                  <p className="text-sm text-muted-foreground mt-1">{activity?.details}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`font-semibold ${activity?.points > 0 ? 'text-trust-green' : 'text-red-600'}`}>
                    {activity?.points > 0 ? '+' : ''}{activity?.points} pts
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatDate(activity?.date)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t">
        <button className="w-full text-center text-primary hover:text-primary/80 font-medium transition-smooth">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;