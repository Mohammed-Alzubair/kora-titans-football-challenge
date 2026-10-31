import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level36Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={36}
      title="النادي من المدينة!"
      subtitle="مدينة واحدة... أي نادي فيها؟ 🏙️"
      gradient="from-cyan-900 via-cyan-700 to-cyan-900"
      buttonText="يلا نبدأ! 🏙️🔥"
    />
  );
}
