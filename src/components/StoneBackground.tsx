import sportsArena from '@/assets/sports-arena-2027.png';

type VisualTheme = 'stadium-blue' | 'pitch-green' | 'champion-gold';

function getVisualSettings() {
  try {
    const savedTheme = localStorage.getItem('game_visual_theme') as VisualTheme | null;
    const savedBrightness = Number(localStorage.getItem('game_brightness') ?? 100);
    const theme: VisualTheme = savedTheme && ['stadium-blue', 'pitch-green', 'champion-gold'].includes(savedTheme)
      ? savedTheme
      : 'stadium-blue';
    return { theme, brightness: Number.isFinite(savedBrightness) ? Math.max(30, Math.min(100, savedBrightness)) : 100 };
  } catch {
    return { theme: 'stadium-blue' as VisualTheme, brightness: 100 };
  }
}

export function getTierTheme(level: number) {
  if (level <= 20) return { name: 'lava', glow: 'rgba(239,68,68,0.3)', accent: 'rgba(249,115,22,0.4)', border: 'rgba(239,68,68,0.25)' };
  if (level <= 40) return { name: 'moss', glow: 'rgba(34,197,94,0.3)', accent: 'rgba(16,185,129,0.4)', border: 'rgba(34,197,94,0.25)' };
  if (level <= 60) return { name: 'ice', glow: 'rgba(59,130,246,0.3)', accent: 'rgba(99,102,241,0.4)', border: 'rgba(59,130,246,0.25)' };
  if (level <= 80) return { name: 'gold', glow: 'rgba(234,179,8,0.3)', accent: 'rgba(245,158,11,0.4)', border: 'rgba(234,179,8,0.25)' };
  return { name: 'royal', glow: 'rgba(168,85,247,0.3)', accent: 'rgba(139,92,246,0.4)', border: 'rgba(168,85,247,0.25)' };
}

interface StoneBackgroundProps {
  levelNum?: number;
}

export function StoneBackground({ levelNum = 1 }: StoneBackgroundProps) {
  const tier = getTierTheme(levelNum);
  const { theme, brightness } = getVisualSettings();

  const themeTint = theme === 'pitch-green'
    ? 'linear-gradient(140deg, rgba(0, 180, 125, 0.18), rgba(2, 6, 23, 0.24)), radial-gradient(ellipse at 15% 10%, rgba(16, 185, 129, 0.30), transparent 52%)'
    : theme === 'champion-gold'
      ? 'linear-gradient(140deg, rgba(180, 110, 18, 0.22), rgba(2, 6, 23, 0.26)), radial-gradient(ellipse at 85% 8%, rgba(251, 191, 36, 0.30), transparent 54%)'
      : 'linear-gradient(140deg, rgba(18, 68, 155, 0.24), rgba(2, 6, 23, 0.24)), radial-gradient(ellipse at 18% 10%, rgba(14, 165, 233, 0.26), transparent 52%)';

  return (
    <>
      <div className="fixed inset-0 z-0">
        <img
          src={sportsArena}
          alt=""
          className="w-full h-full object-cover transition-[filter] duration-300"
          style={{ filter: `brightness(${brightness}%)` }}
          loading="eager"
          fetchPriority="high"
        />
        {/* Per-tier glow and user-selected matchday colorway */}
        <div className="absolute inset-0" style={{ background: themeTint }} />
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at center top, ${tier.glow} 0%, transparent 60%)` }}
        />
        <div className="absolute inset-0 bg-slate-950/30" />
        {/* Dust particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 animate-pulse"
              style={{
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
