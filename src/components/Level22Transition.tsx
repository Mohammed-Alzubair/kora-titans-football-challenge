import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level22Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={22}
      title="الشعار القديم!"
      subtitle="شعارات أندية قديمة... تقدر تعرفها؟ 🏛️"
      gradient="from-amber-900 via-amber-700 to-amber-900"
      buttonText="يلا نبدأ! 🏛️🔥"
    />
  );
}
