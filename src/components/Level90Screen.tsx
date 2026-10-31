import { LevelResult } from '@/types/levelProgression';
import { BellGameScreen } from './BellGameScreen';
export function Level90Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <BellGameScreen levelNum={90} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}
