import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level58Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={58}
      title="من هو المدرب؟"
      subtitle="مدرب ألماني حماسي... 🇩🇪🔥"
      gradient="from-emerald-900 via-teal-900 to-emerald-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
