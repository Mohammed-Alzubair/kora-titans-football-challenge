import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level3Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={3}
      title="شعارات متشابهة"
      subtitle="ثلاث شعارات متشابهة... واحد فقط أصلي! 🔍"
      gradient="from-red-900 via-red-700 to-red-900"
      buttonText="أنا جاهز للتحدي! 💪"
    />
  );
}
