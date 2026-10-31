import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level97Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={97}
      title="القيمة السوقية!"
      subtitle="خمّن قيمة اللاعب! 💰"
      gradient="from-green-900 via-emerald-800 to-green-900"
      buttonText="يلا نبدأ! 💰🔥"
    />
  );
}
