import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { generateLevel9Question, PlayerClubInfo } from '@/data/playerClubs';
import { useSound } from '@/hooks/useSound';
import { Timer, Crown, RotateCcw, Trophy, XCircle, HelpCircle, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';

const QUESTIONS_COUNT = 10;
const QUESTION_TIME = 20;
const TRANSITION_DELAY = 1500;

interface Question {
  club: string;
  players: PlayerClubInfo[];
  wrongPlayer: PlayerClubInfo;
}

interface GameState {
  currentQuestion: number;
  score: number;
  answerPhase: 'question' | 'result';
  selectedId: string | null;
  isCorrect: boolean | null;
  gameOver: boolean;
  celebrationMessage: string | null;
  timeLeft: number;
  totalCorrect: number;
}

export function Level9Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);

  const [questions] = useState<Question[]>(() => {
    const qs: Question[] = [];
    const usedClubs: string[] = [];
    for (let i = 0; i < QUESTIONS_COUNT; i++) {
      const q = generateLevel9Question(usedClubs);
      if (q) {
        qs.push(q);
        usedClubs.push(q.club);
      }
    }
    return qs;
  });

  const [state, setState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    answerPhase: 'question',
    selectedId: null,
    isCorrect: null,
    gameOver: false,
    celebrationMessage: null,
    timeLeft: QUESTION_TIME,
    totalCorrect: 0 });

  // Auto-solve next question (special help)
  useEffect(() => {
    if (autoSolveNext && state.answerPhase === 'question') {
      setAutoSolveNext(false);
      setTimeout(() => { if (currentQ?.wrongPlayer) handleSelect(currentQ?.wrongPlayer as any); }, 500);
    }
  }, [autoSolveNext, state.currentQuestion, state.answerPhase]);

  const currentQ = questions[state.currentQuestion];

  const nextQuestion = useCallback(() => {
    setHiddenIndices([]);
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (state.currentQuestion >= QUESTIONS_COUNT - 1) {
      setState(prev => ({ ...prev, gameOver: true }));
      playSound('gameOver');
      return;
    }
    setState(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      answerPhase: 'question',
      selectedId: null,
      isCorrect: null,
      celebrationMessage: null,
      timeLeft: QUESTION_TIME }));
  }, [state.currentQuestion, playSound]);

  const handleSelect = useCallback((player: PlayerClubInfo) => {
    if (state.answerPhase === 'result') return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }

    const isCorrect = player.id === currentQ.wrongPlayer.id;
    const newTotal = isCorrect ? state.totalCorrect + 1 : state.totalCorrect;

    setState(prev => ({
      ...prev,
      selectedId: player.id,
      isCorrect,
      answerPhase: 'result',
      score: isCorrect ? prev.score + 1 : prev.score,
      totalCorrect: newTotal,
      celebrationMessage: isCorrect ? 'صح! عينك حادة! 🔥' : `غلط! الإجابة: ${currentQ.wrongPlayer.name} 🙂` }));

    playSound(isCorrect ? 'correct' : 'wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state, currentQ, nextQuestion, playSound]);

  const handleTimeout = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setState(prev => ({
      ...prev,
      selectedId: null,
      isCorrect: false,
      answerPhase: 'result',
      celebrationMessage: `⏰ انتهى الوقت! الإجابة: ${currentQ.wrongPlayer.name}` }));
    playSound('wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [currentQ, playSound, nextQuestion]);

  useEffect(() => {
    if (state.answerPhase !== 'question' || state.gameOver || isPaused) return;
    timerRef.current = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 0) return prev;
        return { ...prev, timeLeft: Math.max(0, prev.timeLeft - 1) };
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state.answerPhase, state.gameOver, state.currentQuestion, isPaused]);

  useEffect(() => {
    if (state.answerPhase === 'question' && state.timeLeft <= 0) handleTimeout();
  }, [state.timeLeft, state.answerPhase, handleTimeout]);

  const handleHelpEliminate = () => {
    const correctVal = currentQ?.wrongPlayer;
    const wrongIdxs = (currentQ?.players || []).map((o: any, i: number) => ({ o, i })).filter((x: any) => x.o?.id !== correctVal?.id).map((x: any) => x.i);
    const toHide = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenIndices(toHide);
    setHelp1Used(true);
  };

  const handleHelpSolve = () => {
    if (currentQ?.wrongPlayer) handleSelect(currentQ?.wrongPlayer as any);
    setSolveUsed(true);
  };

  const handleHelpSpecial = () => {
    if (currentQ?.wrongPlayer) handleSelect(currentQ?.wrongPlayer as any);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };


  if (state.gameOver) {
    const isPerfect = state.totalCorrect >= QUESTIONS_COUNT * 0.8;
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900 via-green-700 to-green-800" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-black/60 backdrop-blur-md rounded-3xl border border-primary/30 max-w-md mx-4 animate-bounce-in">
            <div className="text-center p-8">
              {isPerfect ? <Trophy className="w-24 h-24 mx-auto text-primary mb-4 animate-pulse" /> : state.totalCorrect >= 5 ? <HelpCircle className="w-24 h-24 mx-auto text-yellow-400 mb-4" /> : <XCircle className="w-24 h-24 mx-auto text-destructive mb-4" />}
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">
                {isPerfect ? 'ماشاء الله عليك! 🔥' : state.totalCorrect >= 5 ? 'مو بطال! 👏' : 'حاول مرة ثانية! 😅'}
              </h2>
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

  if (!currentQ) return null;

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col relative overflow-hidden">
      <GameControls onExit={onRestart} onPause={() => setIsPaused(true)} onResume={() => setIsPaused(false)} isPaused={isPaused} />
      <div className="absolute inset-0 bg-gradient-to-b from-green-900 via-green-700 to-green-800" />
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-full h-8" style={{ top: `${i * 5}%`, background: i % 2 === 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(22, 163, 74, 0.15)' }} />
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge bg-black/50">⚽ {state.score}</div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all", state.timeLeft <= 3 ? "bg-destructive/20 text-destructive animate-pulse" : "bg-green-900/50 text-green-400")}>
          <Timer className="w-5 h-5" /> {state.timeLeft}
        </div>
        <div className="bg-yellow-400/20 px-3 py-1 rounded-full text-yellow-400 font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" /> المستوى 9
        </div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full">
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-2xl">
          <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 mb-6 text-center">
            <p className="text-xl md:text-2xl font-black text-white mb-2">
              من الذي <span className="text-red-400">لم يلعب</span> في {currentQ.club}؟ 🤔
            </p>
            <p className="text-sm text-muted-foreground">اختر اللاعب الذي لم يلعب لهذا النادي</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {currentQ.players.map((player, _hIdx) => {
              if (hiddenIndices.includes(_hIdx)) return <div key={_hIdx} className="p-3 rounded-2xl border-2 border-white/10 bg-black/20 opacity-20 min-h-[52px]" />;
              let cardClass = "bg-black/40 backdrop-blur-sm border-white/20 hover:border-green-400/50";
              if (state.answerPhase === 'result') {
                if (player.id === currentQ.wrongPlayer.id) {
                  cardClass = "bg-green-500/30 border-green-400";
                } else if (player.id === state.selectedId) {
                  cardClass = "bg-destructive/20 border-destructive";
                }
              }

              return (
                <button
                  key={player.id}
                  onClick={() => handleSelect(player)}
                  disabled={state.answerPhase === 'result'}
                  className={cn(
                    "rounded-2xl border-2 p-3 transition-all duration-200 flex flex-col items-center gap-2",
                    cardClass,
                    state.answerPhase === 'question' && "hover:scale-105 active:scale-95"
                  )}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/30">
                    <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bold text-sm md:text-base text-white text-center">{player.name}</span>
                  {state.answerPhase === 'result' && (
                    <div className={cn("rounded-full p-1", player.id === currentQ.wrongPlayer.id ? "bg-green-500" : "bg-red-500")}>
                      {player.id === currentQ.wrongPlayer.id ? <Check className="w-4 h-4 text-white" /> : <X className="w-4 h-4 text-white" />}
                    </div>
                  )}
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
            disabled={state.answerPhase === 'result' || state.gameOver}
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
