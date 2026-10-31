import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level33Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={33}
      title="النادي الغامض!"
      subtitle="3 أدلة... نادي واحد... تعرفه؟ 🧠"
      gradient="from-purple-900 via-purple-700 to-purple-900"
      buttonText="يلا نبدأ! 🧠🔥"
    />
  );
}
