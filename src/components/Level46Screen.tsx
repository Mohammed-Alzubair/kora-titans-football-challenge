import { LevelResult } from '@/types/levelProgression';
import { GuessWhoScreen } from './GuessWhoScreen';
export function Level46Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <GuessWhoScreen levelNum={46} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}