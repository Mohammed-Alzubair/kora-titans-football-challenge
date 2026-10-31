import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level28Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={28}
      title="النادي من سنة التأسيس!"
      subtitle="سنة واحدة... تعرف النادي؟ 📅🏟️"
      gradient="from-cyan-900 via-cyan-700 to-cyan-900"
      buttonText="يلا نبدأ! 📅🔥"
    />
  );
}
