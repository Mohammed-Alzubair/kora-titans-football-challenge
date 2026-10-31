import { useCallback, useEffect, useRef, useState } from 'react';
import { Crown, RotateCcw, Timer, Trophy, XCircle } from 'lucide-react';
import type { LevelResult } from '@/types/levelProgression';
import { useSound } from '@/hooks/useSound';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';
import { StreakOverlay } from './StreakOverlay';
import { playerClubQuestions, type PlayerClubQuestion } from '@/data/level29PlayerClubs';
import { getLeagueClub, getLeagueOptions, type LeagueClub } from '@/data/leagues';
import { useI18n } from '@/i18n/I18nProvider';
import { ClubBadge } from './FootballBadges';

const QUESTIONS_COUNT = 20;
const QUESTION_TIME = 20;
const TRANSITION_DELAY = 1100;

interface GameState {
  currentQuestion: number;
  score: number;
  timeLeft: number;
  gameOver: boolean;
  totalCorrect: number;
  currentQ: PlayerClubQuestion;
  shuffledOptions: LeagueClub[];
  shuffledCorrectIndex: number;
  selectedOption: number | null;
  answered: boolean;
  isCorrect: boolean | null;
  celebrationMessage: string | null;
  usedIds: number[];
  showHint: boolean;
}

function buildQuestion(q: PlayerClubQuestion) {
  const options = getLeagueOptions(q.leagueId, q.correctClubId);
  const correctIndex = options.findIndex((club) => club.id === q.correctClubId);
  if (options.length !== 4 || correctIndex < 0 || options.some((club) => club.leagueId !== q.leagueId)) {
    throw new Error(`Invalid club quiz data for question ${q.id}: the answer and all choices must belong to ${q.leagueId}.`);
  }
  return { options, correctIndex };
}

function pickNext(usedIds: number[]) {
  const pool = playerClubQuestions.filter((question) => !usedIds.includes(question.id));
  return pool[Math.floor(Math.random() * pool.length)] ?? playerClubQuestions[0];
}

