import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level6Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={6}
      title="تقصّ اللاعب!"
      subtitle="قص جزء من صورة اللاعب... اعرفه! ✂️"
      gradient="from-sky-900 via-sky-700 to-sky-900"
      buttonText="يلا نبدأ! ✂️🔥"
    />
  );
}
