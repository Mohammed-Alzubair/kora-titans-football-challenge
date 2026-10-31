import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useMemo } from 'react';
import { BattleBackground } from './BattleBackground';
import { Trophy, Medal, Crown, Star, RotateCcw, Award } from 'lucide-react';
import { PlayerCard, Formation, PlayStyle } from '@/data/level99Data';
import { HelpBar } from './HelpBar';
import { useSound } from '@/hooks/useSound';

type Phase = 'intro' | 'entrance' | 'podium' | 'trophy' | 'summary' | 'final';

export interface TeamData {
  teamName: string;
  formation: Formation;
  playStyle: PlayStyle;
  players: PlayerCard[];
}

interface Level100ScreenProps {
  teamData: TeamData;
  onRestart: () => void;
}

const getTeamTitle = (styleId: string) => {
  if (styleId === 'attacking') return 'ملوك المجد ⚔️';
  if (styleId === 'defensive') return 'أسياد التكتيك 🛡️';
  return 'سادة الحسم ⚡';
};

const INTRO_TEXT = 'لقد فعلتها... فريقك الذي صنعته بيدك أصبح بطلاً.';
const FINAL_TEXT = 'هذا ليس مجرد فريق... هذه أسطورتك.';

export function Level100Screen({ teamData, onRestart }: Level100ScreenProps) {
  const { playSound } = useSound();
  const [phase, setPhase] = useState<Phase>('intro');
  const [typedText, setTypedText] = useState('');
  const [visiblePlayers, setVisiblePlayers] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [podiumVisiblePlayers, setPodiumVisiblePlayers] = useState(0);
  const [showAwards, setShowAwards] = useState(false);

  // Generate confetti items once
  const confettiItems = useMemo(() => 
    Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      emoji: i % 2 === 0 ? '⚽' : '⭐',
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
      size: 14 + Math.random() * 16,
    })), []);

  // Typewriter for intro
  useEffect(() => {
    if (phase !== 'intro') return;
    if (typedText.length < INTRO_TEXT.length) {
      const t = setTimeout(() => setTypedText(INTRO_TEXT.slice(0, typedText.length + 1)), 50);
      return () => clearTimeout(t);
    }
  }, [phase, typedText]);

  const [slammedPlayers, setSlammedPlayers] = useState<Set<number>>(new Set());

  const debrisItems = useMemo(() => 
    Array.from({ length: 6 }).map((_, i) => ({
      emoji: ['✨', '⚡', '💥', '🔥', '⭐', '✨'][i],
      dx: `${(Math.random() - 0.5) * 120}px`,
      dy: `${-20 - Math.random() * 60}px`,
    })), []);

  // Player ratings based on tier
  const playerRatings = useMemo(() =>
    teamData.players.map(p => {
      const base = p.tier === 'star' ? 8.0 : p.tier === 'good' ? 7.0 : 6.0;
      return +(base + Math.random() * 1.5).toFixed(1);
    }), [teamData.players]);

  // Awards
  const goldenBootIndex = useMemo(() => {
    let bestIdx = 0;
    let bestRating = 0;
    teamData.players.forEach((p, i) => {
      if (p.position === 'FWD' && playerRatings[i] > bestRating) {
        bestRating = playerRatings[i];
        bestIdx = i;
      }
    });
    return bestIdx;
  }, [teamData.players, playerRatings]);

  const bestPlayerIndex = useMemo(() => {
    let bestIdx = 0;
    playerRatings.forEach((r, i) => {
      if (r > playerRatings[bestIdx]) bestIdx = i;
    });
    return bestIdx;
  }, [playerRatings]);

  // Podium player reveal
  useEffect(() => {
    if (phase !== 'podium') return;
    if (podiumVisiblePlayers < teamData.players.length) {
      const t = setTimeout(() => setPodiumVisiblePlayers(v => v + 1), 800);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowAwards(true), 600);
      return () => clearTimeout(t);
    }
  }, [phase, podiumVisiblePlayers, teamData.players.length]);

  // Reveal players one by one in entrance
  useEffect(() => {
    if (phase !== 'entrance') return;
    if (visiblePlayers < teamData.players.length) {
      const t = setTimeout(() => {
        setVisiblePlayers(v => v + 1);
        // Mark as slammed after animation completes (~500ms)
        const slamT = setTimeout(() => {
          setSlammedPlayers(prev => new Set(prev).add(visiblePlayers));
        }, 500);
        return () => clearTimeout(slamT);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [phase, visiblePlayers, teamData.players.length]);

  // Fireworks + crowd sound + confetti in trophy phase
  useEffect(() => {
    if (phase === 'trophy') {
      const t = setTimeout(() => {
        setShowFireworks(true);
        setShowConfetti(true);
        playSound('crowd');
        playSound('victory');
      }, 500);
      return () => clearTimeout(t);
    }
  }, [phase, playSound]);

  const title = getTeamTitle(teamData.playStyle.id);

  if (phase === 'intro') {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center" >
        <BattleBackground />
        <div className="relative z-10 text-center p-6 max-w-sm">
          <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-bounce" />
          <p className="text-xl font-bold text-foreground leading-relaxed min-h-[3rem]">
            {typedText}
            <span className="animate-pulse">|</span>
          </p>
          {typedText.length >= INTRO_TEXT.length && (
            <button
              onClick={() => setPhase('entrance')}
              className="mt-8 px-8 py-3 rounded-xl bg-yellow-500 text-black font-bold text-lg hover:bg-yellow-400 transition-all animate-fade-in"
            >
              دخول الفريق 🏟️
            </button>
          )}
        </div>
      </div>
    );
  }

  if (phase === 'entrance') {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center" >
        <BattleBackground />
        <div className="relative z-10 text-center p-4 max-w-sm w-full">
          <h2 className="text-2xl font-bold text-yellow-400 mb-1">🏟️ {teamData.teamName}</h2>
          <p className="text-sm text-muted-foreground mb-1">التشكيلة: {teamData.formation.label} | {teamData.playStyle.emoji} {teamData.playStyle.label}</p>
          <p className="text-muted-foreground text-xs mb-4">من فريق بدأ بحلم... إلى بطل تُوِّج بالمجد</p>

          <div className="space-y-2 mb-4">
            {teamData.players.map((p, i) => (
              <div key={p.name} className="relative">
                <div
                  className={`flex items-center gap-3 bg-card/70 backdrop-blur rounded-xl px-4 py-2 border border-yellow-400/30 ${
                    i < visiblePlayers ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={i < visiblePlayers ? {
                    animation: 'player-slam 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                  } : undefined}
                >
                  <span className="text-yellow-400 font-bold text-sm w-6">{i + 1}</span>
                  <span className="text-foreground font-bold text-sm flex-1 text-right">{p.name}</span>
                  <span className="text-xs text-muted-foreground">{p.label}</span>
                </div>
                {/* Debris effect */}
                {slammedPlayers.has(i) && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    {debrisItems.map((d, di) => (
                      <span
                        key={di}
                        className="absolute text-sm"
                        style={{
                          '--dx': d.dx,
                          '--dy': d.dy,
                          animation: 'debris-fly 0.5s ease-out forwards',
                        } as React.CSSProperties}
                      >
                        {d.emoji}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {visiblePlayers >= teamData.players.length && (
            <button
              onClick={() => setPhase('podium')}
              className="px-8 py-3 rounded-xl bg-yellow-500 text-black font-bold text-lg hover:bg-yellow-400 transition-all animate-fade-in"
            >
              منصة التتويج 🏅
            </button>
          )}
        </div>
      </div>
    );
  }

  if (phase === 'podium') {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center" >
        <BattleBackground />
        <div className="relative z-10 text-center p-4 max-w-sm w-full">
          <h2 className="text-2xl font-bold text-yellow-400 mb-1">🏅 منصة التتويج</h2>
          <p className="text-muted-foreground text-sm mb-4">يصعد الأبطال لاستلام ميدالياتهم...</p>

          <div className="space-y-2 mb-4 max-h-[45vh] overflow-y-auto">
            {teamData.players.map((p, i) => (
              <div
                key={p.name}
                className={`flex items-center gap-3 bg-card/70 backdrop-blur rounded-xl px-4 py-2 border border-yellow-400/30 transition-all ${
                  i < podiumVisiblePlayers ? 'opacity-100 animate-fade-in' : 'opacity-0'
                }`}
              >
                <span className="text-yellow-400 font-bold text-sm w-6">{i + 1}</span>
                <Medal className="w-5 h-5 text-yellow-400 shrink-0" />
                <span className="text-foreground font-bold text-sm flex-1 text-right">{p.name}</span>
                <span className="text-xs text-muted-foreground">{p.label}</span>
                <span className="text-yellow-300 font-bold text-sm min-w-[36px] text-left">⭐ {playerRatings[i]}</span>
              </div>
            ))}
          </div>

          {/* Awards */}
          {showAwards && (
            <div className="space-y-2 mb-4 animate-fade-in">
              <div className="bg-yellow-500/10 border border-yellow-400/40 rounded-xl px-4 py-3 flex items-center gap-3">
                <span className="text-2xl">🥇</span>
                <div className="text-right flex-1">
                  <p className="text-xs text-yellow-400 font-bold">الحذاء الذهبي - الهداف</p>
                  <p className="text-foreground font-bold text-sm">{teamData.players[goldenBootIndex]?.name} ⚽</p>
                </div>
                <span className="text-yellow-300 font-bold">⭐ {playerRatings[goldenBootIndex]}</span>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-400/40 rounded-xl px-4 py-3 flex items-center gap-3">
                <span className="text-2xl">🌟</span>
                <div className="text-right flex-1">
                  <p className="text-xs text-yellow-400 font-bold">أفضل لاعب في الموسم</p>
                  <p className="text-foreground font-bold text-sm">{teamData.players[bestPlayerIndex]?.name} 👑</p>
                </div>
                <span className="text-yellow-300 font-bold">⭐ {playerRatings[bestPlayerIndex]}</span>
              </div>
            </div>
          )}

          {showAwards && (
            <button
              onClick={() => setPhase('trophy')}
              className="px-8 py-3 rounded-xl bg-yellow-500 text-black font-bold text-lg hover:bg-yellow-400 transition-all animate-fade-in"
            >
              رفع الكأس 🏆
            </button>
          )}
        </div>
      </div>
    );
  }

  if (phase === 'trophy') {
    const captain = teamData.players[0];
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden" >
        <BattleBackground />

        {/* Fireworks */}
        {showFireworks && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${4 + Math.random() * 6}px`,
                  height: `${4 + Math.random() * 6}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                  backgroundColor: ['#FFD700', '#FF6B35', '#00D4FF', '#FF3366', '#44FF44'][Math.floor(Math.random() * 5)],
                  animation: `firework ${1.5 + Math.random() * 2}s ease-out ${Math.random() * 1.5}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        {/* Confetti rain - balls and stars */}
        {showConfetti && (
          <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
            {confettiItems.map(item => (
              <div
                key={item.id}
                className="absolute animate-[confetti-fall_linear_infinite]"
                style={{
                  left: `${item.left}%`,
                  top: '-40px',
                  fontSize: `${item.size}px`,
                  animationDelay: `${item.delay}s`,
                  animationDuration: `${item.duration}s`,
                }}
              >
                {item.emoji}
              </div>
            ))}
          </div>
        )}

        <div className="relative z-40 text-center p-6 max-w-sm">
          <div className="relative inline-block mb-4">
            <Trophy className="w-24 h-24 text-yellow-400 mx-auto animate-bounce" style={{ animationDuration: '1.5s' }} />
            <div className="absolute -top-2 -right-2">
              <Star className="w-8 h-8 text-yellow-300 animate-pulse" />
            </div>
            <div className="absolute -top-2 -left-2">
              <Star className="w-8 h-8 text-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-yellow-400 mb-2">{teamData.teamName}</h2>
          <p className="text-lg text-foreground font-bold mb-1">🏆 البطل!</p>
          <p className="text-sm text-muted-foreground mb-4">القائد {captain?.name} يرفع الكأس!</p>

          <div className="text-yellow-400 text-xl font-bold mb-6 animate-pulse">
            🎆 {teamData.teamName}! {teamData.teamName}! 🎆
          </div>

          <button
            onClick={() => setPhase('summary')}
            className="px-8 py-3 rounded-xl bg-yellow-500 text-black font-bold text-lg hover:bg-yellow-400 transition-all"
          >
            ملخص الموسم 📊
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'summary') {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center" >
        <BattleBackground />
        <div className="relative z-10 text-center p-6 max-w-sm w-full">
          <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-yellow-400 mb-1">{teamData.teamName}</h2>
          <p className="text-lg font-bold text-foreground mb-4">{title}</p>

          <div className="bg-card/80 backdrop-blur rounded-xl p-4 border border-yellow-400/30 mb-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">التشكيلة</span>
              <span className="text-foreground font-bold">{teamData.formation.label}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">أسلوب اللعب</span>
              <span className="text-foreground font-bold">{teamData.playStyle.emoji} {teamData.playStyle.label}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">عدد اللاعبين</span>
              <span className="text-foreground font-bold">{teamData.players.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">اللقب</span>
              <span className="text-yellow-400 font-bold">{title}</span>
            </div>
          </div>

          <div className="bg-card/60 rounded-xl p-3 border border-border mb-4">
            <h4 className="text-xs text-muted-foreground mb-2">التشكيلة الذهبية</h4>
            <div className="flex flex-wrap gap-1 justify-center">
              {teamData.players.map(p => (
                <span key={p.name} className="text-xs px-2 py-1 rounded-lg bg-yellow-400/10 border border-yellow-400/30 text-foreground font-bold">
                  {p.name}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setPhase('final')}
            className="px-8 py-3 rounded-xl bg-yellow-500 text-black font-bold text-lg hover:bg-yellow-400 transition-all"
          >
            الرسالة الأخيرة ✨
          </button>
        </div>
      </div>
    );
  }

  // Final phase
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center" >
      <BattleBackground />

      {/* Subtle fireworks */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${3 + Math.random() * 4}px`,
              height: `${3 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              backgroundColor: ['#FFD700', '#FF6B35', '#00D4FF'][Math.floor(Math.random() * 3)],
              animation: `firework ${2 + Math.random() * 2}s ease-out ${Math.random() * 2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 text-center p-6 max-w-sm">
        <Crown className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-yellow-400 mb-3">{teamData.teamName}</h2>
        <p className="text-lg font-bold text-foreground mb-6 leading-relaxed">{FINAL_TEXT}</p>
        <p className="text-sm text-muted-foreground mb-4">من الاختيار إلى الانتصار... كتبت اسمك في تاريخ اللعبة.</p>

        {/* رسالة التحديث القادم */}
        <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-4 mb-6 animate-fade-in">
          <p className="text-yellow-400 font-bold text-lg mb-1">🔥 ترقبوا التحديث القادم!</p>
          <p className="text-foreground text-sm">تحديات أقوى وأمتع في الطريق... القصة لم تنتهِ بعد!</p>
        </div>

        <button
          onClick={onRestart}
          className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/80 transition-all flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          العودة للقائمة
        </button>
      </div>
    </div>
  );
}
