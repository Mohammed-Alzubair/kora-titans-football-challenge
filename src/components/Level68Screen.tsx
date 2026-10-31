import { LevelResult } from '@/types/levelProgression';
import { WhatDoYouKnowScreen } from './WhatDoYouKnowScreen';
export function Level68Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <WhatDoYouKnowScreen levelNum={68} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}
