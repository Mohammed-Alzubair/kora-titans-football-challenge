import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level9Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={9}
      title="اللاعب والنادي"
      subtitle="لاعب واحد لعب للنادي... اختاره! ⚽✅"
      gradient="from-green-900 via-green-700 to-green-800"
      buttonText="يلا ابدأ! 💪"
    />
  );
}
