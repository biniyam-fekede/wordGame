import React from 'react';
import { ChevronDown } from 'lucide-react';

interface GameSettingsProps {
  onStartGame: (duration: number) => void;
  currentDuration: number;
}

const GameSettings: React.FC<GameSettingsProps> = ({ onStartGame, currentDuration }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const durations = [
    { label: '5 seconds', value: 5 },
    { label: '10 seconds', value: 10 },
    { label: '15 seconds', value: 15 }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
      >
        <span>{currentDuration} seconds</span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
          {durations.map((duration) => (
            <button
              key={duration.value}
              onClick={() => {
                onStartGame(duration.value);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              {duration.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameSettings;