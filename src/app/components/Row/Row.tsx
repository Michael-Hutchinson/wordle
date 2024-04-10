import { GuessState } from '@/app/types/types';
import React from 'react';
import Letter from '../Letter/Letter';

interface RowProps {
  rowIndex: number;
  isCurrentGuess: boolean;
  currentGuess: string;
  guesses: GuessState[];
}

const Row = ({ rowIndex, isCurrentGuess, currentGuess, guesses }: RowProps) => {
  return (
    <div className='grid grid-cols-5 gap-2'>
      {Array.from({ length: 5 }).map((_, colIndex) => (
        <Letter
          key={colIndex}
          letter={
            isCurrentGuess
              ? currentGuess[colIndex]
              : guesses[rowIndex]?.guess[colIndex] || ''
          }
          feedback={
            isCurrentGuess ? undefined : guesses[rowIndex]?.feedback[colIndex]
          }
        />
      ))}
    </div>
  );
};

export default Row;
