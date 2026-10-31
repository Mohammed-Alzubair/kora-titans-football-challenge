import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level85Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={85}
      title="المزاد!"
      subtitle="آخر مزاد... أعطها كل شي! 🔥"
      gradient="from-yellow-900 via-amber-800 to-yellow-900"
      buttonText="ابدأ المزاد! 🔨"
    />
  );
}
