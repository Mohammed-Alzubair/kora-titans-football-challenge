import { ReactNode } from 'react';
import { getTierTheme } from './StoneBackground';
import { cn } from '@/lib/utils';
import { useSound } from '@/hooks/useSound';

interface StoneButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  state?: 'idle' | 'correct' | 'wrong' | 'selected';
  levelNum?: number;
  className?: string;
}

export function StoneButton({ children, onClick, disabled, state = 'idle', levelNum = 1, className }: StoneButtonProps) {
  const tier = getTierTheme(levelNum);
  const { playSound } = useSound();

  const handleClick = () => {
    if (!disabled && state === 'idle') playSound('click');
    onClick?.();
  };

  const stateStyles = {
    idle: {
      background: 'linear-gradient(145deg, rgba(60,55,48,0.9) 0%, rgba(45,40,35,0.95) 100%)',
      borderColor: 'rgba(255,255,255,0.08)',
      boxShadow: `0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`,
    },
    correct: {
      background: 'linear-gradient(145deg, rgba(22,101,52,0.8) 0%, rgba(20,83,45,0.9) 100%)',
      borderColor: 'rgba(34,197,94,0.6)',
      boxShadow: '0 0 20px rgba(34,197,94,0.4), 0 4px 12px rgba(0,0,0,0.3)',
    },
    wrong: {
      background: 'linear-gradient(145deg, rgba(127,29,29,0.8) 0%, rgba(107,25,25,0.9) 100%)',
      borderColor: 'rgba(239,68,68,0.6)',
      boxShadow: '0 0 20px rgba(239,68,68,0.3), 0 4px 12px rgba(0,0,0,0.3)',
    },
    selected: {
      background: 'linear-gradient(145deg, rgba(60,55,48,0.9) 0%, rgba(45,40,35,0.95) 100%)',
      borderColor: tier.border,
      boxShadow: `0 0 15px ${tier.glow}`,
    },
  };

  const s = stateStyles[state];

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "relative rounded-xl p-4 border-2 font-bold text-white transition-all duration-200 will-change-transform text-right",
        state === 'idle' && !disabled && "hover:scale-[1.02] active:scale-95",
        disabled && state === 'idle' && "opacity-50",
        className
      )}
      style={s}
    >
      {/* Top highlight */}
      <div className="absolute top-0 left-3 right-3 h-px bg-white/5" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
