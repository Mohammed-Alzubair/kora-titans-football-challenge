import { LevelResult } from '@/types/levelProgression';
import { AuctionScreen } from './AuctionScreen';
export function Level80Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <AuctionScreen levelNum={80} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}
