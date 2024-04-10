'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

interface GameProps {
  correctWord: string;
}

interface GuessState {
  guess: string;
  feedback: ('correct' | 'incorrect' | 'invalid')[];
}

const Game = ({ correctWord }: GameProps) => {
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<GuessState[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const getGuessFeedback = (guess: string) => {
    const feedback = guess.split('').map((letter, index) => {
      if (correctWord[index] === letter) {
        return 'correct';
      } else if (correctWord.includes(letter)) {
        return 'incorrect';
      } else {
        return 'invalid';
      }
    });
    return feedback;
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
        <div key={index} className='flex justify-center gap-2 p-1'>
          {item.guess.split('').map((letter, letterIndex) => {
            const feedbackClass = item.feedback[letterIndex];
            let bgColorClass = '';

            switch (feedbackClass) {
              case 'correct':
                bgColorClass = 'bg-green-500';
                break;
              case 'incorrect':
                bgColorClass = 'bg-yellow-500';
                break;
              case 'invalid':
                bgColorClass = 'bg-gray-500';
                break;
              default:
                bgColorClass = 'bg-white';
            }

            return (
              <span
                key={letterIndex}
                className={`p-4 ${bgColorClass} text-white`}
              >
                {letter}
              </span>
            );
          })}
        </div>
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
