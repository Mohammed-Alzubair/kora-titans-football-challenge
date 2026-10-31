import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Club, getClubDisplayName, getRandomQuestion } from '@/data/clubs';
import { useSound } from '@/hooks/useSound';
import { Trophy, XCircle, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StoneBackground } from './StoneBackground';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';
import { useI18n } from '@/i18n/I18nProvider';

const FLASH_DURATION = 400; // milliseconds to show logo
const QUESTIONS_COUNT = 15;

const CORRECT_MESSAGES_AR = [
  "سهله عليك صح 😉",
  "كيييييف 🙂 مستحيللل!",
  "ياخي انت وحش! 🔥",
  "ماشاء الله عليك! 💪",
  "خرافي! 🌟",
  "البطل واضح! 🏆",
  "انت اسطورة! ⭐",
  "مافي زيك! 👑",
  "عبقري الشعارات! 🧠",
];

const CORRECT_MESSAGES_EN = [
  'That was easy, right? 😉', 'How did you spot that so fast? 🔥', 'Brilliant recall! 🧠',
  'Excellent work! 💪', 'You know your crests! 🏆', 'A sharp answer! 🎯',
];

interface GameState {
  currentQuestion: number;
  score: number;
  correct: Club | null;
  options: Club[];
  selectedId: string | null;
  isCorrect: boolean | null;
  gameOver: boolean;
  usedClubIds: string[];
  showLogo: boolean;
  canAnswer: boolean;
  celebrationMessage: string | null;
}

interface Level2ScreenProps {
  onRestart: () => void;
  onLevelComplete?: (result?: LevelResult) => void;
}

