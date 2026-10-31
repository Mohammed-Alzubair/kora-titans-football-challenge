import { LevelResult } from '@/types/levelProgression';
import { useState, useMemo, useCallback } from 'react';
import {
  DEFAULT_BUDGET, FORMATIONS, PLAY_STYLES, AVAILABLE_PLAYERS, SCENARIOS,
  generateOpponent, PlayerCard, Formation, PlayStyle,
} from '@/data/level99Data';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';
import { BattleBackground } from './BattleBackground';
import { useSound } from '@/hooks/useSound';
import { StarRating } from './StarRating';
import { useStarBalance } from '@/hooks/useStarBalance';
import { Crown, Shield, Swords, Zap, Check, X, RotateCcw, User, Trophy, AlertTriangle } from 'lucide-react';

type Phase = 'setup' | 'squad' | 'analysis' | 'twist' | 'challenge' | 'result';

interface Level99ScreenProps {
  onRestart: () => void;
  onLevelComplete?: (teamData: { teamName: string; formation: any; playStyle: any; players: any[] }) => void;
}

const POS_LABELS: Record<string, string> = { GK: 'حارس', DEF: 'مدافع', MID: 'وسط', FWD: 'مهاجم' };
const TIER_COLORS: Record<string, string> = {
  star: 'border-yellow-400 bg-yellow-400/10',
  good: 'border-green-400 bg-green-400/10',
  young: 'border-blue-400 bg-blue-400/10',
};

