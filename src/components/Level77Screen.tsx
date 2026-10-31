import { LevelResult } from '@/types/levelProgression';
import { AuctionScreen } from './AuctionScreen';
export function Level77Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <AuctionScreen levelNum={77} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}
