import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSound } from '@/hooks/useSound';
import { Timer, Crown, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';
import { StreakOverlay } from './StreakOverlay';
import { getStreakComment } from '@/utils/streakComments';
import { mysteryPlayerQuestions } from '@/data/level38MysteryPlayer';

const QUESTIONS_COUNT = 10;
const QUESTION_TIME = 20;
const TRANSITION_DELAY = 1500;
const GRID_SIZE = 4; // 4x4 grid = 16 squares
const REVEAL_INTERVAL = 1000; // reveal one square per second

function getComment(correct: number, wrong: number, isCorrect: boolean, revealedCount: number) {
  if (!isCorrect) {
    const msgs = ['😐 ما عرفته!', '🙃 كان واضح!', '😬 ركز أكثر!'];
    return msgs[Math.floor(Math.random() * msgs.length)];
  }
  if (revealedCount <= 4) return '🤯 خرافي! عرفته من أول!';
  if (revealedCount <= 8) return '🔥 سريع جداً!';
  if (revealedCount <= 12) return '👍 مو بطال!';
  return '✅ صحيح!';
}

function getPoints(revealedCount: number): number {
  if (revealedCount <= 4) return 4;
  if (revealedCount <= 8) return 3;
  if (revealedCount <= 12) return 2;
  return 1;
}

export function Level38Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);
  const [revealedSquares, setRevealedSquares] = useState<number[]>([]);
  const [userInput, setUserInput] = useState('');

  const getNext = (used: number[]) => {
    const available = mysteryPlayerQuestions.filter(q => !used.includes(q.id));
    const pool = available.length > 0 ? available : mysteryPlayerQuestions;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const [state, setState] = useState(() => {
    const q = getNext([]);
    return {
      currentQuestion: 0, score: 0, timeLeft: QUESTION_TIME, gameOver: false,
      totalCorrect: 0, totalWrong: 0, currentQ: q,
      answerPhase: 'question' as 'question' | 'result',
      isCorrect: null as boolean | null, celebrationMessage: null as string | null,
      usedIds: [q.id], streak: 0, wrongStreak: 0,
      streakMsg: null as string | null, streakTier: null as 'hype' | 'epic' | 'lose' | null };
  });

  // Auto-solve next question (special help)
  useEffect(() => {
    if (autoSolveNext && state.answerPhase === 'question') {
      setAutoSolveNext(false);
      setTimeout(() => { setTimeout(() => checkAnswer(), 100); }, 500);
    }
  }, [autoSolveNext, state.currentQuestion, state.answerPhase]);

  // Generate random order for revealing squares
  const generateRevealOrder = useCallback(() => {
    const squares = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);
    return squares.sort(() => Math.random() - 0.5);
  }, []);

  const [revealOrder, setRevealOrder] = useState<number[]>(generateRevealOrder());

  // Progressive reveal effect
  useEffect(() => {
    if (state.answerPhase !== 'question' || state.gameOver || isPaused) return;
    if (revealedSquares.length >= GRID_SIZE * GRID_SIZE) return;

    revealTimerRef.current = setTimeout(() => {
      const nextIdx = revealedSquares.length;
      if (nextIdx < revealOrder.length) {
        setRevealedSquares(prev => [...prev, revealOrder[nextIdx]]);
      }
    }, REVEAL_INTERVAL);

    return () => { if (revealTimerRef.current) clearTimeout(revealTimerRef.current); };
  }, [revealedSquares, revealOrder, state.answerPhase, state.gameOver, isPaused]);

  const nextQuestion = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (revealTimerRef.current) { clearTimeout(revealTimerRef.current); revealTimerRef.current = null; }
    if (state.currentQuestion >= QUESTIONS_COUNT - 1) {
      setState(prev => ({ ...prev, gameOver: true }));
      playSound('gameOver'); return;
    }
    const q = getNext(state.usedIds);
    setRevealedSquares([]);
    setRevealOrder(generateRevealOrder());
    setUserInput('');
    setState(prev => ({
      ...prev, currentQuestion: prev.currentQuestion + 1, currentQ: q,
      timeLeft: QUESTION_TIME, answerPhase: 'question', isCorrect: null,
      celebrationMessage: null, usedIds: [...prev.usedIds, q.id] }));
  }, [state.currentQuestion, state.usedIds, playSound, generateRevealOrder]);

  const checkAnswer = useCallback(() => {
    if (state.answerPhase === 'result' || !userInput.trim()) return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (revealTimerRef.current) { clearTimeout(revealTimerRef.current); revealTimerRef.current = null; }

    const normalizedInput = userInput.trim().toLowerCase();
    const isCorrect = state.currentQ.acceptedAnswers.some(ans => 
      normalizedInput.includes(ans.toLowerCase())
    );
    const points = isCorrect ? getPoints(revealedSquares.length) : 0;
    const msg = getComment(state.totalCorrect, state.totalWrong, isCorrect, revealedSquares.length);

    setState(prev => ({
      ...prev, answerPhase: 'result', isCorrect,
      score: prev.score + points,
      totalCorrect: isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect,
      totalWrong: isCorrect ? prev.totalWrong : prev.totalWrong + 1,
      celebrationMessage: isCorrect ? `${msg} (+${points} نقاط)` : msg }));
    // Reveal all squares on answer
    setRevealedSquares(Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i));
    playSound(isCorrect ? 'correct' : 'wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state, userInput, revealedSquares.length, nextQuestion, playSound]);

  const handleTimeout = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (revealTimerRef.current) { clearTimeout(revealTimerRef.current); revealTimerRef.current = null; }
    setState(prev => ({
      ...prev, answerPhase: 'result', isCorrect: false,
      totalWrong: prev.totalWrong + 1,
      celebrationMessage: `⏰ الجواب: ${state.currentQ.playerName}` }));
    setRevealedSquares(Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i));
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

  const handleHelpEliminate = () => {
    const hint = state.currentQ.playerName.slice(0, 2);
    setUserInput(hint);
    setHelp1Used(true);
  };

  const handleHelpSolve = () => {
    setUserInput(state.currentQ.playerName);
    setTimeout(() => checkAnswer(), 100);
    setSolveUsed(true);
  };

  const handleHelpSpecial = () => {
    setUserInput(state.currentQ.playerName);
    setTimeout(() => checkAnswer(), 100);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };


  if (state.gameOver) {
    const getFinal = () => {
      if (state.score >= 25) return { title: '🤯 عين الصقر!', subtitle: 'عرفتهم بسرعة خيالية!', emoji: '🦅🏆' };
      if (state.score >= 15) return { title: 'مو بطال! 💪', subtitle: 'بس تقدر أسرع', emoji: '🕵️' };
      return { title: '😐 تحتاج تدريب!', subtitle: 'حاول تعرفهم أسرع!', emoji: '👀' };
    };
    const msg = getFinal();
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-700 to-slate-900" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-black/60 backdrop-blur-md rounded-3xl border border-slate-500/30 max-w-md mx-4 animate-bounce-in">
            <div className="text-center p-8">
              {state.score >= 25 ? <Trophy className="w-24 h-24 mx-auto text-yellow-400 mb-4 animate-pulse" /> : <XCircle className="w-24 h-24 mx-auto text-slate-400 mb-4" />}
              <div className="text-5xl mb-4">{msg.emoji}</div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">{msg.title}</h2>
              <p className="text-lg text-white/70 mb-4">{msg.subtitle}</p>
              <p className="text-2xl text-white mb-8">نقاطك: <span className="text-slate-400 font-bold">{state.score}</span></p>
              <div className="flex flex-col gap-3">
                <button onClick={() => onLevelComplete?.({ score: state.totalCorrect, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start flex items-center gap-2 mx-auto">المستوى التالي 🚀</button>
                <button onClick={onRestart} className="btn-start flex items-center gap-2 mx-auto bg-white/10"><RotateCcw className="w-5 h-5" /> من البداية</button>
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
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-700 to-slate-900" />
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge bg-black/50">🕵️ {state.score}</div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all", state.timeLeft <= 5 ? "bg-red-500/20 text-red-300 animate-pulse" : "bg-slate-700/50 text-slate-300")}>
          <Timer className="w-5 h-5" /> {state.timeLeft}
        </div>
        <div className="bg-yellow-400/20 px-3 py-1 rounded-full text-yellow-400 font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" /> المستوى 38
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-md">
          <p className="text-lg text-white/70 mb-3 text-center">من هذا اللاعب؟ 🕵️</p>
          
          {/* Mystery Image Grid */}
          <div className="relative w-64 h-64 mx-auto mb-4 rounded-2xl overflow-hidden border-2 border-slate-500/30">
            <img 
              src={state.currentQ.playerImage} 
              alt="mystery player" 
              className="w-full h-full object-cover"
            />
            {/* Overlay squares */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "bg-slate-800 transition-all duration-500",
                    revealedSquares.includes(idx) ? "opacity-0" : "opacity-100"
                  )}
                />
              ))}
            </div>
          </div>

          <p className="text-sm text-slate-400 text-center mb-4">
            كشف: {revealedSquares.length}/{GRID_SIZE * GRID_SIZE} | 
            نقاط محتملة: {getPoints(revealedSquares.length)}
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              placeholder="اكتب اسم اللاعب..."
              disabled={state.answerPhase === 'result'}
              className="flex-1 bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-slate-400"
              
            />
            <button
              onClick={checkAnswer}
              disabled={state.answerPhase === 'result' || !userInput.trim()}
              className="bg-slate-600 hover:bg-slate-500 text-white font-bold px-6 py-3 rounded-xl transition-all disabled:opacity-50"
            >
              تأكيد
            </button>
          </div>
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
