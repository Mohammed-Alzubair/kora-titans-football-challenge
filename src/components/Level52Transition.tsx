import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level52Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={52}
      title="من هو اللاعب؟"
      subtitle="هداف فرنسي أسطوري... 🇫🇷"
      gradient="from-indigo-900 via-purple-900 to-indigo-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
