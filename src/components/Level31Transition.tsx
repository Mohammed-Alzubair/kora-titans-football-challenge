import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level31Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={31}
      title="هل لعب هنا؟"
      subtitle="لاعب ونادي... هل لعب فيه فعلاً؟ ✅❌"
      gradient="from-emerald-900 via-emerald-700 to-emerald-900"
      buttonText="يلا نبدأ! ✅🔥"
    />
  );
}
