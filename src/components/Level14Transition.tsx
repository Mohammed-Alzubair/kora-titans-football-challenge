import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level14Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={14}
      title="تاريخ اللاعب!"
      subtitle="مسيرة لاعب... في أي سنة انتقل؟ 📅"
      gradient="from-amber-900 via-amber-700 to-amber-900"
      buttonText="يلا نبدأ! 📅🔥"
    />
  );
}
