import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level76Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={76}
      title="المزاد!"
      subtitle="المزاد يبدأ الآن! كم تقدر تراهن؟ 🏛️🔨"
      gradient="from-yellow-900 via-amber-800 to-yellow-900"
      buttonText="ابدأ المزاد! 🔨"
    />
  );
}
