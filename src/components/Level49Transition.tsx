import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level49Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={49}
      title="من هو اللاعب؟"
      subtitle="نجم فرنسي سريع جداً... 🚀"
      gradient="from-indigo-900 via-purple-900 to-indigo-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
