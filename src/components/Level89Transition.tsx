import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level89Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={89}
      title="الجرس!"
      subtitle="فرصة واحدة لكل سؤال! 🎯"
      gradient="from-orange-900 via-red-800 to-orange-900"
      buttonText="يلا نبدأ! 🔔"
    />
  );
}
