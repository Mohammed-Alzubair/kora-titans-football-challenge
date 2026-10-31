import { useEffect, useState } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import koraTitansMark from '@/assets/kora-titans-mark.svg';

interface WelcomeLogoScreenProps { onFinish: () => void }

const debris = Array.from({ length: 12 }, (_, id) => ({
  id,
  x: (Math.random() - 0.5) * 300,
  y: (Math.random() - 0.5) * 300,
  rotation: Math.random() * 720 - 360,
  emoji: ['✨', '💥', '⚡', '🔥', '⭐'][Math.floor(Math.random() * 5)],
}));

export function WelcomeLogoScreen({ onFinish }: WelcomeLogoScreenProps) {
  const { direction, isArabic } = useI18n();
  const [showMark, setShowMark] = useState(false);
  const [showDebris, setShowDebris] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const markTimer = setTimeout(() => setShowMark(true), 250);
    const debrisTimer = setTimeout(() => setShowDebris(true), 800);
    const buttonTimer = setTimeout(() => setShowButton(true), 1200);
    return () => { clearTimeout(markTimer); clearTimeout(debrisTimer); clearTimeout(buttonTimer); };
  }, []);

  return (
    <div className="fixed inset-0 z-[9998] flex flex-col items-center justify-center overflow-hidden p-6 text-center" dir={direction}
      style={{ background: 'radial-gradient(ellipse at 50% 35%, #12352c 0%, #0b1821 50%, #080f18 100%)' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.12),transparent_55%)]" />
      <div className="relative z-10 mb-8">
        <div className="relative flex h-48 w-48 items-center justify-center rounded-[2.5rem] border border-amber-200/30 bg-gradient-to-br from-emerald-400/15 to-amber-300/10 text-amber-200 shadow-[0_0_80px_rgba(16,185,129,0.18)] md:h-64 md:w-64"
          style={{ animation: showMark ? 'arena-mark-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards' : 'none', opacity: showMark ? 1 : 0 }}>
          <img src={koraTitansMark} alt="" className="h-40 w-40 md:h-52 md:w-52" />
        </div>
        {showDebris && debris.map((piece) => (
          <span key={piece.id} className="pointer-events-none absolute left-1/2 top-1/2 text-2xl"
            style={{ animation: 'arena-debris 0.8s ease-out forwards', ['--dx' as string]: `${piece.x}px`, ['--dy' as string]: `${piece.y}px`, ['--dr' as string]: `${piece.rotation}deg` }}>
            {piece.emoji}
          </span>
        ))}
      </div>
      <div className={`relative z-10 transition-all duration-700 ${showButton ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-emerald-200/75">{isArabic ? 'اختبر حدسك الكروي' : 'TEST YOUR FOOTBALL INSTINCT'}</p>
        <h1 className="mb-4 text-3xl font-black text-white md:text-5xl">{isArabic ? 'مرحباً بك في عمالقة الكرة' : 'Welcome to Kora Titans'}</h1>
        <p className="mb-8 text-base text-white/65 md:text-lg">{isArabic ? 'اختر لغتك واستعد لاختبار معرفتك.' : 'Choose your language and get ready to play.'}</p>
        <button onClick={onFinish} className="rounded-2xl border border-emerald-200/30 bg-gradient-to-r from-emerald-300 to-lime-200 px-12 py-4 text-lg font-black text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:scale-[1.03] active:scale-95">
          {isArabic ? 'ابدأ الآن! 🎮' : 'Start now! 🎮'}
        </button>
      </div>
      <style>{`
        @keyframes arena-mark-in { 0% { transform: scale(2.5) rotate(-8deg); } 65% { transform: scale(.92) rotate(2deg); } 100% { transform: scale(1) rotate(0); } }
        @keyframes arena-debris { 0% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0) rotate(var(--dr)); opacity: 0; } }
      `}</style>
    </div>
  );
}
