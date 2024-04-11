import Game from './components/Game/Game';
import Toggle from './components/Toggle/Toggle';
import { getRandomWord } from './constants/words';

export default function Home() {
  const randomWord = getRandomWord();
  return (
    <main className='flex flex-col items-center justify-center min-h-screen gap-6'>
      <header className='flex justify-between items-center gap-4'>
        <h1 className='text-4xl font-bold'>Wordle</h1>
        <Toggle />
      </header>
      <Game correctWord={randomWord.toUpperCase()} />
    </main>
  );
}
