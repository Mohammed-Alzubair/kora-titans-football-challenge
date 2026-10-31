import { useState, useEffect, useCallback } from 'react';
import { Star, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/I18nProvider';

type Phase = 'loading' | 'playing' | 'success' | 'error';

interface RewardedAdModalProps {
  open: boolean;
  onClose: (rewarded: boolean) => void;
  rewardAmount?: number;
}

const AD_DURATION = 5;
const LOAD_TIME = 1500;

export function RewardedAdModal({ open, onClose, rewardAmount = 10 }: RewardedAdModalProps) {
  const { direction, t } = useI18n();
  const [phase, setPhase] = useState<Phase>('loading');
  const [countdown, setCountdown] = useState(AD_DURATION);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    if (!open) {
      setPhase('loading');
      setCountdown(AD_DURATION);
      setLoadProgress(0);
      return;
    }
    // Loading phase
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(100, (elapsed / LOAD_TIME) * 100);
      setLoadProgress(progress);
      if (elapsed >= LOAD_TIME) {
        clearInterval(interval);
        setPhase('playing');
      }
    }, 50);
    return () => clearInterval(interval);
  }, [open]);

  useEffect(() => {
    if (phase !== 'playing') return;
    setCountdown(AD_DURATION);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setPhase('success');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  const handleClose = useCallback(() => {
    onClose(phase === 'success');
  }, [phase, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md" dir={direction}>
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        
        {/* Loading */}
        {phase === 'loading' && (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
            <p className="text-white text-lg font-bold">{t('loadingAd')}</p>
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full transition-all duration-100"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Playing */}
        {phase === 'playing' && (
          <div className="flex flex-col items-center gap-6 w-full max-w-sm animate-fade-in">
            {/* Mock ad content */}
            <div className="w-full aspect-video bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl border-2 border-yellow-400/20 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.08),transparent_70%)]" />
              <span className="text-4xl">⚽</span>
              <p className="text-yellow-400/60 text-sm font-bold">{t('demoAd')}</p>
              <p className="text-white/40 text-xs">{t('adPlaceholder')}</p>
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full border-3 border-yellow-400 flex items-center justify-center relative">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(234,179,8,0.2)" strokeWidth="3" />
                  <circle cx="28" cy="28" r="24" fill="none" stroke="#EAB308" strokeWidth="3" 
                    strokeDasharray={`${2 * Math.PI * 24}`}
                    strokeDashoffset={`${2 * Math.PI * 24 * (1 - countdown / AD_DURATION)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <span className="text-yellow-400 text-xl font-bold z-10">{countdown}</span>
              </div>
              <p className="text-white/70 text-sm">{t('secondsLeft')}</p>
            </div>

            {/* Reward preview */}
            <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-400/20 rounded-xl px-4 py-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-300 text-sm font-bold">{t('earnStars')} {rewardAmount} ⭐</span>
            </div>
          </div>
        )}

        {/* Success */}
        {phase === 'success' && (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <p className="text-white text-xl font-bold">{t('congratulations')}</p>
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-300 text-lg font-bold">{t('receivedStars')} {rewardAmount} ⭐</span>
            </div>
            <button
              onClick={handleClose}
              className="mt-4 px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all active:scale-95"
            >
              {t('claimReward')} ✅
            </button>
          </div>
        )}

        {/* Error */}
        {phase === 'error' && (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-400 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
            <p className="text-white text-lg font-bold">{t('adError')}</p>
            <button
              onClick={() => onClose(false)}
              className="mt-4 px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all active:scale-95"
            >
              {t('close')}
            </button>
          </div>
        )}

        {/* Close button during playing (no reward) */}
        {phase === 'playing' && (
          <button
            onClick={() => onClose(false)}
            className={`absolute top-6 ${direction === 'rtl' ? 'right-6' : 'left-6'} w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-40`}
          >
            <X className="w-4 h-4 text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
