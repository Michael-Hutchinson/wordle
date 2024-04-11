import Game from './components/Game/Game';
import Toggle from './components/Toggle/Toggle';
import { getRandomWord } from './constants/words';

export default function Home() {
  const randomWord = getRandomWord();
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
      <div className='flex justify-between items-center gap-4'>
        <h1 className='text-4xl font-bold'>Wordle</h1>
        <Toggle />
      </div>
      <Game correctWord={randomWord.toUpperCase()} />
    </div>
  );
}
