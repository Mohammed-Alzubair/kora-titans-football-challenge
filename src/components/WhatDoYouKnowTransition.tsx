import { useState, useEffect } from 'react';
import { getChallengeByLevel } from '@/data/whatDoYouKnowData';

interface WhatDoYouKnowTransitionProps {
  onContinue: () => void;
  levelNum: number;
}

export function WhatDoYouKnowTransition({ onContinue, levelNum }: WhatDoYouKnowTransitionProps) {
  const [show, setShow] = useState(false);
  const challenge = getChallengeByLevel(levelNum);

  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-950 via-orange-950 to-red-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="absolute fire-particle" style={{ left: `${Math.random() * 100}%`, bottom: '0', animationDelay: `${Math.random() * 2}s`, animationDuration: `${2 + Math.random() * 2}s` }} />
        ))}
      </div>

      <div className={`relative z-10 text-center transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-6xl mb-4">🧠</div>
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
          المرحلة {levelNum}
        </h2>
        <h3 className="text-xl font-bold text-primary mb-2">ماذا تعرف؟</h3>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
          {challenge?.question || 'اذكر أكبر عدد ممكن من الإجابات!'}
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          ⏱️ {challenge?.timeLimit ?? 90} ثانية | ✍️ اكتب أو 🎤 سجل صوتك
        </p>
        <button
          onClick={onContinue}
          className="px-8 py-3 rounded-2xl bg-gradient-to-r from-primary to-destructive text-primary-foreground text-lg font-black shadow-xl hover:scale-105 transition-all"
        >
          يلا نبدأ! 🔥
        </button>
      </div>
    </div>
  );
}
