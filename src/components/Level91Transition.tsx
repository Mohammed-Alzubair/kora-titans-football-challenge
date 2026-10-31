import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level91Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={91}
      title="الجرس!"
      subtitle="اضغط الجرس بسرعة! 🔔"
      gradient="from-orange-900 via-red-800 to-orange-900"
      buttonText="يلا نبدأ! 🔔"
    />
  );
}
