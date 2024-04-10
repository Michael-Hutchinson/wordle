import Game from './components/Game/Game';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1>Wordle</h1>
      <Game />
    </div>
  );
}
