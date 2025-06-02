import React, { useEffect } from 'react';

interface TimerProps {
  seconds: number;
  onTimeUp: () => void;
  isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ seconds, onTimeUp, isActive }) => {
  useEffect(() => {
    if (!isActive) return;
    
    if (seconds <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      onTimeUp();
    }, seconds * 1000);

    return () => clearInterval(timer);
  }, [seconds, onTimeUp, isActive]);

  return (
    <div className="absolute top-4 left-4 flex items-center justify-center">
      <div className="font-mono text-xl font-medium text-gray-600">
        {seconds}s
      </div>
    </div>
  );
};

export default Timer;