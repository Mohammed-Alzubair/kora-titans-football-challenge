import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Club, clubs } from '@/data/clubs';
import { useSound } from '@/hooks/useSound';
import { Trophy, XCircle, RotateCcw, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BattleBackground } from './BattleBackground';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';

const GAME_TIME = 20;
const QUESTIONS_COUNT = 10;

const CORRECT_MESSAGES = [
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

// Visual modifications for fake logos - VERY OBVIOUS internal shape changes
const LOGO_MODIFICATIONS = [
  // Shape distortions - changes the internal structure
  { transform: 'scaleX(-1)', label: 'معكوس أفقياً' },
  { transform: 'scaleY(-1)', label: 'معكوس رأسياً' },
  { transform: 'skewX(15deg)', label: 'مائل جانبياً' },
  { transform: 'skewY(10deg)', label: 'مائل عمودياً' },
  { transform: 'scale(0.8) rotate(10deg)', label: 'أصغر ومائل' },
  
  // Clip paths - removes parts of the logo
  { clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 85%)', label: 'مقصوص من الأسفل' },
  { clipPath: 'polygon(0 15%, 100% 15%, 100% 100%, 0 100%)', label: 'مقصوص من الأعلى' },
  { clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 15% 100%)', label: 'مقصوص من اليسار' },
  { clipPath: 'circle(45% at 50% 50%)', label: 'دائري مقصوص' },
  
  // Heavy color changes + distortion
  { filter: 'hue-rotate(90deg) saturate(2)', label: 'ألوان مختلفة تماماً' },
  { filter: 'invert(1)', label: 'ألوان معكوسة بالكامل' },
  { filter: 'grayscale(1)', label: 'أبيض وأسود' },
  { filter: 'sepia(1) hue-rotate(180deg)', label: 'ألوان غريبة' },
  
  // Combined effects
  { transform: 'scaleX(-1)', filter: 'brightness(1.3)', label: 'معكوس وفاتح' },
  { transform: 'rotate(8deg)', filter: 'saturate(0.3)', label: 'مائل وباهت' },
];

interface LogoOption {
  id: string;
  isOriginal: boolean;
  style: React.CSSProperties;
}

interface GameState {
  currentQuestion: number;
  score: number;
  correct: Club | null;
  options: LogoOption[];
  timeLeft: number;
  selectedId: string | null;
  isCorrect: boolean | null;
  gameOver: boolean;
  usedClubIds: string[];
  consecutiveLosses: number;
  celebrationMessage: string | null;
}

function generateLogoOptions(club: Club): LogoOption[] {
  // Randomly select 2 different modifications
  const shuffledMods = [...LOGO_MODIFICATIONS].sort(() => Math.random() - 0.5);
  const selectedMods = shuffledMods.slice(0, 2);
  
  const options: LogoOption[] = [
    { id: 'original', isOriginal: true, style: {} },
    { id: 'fake1', isOriginal: false, style: selectedMods[0] },
    { id: 'fake2', isOriginal: false, style: selectedMods[1] },
  ];
  
  // Shuffle the options
  return options.sort(() => Math.random() - 0.5);
}

function getRandomClub(excludeIds: string[] = []): Club {
  const availableClubs = clubs.filter(c => !excludeIds.includes(c.id));
  if (availableClubs.length === 0) {
    return clubs[Math.floor(Math.random() * clubs.length)];
  }
  return availableClubs[Math.floor(Math.random() * availableClubs.length)];
}

export function Level3Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);
  const [state, setState] = useState<GameState>(() => {
    const club = getRandomClub();
    return {
      currentQuestion: 1,
      score: 0,
      correct: club,
      options: generateLogoOptions(club),
      timeLeft: GAME_TIME,
      selectedId: null,
      isCorrect: null,
      gameOver: false,
      usedClubIds: [club.id],
      consecutiveLosses: 0,
      celebrationMessage: null };
  });

  // Auto-solve next question (special help)
  useEffect(() => {
    if (autoSolveNext && !state.selectedId) {
      setAutoSolveNext(false);
      setTimeout(() => { if (state.options.find(o => o.isOriginal)) handleSelect(state.options.find(o => o.isOriginal) as any); }, 500);
    }
  }, [autoSolveNext, state.currentQuestion, state.selectedId]);

  const getRandomMessage = useCallback(() => {
    return CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)];
  }, []);

  const nextQuestion = useCallback(() => {
    if (state.currentQuestion >= QUESTIONS_COUNT) {
      // Check if won - go to level 4
      const isWinner = state.score >= QUESTIONS_COUNT / 2;
      if (isWinner) {
        onLevelComplete?.({ score: state.score, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 });
        return;
      }
      setState(prev => ({ ...prev, gameOver: true }));
      playSound('gameOver');
      return;
    }

    const club = getRandomClub(state.usedClubIds);
    setState(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      correct: club,
      options: generateLogoOptions(club),
      timeLeft: GAME_TIME,
      selectedId: null,
      isCorrect: null,
      usedClubIds: [...prev.usedClubIds, club.id],
      celebrationMessage: null }));
    setHelp1Used(false); setSolveUsed(false); setSpecialUsed(false); setHiddenIndices([]);
  }, [state.currentQuestion, state.usedClubIds, state.score, playSound, onLevelComplete]);

  const handleSelect = useCallback((option: LogoOption) => {
    if (state.selectedId) return;

    const isCorrect = option.isOriginal;
    const message = isCorrect ? getRandomMessage() : null;
    
    setState(prev => ({
      ...prev,
      selectedId: option.id,
      isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
      consecutiveLosses: isCorrect ? 0 : prev.consecutiveLosses + 1,
      celebrationMessage: message }));

    if (isCorrect) {
      playSound('correct');
    } else {
      playSound('wrong');
    }

    setTimeout(nextQuestion, 2000);
  }, [state.selectedId, playSound, nextQuestion, getRandomMessage]);

  // Timer effect
  useEffect(() => {
    if (state.selectedId || state.gameOver || isPaused) return;

    const interval = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 0.1) {
          clearInterval(interval);
          playSound('wrong');
          setTimeout(nextQuestion, 2000);
          return { 
            ...prev, 
            timeLeft: 0, 
            isCorrect: false,
            consecutiveLosses: prev.consecutiveLosses + 1 };
        }
        return { ...prev, timeLeft: prev.timeLeft - 0.1 };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [state.selectedId, state.gameOver, isPaused, playSound, nextQuestion]);

  // Start background music

  const handleHelpEliminate = () => {
    const correct = state.options.find(o => o.isOriginal);
    const wrongIdxs = (state.options || []).map((o: any, i: number) => ({ o, i })).filter((x: any) => x.o !== correct).map((x: any) => x.i);
    const toHide = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenIndices(toHide);
    setHelp1Used(true);
  };

  const handleHelpSolve = () => {
    if (state.options.find(o => o.isOriginal)) handleSelect(state.options.find(o => o.isOriginal) as any);
    setSolveUsed(true);
  };

  const handleHelpSpecial = () => {
    if (state.options.find(o => o.isOriginal)) handleSelect(state.options.find(o => o.isOriginal) as any);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };


  if (state.gameOver) {
    const isPerfect = state.score === QUESTIONS_COUNT;
    const isWinner = state.score >= QUESTIONS_COUNT / 2;
    
    return (
      <div className="result-overlay animate-bounce-in">
        <div className="text-center p-8">
          {isPerfect ? (
            <>
              <Trophy className="w-24 h-24 mx-auto text-primary mb-4 animate-pulse" />
              <h2 className="game-title text-3xl md:text-4xl font-black mb-4 leading-relaxed">
                أداء مثالي! 🏆
                <br />
                أنت بطل حقيقي! ⭐
              </h2>
              <p className="text-xl text-primary mb-4">
                برافو عليك! 👏
              </p>
            </>
          ) : isWinner ? (
            <>
              <Trophy className="w-24 h-24 mx-auto text-primary mb-4" />
              <h2 className="game-title text-4xl md:text-5xl font-black mb-4">
                🎉 أحسنت! 🎉
              </h2>
            </>
          ) : (
            <>
              <XCircle className="w-24 h-24 mx-auto text-destructive mb-4" />
              <h2 className="text-4xl md:text-5xl font-black text-destructive mb-4">
                جسمك ضعيففففف! 😂
              </h2>
            </>
          )}
          <p className="text-2xl text-foreground mb-8">
            نتيجتك: <span className="text-primary font-bold">{state.score}</span> من {QUESTIONS_COUNT}
          </p>
          <button onClick={onRestart} className="btn-start flex items-center gap-2 mx-auto">
            <RotateCcw className="w-6 h-6" />
            العب من البداية
          </button>
        </div>
      </div>
    );
  }

  const timerPercentage = (state.timeLeft / GAME_TIME) * 100;

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col relative overflow-hidden">
      {/* Game Controls */}
      <GameControls 
        onExit={onRestart}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
        isPaused={isPaused}
      />
      
      {/* Battle Background */}
      <BattleBackground />
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge">
          ⚽ {state.score}
        </div>
          <div className="text-muted-foreground font-bold text-sm">{state.currentQuestion} / {QUESTIONS_COUNT}</div>
        </div>
        <div className="bg-destructive/20 px-3 py-1 rounded-full text-destructive font-bold text-sm">
          المستوى 3 - جهنم 💀
        </div>
              </div>

      {/* Timer */}
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="timer-bar">
          <div 
            className="timer-fill"
            style={{ 
              width: `${timerPercentage}%`,
              background: timerPercentage < 30 
                ? 'linear-gradient(90deg, hsl(0 72% 51%), hsl(0 72% 60%))' 
                : 'var(--gradient-gold)'
            }}
          />
        </div>
        <p className="text-center mt-2 text-xl font-bold text-primary">
          {state.timeLeft.toFixed(1)}
        </p>
      </div>

      {/* Question */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Search className="w-6 h-6 text-primary" />
          <h2 className="question-text text-foreground">
            اعثر على شعار <span className="text-primary">{state.correct?.name}</span> الأصلي!
          </h2>
        </div>
        <p className="text-muted-foreground">واحد فقط أصلي... الباقي مزيف! 🔍</p>
      </div>

      {/* Logo Options */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-2xl">
          {state.options.map((option, index) => {
            if (hiddenIndices.includes(index)) {
              return (
                <div key={option.id} className="aspect-square rounded-2xl border-2 border-white/10 bg-black/20 opacity-20 p-4" />
              );
            }
            let cardClass = "bg-black/40 backdrop-blur-sm border-white/20 hover:border-primary/50";
            if (state.selectedId) {
              if (option.isOriginal) {
                cardClass = "bg-green-500/30 border-green-400 backdrop-blur-sm";
              } else if (option.id === state.selectedId) {
                cardClass = "bg-red-500/30 border-red-400 backdrop-blur-sm";
              }
            }
            
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option)}
                disabled={!!state.selectedId}
                className={cn(
                  "aspect-square rounded-2xl border-2 p-4 transition-all duration-200 flex items-center justify-center",
                  cardClass,
                  !state.selectedId && "hover:scale-105 active:scale-95"
                )}
              >
                <img
                  src={state.correct?.logo}
                  alt={`خيار ${index + 1}`}
                  className="w-full h-full object-contain"
                  style={option.style}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Consecutive losses warning */}
      {state.consecutiveLosses >= 2 && !state.selectedId && (
        <div className="fixed bottom-20 left-0 right-0 flex justify-center">
          <div className="bg-destructive/90 text-white px-6 py-3 rounded-full font-bold animate-bounce">
            جسمك ضعيففففف! 😂
          </div>
        </div>
      )}

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
            <p className="text-2xl md:text-3xl font-black text-primary">
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
  );
}
