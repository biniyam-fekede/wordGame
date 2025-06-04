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

  useEffect(() => {
    if (gameState === "playing" && !isDisabled && inputRef.current) {
      inputRef.current.focus();
    }

    if (gameState === "roundOver") {
      setInput("");
    }
  }, [gameState, isDisabled]);

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
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
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
            w-full px-6 py-4 text-2xl font-medium rounded-lg border
            focus:outline-none focus:ring-1 focus:ring-gray-300
            transition duration-200 ease-in-out
            ${
              isDisabled
                ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-gray-200 focus:border-gray-300"
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
            px-4 py-2 rounded-md text-white font-medium
            transition duration-200 ease-in-out
            ${
              isDisabled || !input.trim() || input.length <= prompt.length
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-800"
            }
          `}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default InputBox;
