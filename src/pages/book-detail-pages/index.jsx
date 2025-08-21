import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BookCoverSection from './components/BookCoverSection';
import BookInfoSection from './components/BookInfoSection';
import PriceHistoryChart from './components/PriceHistoryChart';
import ReviewsSection from './components/ReviewsSection';
import RecommendationsCarousel from './components/RecommendationsCarousel';
import Icon from '../../components/AppIcon';

const BookDetailPages = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Mock book data
  const bookData = {
    id: "book-001",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    publisher: "Atria Books",
    publishYear: "2017",
    isbn: "978-1501161933",
    pages: 400,
    language: "English",
    format: "Paperback",
    readingLevel: "Adult",
    dimensions: "5.31 x 0.9 x 8 inches",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    backCover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    spineImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    authorPhoto: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8c5?w=400&h=400&fit=crop",
    currentPrice: 12.99,
    originalPrice: 16.99,
    dealPercentage: 24,
    memberDiscount: 1.50,
    condition: "New",
    rating: 4.6,
    reviewCount: 201,
    genres: ["Contemporary Fiction", "Romance", "Historical Fiction", "LGBTQ+"],
    shortDescription: `Reclusive Hollywood icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself.`,
    fullDescription: `Reclusive Hollywood icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself.\n\nWhy her? Why now?\n\nMonique is not exactly on top of the world. Her husband has left her, and her career has stagnated. Regardless of why Evelyn has selected her to write her biography, Monique is determined to use this opportunity to jumpstart her career.\n\nSummoned to Evelyn's luxurious apartment, Monique listens in fascination as the actress tells her story. From making her way to Los Angeles in the 1950s to her decision to leave show business in the '80s, and, of course, the seven husbands along the way, Evelyn unspools a tale of ruthless ambition, unexpected friendship, and a great forbidden love. Monique begins to feel a very real connection to the legendary star, but as Evelyn's story near its conclusion, it becomes clear that her life intersects with Monique's own in tragic and irreversible ways.`,
    keyThemes: ["Ambition", "Love", "Identity", "Sacrifice", "Fame", "Secrets"],
    conditions: [
      { type: 'New', price: 12.99, shipping: 'Free', delivery: '2-3 days' },
      { type: 'Like New', price: 10.99, shipping: 'Free', delivery: '3-5 days' },
      { type: 'Good', price: 7.99, shipping: '$3.99', delivery: '5-7 days' }
    ]
  };

  // Mock price history data
  const priceHistoryData = [
    { date: '2024-01-15', price: 16.99 },
    { date: '2024-02-01', price: 15.99 },
    { date: '2024-02-15', price: 14.99 },
    { date: '2024-03-01', price: 16.99 },
    { date: '2024-03-15', price: 13.99 },
    { date: '2024-04-01', price: 15.99 },
    { date: '2024-04-15', price: 12.99 },
    { date: '2024-05-01', price: 14.99 },
    { date: '2024-05-15', price: 11.99 },
    { date: '2024-06-01', price: 13.99 },
    { date: '2024-06-15', price: 12.99 },
    { date: '2024-07-01', price: 12.99 },
    { date: '2024-07-15', price: 10.99 },
    { date: '2024-08-01', price: 12.99 },
    { date: '2024-08-21', price: 12.99 }
  ];

  // Mock reviews data
  const reviewsData = [
    {
      id: 1,
      reviewerName: "Sarah Mitchell",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8c5?w=100&h=100&fit=crop",
      rating: 5,
      title: "Absolutely captivating from start to finish!",
      content: `This book completely blew me away. Taylor Jenkins Reid has crafted such a compelling story about love, ambition, and the price of fame. Evelyn Hugo is such a complex and fascinating character - I found myself completely invested in her story from the very first page. The writing is beautiful, the plot twists are unexpected, and the emotional depth is incredible. I couldn't put it down and finished it in one sitting. Highly recommend to anyone who loves character-driven stories with heart.`,
      date: "2024-08-15",
      verifiedPurchase: true,
      helpfulVotes: 24,
      notHelpfulVotes: 2,
      images: [
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=200&fit=crop"
      ]
    },
    {
      id: 2,
      reviewerName: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      rating: 4,
      title: "Great storytelling with unexpected depth",
      content: `I wasn't sure what to expect from this book, but it really surprised me. The story is told in such an engaging way, and the characters feel so real and complex. Evelyn's journey through Hollywood's golden age is fascinating, and the way the author weaves in themes of identity, love, and sacrifice is masterful. My only minor complaint is that some parts felt a bit slow, but overall it's a fantastic read that I'd recommend to anyone.`,
      date: "2024-08-10",
      verifiedPurchase: true,
      helpfulVotes: 18,
      notHelpfulVotes: 1
    },
    {
      id: 3,
      reviewerName: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      rating: 5,
      title: "A masterpiece of contemporary fiction",
      content: `This book is everything I love about contemporary fiction. The characters are so well-developed, the plot is engaging without being overly dramatic, and the themes are handled with such care and nuance. I loved how the author explored the complexities of fame, love, and identity. The relationship between Evelyn and Monique is beautifully written, and the ending left me in tears. This is definitely going on my list of all-time favorites.`,
      date: "2024-08-05",
      verifiedPurchase: true,
      helpfulVotes: 31,
      notHelpfulVotes: 0
    },
    {
      id: 4,
      reviewerName: "David Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      rating: 4,
      title: "Compelling read with great character development",
      content: `Really enjoyed this book. The storytelling is excellent and the characters are well-crafted. Evelyn Hugo is such an interesting protagonist - flawed but compelling. The historical setting is well-researched and adds depth to the story. Would definitely recommend to fans of literary fiction.`,
      date: "2024-07-28",
      verifiedPurchase: true,
      helpfulVotes: 12,
      notHelpfulVotes: 3
    },
    {
      id: 5,
      reviewerName: "Lisa Park",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      rating: 5,
      title: "Couldn't put it down!",
      content: `This book had me hooked from page one. The way the story unfolds is brilliant, and I loved getting to know Evelyn's character through her own words. The themes of love, ambition, and sacrifice really resonated with me. Highly recommend!`,
      date: "2024-07-20",
      verifiedPurchase: true,
      helpfulVotes: 8,
      notHelpfulVotes: 0
    }
  ];

  // Mock recommendations data
  const recommendationsData = [
    {
      id: "rec-001",
      title: "Daisy Jones & The Six",
      author: "Taylor Jenkins Reid",
      coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=400&fit=crop",
      currentPrice: 13.99,
      originalPrice: 17.99,
      dealPercentage: 22,
      rating: 4.4,
      condition: "New",
      shipping: "Free"
    },
    {
      id: "rec-002",
      title: "The Midnight Library",
      author: "Matt Haig",
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      currentPrice: 11.99,
      originalPrice: 15.99,
      dealPercentage: 25,
      rating: 4.2,
      condition: "New",
      shipping: "Free"
    },
    {
      id: "rec-003",
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      currentPrice: 10.99,
      originalPrice: 14.99,
      dealPercentage: 27,
      rating: 4.5,
      condition: "Like New",
      shipping: "Free"
    },
    {
      id: "rec-004",
      title: "The Guest List",
      author: "Lucy Foley",
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      currentPrice: 9.99,
      originalPrice: 13.99,
      dealPercentage: 29,
      rating: 4.1,
      condition: "Good",
      shipping: "$3.99"
    },
    {
      id: "rec-005",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      currentPrice: 12.49,
      originalPrice: 16.99,
      dealPercentage: 26,
      rating: 4.3,
      condition: "New",
      shipping: "Free"
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Book' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' },
    { id: 'recommendations', label: 'Similar Books', icon: 'BookOpen' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5">
                  <div className="bg-muted rounded-lg h-96 lg:h-[500px] mb-4"></div>
                  <div className="flex gap-2">
                    {[...Array(4)]?.map((_, i) => (
                      <div key={i} className="w-16 h-20 bg-muted rounded-md"></div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-7 space-y-6">
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                  <div className="h-6 bg-muted rounded w-1/2"></div>
                  <div className="h-32 bg-muted rounded"></div>
                  <div className="h-24 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <span className="hover:text-foreground cursor-pointer">Home</span>
            <Icon name="ChevronRight" size={14} />
            <span className="hover:text-foreground cursor-pointer">Books</span>
            <Icon name="ChevronRight" size={14} />
            <span className="hover:text-foreground cursor-pointer">{bookData?.genres?.[0]}</span>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground font-medium truncate">{bookData?.title}</span>
          </nav>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <BookCoverSection book={bookData} />
            <BookInfoSection book={bookData} />
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-border mb-8">
            <nav className="flex gap-8 overflow-x-auto scrollbar-hide">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-2 px-1 py-4 text-sm font-medium border-b-2 transition-smooth whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  {tab?.label}
                  {tab?.id === 'reviews' && (
                    <span className="ml-1 px-2 py-0.5 bg-muted rounded-full text-xs">
                      {reviewsData?.length}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <>
                <PriceHistoryChart priceHistory={priceHistoryData} />
                <RecommendationsCarousel 
                  recommendations={recommendationsData}
                  title="Readers Also Bought"
                />
              </>
            )}

            {activeTab === 'reviews' && (
              <ReviewsSection 
                reviews={reviewsData}
                averageRating={bookData?.rating}
                totalReviews={bookData?.reviewCount}
              />
            )}

            {activeTab === 'recommendations' && (
              <div className="space-y-8">
                <RecommendationsCarousel 
                  recommendations={recommendationsData}
                  title="Similar Books You Might Like"
                />
                <RecommendationsCarousel 
                  recommendations={recommendationsData?.slice()?.reverse()}
                  title="More by Taylor Jenkins Reid"
                />
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Floating Action Button - Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden z-40">
        <button className="btn-primary w-14 h-14 rounded-full shadow-literary-elevated">
          <Icon name="ShoppingCart" size={20} />
        </button>
      </div>
    </div>
  );
};

export default BookDetailPages;