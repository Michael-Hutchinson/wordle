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

    if (currentGuess === correctWord) {
      setIsGameOver(true);
    }

    setGuesses([...guesses, currentGuess]);
    setCurrentGuess('');
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter your guess'
          maxLength={5}
          onChange={handleChange}
          value={currentGuess}
          disabled={isGameOver}
        />
        <button type='submit' disabled={isGameOver}>
          Guess
        </button>
      </form>
      {guesses.map((guess, index) => (
        <p key={index}>{guess}</p>
      ))}
      {isGameOver && <p>Correct!</p>}
    </div>
  );
};

export default Game;
