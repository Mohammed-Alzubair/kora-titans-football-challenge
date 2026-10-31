import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level8Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={8}
      title="تسريحة اللاعب!"
      subtitle="اعرف اللاعب من تسريحة شعره! 💇‍♂️"
      gradient="from-pink-900 via-pink-700 to-pink-900"
      buttonText="يلا نبدأ! 💇‍♂️🔥"
    />
  );
}
