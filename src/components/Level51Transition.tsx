import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level51Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={51}
      title="من هو اللاعب؟"
      subtitle="ملك عربي في الدوري الإنجليزي... 👑"
      gradient="from-indigo-900 via-purple-900 to-indigo-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
