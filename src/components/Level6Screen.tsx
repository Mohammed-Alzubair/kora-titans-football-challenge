import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { playerHaircuts, wrongPlayerNames, PlayerHaircut } from '@/data/playerHaircuts';
import { useSound } from '@/hooks/useSound';
import { Scissors, XCircle, RotateCcw, Timer, Crown, Trophy, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';

const QUESTIONS_COUNT = 10;
const QUESTION_TIME = 20;
const TRANSITION_DELAY = 700; // انتقال سريع

interface GameState {
  currentQuestion: number;
  score: number;
  answerPhase: 'question' | 'result';
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  gameOver: boolean;
  celebrationMessage: string | null;
  consecutiveCorrect: number;
  consecutiveWrong: number;
  timeLeft: number;
  totalCorrect: number;
}

function generateOptions(player: PlayerHaircut, allPlayers: PlayerHaircut[]): string[] {
  const options = [player.name];
  
  // أضف أسماء لاعبين آخرين كخيارات خاطئة
  const otherPlayers = allPlayers
    .filter(p => p.id !== player.id)
    .map(p => p.name);
  
  const wrongNames = [...wrongPlayerNames, ...otherPlayers]
    .filter(name => name !== player.name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  options.push(...wrongNames);
  
  return options.sort(() => Math.random() - 0.5);
}

export function Level6Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);
  const [players] = useState<PlayerHaircut[]>(() => {
    return [...playerHaircuts].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_COUNT);
  });
  
  const [options, setOptions] = useState<string[]>(() => generateOptions(players[0], playerHaircuts));
  
  const [state, setState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    answerPhase: 'question',
    selectedAnswer: null,
    isCorrect: null,
    gameOver: false,
    celebrationMessage: null,
    consecutiveCorrect: 0,
    consecutiveWrong: 0,
    timeLeft: QUESTION_TIME,
    totalCorrect: 0 });

  // Auto-solve next question (special help)
  useEffect(() => {
    if (autoSolveNext && state.answerPhase === 'question') {
      setAutoSolveNext(false);
      setTimeout(() => { if (currentPlayer?.name) handleSelect(currentPlayer?.name as any); }, 500);
    }
  }, [autoSolveNext, state.currentQuestion, state.answerPhase]);

  const currentPlayer = players[state.currentQuestion];

  const getMessage = useCallback((isCorrect: boolean, totalCorrect: number): string | null => {
    if (!isCorrect) {
      return "ركزززززز 🙂 شوف الصورة أكثررر!";
    }
    return "ذاكرتك من حديد! 🔥";
  }, []);

  const getFinalMessage = useCallback((totalCorrect: number): { title: string; subtitle: string; emoji: string } => {
    if (totalCorrect === QUESTIONS_COUNT) {
      return {
        title: "😵‍💫 لقد قهرتني!",
        subtitle: "أنت أسطورة حقيقية! ما توقعت هذا منك!",
        emoji: "👑"
      };
    }
    if (totalCorrect >= 8) {
      return {
        title: "يا عفو الله! 🙂",
        subtitle: "شكلك متابع فيفا من زمان!",
        emoji: "🔥"
      };
    }
    if (totalCorrect >= 5) {
      return {
        title: "مش بطال!",
        subtitle: "معلوماتك عن اللاعبين جيدة",
        emoji: "💪"
      };
    }
    return {
      title: "تحتاج تتابع أكثر! 😂",
      subtitle: "روح شاهد مقاطع اللاعبين",
      emoji: "📺"
    };
  }, []);

  const nextQuestion = useCallback(() => {
    setHiddenIndices([]);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (state.currentQuestion >= QUESTIONS_COUNT - 1) {
      setState(prev => ({ ...prev, gameOver: true }));
      playSound('gameOver');
      return;
    }

    const nextIndex = state.currentQuestion + 1;
    setOptions(generateOptions(players[nextIndex], playerHaircuts));
    
    setState(prev => ({
      ...prev,
      currentQuestion: nextIndex,
      answerPhase: 'question',
      selectedAnswer: null,
      isCorrect: null,
      celebrationMessage: null,
      timeLeft: QUESTION_TIME }));
  }, [state.currentQuestion, players, playSound]);

  const handleSelect = useCallback((answer: string) => {
    if (state.answerPhase === 'result') return;

    const isCorrect = answer === currentPlayer.name;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (isCorrect) {
      const newTotalCorrect = state.totalCorrect + 1;
      const message = getMessage(true, newTotalCorrect);
      
      setState(prev => ({
        ...prev,
        selectedAnswer: answer,
        isCorrect: true,
        answerPhase: 'result',
        score: prev.score + 1,
        consecutiveCorrect: prev.consecutiveCorrect + 1,
        consecutiveWrong: 0,
        celebrationMessage: message,
        totalCorrect: newTotalCorrect }));

      playSound('correct');
      setTimeout(nextQuestion, TRANSITION_DELAY);
    } else {
      const message = getMessage(false, state.totalCorrect);
      
      setState(prev => ({
        ...prev,
        selectedAnswer: answer,
        isCorrect: false,
        answerPhase: 'result',
        consecutiveCorrect: 0,
        consecutiveWrong: prev.consecutiveWrong + 1,
        celebrationMessage: message }));

      playSound('wrong');
      
      // انتقل للسؤال التالي بدل الخسارة
      setTimeout(nextQuestion, TRANSITION_DELAY);
    }
  }, [state, currentPlayer, getMessage, nextQuestion, playSound]);

  const handleTimeout = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    const message = "انتهى الوقت! ⏰";
    
    setState(prev => ({
      ...prev,
      selectedAnswer: null,
      isCorrect: false,
      answerPhase: 'result',
      consecutiveCorrect: 0,
      consecutiveWrong: prev.consecutiveWrong + 1,
      celebrationMessage: message }));

    playSound('wrong');
    
    // انتقل للسؤال التالي بدل الخسارة
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [playSound, nextQuestion]);

  useEffect(() => {
    if (state.answerPhase !== 'question' || state.gameOver || isPaused) return;

    timerRef.current = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 1) {
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
  }, [state.answerPhase, state.gameOver, state.currentQuestion, isPaused]);

  useEffect(() => {
    if (state.answerPhase === 'question' && state.timeLeft <= 0) {
      handleTimeout();
    }
  }, [state.timeLeft, state.answerPhase, handleTimeout]);

  const handleHelpEliminate = () => {
    const correctVal = currentPlayer?.name;
    const wrongIdxs = (options || []).map((o: any, i: number) => ({ o, i })).filter((x: any) => x.o !== correctVal).map((x: any) => x.i);
    const toHide = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenIndices(toHide);
    setHelp1Used(true);
  };

  const handleHelpSolve = () => {
    if (currentPlayer?.name) handleSelect(currentPlayer?.name as any);
    setSolveUsed(true);
  };

  const handleHelpSpecial = () => {
    if (currentPlayer?.name) handleSelect(currentPlayer?.name as any);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };


  if (state.gameOver) {
    const finalResult = getFinalMessage(state.totalCorrect);
    const isPerfect = state.totalCorrect >= QUESTIONS_COUNT * 0.8;
    
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Grass background */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-900 via-green-700 to-green-800" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-8"
              style={{
                top: `${i * 5}%`,
                background: i % 2 === 0 
                  ? 'rgba(34, 197, 94, 0.1)' 
                  : 'rgba(22, 163, 74, 0.15)' }}
            />
          ))}
        </div>
        
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="result-overlay animate-bounce-in bg-black/60 backdrop-blur-md rounded-3xl border border-primary/30 max-w-md mx-4">
            <div className="text-center p-8">
              {isPerfect ? (
                <Trophy className="w-24 h-24 mx-auto text-primary mb-4 animate-pulse" />
              ) : state.totalCorrect >= 5 ? (
                <Scissors className="w-24 h-24 mx-auto text-yellow-400 mb-4" />
              ) : (
                <XCircle className="w-24 h-24 mx-auto text-destructive mb-4" />
              )}
              
              <div className="text-6xl mb-4">{finalResult.emoji}</div>
              
              <h2 className="game-title text-2xl md:text-3xl font-black mb-4 leading-relaxed text-white">
                {finalResult.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                {finalResult.subtitle}
              </p>
              
              <p className="text-2xl text-foreground mb-8">
                نتيجتك: <span className="text-primary font-bold">{state.totalCorrect}</span> من {QUESTIONS_COUNT}
              </p>
              
              <div className="flex flex-col gap-3">
                {state.totalCorrect >= Math.ceil(QUESTIONS_COUNT * 0.5) && onLevelComplete && (
                  <button onClick={() => onLevelComplete?.({ score: state.totalCorrect, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start flex items-center gap-2 mx-auto bg-green-600 hover:bg-green-700">
                    المستوى التالي ➡️
                  </button>
                )}
                <button onClick={onRestart} className="btn-start flex items-center gap-2 mx-auto">
                  <RotateCcw className="w-6 h-6" />
                  العب من البداية
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col relative overflow-hidden">
      {/* Game Controls */}
      <GameControls 
        onExit={onRestart}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
        isPaused={isPaused}
      />
      
      {/* Grass background */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-900 via-green-700 to-green-800" />
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-8"
            style={{
              top: `${i * 5}%`,
              background: i % 2 === 0 
                ? 'rgba(34, 197, 94, 0.1)' 
                : 'rgba(22, 163, 74, 0.15)' }}
          />
        ))}
      </div>

      {/* Player silhouettes in background */}
      <div className="absolute left-2 bottom-0 opacity-20">
        <div className="w-16 h-32 md:w-24 md:h-48 bg-gradient-to-t from-transparent via-primary/40 to-primary/60 rounded-t-full" 
             style={{ clipPath: 'polygon(30% 0%, 70% 0%, 85% 100%, 15% 100%)' }} />
      </div>
      <div className="absolute right-2 bottom-0 opacity-20">
        <div className="w-16 h-32 md:w-24 md:h-48 bg-gradient-to-t from-transparent via-accent/40 to-accent/60 rounded-t-full" 
             style={{ clipPath: 'polygon(30% 0%, 70% 0%, 85% 100%, 15% 100%)' }} />
      </div>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge bg-black/50">
          ✂️ {state.score}
        </div>
          <div className="text-muted-foreground font-bold text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        
        <div className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all",
          state.timeLeft <= 5 
            ? "bg-destructive/20 text-destructive animate-pulse" 
            : "bg-green-900/50 text-green-400"
        )}>
          <Timer className="w-5 h-5" />
          {state.timeLeft}
        </div>
        
        <div className="bg-yellow-400/20 px-3 py-1 rounded-full text-yellow-400 font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" />
          المستوى 6
        </div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full">
        </div>
      </div>


      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-2xl">
          
          {/* Question Card with Haircut Image */}
          <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 mb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Scissors className="w-6 h-6 text-yellow-400" />
              <span className="text-lg md:text-xl font-bold text-white">
                من صاحب هذه القصة؟ 💇
              </span>
            </div>
            
            {/* Haircut Image - FIFA style card */}
            <div className="relative mx-auto w-48 h-48 md:w-64 md:h-64 mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl transform rotate-3" />
              <div className="absolute inset-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden">
                {state.answerPhase === 'question' ? (
                  /* قبل الإجابة: أظهر فقط الجبهة والشعر (من فوق الحاجبين) */
                  <div className="w-full h-full relative overflow-hidden">
                    <img
                      src={currentPlayer.image}
                      alt="تخمين اللاعب"
                      className="w-full object-cover object-top"
                      style={{ 
                        height: '250%',
                        objectPosition: 'top center',
                        clipPath: 'inset(0 0 80% 0)'
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    {/* تأثير القطع التدريجي */}
                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent" />
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                      <span className="text-4xl">❓</span>
                    </div>
                  </div>
                ) : (
                  /* بعد الإجابة: أظهر الصورة كاملة مع علامة صح/غلط */
                  <div className="w-full h-full relative">
                    <img
                      src={currentPlayer.image}
                      alt={currentPlayer.name}
                      className="w-full h-full object-cover object-top animate-bounce-in"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    {/* علامة صح أو غلط على الصورة */}
                    <div className={cn(
                      "absolute inset-0 flex items-center justify-center",
                      state.isCorrect ? "bg-green-500/20" : "bg-red-500/20"
                    )}>
                      {state.isCorrect ? (
                        <div className="bg-green-500 rounded-full p-4 shadow-lg shadow-green-500/50 animate-bounce-in">
                          <Check className="w-16 h-16 text-white" strokeWidth={4} />
                        </div>
                      ) : (
                        <div className="bg-red-500 rounded-full p-4 shadow-lg shadow-red-500/50 animate-bounce-in">
                          <X className="w-16 h-16 text-white" strokeWidth={4} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className="absolute top-2 right-2 text-2xl">⚽</div>
              </div>
            </div>
            
            {/* Reveal player name after answer */}
            {state.answerPhase === 'result' && (
              <div className="mt-4 animate-bounce-in">
                <p className="text-xl font-bold text-yellow-400">
                  {currentPlayer.name}
                </p>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            {options.map((option, _hIdx) => {
              if (hiddenIndices.includes(_hIdx)) return <div key={_hIdx} className="p-3 rounded-2xl border-2 border-white/10 bg-black/20 opacity-20 min-h-[52px]" />;
              let cardClass = "bg-black/40 backdrop-blur-sm border-white/20 hover:border-green-400/50";
              
              if (state.answerPhase === 'result') {
                if (option === currentPlayer.name) {
                  cardClass = "bg-green-500/30 border-green-400";
                } else if (option === state.selectedAnswer) {
                  cardClass = "bg-destructive/20 border-destructive";
                }
              }
              
              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  disabled={state.answerPhase === 'result'}
                  className={cn(
                    "rounded-2xl border-2 p-4 transition-all duration-200 flex items-center justify-center min-h-[70px]",
                    cardClass,
                    state.answerPhase === 'question' && "hover:scale-105 active:scale-95"
                  )}
                >
                  <span className="font-bold text-base md:text-lg text-white">{option}</span>
                </button>
              );
            })}
          </div>
        </div>
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
            disabled={state.answerPhase === 'result' || state.gameOver}
          />

      {state.celebrationMessage && (
        <div className="fixed top-24 left-0 right-0 pointer-events-none flex justify-center z-20">
          <div className={cn(
            "p-4 px-8 rounded-2xl border-2 backdrop-blur-sm animate-bounce-in text-center",
            state.isCorrect 
              ? "bg-green-500/30 border-green-400/50" 
              : "bg-destructive/30 border-destructive/50"
          )}>
            <p className={cn(
              "text-xl md:text-2xl font-black",
              state.isCorrect ? "text-green-400" : "text-red-400"
            )}>
              {state.celebrationMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
