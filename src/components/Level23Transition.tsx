import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level23Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={23}
      title="اللاعب وهو صغير!"
      subtitle="صور لاعبين وهم أطفال... تعرفهم؟ 👶"
      gradient="from-purple-900 via-purple-700 to-purple-900"
      buttonText="يلا نبدأ! 👶🔥"
    />
  );
}
