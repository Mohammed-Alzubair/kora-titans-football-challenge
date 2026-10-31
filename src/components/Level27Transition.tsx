import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level27Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={27}
      title="النادي من الأساطير!"
      subtitle="4 أساطير لعبوا لنفس النادي... تعرفه؟ 🏛️"
      gradient="from-amber-900 via-amber-700 to-amber-900"
      buttonText="يلا نبدأ! 🏛️🔥"
    />
  );
}