export function Level99Screen({ onRestart, onLevelComplete }: Level99ScreenProps) {
  const { playSound } = useSound();
  const { balance: starBalance } = useStarBalance();
  const playerBudget = starBalance;
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);
  const [phase, setPhase] = useState<Phase>('setup');

  // Setup
  const [teamName, setTeamName] = useState('');
  const [formation, setFormation] = useState<Formation | null>(null);
  const [playStyle, setPlayStyle] = useState<PlayStyle | null>(null);

  // Squad
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerCard[]>([]);
  const [budget, setBudget] = useState(playerBudget);

  // Analysis
  const [opponent, setOpponent] = useState<any>(null);

  // Twist
  const [twistChoice, setTwistChoice] = useState<string | null>(null);
  const [swapDone, setSwapDone] = useState(false);

  // Challenge
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [scenarioScore, setScenarioScore] = useState(0);
  const [scenarioAnswered, setScenarioAnswered] = useState(false);
  const [totalScenarioScore, setTotalScenarioScore] = useState(0);
  const [scenariosCompleted, setScenariosCompleted] = useState(0);

  // Result
  const [finalScore, setFinalScore] = useState(0);

  const scenarios = useMemo(() => {
    const shuffled = [...SCENARIOS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, []);

  // Needed slots for formation
  const neededSlots = useMemo(() => {
    if (!formation) return {};
    const map: Record<string, number> = {};
    formation.slots.forEach(s => { map[s.position] = s.count; });
    return map;
  }, [formation]);

  const selectedCount = useCallback((pos: string) => {
    return selectedPlayers.filter(p => p.position === pos).length;
  }, [selectedPlayers]);

  const teamFull = useMemo(() => {
    if (!formation) return false;
    return formation.slots.every(s => selectedCount(s.position) >= s.count);
  }, [formation, selectedCount]);

  const teamAttack = useMemo(() => {
    return selectedPlayers.reduce((s, p) => s + p.attack, 0);
  }, [selectedPlayers]);

  const teamDefense = useMemo(() => {
    return selectedPlayers.reduce((s, p) => s + p.defense, 0);
  }, [selectedPlayers]);

  const handleSelectPlayer = (player: PlayerCard) => {
    const maxForPos = neededSlots[player.position] || 0;
    if (selectedCount(player.position) >= maxForPos) return;
    if (budget < player.cost) return;
    if (selectedPlayers.find(p => p.name === player.name)) return;
    setSelectedPlayers(prev => [...prev, player]);
    setBudget(prev => prev - player.cost);
    playSound('correct');
  };

  const handleRemovePlayer = (player: PlayerCard) => {
    setSelectedPlayers(prev => prev.filter(p => p.name !== player.name));
    setBudget(prev => prev + player.cost);
  };

  const goToAnalysis = () => {
    if (!playStyle) return;
    const opp = generateOpponent(formation!.id, playStyle, teamAttack + playStyle.attackBonus, teamDefense + playStyle.defenseBonus);
    setOpponent(opp);
    setPhase('analysis');
    playSound('wrong');
  };

  const handleTwist = (choice: string) => {
    setTwistChoice(choice);
    if (choice === 'risk') {
      setPhase('challenge');
    }
  };

  const handleSwapPlayer = (oldP: PlayerCard, newP: PlayerCard) => {
    setSelectedPlayers(prev => prev.map(p => p.name === oldP.name ? newP : p));
    setBudget(prev => prev + oldP.cost - newP.cost);
    setSwapDone(true);
  };

  const handleScenarioAnswer = (score: number) => {
    const bonusForStyle = scenarios[scenarioIdx].bestFor === playStyle?.id ? 1 : 0;
    const total = score + bonusForStyle;
    setScenarioScore(total);
    setTotalScenarioScore(prev => prev + total);
    setScenariosCompleted(prev => prev + 1);
    setScenarioAnswered(true);
    if (total >= 3) playSound('correct');
    else playSound('wrong');
  };

  const nextScenario = () => {
    if (scenarioIdx < scenarios.length - 1) {
      setScenarioIdx(prev => prev + 1);
      setScenarioAnswered(false);
      setScenarioScore(0);
    } else {
      // Calculate final
      const maxScenario = scenarios.length * 4;
      const scenarioPct = totalScenarioScore / maxScenario;
      const teamQuality = (teamAttack + teamDefense) / (selectedPlayers.length * 100);
      const final = Math.round((scenarioPct * 70 + teamQuality * 30));
      setFinalScore(final);
      setPhase('result');
    }
  };

  const stars = finalScore >= 80 ? 3 : finalScore >= 55 ? 2 : finalScore >= 30 ? 1 : 0;

  // ====================== RENDER ======================

  if (phase === 'setup') {
    return (
      <div className="min-h-screen relative flex flex-col" >
        <BattleBackground />
        <GameControls onExit={onRestart} isPaused={isPaused} onPause={() => setIsPaused(!isPaused)} />
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 gap-4">
          <Crown className="w-12 h-12 text-yellow-400" />
          <h2 className="text-2xl font-bold text-foreground">أنشئ فريقك</h2>

          {/* Team Name */}
          <div className="w-full max-w-sm">
            <label className="block text-sm text-muted-foreground mb-1">اسم الفريق</label>
            <input
              value={teamName}
              onChange={e => setTeamName(e.target.value)}
              placeholder="اكتب اسم فريقك..."
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary"
              maxLength={20}
            />
          </div>

          {/* Formation */}
          <div className="w-full max-w-sm">
            <label className="block text-sm text-muted-foreground mb-2">اختر التشكيلة</label>
            <div className="flex gap-2 justify-center">
              {FORMATIONS.map(f => (
                <button
                  key={f.id}
                  onClick={() => { setFormation(f); setSelectedPlayers([]); setBudget(playerBudget); }}
                  className={`px-4 py-3 rounded-xl font-bold text-lg transition-all border-2 ${
                    formation?.id === f.id
                      ? 'border-primary bg-primary/20 text-primary'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Play Style */}
          <div className="w-full max-w-sm">
            <label className="block text-sm text-muted-foreground mb-2">أسلوب اللعب</label>
            <div className="flex gap-2 justify-center">
              {PLAY_STYLES.map(s => (
                <button
                  key={s.id}
                  onClick={() => setPlayStyle(s)}
                  className={`px-3 py-3 rounded-xl font-bold text-sm transition-all border-2 flex flex-col items-center gap-1 ${
                    playStyle?.id === s.id
                      ? 'border-primary bg-primary/20 text-primary'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <span className="text-xl">{s.emoji}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => teamName.trim() && formation && playStyle && setPhase('squad')}
            disabled={!teamName.trim() || !formation || !playStyle}
            className="mt-4 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-lg disabled:opacity-40 transition-all hover:bg-primary/80"
          >
            التالي: اختر اللاعبين ⚽
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'squad') {
    const positions: ('GK' | 'DEF' | 'MID' | 'FWD')[] = ['GK', 'DEF', 'MID', 'FWD'];
    return (
      <div className="min-h-screen relative flex flex-col" >
        <BattleBackground />
        <GameControls onExit={onRestart} isPaused={isPaused} onPause={() => setIsPaused(!isPaused)} />
        <div className="relative z-10 flex-1 flex flex-col p-3 gap-2 overflow-auto">
          {/* Budget bar */}
          <div className="flex items-center justify-between bg-card/80 backdrop-blur rounded-xl px-4 py-2 border border-border">
            <span className="text-sm font-bold text-foreground">⭐ نجومك: <span className={budget < 5 ? 'text-red-400' : 'text-green-400'}>{budget}</span> / {playerBudget}</span>
            <span className="text-sm text-muted-foreground">{formation?.label} | {playStyle?.emoji} {playStyle?.label}</span>
          </div>

          {/* Selected Team */}
          <div className="bg-card/60 backdrop-blur rounded-xl p-3 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-2">🏟️ {teamName}</h3>
            <div className="flex flex-wrap gap-1">
              {selectedPlayers.map(p => (
                <button
                  key={p.name}
                  onClick={() => handleRemovePlayer(p)}
                  className={`text-xs px-2 py-1 rounded-lg border ${TIER_COLORS[p.tier]} text-foreground flex items-center gap-1`}
                >
                  {p.name} <X className="w-3 h-3" />
                </button>
              ))}
              {formation?.slots.map(s => {
                const remaining = s.count - selectedCount(s.position);
                return Array.from({ length: remaining }).map((_, i) => (
                  <span key={`${s.position}-${i}`} className="text-xs px-2 py-1 rounded-lg border border-dashed border-muted-foreground/30 text-muted-foreground">
                    {POS_LABELS[s.position]}؟
                  </span>
                ));
              })}
            </div>
          </div>

          {/* Available Players by Position */}
          {positions.map(pos => {
            const maxSlots = neededSlots[pos] || 0;
            const filled = selectedCount(pos);
            if (maxSlots === 0) return null;
            const available = AVAILABLE_PLAYERS.filter(p => p.position === pos && !selectedPlayers.find(sp => sp.name === p.name));
            return (
              <div key={pos} className="bg-card/40 rounded-xl p-2 border border-border">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-foreground">{POS_LABELS[pos]} ({filled}/{maxSlots})</span>
                  {filled >= maxSlots && <Check className="w-4 h-4 text-green-400" />}
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {available.map(p => {
                    const canBuy = budget >= p.cost && filled < maxSlots;
                    return (
                      <button
                        key={p.name}
                        onClick={() => canBuy && handleSelectPlayer(p)}
                        disabled={!canBuy}
                        className={`text-xs p-2 rounded-lg border transition-all text-right ${
                          canBuy
                            ? `${TIER_COLORS[p.tier]} hover:scale-[1.02] cursor-pointer`
                            : 'border-border bg-muted/20 opacity-40 cursor-not-allowed'
                        }`}
                      >
                        <div className="font-bold text-foreground">{p.name}</div>
                        <div className="text-muted-foreground flex justify-between">
                          <span>{p.label}</span>
                          <span className="font-bold">{p.cost}⭐</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <button
            onClick={goToAnalysis}
            disabled={!teamFull}
            className="mt-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-lg disabled:opacity-40 transition-all hover:bg-primary/80 sticky bottom-2"
          >
            {teamFull ? 'تأكيد الفريق ✅' : 'أكمل التشكيلة أولاً'}
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'analysis') {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center" >
        <BattleBackground />
        <GameControls onExit={onRestart} isPaused={isPaused} onPause={() => setIsPaused(!isPaused)} />
        <div className="relative z-10 text-center p-6 max-w-sm">
          <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-foreground mb-2">⚠️ تم تحليل فريقك!</h2>
          <p className="text-muted-foreground mb-4">النظام الذكي حلل استراتيجيتك وبنى خصماً مخصصاً لمواجهتك</p>

          <div className="bg-card/80 backdrop-blur rounded-xl p-4 border border-border mb-4 space-y-2">
            <h3 className="font-bold text-red-400 text-lg">{opponent?.name}</h3>
            <p className="text-sm text-muted-foreground">التشكيلة: <span className="text-foreground font-bold">{opponent?.formation}</span></p>
            <p className="text-sm text-muted-foreground">الأسلوب: <span className="text-foreground font-bold">{opponent?.style}</span></p>
            <div className="flex gap-4 justify-center mt-2">
              <div className="text-center">
                <Swords className="w-5 h-5 text-red-400 mx-auto" />
                <span className="text-xs text-muted-foreground">هجوم</span>
                <div className="font-bold text-foreground">{opponent?.attack}</div>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 text-blue-400 mx-auto" />
                <span className="text-xs text-muted-foreground">دفاع</span>
                <div className="font-bold text-foreground">{opponent?.defense}</div>
              </div>
            </div>
          </div>

          <div className="bg-card/60 rounded-xl p-3 border border-border mb-4">
            <h4 className="text-sm font-bold text-foreground mb-1">فريقك: {teamName}</h4>
            <div className="flex gap-4 justify-center">
              <div className="text-center">
                <Swords className="w-5 h-5 text-green-400 mx-auto" />
                <span className="text-xs text-muted-foreground">هجوم</span>
                <div className="font-bold text-foreground">{teamAttack + (playStyle?.attackBonus || 0)}</div>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 text-green-400 mx-auto" />
                <span className="text-xs text-muted-foreground">دفاع</span>
                <div className="font-bold text-foreground">{teamDefense + (playStyle?.defenseBonus || 0)}</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setPhase('twist')}
            className="px-8 py-3 rounded-xl bg-yellow-500 text-black font-bold text-lg hover:bg-yellow-400 transition-all"
          >
            ماذا الآن؟ 😈
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'twist') {
    const swappablePlayers = AVAILABLE_PLAYERS.filter(p => !selectedPlayers.find(sp => sp.name === p.name));
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center" >
        <BattleBackground />
        <GameControls onExit={onRestart} isPaused={isPaused} onPause={() => setIsPaused(!isPaused)} />
        <div className="relative z-10 text-center p-4 max-w-sm w-full">
          <h2 className="text-2xl font-bold text-foreground mb-2">😈 المفاجأة!</h2>
          <p className="text-muted-foreground mb-4 text-sm">لديك فرصة أخيرة قبل المواجهة</p>

          {!twistChoice && (
            <div className="space-y-3">
              <button
                onClick={() => handleTwist('swap')}
                className="w-full px-4 py-3 rounded-xl bg-card border-2 border-blue-400/50 text-foreground font-bold hover:bg-blue-400/10 transition-all"
              >
                🔄 تغيير لاعب واحد
              </button>
              <button
                onClick={() => handleTwist('risk')}
                className="w-full px-4 py-3 rounded-xl bg-card border-2 border-red-400/50 text-foreground font-bold hover:bg-red-400/10 transition-all"
              >
                🔥 المخاطرة بدون تغيير
              </button>
            </div>
          )}

          {twistChoice === 'swap' && !swapDone && (
            <div className="space-y-2">
              <p className="text-sm text-yellow-400 font-bold mb-2">اختر لاعب للإخراج:</p>
              <div className="grid grid-cols-2 gap-1 max-h-40 overflow-auto">
                {selectedPlayers.map(p => (
                  <button
                    key={p.name}
                    onClick={() => {
                      const replacements = swappablePlayers.filter(sp => sp.position === p.position && budget + p.cost >= sp.cost);
                      if (replacements.length > 0) {
                        const newP = replacements[Math.floor(Math.random() * replacements.length)];
                        handleSwapPlayer(p, newP);
                      }
                    }}
                    className={`text-xs p-2 rounded-lg border ${TIER_COLORS[p.tier]} text-foreground`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {swapDone && (
            <div className="space-y-3">
              <p className="text-green-400 font-bold">✅ تم التغيير!</p>
              <button
                onClick={() => setPhase('challenge')}
                className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/80 transition-all"
              >
                ابدأ التحدي! 🏁
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (phase === 'challenge') {
    const scenario = scenarios[scenarioIdx];
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center" >
        <BattleBackground />
        <GameControls onExit={onRestart} isPaused={isPaused} onPause={() => setIsPaused(!isPaused)} />
        <div className="relative z-10 p-4 max-w-sm w-full">
          <div className="text-center mb-4">
            <span className="text-xs text-muted-foreground">سيناريو {scenarioIdx + 1} / {scenarios.length}</span>
            <h2 className="text-xl font-bold text-foreground mt-1">🧠 التحدي التكتيكي</h2>
          </div>

          <div className="bg-card/80 backdrop-blur rounded-xl p-4 border border-border mb-4">
            <p className="text-foreground font-bold text-sm leading-relaxed">{scenario.situation}</p>
          </div>

          <div className="space-y-2">
            {scenario.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => !scenarioAnswered && handleScenarioAnswer(opt.score)}
                disabled={scenarioAnswered}
                className={`w-full text-right px-4 py-3 rounded-xl border-2 transition-all text-sm font-bold ${
                  scenarioAnswered
                    ? opt.score >= 3
                      ? 'border-green-400 bg-green-400/10 text-green-400'
                      : opt.score === 0
                        ? 'border-red-400/30 bg-red-400/5 text-red-300'
                        : 'border-border bg-card/50 text-muted-foreground'
                    : 'border-border bg-card text-foreground hover:border-primary/50'
                }`}
              >
                {opt.text}
              </button>
            ))}
          </div>

          {scenarioAnswered && (
            <div className="mt-4 text-center">
              <p className={`font-bold ${scenarioScore >= 3 ? 'text-green-400' : scenarioScore >= 2 ? 'text-yellow-400' : 'text-red-400'}`}>
                {scenarioScore >= 3 ? '🎯 قرار ممتاز!' : scenarioScore >= 2 ? '👍 جيد!' : '😬 قرار ضعيف'}
              </p>
              <button
                onClick={nextScenario}
                className="mt-3 px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all"
              >
                {scenarioIdx < scenarios.length - 1 ? 'السيناريو التالي ➡️' : 'شوف النتيجة 🏆'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Result phase
  const won = finalScore >= 55;
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center" >
      <BattleBackground />
      <div className="relative z-10 text-center p-6 max-w-sm">
        <div className="mb-4">
          {won ? (
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto animate-bounce" />
          ) : (
            <X className="w-20 h-20 text-red-400 mx-auto" />
          )}
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {won ? '🏆 مبروك! فزت!' : '😔 خسرت!'}
        </h2>
        <p className="text-muted-foreground mb-4">
          {won ? `فريقك "${teamName}" تغلب على ${opponent?.name}!` : `فريقك "${teamName}" لم يستطع التغلب على ${opponent?.name}`}
        </p>

        <div className="bg-card/80 rounded-xl p-4 border border-border mb-4">
          <div className="text-2xl font-bold text-foreground mb-2">{finalScore}%</div>
          <StarRating stars={stars} />
          <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-muted-foreground">
            <div>التشكيلة: <span className="text-foreground font-bold">{formation?.label}</span></div>
            <div>الأسلوب: <span className="text-foreground font-bold">{playStyle?.label}</span></div>
            <div>القرارات: <span className="text-foreground font-bold">{totalScenarioScore}/{scenarios.length * 4}</span></div>
            <div>النجوم: <span className="text-foreground font-bold">{stars}/3</span></div>
          </div>
        </div>

        {won && onLevelComplete && (
          <button
            onClick={() => onLevelComplete({ teamName, formation: formation!, playStyle: playStyle!, players: selectedPlayers })}
            className="px-8 py-3 rounded-xl bg-yellow-500 text-black font-bold text-lg hover:bg-yellow-400 transition-all flex items-center gap-2 mx-auto mb-3"
          >
            <Trophy className="w-5 h-5" />
            التتويج 🏆
          </button>
        )}
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
