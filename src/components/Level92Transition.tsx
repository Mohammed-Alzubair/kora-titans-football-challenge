import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level92Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={92}
      title="الجرس!"
      subtitle="سرعة وذكاء! ⚡"
      gradient="from-orange-900 via-red-800 to-orange-900"
      buttonText="يلا نبدأ! 🔔"
    />
  );
}
