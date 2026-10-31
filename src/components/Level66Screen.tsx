import { LevelResult } from '@/types/levelProgression';
import { WhatDoYouKnowScreen } from './WhatDoYouKnowScreen';
export function Level66Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <WhatDoYouKnowScreen levelNum={66} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}
