import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level64Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={64}
      title="من هو المدرب؟"
      subtitle="مدرب إنجليزي تاريخي... 🏴"
      gradient="from-emerald-900 via-teal-900 to-emerald-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
