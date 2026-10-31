import { useState } from 'react';
import { Trophy } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

interface OnboardingScreenProps {
  onFinish: () => void;
}

const stepsAr = [
  {
    emoji: '⚽',
    title: 'هل أنت مستعد لاختبار معرفتك الكروية؟',
    description: '100 مستوى من التحديات المتنوعة... شعارات، لاعبين، أندية، مدربين وأكثر!',
    button: 'موافق ✅',
  },
  {
    emoji: '🔥',
    title: 'النجوم هي سلاحك!',
    description: 'لا تضيّع نجومك ⭐ فهي مفتاحك لبناء فريقك الخاص! كل إجابة صحيحة = نجوم أكثر = قوة أكبر 💎',
    button: 'موافق ✅',
  },
  {
    emoji: '💪',
    title: 'هل أنت قد التحدي؟',
    description: 'فقط الأبطال الحقيقيون يوصلون للمستوى 100... الطريق صعب لكن المجد ينتظرك في القمة! 🏆🔥',
    button: 'أنا جاهز! ✅',
  },
];

const stepsEn = [
  { emoji: '⚽', title: 'Ready to test your football knowledge?', description: 'Take on 100 varied stages about players, clubs, coaches, tactics and more.', button: 'Continue ✅' },
  { emoji: '🔥', title: 'Stars unlock your progress', description: 'Earn stars as you play and use them to move forward through the challenge.', button: 'Continue ✅' },
  { emoji: '💪', title: 'Ready to take it on?', description: 'Only the most determined players reach stage 100. Your challenge starts now.', button: 'I’m ready! ✅' },
];

const debris = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 300,
  y: (Math.random() - 0.5) * 300,
  rotation: Math.random() * 720 - 360,
  emoji: ['✨', '💥', '⚡', '🔥', '⭐'][Math.floor(Math.random() * 5)],
}));

export function OnboardingScreen({ onFinish }: OnboardingScreenProps) {
  const { locale, setLocale, direction, isArabic } = useI18n();
  const steps = isArabic ? stepsAr : stepsEn;
  const [currentStep, setCurrentStep] = useState(0);
  const [animating, setAnimating] = useState(true);
  const [allDone, setAllDone] = useState(false);
  const [showDebris, setShowDebris] = useState(false);

  const handleNext = () => {
    setAnimating(false);
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
        setAnimating(true);
      } else {
        setAllDone(true);
        setAnimating(true);
        setTimeout(() => setShowDebris(true), 600);
      }
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center p-6"
      dir={direction}
      style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)' }}
    >
      <div className="absolute top-5 right-5 flex rounded-full border border-white/15 bg-black/30 p-1 backdrop-blur">
        <button onClick={() => setLocale('ar')} aria-pressed={locale === 'ar'} className={`rounded-full px-3 py-2 text-xs font-bold ${locale === 'ar' ? 'bg-white text-slate-950' : 'text-white/70'}`}>العربية</button>
        <button onClick={() => setLocale('en')} aria-pressed={locale === 'en'} className={`rounded-full px-3 py-2 text-xs font-bold ${locale === 'en' ? 'bg-white text-slate-950' : 'text-white/70'}`}>EN</button>
      </div>
      {/* Progress dots */}
      <div className="flex gap-3 mb-10">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              i < currentStep || allDone
                ? 'bg-green-400 scale-100'
                : i === currentStep && !allDone
                ? 'bg-yellow-400 scale-125'
                : 'bg-white/20 scale-100'
            }`}
          />
        ))}
      </div>

      {!allDone ? (
        <div
          className={`text-center max-w-sm transition-all duration-500 ${
            animating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-7xl mb-6">{steps[currentStep].emoji}</div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
            {steps[currentStep].title}
          </h2>
          <p className="text-base md:text-lg text-white/70 mb-10 leading-relaxed">
            {steps[currentStep].description}
          </p>
          <button
            onClick={handleNext}
            className="px-10 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white text-lg font-bold hover:bg-white/20 active:scale-95 transition-all backdrop-blur-sm"
          >
            {steps[currentStep].button}
          </button>
        </div>
      ) : (
        <div
          className={`text-center transition-all duration-700 ${
            animating ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          {/* Game logo with slam-in */}
          <div className="relative mb-6">
            <div
              aria-label={isArabic ? 'عمالقة الكرة' : 'Kora Titans'}
              className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-amber-200/30 bg-gradient-to-br from-emerald-400/20 to-amber-300/10 text-amber-200 shadow-[0_0_70px_rgba(16,185,129,0.2)] md:h-52 md:w-52"
              style={{
                animation: 'slam-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
              }}
            ><Trophy className="h-20 w-20 md:h-28 md:w-28" /></div>
            {showDebris && debris.map((d) => (
              <span
                key={d.id}
                className="absolute text-2xl pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                  animation: `debris-fly 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
                  ['--dx' as string]: `${d.x}px`,
                  ['--dy' as string]: `${d.y}px`,
                  ['--dr' as string]: `${d.rotation}deg`,
                }}
              >
                {d.emoji}
              </span>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            {isArabic ? 'يلا نبدأ!' : 'Let’s begin!'}
          </h2>
          <p className="text-lg text-white/60 mb-10">
            {isArabic ? 'التحدي ينتظرك... بالتوفيق! 🍀' : 'Your challenge awaits. Good luck! 🍀'}
          </p>
          <button
            onClick={onFinish}
            className="px-12 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl font-black shadow-2xl shadow-green-500/30 hover:scale-105 active:scale-95 transition-all animate-bounce border-2 border-green-400/50"
          >
            {isArabic ? 'ابدأ الآن! 🎮' : 'Start now! 🎮'}
          </button>
        </div>
      )}

      <style>{`
        @keyframes slam-in {
          0% { transform: scale(3); opacity: 0; }
          60% { transform: scale(0.9); opacity: 1; }
          80% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes debris-fly {
          0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0) rotate(var(--dr)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
