import { useEffect, useState } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import challengeArena from '@/assets/challenge-arena-hero.png';
import koraTitansLogo from '@/assets/kora-titans-logo.svg';

interface SplashScreenProps { onFinish: () => void }

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const { locale, setLocale, direction, isArabic } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 80);
    const finishTimer = setTimeout(onFinish, 2200);
    return () => { clearTimeout(showTimer); clearTimeout(finishTimer); };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-slate-950" dir={direction}>
      <img src={challengeArena} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/45 to-slate-950" />
      <div className="absolute right-5 top-5 z-10 flex rounded-full border border-white/15 bg-black/30 p-1 backdrop-blur">
        <button onClick={() => setLocale('ar')} className={`rounded-full px-3 py-2 text-xs font-bold ${locale === 'ar' ? 'bg-white text-slate-950' : 'text-white/70'}`}>العربية</button>
        <button onClick={() => setLocale('en')} className={`rounded-full px-3 py-2 text-xs font-bold ${locale === 'en' ? 'bg-white text-slate-950' : 'text-white/70'}`}>EN</button>
      </div>
      <div className={`relative z-10 text-center transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-emerald-200/85">{isArabic ? 'اختبر حدسك الكروي' : 'TEST YOUR FOOTBALL INSTINCT'}</p>
        <img src={koraTitansLogo} alt={isArabic ? 'عمالقة الكرة - Kora Titans' : 'Kora Titans - عمالقة الكرة'} className="mx-auto w-[min(84vw,560px)] drop-shadow-[0_0_30px_rgba(16,185,129,.2)]" />
        <p className="mt-4 text-sm text-slate-200 md:text-base">{isArabic ? 'العب. تعلّم. تقدّم.' : 'Play. Learn. Progress.'}</p>
      </div>
    </div>
  );
};
