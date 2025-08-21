import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const DealAlertSignup = () => {
  const [email, setEmail] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [authors, setAuthors] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy',
    'Biography', 'History', 'Self-Help', 'Business', 'Children', 'Young Adult'
  ];

  const handleGenreChange = (genre, checked) => {
    if (checked) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      setSelectedGenres(selectedGenres?.filter(g => g !== genre));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    // Mock submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  if (isSubmitted) {
    return (
      <div className="card-literary p-8 text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Alert Setup Complete!</h3>
        <p className="text-muted-foreground">
          You'll receive notifications when deals matching your preferences become available.
        </p>
      </div>
    );
  }

  return (
    <div className="card-literary p-8">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Icon name="Bell" size={24} className="text-accent" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Never Miss a Great Deal</h3>
        <p className="text-muted-foreground">
          Get personalized alerts for books you love at prices you'll love even more
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <Input
          type="email"
          label="Email Address"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e?.target?.value)}
          required
          description="We'll send deal alerts to this email"
        />

        {/* Genre Preferences */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Favorite Genres
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {genres?.map((genre) => (
              <Checkbox
                key={genre}
                label={genre}
                checked={selectedGenres?.includes(genre)}
                onChange={(e) => handleGenreChange(genre, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Price Range
          </label>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              placeholder="Min $"
              value={priceRange?.min}
              onChange={(e) => setPriceRange({...priceRange, min: e?.target?.value})}
              className="flex-1"
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="number"
              placeholder="Max $"
              value={priceRange?.max}
              onChange={(e) => setPriceRange({...priceRange, max: e?.target?.value})}
              className="flex-1"
            />
          </div>
        </div>

        {/* Favorite Authors */}
        <Input
          type="text"
          label="Favorite Authors (Optional)"
          placeholder="e.g., Stephen King, Agatha Christie, J.K. Rowling"
          value={authors}
          onChange={(e) => setAuthors(e?.target?.value)}
          description="Separate multiple authors with commas"
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="accent"
          fullWidth
          iconName="Bell"
          iconPosition="left"
          disabled={!email}
        >
          Set Up Deal Alerts
        </Button>

        {/* Benefits List */}
        <div className="bg-muted/30 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Icon name="Sparkles" size={18} className="text-accent" />
            What You'll Get:
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Icon name="Check" size={14} className="text-success" />
              Instant notifications for flash deals
            </li>
            <li className="flex items-center gap-2">
              <Icon name="Check" size={14} className="text-success" />
              Early access to member-exclusive offers
            </li>
            <li className="flex items-center gap-2">
              <Icon name="Check" size={14} className="text-success" />
              Personalized recommendations based on your preferences
            </li>
            <li className="flex items-center gap-2">
              <Icon name="Check" size={14} className="text-success" />
              Weekly digest of the best deals
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default DealAlertSignup;