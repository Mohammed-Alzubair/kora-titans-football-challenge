import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level7Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={7}
      title="المدرب والتكتيك"
      subtitle="اعرف النادي من التشكيلة والمدرب! ⚽"
      gradient="from-green-900 via-green-700 to-green-900"
      buttonText="يلا نبدأ! 🔥"
    />
  );
}
