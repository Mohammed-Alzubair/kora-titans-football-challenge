import { useState, useEffect } from 'react';
import { useI18n } from '@/i18n/I18nProvider';

interface ChallengeWelcomeScreenProps {
  onContinue: () => void;
}

export function ChallengeWelcomeScreen({ onContinue }: ChallengeWelcomeScreenProps) {
  const { isArabic, direction } = useI18n();
  const [show, setShow] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 300);
    setTimeout(() => setShowButton(true), 2000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-red-950 via-orange-950 to-amber-950 relative overflow-hidden" dir={direction}>
      {/* Fire particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute fire-particle"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '0',
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1.5 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 text-center transition-all duration-1000 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        <div className="text-8xl mb-6 animate-bounce">🔥</div>
        
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-4 leading-tight">
          {isArabic ? 'تحدي الـ 35' : 'The 35-Stage Challenge'}
        </h1>
        
        <p className="text-2xl md:text-3xl font-bold text-primary mb-2">
          {isArabic ? 'أقوى تحدي في عالم كرة القدم!' : 'A high-pressure football challenge!'}
        </p>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-2">
          {isArabic ? '10 مراحل جديدة... ماذا تعرف؟ 🧠' : '10 new stages. What do you know? 🧠'}
        </p>

        <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400 mt-6 mb-8">
          {isArabic ? 'ردها عليّ إن استطعت 🫵🔥' : 'Take it on if you can 🫵🔥'}
        </p>

        <div className="flex justify-center gap-4 text-4xl mb-8">
          <span className="animate-pulse">⚽</span>
          <span className="animate-pulse" style={{ animationDelay: '0.3s' }}>🏆</span>
          <span className="animate-pulse" style={{ animationDelay: '0.6s' }}>👊</span>
          <span className="animate-pulse" style={{ animationDelay: '0.9s' }}>🔥</span>
        </div>

        {showButton && (
          <button
            onClick={onContinue}
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 text-white text-xl font-black shadow-2xl hover:scale-105 transition-all animate-bounce-in border-2 border-yellow-400/50"
          >
            {isArabic ? 'أنا جاهز! 💪🔥' : 'I’m ready! 💪🔥'}
          </button>
        )}
      </div>
    </div>
  );
}
