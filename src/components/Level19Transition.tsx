import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level19Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={19}
      title="صورة وسؤال!"
      subtitle="صورة + سؤال = تحدي! 📸"
      gradient="from-violet-900 via-violet-700 to-violet-900"
      buttonText="يلا نبدأ! 📸🔥"
    />
  );
}
