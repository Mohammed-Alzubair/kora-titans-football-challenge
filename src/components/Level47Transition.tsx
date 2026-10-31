import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level47Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={47}
      title="من هو اللاعب؟"
      subtitle="لاعب آخر مخفي... هل تقدر تكتشفه؟ 🔍"
      gradient="from-indigo-900 via-purple-900 to-indigo-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
