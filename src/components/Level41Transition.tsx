import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level41Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={41}
      title="سؤال الوقت!"
      subtitle="5 ثواني فقط! هل تجاوب بسرعة؟ ⏱"
      gradient="from-red-900 via-red-700 to-red-900"
      buttonText="يلا نبدأ! ⏱🔥"
    />
  );
}
