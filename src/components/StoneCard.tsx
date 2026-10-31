import { ReactNode } from 'react';
import { getTierTheme } from './StoneBackground';
import { cn } from '@/lib/utils';

interface StoneCardProps {
  children: ReactNode;
  levelNum?: number;
  className?: string;
}

export function StoneCard({ children, levelNum = 1, className }: StoneCardProps) {
  const tier = getTierTheme(levelNum);

  return (
    <div
      className={cn(
        "relative rounded-2xl p-5 border-2 overflow-hidden",
        className
      )}
      style={{
        background: 'linear-gradient(145deg, rgba(50,45,40,0.95) 0%, rgba(35,30,25,0.98) 50%, rgba(40,35,30,0.95) 100%)',
        borderColor: tier.border,
        boxShadow: `0 0 20px ${tier.glow}, inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Stone texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0zM20 20h20v20H20z' fill='%23fff' fill-opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Top edge highlight */}
      <div className="absolute top-0 left-4 right-4 h-px" style={{ background: `linear-gradient(90deg, transparent, ${tier.accent}, transparent)` }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
