import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level95Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={95}
      title="الجرس!"
      subtitle="آخر تحدي جرس... أعطها كلك! 🔥"
      gradient="from-orange-900 via-red-800 to-orange-900"
      buttonText="يلا نبدأ! 🔔"
    />
  );
}
