import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunitySpotlight = () => {
  const navigate = useNavigate();

  const recentReviews = [
    {
      id: 1,
      user: "Sarah M.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      book: "The Silent Patient",
      rating: 5,
      review: "Absolutely gripping! Couldn't put it down. The twist at the end completely blew my mind.",
      timeAgo: "2 hours ago",
      helpful: 23,
      verified: true
    },
    {
      id: 2,
      user: "Mike R.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      book: "Atomic Habits",
      rating: 5,
      review: "Life-changing book! The practical strategies are easy to implement and actually work.",
      timeAgo: "5 hours ago",
      helpful: 18,
      verified: true
    },
    {
      id: 3,
      user: "Emma L.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      book: "Project Hail Mary",
      rating: 4,
      review: "Andy Weir does it again! Great science fiction with humor and heart.",
      timeAgo: "1 day ago",
      helpful: 31,
      verified: true
    }
  ];

  const challengeWinners = [
    {
      id: 1,
      user: "BookWorm_2024",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      challenge: "30 Books in 30 Days",
      achievement: "Completed 32 books",
      badge: "Speed Reader",
      points: 1500
    },
    {
      id: 2,
      user: "LiteraryLion",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      challenge: "Genre Explorer",
      achievement: "Read 15 different genres",
      badge: "Genre Master",
      points: 1200
    }
  ];

  const trendingLists = [
    {
      id: 1,
      title: "Best Books Under $10",
      creator: "BudgetReader",
      books: 25,
      followers: 1247,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=120&fit=crop",
      trending: true
    },
    {
      id: 2,
      title: "Hidden Sci-Fi Gems",
      creator: "SciFiExplorer",
      books: 18,
      followers: 892,
      image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?w=200&h=120&fit=crop",
      trending: true
    },
    {
      id: 3,
      title: "Cozy Mystery Collection",
      creator: "MysteryMaven",
      books: 32,
      followers: 1534,
      image: "https://images.pixabay.com/photo/2016/03/27/07/32/books-1282309_1280.jpg?w=200&h=120&fit=crop",
      trending: false
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <section className="py-16 bg-warm-canvas">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-accent font-bold text-primary mb-4">
            Community Spotlight
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover what fellow readers are loving, achieving, and recommending
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Reviews */}
          <div className="card-literary p-6">
            <div className="flex items-center gap-2 mb-6">
              <Icon name="MessageSquare" size={20} className="text-primary" />
              <h3 className="text-xl font-semibold text-primary">Recent Reviews</h3>
            </div>

            <div className="space-y-4">
              {recentReviews?.map((review) => (
                <div key={review?.id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <Image
                      src={review?.avatar}
                      alt={review?.user}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{review?.user}</span>
                        {review?.verified && (
                          <Icon name="BadgeCheck" size={14} className="text-trust-green" />
                        )}
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{review?.timeAgo}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 mb-2">
                        {renderStars(review?.rating)}
                        <span className="text-sm text-muted-foreground ml-1">
                          for "{review?.book}"
                        </span>
                      </div>
                      
                      <p className="text-sm text-foreground mb-2 line-clamp-2">
                        {review?.review}
                      </p>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name="ThumbsUp" size={12} />
                        <span>{review?.helpful} helpful</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => navigate('/community-hub')}
              className="w-full mt-4"
            >
              View All Reviews
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>

          {/* Challenge Winners */}
          <div className="card-literary p-6">
            <div className="flex items-center gap-2 mb-6">
              <Icon name="Trophy" size={20} className="text-accent" />
              <h3 className="text-xl font-semibold text-primary">Challenge Winners</h3>
            </div>

            <div className="space-y-6">
              {challengeWinners?.map((winner) => (
                <div key={winner?.id} className="text-center">
                  <div className="relative inline-block mb-3">
                    <Image
                      src={winner?.avatar}
                      alt={winner?.user}
                      className="w-16 h-16 rounded-full object-cover mx-auto"
                    />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <Icon name="Crown" size={12} color="white" />
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-foreground mb-1">{winner?.user}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{winner?.challenge}</p>
                  <p className="text-sm font-medium text-primary mb-2">{winner?.achievement}</p>
                  
                  <div className="inline-flex items-center gap-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium">
                    <Icon name="Award" size={12} />
                    {winner?.badge}
                  </div>
                  
                  <div className="mt-2 text-xs text-muted-foreground">
                    +{winner?.points} points earned
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => navigate('/community-hub')}
              className="w-full mt-6"
            >
              Join Challenges
              <Icon name="Target" size={16} className="ml-2" />
            </Button>
          </div>

          {/* Trending Lists */}
          <div className="card-literary p-6">
            <div className="flex items-center gap-2 mb-6">
              <Icon name="TrendingUp" size={20} className="text-trust-green" />
              <h3 className="text-xl font-semibold text-primary">Trending Lists</h3>
            </div>

            <div className="space-y-4">
              {trendingLists?.map((list) => (
                <div key={list?.id} className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer">
                  <Image
                    src={list?.image}
                    alt={list?.title}
                    className="w-16 h-12 rounded-md object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm text-foreground line-clamp-1">
                        {list?.title}
                      </h4>
                      {list?.trending && (
                        <Icon name="TrendingUp" size={12} className="text-trust-green" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      by {list?.creator}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{list?.books} books</span>
                      <span>•</span>
                      <span>{list?.followers} followers</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => navigate('/community-hub')}
              className="w-full mt-4"
            >
              Explore Lists
              <Icon name="List" size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySpotlight;