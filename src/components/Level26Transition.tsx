import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level26Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={26}
      title="من صاحب الرقم؟"
      subtitle="رقم القميص + النادي... تعرف اللاعب؟ 7️⃣"
      gradient="from-violet-900 via-violet-700 to-violet-900"
      buttonText="يلا نبدأ! 7️⃣🔥"
    />
  );
}
