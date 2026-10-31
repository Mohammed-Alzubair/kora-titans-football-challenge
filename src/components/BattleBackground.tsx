import { CircleHelp, Shield, Sparkles, Trophy, Zap } from 'lucide-react';

export function BattleBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/30 via-slate-950/5 to-emerald-950/35" />
      <div className="absolute inset-0 energy-waves opacity-60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute left-[6%] top-1/2 -translate-y-1/2 animate-pulse text-cyan-200/25">
          <Shield className="h-24 w-24 md:h-36 md:w-36" strokeWidth={1.2} />
          <CircleHelp className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 md:h-12 md:w-12" />
        </div>
        <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-amber-200/20 bg-slate-950/25 text-amber-200/50 shadow-[0_0_70px_rgba(245,158,11,0.12)] md:h-36 md:w-36">
          <Trophy className="h-12 w-12 md:h-20 md:w-20" strokeWidth={1.2} />
        </div>
        <div className="absolute right-[7%] top-1/2 -translate-y-1/2 animate-pulse text-emerald-200/25" style={{ animationDelay: '0.6s' }}>
          <Zap className="h-24 w-24 md:h-36 md:w-36" strokeWidth={1.2} />
          <Sparkles className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 md:h-12 md:w-12" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-7 opacity-30">
        {[...Array(10)].map((_, index) => (
          <span key={index} className="fire-particle" style={{ animationDelay: `${index * 0.24}s`, animationDuration: `${3 + (index % 4) * 0.4}s` }} />
        ))}
      </div>
      <div className="radial-energy absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-30" />
    </div>
  );
}
