import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const BudgetCalculator = ({ averageBookPrice = 12.99 }) => {
  const [budget, setBudget] = useState('');
  const [calculatedBooks, setCalculatedBooks] = useState(0);
  const [priceRange, setPriceRange] = useState('average');

  const priceRanges = {
    budget: { label: 'Budget Books ($5-10)', min: 5, max: 10, avg: 7.5 },
    average: { label: 'Average Price ($10-15)', min: 10, max: 15, avg: 12.5 },
    premium: { label: 'Premium Books ($15-25)', min: 15, max: 25, avg: 20 }
  };

  useEffect(() => {
    if (budget && !isNaN(budget)) {
      const budgetAmount = parseFloat(budget);
      const avgPrice = priceRanges?.[priceRange]?.avg;
      const estimatedBooks = Math.floor(budgetAmount / avgPrice);
      setCalculatedBooks(estimatedBooks);
    } else {
      setCalculatedBooks(0);
    }
  }, [budget, priceRange]);

  const handleBudgetChange = (e) => {
    const value = e?.target?.value;
    if (value === '' || (!isNaN(value) && parseFloat(value) >= 0)) {
      setBudget(value);
    }
  };

  const quickBudgets = [25, 50, 100, 200];

  return (
    <div className="bg-card rounded-lg border shadow-literary p-4">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Calculator" size={20} className="text-primary" />
        <h3 className="font-semibold text-lg text-foreground">Budget Calculator</h3>
      </div>
      <div className="space-y-4">
        {/* Budget Input */}
        <div>
          <Input
            type="number"
            label="Your Budget"
            placeholder="Enter amount..."
            value={budget}
            onChange={handleBudgetChange}
            className="text-lg"
          />
        </div>

        {/* Quick Budget Buttons */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Quick select:</span>
          {quickBudgets?.map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              onClick={() => setBudget(amount?.toString())}
              className="text-xs"
            >
              ${amount}
            </Button>
          ))}
        </div>

        {/* Price Range Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Book Price Range:</label>
          <div className="space-y-2">
            {Object.entries(priceRanges)?.map(([key, range]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  value={key}
                  checked={priceRange === key}
                  onChange={(e) => setPriceRange(e?.target?.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm text-foreground">{range?.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Results */}
        {budget && calculatedBooks > 0 && (
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {calculatedBooks}
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                books you can afford
              </div>
              
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Budget:</span>
                  <span className="font-medium">${budget}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. price per book:</span>
                  <span className="font-medium">${priceRanges?.[priceRange]?.avg}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated total:</span>
                  <span className="font-medium">
                    ${(calculatedBooks * priceRanges?.[priceRange]?.avg)?.toFixed(2)}
                  </span>
                </div>
                {budget - (calculatedBooks * priceRanges?.[priceRange]?.avg) > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Remaining:</span>
                    <span className="font-medium">
                      ${(budget - (calculatedBooks * priceRanges?.[priceRange]?.avg))?.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium mb-1">Money-saving tips:</p>
              <ul className="space-y-1">
                <li>• Check used book conditions for better deals</li>
                <li>• Look for bulk discount opportunities</li>
                <li>• Join loyalty program for exclusive pricing</li>
                <li>• Set price drop alerts for wishlist items</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {calculatedBooks > 0 && (
          <Button
            variant="default"
            className="w-full"
            iconName="Search"
            iconPosition="left"
            onClick={() => {
              // This would trigger a search with the calculated budget constraints
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Find Books Within Budget
          </Button>
        )}
      </div>
    </div>
  );
};

export default BudgetCalculator;