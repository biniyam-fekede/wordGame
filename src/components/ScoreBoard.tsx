import React from 'react';

interface ScoreBoardProps {
  score: number;
  feedback?: {
    word: string;
    isValid: boolean;
  } | null;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, feedback }) => {
  return (
    <div className="w-full max-w-md mt-8 text-center">
      {feedback && (
        <div 
          className={`
            mb-4 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-500 animate-fadeIn
            ${feedback.isValid 
              ? 'bg-gray-50 text-gray-700 border border-gray-200' 
              : 'bg-gray-50 text-gray-700 border border-gray-200'}
          `}
        >
          {feedback.isValid 
            ? `"${feedback.word}" is correct! +1 point` 
            : `"${feedback.word}" is not valid. Try again.`}
        </div>
      )}
      <div className="flex items-center justify-center space-x-2">
        <span className="text-gray-500 text-sm">Score:</span>
        <span className="text-xl font-medium text-gray-700">{score}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;