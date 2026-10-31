import { LevelResult } from '@/types/levelProgression';
import { WhatDoYouKnowScreen } from './WhatDoYouKnowScreen';
export function Level67Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  return <WhatDoYouKnowScreen levelNum={67} onRestart={onRestart} onLevelComplete={onLevelComplete} />;
}
