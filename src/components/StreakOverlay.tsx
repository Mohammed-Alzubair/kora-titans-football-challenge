import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useSound } from '@/hooks/useSound';
import { useI18n } from '@/i18n/I18nProvider';

interface StreakOverlayProps {
  message: string | null;
  tier: 'hype' | 'epic' | 'lose' | null;
}

export function StreakOverlay({ message, tier }: StreakOverlayProps) {
  const [visible, setVisible] = useState(false);
  const [currentMsg, setCurrentMsg] = useState<string | null>(null);
  const [currentTier, setCurrentTier] = useState<'hype' | 'epic' | 'lose' | null>(null);
  const { playSound } = useSound();
  const { locale, direction } = useI18n();
  const lastMsgRef = useRef<string | null>(null);

  useEffect(() => {
    if (message && message !== lastMsgRef.current) {
      lastMsgRef.current = message;
      setCurrentMsg(message);
      setCurrentTier(tier);
      setVisible(true);

      // Play streak sound effect
      const soundEnabled = localStorage.getItem('game_sound') !== 'false';
      if (soundEnabled) {
        if (tier === 'lose') {
          playSound('wrong');
        } else {
          playSound(tier === 'epic' ? 'streakEpic' : 'streakHype');
        }
      }

      const timer = setTimeout(() => setVisible(false), 4500);
      return () => clearTimeout(timer);
    }
  }, [message, tier, playSound]);

  if (!currentMsg || !visible) return null;

  const isEpic = currentTier === 'epic';
  const isLose = currentTier === 'lose';
  const displayMessage = locale === 'ar'
    ? currentMsg
    : isLose
      ? 'Rough streak. Reset and take the next question.'
      : isEpic
        ? 'Incredible run! Keep the streak alive!'
        : 'Three in a row! Great focus!';

  return (
    <div className="fixed top-1/3 left-0 right-0 pointer-events-none z-50 flex justify-center" dir={direction}>
      <div
        className={cn(
          "px-6 py-4 rounded-2xl border-2 backdrop-blur-md max-w-sm text-center animate-streak-slide",
          isEpic
            ? "bg-yellow-500/30 border-yellow-400/60 shadow-[0_0_30px_rgba(234,179,8,0.4)]"
            : isLose
            ? "bg-red-500/30 border-red-400/60 shadow-[0_0_25px_rgba(239,68,68,0.4)]"
            : "bg-orange-500/30 border-orange-400/60 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
        )}
      >
        {isEpic && (
          <div className="text-2xl mb-1 animate-pulse">🔥⚡🔥</div>
        )}
        {isLose && (
          <div className="text-2xl mb-1 animate-pulse">😂💀😂</div>
        )}
        <p
          className={cn(
            "text-lg md:text-xl font-black leading-relaxed",
            isEpic ? "text-yellow-300" : isLose ? "text-red-300" : "text-orange-300"
          )}
        >
          {displayMessage}
        </p>
        {isEpic && (
          <div className="text-2xl mt-1 animate-pulse">🔥⚡🔥</div>
        )}
        {isLose && (
          <div className="text-2xl mt-1 animate-pulse">😂💀😂</div>
        )}
      </div>
    </div>
  );
}
