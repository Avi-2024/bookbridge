import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PreOrderSection = ({ preOrders }) => {
  const navigate = useNavigate();

  const handlePreOrder = (bookId) => {
    navigate('/book-detail-pages', { state: { bookId } });
  };

  const formatReleaseDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilRelease = (releaseDate) => {
    const today = new Date();
    const release = new Date(releaseDate);
    const diffTime = release - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Calendar" size={32} className="text-secondary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Pre-Order Specials</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Be the first to read the latest releases! Pre-order now and save with early-bird pricing 
          plus guaranteed delivery on release day.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {preOrders?.map((book) => (
          <div key={book?.id} className="card-literary p-6 hover:shadow-literary-elevated transition-smooth">
            <div className="flex gap-6">
              {/* Book Cover */}
              <div className="flex-shrink-0">
                <div className="w-32 h-48 overflow-hidden rounded-lg relative">
                  <Image
                    src={book?.coverImage}
                    alt={book?.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Coming Soon Badge */}
                  <div className="absolute top-2 left-2">
                    <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                      COMING SOON
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{book?.title}</h3>
                  <p className="text-muted-foreground">by {book?.author}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>{book?.genre}</span>
                    <span>•</span>
                    <span>{book?.pages} pages</span>
                    <span>•</span>
                    <span>{book?.format}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {book?.description}
                </p>

                {/* Release Info */}
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Release Date:</span>
                    <span className="text-sm text-muted-foreground">
                      {formatReleaseDate(book?.releaseDate)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Days Until Release:</span>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={14} className="text-secondary" />
                      <span className="text-sm font-semibold text-secondary">
                        {getDaysUntilRelease(book?.releaseDate)} days
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Guaranteed Delivery:</span>
                    <div className="flex items-center gap-2">
                      <Icon name="Truck" size={14} className="text-success" />
                      <span className="text-sm text-success font-medium">Release Day</span>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-success">
                      ${book?.preOrderPrice?.toFixed(2)}
                    </span>
                    <span className="text-base text-muted-foreground line-through">
                      ${book?.regularPrice?.toFixed(2)}
                    </span>
                    <div className="deal-badge bg-success/10 text-success">
                      Save ${(book?.regularPrice - book?.preOrderPrice)?.toFixed(2)}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Pre-order price guaranteed. You'll be charged when the book ships.
                  </p>
                </div>

                {/* Pre-order Benefits */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">Pre-order Benefits:</h4>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Check" size={12} className="text-success" />
                      Early-bird pricing (save {Math.round(((book?.regularPrice - book?.preOrderPrice) / book?.regularPrice) * 100)}%)
                    </li>
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Check" size={12} className="text-success" />
                      Guaranteed release day delivery
                    </li>
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Check" size={12} className="text-success" />
                      Exclusive bonus content included
                    </li>
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Check" size={12} className="text-success" />
                      Free shipping on orders over $25
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="secondary"
                    onClick={() => handlePreOrder(book?.id)}
                    className="flex-1"
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    Pre-Order Now
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {/* Add to wishlist logic */}}
                  >
                    <Icon name="Heart" size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pre-order Info Banner */}
      <div className="bg-secondary/5 rounded-xl p-6 mt-8 border border-secondary/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Info" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Pre-Order Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <p className="mb-2">
                  <strong>Payment:</strong> You'll be charged when your book ships, typically 1-2 days before the release date.
                </p>
                <p>
                  <strong>Cancellation:</strong> You can cancel your pre-order anytime before it ships with no charge.
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <strong>Price Protection:</strong> If the price drops between your order and ship date, you'll get the lower price.
                </p>
                <p>
                  <strong>Delivery:</strong> Pre-orders are eligible for release-date delivery with our premium shipping options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreOrderSection;