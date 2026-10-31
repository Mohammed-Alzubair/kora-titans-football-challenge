import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level16Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={16}
      title="أنديتي!"
      subtitle="من الأدلة اعرف أي نادي 🧠"
      gradient="from-indigo-900 via-indigo-700 to-indigo-900"
      buttonText="يلا نبدأ! 🧠🔥"
    />
  );
}
