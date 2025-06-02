import React, { useState, useEffect } from 'react';
import PromptDisplay from './PromptDisplay';
import InputBox from './InputBox';
import Timer from './Timer';
import ScoreBoard from './ScoreBoard';
import GameSettings from './GameSettings';
import { generatePrompt, validateWord } from '../utils/gameUtils';
import { GameState } from '../types';

const GameContainer: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('playing');
  const [prompt, setPrompt] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [timerDuration, setTimerDuration] = useState<number>(10);
  const [currentTime, setCurrentTime] = useState<number>(10);
  const [feedback, setFeedback] = useState<{ word: string; isValid: boolean } | null>(null);

  const generateNewPrompt = () => {
    setPrompt(generatePrompt());
  };

  const startGame = (duration: number) => {
    setTimerDuration(duration);
    setCurrentTime(duration);
    setScore(0);
    setFeedback(null);
    generateNewPrompt();
    setGameState('playing');
  };

  const startNewRound = () => {
    setCurrentTime(timerDuration);
    setFeedback(null);
    generateNewPrompt();
    setGameState('playing');
  };

  const handleSubmitWord = (word: string) => {
    if (gameState !== 'playing') return;
    
    const isValid = validateWord(word.trim(), prompt);
    
    setFeedback({
      word: word.trim(),
      isValid
    });
    
    if (isValid) {
      setScore(prev => prev + 1);
    }
    
    setGameState('roundOver');
    
    setTimeout(() => {
      startNewRound();
    }, 1500);
  };

  const handleTimeUp = () => {
    if (gameState !== 'playing') return;
    setGameState('roundOver');
    
    setFeedback({
      word: 'Time up!',
      isValid: false
    });
    
    setTimeout(() => {
      startNewRound();
    }, 1500);
  };

  useEffect(() => {
    generateNewPrompt();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 flex flex-col items-center justify-center relative">
      <div className="absolute top-4 right-4">
        <GameSettings onStartGame={startGame} currentDuration={timerDuration} />
      </div>
      
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 relative">
        <Timer 
          seconds={currentTime} 
          onTimeUp={handleTimeUp} 
          isActive={gameState === 'playing'} 
        />
        
        <PromptDisplay prompt={prompt} />
        
        <div className="flex flex-col items-center justify-center">
          <InputBox 
            onSubmit={handleSubmitWord} 
            isDisabled={gameState === 'roundOver'} 
            gameState={gameState}
            prompt={prompt}
          />
          
          <ScoreBoard score={score} feedback={feedback} />
        </div>
      </div>
    </div>
  );
};

export default GameContainer;