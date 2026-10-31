import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level80Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={80}
      title="المزاد!"
      subtitle="ركّز وفكّر بسرعة! 🎯"
      gradient="from-yellow-900 via-amber-800 to-yellow-900"
      buttonText="ابدأ المزاد! 🔨"
    />
  );
}
