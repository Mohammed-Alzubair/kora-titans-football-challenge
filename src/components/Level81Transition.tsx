import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level81Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={81}
      title="المزاد!"
      subtitle="النقاط في انتظارك! 🏆"
      gradient="from-yellow-900 via-amber-800 to-yellow-900"
      buttonText="ابدأ المزاد! 🔨"
    />
  );
}
