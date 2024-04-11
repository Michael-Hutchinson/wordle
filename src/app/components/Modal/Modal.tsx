'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';

const examples = [
  {
    word: 'CRANE',
    guess: 'CARES',
    description: 'C is in the correct place.',
    feedback: ['correct', 'invalid', 'invalid', 'invalid', 'invalid'],
  },
  {
    word: 'CRANE',
    guess: 'TRACE',
    description: 'R and A are in the word but in the wrong place.',
    feedback: ['invalid', 'incorrect', 'incorrect', 'invalid', 'invalid'],
  },
  {
    word: 'CRANE',
    guess: 'BLISS',
    description: 'No letters are in the word.',
    feedback: ['invalid', 'invalid', 'invalid', 'invalid', 'invalid'],
  },
];

const getBgColorClass = (feedback: string, letter: string, word: string) => {
  switch (feedback) {
    case 'correct':
      return 'bg-green-500';
    case 'incorrect':
      return word.includes(letter) ? 'bg-yellow-500' : 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};

const Modal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon'>
          <QuestionMarkCircledIcon className='h-[1.2rem] w-[1.2rem]' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>How to play</DialogTitle>
          <DialogDescription>
            Guess the WORDLE in 6 tries or less.
            <ul className='list-disc pl-6'>
              <li>Enter a 5-letter word.</li>
              <li>
                Letters in the right place are{' '}
                <span className='text-green-500'>green</span>.
              </li>
              <li>
                Letters in the word but in the wrong place are{' '}
                <span className='text-yellow-500'>yellow</span>.
              </li>
              <li>
                Letters not in the word are{' '}
                <span className='text-gray-500'>gray</span>.
              </li>
            </ul>
          </DialogDescription>
          <div className='grid gap-4 pt-4'>
            <p>Examples</p>
            {examples.map((example, index) => (
              <div key={index}>
                <p>{example.description}</p>
                <div className='flex'>
                  {example.guess.split('').map((letter, letterIndex) => (
                    <span
                      key={letterIndex}
                      className={`rounded shadow w-8 h-8 flex justify-center items-center text-center uppercase font-bold mr-2 ${getBgColorClass(
                        example.feedback[letterIndex],
                        letter,
                        example.word
                      )}`}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
