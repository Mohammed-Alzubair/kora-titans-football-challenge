import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level38Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={38}
      title="اللاعب الغامض!"
      subtitle="الصورة تنكشف تدريجياً... اعرفه بسرعة! 🕵️"
      gradient="from-slate-900 via-slate-700 to-slate-900"
      buttonText="يلا نبدأ! 🕵️🔥"
    />
  );
}
