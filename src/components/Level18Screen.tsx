import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSound } from '@/hooks/useSound';
import { Timer, Crown, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';
import { StreakOverlay } from './StreakOverlay';
import { getStreakComment } from '@/utils/streakComments';
import { stadiums } from '@/data/stadiums';

const QUESTIONS_COUNT = 10;
const QUESTION_TIME = 20;
const TRANSITION_DELAY = 1200;

interface GameState {
  currentQuestion: number;
  score: number;
  timeLeft: number;
  gameOver: boolean;
  totalCorrect: number;
  totalWrong: number;
  currentStadium: typeof stadiums[0];
  options: string[];
  correctOptionIndex: number;
  selectedOption: number | null;
  answerPhase: 'question' | 'result';
  isCorrect: boolean | null;
  celebrationMessage: string | null;
  usedIds: string[];
  streak: number;
  wrongStreak: number;
  streakMsg: string | null;
  streakTier: 'hype' | 'epic' | 'lose' | null;
}

function generateOptions(correct: typeof stadiums[0]) {
  const others = stadiums.filter(s => s.id !== correct.id).sort(() => Math.random() - 0.5).slice(0, 3);
  const allOptions = [correct, ...others].sort(() => Math.random() - 0.5);
  return { options: allOptions.map(s => s.clubName), correctIndex: allOptions.findIndex(s => s.id === correct.id) };
}

export function Level18Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
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
    const { options, correctIndex } = generateOptions(stadium);
    return {
      currentQuestion: 0, score: 0, timeLeft: QUESTION_TIME, gameOver: false,
      totalCorrect: 0, totalWrong: 0, currentStadium: stadium,
      options, correctOptionIndex: correctIndex,
      selectedOption: null, answerPhase: 'question', isCorrect: null,
      celebrationMessage: null, usedIds: [stadium.id], streak: 0, wrongStreak: 0,
      streakMsg: null as string | null, streakTier: null as 'hype' | 'epic' | 'lose' | null };
  });

  // Auto-solve next question (special help)
  useEffect(() => {
    if (autoSolveNext && state.answerPhase === 'question') {
      setAutoSolveNext(false);
      setTimeout(() => { const correctIdx = state.correctOptionIndex; if (correctIdx !== undefined) handleAnswer(correctIdx); }, 500);
    }
  }, [autoSolveNext, state.currentQuestion, state.answerPhase]);

  const getComment = (correct: number, wrong: number, isCorrect: boolean, streak: number) => {
    if (!isCorrect) {
      if (wrong >= 3) return 'جسمك ضعييييييف 😩';
      return ['غلط! 😅', 'لا مو كذا! 🙃', 'ركز شوي! 😬'][Math.floor(Math.random() * 3)];
    }
    if (streak >= 4) return 'طغيتتتت 🙂🔥';
    if (correct >= 7) return 'ياعف الله 🙂😬';
    if (correct >= 4) return 'كبيرررر! 💪🔥';
    return ['صحيح! 🏟️', 'برافو! 👏', 'ممتاز! ⚽'][Math.floor(Math.random() * 3)];
  };

  const nextQuestion = useCallback(() => {
    setHiddenIndices([]);
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (state.currentQuestion >= QUESTIONS_COUNT - 1) {
      setState(prev => ({ ...prev, gameOver: true }));
      playSound('gameOver'); return;
    }
    const stadium = getNext(state.usedIds);
    const { options, correctIndex } = generateOptions(stadium);
    setState(prev => ({
      ...prev, currentQuestion: prev.currentQuestion + 1, currentStadium: stadium,
      options, correctOptionIndex: correctIndex,
      timeLeft: QUESTION_TIME, selectedOption: null,
      answerPhase: 'question', isCorrect: null, celebrationMessage: null,
      usedIds: [...prev.usedIds, stadium.id] }));
  }, [state.currentQuestion, state.usedIds, playSound]);

  const handleAnswer = useCallback((optionIndex: number) => {
    if (state.answerPhase === 'result') return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    const isCorrect = optionIndex === state.correctOptionIndex;
    const newCorrect = isCorrect ? state.totalCorrect + 1 : state.totalCorrect;
    const newWrong = isCorrect ? state.totalWrong : state.totalWrong + 1;
    const newStreak = isCorrect ? state.streak + 1 : 0;
    const newWrongStreak = isCorrect ? 0 : (state.wrongStreak || 0) + 1;
    const msg = getComment(newCorrect, newWrong, isCorrect, newStreak);

    setState(prev => ({
      ...prev, selectedOption: optionIndex, answerPhase: 'result', isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
      totalCorrect: newCorrect, totalWrong: newWrong, streak: newStreak, wrongStreak: isCorrect ? 0 : prev.wrongStreak + 1,
      celebrationMessage: msg }));
    playSound(isCorrect ? 'correct' : 'wrong');
    setTimeout(() => setState(prev => ({ ...prev, selectedOption: null, answerPhase: 'question', celebrationMessage: null })), TRANSITION_DELAY - 300);
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state, nextQuestion, playSound]);

  const handleTimeout = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setState(prev => ({
      ...prev, answerPhase: 'result', isCorrect: false,
      totalWrong: prev.totalWrong + 1, streak: 0, wrongStreak: 0,
      streakMsg: null as string | null, streakTier: null as 'hype' | 'epic' | 'lose' | null,
      celebrationMessage: `⏰ انتهى الوقت! الجواب: ${state.currentStadium.clubName}` }));
    playSound('wrong');
    setTimeout(() => setState(prev => ({ ...prev, selectedOption: null, answerPhase: 'question', celebrationMessage: null })), TRANSITION_DELAY - 300);
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state.currentStadium, playSound, nextQuestion]);

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
    const correctIdx = state.correctOptionIndex;
    if (correctIdx === undefined) return;
    const wrongIdxs = (state.options || []).map((_: any, i: number) => i).filter((i: number) => i !== correctIdx);
    const toHide = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenIndices(toHide);
    setHelp1Used(true);
  };

  const handleHelpSolve = () => {
    const correctIdx = state.correctOptionIndex;
    if (correctIdx !== undefined) handleAnswer(correctIdx);
    setSolveUsed(true);
  };

  const handleHelpSpecial = () => {
    const correctIdx = state.correctOptionIndex;
    if (correctIdx !== undefined) handleAnswer(correctIdx);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };


  if (state.gameOver) {
    const getFinal = () => {
      if (state.totalCorrect >= 8) return { title: 'طغيتتتت 🙂🔥', subtitle: 'ياعف الله 🙂😬', emoji: '🏟️🏆' };
      if (state.totalCorrect >= 5) return { title: 'كبيرررر! 💪', subtitle: 'بس تقدر أحسن', emoji: '🏟️' };
      return { title: 'جسمك ضعييييييف 😩', subtitle: 'روح تعلم الملاعب!', emoji: '📖' };
    };
    const msg = getFinal();

    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900 via-teal-700 to-teal-800" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-black/60 backdrop-blur-md rounded-3xl border border-teal-500/30 max-w-md mx-4 animate-bounce-in">
            <div className="text-center p-8">
              {state.totalCorrect >= 8 ? <Trophy className="w-24 h-24 mx-auto text-yellow-400 mb-4 animate-pulse" /> : <XCircle className="w-24 h-24 mx-auto text-teal-400 mb-4" />}
              <div className="text-5xl mb-4">{msg.emoji}</div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">{msg.title}</h2>
              <p className="text-lg text-white/70 mb-4">{msg.subtitle}</p>
              <p className="text-2xl text-white mb-8">نتيجتك: <span className="text-teal-400 font-bold">{state.totalCorrect}</span> من {QUESTIONS_COUNT}</p>
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
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900 via-teal-700 to-teal-800" />
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge bg-black/50">🏟️ {state.score}</div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all", state.timeLeft <= 3 ? "bg-red-500/20 text-red-300 animate-pulse" : "bg-teal-700/50 text-teal-300")}>
          <Timer className="w-5 h-5" /> {state.timeLeft}
        </div>
        <div className="bg-yellow-400/20 px-3 py-1 rounded-full text-yellow-400 font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" /> المستوى 18
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-2xl">
          <div className="bg-black/50 backdrop-blur-sm border border-teal-500/30 rounded-2xl p-6 mb-6 text-center">
            <p className="text-lg text-white/70 mb-4">ملعب أي نادي؟ 🏟️</p>
            <div className="flex justify-center mb-4">
              <img src={state.currentStadium.image} alt="ملعب" className="w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover border-2 border-teal-400/50 shadow-lg" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {state.options.map((option, index) => {
              if (hiddenIndices.includes(index)) return <div key={index} className="p-3 rounded-2xl border-2 border-white/10 bg-black/20 opacity-20 min-h-[52px]" />;
              const isSelected = state.selectedOption === index;
              const isCorrectOption = index === state.correctOptionIndex;
              const showResult = state.answerPhase === 'result';
              return (
                <button key={index} onClick={() => handleAnswer(index)} disabled={showResult}
                  className={cn("py-4 px-6 rounded-2xl font-bold text-lg transition-all text-right",
                    showResult && isCorrectOption ? "bg-emerald-500/40 border-2 border-emerald-400 text-emerald-300" :
                    showResult && isSelected && !isCorrectOption ? "bg-red-500/40 border-2 border-red-400 text-red-300" :
                    !showResult ? "bg-black/40 border-2 border-white/20 text-white hover:border-teal-400 hover:bg-teal-500/20 active:scale-95" :
                    "bg-black/20 border-2 border-white/10 text-white/40")}>
                  {option}
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
