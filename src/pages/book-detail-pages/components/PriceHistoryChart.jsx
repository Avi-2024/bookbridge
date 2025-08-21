import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const PriceHistoryChart = ({ priceHistory }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatPrice = (value) => `$${value?.toFixed(2)}`;

  const currentPrice = priceHistory?.[priceHistory?.length - 1]?.price || 0;
  const highestPrice = Math.max(...priceHistory?.map(item => item?.price));
  const lowestPrice = Math.min(...priceHistory?.map(item => item?.price));
  const priceChange = priceHistory?.length > 1 
    ? currentPrice - priceHistory?.[priceHistory?.length - 2]?.price 
    : 0;

  return (
    <div className="card-literary p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-headline font-semibold">Price History</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Lowest: {formatPrice(lowestPrice)}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-muted-foreground">Highest: {formatPrice(highestPrice)}</span>
          </div>
        </div>
      </div>

      {/* Price Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-lg font-bold text-foreground">{formatPrice(currentPrice)}</div>
          <div className="text-xs text-muted-foreground">Current Price</div>
        </div>
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <div className="text-lg font-bold text-success">{formatPrice(lowestPrice)}</div>
          <div className="text-xs text-muted-foreground">Lowest Ever</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className={`text-lg font-bold flex items-center justify-center gap-1 ${
            priceChange > 0 ? 'text-error' : priceChange < 0 ? 'text-success' : 'text-muted-foreground'
          }`}>
            {priceChange !== 0 && (
              <Icon 
                name={priceChange > 0 ? "TrendingUp" : "TrendingDown"} 
                size={16} 
              />
            )}
            {priceChange > 0 ? '+' : ''}{formatPrice(Math.abs(priceChange))}
          </div>
          <div className="text-xs text-muted-foreground">Recent Change</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64" aria-label="Price History Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              tickFormatter={formatPrice}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip 
              formatter={(value) => [formatPrice(value), 'Price']}
              labelFormatter={(label) => `Date: ${formatDate(label)}`}
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Price Alert CTA */}
      <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-foreground">Never miss a deal!</h4>
            <p className="text-sm text-muted-foreground">
              Get notified when the price drops below {formatPrice(currentPrice - 2)}
            </p>
          </div>
          <button className="btn-accent px-4 py-2 text-sm">
            <Icon name="Bell" size={16} className="mr-2" />
            Set Alert
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceHistoryChart;