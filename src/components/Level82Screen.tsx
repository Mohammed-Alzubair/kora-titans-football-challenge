import { LevelResult } from '@/types/levelProgression';
import { AuctionScreen } from './AuctionScreen';
export function Level82Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <AuctionScreen levelNum={82} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}
