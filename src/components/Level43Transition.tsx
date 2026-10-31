import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level43Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={43}
      title="بداية الكلاسيكو!"
      subtitle="3 تلميحات... 5 ثواني... اعرف اللاعب! ⚔️"
      gradient="from-red-900 via-blue-900 to-red-900"
      buttonText="يلا نبدأ الكلاسيكو! ⚔️"
    />
  );
}
