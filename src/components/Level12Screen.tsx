import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { playerCareers, PlayerCareer, getClubLogo, getClubName, generateLevel12Question } from '@/data/playerCareers';
import { useSound } from '@/hooks/useSound';
import { Timer, Crown, RotateCcw, Trophy, XCircle, HelpCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';

const QUESTIONS_COUNT = 10;
const QUESTION_TIME = 20;
const TRANSITION_DELAY = 1500;

interface GameState {
  currentQuestion: number;
  score: number;
  currentPlayer: PlayerCareer | null;
  options: PlayerCareer[];
  timeLeft: number;
  selectedId: string | null;
  isCorrect: boolean | null;
  gameOver: boolean;
  usedPlayerIds: string[];
  celebrationMessage: string | null;
  totalCorrect: number;
}

export function Level12Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);

  const [state, setState] = useState<GameState>(() => {
    const q = generateLevel12Question([]);
    return {
      currentQuestion: 0,
      score: 0,
      currentPlayer: q?.player || null,
      options: q?.options || [],
      timeLeft: QUESTION_TIME,
      selectedId: null,
      isCorrect: null,
      gameOver: false,
      usedPlayerIds: q ? [q.player.id] : [],
      celebrationMessage: null,
      totalCorrect: 0 };
  });

  // Auto-solve next question (special help)
  useEffect(() => {
    if (autoSolveNext && !state.selectedId) {
      setAutoSolveNext(false);
      setTimeout(() => { if (state.currentPlayer) handleSelect(state.currentPlayer as any); }, 500);
    }
  }, [autoSolveNext, state.currentQuestion, state.selectedId]);

  const nextQuestion = useCallback(() => {
    setHiddenIndices([]);
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (state.currentQuestion >= QUESTIONS_COUNT - 1) {
      setState(prev => ({ ...prev, gameOver: true }));
      playSound('gameOver');
      return;
    }
    const q = generateLevel12Question(state.usedPlayerIds);
    if (!q) return;
    setState(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      currentPlayer: q.player,
      options: q.options,
      timeLeft: QUESTION_TIME,
      selectedId: null,
      isCorrect: null,
      celebrationMessage: null,
      usedPlayerIds: [...prev.usedPlayerIds, q.player.id] }));
  }, [state.currentQuestion, state.usedPlayerIds, playSound]);

  const handleSelect = useCallback((player: PlayerCareer) => {
    if (state.selectedId) return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }

    const isCorrect = player.id === state.currentPlayer?.id;
    const messages = isCorrect
      ? ['ابهرتني! 🤩', 'يا سلام عليك! 🔥', 'موسوعة كرة قدم! 📚', 'عبقري! 🧠', 'ما شاء الله! 💪']
      : ['غلط! ركز أكثر 😅', 'لا مو هذا! 😂', 'حاول مرة ثانية 🙃', 'يا حرام خطأ! 😭'];
    const msg = messages[Math.floor(Math.random() * messages.length)];

    setState(prev => ({
      ...prev,
      selectedId: player.id,
      isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
      totalCorrect: isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect,
      celebrationMessage: msg }));
    playSound(isCorrect ? 'correct' : 'wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state.selectedId, state.currentPlayer, nextQuestion, playSound]);

  const handleTimeout = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setState(prev => ({
      ...prev,
      selectedId: 'timeout',
      isCorrect: false,
      celebrationMessage: '⏰ انتهى الوقت!' }));
    playSound('wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [playSound, nextQuestion]);

  useEffect(() => {
    if (state.selectedId || state.gameOver || isPaused) return;
    timerRef.current = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 0) return prev;
        return { ...prev, timeLeft: Math.max(0, prev.timeLeft - 1) };
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state.selectedId, state.gameOver, state.currentQuestion, isPaused]);

  useEffect(() => {
    if (!state.selectedId && state.timeLeft <= 0) handleTimeout();
  }, [state.timeLeft, state.selectedId, handleTimeout]);

  const handleHelpEliminate = () => {
    const correctVal = state.currentPlayer;
    const wrongIdxs = (state.options || []).map((o: any, i: number) => ({ o, i })).filter((x: any) => x.o?.id !== correctVal?.id).map((x: any) => x.i);
    const toHide = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenIndices(toHide);
    setHelp1Used(true);
  };

  const handleHelpSolve = () => {
    if (state.currentPlayer) handleSelect(state.currentPlayer as any);
    setSolveUsed(true);
  };

  const handleHelpSpecial = () => {
    if (state.currentPlayer) handleSelect(state.currentPlayer as any);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };


  if (state.gameOver) {
    const getFinalMessage = () => {
      if (state.totalCorrect >= 8) return { title: 'ابهرتني فعلاً! 🤩', subtitle: 'تعرف مسيرة كل لاعب!', emoji: '🏆⚽' };
      if (state.totalCorrect >= 5) return { title: 'مو بطال أبداً! 👏', subtitle: 'معلوماتك عن اللاعبين جيدة', emoji: '📋' };
      return { title: 'محتاج تتابع أكثر! 😂', subtitle: 'مسيرة اللاعبين صعبة عليك!', emoji: '🤓' };
    };
    const msg = getFinalMessage();
    const isPerfect = state.totalCorrect >= QUESTIONS_COUNT * 0.8;

    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-700 to-purple-800" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-black/60 backdrop-blur-md rounded-3xl border border-primary/30 max-w-md mx-4 animate-bounce-in">
            <div className="text-center p-8">
              {isPerfect ? <Trophy className="w-24 h-24 mx-auto text-primary mb-4 animate-pulse" /> : state.totalCorrect >= 5 ? <HelpCircle className="w-24 h-24 mx-auto text-yellow-400 mb-4" /> : <XCircle className="w-24 h-24 mx-auto text-destructive mb-4" />}
              <div className="text-5xl mb-4">{msg.emoji}</div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">{msg.title}</h2>
              <p className="text-lg text-muted-foreground mb-4">{msg.subtitle}</p>
              <p className="text-2xl text-foreground mb-8">
                نتيجتك: <span className="text-primary font-bold">{state.totalCorrect}</span> من {QUESTIONS_COUNT}
              </p>
              <div className="flex flex-col gap-3">
                {state.totalCorrect >= Math.ceil(QUESTIONS_COUNT * 0.5) && onLevelComplete && (
                  <button onClick={() => onLevelComplete?.({ score: state.totalCorrect, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start flex items-center gap-2 mx-auto bg-green-600 hover:bg-green-700">
                    المستوى التالي ➡️
                  </button>
                )}
                <button onClick={onRestart} className="btn-start flex items-center gap-2 mx-auto">
                  <RotateCcw className="w-6 h-6" /> العب من البداية
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!state.currentPlayer) return null;

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col relative overflow-hidden">
      <GameControls onExit={onRestart} onPause={() => setIsPaused(true)} onResume={() => setIsPaused(false)} isPaused={isPaused} />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-700 to-purple-800" />

      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge bg-black/50">🏟️ {state.score}</div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all", state.timeLeft <= 3 ? "bg-destructive/20 text-destructive animate-pulse" : "bg-purple-700/50 text-purple-300")}>
          <Timer className="w-5 h-5" /> {state.timeLeft}
        </div>
        <div className="bg-yellow-400/20 px-3 py-1 rounded-full text-yellow-400 font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" /> المستوى 12
        </div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full">
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-2xl">
          {/* Career clubs display */}
          <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 mb-6 text-center">
            <p className="text-lg text-muted-foreground mb-1">
              {state.currentPlayer.retired ? '⚠️ اللاعب معتزل' : '⚽ لاعب حالي'}
            </p>
            <p className="text-xl md:text-2xl font-black text-white mb-4">
              من هو اللاعب؟ 🤔
            </p>
            
            {/* Club logos in career order */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {state.currentPlayer.careerClubIds.map((clubId, index) => (
                <div key={clubId + index} className="flex items-center gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <div className="bg-white/10 rounded-xl p-2 border border-white/20">
                      <img
                        src={getClubLogo(clubId)}
                        alt={getClubName(clubId)}
                        className="w-12 h-12 md:w-16 md:h-16 object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                      />
                    </div>
                    <span className="text-xs text-white/60">{getClubName(clubId)}</span>
                  </div>
                  {index < state.currentPlayer!.careerClubIds.length - 1 && (
                    <ArrowLeft className="w-5 h-5 text-yellow-400 mx-1" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Player name options */}
          <div className="grid grid-cols-2 gap-3">
            {state.options.map((player, _hIdx) => {
              if (hiddenIndices.includes(_hIdx)) return <div key={_hIdx} className="p-3 rounded-2xl border-2 border-white/10 bg-black/20 opacity-20 min-h-[52px]" />;
              let cardClass = "bg-black/40 backdrop-blur-sm border-white/20 hover:border-purple-400/50";
              if (state.selectedId) {
                if (player.id === state.currentPlayer?.id) {
                  cardClass = "bg-green-500/30 border-green-400";
                } else if (player.id === state.selectedId) {
                  cardClass = "bg-destructive/20 border-destructive";
                }
              }

              return (
                <button
                  key={player.id}
                  onClick={() => handleSelect(player)}
                  disabled={!!state.selectedId}
                  className={cn(
                    "rounded-2xl border-2 p-4 transition-all duration-200 text-center",
                    cardClass,
                    !state.selectedId && "hover:scale-105 active:scale-95"
                  )}
                >
                  <span className="text-lg md:text-xl font-bold text-white">{player.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      
          <HelpBar
            questionType="choice"
            onHelp1={handleHelpEliminate}
            onSolve={handleHelpSolve}
            onSpecialSolve={handleHelpSpecial}
            onSkipLevel={onLevelComplete || onRestart}
            help1Used={help1Used}
            solveUsed={solveUsed}
            specialUsed={specialUsed}
            disabled={false}
          />

      {state.celebrationMessage && (
        <div className="fixed top-24 left-0 right-0 pointer-events-none flex justify-center z-20">
          <div className={cn("p-4 px-8 rounded-2xl border-2 backdrop-blur-sm animate-bounce-in text-center", state.isCorrect ? "bg-green-500/30 border-green-400/50" : "bg-destructive/30 border-destructive/50")}>
            <p className={cn("text-xl md:text-2xl font-black", state.isCorrect ? "text-green-400" : "text-red-400")}>
              {state.celebrationMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
