import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Club, clubs } from '@/data/clubs';
import { getAllQuizQuestions, QuizQuestion } from '@/data/clubStats';
import { useSound } from '@/hooks/useSound';
import { Trophy, XCircle, RotateCcw, Brain, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BattleBackground } from './BattleBackground';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';

const QUESTIONS_COUNT = 10;
const STAT_DISPLAY_TIME = 1500;
const QUESTION_TIME = 20; // 20 ثانية لكل سؤال

const CORRECT_MESSAGES = [
  "واضح إنك متابع! 📺",
  "معلوماتك قوية! 💪",
  "أحسنت يا بطل! 🏆",
  "صح! إنت وحش! 🔥",
  "برافو عليك! 👏",
  "ذاكرتك حديد! 🧠",
  "يا سلام عليك! ⭐",
];

// رسائل الخسارة المتتالية
const CONSECUTIVE_LOSS_MESSAGES: Record<number, string> = {
  2: "😂 ما أضعفك",
  3: "أنت كل شي إلا مشجع كرة القدم 🙂",
  4: "قلت لك أنت كل شي إلا مشجع كرة القدم" };

// رسائل خاصة بالأندية عند الخطأ
const CLUB_WRONG_MESSAGES: Record<string, string> = {
  'real_madrid': "عبسي متعصب 😤",
  'barcelona': "حمدوني متعصب 😤",
  'chelsea': "وحد الله 🙂" };

// رسائل خاصة بالأندية عند الصح
const CLUB_CORRECT_MESSAGES: Record<string, string> = {
  'chelsea': "شووووووب ولك! 💙" };

interface GameState {
  currentQuestion: number;
  score: number;
  questions: QuizQuestion[];
  phase: 'showing-stats' | 'choosing' | 'result';
  currentStatIndex: number;
  selectedClubId: string | null;
  isCorrect: boolean | null;
  gameOver: boolean;
  celebrationMessage: string | null;
  consecutiveLosses: number;
  timeLeft: number;
  shuffledOptions: Club[];
}

