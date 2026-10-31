import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSound } from '@/hooks/useSound';
import { Timer, RotateCcw, Trophy, Flame, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';
import { level16Questions } from '@/data/level16Questions';

const QUESTIONS_COUNT = 5;
const QUESTION_TIME = 20;
const TRANSITION_DELAY = 2500;
const STREAK_FOR_HAMAS = 3;

interface GameState {
  currentQuestion: number;
  score: number;
  timeLeft: number;
  gameOver: boolean;
  totalCorrect: number;
  totalWrong: number;
  streak: number;
  hamasMode: boolean;
  selectedOption: number | null;
  answerPhase: 'question' | 'result';
  isCorrect: boolean | null;
  celebrationMessage: string | null;
  showHint: boolean;
  firstMistakeDone: boolean;
  usedQuestions: number[];
}

export function Level16Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);

  const pickQuestions = () => {
    const shuffled = [...level16Questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, QUESTIONS_COUNT).map(q => q.id);
  };

  const [state, setState] = useState<GameState>(() => {
    const picked = pickQuestions();
    return {
      currentQuestion: 0, score: 0, timeLeft: QUESTION_TIME, gameOver: false,
      totalCorrect: 0, totalWrong: 0, streak: 0, hamasMode: false,
      selectedOption: null, answerPhase: 'question', isCorrect: null,
      celebrationMessage: null, showHint: false, firstMistakeDone: false,
      usedQuestions: picked };
  });

  // Auto-solve next question (special help)
  useEffect(() => {
    if (autoSolveNext && state.answerPhase === 'question') {
      setAutoSolveNext(false);
      setTimeout(() => { const correctIdx = currentQ?.correctIndex; if (correctIdx !== undefined) handleAnswer(correctIdx); }, 500);
    }
  }, [autoSolveNext, state.currentQuestion, state.answerPhase]);

  const currentQ = level16Questions.find(q => q.id === state.usedQuestions[state.currentQuestion])!;

  const nextQuestion = useCallback(() => {
    setHiddenIndices([]);
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (state.currentQuestion >= QUESTIONS_COUNT - 1) {
      setState(prev => ({ ...prev, gameOver: true }));
      playSound('gameOver');
      return;
    }
    setState(prev => ({
      ...prev, currentQuestion: prev.currentQuestion + 1,
      timeLeft: QUESTION_TIME, selectedOption: null,
      answerPhase: 'question', isCorrect: null, celebrationMessage: null, showHint: false }));
  }, [state.currentQuestion, playSound]);

  const handleAnswer = useCallback((optionIndex: number) => {
    if (state.answerPhase === 'result') return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }

    const isCorrect = optionIndex === currentQ.correctIndex;
    const newStreak = isCorrect ? state.streak + 1 : 0;
    const newHamas = newStreak >= STREAK_FOR_HAMAS;
    const pointsEarned = isCorrect ? (state.hamasMode || newHamas ? 2 : 1) : 0;

    let msg: string;
    if (isCorrect) {
      if (newHamas && !state.hamasMode) {
        msg = '🔥🔥🔥 وضع الحماس! نقاط مضاعفة! 🔥🔥🔥';
      } else {
        msg = currentQ.commentOnCorrect;
      }
    } else {
      if (!state.firstMistakeDone) {
        // أول خطأ - الكابتن يعطي تلميح
        msg = `📢 كابتن الفريق: "${currentQ.hint}"`;
      } else {
        msg = '❌ غلط! حاول أقوى المرة الجاية!';
      }
    }

    setState(prev => ({
      ...prev, selectedOption: optionIndex, answerPhase: 'result', isCorrect,
      score: prev.score + pointsEarned,
      totalCorrect: isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect,
      totalWrong: isCorrect ? prev.totalWrong : prev.totalWrong + 1,
      streak: newStreak,
      hamasMode: newHamas || (isCorrect ? prev.hamasMode : false),
      celebrationMessage: msg,
      firstMistakeDone: !isCorrect ? true : prev.firstMistakeDone }));
    playSound(isCorrect ? 'correct' : 'wrong');
    setTimeout(() => setState(prev => ({ ...prev, selectedOption: null, answerPhase: 'question', celebrationMessage: null })), TRANSITION_DELAY - 300);
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state, currentQ, nextQuestion, playSound]);

  const handleTimeout = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setState(prev => ({
      ...prev, answerPhase: 'result', isCorrect: false,
      totalWrong: prev.totalWrong + 1, streak: 0, hamasMode: false,
      celebrationMessage: `⏰ انتهى الوقت! الجواب: ${currentQ.options[currentQ.correctIndex]}` }));
    playSound('wrong');
    setTimeout(() => setState(prev => ({ ...prev, selectedOption: null, answerPhase: 'question', celebrationMessage: null })), TRANSITION_DELAY - 300);
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
    const correctIdx = currentQ?.correctIndex;
    if (correctIdx === undefined) return;
    const wrongIdxs = (currentQ?.options || []).map((_: any, i: number) => i).filter((i: number) => i !== correctIdx);
    const toHide = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenIndices(toHide);
    setHelp1Used(true);
  };

  const handleHelpSolve = () => {
    const correctIdx = currentQ?.correctIndex;
    if (correctIdx !== undefined) handleAnswer(correctIdx);
    setSolveUsed(true);
  };

  const handleHelpSpecial = () => {
    const correctIdx = currentQ?.correctIndex;
    if (correctIdx !== undefined) handleAnswer(correctIdx);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };


  if (state.gameOver) {
    const goals = state.totalCorrect;
    const getFinal = () => {
      if (goals >= 5) return { title: '🏆 موهبة الحي!', subtitle: 'سجلت كل الأهداف! أنت نجم الحواري!', emoji: '⚽🌟' };
      if (goals >= 3) return { title: '⚽ لعيب زين!', subtitle: 'بداية قوية بس تقدر أحسن!', emoji: '💪' };
      return { title: '😅 تحتاج تدريب!', subtitle: 'ارجع تمرن وحاول مرة ثانية!', emoji: '🏃' };
    };
    const msg = getFinal();

    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900 via-amber-700 to-orange-800" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-black/60 backdrop-blur-md rounded-3xl border border-primary/30 max-w-md mx-4 animate-bounce-in">
            <div className="text-center p-8">
              {goals >= 5 ? <Trophy className="w-24 h-24 mx-auto text-yellow-400 mb-4 animate-pulse" /> : <XCircle className="w-24 h-24 mx-auto text-orange-400 mb-4" />}
              <div className="text-5xl mb-4">{msg.emoji}</div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">{msg.title}</h2>
              <p className="text-lg text-muted-foreground mb-4">{msg.subtitle}</p>
              <p className="text-2xl text-foreground mb-4">أهدافك: <span className="text-primary font-bold">{goals}</span> من {QUESTIONS_COUNT}</p>
              <p className="text-lg text-yellow-400 mb-8">النقاط: <span className="font-bold">{state.score}</span></p>
              <div className="flex flex-col gap-3">
                <button onClick={() => onLevelComplete?.({ score: state.totalCorrect, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start flex items-center gap-2 mx-auto">المرحلة التالية 🏆</button>
                <button onClick={onRestart} className="btn-start flex items-center gap-2 mx-auto opacity-70"><RotateCcw className="w-5 h-5" /> من البداية</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col relative overflow-hidden">
      <GameControls onExit={onRestart} onPause={() => setIsPaused(true)} onResume={() => setIsPaused(false)} isPaused={isPaused} />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900 via-amber-700 to-orange-800" />

      {/* Header */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge bg-black/50">⚽ {state.score}</div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all", state.timeLeft <= 3 ? "bg-destructive/20 text-destructive animate-pulse" : "bg-amber-700/50 text-amber-300")}>
          <Timer className="w-5 h-5" /> {state.timeLeft}
        </div>
        {state.hamasMode && (
          <div className="bg-red-500/30 px-3 py-1 rounded-full text-red-300 font-bold text-sm flex items-center gap-1 animate-pulse">
            <Flame className="w-4 h-4" /> وضع الحماس!
          </div>
        )}
      </div>

      {/* Streak indicator */}
      <div className="relative z-10 flex justify-center mb-2">
        <div className="flex gap-1">
          {Array.from({ length: STREAK_FOR_HAMAS }).map((_, i) => (
            <div key={i} className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs transition-all",
              i < state.streak ? "bg-orange-500 border-orange-400 text-white" : "bg-black/30 border-white/20 text-white/30"
            )}>🔥</div>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-2xl">
          <div className="bg-black/50 backdrop-blur-sm border border-amber-500/30 rounded-2xl p-6 mb-6 text-center">
            <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">{currentQ.question}</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((option, index) => {
              if (hiddenIndices.includes(index)) return <div key={index} className="p-3 rounded-2xl border-2 border-white/10 bg-black/20 opacity-20 min-h-[52px]" />;
              const isSelected = state.selectedOption === index;
              const isCorrectOption = index === currentQ.correctIndex;
              const showResult = state.answerPhase === 'result';

              return (
                <button key={index} onClick={() => handleAnswer(index)} disabled={showResult}
                  className={cn(
                    "py-4 px-6 rounded-2xl font-bold text-lg transition-all text-right",
                    showResult && isCorrectOption ? "bg-emerald-500/40 border-2 border-emerald-400 text-emerald-300" :
                    showResult && isSelected && !isCorrectOption ? "bg-red-500/40 border-2 border-red-400 text-red-300" :
                    !showResult ? "bg-black/40 border-2 border-white/20 text-white hover:border-amber-400 hover:bg-amber-500/20 active:scale-95" :
                    "bg-black/20 border-2 border-white/10 text-white/40"
                  )}>
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Celebration message */}
      
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
          <div className={cn("p-4 px-8 rounded-2xl border-2 backdrop-blur-sm animate-bounce-in text-center max-w-sm",
            state.isCorrect ? "bg-green-500/30 border-green-400/50" : "bg-orange-500/30 border-orange-400/50")}>
            <p className={cn("text-lg md:text-xl font-black", state.isCorrect ? "text-green-400" : "text-orange-300")}>{state.celebrationMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
