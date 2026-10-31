import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSound } from '@/hooks/useSound';
import { Timer, Crown, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';
import { StreakOverlay } from './StreakOverlay';
import { getStreakComment } from '@/utils/streakComments';
import { kidPhotoQuestions } from '@/data/level23KidPhotos';

const QUESTIONS_COUNT = 10;
const QUESTION_TIME = 20;
const TRANSITION_DELAY = 1000;

function getComment(correct: number, wrong: number, isCorrect: boolean, streak: number) {
  if (!isCorrect) {
    if (wrong >= 4) return '🤣🌚 ياغبي ركز شوي!';
    if (wrong >= 2) return '😂 مستحيل ما عرفته!';
    return ['غلط! 🙃', 'لا مو هو! 😅', 'حاول مرة ثانية! 😬'][Math.floor(Math.random() * 3)];
  }
  if (streak >= 4) return '😬 اوووووو شت! ما يوقف!';
  if (streak >= 3) return '🔥 اوووو شت! سلسلة نارية!';
  if (correct >= 7) return '😬 اوووو شت عرفتهم كلهم!';
  return ['صحيح! 👏', 'برافو! 🔥', 'عرفته! 💪', 'ممتاز! 🎯'][Math.floor(Math.random() * 4)];
}

interface GameState {
  currentQuestion: number;
  score: number;
  timeLeft: number;
  gameOver: boolean;
  totalCorrect: number;
  totalWrong: number;
  currentQ: typeof kidPhotoQuestions[0];
  userInput: string;
  answerPhase: 'question' | 'result';
  isCorrect: boolean | null;
  celebrationMessage: string | null;
  usedIds: number[];
  streak: number;
  wrongStreak: number;
  streakMsg: string | null;
  streakTier: 'hype' | 'epic' | 'lose' | null;
  showHint: boolean;
}

export function Level23Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
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
    const available = kidPhotoQuestions.filter(q => !used.includes(q.id));
    const pool = available.length > 0 ? available : kidPhotoQuestions;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const [state, setState] = useState<GameState>(() => {
    const q = getNext([]);
    return {
      currentQuestion: 0, score: 0, timeLeft: QUESTION_TIME, gameOver: false,
      totalCorrect: 0, totalWrong: 0, currentQ: q, userInput: '',
      selectedOption: null, answerPhase: 'question', isCorrect: null,
      celebrationMessage: null, usedIds: [q.id], streak: 0, wrongStreak: 0, showHint: false,
      streakMsg: null as string | null, streakTier: null as 'hype' | 'epic' | 'lose' | null };
  });

  // Auto-solve next question (special help)
  useEffect(() => {
    if (autoSolveNext && state.answerPhase === 'question') {
      setAutoSolveNext(false);
      setTimeout(() => { setTimeout(() => checkAnswer(state.currentQ.playerName), 300); }, 500);
    }
  }, [autoSolveNext, state.currentQuestion, state.answerPhase]);

  const nextQuestion = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (state.currentQuestion >= QUESTIONS_COUNT - 1) {
      setState(prev => ({ ...prev, gameOver: true }));
      playSound('gameOver'); return;
    }
    const q = getNext(state.usedIds);
    setState(prev => ({
      ...prev, currentQuestion: prev.currentQuestion + 1, currentQ: q,
      timeLeft: QUESTION_TIME, userInput: '',
      answerPhase: 'question', isCorrect: null, celebrationMessage: null,
      usedIds: [...prev.usedIds, q.id], showHint: false }));
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [state.currentQuestion, state.usedIds, playSound]);

  const checkAnswer = useCallback((input: string) => {
    if (state.answerPhase === 'result') return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    const normalized = input.trim().toLowerCase();
    const isCorrect = state.currentQ.acceptedAnswers.some(a => a.toLowerCase() === normalized);
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

  const handleTimeout = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setState(prev => ({
      ...prev, answerPhase: 'result', isCorrect: false,
      totalWrong: prev.totalWrong + 1, streak: 0, wrongStreak: 0,
      streakMsg: null as string | null, streakTier: null as 'hype' | 'epic' | 'lose' | null,
      celebrationMessage: `⏰ الجواب: ${state.currentQ.playerName}` }));
    playSound('wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state.currentQ, playSound, nextQuestion]);

  useEffect(() => {
    if (state.answerPhase !== 'question' || state.gameOver || isPaused) return;
    timerRef.current = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 0) return prev;
        if (prev.timeLeft <= 8 && !prev.showHint) return { ...prev, timeLeft: Math.max(0, prev.timeLeft - 1), showHint: true };
        return { ...prev, timeLeft: Math.max(0, prev.timeLeft - 1) };
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state.answerPhase, state.gameOver, state.currentQuestion, isPaused]);

  useEffect(() => {
    if (state.answerPhase === 'question' && state.timeLeft <= 0) handleTimeout();
  }, [state.timeLeft, state.answerPhase, handleTimeout]);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 200); }, []);

  const handleHelpEliminate = () => {
    const hint = state.currentQ.playerName.slice(0, 2);
    setState(prev => ({ ...prev, userInput: hint }));
    setHelp1Used(true);
  };
  const handleHelpSolve = () => {
    setState(prev => ({ ...prev, userInput: state.currentQ.playerName }));
    setSolveUsed(true);
    setTimeout(() => checkAnswer(state.currentQ.playerName), 300);
  };
  const handleHelpSpecial = () => {
    setState(prev => ({ ...prev, userInput: state.currentQ.playerName }));
    setSpecialUsed(true);
    setAutoSolveNext(true);
    setTimeout(() => checkAnswer(state.currentQ.playerName), 300);
  };


  if (state.gameOver) {
    const getFinal = () => {
      if (state.totalCorrect >= 8) return { title: '😬 اوووو شت! عبقري!', subtitle: 'عرفتهم كلهم وهم صغار!', emoji: '👶🏆' };
      if (state.totalCorrect >= 5) return { title: 'مو بطال! 💪', subtitle: 'بس فيه أحسن منك', emoji: '👶' };
      return { title: '🤣🌚 ياغبي!', subtitle: 'ما تعرف أحد وهو صغير!', emoji: '📖' };
    };
    const msg = getFinal();

    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-700 to-purple-900" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-black/60 backdrop-blur-md rounded-3xl border border-purple-500/30 max-w-md mx-4 animate-bounce-in">
            <div className="text-center p-8">
              {state.totalCorrect >= 8 ? <Trophy className="w-24 h-24 mx-auto text-yellow-400 mb-4 animate-pulse" /> : <XCircle className="w-24 h-24 mx-auto text-purple-400 mb-4" />}
              <div className="text-5xl mb-4">{msg.emoji}</div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">{msg.title}</h2>
              <p className="text-lg text-white/70 mb-4">{msg.subtitle}</p>
              <p className="text-2xl text-white mb-8">نتيجتك: <span className="text-purple-400 font-bold">{state.totalCorrect}</span> من {QUESTIONS_COUNT}</p>
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
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-700 to-purple-900" />
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge bg-black/50">👶 {state.score}</div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all", state.timeLeft <= 3 ? "bg-red-500/20 text-red-300 animate-pulse" : "bg-purple-700/50 text-purple-300")}>
          <Timer className="w-5 h-5" /> {state.timeLeft}
        </div>
        <div className="bg-yellow-400/20 px-3 py-1 rounded-full text-yellow-400 font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" /> المستوى 23
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-lg">
          <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-4 mb-4 text-center">
            <p className="text-lg text-white/70 mb-2">من هذا اللاعب وهو صغير؟ 👶</p>
          </div>

          <div className="flex justify-center mb-4">
            <div className={cn("rounded-2xl overflow-hidden border-4 transition-all",
              state.answerPhase === 'result' && state.isCorrect ? "border-green-400" :
              state.answerPhase === 'result' && !state.isCorrect ? "border-red-400" :
              "border-purple-400/50"
            )}>
              <img src={state.currentQ.image} alt="لاعب وهو صغير" className="w-48 h-56 md:w-56 md:h-64 object-cover" />
            </div>
          </div>

          {state.answerPhase === 'result' && (
            <div className="text-center mb-3 animate-bounce-in">
              <p className="text-xl text-yellow-400 font-black">الجواب: {state.currentQ.playerName}</p>
            </div>
          )}

          {state.showHint && state.answerPhase === 'question' && (
            <div className="text-center mb-3 animate-bounce-in">
              <p className="text-sm text-purple-300 bg-purple-500/20 rounded-xl px-4 py-2 inline-block">💡 {state.currentQ.hint}</p>
            </div>
          )}

          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={state.userInput}
              onChange={e => setState(prev => ({ ...prev, userInput: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && state.userInput.trim() && checkAnswer(state.userInput)}
              disabled={state.answerPhase === 'result'}
              placeholder="اكتب اسم اللاعب..."
              className="flex-1 bg-black/40 border-2 border-white/20 rounded-2xl px-4 py-3 text-white text-lg font-bold text-center placeholder:text-white/30 focus:border-purple-400 focus:outline-none disabled:opacity-50"
              
            />
            <button
              onClick={() => state.userInput.trim() && checkAnswer(state.userInput)}
              disabled={state.answerPhase === 'result' || !state.userInput.trim()}
              className="bg-purple-500/40 border-2 border-purple-400/50 rounded-2xl px-6 py-3 text-white font-bold hover:bg-purple-500/60 active:scale-95 disabled:opacity-50 transition-all"
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
