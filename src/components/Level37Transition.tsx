import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level37Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={37}
      title="تحدي النجوم!"
      subtitle="5 لاعبين يظهرون بسرعة... اختر الصحيح! ⭐"
      gradient="from-amber-900 via-amber-700 to-amber-900"
      buttonText="يلا نبدأ! ⭐🔥"
    />
  );
}
