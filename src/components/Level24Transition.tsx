import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level24Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={24}
      title="اعرف المنتخب!"
      subtitle="من الحارس والمهاجم... اعرف المنتخب! 🏳️"
      gradient="from-teal-900 via-teal-700 to-teal-900"
      buttonText="يلا نبدأ! 🏳️🔥"
    />
  );
}
