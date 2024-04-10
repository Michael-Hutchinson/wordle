'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

const Game = () => {
  const correctWord = 'hello';
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentGuess(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isGameOver || guesses.length >= 6) {
      return;
    }

    const updatedGuesses = [...guesses, currentGuess];
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
      {guesses.map((guess, index) => (
        <p key={index}>{guess}</p>
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
