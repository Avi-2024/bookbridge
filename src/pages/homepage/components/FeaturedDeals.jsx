import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedDeals = () => {
  const navigate = useNavigate();

  const featuredBooks = [
    {
      id: 1,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      originalPrice: 24.99,
      salePrice: 7.99,
      discount: 68,
      rating: 4.8,
      reviews: 2847,
      timeLeft: "2h 15m",
      genre: "Thriller",
      isFlashDeal: true,
      soldCount: 156
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?w=300&h=400&fit=crop",
      originalPrice: 18.99,
      salePrice: 12.99,
      discount: 32,
      rating: 4.9,
      reviews: 5234,
      timeLeft: "1d 8h",
      genre: "Self-Help",
      isFlashDeal: false,
      soldCount: 89
    },
    {
      id: 3,
      title: "Project Hail Mary",
      author: "Andy Weir",
      image: "https://images.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_1280.jpg?w=300&h=400&fit=crop",
      originalPrice: 22.99,
      salePrice: 9.99,
      discount: 57,
      rating: 4.7,
      reviews: 1923,
      timeLeft: "5h 42m",
      genre: "Sci-Fi",
      isFlashDeal: true,
      soldCount: 203
    },
    {
      id: 4,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      originalPrice: 16.99,
      salePrice: 8.99,
      discount: 47,
      rating: 4.6,
      reviews: 3456,
      timeLeft: "3h 28m",
      genre: "Fiction",
      isFlashDeal: true,
      soldCount: 127
    },
    {
      id: 5,
      title: "Educated",
      author: "Tara Westover",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?w=300&h=400&fit=crop",
      originalPrice: 19.99,
      salePrice: 11.99,
      discount: 40,
      rating: 4.8,
      reviews: 2789,
      timeLeft: "6h 15m",
      genre: "Memoir",
      isFlashDeal: false,
      soldCount: 94
    },
    {
      id: 6,
      title: "The Midnight Library",
      author: "Matt Haig",
      image: "https://images.pixabay.com/photo/2016/03/27/07/32/books-1282309_1280.jpg?w=300&h=400&fit=crop",
      originalPrice: 21.99,
      salePrice: 10.99,
      discount: 50,
      rating: 4.5,
      reviews: 1654,
      timeLeft: "4h 07m",
      genre: "Fiction",
      isFlashDeal: true,
      soldCount: 178
    }
  ];

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = {};
      featuredBooks?.forEach(book => {
        if (book?.isFlashDeal) {
          // Simulate countdown timer
          const [hours, minutes] = book?.timeLeft?.split('h ');
          const totalMinutes = parseInt(hours) * 60 + parseInt(minutes?.replace('m', ''));
          const newTotalMinutes = Math.max(0, totalMinutes - 1);
          const newHours = Math.floor(newTotalMinutes / 60);
          const newMins = newTotalMinutes % 60;
          newTimeLeft[book.id] = `${newHours}h ${newMins}m`;
        }
      });
      setTimeLeft(newTimeLeft);
    }, 60000);

    return () => clearInterval(interval);
  }, [featuredBooks]);

  const handleAddToCart = (book) => {
    // Simulate add to cart action
    console.log('Added to cart:', book?.title);
  };

  const handleViewBook = (bookId) => {
    navigate(`/book-detail-pages?id=${bookId}`);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-accent font-bold text-primary mb-2">
              Featured Deals
            </h2>
            <p className="text-lg text-muted-foreground">
              Limited-time offers on bestselling books
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/flash-deals-center')}
            className="hidden sm:flex"
          >
            View All Deals
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {featuredBooks?.map((book) => (
            <div
              key={book?.id}
              className="card-literary group cursor-pointer hover:shadow-book-hover transition-smooth animate-book-reveal"
              onClick={() => handleViewBook(book?.id)}
            >
              {/* Book Cover */}
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={book?.image}
                  alt={book?.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Discount Badge */}
                <div className="absolute top-2 left-2">
                  <span className="deal-badge">
                    {book?.discount}% OFF
                  </span>
                </div>

                {/* Flash Deal Badge */}
                {book?.isFlashDeal && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-crimson-cta text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 animate-pulse-gentle">
                      <Icon name="Zap" size={12} />
                      FLASH
                    </div>
                  </div>
                )}

                {/* Sold Count */}
                <div className="absolute bottom-2 left-2">
                  <div className="bg-black/70 text-white px-2 py-1 rounded-md text-xs">
                    {book?.soldCount} sold
                  </div>
                </div>
              </div>

              {/* Book Details */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="community-badge">
                    {book?.genre}
                  </span>
                </div>

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
                    ${book?.salePrice}
                  </span>
                  <span className="price-original">
                    ${book?.originalPrice}
                  </span>
                </div>

                {/* Timer for Flash Deals */}
                {book?.isFlashDeal && (
                  <div className="flex items-center gap-1 text-xs text-crimson-cta mb-3">
                    <Icon name="Clock" size={12} />
                    <span className="font-medium">
                      {timeLeft?.[book?.id] || book?.timeLeft} left
                    </span>
                  </div>
                )}

                {/* Add to Cart Button */}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={(e) => {
                    e?.stopPropagation();
                    handleAddToCart(book);
                  }}
                  className="w-full"
                >
                  <Icon name="ShoppingCart" size={16} className="mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <Button
            variant="outline"
            onClick={() => navigate('/flash-deals-center')}
            className="w-full max-w-xs"
          >
            View All Deals
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;