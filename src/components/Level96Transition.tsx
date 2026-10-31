import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level96Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={96}
      title="تحدي الفيديو!"
      subtitle="شاهد المقطع واعرف اللاعب! 🎬"
      gradient="from-purple-900 via-fuchsia-800 to-purple-900"
      buttonText="يلا نبدأ! 🎬🔥"
    />
  );
}
