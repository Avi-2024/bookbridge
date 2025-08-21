import React from 'react';
import Icon from '../../../components/AppIcon';

const TierBenefits = ({ currentTier, tiers }) => {
  const tierOrder = ['Bronze', 'Silver', 'Gold', 'Platinum'];
  const currentTierIndex = tierOrder?.indexOf(currentTier);

  return (
    <div className="card-literary p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="Crown" size={24} className="text-primary" />
        <h3 className="text-xl font-headline font-semibold">Tier Benefits</h3>
      </div>
      <div className="space-y-6">
        {tierOrder?.map((tierName, index) => {
          const tier = tiers?.find(t => t?.name === tierName);
          const isCurrentTier = tierName === currentTier;
          const isUnlocked = index <= currentTierIndex;
          
          return (
            <div key={tierName} className={`relative p-4 rounded-lg border-2 transition-smooth ${
              isCurrentTier 
                ? 'border-accent bg-accent/5' 
                : isUnlocked 
                  ? 'border-trust-green bg-trust-green/5' :'border-border bg-muted/30'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    isCurrentTier 
                      ? 'bg-accent text-accent-foreground' 
                      : isUnlocked 
                        ? 'bg-trust-green text-white' :'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={tier?.icon} size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      {tierName}
                      {isCurrentTier && (
                        <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                          Current
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {tier?.pointsRequired?.toLocaleString()} points required
                    </p>
                  </div>
                </div>
                
                {isUnlocked && (
                  <Icon name="CheckCircle" size={24} className="text-trust-green" />
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tier?.benefits?.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center gap-2">
                    <Icon 
                      name={isUnlocked ? "Check" : "Lock"} 
                      size={16} 
                      className={isUnlocked ? "text-trust-green" : "text-muted-foreground"} 
                    />
                    <span className={`text-sm ${
                      isUnlocked ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
              {tier?.specialPerks && tier?.specialPerks?.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h5 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Icon name="Star" size={16} className="text-accent" />
                    Special Perks
                  </h5>
                  <div className="space-y-1">
                    {tier?.specialPerks?.map((perk, perkIndex) => (
                      <div key={perkIndex} className="flex items-center gap-2">
                        <Icon name="Sparkles" size={14} className="text-accent" />
                        <span className={`text-sm ${
                          isUnlocked ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {perk}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TierBenefits;