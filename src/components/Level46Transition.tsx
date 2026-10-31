import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level46Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={46}
      title="من هو اللاعب؟"
      subtitle="اسأل أسئلة نعم/لا واكتشف اللاعب المخفي! 🕵️"
      gradient="from-indigo-900 via-purple-900 to-indigo-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
