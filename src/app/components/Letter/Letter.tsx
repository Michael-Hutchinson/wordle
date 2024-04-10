'use client';

import { Feedback } from '@/app/types/types';

interface LetterProps {
  letter: string;
  feedback: Feedback | undefined;
}

const Letter = ({ letter, feedback }: LetterProps) => {
  const bgColorMap = {
    [Feedback.Correct]: 'bg-green-500',
    [Feedback.Incorrect]: 'bg-yellow-500',
    [Feedback.Invalid]: 'bg-gray-500',
  };

  const bgColor = feedback ? bgColorMap[feedback] : 'bg-gray-200';

  return (
    <div
      className={`rounded shadow w-12 h-12 flex items-center justify-center uppercase ${bgColor} text-white`}
    >
      {letter}
    </div>
  );
};

export default Letter;
