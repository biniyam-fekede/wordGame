// src/components/InputBox.tsx
import React, { useState, useRef, useEffect } from "react";

interface InputBoxProps {
  onSubmit: (word: string) => void;
  isDisabled: boolean;
  gameState: "idle" | "playing" | "roundOver";
  prompt: string;
}

const InputBox: React.FC<InputBoxProps> = ({
  onSubmit,
  isDisabled,
  gameState,
  prompt,
}) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus when gameState is ‘playing’
  useEffect(() => {
    if (gameState === "playing" && !isDisabled) {
      inputRef.current?.focus();
    }
    if (gameState === "roundOver") {
      setInput("");
    }
  }, [gameState, isDisabled]);

  // Pre-fill with prompt (if you want them to “continue” from it)
  useEffect(() => {
    setInput(prompt.toLowerCase());
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(prompt.length, prompt.length);
    }
  }, [prompt]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isDisabled) return;
    onSubmit(input);
    setInput(""); // clear after submit
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
          spellCheck="true"
          autoComplete="off"
          autoCapitalize="off"
          className={`
            w-full px-6 py-4 text-2xl font-medium rounded-xl border-2
            bg-gradient-to-tr from-gray-50 to-white shadow-lg
            placeholder-gray-400 placeholder-opacity-70 italic
            focus:outline-none focus:ring-4 focus:ring-indigo-200
            transition duration-300 ease-in-out
            ${
              isDisabled
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-transparent focus:border-indigo-500"
            }
          `}
          placeholder="Continue typing..."
        />
        <button
          type="submit"
          disabled={
            isDisabled || !input.trim() || input.length <= prompt.length
          }
          className={`
            absolute right-2 top-1/2 transform -translate-y-1/2
            px-5 py-3 rounded-xl text-white font-semibold flex items-center space-x-2
            transition duration-300 ease-in-out shadow-md
            ${
              isDisabled || !input.trim() || input.length <= prompt.length
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500"
            }
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
};

export default InputBox;
