import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level59Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={59}
      title="من هو المدرب؟"
      subtitle="مدرب أرجنتيني مقاتل... 🇦🇷"
      gradient="from-emerald-900 via-teal-900 to-emerald-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
