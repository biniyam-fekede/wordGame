import React from "react";

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  // Optionally, you can style a progress bar behind the number:
  return (
    <div className="w-full max-w-md mt-4">
      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 bg-indigo-600 h-full transition-all duration-300"
          style={{ width: `${(timeLeft / 10) * 100}%` }}
          /* If your max duration is 10 seconds; you can parametrize this */
        />
      </div>
      <p className="mt-1 text-center text-lg font-semibold text-gray-700">
        Time Left: {timeLeft}s
      </p>
    </div>
  );
};

export default Timer;
