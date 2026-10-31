import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level77Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={77}
      title="المزاد!"
      subtitle="كم تقدر تراهن؟ ⏱️ 35 ثانية فقط!"
      gradient="from-yellow-900 via-amber-800 to-yellow-900"
      buttonText="ابدأ المزاد! 🔨"
    />
  );
}
