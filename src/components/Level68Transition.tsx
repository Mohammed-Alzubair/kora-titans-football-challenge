import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level68Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={68}
      title="ماذا تعرف؟"
      subtitle="اذكر أكبر عدد ممكن من الإجابات! 🧠"
      gradient="from-amber-950 via-orange-950 to-red-950"
      buttonText="يلا نبدأ! 🔥"
    />
  );
}
