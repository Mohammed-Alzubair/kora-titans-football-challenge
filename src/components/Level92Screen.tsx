import { LevelResult } from '@/types/levelProgression';
import { BellGameScreen } from './BellGameScreen';
export function Level92Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <BellGameScreen levelNum={92} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}
