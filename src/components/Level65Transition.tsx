import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level65Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={65}
      title="من هو المدرب؟"
      subtitle="آخر مدرب في التحدي... ⭐"
      gradient="from-emerald-900 via-teal-900 to-emerald-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
