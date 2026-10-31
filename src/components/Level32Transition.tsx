import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level32Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={32}
      title="نادي الانتقال!"
      subtitle="من أي نادي انتقل هذا اللاعب؟ 🔄"
      gradient="from-orange-900 via-orange-700 to-orange-900"
      buttonText="يلا نبدأ! 🔄🔥"
    />
  );
}
