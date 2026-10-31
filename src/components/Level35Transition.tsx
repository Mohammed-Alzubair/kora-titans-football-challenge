import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level35Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={35}
      title="لون القميص!"
      subtitle="لون القميص يكشف النادي... تعرفه؟ 👕"
      gradient="from-rose-900 via-rose-700 to-rose-900"
      buttonText="يلا نبدأ! 👕🔥"
    />
  );
}
