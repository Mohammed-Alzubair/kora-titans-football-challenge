import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level13Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={13}
      title="أعلام الدول!"
      subtitle="علم دولة... أي لاعب منها؟ 🌍"
      gradient="from-blue-900 via-blue-700 to-blue-900"
      buttonText="يلا نبدأ! 🌍🔥"
    />
  );
}
