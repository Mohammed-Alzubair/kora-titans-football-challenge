import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level78Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={78}
      title="المزاد!"
      subtitle="أثبت إنك تعرف! 💪"
      gradient="from-yellow-900 via-amber-800 to-yellow-900"
      buttonText="ابدأ المزاد! 🔨"
    />
  );
}
