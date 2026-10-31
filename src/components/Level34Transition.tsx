import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level34Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={34}
      title="النادي من المدرب!"
      subtitle="مدرب مشهور... أي نادي دربه؟ 🧑‍🏫"
      gradient="from-teal-900 via-teal-700 to-teal-900"
      buttonText="يلا نبدأ! 🧑‍🏫🔥"
    />
  );
}
