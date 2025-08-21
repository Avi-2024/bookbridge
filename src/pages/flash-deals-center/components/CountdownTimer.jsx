import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CountdownTimer = ({ endTime, title = "Flash Sale Ends In", size = "large" }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()?.getTime();
      const difference = endTime - now;

      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const sizeClasses = {
    small: {
      container: "text-sm",
      digit: "text-lg font-bold",
      label: "text-xs"
    },
    medium: {
      container: "text-base",
      digit: "text-2xl font-bold",
      label: "text-sm"
    },
    large: {
      container: "text-lg",
      digit: "text-4xl font-bold",
      label: "text-base"
    }
  };

  const currentSize = sizeClasses?.[size];

  if (isExpired) {
    return (
      <div className="flex items-center gap-2 text-error">
        <Icon name="Clock" size={20} />
        <span className="font-semibold">Deal Expired</span>
      </div>
    );
  }

  return (
    <div className={`text-center ${currentSize?.container}`}>
      <div className="flex items-center justify-center gap-2 mb-2">
        <Icon name="Zap" size={20} className="text-accent animate-pulse" />
        <span className="font-semibold text-foreground">{title}</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="text-center">
          <div className={`${currentSize?.digit} text-accent bg-accent/10 rounded-lg px-3 py-2 min-w-[60px]`}>
            {String(timeLeft?.hours)?.padStart(2, '0')}
          </div>
          <div className={`${currentSize?.label} text-muted-foreground mt-1`}>Hours</div>
        </div>
        <div className="text-accent font-bold">:</div>
        <div className="text-center">
          <div className={`${currentSize?.digit} text-accent bg-accent/10 rounded-lg px-3 py-2 min-w-[60px]`}>
            {String(timeLeft?.minutes)?.padStart(2, '0')}
          </div>
          <div className={`${currentSize?.label} text-muted-foreground mt-1`}>Minutes</div>
        </div>
        <div className="text-accent font-bold">:</div>
        <div className="text-center">
          <div className={`${currentSize?.digit} text-accent bg-accent/10 rounded-lg px-3 py-2 min-w-[60px]`}>
            {String(timeLeft?.seconds)?.padStart(2, '0')}
          </div>
          <div className={`${currentSize?.label} text-muted-foreground mt-1`}>Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;