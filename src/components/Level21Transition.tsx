import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level21Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={21}
      title="خمّن التشكيلة!"
      subtitle="من شعارات الأندية... اعرف النادي! ⚽"
      gradient="from-green-900 via-green-700 to-green-900"
      buttonText="يلا نبدأ! ⚽🔥"
    />
  );
}
