import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSound } from '@/hooks/useSound';
import { Timer, Crown, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';
import { StreakOverlay } from './StreakOverlay';
import { getStreakComment } from '@/utils/streakComments';
import { level20Questions } from '@/data/level20Questions';

const QUESTIONS_COUNT = 10;
const QUESTION_TIME = 20;
const TRANSITION_DELAY = 2000;

interface GameState {
  currentQuestion: number;
  score: number;
  timeLeft: number;
  gameOver: boolean;
  totalCorrect: number;
  totalWrong: number;
  currentQ: typeof level20Questions[0];
  userInput: string;
  selectedOption: number | null;
  answerPhase: 'question' | 'result';
  isCorrect: boolean | null;
  celebrationMessage: string | null;
  usedIds: number[];
  streak: number;
  wrongStreak: number;
  streakMsg: string | null;
  streakTier: 'hype' | 'epic' | 'lose' | null;
}

export function Level20Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);

  const getNext = (used: number[]) => {
    const available = level20Questions.filter(q => !used.includes(q.id));
    const pool = available.length > 0 ? available : level20Questions;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const [state, setState] = useState<GameState>(() => {
    const q = getNext([]);
    return {
      currentQuestion: 0, score: 0, timeLeft: QUESTION_TIME, gameOver: false,
      totalCorrect: 0, totalWrong: 0, currentQ: q, userInput: '',
      selectedOption: null, answerPhase: 'question', isCorrect: null,
      celebrationMessage: null, usedIds: [q.id], streak: 0, wrongStreak: 0,
      streakMsg: null as string | null, streakTier: null as 'hype' | 'epic' | 'lose' | null };
  });

  const getComment = (correct: number, wrong: number, isCorrect: boolean, streak: number) => {
    if (!isCorrect) {
      if (wrong >= 3) return 'جسمك ضعييييييف 😩';
      return ['غلط! 😅', 'لا مو كذا! 🙃'][Math.floor(Math.random() * 2)];
    }
    if (streak >= 4) return 'كبيرررر والكبير الله 🙂😬';
    if (correct >= 7) return 'ياعف الله مجرم سفاااح 🔥';
    if (correct >= 4) return 'كبيرررر! 💪🔥';
    return ['صحيح! ⚽', 'برافو! 👏'][Math.floor(Math.random() * 2)];
  };

  const nextQuestion = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (state.currentQuestion >= QUESTIONS_COUNT - 1) {
      setState(prev => ({ ...prev, gameOver: true }));
      playSound('gameOver'); return;
    }
    const q = getNext(state.usedIds);
    setState(prev => ({
      ...prev, currentQuestion: prev.currentQuestion + 1, currentQ: q,
      userInput: '', timeLeft: QUESTION_TIME, selectedOption: null,
      answerPhase: 'question', isCorrect: null, celebrationMessage: null,
      usedIds: [...prev.usedIds, q.id] }));
  }, [state.currentQuestion, state.usedIds, playSound]);

  const handleSubmit = useCallback((answer = state.userInput) => {
    if (state.answerPhase === 'result') return;
    const normalized = answer.trim();
    // Enter can fire while the field is empty even though the button is disabled.
    // Empty strings match every accepted answer through `answer.includes('')`.
    if (!normalized) return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    const isCorrect = state.currentQ.acceptedAnswers.some((accepted) =>
      accepted === normalized || normalized.includes(accepted)
    );
    const newCorrect = isCorrect ? state.totalCorrect + 1 : state.totalCorrect;
    const newWrong = isCorrect ? state.totalWrong : state.totalWrong + 1;
    const newStreak = isCorrect ? state.streak + 1 : 0;
    const newWrongStreak = isCorrect ? 0 : (state.wrongStreak || 0) + 1;
    const msg = getComment(newCorrect, newWrong, isCorrect, newStreak);

    setState(prev => ({
      ...prev, answerPhase: 'result', isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
      totalCorrect: newCorrect, totalWrong: newWrong, streak: newStreak, wrongStreak: isCorrect ? 0 : prev.wrongStreak + 1,
      celebrationMessage: msg }));
    playSound(isCorrect ? 'correct' : 'wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state, nextQuestion, playSound]);

  // Auto-solve the following question only when the special help was used.
  useEffect(() => {
    if (!autoSolveNext || state.answerPhase !== 'question' || state.gameOver) return;
    const solveTimer = setTimeout(() => {
      setAutoSolveNext(false);
      handleSubmit(state.currentQ.answer);
    }, 500);
    return () => clearTimeout(solveTimer);
  }, [autoSolveNext, state.answerPhase, state.gameOver, state.currentQuestion, state.currentQ.answer, handleSubmit]);

  const handleTimeout = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setState(prev => ({
      ...prev, answerPhase: 'result', isCorrect: false,
      totalWrong: prev.totalWrong + 1, streak: 0, wrongStreak: 0,
      streakMsg: null as string | null, streakTier: null as 'hype' | 'epic' | 'lose' | null,
      celebrationMessage: `⏰ الجواب: ${state.currentQ.answer}` }));
    playSound('wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state.currentQ, playSound, nextQuestion]);

  useEffect(() => {
    if (state.answerPhase !== 'question' || state.gameOver || isPaused) return;
    timerRef.current = setInterval(() => {
      setState(prev => ({ ...prev, timeLeft: Math.max(0, prev.timeLeft - 1) }));
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state.answerPhase, state.gameOver, state.currentQuestion, isPaused]);

  useEffect(() => {
    if (state.answerPhase === 'question' && state.timeLeft <= 0) handleTimeout();
  }, [state.timeLeft, state.answerPhase, handleTimeout]);

  useEffect(() => {
    if (state.answerPhase === 'question' && inputRef.current) inputRef.current.focus();
  }, [state.currentQuestion, state.answerPhase]);

  const handleHelpEliminate = () => {
    const hint = state.currentQ.answer.slice(0, 2);
    setState(prev => ({ ...prev, userInput: hint }));
    setHelp1Used(true);
  };
  const handleHelpSolve = () => {
    handleSubmit(state.currentQ.answer);
    setSolveUsed(true);
  };
  const handleHelpSpecial = () => {
    handleSubmit(state.currentQ.answer);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };


  if (state.gameOver) {
    const getFinal = () => {
      if (state.totalCorrect >= 8) return { title: 'ياعف الله مجرم سفاااح 🔥', subtitle: 'كبيرررر والكبير الله 🙂😬', emoji: '⚽👑' };
      if (state.totalCorrect >= 5) return { title: 'كبيرررر! 💪', subtitle: 'بس تقدر أحسن', emoji: '⚽' };
      return { title: 'جسمك ضعييييييف 😩', subtitle: 'روح تعلم اللاعبين!', emoji: '📖' };
    };
    const msg = getFinal();

    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900 via-cyan-700 to-cyan-800" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-black/60 backdrop-blur-md rounded-3xl border border-cyan-500/30 max-w-md mx-4 animate-bounce-in">
            <div className="text-center p-8">
              {state.totalCorrect >= 8 ? <Trophy className="w-24 h-24 mx-auto text-yellow-400 mb-4 animate-pulse" /> : <XCircle className="w-24 h-24 mx-auto text-cyan-400 mb-4" />}
              <div className="text-5xl mb-4">{msg.emoji}</div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">{msg.title}</h2>
              <p className="text-lg text-white/70 mb-4">{msg.subtitle}</p>
              <p className="text-2xl text-white mb-8">نتيجتك: <span className="text-cyan-400 font-bold">{state.totalCorrect}</span> من {QUESTIONS_COUNT}</p>
              <div className="flex flex-col gap-3">
                {onLevelComplete && <button onClick={() => onLevelComplete?.({ score: state.totalCorrect, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start flex items-center gap-2 mx-auto">المرحلة التالية 🏆</button>}
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
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900 via-cyan-700 to-cyan-800" />
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge bg-black/50">✍️ {state.score}</div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all", state.timeLeft <= 3 ? "bg-red-500/20 text-red-300 animate-pulse" : "bg-cyan-700/50 text-cyan-300")}>
          <Timer className="w-5 h-5" /> {state.timeLeft}
        </div>
        <div className="bg-yellow-400/20 px-3 py-1 rounded-full text-yellow-400 font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" /> المستوى 20
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-2xl">
          <div className="bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 mb-6 text-center">
            <p className="text-lg text-white/70 mb-2">اكتب اسم اللاعب! ✍️</p>
            <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">{state.currentQ.question}</p>
          </div>
          <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-4 mb-4">
            <input ref={inputRef} type="text" value={state.userInput}
              onChange={(e) => setState(prev => ({ ...prev, userInput: e.target.value }))}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
              disabled={state.answerPhase === 'result'}
              placeholder="اكتب اسم اللاعب هنا..."
              className="w-full bg-transparent text-white text-xl font-bold text-center outline-none placeholder:text-white/30"  />
          </div>
          <button onClick={() => handleSubmit()} disabled={state.answerPhase === 'result' || !state.userInput.trim()}
            className={cn("w-full py-3 rounded-2xl font-bold text-lg transition-all",
              state.answerPhase === 'result' || !state.userInput.trim() ? "bg-gray-600/50 text-gray-400 cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-600 text-white active:scale-95")}>
            تأكيد ✅
          </button>
          {state.answerPhase === 'result' && !state.isCorrect && (
            <div className="mt-4 text-center bg-black/40 rounded-xl p-3">
              <p className="text-yellow-400 font-bold">الجواب الصحيح: <span className="text-white">{state.currentQ.answer}</span></p>
            </div>
          )}
        </div>
      </div>

      
          <HelpBar
            questionType="text"
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
            state.isCorrect ? "bg-green-500/30 border-green-400/50" : "bg-red-500/30 border-red-400/50")}>
            <p className={cn("text-lg md:text-xl font-black", state.isCorrect ? "text-green-400" : "text-red-400")}>{state.celebrationMessage}</p>
          </div>
        </div>
      )}

      <StreakOverlay message={state.streakMsg} tier={state.streakTier} />
    </div>
  );
}
