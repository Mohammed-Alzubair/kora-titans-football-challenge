import { LevelResult } from '@/types/levelProgression';
import { GuessWhoScreen } from './GuessWhoScreen';
export function Level49Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <GuessWhoScreen levelNum={49} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}