import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level56Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={56}
      title="من هو المدرب؟"
      subtitle="الآن ندخل عالم المدربين! 🧑‍🏫"
      gradient="from-emerald-900 via-teal-900 to-emerald-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
