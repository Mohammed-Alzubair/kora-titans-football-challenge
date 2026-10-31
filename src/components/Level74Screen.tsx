import { LevelResult } from '@/types/levelProgression';
import { WhatDoYouKnowScreen } from './WhatDoYouKnowScreen';
export function Level74Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <WhatDoYouKnowScreen levelNum={74} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}
