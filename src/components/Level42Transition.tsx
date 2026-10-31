import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level42Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={42}
      title="3 أدلة!"
      subtitle="3 تلميحات... لاعب واحد... من هو؟ 🧩"
      gradient="from-fuchsia-900 via-fuchsia-700 to-fuchsia-900"
      buttonText="يلا نبدأ! 🧩🔥"
    />
  );
}
