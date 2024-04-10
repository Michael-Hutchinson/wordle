'use client';

import { Feedback } from '@/app/types/types';

interface GuessProps {
  guess: string;
  feedback: Feedback[];
}

const Guess = ({ guess, feedback }: GuessProps) => {
  return (
    <div className='flex justify-center gap-2 p-1'>
      {guess.split('').map((letter, index) => {
        const feedbackClass = feedback[index];
        const bgColorClass =
          feedbackClass === Feedback.Correct
            ? 'bg-green-500'
            : feedbackClass === Feedback.Incorrect
            ? 'bg-yellow-500'
            : 'bg-gray-500';
        return (
          <span key={index} className={`p-4 ${bgColorClass} text-white`}>
            {letter}
          </span>
        );
      })}
    </div>
  );
};

export default Guess;
