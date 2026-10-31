import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level39Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={39}
      title="من زميله؟"
      subtitle="لاعب مشهور... من كان زميله في النادي؟ 🤝"
      gradient="from-lime-900 via-lime-700 to-lime-900"
      buttonText="يلا نبدأ! 🤝🔥"
    />
  );
}
