import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

interface BellGameTransitionProps {
  onContinue: () => void;
  levelNum: number;
}

export function BellGameTransition({ onContinue, levelNum }: BellGameTransitionProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const messages = [
    'اضغط الجرس بسرعة قبل ما يختفي! 🔔',
    'سرعة البديهة هي سلاحك 🧠',
    'الجرس يظهر ثانيتين فقط... هل أنت جاهز؟ ⚡',
    'فرصة واحدة لكل سؤال! 🎯',
    'خلك سريع وذكي! 🏆',
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-secondary to-background p-6 transition-all duration-700 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
      <div className="animate-bounce mb-6">
        <Bell className="w-20 h-20 text-primary fill-primary" />
      </div>
      <h1 className="text-3xl font-black text-primary mb-2">🔔 الجرس</h1>
      <p className="text-xl text-foreground font-bold mb-2">المرحلة {levelNum}</p>
      <p className="text-muted-foreground text-center mb-8 max-w-sm">{msg}</p>
      <button
        onClick={onContinue}
        className="px-8 py-4 bg-primary text-primary-foreground font-black text-xl rounded-2xl hover:bg-primary/90 transition-colors active:scale-95"
      >
        يلا نبدأ! 🔔
      </button>
    </div>
  );
}
