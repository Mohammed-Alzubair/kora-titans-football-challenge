import { FootballTransitionLayout } from './FootballTransitionLayout';

export function LevelTransition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={2}
      title="المستوى الصعب"
      subtitle="الشعار يظهر لجزء من الثانية فقط! ركز زين!"
      gradient="from-yellow-900 via-amber-800 to-yellow-900"
      buttonText="يلا نبدأ التحدي! 🚀"
    />
  );
}
