import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level93Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={93}
      title="الجرس!"
      subtitle="تحدي الجرس مستمر! 🔔"
      gradient="from-orange-900 via-red-800 to-orange-900"
      buttonText="يلا نبدأ! 🔔"
    />
  );
}
