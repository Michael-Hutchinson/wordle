'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Guess from '../Guess/Guess';
import { Feedback, GuessState } from '@/app/types/types';

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentGuess(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isGameOver || guesses.length >= 6) {
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
    <div className='flex flex-col items-center justify-center'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter your guess'
          maxLength={correctWord.length}
          onChange={handleChange}
          value={currentGuess}
          disabled={isGameOver || guesses.length >= 6}
        />
        <button
          type='submit'
          disabled={
            isGameOver ||
            currentGuess.length !== correctWord.length ||
            guesses.length >= 6
          }
        >
          Guess
        </button>
      </form>
      {guesses.map((item, index) => (
        <Guess key={index} guess={item.guess} feedback={item.feedback} />
      ))}
      {isGameOver && (
        <div>
          {guesses.length >= 6 && currentGuess !== correctWord
            ? 'Game Over. Try again!'
            : "Congratulations! You've guessed the word."}
        </div>
      )}
    </div>
  );
};

export default Game;
