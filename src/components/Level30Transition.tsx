import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level30Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={30}
      title="النادي المشترك!"
      subtitle="لاعبان لعبا معاً في نفس النادي... أيهم؟ 🤝"
      gradient="from-indigo-900 via-indigo-700 to-indigo-900"
      buttonText="يلا نبدأ! 👥🔥"
    />
  );
}
