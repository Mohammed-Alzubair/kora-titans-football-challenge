import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { LogoCard } from './LogoCard';
import { Timer } from './Timer';
import { StoneBackground } from './StoneBackground';
import { GameControls } from './GameControls';
import { Club, getClubDisplayName, getClubLeagueId, getRandomQuestion } from '@/data/clubs';
import { useSound } from '@/hooks/useSound';
import { LoaderCircle, Trophy, XCircle, RotateCcw } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { getAnswerFeedback } from '@/i18n/answerFeedback';
import { AnswerFeedback } from './AnswerFeedback';

const GAME_TIME = 20;
const QUESTIONS_COUNT = 20;

interface GameState {
  currentQuestion: number;
  score: number;
  correct: Club | null;
  options: Club[];
  timeLeft: number;
  selectedId: string | null;
  isCorrect: boolean | null;
  gameOver: boolean;
  logosReady: boolean;
  usedClubIds: string[];
}

const preloadImage = (src: string, timeoutMs = 5000) => new Promise<boolean>((resolve) => {
  const image = new Image();
  let settled = false;
  const finish = (loaded: boolean) => {
    if (settled) return;
    settled = true;
    window.clearTimeout(timeout);
    resolve(loaded);
  };
  const timeout = window.setTimeout(() => finish(false), timeoutMs);
  const finishAfterDecode = () => {
    if (image.naturalWidth === 0) {
      finish(false);
      return;
    }
    if (typeof image.decode === 'function') {
      image.decode().then(() => finish(true)).catch(() => finish(image.naturalWidth > 0));
    } else {
      finish(true);
    }
  };
  image.onload = finishAfterDecode;
  image.onerror = () => finish(false);
  image.src = src;
  if (image.complete) finishAfterDecode();
});

interface GameScreenProps {
  onRestart: () => void;
  onLevelComplete?: (result?: LevelResult) => void;
}

