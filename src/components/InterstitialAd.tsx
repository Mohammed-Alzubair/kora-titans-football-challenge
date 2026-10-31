import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

interface InterstitialAdProps {
  open: boolean;
  onClose: () => void;
}

const AD_DURATION = 5;
const LOAD_TIME = 1200;

export function InterstitialAd({ open, onClose }: InterstitialAdProps) {
  const [phase, setPhase] = useState<'loading' | 'playing'>('loading');
  const [countdown, setCountdown] = useState(AD_DURATION);

  useEffect(() => {
    if (!open) {
      setPhase('loading');
      setCountdown(AD_DURATION);
      return;
    }
    const timer = setTimeout(() => setPhase('playing'), LOAD_TIME);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (phase !== 'playing') return;
    setCountdown(AD_DURATION);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md">
      <div className="w-full h-full flex flex-col items-center justify-center p-4 relative">
        
        {phase === 'loading' ? (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <Loader2 className="w-10 h-10 text-white/50 animate-spin" />
            <p className="text-white/50 text-sm">جاري التحميل...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 w-full max-w-sm animate-fade-in">
            {/* Mock interstitial */}
            <div className="w-full aspect-[4/5] bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.03),transparent_60%)]" />
              <span className="text-5xl">⚽</span>
              <p className="text-white/30 text-lg font-bold">إعلان تجريبي</p>
              <p className="text-white/20 text-xs">مساحة إعلانية</p>
            </div>
          </div>
        )}

        {/* Close button */}
        {phase === 'playing' && (
          <button
            onClick={countdown <= 0 ? onClose : undefined}
            disabled={countdown > 0}
            className={`absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
              countdown > 0 
                ? 'bg-white/10 cursor-not-allowed' 
                : 'bg-white/20 hover:bg-white/30 cursor-pointer active:scale-95'
            }`}
          >
            {countdown > 0 ? (
              <span className="text-white/50 text-sm font-bold">{countdown}</span>
            ) : (
              <>
                <X className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-bold">إغلاق</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
