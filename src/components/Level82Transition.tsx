import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level82Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={82}
      title="المزاد!"
      subtitle="التحدي الحقيقي هنا! 🔥"
      gradient="from-yellow-900 via-amber-800 to-yellow-900"
      buttonText="ابدأ المزاد! 🔨"
    />
  );
}
