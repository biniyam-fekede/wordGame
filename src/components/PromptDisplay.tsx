import React from 'react';

interface PromptDisplayProps {
  prompt: string;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-gray-500 text-sm font-medium mb-2">Type a word starting with these letters</h2>
    </div>
  );
};

export default PromptDisplay;