'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Guess from '../Guess/Guess';
import { Feedback, GuessState } from '@/app/types/types';
import Keyboard from '../Keyboard/Keyboard';

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
    <div className='flex flex-col items-center justify-center p-4'>
      <div className='mb-4'>
        {guesses.map((item, index) => (
          <Guess key={index} guess={item.guess} feedback={item.feedback} />
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
