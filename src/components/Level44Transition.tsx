import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level44Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={44}
      title="ضغط الجماهير!"
      subtitle="تلميحات سريعة... كل خطأ = خسارة نقطة! 🔥😤"
      gradient="from-orange-900 via-red-900 to-orange-900"
      buttonText="مستعد للضغط! 🔥"
    />
  );
}
