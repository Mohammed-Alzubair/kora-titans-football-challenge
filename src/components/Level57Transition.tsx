import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level57Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={57}
      title="من هو المدرب؟"
      subtitle="مدرب إيطالي عظيم... 🇮🇹"
      gradient="from-emerald-900 via-teal-900 to-emerald-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
