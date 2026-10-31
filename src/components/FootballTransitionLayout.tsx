import { useEffect, useState } from 'react';
import { ArrowUpRight, Zap } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { getLevelDescription, getLevelTitle } from '@/i18n/levelCopy';
import arenaImage from '@/assets/sports-arena-2027.png';

interface FootballTransitionLayoutProps {
  onContinue: () => void;
  levelNum: number;
  title: string;
  subtitle: string;
  buttonText?: string;
  gradient?: string;
}

export function FootballTransitionLayout({ onContinue, levelNum, title, subtitle }: FootballTransitionLayoutProps) {
  const { locale, direction, t } = useI18n();
  const [earnedStars, setEarnedStars] = useState(0);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const saved = Number(localStorage.getItem('last_earned_stars') ?? 0);
    setEarnedStars(Number.isFinite(saved) ? Math.max(0, Math.min(5, saved)) : 0);
  }, []);

  const openGate = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onContinue, 520);
  };

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-10 text-center text-white"
      dir={direction}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(2, 8, 20, .54), rgba(2, 8, 20, .93)), url(${arenaImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="stage-gate-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -left-24 top-[16%] h-72 w-72 rounded-full bg-cyan-400/15 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-[12%] h-80 w-80 rounded-full bg-amber-400/15 blur-[110px]" />

      <div className={`relative z-10 flex w-full max-w-xl flex-col items-center transition duration-500 ${opening ? 'scale-[1.04] opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-100/20 bg-slate-950/45 px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-cyan-100 shadow-lg backdrop-blur-md">
          <Zap className="h-4 w-4 text-amber-300" />
          <span>{t('brand')}</span>
        </div>

        {earnedStars > 0 && (
          <div className="mb-6 rounded-2xl border border-amber-200/20 bg-black/35 px-5 py-3 backdrop-blur-md">
            <div className="flex justify-center gap-1 text-2xl" aria-label={`${earnedStars} ${earnedStars === 1 ? t('star') : t('stars')}`}>
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index} className={index < earnedStars ? 'text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,.6)]' : 'text-white/20'}>★</span>
              ))}
            </div>
            <p className="mt-1 text-sm font-bold text-amber-100">{t('earnedStars')} {earnedStars} {earnedStars === 1 ? t('star') : t('stars')}</p>
          </div>
        )}

        <p className="mb-2 text-sm font-bold uppercase tracking-[.2em] text-white/55">{t('level')} {levelNum}</p>
        <h1 className="text-3xl font-black leading-tight text-white drop-shadow-lg md:text-5xl">{getLevelTitle(levelNum, title, locale)}</h1>
        <p className="mt-4 max-w-md text-base leading-7 text-slate-200/80 md:text-lg">{getLevelDescription(levelNum, subtitle, locale)}</p>

        <div className="relative my-9 flex h-36 w-36 items-center justify-center md:h-44 md:w-44">
          <div className="stage-gate-ring absolute h-36 w-36 rounded-full border border-cyan-200/45 md:h-44 md:w-44" />
          <div className="stage-gate-ring stage-gate-ring-delay absolute h-28 w-28 rounded-full border border-amber-200/35 md:h-36 md:w-36" />
          <button type="button" onClick={openGate} aria-label={t('tapBall')} className="stage-gate-core relative flex h-20 w-20 items-center justify-center rounded-3xl border border-white/30 bg-gradient-to-br from-cyan-300 via-emerald-300 to-amber-200 text-slate-950 shadow-[0_0_50px_rgba(34,211,238,.45)] transition hover:scale-110 active:scale-95 md:h-24 md:w-24">
            {opening ? <ArrowUpRight className="h-10 w-10" /> : <Zap className="h-10 w-10 fill-current" />}
          </button>
        </div>

        <button type="button" onClick={openGate} disabled={opening} className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white/85 backdrop-blur transition hover:border-cyan-100/50 hover:bg-white/15 disabled:cursor-wait">
          {t('tapBall')} <span className="ms-2 text-cyan-200">{direction === 'rtl' ? '←' : '→'}</span>
        </button>
      </div>

      <style>{`
        .stage-gate-grid { background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px); background-size: 34px 34px; mask-image: linear-gradient(transparent, black 22%, black 78%, transparent); }
        .stage-gate-ring { animation: stage-gate-pulse 2.2s ease-out infinite; }
        .stage-gate-ring-delay { animation-delay: 1.05s; }
        .stage-gate-core { animation: stage-gate-float 2.4s ease-in-out infinite; }
        @keyframes stage-gate-pulse { 0% { transform: scale(.75); opacity: .8; } 100% { transform: scale(1.3); opacity: 0; } }
        @keyframes stage-gate-float { 0%, 100% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-7px) rotate(4deg); } }
      `}</style>
    </main>
  );
}
