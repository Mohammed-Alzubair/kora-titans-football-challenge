import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level5Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={5}
      title="دوري الأبطال"
      subtitle="من فاز؟ وبكم انتهت المباراة؟ 🏆"
      gradient="from-purple-900 via-indigo-800 to-purple-900"
      buttonText="تعال لو قدها! 💪"
    />
  );
}
