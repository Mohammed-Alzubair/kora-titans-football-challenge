import { LevelResult } from '@/types/levelProgression';
import { AuctionScreen } from './AuctionScreen';
export function Level83Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <AuctionScreen levelNum={83} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}
