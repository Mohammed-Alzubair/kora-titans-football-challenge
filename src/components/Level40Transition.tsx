import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level40Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={40}
      title="لاعب من أندية كثيرة!"
      subtitle="4 أندية... لاعب واحد... من هو؟ 🌍"
      gradient="from-indigo-900 via-indigo-700 to-indigo-900"
      buttonText="يلا نبدأ! 🌍🔥"
    />
  );
}
