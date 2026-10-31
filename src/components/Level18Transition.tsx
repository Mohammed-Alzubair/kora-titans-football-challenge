import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level18Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={18}
      title="تحدي الأندية!"
      subtitle="اختبار سريع عن أندية العالم! 🌍"
      gradient="from-rose-900 via-rose-700 to-rose-900"
      buttonText="يلا نبدأ! 🌍🔥"
    />
  );
}
