// src/components/GameContainer.tsx
import React, { useState, useEffect, useCallback } from "react";
import GameSettings from "./GameSettings";
import PromptDisplay from "./PromptDisplay";
import InputBox from "./InputBox";
import Timer from "./Timer";
import ScoreBoard from "./ScoreBoard";
import { useWordList } from "../hooks/useWordList";

// (If you already have some utilities for random prompt, keep them; we'll focus on validation.)

const GameContainer: React.FC = () => {
  // 1) Game state:
  const [score, setScore] = useState(0);
  const [prompt, setPrompt] = useState(""); // current prompt text
  const [feedback, setFeedback] = useState<{
    word: string;
    isValid: boolean;
  } | null>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "roundOver">(
    "idle"
  );
  const [timeLeft, setTimeLeft] = useState(10); // e.g., default 10s
  const [duration, setDuration] = useState(10); // chosen in GameSettings

  // 2) Load the word list (10–20MB or however big):
  //    NOTE: '/words.csv' must be in your /public folder.
  const { words, wordSet } = useWordList("/words.csv");

  // 3) Handler for when the player submits something:
  const handleSubmitWord = useCallback(
    (candidate: string) => {
      const normalized = candidate.trim().toLowerCase();
      if (!normalized) return;

      // Check the word against the dictionary:
      const isValidWord = wordSet.has(normalized);

      if (isValidWord) {
        // Award a point, show positive feedback, generate a new prompt
        setScore((prev) => prev + 1);
        setFeedback({ word: normalized, isValid: true });
        // Next prompt could be random from word list, or some logic you already have:
        // e.g. setPrompt(pickRandomPrompt());
      } else {
        // Show negative feedback, but keep current prompt
        setFeedback({ word: normalized, isValid: false });
      }

      // Clear feedback after a brief delay so it fades out
      setTimeout(() => setFeedback(null), 800);

      // Optionally, reset the input field or timer,
      // depending on how you want the flow to work:
      // (Your InputBox already clears its own state on submit.)
    },
    [wordSet]
  );

  // 4) Timer logic: start countdown when game starts, etc.
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (gameState === "playing") {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            setGameState("roundOver");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [gameState]);

  // 5) When round ends, reset as needed:
  useEffect(() => {
    if (gameState === "roundOver") {
      // e.g. Show a “Round Over” UI for 1 second, then restart
      const timeout = setTimeout(() => {
        setGameState("idle");
        setTimeLeft(duration);
        setPrompt(""); // or generate new prompt
        setScore(0); // if you want a fresh start each round
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [gameState, duration]);

  // 6) Helper to begin a new round:
  const startRound = () => {
    // Pick an initial prompt however you like (maybe a random short word)
    // For example, pick a 3-letter word from the dictionary:
    const randomSeed =
      words.length > 0
        ? words[Math.floor(Math.random() * words.length)].slice(0, 3)
        : "a";

    setPrompt(randomSeed);
    setScore(0);
    setTimeLeft(duration);
    setGameState("playing");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* ❶ Game Settings: choose duration (passed down via props) */}
      <GameSettings
        duration={duration}
        onChange={(newDuration) => {
          setDuration(newDuration);
          setTimeLeft(newDuration);
        }}
        disabled={gameState === "playing"}
      />

      {/* ❷ Timer: show countdown */}
      <Timer timeLeft={timeLeft} />

      {/* ❸ Prompt: show the current word/seed */}
      <PromptDisplay prompt={prompt} />

      {/* ❹ InputBox: user types; we pass in handleSubmitWord + gameState + feedback */}
      <InputBox
        prompt={prompt}
        onSubmit={(word) => {
          handleSubmitWord(word);
        }}
        isDisabled={gameState !== "playing"}
        gameState={gameState}
      />

      {/* ❺ ScoreBoard: show current score + feedback */}
      <ScoreBoard score={score} feedback={feedback} />

      {/* ❻ Start / Restart button when idle or roundOver */}
      {(gameState === "idle" || gameState === "roundOver") && (
        <button
          onClick={startRound}
          className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
        >
          {gameState === "idle" ? "Start Game" : "Play Again"}
        </button>
      )}
    </div>
  );
};

export default GameContainer;
