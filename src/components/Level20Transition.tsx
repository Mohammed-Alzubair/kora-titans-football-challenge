import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level20Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={20}
      title="تحدي المعرفة!"
      subtitle="10 أسئلة منوعة... هل تعرف الإجابة؟ 🧠"
      gradient="from-cyan-900 via-cyan-700 to-cyan-900"
      buttonText="يلا نبدأ! 🧠🔥"
    />
  );
}
