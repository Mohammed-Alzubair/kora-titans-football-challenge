import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level45Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={45}
      title="الكلاسيكو النهائي!"
      subtitle="10 أسئلة مختلطة... المعركة الأخيرة! 👑🔥"
      gradient="from-yellow-900 via-amber-800 to-yellow-900"
      buttonText="المعركة النهائية! 👑"
    />
  );
}
