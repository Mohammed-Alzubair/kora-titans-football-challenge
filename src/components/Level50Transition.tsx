import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level50Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={50}
      title="من هو اللاعب؟"
      subtitle="وحش تسجيل الأهداف... 💪"
      gradient="from-indigo-900 via-purple-900 to-indigo-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
