import React from 'react';
import Icon from '../../../components/AppIcon';
import DealCard from './DealCard';

const DealsSection = ({ title, deals, icon, description, viewAllLink }) => {
  if (!deals || deals?.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            {description && (
              <p className="text-muted-foreground text-sm">{description}</p>
            )}
          </div>
        </div>
        
        {viewAllLink && (
          <button className="flex items-center gap-2 text-accent hover:text-accent/80 transition-smooth font-medium">
            View All
            <Icon name="ArrowRight" size={16} />
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {deals?.map((deal) => (
          <DealCard key={deal?.id} deal={deal} />
        ))}
      </div>
    </section>
  );
};

export default DealsSection;