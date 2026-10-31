import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level99Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={99}
      title="التحدي الأخير!"
      subtitle="آخر تحدي قبل المستوى 100! 🏆"
      gradient="from-yellow-900 via-amber-700 to-yellow-900"
      buttonText="يلا نبدأ! 🏆🔥"
    />
  );
}
