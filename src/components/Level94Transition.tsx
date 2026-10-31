import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level94Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={94}
      title="الجرس!"
      subtitle="كل ثانية تحسب! ⏱"
      gradient="from-orange-900 via-red-800 to-orange-900"
      buttonText="يلا نبدأ! 🔔"
    />
  );
}
