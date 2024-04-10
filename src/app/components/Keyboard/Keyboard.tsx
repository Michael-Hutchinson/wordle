'use client';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onSubmit: () => void;
  onDelete: () => void;
}

const Keyboard = ({ onKeyPress, onSubmit, onDelete }: KeyboardProps) => {
  const rows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

  return (
    <div>
      {rows.map((row, index) => (
        <div key={index} className='flex justify-center'>
          {index === 2 && (
            <button
              className='bg-gray-400 text-white p-2 m-1 rounded shadow'
              onClick={onSubmit}
            >
              Enter
            </button>
          )}
          {row.split('').map((letter) => (
            <button
              key={letter}
              className='bg-gray-500 hover:bg-gray-700 text-white p-2 m-1 rounded shadow'
              onClick={() => onKeyPress(letter)}
            >
              {letter}
            </button>
          ))}
          {index === 2 && (
            <button
              className='bg-gray-400 text-white p-2 m-1 rounded shadow'
              onClick={onDelete}
            >
              Del
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