export function Level29Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const { locale, isArabic, direction, t } = useI18n();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);
  const [state, setState] = useState<GameState>(() => {
    const question = pickNext([]);
    const built = buildQuestion(question);
    return {
      currentQuestion: 0, score: 0, timeLeft: QUESTION_TIME, gameOver: false, totalCorrect: 0,
      currentQ: question, shuffledOptions: built.options, shuffledCorrectIndex: built.correctIndex,
      selectedOption: null, answered: false, isCorrect: null, celebrationMessage: null,
      usedIds: [question.id], showHint: false,
    };
  });

  const nextQuestion = useCallback(() => {
    setHiddenIndices([]);
    if (state.currentQuestion >= QUESTIONS_COUNT - 1) {
      setState((previous) => ({ ...previous, gameOver: true }));
      playSound('gameOver');
      return;
    }
    const question = pickNext(state.usedIds);
    const built = buildQuestion(question);
    setState((previous) => ({
      ...previous,
      currentQuestion: previous.currentQuestion + 1,
      currentQ: question,
      shuffledOptions: built.options,
      shuffledCorrectIndex: built.correctIndex,
      timeLeft: QUESTION_TIME,
      selectedOption: null,
      answered: false,
      isCorrect: null,
      celebrationMessage: null,
      usedIds: [...previous.usedIds, question.id],
      showHint: false,
    }));
  }, [state.currentQuestion, state.usedIds, playSound]);

  const answerQuestion = useCallback((optionIndex: number, timedOut = false) => {
    if (state.answered || state.gameOver) return;
    const correct = !timedOut && optionIndex === state.shuffledCorrectIndex;
    const correctClub = getLeagueClub(state.currentQ.correctClubId);
    const message = timedOut
      ? `⏰ ${t('correctClub')}: ${locale === 'ar' ? correctClub.nameAr : correctClub.nameEn}`
      : correct
        ? (isArabic ? 'إجابة صحيحة! 👏' : 'Correct answer! 👏')
        : (isArabic ? 'إجابة غير صحيحة، تعلّمها للجولة القادمة.' : 'Not quite. Keep it in mind for the next round.');
    setState((previous) => ({
      ...previous,
      answered: true,
      selectedOption: timedOut ? null : optionIndex,
      isCorrect: correct,
      score: correct ? previous.score + 1 : previous.score,
      totalCorrect: correct ? previous.totalCorrect + 1 : previous.totalCorrect,
      celebrationMessage: message,
    }));
    playSound(correct ? 'correct' : 'wrong');
    nextTimeoutRef.current = setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state.answered, state.gameOver, state.shuffledCorrectIndex, state.currentQ, isArabic, locale, t, playSound, nextQuestion]);

  useEffect(() => {
    if (state.answered || state.gameOver || isPaused) return;
    const hintTimer = setTimeout(() => setState((previous) => ({ ...previous, showHint: true })), 5000);
    timerRef.current = setInterval(() => {
      setState((previous) => {
        if (previous.timeLeft <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return { ...previous, timeLeft: 0 };
        }
        return { ...previous, timeLeft: previous.timeLeft - 1 };
      });
    }, 1000);
    return () => {
      clearTimeout(hintTimer);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.answered, state.gameOver, state.currentQuestion, isPaused]);

  useEffect(() => {
    if (!state.answered && state.timeLeft === 0) answerQuestion(-1, true);
  }, [state.timeLeft, state.answered, answerQuestion]);

  useEffect(() => {
    if (!autoSolveNext || state.answered || state.gameOver) return;
    setAutoSolveNext(false);
    const solveTimer = setTimeout(() => answerQuestion(state.shuffledCorrectIndex), 350);
    return () => clearTimeout(solveTimer);
  }, [autoSolveNext, state.currentQuestion, state.answered, state.gameOver, state.shuffledCorrectIndex, answerQuestion]);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (nextTimeoutRef.current) clearTimeout(nextTimeoutRef.current);
  }, []);

  const handleHelpEliminate = () => {
    const wrongIndices = state.shuffledOptions.map((_, index) => index).filter((index) => index !== state.shuffledCorrectIndex);
    const selected = wrongIndices.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenIndices(selected);
    setHelp1Used(true);
  };

  const handleSolve = () => {
    answerQuestion(state.shuffledCorrectIndex);
    setSolveUsed(true);
  };

  const handleSpecialSolve = () => {
    setAutoSolveNext(true);
    answerQuestion(state.shuffledCorrectIndex);
    setSpecialUsed(true);
  };

  if (state.gameOver) {
    const title = state.totalCorrect >= 12 ? t('expert') : state.totalCorrect >= 7 ? t('goodRun') : t('keepPracticing');
    const subtitle = isArabic
      ? `أجبت بشكل صحيح عن ${state.totalCorrect} سؤالاً من دوريات مختلفة.`
      : `You answered ${state.totalCorrect} questions correctly across several leagues.`;
    return (
      <div className="min-h-screen relative overflow-hidden" dir={direction}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900" />
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="bg-black/55 backdrop-blur-xl rounded-3xl border border-emerald-300/20 max-w-md w-full animate-bounce-in">
            <div className="text-center p-8">
              {state.totalCorrect >= 12 ? <Trophy className="w-20 h-20 mx-auto text-amber-300 mb-4" /> : <XCircle className="w-20 h-20 mx-auto text-cyan-200 mb-4" />}
              <h2 className="text-2xl md:text-3xl font-black mb-3 text-white">{title}</h2>
              <p className="text-base text-white/70 mb-5">{subtitle}</p>
              <p className="text-2xl text-white mb-7">{t('score')}: <span className="text-emerald-300 font-bold">{state.totalCorrect}</span> / {QUESTIONS_COUNT}</p>
              <div className="flex flex-col gap-3">
                {onLevelComplete && <button onClick={() => onLevelComplete({ score: state.totalCorrect, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start flex items-center gap-2 mx-auto">{t('nextStage')} 🏆</button>}
                <button onClick={onRestart} className="btn-start flex items-center gap-2 mx-auto opacity-80"><RotateCcw className="w-5 h-5" /> {t('restart')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col relative overflow-hidden" dir={direction}>
      <GameControls onExit={onRestart} onPause={() => setIsPaused(true)} onResume={() => setIsPaused(false)} isPaused={isPaused} />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900" />
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
          <div className="score-badge bg-black/50">🏟️ {state.score}</div>
          <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        <div className={cn('flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all', state.timeLeft <= 3 ? 'bg-red-500/20 text-red-300 animate-pulse' : 'bg-emerald-700/40 text-emerald-100')}>
          <Timer className="w-5 h-5" /> {state.timeLeft}
        </div>
        <div className="bg-yellow-400/15 px-3 py-1 rounded-full text-yellow-200 font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" /> {t('level')} 29
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-lg">
          <section className="bg-black/45 backdrop-blur-sm border border-emerald-300/20 rounded-2xl p-6 mb-4 text-center">
            <p className="text-lg text-white/75 mb-3">{t('playerPlayedFor')} 🏟️</p>
            <div className="text-3xl font-black text-white drop-shadow-lg mb-2">⚽ {isArabic ? state.currentQ.playerNameAr : state.currentQ.playerNameEn}</div>
            {state.showHint && <p className="text-amber-200 text-sm animate-bounce-in">💡 {isArabic ? state.currentQ.hintAr : state.currentQ.hintEn}</p>}
          </section>

          <div className="grid grid-cols-2 gap-3">
            {state.shuffledOptions.map((option, index) => {
              if (hiddenIndices.includes(index)) return <div key={option.id} className="p-3 rounded-2xl border-2 border-white/10 bg-black/20 opacity-20 min-h-[58px]" />;
              const selected = state.selectedOption === index;
              const correct = index === state.shuffledCorrectIndex;
              const showResult = state.answered;
              return (
                <button
                  key={option.id}
                  onClick={() => answerQuestion(index)}
                  disabled={showResult}
                  className={cn('flex min-h-[76px] items-center justify-center gap-2 rounded-2xl border-2 p-3 font-bold text-sm transition-all active:scale-95 md:text-base',
                    showResult && correct ? 'bg-green-500/30 border-green-400 text-green-100' :
                    showResult && selected ? 'bg-red-500/30 border-red-400 text-red-100' :
                    'bg-black/40 border-white/15 text-white hover:border-emerald-300/60 hover:bg-emerald-500/15')}
                >
                  <ClubBadge club={option} size={34} />
                  <span>{locale === 'ar' ? option.nameAr : option.nameEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      <HelpBar questionType="choice" onHelp1={handleHelpEliminate} onSolve={handleSolve} onSpecialSolve={handleSpecialSolve}
        onSkipLevel={onLevelComplete || onRestart} help1Used={help1Used} solveUsed={solveUsed} specialUsed={specialUsed}
        disabled={state.answered || state.gameOver} />

      {state.celebrationMessage && (
        <div className="fixed top-24 left-0 right-0 pointer-events-none flex justify-center z-20">
          <div className={cn('p-4 px-8 rounded-2xl border-2 backdrop-blur-sm animate-bounce-in text-center max-w-sm',
            state.isCorrect ? 'bg-green-500/30 border-green-400/50' : 'bg-red-500/30 border-red-400/50')}>
            <p className={cn('text-lg md:text-xl font-black', state.isCorrect ? 'text-green-100' : 'text-red-100')}>{state.celebrationMessage}</p>
          </div>
        </div>
      )}
      <StreakOverlay message={null} tier={null} />
    </div>
  );
}
