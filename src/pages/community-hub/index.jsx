import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ChallengeCard from './components/ChallengeCard';
import BookClubCard from './components/BookClubCard';
import ReadingListCard from './components/ReadingListCard';
import ReviewSpotlight from './components/ReviewSpotlight';
import AuthorQACard from './components/AuthorQACard';
import AchievementBadge from './components/AchievementBadge';
import ReadingBuddyCard from './components/ReadingBuddyCard';
import ActivityFeed from './components/ActivityFeed';

const CommunityHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userStats, setUserStats] = useState({});
  const [participatingChallenges, setParticipatingChallenges] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState([]);

  // Mock data for reading challenges
  const readingChallenges = [
    {
      id: 1,
      title: "2025 Reading Challenge",
      description: "Read 52 books this year and discover new genres, authors, and perspectives. Join thousands of readers in this annual tradition.",
      type: "reading",
      target: 52,
      unit: "books",
      participants: 15420,
      reward: "500 points + Badge",
      endDate: "2025-12-31",
      userProgress: 8,
      isNew: false
    },
    {
      id: 2,
      title: "Budget Book Hunter",
      description: "Find and read 20 amazing books under $5 each. Prove that great literature doesn't require a big budget.",
      type: "reading",
      target: 20,
      unit: "books",
      participants: 3240,
      reward: "300 points + Discount",
      endDate: "2025-06-30",
      userProgress: 0,
      isNew: true
    },
    {
      id: 3,
      title: "Review Master",
      description: "Write 25 detailed book reviews to help fellow readers discover their next great read.",
      type: "review",
      target: 25,
      unit: "reviews",
      participants: 1890,
      reward: "200 points + Badge",
      endDate: "2025-09-30",
      userProgress: 0,
      isNew: false
    }
  ];

  // Mock data for book clubs
  const bookClubs = [
    {
      id: 1,
      name: "Thriller Seekers",
      description: "Dive into heart-pounding mysteries and psychological thrillers. We focus on budget-friendly picks that deliver maximum suspense.",
      currentBook: {
        title: "The Silent Patient",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop"
      },
      members: 2340,
      discussions: 156,
      recentActivity: 45,
      nextMeeting: "Jan 28, 2025",
      recentMembers: [
        { name: "Sarah", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
        { name: "Mike", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
        { name: "Lisa", avatar: "https://randomuser.me/api/portraits/women/3.jpg" }
      ],
      isNew: false
    },
    {
      id: 2,
      name: "Sci-Fi Explorers",
      description: "Journey through space, time, and imagination with fellow science fiction enthusiasts. Discover hidden gems and classic masterpieces.",
      currentBook: {
        title: "Project Hail Mary",
        cover: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop"
      },
      members: 1890,
      discussions: 203,
      recentActivity: 67,
      nextMeeting: "Jan 25, 2025",
      recentMembers: [
        { name: "Alex", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
        { name: "Emma", avatar: "https://randomuser.me/api/portraits/women/5.jpg" },
        { name: "David", avatar: "https://randomuser.me/api/portraits/men/6.jpg" }
      ],
      isNew: true
    }
  ];

  // Mock data for reading lists
  const readingLists = [
    {
      id: 1,
      title: "Best Thrillers Under $8",
      description: "Heart-pounding page-turners that won\'t break the bank. Each book delivers maximum suspense for minimal cost.",
      creator: {
        name: "BookHunter23",
        avatar: "https://randomuser.me/api/portraits/women/7.jpg"
      },
      books: [
        { title: "Gone Girl", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=150&fit=crop" },
        { title: "The Girl on the Train", cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=150&fit=crop" },
        { title: "Big Little Lies", cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=150&fit=crop" },
        { title: "The Silent Patient", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=150&fit=crop" }
      ],
      averagePrice: "6.50",
      views: 12400,
      likes: 890,
      comments: 156,
      saves: 445,
      tags: ["thriller", "mystery", "budget"],
      createdAt: "2025-01-15",
      isFeatured: true
    },
    {
      id: 2,
      title: "Hidden Literary Gems",
      description: "Discover overlooked masterpieces from emerging and established authors. These books deserve more recognition.",
      creator: {
        name: "LiteraryExplorer",
        avatar: "https://randomuser.me/api/portraits/men/8.jpg"
      },
      books: [
        { title: "The Seven Husbands", cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=150&fit=crop" },
        { title: "Klara and the Sun", cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=150&fit=crop" },
        { title: "The Midnight Library", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=150&fit=crop" }
      ],
      averagePrice: "9.20",
      views: 8900,
      likes: 567,
      comments: 89,
      saves: 234,
      tags: ["literary", "contemporary", "hidden gems"],
      createdAt: "2025-01-10",
      isFeatured: false
    }
  ];

  // Mock data for featured reviews
  const featuredReviews = [
    {
      id: 1,
      book: {
        title: "The Thursday Murder Club",
        author: "Richard Osman",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop"
      },
      reviewer: {
        name: "BookwormSarah",
        avatar: "https://randomuser.me/api/portraits/women/9.jpg",
        totalReviews: 156
      },
      rating: 5,
      title: "A Delightful Mystery with Heart",
      content: `This book absolutely charmed me from the first page. Osman has created a cast of characters so vivid and endearing that I felt like I was part of their Thursday meetings. The mystery is cleverly plotted, but what really makes this book shine is the humor and humanity of the residents at Coopers Chase retirement village.\n\nThe dialogue sparkles with wit, and each character has a distinct voice that feels authentic. Joyce's diary entries are particularly delightful, offering insights into both the mystery and the daily lives of these remarkable seniors. The way Osman weaves together past and present, showing how these characters' histories inform their present-day detective work, is masterful.\n\nAt under $10, this book is an absolute steal. It's the perfect blend of cozy mystery and character study, with enough twists to keep you guessing but never so complex that you lose track of the plot. I immediately ordered the next book in the series and can't wait to see what the Thursday Murder Club tackles next.`,
      createdAt: "2025-01-18",
      helpfulCount: 234,
      readingTime: 3,
      isVerifiedPurchase: true,
      authorResponse: "Thank you so much for this wonderful review! It means the world to know that Joyce and the gang have found such an enthusiastic fan. Happy reading!"
    }
  ];

  // Mock data for author Q&A sessions
  const authorSessions = [
    {
      id: 1,
      title: "Writing Authentic Characters",
      author: {
        name: "Sarah Chen",
        photo: "https://randomuser.me/api/portraits/women/10.jpg"
      },
      description: "Join bestselling author Sarah Chen as she discusses her approach to creating memorable, authentic characters that readers connect with emotionally.",
      scheduledDate: "2025-01-25T19:00:00",
      duration: 60,
      registeredCount: 340,
      questionsCount: 67,
      featuredBook: {
        title: "The Memory Keeper",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=150&fit=crop"
      }
    },
    {
      id: 2,
      title: "From Idea to Published Novel",
      author: {
        name: "Marcus Thompson",
        photo: "https://randomuser.me/api/portraits/men/11.jpg"
      },
      description: "Discover the complete journey from initial concept to published book with award-winning thriller author Marcus Thompson.",
      scheduledDate: "2025-01-30T18:00:00",
      duration: 90,
      registeredCount: 567,
      questionsCount: 123,
      featuredBook: {
        title: "Dark Waters",
        cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=150&fit=crop"
      }
    }
  ];

  // Mock data for achievements
  const achievements = [
    {
      id: 1,
      title: "First Review",
      description: "Write your first book review",
      icon: "Star",
      tier: "bronze",
      requirement: 1,
      points: 50,
      isUnlocked: true,
      unlockedDate: "Jan 15, 2025"
    },
    {
      id: 2,
      title: "Review Master",
      description: "Write 25 helpful book reviews",
      icon: "Award",
      tier: "gold",
      requirement: 25,
      points: 500,
      isUnlocked: false,
      progress: 8
    },
    {
      id: 3,
      title: "Challenge Champion",
      description: "Complete 5 reading challenges",
      icon: "Trophy",
      tier: "silver",
      requirement: 5,
      points: 300,
      isUnlocked: false,
      progress: 1
    },
    {
      id: 4,
      title: "Community Builder",
      description: "Help 10 readers find their next book",
      icon: "Users",
      tier: "platinum",
      requirement: 10,
      points: 750,
      isUnlocked: false,
      progress: 3
    }
  ];

  // Mock data for reading buddies
  const readingBuddies = [
    {
      id: 1,
      name: "Emma Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      location: "San Francisco, CA",
      bio: "Passionate reader of contemporary fiction and thrillers. Always looking for book recommendations and love discussing plot twists!",
      compatibilityScore: 94,
      booksRead: 127,
      averageRating: 4.2,
      favoriteGenres: ["Thriller", "Contemporary Fiction", "Mystery", "Romance"],
      currentlyReading: {
        title: "The Seven Moons",
        author: "Lisa Gardner",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=150&fit=crop"
      },
      responseTime: "Usually replies in 2h",
      mutualConnections: 5,
      lastActive: "2 hours ago",
      isOnline: true
    },
    {
      id: 2,
      name: "James Wilson",
      avatar: "https://randomuser.me/api/portraits/men/13.jpg",
      location: "Austin, TX",
      bio: "Sci-fi enthusiast and fantasy lover. I enjoy exploring new worlds and discussing the deeper meanings behind speculative fiction.",
      compatibilityScore: 87,
      booksRead: 203,
      averageRating: 4.5,
      favoriteGenres: ["Science Fiction", "Fantasy", "Horror", "Dystopian"],
      currentlyReading: {
        title: "Dune Messiah",
        author: "Frank Herbert",
        cover: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=100&h=150&fit=crop"
      },
      responseTime: "Usually replies in 4h",
      mutualConnections: 3,
      lastActive: "1 day ago",
      isOnline: false
    }
  ];

  // Mock data for activity feed
  const activityFeed = [
    {
      type: "review",
      user: { name: "BookLover23", avatar: "https://randomuser.me/api/portraits/women/14.jpg" },
      book: {
        title: "The Midnight Library",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=150&fit=crop"
      },
      rating: 5,
      reviewText: "This book changed my perspective on life choices and possibilities. Haig's writing is both philosophical and accessible.",
      timestamp: "2025-01-21T14:30:00",
      engagement: { likes: 23, comments: 8 },
      isNew: true
    },
    {
      type: "challenge_complete",
      user: { name: "ReadingNinja", avatar: "https://randomuser.me/api/portraits/men/15.jpg" },
      challenge: { title: "January Reading Sprint" },
      pointsEarned: 200,
      timestamp: "2025-01-21T12:15:00",
      engagement: { likes: 45, comments: 12 },
      isNew: true
    },
    {
      type: "reading_list",
      user: { name: "GenreMaster", avatar: "https://randomuser.me/api/portraits/women/16.jpg" },
      listTitle: "Cozy Mysteries for Winter",
      books: [
        { title: "Book 1", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=150&fit=crop" },
        { title: "Book 2", cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=150&fit=crop" },
        { title: "Book 3", cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=150&fit=crop" }
      ],
      likes: 67,
      timestamp: "2025-01-21T10:45:00",
      engagement: { likes: 67, comments: 15 },
      isNew: false
    }
  ];

  useEffect(() => {
    // Initialize user stats
    setUserStats({
      totalPoints: 1250,
      reviewsWritten: 8,
      challengesCompleted: 1,
      booksRead: 23,
      communityRank: 156
    });

    // Set participating challenges
    setParticipatingChallenges([1]);
    setJoinedClubs([1]);
  }, []);

  const handleJoinChallenge = (challenge) => {
    setParticipatingChallenges(prev => [...prev, challenge?.id]);
    // Show success message or modal
  };

  const handleJoinClub = (club) => {
    setJoinedClubs(prev => [...prev, club?.id]);
    // Show success message or modal
  };

  const handleViewBook = (book) => {
    navigate('/book-detail-pages', { state: { book } });
  };

  const handleViewProfile = (buddy) => {
    // Navigate to user profile or show modal
    console.log('View profile:', buddy);
  };

  const handleConnect = (buddy) => {
    // Send connection request
    console.log('Connect with:', buddy);
  };

  const handleSetReminder = (session) => {
    // Set reminder for author session
    console.log('Set reminder for:', session);
  };

  const handleLoadMoreActivities = () => {
    // Load more activities
    console.log('Loading more activities...');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'challenges', label: 'Challenges', icon: 'Target' },
    { id: 'clubs', label: 'Book Clubs', icon: 'Users' },
    { id: 'lists', label: 'Reading Lists', icon: 'BookOpen' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'authors', label: 'Author Q&A', icon: 'MessageCircle' },
    { id: 'buddies', label: 'Reading Buddies', icon: 'UserPlus' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Community Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="card-literary p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {userStats?.totalPoints?.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Points Earned</div>
              </div>
              <div className="card-literary p-4 text-center">
                <div className="text-2xl font-bold text-accent mb-1">
                  {userStats?.reviewsWritten}
                </div>
                <div className="text-sm text-muted-foreground">Reviews Written</div>
              </div>
              <div className="card-literary p-4 text-center">
                <div className="text-2xl font-bold text-success mb-1">
                  {userStats?.challengesCompleted}
                </div>
                <div className="text-sm text-muted-foreground">Challenges Done</div>
              </div>
              <div className="card-literary p-4 text-center">
                <div className="text-2xl font-bold text-secondary mb-1">
                  {userStats?.booksRead}
                </div>
                <div className="text-sm text-muted-foreground">Books Read</div>
              </div>
              <div className="card-literary p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  #{userStats?.communityRank}
                </div>
                <div className="text-sm text-muted-foreground">Community Rank</div>
              </div>
            </div>
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
                onClick={() => setActiveTab('challenges')}
              >
                <Icon name="Target" size={24} />
                <span>Join Challenge</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
                onClick={() => setActiveTab('clubs')}
              >
                <Icon name="Users" size={24} />
                <span>Find Book Club</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
                onClick={() => setActiveTab('buddies')}
              >
                <Icon name="UserPlus" size={24} />
                <span>Find Reading Buddy</span>
              </Button>
            </div>
            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-headline font-semibold text-foreground mb-6">
                Community Activity
              </h2>
              <ActivityFeed
                activities={activityFeed?.slice(0, 5)}
                onLoadMore={handleLoadMoreActivities}
                hasMore={true}
              />
            </div>
          </div>
        );

      case 'challenges':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-headline font-semibold text-foreground">
                Reading Challenges
              </h2>
              <Button variant="outline" size="sm">
                <Icon name="Filter" size={16} />
                Filter
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {readingChallenges?.map(challenge => (
                <ChallengeCard
                  key={challenge?.id}
                  challenge={challenge}
                  onJoin={handleJoinChallenge}
                  onViewDetails={(challenge) => console.log('View details:', challenge)}
                  isParticipating={participatingChallenges?.includes(challenge?.id)}
                />
              ))}
            </div>
          </div>
        );

      case 'clubs':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-headline font-semibold text-foreground">
                Book Clubs
              </h2>
              <Button variant="outline" size="sm">
                <Icon name="Plus" size={16} />
                Create Club
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {bookClubs?.map(club => (
                <BookClubCard
                  key={club?.id}
                  club={club}
                  onJoin={handleJoinClub}
                  onViewDiscussion={(club) => console.log('View discussion:', club)}
                  isMember={joinedClubs?.includes(club?.id)}
                />
              ))}
            </div>
          </div>
        );

      case 'lists':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-headline font-semibold text-foreground">
                Community Reading Lists
              </h2>
              <Button variant="outline" size="sm">
                <Icon name="Plus" size={16} />
                Create List
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {readingLists?.map(list => (
                <ReadingListCard
                  key={list?.id}
                  list={list}
                  onView={(list) => console.log('View list:', list)}
                  onLike={(list) => console.log('Like list:', list)}
                  onComment={(list) => console.log('Comment on list:', list)}
                />
              ))}
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-headline font-semibold text-foreground">
                Featured Reviews
              </h2>
              <Button variant="outline" size="sm">
                <Icon name="Star" size={16} />
                Write Review
              </Button>
            </div>
            <div className="space-y-6">
              {featuredReviews?.map(review => (
                <ReviewSpotlight
                  key={review?.id}
                  review={review}
                  onViewBook={handleViewBook}
                  onHelpful={(review) => console.log('Mark helpful:', review)}
                />
              ))}
            </div>
          </div>
        );

      case 'authors':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-headline font-semibold text-foreground">
                Author Q&A Sessions
              </h2>
              <Button variant="outline" size="sm">
                <Icon name="Calendar" size={16} />
                View Calendar
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {authorSessions?.map(session => (
                <AuthorQACard
                  key={session?.id}
                  session={session}
                  onJoin={(session) => console.log('Join session:', session)}
                  onSetReminder={handleSetReminder}
                />
              ))}
            </div>
          </div>
        );

      case 'buddies':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-headline font-semibold text-foreground">
                Find Reading Buddies
              </h2>
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} />
                Preferences
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {readingBuddies?.map(buddy => (
                <ReadingBuddyCard
                  key={buddy?.id}
                  buddy={buddy}
                  onConnect={handleConnect}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-headline font-semibold text-foreground">
                Your Achievements
              </h2>
              <div className="text-sm text-muted-foreground">
                {achievements?.filter(a => a?.isUnlocked)?.length} of {achievements?.length} unlocked
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements?.map(achievement => (
                <AchievementBadge
                  key={achievement?.id}
                  achievement={achievement}
                  isUnlocked={achievement?.isUnlocked}
                  progress={achievement?.progress}
                />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-literary rounded-lg flex items-center justify-center shadow-literary">
                <Icon name="Users" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-headline font-bold text-foreground">
                  Community Hub
                </h1>
                <p className="text-muted-foreground">
                  Connect, share, and discover with fellow book lovers
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
              {tabs?.map(tab => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground shadow-literary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span className="hidden sm:inline">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityHub;