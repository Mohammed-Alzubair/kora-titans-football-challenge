import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level63Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={63}
      title="من هو المدرب؟"
      subtitle="مدرب هولندي أسطوري... 🇳🇱"
      gradient="from-emerald-900 via-teal-900 to-emerald-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
