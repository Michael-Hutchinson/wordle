'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useMemo } from 'react';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onSubmit: () => void;
  onDelete: () => void;
}

const Keyboard = ({ onKeyPress, onSubmit, onDelete }: KeyboardProps) => {
  const rows = useMemo(() => ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'], []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();

      if (rows.join('').includes(key)) {
        onKeyPress(key);
      } else if (key === 'ENTER') {
        onSubmit();
      } else if (key === 'BACKSPACE') {
        onDelete();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyPress, onSubmit, onDelete, rows]);

  return (
    <div>
      {rows.map((row, index) => (
        <div key={index} className='flex justify-center'>
          {index === 2 && (
            <Button
              className='bg-gray-400 text-white p-2 m-1 rounded shadow'
              onClick={onSubmit}
            >
              Enter
            </Button>
          )}
          {row.split('').map((letter) => (
            <Button
              key={letter}
              className='bg-gray-500 hover:bg-gray-700 text-white p-2 m-1 rounded shadow'
              onClick={() => onKeyPress(letter)}
            >
              {letter}
            </Button>
          ))}
          {index === 2 && (
            <Button
              className='bg-gray-400 text-white p-2 m-1 rounded shadow'
              onClick={onDelete}
            >
              Del
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