export function Level4Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);
  
  const [state, setState] = useState<GameState>(() => {
    const questions = getAllQuizQuestions().slice(0, QUESTIONS_COUNT);
    const firstQ = questions[0];
    const shuffled = [firstQ.correctClub, ...firstQ.wrongOptions].sort(() => Math.random() - 0.5);
    return {
      currentQuestion: 0,
      score: 0,
      questions,
      phase: 'showing-stats',
      currentStatIndex: 0,
      selectedClubId: null,
      isCorrect: null,
      gameOver: false,
      celebrationMessage: null,
      consecutiveLosses: 0,
      timeLeft: QUESTION_TIME,
      shuffledOptions: shuffled };
  });

  // Auto-solve next question (special help)
  useEffect(() => {
    if (autoSolveNext && state.phase === 'choosing' && !state.selectedClubId) {
      setAutoSolveNext(false);
      setTimeout(() => { if (currentQ?.correctClub) handleSelect(currentQ?.correctClub as any); }, 500);
    }
  }, [autoSolveNext, state.currentQuestion]);

  const currentQ = state.questions[state.currentQuestion];

  const getCorrectMessage = useCallback((clubId: string) => {
    // رسالة خاصة بالنادي
    if (CLUB_CORRECT_MESSAGES[clubId]) {
      return CLUB_CORRECT_MESSAGES[clubId];
    }
    return CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)];
  }, []);

  const getWrongMessage = useCallback((correctClubId: string, consecutiveLosses: number) => {
    // رسالة الخسارة المتتالية لها أولوية
    if (consecutiveLosses >= 2 && CONSECUTIVE_LOSS_MESSAGES[consecutiveLosses]) {
      return CONSECUTIVE_LOSS_MESSAGES[consecutiveLosses];
    }
    // رسالة خاصة بالنادي الصحيح
    if (CLUB_WRONG_MESSAGES[correctClubId]) {
      return CLUB_WRONG_MESSAGES[correctClubId];
    }
    return null;
  }, []);

  const nextQuestion = useCallback(() => {
    setHiddenIndices([]);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (state.currentQuestion >= QUESTIONS_COUNT - 1) {
      // Check if won - go to level 5
      const isWinner = state.score >= QUESTIONS_COUNT / 2;
      if (isWinner) {
        onLevelComplete?.({ score: state.score, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 });
        return;
      }
      setState(prev => ({ ...prev, gameOver: true }));
      playSound('gameOver');
      return;
    }

    const nextQ = state.questions[state.currentQuestion + 1];
    const shuffled = [nextQ.correctClub, ...nextQ.wrongOptions].sort(() => Math.random() - 0.5);
    setState(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      phase: 'showing-stats',
      currentStatIndex: 0,
      selectedClubId: null,
      isCorrect: null,
      celebrationMessage: null,
      timeLeft: QUESTION_TIME,
      shuffledOptions: shuffled }));
  }, [state.currentQuestion, state.score, playSound, onLevelComplete]);

  const handleSelect = useCallback((club: Club | null, isTimeout: boolean = false) => {
    if (state.selectedClubId || state.phase !== 'choosing') return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const isCorrect = club ? club.id === currentQ.correctClub.id : false;
    const newConsecutiveLosses = isCorrect ? 0 : state.consecutiveLosses + 1;
    
    let message: string | null = null;
    if (isCorrect) {
      message = getCorrectMessage(currentQ.correctClub.id);
    } else {
      message = getWrongMessage(currentQ.correctClub.id, newConsecutiveLosses);
    }
    
    setState(prev => ({
      ...prev,
      selectedClubId: club?.id || 'timeout',
      isCorrect,
      phase: 'result',
      score: isCorrect ? prev.score + 1 : prev.score,
      celebrationMessage: message,
      consecutiveLosses: newConsecutiveLosses }));

    if (isCorrect) {
      playSound('correct');
    } else {
      playSound('wrong');
    }

    setTimeout(nextQuestion, 2500);
  }, [state.selectedClubId, state.phase, state.consecutiveLosses, currentQ, playSound, nextQuestion, getCorrectMessage, getWrongMessage]);

  // Timer effect
  useEffect(() => {
    if (state.phase !== 'choosing' || state.gameOver || isPaused) return;

    timerRef.current = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 1) {
          // انتهى الوقت
          return prev;
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.phase, state.gameOver, state.currentQuestion, isPaused]);

  // Handle timeout
  useEffect(() => {
    if (state.phase === 'choosing' && state.timeLeft <= 0 && !state.selectedClubId) {
      handleSelect(null, true);
    }
  }, [state.timeLeft, state.phase, state.selectedClubId, handleSelect]);

  // عرض الإحصائيات واحدة تلو الأخرى
  useEffect(() => {
    if (state.phase !== 'showing-stats' || state.gameOver || isPaused) return;

    const statsCount = currentQ?.stats.stats.length || 0;
    
    if (state.currentStatIndex >= statsCount) {
      // انتهت الإحصائيات، انتقل لمرحلة الاختيار
      setState(prev => ({ ...prev, phase: 'choosing' }));
      return;
    }

    const timer = setTimeout(() => {
      setState(prev => ({
        ...prev,
        currentStatIndex: prev.currentStatIndex + 1 }));
    }, STAT_DISPLAY_TIME);

    return () => clearTimeout(timer);
  }, [state.phase, state.currentStatIndex, state.gameOver, currentQ, isPaused]);

  // Start background music

  const handleHelpEliminate = () => {
    const correctVal = currentQ?.correctClub;
    const wrongIdxs = (state.shuffledOptions).map((o: any, i: number) => ({ o, i })).filter((x: any) => x.o?.id !== correctVal?.id).map((x: any) => x.i);
    const toHide = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenIndices(toHide);
    setHelp1Used(true);
  };

  const handleHelpSolve = () => {
    if (currentQ?.correctClub) handleSelect(currentQ?.correctClub as any);
    setSolveUsed(true);
  };

  const handleHelpSpecial = () => {
    if (currentQ?.correctClub) handleSelect(currentQ?.correctClub as any);
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
                مشكك بسيط 😑
                <br />
                صدفة لا أكثر!
              </h2>
              <p className="text-xl text-primary mb-4">
                10 من 10! بالصدفة طبعاً 🙄
              </p>
            </>
          ) : isWinner ? (
            <>
              <Trophy className="w-24 h-24 mx-auto text-primary mb-4" />
              <h2 className="game-title text-4xl md:text-5xl font-black mb-4">
                🎉 معلوماتك ممتازة! 🎉
              </h2>
            </>
          ) : (
            <>
              <XCircle className="w-24 h-24 mx-auto text-destructive mb-4" />
              <h2 className="text-4xl md:text-5xl font-black text-destructive mb-4">
                تحتاج تتابع أكثر! 📺
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

  const allOptions = state.shuffledOptions;

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
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge">
          ⚽ {state.score}
        </div>
          <div className="text-muted-foreground font-bold text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        
        {/* Timer */}
        {state.phase === 'choosing' && (
          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all",
            state.timeLeft <= 3 
              ? "bg-destructive/20 text-destructive animate-pulse" 
              : "bg-primary/20 text-primary"
          )}>
            <Timer className="w-5 h-5" />
            {state.timeLeft}
          </div>
        )}
        
        <div className="bg-primary/20 px-3 py-1 rounded-full text-primary font-bold text-sm flex items-center gap-1">
          <Brain className="w-4 h-4" />
          المستوى 4
        </div>
              </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        
        {/* Stats Display Phase */}
        {state.phase === 'showing-stats' && (
          <div className="text-center">
            <h2 className="question-text text-foreground mb-8">
              هذا النادي لديه... 🤔
            </h2>
            
            <div className="space-y-4 min-h-[300px] flex flex-col items-center justify-center">
              {currentQ.stats.stats.slice(0, state.currentStatIndex + 1).map((stat, index) => (
                <div 
                  key={index}
                  className={cn(
                    "bg-transparent backdrop-blur-sm border border-primary/30 rounded-xl px-6 py-4 animate-bounce-in",
                    index === state.currentStatIndex && "border-primary shadow-lg"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <p className="text-xl md:text-2xl font-bold text-foreground">
                    <span className="text-primary">{stat.value}</span> {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {currentQ.stats.stats.map((_, index) => (
                <div 
                  key={index}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    index <= state.currentStatIndex 
                      ? "bg-primary scale-110" 
                      : "bg-muted"
                  )}
                />
              ))}
            </div>
          </div>
        )}

        {/* Choosing Phase */}
        {(state.phase === 'choosing' || state.phase === 'result') && (
          <div className="w-full max-w-2xl">
            <h2 className="question-text text-foreground mb-6 text-center">
              من هو النادي؟ 🏆
            </h2>
            
            {/* Stats Summary */}
            <div className="bg-transparent backdrop-blur-sm border border-muted rounded-xl p-4 mb-6">
              <div className="flex flex-wrap justify-center gap-3">
                {currentQ.stats.stats.map((stat, index) => (
                  <span key={index} className="text-sm text-muted-foreground">
                    {stat.value} {stat.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Club Options */}
            <div className="grid grid-cols-2 gap-4">
              {allOptions.map((club, _hIdx) => {
              if (hiddenIndices.includes(_hIdx)) return <div key={_hIdx} className="p-3 rounded-2xl border-2 border-white/10 bg-black/20 opacity-20 min-h-[52px]" />;
                let cardClass = "bg-transparent backdrop-blur-sm border-border hover:border-primary/50";
                if (state.phase === 'result') {
                  if (club.id === currentQ.correctClub.id) {
                    cardClass = "bg-primary/20 border-primary";
                  } else if (club.id === state.selectedClubId) {
                    cardClass = "bg-destructive/20 border-destructive";
                  }
                }
                
                return (
                  <button
                    key={club.id}
                    onClick={() => handleSelect(club, false)}
                    disabled={state.phase === 'result'}
                    className={cn(
                      "rounded-2xl border-2 p-4 transition-colors duration-200 flex flex-col items-center gap-3",
                      cardClass
                    )}
                  >
                    <img
                      src={club.logo}
                      alt={club.name}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain transition-none"
                      style={{ animation: 'none' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    <span className="font-bold text-foreground">{club.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Celebration/Taunt message overlay */}
      
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
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center bg-black/30 z-20">
          <div className={cn(
            "p-6 rounded-2xl border-2 shadow-2xl animate-bounce-in text-center max-w-sm mx-4",
            state.isCorrect 
              ? "bg-card border-primary" 
              : "bg-destructive/10 border-destructive"
          )}>
            <p className={cn(
              "text-2xl md:text-3xl font-black",
              state.isCorrect ? "text-primary" : "text-destructive"
            )}>
              {state.celebrationMessage}
            </p>
            {!state.isCorrect && (
              <p className="text-lg text-muted-foreground mt-2">
                الصحيح: {currentQ.correctClub.name}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Wrong answer feedback */}
      {state.isCorrect === false && !state.celebrationMessage && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-20">
          <div className="text-center animate-bounce-in">
            <div className="text-8xl grayscale mb-4">😅</div>
            <p className="text-xl text-destructive font-bold">
              الصحيح: {currentQ.correctClub.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
