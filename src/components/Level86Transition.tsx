import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level86Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={86}
      title="الجرس!"
      subtitle="اضغط الجرس بسرعة قبل ما يختفي! 🔔"
      gradient="from-orange-900 via-red-800 to-orange-900"
      buttonText="يلا نبدأ! 🔔"
    />
  );
}
