import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import PointsOverview from './components/PointsOverview';
import RecentActivity from './components/RecentActivity';
import RewardsCatalog from './components/RewardsCatalog';
import TierBenefits from './components/TierBenefits';
import MemberDeals from './components/MemberDeals';
import AchievementGallery from './components/AchievementGallery';
import ReferralCenter from './components/ReferralCenter';
import ChallengeTracker from './components/ChallengeTracker';
import { Star, Trophy, Gift, Users, Target, Crown, Award, Zap } from 'lucide-react';
import Icon from '../../components/AppIcon';


const LoyaltyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Mock user data
  const userData = {
    currentPoints: 12750,
    tierStatus: 'Gold',
    nextTierPoints: 15000,
    pointsToNext: 2250
  };

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'purchase',
      description: 'Book Purchase',
      details: 'The Seven Husbands of Evelyn Hugo',
      points: 125,
      date: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      type: 'review',
      description: 'Book Review',
      details: 'Reviewed "Atomic Habits"',
      points: 50,
      date: new Date(Date.now() - 5 * 60 * 60 * 1000)
    },
    {
      id: 3,
      type: 'referral',
      description: 'Friend Referral',
      details: 'Sarah Johnson joined BookBridge',
      points: 500,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: 4,
      type: 'challenge',
      description: 'Challenge Completed',
      details: 'Summer Reading Challenge',
      points: 1000,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 5,
      type: 'bonus',
      description: 'Birthday Bonus',
      details: 'Happy Birthday from BookBridge!',
      points: 200,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: 6,
      type: 'redemption',
      description: 'Reward Redeemed',
      details: 'Free shipping voucher',
      points: -100,
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
    }
  ];

  // Mock rewards catalog
  const rewardsCatalog = [
    {
      id: 1,
      title: '10% Off Coupon',
      description: 'Valid on any book purchase',
      cost: 500,
      category: 'discounts',
      icon: 'Percent',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: 2,
      title: 'Free Shipping',
      description: 'Free shipping on next order',
      cost: 200,
      category: 'shipping',
      icon: 'Truck'
    },
    {
      id: 3,
      title: 'Mystery Book',
      description: 'Curated book based on your preferences',
      cost: 1000,
      category: 'books',
      icon: 'Gift'
    },
    {
      id: 4,
      title: 'Early Access',
      description: '24-hour early access to flash sales',
      cost: 750,
      category: 'exclusive',
      icon: 'Clock'
    },
    {
      id: 5,
      title: 'Book Club Membership',
      description: '3 months premium book club access',
      cost: 2000,
      category: 'exclusive',
      icon: 'Users'
    },
    {
      id: 6,
      title: 'Author Meet & Greet',
      description: 'Virtual meet with featured authors',
      cost: 3000,
      category: 'exclusive',
      icon: 'Video'
    }
  ];

  // Mock tier benefits
  const tierBenefits = [
    {
      name: 'Bronze',
      pointsRequired: 0,
      icon: 'Award',
      benefits: [
        'Earn 1 point per $1 spent',
        'Birthday bonus: 100 points',
        'Free account setup',
        'Basic customer support'
      ]
    },
    {
      name: 'Silver',
      pointsRequired: 2500,
      icon: 'Star',
      benefits: [
        'Earn 1.25 points per $1 spent',
        'Birthday bonus: 200 points',
        'Free shipping on orders over $25',
        'Priority customer support',
        'Early sale notifications'
      ],
      specialPerks: [
        'Monthly book recommendations',
        'Access to member-only deals'
      ]
    },
    {
      name: 'Gold',
      pointsRequired: 7500,
      icon: 'Crown',
      benefits: [
        'Earn 1.5 points per $1 spent',
        'Birthday bonus: 300 points',
        'Free shipping on all orders',
        'Premium customer support',
        '24-hour early sale access',
        'Exclusive book previews'
      ],
      specialPerks: [
        'Quarterly surprise book box',
        'Author Q&A session invites',
        'Personal reading consultant'
      ]
    },
    {
      name: 'Platinum',
      pointsRequired: 15000,
      icon: 'Gem',
      benefits: [
        'Earn 2 points per $1 spent',
        'Birthday bonus: 500 points',
        'Free express shipping',
        'VIP customer support',
        '48-hour early sale access',
        'Beta feature access',
        'Annual reading report'
      ],
      specialPerks: [
        'Monthly signed book edition',
        'Private author events',
        'Custom book curation service',
        'Lifetime account protection'
      ]
    }
  ];

  // Mock member deals
  const memberDeals = [
    {
      id: 1,
      title: 'The Thursday Murder Club',
      author: 'Richard Osman',
      bookCover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
      originalPrice: 16.99,
      memberPrice: 9.99,
      rating: 4.5,
      reviewCount: 1247,
      timeLeft: '2 days left',
      bonusPoints: 50
    },
    {
      id: 2,
      title: 'Educated',
      author: 'Tara Westover',
      bookCover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
      originalPrice: 18.99,
      memberPrice: 11.99,
      rating: 4.8,
      reviewCount: 2156,
      timeLeft: '5 hours left',
      bonusPoints: 75
    },
    {
      id: 3,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      bookCover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
      originalPrice: 15.99,
      memberPrice: 8.99,
      rating: 4.3,
      reviewCount: 892,
      timeLeft: '1 day left',
      bonusPoints: 40
    }
  ];

  // Mock achievements
  const achievements = [
    {
      id: 1,
      title: 'First Purchase',
      description: 'Made your first book purchase',
      category: 'shopping',
      icon: 'ShoppingBag',
      unlocked: true,
      unlockedDate: '2024-01-15',
      rarity: 'common'
    },
    {
      id: 2,
      title: 'Review Master',
      description: 'Written 10 book reviews',
      category: 'community',
      icon: 'MessageSquare',
      unlocked: true,
      unlockedDate: '2024-03-22',
      rarity: 'rare'
    },
    {
      id: 3,
      title: 'Speed Reader',
      description: 'Read 50 books in a year',
      category: 'reading',
      icon: 'Zap',
      unlocked: false,
      progress: { current: 32, target: 50 },
      hint: 'Keep reading to unlock this achievement!'
    },
    {
      id: 4,
      title: 'Community Champion',
      description: 'Referred 5 friends to BookBridge',
      category: 'community',
      icon: 'Users',
      unlocked: true,
      unlockedDate: '2024-06-10',
      rarity: 'epic'
    },
    {
      id: 5,
      title: 'Genre Explorer',
      description: 'Read books from 10 different genres',
      category: 'reading',
      icon: 'Compass',
      unlocked: false,
      progress: { current: 7, target: 10 },
      hint: 'Try exploring mystery or sci-fi genres!'
    },
    {
      id: 6,
      title: 'Loyalty Legend',
      description: 'Reached Platinum tier status',
      category: 'special',
      icon: 'Crown',
      unlocked: false,
      hint: 'Keep earning points to reach Platinum tier!'
    }
  ];

  // Mock referral data
  const referralData = {
    referralCode: 'BOOK2024',
    totalReferrals: 12,
    successfulReferrals: 8,
    pointsEarned: 4000,
    recentReferrals: [
      {
        id: 1,
        name: 'Sarah Johnson',
        joinDate: '2024-08-15',
        status: 'completed',
        pointsEarned: 500
      },
      {
        id: 2,
        name: 'Mike Chen',
        joinDate: '2024-08-10',
        status: 'completed',
        pointsEarned: 500
      },
      {
        id: 3,
        name: 'Emma Davis',
        joinDate: '2024-08-18',
        status: 'pending',
        pointsEarned: 0
      }
    ]
  };

  // Mock challenges
  const challenges = [
    {
      id: 1,
      title: 'Summer Reading Challenge',
      description: 'Read 12 books during summer months',
      type: 'reading',
      participants: 2847,
      endDate: '2024-09-21',
      rewardPoints: 1000,
      joined: true,
      progress: { current: 8, target: 12, percentage: 67 },
      leaderboard: {
        userRank: 156,
        topThree: [
          { name: 'BookLover23', progress: 12 },
          { name: 'ReadingQueen', progress: 11 },
          { name: 'PageTurner', progress: 10 }
        ]
      },
      badges: [
        { name: 'Speed Reader', icon: 'Zap' },
        { name: 'Consistent', icon: 'Calendar' }
      ]
    },
    {
      id: 2,
      title: 'Review Week',
      description: 'Write 5 book reviews in one week',
      type: 'review',
      participants: 1523,
      endDate: '2024-08-28',
      rewardPoints: 500,
      joined: false,
      badges: [
        { name: 'Critic', icon: 'MessageSquare' }
      ]
    },
    {
      id: 3,
      title: 'Genre Explorer',
      description: 'Read books from 5 different genres',
      type: 'reading',
      participants: 3421,
      endDate: '2024-12-31',
      rewardPoints: 750,
      joined: true,
      progress: { current: 3, target: 5, percentage: 60 },
      leaderboard: {
        userRank: 89,
        topThree: [
          { name: 'GenreMaster', progress: 5 },
          { name: 'BookExplorer', progress: 5 },
          { name: 'ReadingNomad', progress: 4 }
        ]
      }
    }
  ];

  const handleRewardRedeem = (reward) => {
    if (userData?.currentPoints >= reward?.cost) {
      // Show confetti animation
      setShowLevelUpAnimation(true);
      setTimeout(() => setShowLevelUpAnimation(false), 2000);
      alert(`Successfully redeemed: ${reward?.title}! 🎉`);
      // In a real app, this would update the user's points and add the reward to their account
    }
  };

  const handleSendInvite = (email, message) => {
    alert(`Invitation sent to ${email} 📧`);
    // In a real app, this would send an email invitation
  };

  const handleJoinChallenge = (challengeId) => {
    // Show confetti animation
    setShowLevelUpAnimation(true);
    setTimeout(() => setShowLevelUpAnimation(false), 1500);
    alert(`Successfully joined challenge! 🎯`);
    // In a real app, this would update the user's challenge participation
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'referrals', label: 'Referrals', icon: Users },
    { id: 'challenges', label: 'Challenges', icon: Zap }
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement?.classList?.toggle('dark');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen bg-background transition-smooth ${darkMode ? 'dark' : ''}`}>
      <Header />
      
      {/* Confetti Animation Overlay */}
      {showLevelUpAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-confetti">🎉</div>
          <div className="text-4xl animate-confetti delay-100">✨</div>
          <div className="text-5xl animate-confetti delay-200">🎊</div>
        </div>
      )}
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Page Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-serif font-bold text-foreground mb-2 text-shadow-soft">
                  Loyalty Dashboard
                </h1>
                <p className="text-lg text-muted-foreground">
                  Track your points, redeem rewards, and unlock exclusive benefits
                </p>
              </div>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="btn-outline p-3 rounded-full hover-lift"
                aria-label="Toggle dark mode"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
            
            {/* Quick Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
              <div className="card-modern p-4 text-center hover-lift">
                <div className="text-2xl font-bold points-display">{userData?.currentPoints?.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
              <div className="card-modern p-4 text-center hover-lift">
                <div className="text-2xl font-bold text-secondary">{userData?.tierStatus}</div>
                <div className="text-sm text-muted-foreground">Current Tier</div>
              </div>
              <div className="card-modern p-4 text-center hover-lift">
                <div className="text-2xl font-bold text-success">{achievements?.filter(a => a?.unlocked)?.length}</div>
                <div className="text-sm text-muted-foreground">Achievements</div>
              </div>
              <div className="card-modern p-4 text-center hover-lift">
                <div className="text-2xl font-bold text-primary">{referralData?.successfulReferrals}</div>
                <div className="text-sm text-muted-foreground">Referrals</div>
              </div>
            </div>
          </div>

          {/* Enhanced Tab Navigation */}
          <div className="mb-8">
            <div className="flex justify-center">
              <div className="inline-flex p-1 bg-muted rounded-2xl">
                <nav className="flex space-x-1">
                  {tabs?.map((tab) => {
                    const Icon = tab?.icon;
                    return (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`${
                          activeTab === tab?.id ? 'nav-tab-active' : 'nav-tab'
                        } min-w-[120px]`}
                      >
                        <Icon size={18} />
                        <span>{tab?.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Enhanced Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <PointsOverview
                      currentPoints={userData?.currentPoints}
                      tierStatus={userData?.tierStatus}
                      nextTierPoints={userData?.nextTierPoints}
                      pointsToNext={userData?.pointsToNext}
                    />
                  </div>
                  <div>
                    <RecentActivity activities={recentActivities} />
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <MemberDeals deals={memberDeals} userTier={userData?.tierStatus} />
                  <TierBenefits currentTier={userData?.tierStatus} tiers={tierBenefits} />
                </div>
              </>
            )}

            {activeTab === 'rewards' && (
              <RewardsCatalog
                rewards={rewardsCatalog}
                userPoints={userData?.currentPoints}
                onRedeem={handleRewardRedeem}
              />
            )}

            {activeTab === 'achievements' && (
              <AchievementGallery achievements={achievements} />
            )}

            {activeTab === 'referrals' && (
              <ReferralCenter
                referralData={referralData}
                onSendInvite={handleSendInvite}
              />
            )}

            {activeTab === 'challenges' && (
              <ChallengeTracker
                challenges={challenges}
                onJoinChallenge={handleJoinChallenge}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoyaltyDashboard;