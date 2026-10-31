import { LevelResult } from '@/types/levelProgression';
import { AuctionScreen } from './AuctionScreen';
export function Level76Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <AuctionScreen levelNum={76} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}
