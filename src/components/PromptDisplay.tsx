// src/components/PromptDisplay.tsx
import React from "react";

interface PromptDisplayProps {
  prompt: string;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt }) => {
  return (
    <div className="mt-8 mb-4 text-center">
      <p className="text-3xl font-bold text-indigo-600">{prompt}</p>
    </div>
  );
};

export default PromptDisplay;
