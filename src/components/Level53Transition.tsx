import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level53Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={53}
      title="من هو اللاعب؟"
      subtitle="ساحر كرواتي في الوسط... 🇭🇷"
      gradient="from-indigo-900 via-purple-900 to-indigo-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