export function Level2Screen({ onRestart, onLevelComplete }: Level2ScreenProps) {
  const { playSound } = useSound();
  const { locale, isArabic, direction, t } = useI18n();
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);
  const [state, setState] = useState<GameState>(() => {
    const { correct, options } = getRandomQuestion();
    return {
      currentQuestion: 1,
      score: 0,
      correct,
      options,
      selectedId: null,
      isCorrect: null,
      gameOver: false,
      usedClubIds: [correct.id],
      showLogo: true,
      canAnswer: false,
      celebrationMessage: null };
  });

  // Auto-solve next question (special help)
  useEffect(() => {
    if (autoSolveNext && !state.selectedId && state.canAnswer) {
      setAutoSolveNext(false);
      setTimeout(() => { if (state.correct) handleSelect(state.correct as any); }, 500);
    }
  }, [autoSolveNext, state.currentQuestion, state.selectedId]);

  // Flash logo effect
  useEffect(() => {
    if (state.selectedId || state.gameOver || isPaused) return;
    
    // Show logo for FLASH_DURATION then hide
    const timer = setTimeout(() => {
      setState(prev => ({ ...prev, showLogo: false, canAnswer: true }));
    }, FLASH_DURATION);

    return () => clearTimeout(timer);
  }, [state.currentQuestion, state.selectedId, state.gameOver, isPaused]);

  const getRandomMessage = useCallback(() => {
    const messages = isArabic ? CORRECT_MESSAGES_AR : CORRECT_MESSAGES_EN;
    return messages[Math.floor(Math.random() * messages.length)];
  }, [isArabic]);

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
      selectedId: null,
      isCorrect: null,
      usedClubIds: [...prev.usedClubIds, correct.id],
      showLogo: true,
      canAnswer: false,
      celebrationMessage: null }));
    setHelp1Used(false); setSolveUsed(false); setSpecialUsed(false); setHiddenIndices([]);
  }, [state.currentQuestion, state.usedClubIds, playSound]);

  const handleSelect = useCallback((club: Club) => {
    if (state.selectedId || !state.canAnswer) return;

    const isCorrect = club.id === state.correct?.id;
    const message = isCorrect 
      ? (state.currentQuestion === QUESTIONS_COUNT
        ? (isArabic ? 'أداء جيد! 💪\nأكمل اللعب وحقق نتائج أفضل!' : 'Great round! 💪\nKeep playing and aim even higher!')
        : getRandomMessage())
      : null;
    
    setState(prev => ({
      ...prev,
      selectedId: club.id,
      isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
      showLogo: true, // Show logo after selection
      celebrationMessage: message }));

    if (isCorrect) {
      playSound('correct');
    } else {
      playSound('wrong');
    }

    setTimeout(nextQuestion, 2500);
  }, [state.selectedId, state.canAnswer, state.correct, state.currentQuestion, playSound, nextQuestion, getRandomMessage, isArabic]);

  // Start background music

  const handleHelpEliminate = () => {
    const correctId = state.correct?.id;
    const wrongIdxs = (state.options || []).map((o: any, i: number) => ({ o, i })).filter((x: any) => x.o.id !== correctId).map((x: any) => x.i);
    const toHide = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenIndices(toHide);
    setHelp1Used(true);
  };

  const handleHelpSolve = () => {
    if (state.correct) handleSelect(state.correct as any);
    setSolveUsed(true);
  };

  const handleHelpSpecial = () => {
    if (state.correct) handleSelect(state.correct as any);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };


  if (state.gameOver) {
    const isWinner = state.score >= QUESTIONS_COUNT / 2;
    const isPerfect = state.score === QUESTIONS_COUNT;
    
    return (
      <div className="result-overlay animate-bounce-in" dir={direction}>
        <div className="text-center p-8">
          {isPerfect ? (
            <>
              <Trophy className="w-24 h-24 mx-auto text-primary mb-4 animate-pulse" />
              <h2 className="game-title text-3xl md:text-4xl font-black mb-4 leading-relaxed">
                {isArabic ? 'أحسنت! أداء رائع! 🔥' : 'Perfect round! Great recall! 🔥'}
              </h2>
              <p className="text-xl text-primary mb-4">
                {isArabic ? 'أكمل اللعب واثبت لي العكس! 💪' : 'Keep playing and prove it again! 💪'}
              </p>
            </>
          ) : isWinner ? (
            <>
              <Trophy className="w-24 h-24 mx-auto text-primary mb-4" />
              <h2 className="game-title text-4xl md:text-5xl font-black mb-4">
                {isArabic ? '🎉 أحسنت! 🎉' : '🎉 Well played! 🎉'}
              </h2>
            </>
          ) : (
            <>
              <XCircle className="w-24 h-24 mx-auto text-destructive mb-4" />
              <h2 className="text-4xl md:text-5xl font-black text-destructive mb-4">
                {isArabic ? '😂 المستوى صعب صح؟ 😂' : '😂 This stage was tough, right? 😂'}
              </h2>
            </>
          )}
          <p className="text-2xl text-foreground mb-8">
            {t('score')}: <span className="text-primary font-bold">{state.score}</span> / {QUESTIONS_COUNT}
          </p>
          {isWinner && onLevelComplete && (
            <button onClick={() => onLevelComplete?.({ score: state.score, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start flex items-center gap-2 mx-auto mb-4">
              <Trophy className="w-6 h-6" />
              {isArabic ? 'انتقل للمستوى الثالث! 💀' : 'Continue to stage 3! 💀'}
            </button>
          )}
          <button onClick={onRestart} className={isWinner && onLevelComplete ? "text-muted-foreground underline" : "btn-start flex items-center gap-2 mx-auto"}>
            {isWinner && onLevelComplete ? t('playFromStart') : (
              <>
                <RotateCcw className="w-6 h-6" />
                {t('restart')}
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col relative overflow-hidden" dir={direction}>
      {/* Stone Background */}
      <StoneBackground levelNum={2} />
      
      {/* Game Controls */}
      <GameControls 
        onExit={onRestart}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
        isPaused={isPaused}
      />
      
      {/* Content wrapper with z-index above background */}
      <div className="relative z-10 flex-1 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge">
          ⚽ {state.score}
        </div>
          <div className="text-muted-foreground font-bold text-sm">{state.currentQuestion} / {QUESTIONS_COUNT}</div>
        </div>
        <div className="bg-primary/20 px-3 py-1 rounded-full text-primary font-bold text-sm">
          {isArabic ? 'المرحلة 2 - صعبة' : 'Stage 2 · Hard'} 🔥
        </div>
              </div>

      {/* Flash indicator */}
      <div className="flex justify-center mb-4">
        <div className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
          state.showLogo ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
        )}>
          {state.showLogo ? (
            <>
              <Eye className="w-5 h-5" />
              <span className="font-bold">{isArabic ? 'ركّز!' : 'Focus!'}</span>
            </>
          ) : (
            <>
              <EyeOff className="w-5 h-5" />
              <span className="font-bold">{isArabic ? 'اختر الآن!' : 'Choose now!'}</span>
            </>
          )}
        </div>
      </div>

      {/* Logo Display Area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* The flashing logo */}
        <div className={cn(
          "w-40 h-40 md:w-52 md:h-52 rounded-3xl flex items-center justify-center mb-8 transition-all duration-200",
          state.showLogo 
            ? "bg-card border-2 border-primary shadow-lg shadow-primary/20" 
            : "bg-muted/50 border-2 border-dashed border-muted-foreground/30"
        )}>
          {state.showLogo ? (
            <img
              src={state.correct?.logo}
              alt={isArabic ? 'شعار النادي' : 'Club crest'}
              className="w-28 h-28 md:w-36 md:h-36 object-contain animate-scale-in"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          ) : (
            <div className="text-center text-muted-foreground">
              <EyeOff className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">{isArabic ? 'الشعار مخفي!' : 'Crest hidden!'}</p>
            </div>
          )}
        </div>

        {/* Question */}
        <h2 className="question-text text-foreground mb-6">
          {isArabic ? 'ما اسم النادي؟' : 'Name the club.'} 🤔
        </h2>

        {/* Options as text buttons */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
          {state.options.map((club, _hIdx) => {
              if (hiddenIndices.includes(_hIdx)) return <div key={_hIdx} className="p-3 rounded-2xl border-2 border-white/10 bg-black/20 opacity-20 min-h-[52px]" />;
            let btnClass = "bg-card hover:bg-card/80 border-border";
            if (state.selectedId) {
              if (club.id === state.correct?.id) {
                btnClass = "bg-primary/20 border-primary text-primary";
              } else if (club.id === state.selectedId) {
                btnClass = "bg-destructive/20 border-destructive text-destructive";
              }
            }
            
            return (
              <button
                key={club.id}
                onClick={() => handleSelect(club)}
                disabled={!!state.selectedId || !state.canAnswer}
                className={cn(
                  "p-4 rounded-xl border-2 font-bold text-lg transition-all duration-200",
                  btnClass,
                  !state.canAnswer && !state.selectedId && "opacity-50 cursor-not-allowed",
                  state.canAnswer && !state.selectedId && "hover:scale-105 active:scale-95"
                )}
              >
                {getClubDisplayName(club, locale)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Celebration message overlay */}
      
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
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center bg-black/30">
          <div className="bg-card p-6 rounded-2xl border-2 border-primary shadow-2xl animate-bounce-in text-center max-w-sm mx-4">
            <p className="text-2xl md:text-3xl font-black text-primary whitespace-pre-line">
              {state.celebrationMessage}
            </p>
          </div>
        </div>
      )}

      {/* Wrong answer feedback */}
      {state.isCorrect === false && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
          <div className="text-8xl animate-bounce-in grayscale">
            😂
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
