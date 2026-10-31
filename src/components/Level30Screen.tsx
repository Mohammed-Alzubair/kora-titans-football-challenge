import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSound } from '@/hooks/useSound';
import { Timer, Crown, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';
import { StreakOverlay } from './StreakOverlay';
import { sharedClubQuestions } from '@/data/level30SharedClub';
import { localizeClubOption } from '@/data/clubs';
import { useI18n } from '@/i18n/I18nProvider';

const QUESTIONS_COUNT = 10;
const QUESTION_TIME = 20;
const TRANSITION_DELAY = 1200;

function getComment(correct: number, wrong: number, isCorrect: boolean, streak: number, isArabic: boolean) {
  if (!isCorrect) {
    const wrongMsgs = isArabic ? ['😐 حاول مرة أخرى 🙃', '🙃 ابحث عن النادي المشترك.', '😬 لقد لعبا معاً!'] : ['😐 Try again 🙃', '🙃 Look for their shared club.', '😬 They played together!'];
    return wrongMsgs[Math.floor(Math.random() * wrongMsgs.length)];
  }
  if (streak >= 2) return isArabic ? '🤯 سلسلة مذهلة!' : '🤯 A brilliant streak!';
  if (correct >= 7) return isArabic ? '🔥 خبير الثنائيات!' : '🔥 Teammate expert!';
  return isArabic ? ['صحيح! 👥', 'أحسنت! 👏', 'ممتاز! 🎯'][Math.floor(Math.random() * 3)] : ['Correct! 👥', 'Well played! 👏', 'Excellent! 🎯'][Math.floor(Math.random() * 3)];
}

interface GameState {
  currentQuestion: number;
  score: number;
  timeLeft: number;
  gameOver: boolean;
  totalCorrect: number;
  totalWrong: number;
  currentQ: typeof sharedClubQuestions[0];
  shuffledOptions: string[];
  shuffledCorrectIndex: number;
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

function shuffleOptions(q: typeof sharedClubQuestions[0]) {
  const correct = q.options[q.correctIndex];
  const shuffled = [...q.options].sort(() => Math.random() - 0.5);
  return { shuffled, correctIdx: shuffled.indexOf(correct) };
}

export function Level30Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const { locale, isArabic } = useI18n();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);

  const getNext = (used: number[]) => {
    const available = sharedClubQuestions.filter(q => !used.includes(q.id));
    const pool = available.length > 0 ? available : sharedClubQuestions;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const [state, setState] = useState<GameState>(() => {
    const q = getNext([]);
    const { shuffled, correctIdx } = shuffleOptions(q);
    return {
      currentQuestion: 0, score: 0, timeLeft: QUESTION_TIME, gameOver: false,
      totalCorrect: 0, totalWrong: 0, currentQ: q,
      shuffledOptions: shuffled, shuffledCorrectIndex: correctIdx,
      selectedOption: null, answerPhase: 'question', isCorrect: null,
      celebrationMessage: null, usedIds: [q.id], streak: 0, wrongStreak: 0,
      streakMsg: null as string | null, streakTier: null as 'hype' | 'epic' | 'lose' | null };
  });

  // Auto-solve next question (special help)
  useEffect(() => {
    if (autoSolveNext && state.answerPhase === 'question') {
      setAutoSolveNext(false);
      setTimeout(() => { const correctIdx = state.shuffledCorrectIndex; if (correctIdx !== undefined) checkAnswer(correctIdx); }, 500);
    }
  }, [autoSolveNext, state.currentQuestion, state.answerPhase]);

  const nextQuestion = useCallback(() => {
    setHiddenIndices([]);
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (state.currentQuestion >= QUESTIONS_COUNT - 1) {
      setState(prev => ({ ...prev, gameOver: true }));
      playSound('gameOver'); return;
    }
    const q = getNext(state.usedIds);
    const { shuffled, correctIdx } = shuffleOptions(q);
    setState(prev => ({
      ...prev, currentQuestion: prev.currentQuestion + 1, currentQ: q,
      shuffledOptions: shuffled, shuffledCorrectIndex: correctIdx,
      timeLeft: QUESTION_TIME, selectedOption: null,
      answerPhase: 'question', isCorrect: null, celebrationMessage: null,
      usedIds: [...prev.usedIds, q.id] }));
  }, [state.currentQuestion, state.usedIds, playSound]);

  const checkAnswer = useCallback((optionIdx: number) => {
    if (state.answerPhase === 'result') return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    const isCorrect = optionIdx === state.shuffledCorrectIndex;
    const newCorrect = isCorrect ? state.totalCorrect + 1 : state.totalCorrect;
    const newWrong = isCorrect ? state.totalWrong : state.totalWrong + 1;
    const newStreak = isCorrect ? state.streak + 1 : 0;
    const newWrongStreak = isCorrect ? 0 : (state.wrongStreak || 0) + 1;
    const msg = getComment(newCorrect, newWrong, isCorrect, newStreak, isArabic);

    setState(prev => ({
      ...prev, selectedOption: optionIdx, answerPhase: 'result', isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
      totalCorrect: newCorrect, totalWrong: newWrong, streak: newStreak, wrongStreak: isCorrect ? 0 : prev.wrongStreak + 1,
      celebrationMessage: msg }));
    playSound(isCorrect ? 'correct' : 'wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state, nextQuestion, playSound, isArabic]);

  const handleTimeout = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setState(prev => ({
      ...prev, answerPhase: 'result', isCorrect: false,
      totalWrong: prev.totalWrong + 1, streak: 0, wrongStreak: 0,
      streakMsg: null as string | null, streakTier: null as 'hype' | 'epic' | 'lose' | null,
      celebrationMessage: isArabic ? `⏰ الإجابة: ${state.currentQ.correctClub}` : `⏰ Answer: ${localizeClubOption(state.currentQ.correctClub, locale)}` }));
    playSound('wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state.currentQ, isArabic, locale, playSound, nextQuestion]);

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
    const correctIdx = state.shuffledCorrectIndex;
    if (correctIdx === undefined) return;
    const wrongIdxs = (state.shuffledOptions || []).map((_: any, i: number) => i).filter((i: number) => i !== correctIdx);
    const toHide = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenIndices(toHide);
    setHelp1Used(true);
  };

  const handleHelpSolve = () => {
    const correctIdx = state.shuffledCorrectIndex;
    if (correctIdx !== undefined) checkAnswer(correctIdx);
    setSolveUsed(true);
  };

  const handleHelpSpecial = () => {
    const correctIdx = state.shuffledCorrectIndex;
    if (correctIdx !== undefined) checkAnswer(correctIdx);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };


  if (state.gameOver) {
    const getFinal = () => {
      if (state.totalCorrect >= 8) return { title: isArabic ? '🤯 خبير الثنائيات!' : '🤯 Teammate expert!', subtitle: isArabic ? 'عرفت الأندية التي جمعت هؤلاء اللاعبين.' : 'You identified the clubs these players shared.', emoji: '👥🏆' };
      if (state.totalCorrect >= 5) return { title: isArabic ? 'أداء جيد! 💪' : 'Good run! 💪', subtitle: isArabic ? 'واصل التعرّف على روابط اللاعبين.' : 'Keep exploring player connections.', emoji: '👥' };
      return { title: isArabic ? 'جولة للتعلّم' : 'A learning round', subtitle: isArabic ? 'راجع مسيرات اللاعبين وحاول مجدداً.' : 'Review the players’ careers and try again.', emoji: '📖' };
    };
    const msg = getFinal();

    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-indigo-700 to-indigo-900" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-black/60 backdrop-blur-md rounded-3xl border border-indigo-500/30 max-w-md mx-4 animate-bounce-in">
            <div className="text-center p-8">
              {state.totalCorrect >= 8 ? <Trophy className="w-24 h-24 mx-auto text-yellow-400 mb-4 animate-pulse" /> : <XCircle className="w-24 h-24 mx-auto text-indigo-400 mb-4" />}
              <div className="text-5xl mb-4">{msg.emoji}</div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">{msg.title}</h2>
              <p className="text-lg text-white/70 mb-4">{msg.subtitle}</p>
              <p className="text-2xl text-white mb-8">{isArabic ? 'نتيجتك:' : 'Your score:'} <span className="text-indigo-400 font-bold">{state.totalCorrect}</span> / {QUESTIONS_COUNT}</p>
              <div className="flex flex-col gap-3">
                {onLevelComplete && <button onClick={() => onLevelComplete?.({ score: state.totalCorrect, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start flex items-center gap-2 mx-auto">{isArabic ? 'المرحلة التالية' : 'Next stage'} 🚀</button>}
                <button onClick={onRestart} className="btn-start flex items-center gap-2 mx-auto bg-white/10"><RotateCcw className="w-5 h-5" /> {isArabic ? 'العب من جديد' : 'Play again'}</button>
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
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-indigo-700 to-indigo-900" />
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge bg-black/50">👥 {state.score}</div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all", state.timeLeft <= 3 ? "bg-red-500/20 text-red-300 animate-pulse" : "bg-indigo-700/50 text-indigo-300")}>
          <Timer className="w-5 h-5" /> {state.timeLeft}
        </div>
        <div className="bg-yellow-400/20 px-3 py-1 rounded-full text-yellow-400 font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" /> {isArabic ? 'المرحلة 30' : 'Stage 30'}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-lg">
          <div className="bg-black/50 backdrop-blur-sm border border-indigo-500/30 rounded-2xl p-6 mb-4 text-center">
            <p className="text-lg text-white/70 mb-3">{isArabic ? 'لعب هذان اللاعبان معاً. في أي نادٍ؟' : 'These two players shared a club. Which one?'} 👥</p>
            <div className="flex flex-col gap-3">
              <div className="bg-indigo-500/10 border border-indigo-400/30 rounded-xl p-3">
                <p className="text-xl font-bold text-indigo-300">⭐ {isArabic ? state.currentQ.player1 : state.currentQ.player1En}</p>
              </div>
              <div className="text-2xl text-white/50">+</div>
              <div className="bg-indigo-500/10 border border-indigo-400/30 rounded-xl p-3">
                <p className="text-xl font-bold text-indigo-300">⭐ {isArabic ? state.currentQ.player2 : state.currentQ.player2En}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {state.shuffledOptions.map((option, idx) => {
              if (hiddenIndices.includes(idx)) return <div key={idx} className="p-3 rounded-2xl border-2 border-white/10 bg-black/20 opacity-20 min-h-[52px]" />;
              const isSelected = state.selectedOption === idx;
              const isCorrectOption = idx === state.shuffledCorrectIndex;
              const showResult = state.answerPhase === 'result';

              return (
                <button
                  key={idx}
                  onClick={() => checkAnswer(idx)}
                  disabled={showResult}
                  className={cn(
                    "p-3 rounded-2xl font-bold text-lg border-2 transition-all active:scale-95",
                    showResult && isCorrectOption
                      ? "bg-green-500/30 border-green-400 text-green-300"
                      : showResult && isSelected && !isCorrectOption
                        ? "bg-red-500/30 border-red-400 text-red-300"
                        : "bg-black/40 border-white/20 text-white hover:border-indigo-400/50 hover:bg-indigo-500/20"
                  )}
                >
                  {localizeClubOption(option, locale)}
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
