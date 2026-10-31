import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level11Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={11}
      title="اعرف الملعب!"
      subtitle="ملعب مشهور... أي نادي يلعب فيه؟ 🏟️"
      gradient="from-sky-900 via-sky-700 to-sky-900"
      buttonText="يلا نبدأ! 🏟️🔥"
    />
  );
}
