import { LevelResult } from '@/types/levelProgression';
import { GuessWhoScreen } from './GuessWhoScreen';
export function Level48Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <GuessWhoScreen levelNum={48} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}