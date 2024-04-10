import Game from './components/Game/Game';
import { getRandomWord } from './constants/words';

export default function Home() {
  const randomWord = getRandomWord();
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-4xl font-bold mb-4'>Wordle</h1>{' '}
      <Game correctWord={randomWord.toUpperCase()} />
    </div>
  );
}
