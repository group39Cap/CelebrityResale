import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface AuctionTimerProps {
  endDate: Date;
}

const AuctionTimer = ({ endDate }: AuctionTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [isEnded, setIsEnded] = useState<boolean>(false);
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +endDate - +new Date();
      
      if (difference <= 0) {
        setIsEnded(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [endDate]);
  
  const formatTime = (value: number): string => {
    return value < 10 ? `0${value}` : value.toString();
  };
  
  if (isEnded) {
    return (
      <Badge variant="outline" className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded text-white">
        <span className="text-xs font-['Montserrat']">Auction Ended</span>
      </Badge>
    );
  }
  
  // Display format depends on how much time is left
  let displayTime: string;
  
  if (timeLeft.days > 0) {
    displayTime = `${timeLeft.days}d ${formatTime(timeLeft.hours)}h`;
  } else {
    displayTime = `${formatTime(timeLeft.hours)}:${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}`;
  }
  
  return (
    <Badge
      variant="outline"
      className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded text-white animate-pulse"
    >
      <span className="text-xs font-['Montserrat']">{displayTime}</span>
    </Badge>
  );
};

export default AuctionTimer;
