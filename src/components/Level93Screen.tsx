import { LevelResult } from '@/types/levelProgression';
import { BellGameScreen } from './BellGameScreen';
export function Level93Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <BellGameScreen levelNum={93} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}
