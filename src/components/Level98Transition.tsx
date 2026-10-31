import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level98Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={98}
      title="رتّب الترتيب!"
      subtitle="رتّب اللاعبين بالترتيب الصحيح! 📊"
      gradient="from-blue-900 via-indigo-800 to-blue-900"
      buttonText="يلا نبدأ! 📊🔥"
    />
  );
}
