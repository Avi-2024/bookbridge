import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DiscoveryEngine = () => {
  const [activeGenre, setActiveGenre] = useState('fiction');
  const navigate = useNavigate();

  const genres = [
    { id: 'fiction', name: 'Fiction', icon: 'BookOpen', color: 'bg-primary' },
    { id: 'mystery', name: 'Mystery', icon: 'Search', color: 'bg-secondary' },
    { id: 'romance', name: 'Romance', icon: 'Heart', color: 'bg-accent' },
    { id: 'scifi', name: 'Sci-Fi', icon: 'Rocket', color: 'bg-trust-green' },
    { id: 'biography', name: 'Biography', icon: 'User', color: 'bg-literary-brown' },
    { id: 'selfhelp', name: 'Self-Help', icon: 'Target', color: 'bg-crimson-cta' }
  ];

  const booksByGenre = {
    fiction: [
      {
        id: 1,
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
        price: 8.99,
        originalPrice: 16.99,
        rating: 4.6,
        reviews: 3456,
        description: "A reclusive Hollywood icon finally tells her story to a young journalist.",
        priceHistory: [16.99, 14.99, 12.99, 10.99, 8.99],
        isNew: false,
        isBestseller: true
      },
      {
        id: 2,
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?w=300&h=400&fit=crop",
        price: 11.99,
        originalPrice: 19.99,
        rating: 4.5,
        reviews: 5234,
        description: "A mystery and coming-of-age story set in the marshlands of North Carolina.",
        priceHistory: [19.99, 17.99, 15.99, 13.99, 11.99],
        isNew: false,
        isBestseller: true
      },
      {
        id: 3,
        title: "The Midnight Library",
        author: "Matt Haig",
        image: "https://images.pixabay.com/photo/2016/03/27/07/32/books-1282309_1280.jpg?w=300&h=400&fit=crop",
        price: 10.99,
        originalPrice: 21.99,
        rating: 4.5,
        reviews: 1654,
        description: "A magical library between life and death where every book is a different life.",
        priceHistory: [21.99, 18.99, 15.99, 13.99, 10.99],
        isNew: true,
        isBestseller: false
      }
    ],
    mystery: [
      {
        id: 4,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
        price: 7.99,
        originalPrice: 24.99,
        rating: 4.8,
        reviews: 2847,
        description: "A psychotherapist becomes obsessed with treating a woman who refuses to speak.",
        priceHistory: [24.99, 20.99, 15.99, 12.99, 7.99],
        isNew: false,
        isBestseller: true
      },
      {
        id: 5,
        title: "Gone Girl",
        author: "Gillian Flynn",
        image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?w=300&h=400&fit=crop",
        price: 9.99,
        originalPrice: 18.99,
        rating: 4.4,
        reviews: 4123,
        description: "A psychological thriller about a marriage gone terribly wrong.",
        priceHistory: [18.99, 16.99, 13.99, 11.99, 9.99],
        isNew: false,
        isBestseller: true
      }
    ],
    romance: [
      {
        id: 6,
        title: "It Ends with Us",
        author: "Colleen Hoover",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
        price: 8.99,
        originalPrice: 17.99,
        rating: 4.7,
        reviews: 6789,
        description: "A powerful story about love, resilience, and the courage to start over.",
        priceHistory: [17.99, 15.99, 12.99, 10.99, 8.99],
        isNew: false,
        isBestseller: true
      }
    ],
    scifi: [
      {
        id: 7,
        title: "Project Hail Mary",
        author: "Andy Weir",
        image: "https://images.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_1280.jpg?w=300&h=400&fit=crop",
        price: 9.99,
        originalPrice: 22.99,
        rating: 4.7,
        reviews: 1923,
        description: "A lone astronaut must save humanity in this thrilling space adventure.",
        priceHistory: [22.99, 19.99, 16.99, 13.99, 9.99],
        isNew: true,
        isBestseller: false
      }
    ],
    biography: [
      {
        id: 8,
        title: "Educated",
        author: "Tara Westover",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop",
        price: 11.99,
        originalPrice: 19.99,
        rating: 4.8,
        reviews: 2789,
        description: "A memoir about education, family, and the struggle for self-invention.",
        priceHistory: [19.99, 17.99, 15.99, 13.99, 11.99],
        isNew: false,
        isBestseller: true
      }
    ],
    selfhelp: [
      {
        id: 9,
        title: "Atomic Habits",
        author: "James Clear",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop",
        price: 12.99,
        originalPrice: 18.99,
        rating: 4.9,
        reviews: 5234,
        description: "Tiny changes, remarkable results - the power of atomic habits.",
        priceHistory: [18.99, 16.99, 15.99, 14.99, 12.99],
        isNew: false,
        isBestseller: true
      }
    ]
  };

  const [hoveredBook, setHoveredBook] = useState(null);

  const currentBooks = booksByGenre?.[activeGenre] || [];

  const handleBookClick = (bookId) => {
    navigate(`/book-detail-pages?id=${bookId}`);
  };

  const renderPriceHistory = (priceHistory) => {
    const maxPrice = Math.max(...priceHistory);
    const minPrice = Math.min(...priceHistory);
    const range = maxPrice - minPrice;
    
    return (
      <div className="w-full h-8 flex items-end gap-1">
        {priceHistory?.map((price, index) => {
          const height = range > 0 ? ((price - minPrice) / range) * 100 : 50;
          const isLowest = price === minPrice;
          return (
            <div
              key={index}
              className={`flex-1 rounded-t-sm ${
                isLowest ? 'bg-trust-green' : 'bg-muted'
              }`}
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-accent font-bold text-primary mb-4">
            Discovery Engine
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore curated collections by genre with detailed insights and price tracking
          </p>
        </div>

        {/* Genre Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {genres?.map((genre) => (
            <button
              key={genre?.id}
              onClick={() => setActiveGenre(genre?.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                activeGenre === genre?.id
                  ? `${genre?.color} text-white shadow-literary-elevated`
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={genre?.icon} size={18} />
              <span className="font-medium">{genre?.name}</span>
            </button>
          ))}
        </div>

        {/* Books Carousel */}
        <div className="relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentBooks?.map((book) => (
              <div
                key={book?.id}
                className="card-literary group cursor-pointer relative"
                onClick={() => handleBookClick(book?.id)}
                onMouseEnter={() => setHoveredBook(book?.id)}
                onMouseLeave={() => setHoveredBook(null)}
              >
                {/* Book Cover */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={book?.image}
                    alt={book?.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {book?.isNew && (
                      <span className="bg-trust-green text-white px-2 py-1 rounded-md text-xs font-semibold">
                        NEW
                      </span>
                    )}
                    {book?.isBestseller && (
                      <span className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-semibold">
                        BESTSELLER
                      </span>
                    )}
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-2 right-2">
                    <span className="deal-badge">
                      {Math.round(((book?.originalPrice - book?.price) / book?.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                </div>

                {/* Book Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {book?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    by {book?.author}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={i < Math.floor(book?.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {book?.rating} ({book?.reviews})
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="price-highlight">
                      ${book?.price}
                    </span>
                    <span className="price-original">
                      ${book?.originalPrice}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {book?.description}
                  </p>
                </div>

                {/* Hover Preview */}
                {hoveredBook === book?.id && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-lg p-4 flex flex-col justify-center z-10 animate-book-reveal">
                    <div className="text-center">
                      <h4 className="font-semibold text-primary mb-2">Price History</h4>
                      <div className="mb-4">
                        {renderPriceHistory(book?.priceHistory)}
                      </div>
                      <p className="text-xs text-muted-foreground mb-4">
                        Lowest price in 30 days: ${Math.min(...book?.priceHistory)}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={(e) => {
                            e?.stopPropagation();
                            console.log('Added to cart:', book?.title);
                          }}
                          className="flex-1"
                        >
                          <Icon name="ShoppingCart" size={14} className="mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e?.stopPropagation();
                            console.log('Added to wishlist:', book?.title);
                          }}
                        >
                          <Icon name="Heart" size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => navigate(`/advanced-search-filter-hub?genre=${activeGenre}`)}
              size="lg"
            >
              Explore More {genres?.find(g => g?.id === activeGenre)?.name} Books
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoveryEngine;