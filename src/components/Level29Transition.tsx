import { FootballTransitionLayout } from './FootballTransitionLayout';

export function Level29Transition({ onContinue }: { onContinue: () => void }) {
  return (
    <FootballTransitionLayout
      onContinue={onContinue}
      levelNum={29}
      title="اللاعب في أي نادي؟"
      subtitle="لاعبين لعبوا في أندية كثيرة... اختر الصحيح! 🌍"
      gradient="from-rose-900 via-rose-700 to-rose-900"
      buttonText="يلا نبدأ! 🏟️🔥"
    />
  );
}
