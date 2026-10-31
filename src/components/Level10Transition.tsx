import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level10Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={10}
      title="من لعب هنا؟"
      subtitle="واحد بس لعب للنادي والباقي لا... اختاره! ⚽✅"
      gradient="from-green-900 via-green-700 to-green-800"
      buttonText="يلا ابدأ! 💪"
    />
  );
}
