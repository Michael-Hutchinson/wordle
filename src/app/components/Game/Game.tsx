'use client';

import { Feedback, GuessState } from '@/app/types/types';
import { useState } from 'react';
import Keyboard from '../Keyboard/Keyboard';
import Row from '../Row/Row';
import { words } from '@/app/constants/words';

interface GameProps {
  correctWord: string;
}

const Game = ({ correctWord }: GameProps) => {
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<GuessState[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const getGuessFeedback = (guess: string): Feedback[] => {
    return guess.split('').map((letter, index) => {
      if (correctWord[index] === letter) {
        return Feedback.Correct;
      } else if (correctWord.includes(letter)) {
        return Feedback.Incorrect;
      } else {
        return Feedback.Invalid;
      }
    });
  };

  const handleKeyPress = (key: string) => {
    if (!isGameOver && currentGuess.length < correctWord.length) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  const handleDelete = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (
      isGameOver ||
      guesses.length >= 6 ||
      currentGuess.length !== correctWord.length
    ) {
      return;
    }

    if (!words.includes(currentGuess.toLowerCase())) {
      alert('Word does not exist in list');
      return;
    }

    const feedback = getGuessFeedback(currentGuess);
    const updatedGuesses = [...guesses, { guess: currentGuess, feedback }];
    const gameJustEnded =
      currentGuess === correctWord || updatedGuesses.length === 6;

    setGuesses(updatedGuesses);
    setCurrentGuess('');

    if (gameJustEnded) {
      setIsGameOver(true);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center gap-6'>
      <div className='grid gap-2'>
        {Array.from({ length: 6 }).map((_, rowIndex) => (
          <Row
            key={rowIndex}
            rowIndex={rowIndex}
            isCurrentGuess={rowIndex === guesses.length}
            currentGuess={currentGuess}
            guesses={guesses}
          />
        ))}
      </div>
      <Keyboard
        onKeyPress={handleKeyPress}
        onDelete={handleDelete}
        onSubmit={handleSubmit}
      />
      {isGameOver && (
        <div className='text-2xl font-bold my-2'>
          {guesses.length >= 6 && currentGuess !== correctWord
            ? 'Game Over. Try again!'
            : "Congratulations! You've guessed the word."}
        </div>
      )}
    </div>
  );
};

export default Game;
