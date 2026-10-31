import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level83Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={83}
      title="المزاد!"
      subtitle="سرعة + معرفة = فوز! ⚡"
      gradient="from-yellow-900 via-amber-800 to-yellow-900"
      buttonText="ابدأ المزاد! 🔨"
    />
  );
}
