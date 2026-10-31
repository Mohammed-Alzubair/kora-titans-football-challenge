import { LevelResult } from '@/types/levelProgression';
import { BellGameScreen } from './BellGameScreen';
export function Level95Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <BellGameScreen levelNum={95} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}
