import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level25Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={25}
      title="المنتخب من التشكيلة!"
      subtitle="شعارات الأندية بدل الأسماء... تعرف المنتخب؟ 🏟️"
      gradient="from-emerald-900 via-emerald-700 to-emerald-900"
      buttonText="يلا نبدأ! 🏟️🔥"
    />
  );
}
