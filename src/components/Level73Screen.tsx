import { LevelResult } from '@/types/levelProgression';
import { WhatDoYouKnowScreen } from './WhatDoYouKnowScreen';
export function Level73Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <WhatDoYouKnowScreen levelNum={73} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}
