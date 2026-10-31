import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSound } from '@/hooks/useSound';
import { Timer, Crown, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GameControls } from './GameControls';
import { StreakOverlay } from './StreakOverlay';
import { getStreakComment } from '@/utils/streakComments';
import { HelpBar } from './HelpBar';
import { clasicoStartQuestions } from '@/data/level43ClassicoStart';

const QUESTIONS_COUNT = 10;
const QUESTION_TIME = 20;
const TRANSITION_DELAY = 1200;

function getComment(isCorrect: boolean, streak: number) {
  if (!isCorrect) {
    const msgs = ['😐 غلط!', '🙃 مو هو!', '😬 حاول ثاني!'];
    return msgs[Math.floor(Math.random() * msgs.length)];
  }
  if (streak >= 4) return '🤯 ماكينة الكلاسيكو!';
  if (streak >= 3) return '🔥 هاتريك!';
  return ['صحيح! ⚔️', 'برافو! 👏', 'ممتاز! 🎯'][Math.floor(Math.random() * 3)];
}

export function Level43Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);

  const getNext = (used: number[]) => {
    const available = clasicoStartQuestions.filter(q => !used.includes(q.id));
    const pool = available.length > 0 ? available : clasicoStartQuestions;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const [state, setState] = useState(() => {
    const q = getNext([]);
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);
    return {
      currentQuestion: 0, score: 0, timeLeft: QUESTION_TIME, gameOver: false,
      totalCorrect: 0, totalWrong: 0, currentQ: q,
      shuffledOptions: shuffled, selectedOption: null as number | null,
      answerPhase: 'question' as 'question' | 'result',
      isCorrect: null as boolean | null, celebrationMessage: null as string | null,
      usedIds: [q.id], streak: 0, wrongStreak: 0,
      streakMsg: null as string | null, streakTier: null as 'hype' | 'epic' | 'lose' | null };
  });

  const nextQuestion = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (state.currentQuestion >= QUESTIONS_COUNT - 1) {
      setState(prev => ({ ...prev, gameOver: true }));
      playSound('gameOver'); return;
    }
    const q = getNext(state.usedIds);
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);
    setState(prev => ({
      ...prev, currentQuestion: prev.currentQuestion + 1, currentQ: q,
      shuffledOptions: shuffled, timeLeft: QUESTION_TIME, selectedOption: null,
      answerPhase: 'question', isCorrect: null, celebrationMessage: null,
      usedIds: [...prev.usedIds, q.id] }));
    setHelp1Used(false);
    setSolveUsed(false);
    setSpecialUsed(false);
    setHiddenIndices([]);
  }, [state.currentQuestion, state.usedIds, playSound]);

  useEffect(() => {
    if (autoSolveNext && state.answerPhase === 'question') {
      setAutoSolveNext(false);
      const correctIdx = state.shuffledOptions.findIndex(o => o === state.currentQ.correctPlayer);
      if (correctIdx !== -1) setTimeout(() => checkAnswer(correctIdx), 500);
    }
  }, [autoSolveNext, state.currentQuestion, state.answerPhase]);

  const checkAnswer = useCallback((optionIdx: number) => {
    if (state.answerPhase === 'result') return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    const selected = state.shuffledOptions[optionIdx];
    const isCorrect = selected === state.currentQ.correctPlayer;
    const newStreak = isCorrect ? state.streak + 1 : 0;
    const newWrongStreak = isCorrect ? 0 : (state.wrongStreak || 0) + 1;
    const msg = getComment(isCorrect, newStreak);
    setState(prev => ({
      ...prev, selectedOption: optionIdx, answerPhase: 'result', isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
      totalCorrect: isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect,
      totalWrong: isCorrect ? prev.totalWrong : prev.totalWrong + 1,
      streak: newStreak, wrongStreak: isCorrect ? 0 : prev.wrongStreak + 1, celebrationMessage: msg,
      streakMsg: (() => { const sc = getStreakComment(newStreak, isCorrect ? 0 : (state.wrongStreak || 0) + 1); return sc ? sc.message : null; })(),
      streakTier: (() => { const sc = getStreakComment(newStreak, isCorrect ? 0 : (state.wrongStreak || 0) + 1); return sc ? sc.tier : null; })() }));
    playSound(isCorrect ? 'correct' : 'wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state, nextQuestion, playSound]);

  const handleTimeout = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setState(prev => ({
      ...prev, answerPhase: 'result', isCorrect: false,
      totalWrong: prev.totalWrong + 1, streak: 0, wrongStreak: 0,
      streakMsg: null as string | null, streakTier: null as 'hype' | 'epic' | 'lose' | null,
      celebrationMessage: `⏰ الجواب: ${state.currentQ.correctPlayer}` }));
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

  const handleEliminateTwo = () => {
    const correctIdx = state.shuffledOptions.findIndex(o => o === state.currentQ.correctPlayer);
    const wrongIndices = state.shuffledOptions.map((_, i) => i).filter(i => i !== correctIdx);
    const toHide = wrongIndices.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenIndices(toHide);
    setHelp1Used(true);
  };

  const handleSolve = () => {
    const correctIdx = state.shuffledOptions.findIndex(o => o === state.currentQ.correctPlayer);
    if (correctIdx !== -1) checkAnswer(correctIdx);
    setSolveUsed(true);
  };

  const handleSpecialSolve = () => {
    const correctIdx = state.shuffledOptions.findIndex(o => o === state.currentQ.correctPlayer);
    if (correctIdx !== -1) checkAnswer(correctIdx);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };

  if (state.gameOver) {
    const pct = (state.totalCorrect / QUESTIONS_COUNT) * 100;
    const getFinal = () => {
      if (pct >= 80) return { title: '⚔️ بطل الكلاسيكو!', subtitle: 'أداء خرافي!', emoji: '👑🏆' };
      if (pct >= 50) return { title: 'مو بطال! ⚔️', subtitle: 'بس تقدر أحسن', emoji: '💪' };
      return { title: '😐 محتاج تدريب!', subtitle: 'الكلاسيكو صعب!', emoji: '📺' };
    };
    const msg = getFinal();
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900 via-blue-900 to-red-900" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-black/60 backdrop-blur-md rounded-3xl border border-yellow-500/30 max-w-md mx-4 animate-bounce-in">
            <div className="text-center p-8">
              {pct >= 80 ? <Trophy className="w-24 h-24 mx-auto text-yellow-400 mb-4 animate-pulse" /> : <XCircle className="w-24 h-24 mx-auto text-red-400 mb-4" />}
              <div className="text-5xl mb-4">{msg.emoji}</div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">{msg.title}</h2>
              <p className="text-lg text-white/70 mb-4">{msg.subtitle}</p>
              <p className="text-2xl text-white mb-2">{state.totalCorrect} / {QUESTIONS_COUNT}</p>
              <div className="flex flex-col gap-3 mt-6">
                <button onClick={() => onLevelComplete?.({ score: state.totalCorrect, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start flex items-center gap-2 mx-auto">المستوى التالي ⚔️</button>
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
      <div className="absolute inset-0 bg-gradient-to-b from-red-900 via-blue-900 to-red-900" />
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge bg-black/50">⚔️ {state.score}</div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all", state.timeLeft <= 2 ? "bg-red-500/20 text-red-300 animate-pulse" : "bg-blue-700/50 text-blue-300")}>
          <Timer className="w-5 h-5" /> {state.timeLeft}
        </div>
        <div className="bg-yellow-400/20 px-3 py-1 rounded-full text-yellow-400 font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" /> المستوى 43
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-lg">
          <div className="bg-black/50 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6 mb-4 text-center">
            <p className="text-lg text-white/70 mb-3">من هذا اللاعب؟ ⚔️</p>
            <div className="space-y-2">
              {state.currentQ.clues.map((clue, idx) => (
                <div key={idx} className="bg-yellow-500/10 border border-yellow-400/20 rounded-xl p-3">
                  <p className="text-lg font-bold text-yellow-200">💡 {clue}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {state.shuffledOptions.map((option, idx) => {
              if (hiddenIndices.includes(idx)) return <div key={idx} className="p-3 rounded-2xl border-2 border-white/5 bg-black/10 opacity-20" />;
              const isSelected = state.selectedOption === idx;
              const isCorrectOption = option === state.currentQ.correctPlayer;
              const showResult = state.answerPhase === 'result';
              return (
                <button key={idx} onClick={() => checkAnswer(idx)} disabled={showResult}
                  className={cn("p-3 rounded-2xl font-bold text-lg border-2 transition-all active:scale-95",
                    showResult && isCorrectOption ? "bg-green-500/30 border-green-400 text-green-300"
                    : showResult && isSelected && !isCorrectOption ? "bg-red-500/30 border-red-400 text-red-300"
                    : "bg-black/40 border-white/20 text-white hover:border-yellow-400/50 hover:bg-yellow-500/20"
                  )}>{option}</button>
              );
            })}
          </div>

          <HelpBar
            questionType="choice"
            onHelp1={handleEliminateTwo}
            onSolve={handleSolve}
            onSpecialSolve={handleSpecialSolve}
            onSkipLevel={onLevelComplete}
            help1Used={help1Used}
            solveUsed={solveUsed}
            specialUsed={specialUsed}
            disabled={state.answerPhase === 'result' || state.gameOver}
          />
        </div>
      </div>

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
