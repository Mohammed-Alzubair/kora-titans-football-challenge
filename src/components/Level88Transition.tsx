import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level88Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={88}
      title="الجرس!"
      subtitle="الجرس يظهر ثانيتين فقط... جاهز؟ ⚡"
      gradient="from-orange-900 via-red-800 to-orange-900"
      buttonText="يلا نبدأ! 🔔"
    />
  );
}
