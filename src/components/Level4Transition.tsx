import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level4Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={4}
      title="خمّن النادي!"
      subtitle="إحصائيات نادي... خمّن من هو! 📊🤔"
      gradient="from-blue-900 via-blue-700 to-blue-900"
      buttonText="أنا جاهز! 🔥"
    />
  );
}
