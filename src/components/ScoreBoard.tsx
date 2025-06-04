// src/components/ScoreBoard.tsx
import React from "react";

interface ScoreBoardProps {
  score: number;
  feedback?: { word: string; isValid: boolean } | null;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, feedback }) => {
  return (
    <div className="w-full max-w-md mt-8 text-center">
      {feedback && (
        <div
          className={`
            mb-4 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-500
            ${
              feedback.isValid
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }
          `}
        >
          {feedback.isValid
            ? `✅ "${feedback.word}" is a valid word! +1 point`
            : `❌ "${feedback.word}" is NOT in the dictionary.`}
        </div>
      )}
      <div className="flex items-center justify-center space-x-2">
        <span className="text-gray-500 text-sm">Score:</span>
        <span className="text-2xl font-semibold text-gray-800">{score}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
