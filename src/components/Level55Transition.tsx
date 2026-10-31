import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level55Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={55}
      title="من هو اللاعب؟"
      subtitle="أسطورة فرنسية... آخر لاعب! ⭐"
      gradient="from-indigo-900 via-purple-900 to-indigo-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
