import { LevelResult } from '@/types/levelProgression';
import { GuessWhoScreen } from './GuessWhoScreen';
export function Level64Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <GuessWhoScreen levelNum={64} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}
