import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level90Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={90}
      title="الجرس!"
      subtitle="خلك سريع وذكي! 🏆"
      gradient="from-orange-900 via-red-800 to-orange-900"
      buttonText="يلا نبدأ! 🔔"
    />
  );
}
