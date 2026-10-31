import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level12Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={12}
      title="اللاعب من النادي!"
      subtitle="نادي واحد... من هو اللاعب الذي لعب فيه؟ 🤔"
      gradient="from-emerald-900 via-emerald-700 to-emerald-900"
      buttonText="يلا نبدأ! ⚽🔥"
    />
  );
}
