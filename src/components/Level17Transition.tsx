import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level17Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={17}
      title="مسيرة اللاعب!"
      subtitle="من مسيرته اعرف اللاعب! ⚽"
      gradient="from-teal-900 via-teal-700 to-teal-900"
      buttonText="يلا نبدأ! ⚽🔥"
    />
  );
}
