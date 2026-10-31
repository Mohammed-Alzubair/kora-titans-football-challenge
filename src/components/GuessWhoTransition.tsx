import { useState, useEffect } from 'react';

interface Props { onContinue: () => void; levelNum: number; title: string; subtitle: string; emoji: string; gradient: string; }

export function GuessWhoTransition({ onContinue, levelNum, title, subtitle, emoji, gradient }: Props) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <div className={`absolute inset-0 ${gradient}`} />
      <div className={`relative z-10 text-center transition-all duration-700 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
        <div className="text-8xl mb-6">{emoji}</div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">المستوى {levelNum}</h1>
        <h2 className="text-2xl text-purple-300 font-bold mb-6">{title}</h2>
        <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">{subtitle}</p>
        <button onClick={onContinue} className="btn-start text-xl px-8 py-4 animate-pulse">يلا نبدأ! 🎯</button>
      </div>
    </div>
  );
}
