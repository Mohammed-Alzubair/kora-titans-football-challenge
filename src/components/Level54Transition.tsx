import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level54Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={54}
      title="من هو اللاعب؟"
      subtitle="صاحب الابتسامة الأشهر... 😁"
      gradient="from-indigo-900 via-purple-900 to-indigo-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
