import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level84Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={84}
      title="المزاد!"
      subtitle="وقت المزاد الكبير! 🧠"
      gradient="from-yellow-900 via-amber-800 to-yellow-900"
      buttonText="ابدأ المزاد! 🔨"
    />
  );
}
