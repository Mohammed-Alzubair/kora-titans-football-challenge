import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSound } from '@/hooks/useSound';
import { Timer, Crown, RotateCcw, Trophy, XCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';
import { stadiums } from '@/data/stadiums';

const QUESTIONS_COUNT = 10;
const QUESTION_TIME = 20;
const TRANSITION_DELAY = 2000;
const MAX_WRONG = 3;

interface GameState {
  currentQuestion: number;
  score: number;
  timeLeft: number;
  gameOver: boolean;
  totalCorrect: number;
  totalWrong: number;
  currentStadium: typeof stadiums[0];
  userInput: string;
  answerPhase: 'question' | 'result';
  isCorrect: boolean | null;
  celebrationMessage: string | null;
  usedIds: string[];
  kicked: boolean;
}

export function Level15Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);

  const getNext = (used: string[]) => {
    const available = stadiums.filter(s => !used.includes(s.id));
    const pool = available.length > 0 ? available : stadiums;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const [state, setState] = useState<GameState>(() => {
    const stadium = getNext([]);
    return {
      currentQuestion: 0, score: 0, timeLeft: QUESTION_TIME, gameOver: false,
      totalCorrect: 0, totalWrong: 0, currentStadium: stadium,
      userInput: '', answerPhase: 'question', isCorrect: null, celebrationMessage: null,
      usedIds: [stadium.id], kicked: false };
  });

  // Auto-solve next question (special help)
  useEffect(() => {
    if (autoSolveNext && state.answerPhase === 'question') {
      setAutoSolveNext(false);
      setTimeout(() => { setTimeout(() => handleSubmit(), 300); }, 500);
    }
  }, [autoSolveNext, state.currentQuestion, state.answerPhase]);

  const nextQuestion = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (state.currentQuestion >= QUESTIONS_COUNT - 1) {
      setState(prev => ({ ...prev, gameOver: true }));
      playSound('gameOver'); return;
    }
    const stadium = getNext(state.usedIds);
    setState(prev => ({
      ...prev, currentQuestion: prev.currentQuestion + 1, currentStadium: stadium,
      userInput: '', timeLeft: QUESTION_TIME,
      answerPhase: 'question', isCorrect: null, celebrationMessage: null,
      usedIds: [...prev.usedIds, stadium.id] }));
  }, [state.currentQuestion, state.usedIds, playSound]);

  const handleSubmit = useCallback(() => {
    if (state.answerPhase === 'result') return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    const normalized = state.userInput.trim();
    const isCorrect = normalized === state.currentStadium.name;
    const newWrong = isCorrect ? state.totalWrong : state.totalWrong + 1;

    if (newWrong >= MAX_WRONG) {
      setState(prev => ({ ...prev, answerPhase: 'result', isCorrect: false, totalWrong: newWrong,
        celebrationMessage: '🫵🤣', kicked: true }));
      playSound('wrong');
      setTimeout(() => { setState(prev => ({ ...prev, gameOver: true })); }, TRANSITION_DELAY);
      return;
    }

    const newCorrect = isCorrect ? state.totalCorrect + 1 : state.totalCorrect;
    const correctMsgs = ['صحيح! 🏟️🔥', 'برافو عليك! 👏', 'ممتاز! 💪'];
    const wrongMsgs = ['🙂 هذا ملعب وش يا محترم', 'غلط! ركز شوي 🙃', 'لا مو كذا! 😅'];

    let msg: string;
    if (isCorrect && newCorrect === 3) {
      msg = '🥲 ماشاء الله عليك';
    } else if (isCorrect && newCorrect > 3) {
      msg = '😐 شت';
    } else if (isCorrect) {
      msg = correctMsgs[Math.floor(Math.random() * correctMsgs.length)];
    } else {
      msg = wrongMsgs[Math.floor(Math.random() * wrongMsgs.length)];
    }

    setState(prev => ({
      ...prev, answerPhase: 'result', isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
      totalCorrect: newCorrect, totalWrong: newWrong, celebrationMessage: msg }));
    playSound(isCorrect ? 'correct' : 'wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state, nextQuestion, playSound]);

  const handleTimeout = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    const newWrong = state.totalWrong + 1;
    if (newWrong >= MAX_WRONG) {
      setState(prev => ({ ...prev, answerPhase: 'result', isCorrect: false, totalWrong: newWrong,
        celebrationMessage: '🫵🤣', kicked: true }));
      playSound('wrong');
      setTimeout(() => { setState(prev => ({ ...prev, gameOver: true })); }, TRANSITION_DELAY);
      return;
    }
    setState(prev => ({
      ...prev, answerPhase: 'result', isCorrect: false, totalWrong: newWrong,
      celebrationMessage: `⏰ انتهى الوقت! الجواب: ${state.currentStadium.name}` }));
    playSound('wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state.currentStadium.name, state.totalWrong, playSound, nextQuestion]);

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

  useEffect(() => {
    if (state.answerPhase === 'question' && inputRef.current) inputRef.current.focus();
  }, [state.currentQuestion, state.answerPhase]);

  const handleHelpEliminate = () => {
    const hint = state.currentStadium.name.slice(0, 2);
    setState(prev => ({ ...prev, userInput: hint }));
    setHelp1Used(true);
  };
  const handleHelpSolve = () => {
    setState(prev => ({ ...prev, userInput: state.currentStadium.name }));
    setSolveUsed(true);
    setTimeout(() => handleSubmit(), 300);
  };
  const handleHelpSpecial = () => {
    setState(prev => ({ ...prev, userInput: state.currentStadium.name }));
    setSpecialUsed(true);
    setAutoSolveNext(true);
    setTimeout(() => handleSubmit(), 300);
  };


  if (state.gameOver) {
    const getFinalMessage = () => {
      if (state.kicked) return { title: '🫵🤣', subtitle: `${MAX_WRONG} أخطاء!`, emoji: '🤣' };
      if (state.totalCorrect >= 8) return { title: '😐 شت', subtitle: 'تعرف الملاعب كلها!', emoji: '🏟️🏆' };
      if (state.totalCorrect >= 5) return { title: '🥲 ماشاء الله عليك', subtitle: 'بس تقدر أحسن', emoji: '🏟️' };
      return { title: 'ضعيف! 🙂', subtitle: 'روح تعلم الملاعب', emoji: '📖' };
    };
    const msg = getFinalMessage();

    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900 via-emerald-700 to-emerald-800" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-black/60 backdrop-blur-md rounded-3xl border border-primary/30 max-w-md mx-4 animate-bounce-in">
            <div className="text-center p-8">
              {state.totalCorrect >= 8 ? <Trophy className="w-24 h-24 mx-auto text-primary mb-4 animate-pulse" /> : state.totalCorrect >= 5 ? <HelpCircle className="w-24 h-24 mx-auto text-yellow-400 mb-4" /> : <XCircle className="w-24 h-24 mx-auto text-destructive mb-4" />}
              <div className="text-5xl mb-4">{msg.emoji}</div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">{msg.title}</h2>
              <p className="text-lg text-muted-foreground mb-4">{msg.subtitle}</p>
              <p className="text-2xl text-foreground mb-8">نتيجتك: <span className="text-primary font-bold">{state.totalCorrect}</span> من {QUESTIONS_COUNT}</p>
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
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900 via-emerald-700 to-emerald-800" />
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge bg-black/50">🏟️ {state.score}</div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all", state.timeLeft <= 3 ? "bg-destructive/20 text-destructive animate-pulse" : "bg-emerald-700/50 text-emerald-300")}>
          <Timer className="w-5 h-5" /> {state.timeLeft}
        </div>
        <div className="bg-yellow-400/20 px-3 py-1 rounded-full text-yellow-400 font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" /> المستوى 15
        </div>
      </div>
      <div className="relative z-10 flex justify-center mb-2">
        <div className="bg-red-900/40 px-4 py-1 rounded-full text-red-300 font-bold text-sm">أخطاء: {state.totalWrong} / {MAX_WRONG}</div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-2xl">
          <div className="bg-black/50 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-6 mb-6 text-center">
            <p className="text-lg text-muted-foreground mb-4">ايش اسم الملعب؟ 🏟️</p>
            <div className="flex justify-center mb-4">
              <img
                src={state.currentStadium.image}
                alt="ملعب"
                className="w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover border-2 border-emerald-400/50 shadow-lg"
              />
            </div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-4 mb-4">
            <input ref={inputRef} type="text" value={state.userInput} onChange={(e) => setState(prev => ({ ...prev, userInput: e.target.value }))} onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }} disabled={state.answerPhase === 'result'} placeholder="اكتب اسم الملعب هنا" className="w-full bg-transparent text-white text-xl font-bold text-center outline-none placeholder:text-white/30"  />
          </div>
          <button onClick={handleSubmit} disabled={state.answerPhase === 'result' || !state.userInput.trim()} className={cn("w-full py-3 rounded-2xl font-bold text-lg transition-all", state.answerPhase === 'result' || !state.userInput.trim() ? "bg-gray-600/50 text-gray-400 cursor-not-allowed" : "bg-emerald-500 hover:bg-emerald-600 text-white active:scale-95")}>تأكيد ✅</button>
          {state.answerPhase === 'result' && !state.isCorrect && (
            <div className="mt-4 text-center bg-black/40 rounded-xl p-3">
              <p className="text-yellow-400 font-bold">الجواب الصحيح: <span className="text-white">{state.currentStadium.name}</span></p>
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
          <div className={cn("p-4 px-8 rounded-2xl border-2 backdrop-blur-sm animate-bounce-in text-center max-w-sm", state.isCorrect ? "bg-green-500/30 border-green-400/50" : "bg-destructive/30 border-destructive/50")}>
            <p className={cn("text-lg md:text-xl font-black", state.isCorrect ? "text-green-400" : "text-red-400")}>{state.celebrationMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
