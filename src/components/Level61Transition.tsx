import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level61Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={61}
      title="من هو المدرب؟"
      subtitle="مدرب إسباني مبدع... 🇪🇸"
      gradient="from-emerald-900 via-teal-900 to-emerald-900"
      buttonText="يلا نبدأ! 🎯"
    />
  );
}
