import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level60Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={60}
      title="من هو المدرب؟"
      subtitle="مدرب برتغالي مشهور... 🇵🇹"
      gradient="from-emerald-900 via-teal-900 to-emerald-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
