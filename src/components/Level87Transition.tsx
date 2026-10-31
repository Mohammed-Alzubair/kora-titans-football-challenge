import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level87Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={87}
      title="الجرس!"
      subtitle="سرعة البديهة هي سلاحك! 🧠"
      gradient="from-orange-900 via-red-800 to-orange-900"
      buttonText="يلا نبدأ! 🔔"
    />
  );
}
