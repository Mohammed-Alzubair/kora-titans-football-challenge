import { LevelResult } from '@/types/levelProgression';
import { BellGameScreen } from './BellGameScreen';
export function Level88Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <BellGameScreen levelNum={88} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}
