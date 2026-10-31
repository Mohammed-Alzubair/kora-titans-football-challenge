import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level15Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={15}
      title="الشعار القديم!"
      subtitle="شعار قديم لنادي... تعرفه؟ 🏛️"
      gradient="from-yellow-900 via-yellow-700 to-yellow-900"
      buttonText="يلا نبدأ! 🏛️🔥"
    />
  );
}
