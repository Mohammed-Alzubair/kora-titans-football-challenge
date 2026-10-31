import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { coaches, preloadCoachImages, Coach } from '@/data/coaches';
import { clubs, getClubLeagueId } from '@/data/clubs';
import { useSound } from '@/hooks/useSound';
import { Timer, Crown, RotateCcw, Trophy, XCircle, HelpCircle, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';
import { getCoachDisplayName } from '@/data/coaches';
import { getClubDisplayName } from '@/data/clubs';
import { useI18n } from '@/i18n/I18nProvider';

const QUESTIONS_COUNT = 10;
const QUESTION_TIME = 20;
const TRANSITION_DELAY = 1500;

interface ClubOption {
  id: string;
  name: string;
  logo: string;
  isCorrect: boolean;
}

interface GameState {
  currentQuestion: number;
  score: number;
  currentCoach: Coach | null;
  options: ClubOption[];
  timeLeft: number;
  selectedId: string | null;
  isCorrect: boolean | null;
  gameOver: boolean;
  usedCoachIds: string[];
  celebrationMessage: string | null;
  totalCorrect: number;
}

function generateQuestion(excludeIds: string[], locale: 'ar' | 'en'): { coach: Coach; options: ClubOption[] } | null {
  const available = coaches.filter(c => !excludeIds.includes(c.id));
  const pool = available.length >= 1 ? available : coaches;
  const coach = pool[Math.floor(Math.random() * pool.length)];

  const correctClub = clubs.find(c => c.id === coach.clubId);
  if (!correctClub) return null;
  const leagueId = getClubLeagueId(correctClub.id);
  if (!leagueId) return null;

  const wrongClubs = clubs
    .filter(c => c.id !== coach.clubId && getClubLeagueId(c.id) === leagueId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  if (wrongClubs.length < 3) return null;

  const options: ClubOption[] = [
    { id: correctClub.id, name: getClubDisplayName(correctClub, locale), logo: correctClub.logo, isCorrect: true },
    ...wrongClubs.map(c => ({ id: c.id, name: getClubDisplayName(c, locale), logo: c.logo, isCorrect: false })),
  ].sort(() => Math.random() - 0.5);

  return { coach, options };
}

export function Level11Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const { locale, isArabic } = useI18n();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);

  useEffect(() => { preloadCoachImages(); }, []);

  const [state, setState] = useState<GameState>(() => {
    const q = generateQuestion([], locale);
    return {
      currentQuestion: 0,
      score: 0,
      currentCoach: q?.coach || null,
      options: q?.options || [],
      timeLeft: QUESTION_TIME,
      selectedId: null,
      isCorrect: null,
      gameOver: false,
      usedCoachIds: q ? [q.coach.id] : [],
      celebrationMessage: null,
      totalCorrect: 0 };
  });

  // Auto-solve next question (special help)
  useEffect(() => {
    if (autoSolveNext && !state.selectedId) {
      setAutoSolveNext(false);
      setTimeout(() => { if (state.options?.find((o: any) => o.isCorrect)) handleSelect(state.options?.find((o: any) => o.isCorrect) as any); }, 500);
    }
  }, [autoSolveNext, state.currentQuestion, state.selectedId]);

  const nextQuestion = useCallback(() => {
    setHiddenIndices([]);
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (state.currentQuestion >= QUESTIONS_COUNT - 1) {
      setState(prev => ({ ...prev, gameOver: true }));
      playSound('gameOver');
      return;
    }
    const q = generateQuestion(state.usedCoachIds, locale);
    if (!q) return;
    setState(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      currentCoach: q.coach,
      options: q.options,
      timeLeft: QUESTION_TIME,
      selectedId: null,
      isCorrect: null,
      celebrationMessage: null,
      usedCoachIds: [...prev.usedCoachIds, q.coach.id] }));
  }, [state.currentQuestion, state.usedCoachIds, playSound, locale]);

  const handleSelect = useCallback((option: ClubOption) => {
    if (state.selectedId) return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }

    const isCorrect = option.isCorrect;
    setState(prev => ({
      ...prev,
      selectedId: option.id,
      isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
      totalCorrect: isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect,
      celebrationMessage: isCorrect
        ? (isArabic ? 'صحيح! تعرف مدربيك 🔥' : 'Correct! You know your managers 🔥')
        : (isArabic ? 'غير صحيح، اختر ناديه 😅' : 'Not quite. Find his club 😅') }));
    playSound(isCorrect ? 'correct' : 'wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state.selectedId, nextQuestion, playSound, isArabic]);

  const handleTimeout = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setState(prev => ({
      ...prev,
      selectedId: 'timeout',
      isCorrect: false,
      celebrationMessage: isArabic ? '⏰ انتهى الوقت!' : '⏰ Time is up!' }));
    playSound('wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [playSound, nextQuestion, isArabic]);

  useEffect(() => {
    if (state.selectedId || state.gameOver || isPaused) return;
    timerRef.current = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 0) return prev;
        return { ...prev, timeLeft: Math.max(0, prev.timeLeft - 1) };
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state.selectedId, state.gameOver, state.currentQuestion, isPaused]);

  useEffect(() => {
    if (!state.selectedId && state.timeLeft <= 0) handleTimeout();
  }, [state.timeLeft, state.selectedId, handleTimeout]);

  const handleHelpEliminate = () => {
    const correctVal = state.options?.find((o: any) => o.isCorrect);
    const wrongIdxs = (state.options || []).map((o: any, i: number) => ({ o, i })).filter((x: any) => x.o?.id !== correctVal?.id).map((x: any) => x.i);
    const toHide = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenIndices(toHide);
    setHelp1Used(true);
  };

  const handleHelpSolve = () => {
    if (state.options?.find((o: any) => o.isCorrect)) handleSelect(state.options?.find((o: any) => o.isCorrect) as any);
    setSolveUsed(true);
  };

  const handleHelpSpecial = () => {
    if (state.options?.find((o: any) => o.isCorrect)) handleSelect(state.options?.find((o: any) => o.isCorrect) as any);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };


  if (state.gameOver) {
    const getFinalMessage = () => {
      if (state.totalCorrect >= 8) return { title: isArabic ? 'خبير مدربين! 🏆' : 'Manager expert! 🏆', subtitle: isArabic ? 'تعرفت إلى المدربين وأنديتهم.' : 'You matched the managers to their clubs.', emoji: '👨‍🏫⚽' };
      if (state.totalCorrect >= 5) return { title: isArabic ? 'أداء جيد! 👏' : 'Good run! 👏', subtitle: isArabic ? 'أصبت في معظم اختيارات المدربين.' : 'You matched several managers correctly.', emoji: '📋' };
      return { title: isArabic ? 'واصل التدريب! 😂' : 'Keep practising! 😂', subtitle: isArabic ? 'حاول ثانية مع مجموعة المدربين الموسّعة.' : 'Try again with the expanded manager roster.', emoji: '🤓' };
    };
    const msg = getFinalMessage();
    const isPerfect = state.totalCorrect >= QUESTIONS_COUNT * 0.8;

    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-black/60 backdrop-blur-md rounded-3xl border border-primary/30 max-w-md mx-4 animate-bounce-in">
            <div className="text-center p-8">
              {isPerfect ? <Trophy className="w-24 h-24 mx-auto text-primary mb-4 animate-pulse" /> : state.totalCorrect >= 5 ? <HelpCircle className="w-24 h-24 mx-auto text-yellow-400 mb-4" /> : <XCircle className="w-24 h-24 mx-auto text-destructive mb-4" />}
              <div className="text-5xl mb-4">{msg.emoji}</div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">{msg.title}</h2>
              <p className="text-lg text-muted-foreground mb-4">{msg.subtitle}</p>
              <p className="text-2xl text-foreground mb-8">
                {isArabic ? 'نتيجتك:' : 'Your score:'} <span className="text-primary font-bold">{state.totalCorrect}</span> / {QUESTIONS_COUNT}
              </p>
              <div className="flex flex-col gap-3">
                {onLevelComplete && state.totalCorrect >= 3 && (
                  <button onClick={() => onLevelComplete?.({ score: state.totalCorrect, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start animate-bounce-in text-xl px-8 py-4">
                    {isArabic ? 'المرحلة التالية' : 'Next stage'} 🚀
                  </button>
                )}
                <button onClick={onRestart} className="btn-start flex items-center gap-2 mx-auto">
                  <RotateCcw className="w-6 h-6" /> {isArabic ? 'العب من البداية' : 'Play again'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!state.currentCoach) return null;

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col relative overflow-hidden">
      <GameControls onExit={onRestart} onPause={() => setIsPaused(true)} onResume={() => setIsPaused(false)} isPaused={isPaused} />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge bg-black/50">👨‍🏫 {state.score}</div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all", state.timeLeft <= 3 ? "bg-destructive/20 text-destructive animate-pulse" : "bg-slate-700/50 text-slate-300")}>
          <Timer className="w-5 h-5" /> {state.timeLeft}
        </div>
        <div className="bg-yellow-400/20 px-3 py-1 rounded-full text-yellow-400 font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" /> {isArabic ? 'المرحلة 11' : 'Stage 11'}
        </div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full">
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-2xl">
          {/* Coach photo */}
          <div className="bg-black/50 backdrop-blur-sm border border-slate-500/30 rounded-2xl p-6 mb-6 text-center">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-yellow-400/50 mb-4">
              {state.currentCoach.image ? (
                <img src={state.currentCoach.image} alt={getCoachDisplayName(state.currentCoach, locale)} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-purple-900 text-yellow-300"><UserRound className="w-16 h-16" /></div>
              )}
            </div>
            <p className="text-xl md:text-2xl font-black text-white mb-1">
              <span className="text-yellow-400">{getCoachDisplayName(state.currentCoach, locale)}</span>
            </p>
            <p className="text-lg text-muted-foreground">{isArabic ? 'أي نادٍ درّبه؟' : 'Which club did this manager coach?'} 🤔</p>
          </div>

          {/* Club logo options */}
          <div className="grid grid-cols-2 gap-4">
            {state.options.map((option, _hIdx) => {
              if (hiddenIndices.includes(_hIdx)) return <div key={_hIdx} className="p-3 rounded-2xl border-2 border-white/10 bg-black/20 opacity-20 min-h-[52px]" />;
              const club = clubs.find((entry) => entry.id === option.id);
              const displayName = club ? getClubDisplayName(club, locale) : option.name;
              let cardClass = "bg-black/40 backdrop-blur-sm border-white/20 hover:border-yellow-400/50";
              if (state.selectedId) {
                if (option.isCorrect) {
                  cardClass = "bg-green-500/30 border-green-400";
                } else if (option.id === state.selectedId) {
                  cardClass = "bg-destructive/20 border-destructive";
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  disabled={!!state.selectedId}
                  className={cn(
                    "rounded-2xl border-2 p-4 transition-all duration-200 flex flex-col items-center justify-center gap-2 aspect-square",
                    cardClass,
                    !state.selectedId && "hover:scale-105 active:scale-95"
                  )}
                >
                  <img
                    src={option.logo}
                    alt={displayName}
                    className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-lg"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                  />
                  <span className="text-sm font-bold text-white/80">{displayName}</span>
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
            disabled={false}
          />

      {state.celebrationMessage && (
        <div className="fixed top-24 left-0 right-0 pointer-events-none flex justify-center z-20">
          <div className={cn("p-4 px-8 rounded-2xl border-2 backdrop-blur-sm animate-bounce-in text-center", state.isCorrect ? "bg-green-500/30 border-green-400/50" : "bg-destructive/30 border-destructive/50")}>
            <p className={cn("text-xl md:text-2xl font-black", state.isCorrect ? "text-green-400" : "text-red-400")}>
              {state.celebrationMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
