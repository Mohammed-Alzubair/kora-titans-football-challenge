import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level48Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={48}
      title="من هو اللاعب؟"
      subtitle="ساحر برازيلي... من يكون؟ 🇧🇷"
      gradient="from-indigo-900 via-purple-900 to-indigo-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
