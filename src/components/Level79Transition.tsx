import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level79Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={79}
      title="المزاد!"
      subtitle="المزايدة مفتوحة! 🤑"
      gradient="from-yellow-900 via-amber-800 to-yellow-900"
      buttonText="ابدأ المزاد! 🔨"
    />
  );
}