export function GameScreen({ onRestart, onLevelComplete }: GameScreenProps) {
  const { playSound } = useSound();
  const { locale, direction, t } = useI18n();
  const [isPaused, setIsPaused] = useState(false);
  const [logoSources, setLogoSources] = useState<Record<string, string>>({});
  const timerPausedRef = useRef(false);
  const [state, setState] = useState<GameState>(() => {
    const { correct, options } = getRandomQuestion();
    return {
      currentQuestion: 1,
      score: 0,
      correct,
      options,
      timeLeft: GAME_TIME,
      selectedId: null,
      isCorrect: null,
      gameOver: false,
      logosReady: false,
      usedClubIds: [correct.id] };
  });

  // Load and decode the full set before revealing any badge or starting the clock.
  useEffect(() => {
    let cancelled = false;
    setLogoSources({});

    const prepareLogos = async () => {
      const entries = await Promise.all(state.options.map(async (club) => {
        if (await preloadImage(club.logo)) return [club.id, club.logo] as const;
        if (club.fallbackLogo && await preloadImage(club.fallbackLogo)) return [club.id, club.fallbackLogo] as const;
        return [club.id, '/placeholder.svg'] as const;
      }));

      if (cancelled) return;
      setLogoSources(Object.fromEntries(entries));
      setState((prev) => ({ ...prev, logosReady: true }));
    };

    void prepareLogos();
    return () => { cancelled = true; };
  }, [state.options]);

  const nextQuestion = useCallback(() => {
    if (state.currentQuestion >= QUESTIONS_COUNT) {
      setState(prev => ({ ...prev, gameOver: true }));
      playSound('gameOver');
      return;
    }

    const { correct, options } = getRandomQuestion(state.usedClubIds);
    setState(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      correct,
      options,
      timeLeft: GAME_TIME,
      selectedId: null,
      isCorrect: null,
      logosReady: false,
      usedClubIds: [...prev.usedClubIds, correct.id] }));
  }, [state.currentQuestion, state.usedClubIds, playSound]);

  const feedback = state.isCorrect === null
    ? null
    : getAnswerFeedback(locale, state.isCorrect, state.correct ? getClubDisplayName(state.correct, locale) : '');

  const handleSelect = useCallback((club: Club) => {
    if (state.selectedId) return;

    const isCorrect = club.id === state.correct?.id;
    setState(prev => ({
      ...prev,
      selectedId: club.id,
      isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score }));

    if (isCorrect) {
      playSound('correct');
    } else {
      playSound('wrong');
    }

    setTimeout(nextQuestion, 1500);
  }, [state.selectedId, state.correct, playSound, nextQuestion]);

  // Timer effect
  useEffect(() => {
    if (!state.logosReady || state.selectedId || state.gameOver || isPaused) return;

    const interval = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 0.1) {
          clearInterval(interval);
          playSound('wrong');
          setTimeout(nextQuestion, 1500);
          return { ...prev, timeLeft: 0, isCorrect: false };
        }
        return { ...prev, timeLeft: prev.timeLeft - 0.1 };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [state.logosReady, state.selectedId, state.gameOver, isPaused, playSound, nextQuestion]);

  // Start background music

  if (state.gameOver) {
    const isWinner = state.score >= QUESTIONS_COUNT / 2;
    return (
      <div className="result-overlay animate-bounce-in">
        <div className="text-center p-8" dir={direction}>
          {isWinner ? (
            <>
              <Trophy className="w-24 h-24 mx-auto text-primary mb-4" />
              <h2 className="game-title text-4xl md:text-5xl font-black mb-4">
                {t('congratulations')}
              </h2>
              <p className="text-2xl text-foreground mb-4">
                {t('score')}: <span className="text-primary font-bold">{state.score}</span> / {QUESTIONS_COUNT}
              </p>
              {onLevelComplete && (
                <button onClick={() => onLevelComplete?.({ score: state.score, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start flex items-center gap-2 mx-auto mb-4">
                  <Trophy className="w-6 h-6" />
                  {t('nextStageTwo')}
                </button>
              )}
              <button onClick={onRestart} className="text-muted-foreground underline">
                {t('playFromStart')}
              </button>
            </>
          ) : (
            <>
              <XCircle className="w-24 h-24 mx-auto text-destructive mb-4" />
              <h2 className="text-4xl md:text-5xl font-black text-destructive mb-4">
                {t('betterLuck')}
              </h2>
              <p className="text-2xl text-foreground mb-8">
                {t('score')}: <span className="text-primary font-bold">{state.score}</span> / {QUESTIONS_COUNT}
              </p>
              <button onClick={onRestart} className="btn-start flex items-center gap-2 mx-auto">
                <RotateCcw className="w-6 h-6" />
                {t('playAgain')}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col relative overflow-hidden" dir={direction}>
      {/* Stone Background */}
      <StoneBackground levelNum={1} />
      
      {/* Game Controls */}
      <GameControls 
        onExit={onRestart}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
        isPaused={isPaused}
      />
      
      {/* Header */}
      <div className="relative z-10 flex-1 flex flex-col">
      <div className="flex flex-col items-center gap-1 mb-6">
        <div className="score-badge">
          ⚽ {state.score}
        </div>
        <div className="text-muted-foreground font-bold text-sm">
          {state.currentQuestion} / {QUESTIONS_COUNT}
        </div>
      </div>

      {/* Timer */}
      <Timer timeLeft={state.timeLeft} maxTime={GAME_TIME} isWaiting={!state.logosReady} waitingLabel={locale === 'ar' ? 'جارٍ تجهيز الشعارات…' : 'Preparing the crests…'} />

      {/* Question */}
      <div className="my-8 animate-slide-up">
        <h2 className="question-text text-foreground">
          {t('crestQuestion')} <span className="text-primary">{state.correct ? getClubDisplayName(state.correct, locale) : ''}</span>{locale === 'ar' ? '؟' : '?'}
        </h2>
      </div>

      {/* Options Grid */}
      <div className="flex-1 flex items-center justify-center">
        {state.logosReady ? (
        <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-lg">
          {state.options.map((club) => {
            let cardState: 'idle' | 'correct' | 'wrong' = 'idle';
            if (state.selectedId) {
              if (club.id === state.correct?.id) {
                cardState = 'correct';
              } else if (club.id === state.selectedId) {
                cardState = 'wrong';
              }
            }
            
            return (
              <LogoCard
                key={club.id}
                club={club}
                logoSrc={logoSources[club.id]}
                onClick={() => handleSelect(club)}
                disabled={!!state.selectedId}
                state={cardState}
              />
            );
          })}
        </div>
        ) : (
          <div className="relative grid grid-cols-2 gap-4 md:gap-6 w-full max-w-lg" role="status" aria-live="polite">
            {state.options.map((club) => (
              <div key={club.id} className="logo-card w-full aspect-square animate-pulse" aria-hidden="true" />
            ))}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-slate-950/65 text-sm font-bold text-white/90 backdrop-blur-sm">
              <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
              <span>{locale === 'ar' ? 'جارٍ تجهيز الشعارات…' : 'Preparing the crests…'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Feedback overlay */}
      {feedback && (
        <div className="pointer-events-none fixed inset-x-4 bottom-6 z-30 flex justify-center md:bottom-10" dir={direction}>
          <AnswerFeedback
            isCorrect={state.isCorrect!}
            title={feedback.title}
            detail={feedback.detail}
            className="w-full max-w-md"
          />
        </div>
      )}
      </div>
    </div>
  );
}
