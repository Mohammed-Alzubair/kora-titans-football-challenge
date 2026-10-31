import { LevelResult } from '@/types/levelProgression';
import { GuessWhoScreen } from './GuessWhoScreen';
export function Level56Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <GuessWhoScreen levelNum={56} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}