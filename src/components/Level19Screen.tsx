import { useCallback, useEffect, useRef, useState } from 'react';
import type { LevelResult } from '@/types/levelProgression';
import { coachAchievementQuestions, getCoachName } from '@/data/level19Questions';
import { useI18n } from '@/i18n/I18nProvider';
import { useSound } from '@/hooks/useSound';
import { Timer, Crown, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';

const QUESTIONS_COUNT = 20;
const QUESTION_TIME = 20;
const TRANSITION_DELAY = 1200;

function getNextQuestion(usedIds: number[]) {
  const available = coachAchievementQuestions.filter((question) => !usedIds.includes(question.id));
  const pool = available.length ? available : coachAchievementQuestions;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function Level19Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const { locale, isArabic } = useI18n();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [autoSolveNext, setAutoSolveNext] = useState(false);
  const [state, setState] = useState(() => {
    const first = getNextQuestion([]);
    return {
      currentQuestion: 0,
      score: 0,
      timeLeft: QUESTION_TIME,
      gameOver: false,
      totalCorrect: 0,
      currentQ: first,
      revealedClues: 1,
      selectedOption: null as number | null,
      answerPhase: 'question' as 'question' | 'result',
      isCorrect: null as boolean | null,
      celebrationMessage: null as string | null,
      usedIds: [first.id],
    };
  });

  const advance = useCallback(() => {
    setHiddenIndices([]);
    setHelp1Used(false);
    setSolveUsed(false);
    setSpecialUsed(false);
    if (state.currentQuestion >= QUESTIONS_COUNT - 1) {
      setState((previous) => ({ ...previous, gameOver: true }));
      playSound('gameOver');
      return;
    }
    const next = getNextQuestion(state.usedIds);
    setState((previous) => ({
      ...previous,
      currentQuestion: previous.currentQuestion + 1,
      currentQ: next,
      revealedClues: 1,
      timeLeft: QUESTION_TIME,
      selectedOption: null,
      answerPhase: 'question',
      isCorrect: null,
      celebrationMessage: null,
      usedIds: [...previous.usedIds, next.id],
    }));
  }, [state.currentQuestion, state.usedIds, playSound]);

  const handleAnswer = useCallback((optionIndex: number) => {
    if (state.answerPhase === 'result' || state.gameOver) return;
    const correct = optionIndex === state.currentQ.correctIndex;
    const answerName = getCoachName(state.currentQ.options[state.currentQ.correctIndex], locale);
    setState((previous) => ({
      ...previous,
      selectedOption: optionIndex,
      answerPhase: 'result',
      isCorrect: correct,
      score: correct ? previous.score + 1 : previous.score,
      totalCorrect: correct ? previous.totalCorrect + 1 : previous.totalCorrect,
      revealedClues: previous.currentQ.achievementsAr.length,
      celebrationMessage: correct
        ? (isArabic ? 'إجابة صحيحة! أحسنت 👏' : 'Correct! Well spotted 👏')
        : (isArabic ? `الإجابة: ${answerName}` : `Answer: ${answerName}`),
    }));
    playSound(correct ? 'correct' : 'wrong');
    if (transitionRef.current) clearTimeout(transitionRef.current);
    transitionRef.current = setTimeout(advance, TRANSITION_DELAY);
  }, [state.answerPhase, state.gameOver, state.currentQ, locale, isArabic, playSound, advance]);

  const handleTimeout = useCallback(() => {
    if (state.answerPhase !== 'question' || state.gameOver) return;
    const answerName = getCoachName(state.currentQ.options[state.currentQ.correctIndex], locale);
    setState((previous) => ({
      ...previous,
      answerPhase: 'result',
      isCorrect: false,
      selectedOption: null,
      totalCorrect: previous.totalCorrect,
      revealedClues: previous.currentQ.achievementsAr.length,
      celebrationMessage: isArabic ? `انتهى الوقت! الإجابة: ${answerName}` : `Time is up! Answer: ${answerName}`,
    }));
    playSound('wrong');
    transitionRef.current = setTimeout(advance, TRANSITION_DELAY);
  }, [state.answerPhase, state.gameOver, state.currentQ, locale, isArabic, playSound, advance]);

  useEffect(() => {
    if (state.answerPhase !== 'question' || state.gameOver || isPaused) return;
    timerRef.current = setInterval(() => {
      setState((previous) => ({ ...previous, timeLeft: Math.max(0, previous.timeLeft - 1) }));
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state.answerPhase, state.gameOver, state.currentQuestion, isPaused]);

  useEffect(() => {
    if (state.timeLeft === 0 && state.answerPhase === 'question') handleTimeout();
  }, [state.timeLeft, state.answerPhase, handleTimeout]);

  useEffect(() => {
    if (state.answerPhase !== 'question' || state.gameOver || isPaused) return;
    if (state.revealedClues >= state.currentQ.achievementsAr.length) return;
    const timer = setTimeout(() => setState((previous) => ({ ...previous, revealedClues: previous.revealedClues + 1 })), 2200);
    return () => clearTimeout(timer);
  }, [state.revealedClues, state.answerPhase, state.gameOver, state.currentQ, isPaused]);

  useEffect(() => {
    if (!autoSolveNext || state.answerPhase !== 'question') return;
    setAutoSolveNext(false);
    const timer = setTimeout(() => handleAnswer(state.currentQ.correctIndex), 400);
    return () => clearTimeout(timer);
  }, [autoSolveNext, state.answerPhase, state.currentQuestion, state.currentQ.correctIndex, handleAnswer]);

  const handleEliminate = () => {
    const wrongIndices = state.currentQ.options.map((_, index) => index).filter((index) => index !== state.currentQ.correctIndex);
    setHiddenIndices(wrongIndices.sort(() => Math.random() - 0.5).slice(0, 2));
    setHelp1Used(true);
  };
  const handleSolve = () => { handleAnswer(state.currentQ.correctIndex); setSolveUsed(true); };
  const handleSpecial = () => { handleAnswer(state.currentQ.correctIndex); setSpecialUsed(true); setAutoSolveNext(true); };

  if (state.gameOver) {
    const expert = state.totalCorrect >= 12;
    const solid = state.totalCorrect >= 7;
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-purple-800 to-slate-950" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-black/60 backdrop-blur-md rounded-3xl border border-purple-400/30 max-w-md mx-4">
            <div className="text-center p-8">
              {expert ? <Trophy className="w-24 h-24 mx-auto text-yellow-400 mb-4" /> : <XCircle className="w-24 h-24 mx-auto text-purple-300 mb-4" />}
              <div className="text-5xl mb-4">{expert ? '🏆🧠' : solid ? '🧑‍🏫' : '📖'}</div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">{expert ? (isArabic ? 'خبير مدربين!' : 'Coaching expert!') : solid ? (isArabic ? 'أداء قوي!' : 'Strong run!') : (isArabic ? 'جولة للتعلّم' : 'A learning round')}</h2>
              <p className="text-lg text-white/70 mb-4">{isArabic ? 'عشرون سؤالاً عن إنجازات المدربين في سبعة دوريات.' : 'Twenty questions on manager records across seven leagues.'}</p>
              <p className="text-2xl text-white mb-8">{isArabic ? 'نتيجتك:' : 'Your score:'} <span className="text-purple-300 font-bold">{state.totalCorrect}</span> / {QUESTIONS_COUNT}</p>
              <div className="flex flex-col gap-3">
                <button onClick={() => onLevelComplete?.({ score: state.totalCorrect, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start mx-auto">{isArabic ? 'المرحلة التالية 🏆' : 'Next stage 🏆'}</button>
                <button onClick={onRestart} className="btn-start mx-auto opacity-70"><RotateCcw className="w-5 h-5 inline" /> {isArabic ? 'العب من جديد' : 'Play again'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const clues = isArabic ? state.currentQ.achievementsAr : state.currentQ.achievementsEn;
  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col relative overflow-hidden">
      <GameControls onExit={onRestart} onPause={() => setIsPaused(true)} onResume={() => setIsPaused(false)} isPaused={isPaused} />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-purple-800 to-slate-950" />
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
          <div className="score-badge bg-black/50">🏆 {state.score}</div>
          <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        <div className={cn('flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg', state.timeLeft <= 4 ? 'bg-red-500/20 text-red-300 animate-pulse' : 'bg-purple-700/50 text-purple-200')}>
          <Timer className="w-5 h-5" /> {state.timeLeft}
        </div>
        <div className="bg-yellow-400/20 px-3 py-1 rounded-full text-yellow-300 font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" /> {isArabic ? 'المرحلة 19' : 'Stage 19'}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-2xl">
          <div className="bg-black/50 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-6 mb-6 text-center">
            <p className="text-lg text-white/70 mb-3">{isArabic ? 'حدّد المدرب من الإنجازات' : 'Identify the manager from the record'} 🧑‍🏫</p>
            <div className="space-y-3">
              {clues.slice(0, state.revealedClues).map((clue, index) => (
                <div key={index} className="bg-purple-500/20 border border-purple-400/30 rounded-xl p-3 animate-bounce-in">
                  <p className={cn('text-white font-bold', isArabic ? 'text-right' : 'text-left')}>🔍 {clue}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {state.currentQ.options.map((option, index) => {
              if (hiddenIndices.includes(index)) return <div key={option.id} className="p-3 rounded-2xl border-2 border-white/10 bg-black/20 opacity-20 min-h-[52px]" />;
              const isSelected = state.selectedOption === index;
              const isCorrectOption = index === state.currentQ.correctIndex;
              const showResult = state.answerPhase === 'result';
              return (
                <button key={option.id} onClick={() => handleAnswer(index)} disabled={showResult}
                  className={cn('py-4 px-6 rounded-2xl font-bold text-lg transition-all', isArabic ? 'text-right' : 'text-left',
                    showResult && isCorrectOption ? 'bg-emerald-500/40 border-2 border-emerald-400 text-emerald-300' :
                    showResult && isSelected && !isCorrectOption ? 'bg-red-500/40 border-2 border-red-400 text-red-300' :
                    !showResult ? 'bg-black/40 border-2 border-white/20 text-white hover:border-purple-400 hover:bg-purple-500/20 active:scale-95' :
                    'bg-black/20 border-2 border-white/10 text-white/40')}>
                  {getCoachName(option, locale)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <HelpBar questionType="choice" onHelp1={handleEliminate} onSolve={handleSolve} onSpecialSolve={handleSpecial}
        onSkipLevel={onLevelComplete || onRestart} help1Used={help1Used} solveUsed={solveUsed} specialUsed={specialUsed}
        disabled={state.answerPhase === 'result' || state.gameOver} />

      {state.celebrationMessage && (
        <div className="fixed top-24 left-0 right-0 pointer-events-none flex justify-center z-20">
          <div className={cn('p-4 px-8 rounded-2xl border-2 backdrop-blur-sm text-center max-w-sm', state.isCorrect ? 'bg-green-500/30 border-green-400/50' : 'bg-red-500/30 border-red-400/50')}>
            <p className={cn('text-lg md:text-xl font-black', state.isCorrect ? 'text-green-300' : 'text-red-300')}>{state.celebrationMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
