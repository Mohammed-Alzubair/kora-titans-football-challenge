import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { championsLeagueFinals, wrongAnswersPool, wrongScoresPool, ChampionsLeagueFinal } from '@/data/championsLeague';
import { useSound } from '@/hooks/useSound';
import { Trophy, XCircle, RotateCcw, Timer, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BattleBackground } from './BattleBackground';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';

const QUESTIONS_COUNT = 10;
const QUESTION_TIME = 20;
const MAX_ATTEMPTS = 3;

interface GameState {
  currentQuestion: number;
  score: number;
  questionPhase: 'winner' | 'score'; // مرحلة السؤال: الفائز أو النتيجة
  answerPhase: 'question' | 'result';
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  gameOver: boolean;
  celebrationMessage: string | null;
  consecutiveCorrect: number;
  consecutiveWrong: number;
  timeLeft: number;
  attemptsLeft: number;
  wrongAttempts: string[];
  winnerAnswered: boolean; // هل أجاب على سؤال الفائز
  correctWinner: string | null; // الفائز الصحيح الذي اختاره
}

function generateWinnerOptions(final: ChampionsLeagueFinal): string[] {
  const options = [final.winner];
  const availableWrong = wrongAnswersPool.filter(
    team => team !== final.winner && team !== final.runnerUp
  );
  
  if (final.runnerUp) {
    options.push(final.runnerUp);
  }
  
  const shuffled = [...availableWrong].sort(() => Math.random() - 0.5);
  options.push(...shuffled.slice(0, 2));
  
  return options.sort(() => Math.random() - 0.5);
}

function generateScoreOptions(final: ChampionsLeagueFinal): string[] {
  const options = [final.score];
  const availableWrong = wrongScoresPool.filter(score => score !== final.score);
  
  const shuffled = [...availableWrong].sort(() => Math.random() - 0.5);
  options.push(...shuffled.slice(0, 3));
  
  return options.sort(() => Math.random() - 0.5);
}

export function Level5Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);
  const [finals] = useState<ChampionsLeagueFinal[]>(() => {
    return [...championsLeagueFinals].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_COUNT);
  });
  
  const [winnerOptions, setWinnerOptions] = useState<string[]>(() => generateWinnerOptions(finals[0]));
  const [scoreOptions, setScoreOptions] = useState<string[]>(() => generateScoreOptions(finals[0]));
  
  const [state, setState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    questionPhase: 'winner',
    answerPhase: 'question',
    selectedAnswer: null,
    isCorrect: null,
    gameOver: false,
    celebrationMessage: null,
    consecutiveCorrect: 0,
    consecutiveWrong: 0,
    timeLeft: QUESTION_TIME,
    attemptsLeft: MAX_ATTEMPTS,
    wrongAttempts: [],
    winnerAnswered: false,
    correctWinner: null });

  // Auto-solve next question (special help)
  useEffect(() => {
    if (autoSolveNext && state.answerPhase === 'question') {
      setAutoSolveNext(false);
      setTimeout(() => { if (correctAnswer) handleSelect(correctAnswer as any); }, 500);
    }
  }, [autoSolveNext, state.currentQuestion, state.answerPhase]);

  const currentFinal = finals[state.currentQuestion];

  const getMessage = useCallback((correct: number, wrong: number): string | null => {
    if (correct >= 6) return "يا وحش! أنت أسطورة! 🔥👑";
    if (correct >= 5) return "ماشاء الله تبارك الله! 🌟";
    if (correct >= 4) return "🙂 أنت روبوت أليس كذلك؟";
    if (correct >= 3) return "طغيييييييت 🙂";
    if (correct === 2) return "حبيبي الفاهم! 💪";
    if (wrong >= 2) return "ما أضعفك! 😂";
    return null;
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
    setWinnerOptions(generateWinnerOptions(finals[nextIndex]));
    setScoreOptions(generateScoreOptions(finals[nextIndex]));
    
    setState(prev => ({
      ...prev,
      currentQuestion: nextIndex,
      questionPhase: 'winner',
      answerPhase: 'question',
      selectedAnswer: null,
      isCorrect: null,
      celebrationMessage: null,
      timeLeft: QUESTION_TIME,
      attemptsLeft: MAX_ATTEMPTS,
      wrongAttempts: [],
      winnerAnswered: false,
      correctWinner: null }));
  }, [state.currentQuestion, finals, playSound]);

  const moveToScorePhase = useCallback(() => {
    setState(prev => ({
      ...prev,
      questionPhase: 'score',
      answerPhase: 'question',
      selectedAnswer: null,
      isCorrect: null,
      celebrationMessage: null,
      timeLeft: QUESTION_TIME,
      attemptsLeft: MAX_ATTEMPTS,
      wrongAttempts: [] }));
  }, []);

  const handleSelect = useCallback((answer: string) => {
    if (state.answerPhase === 'result' || state.wrongAttempts.includes(answer)) return;

    const isWinnerPhase = state.questionPhase === 'winner';
    const correctAnswer = isWinnerPhase ? currentFinal.winner : currentFinal.score;
    const isCorrect = answer === correctAnswer;
    
    if (isCorrect) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      const newConsecutiveCorrect = state.consecutiveCorrect + 1;
      const message = getMessage(newConsecutiveCorrect, 0);
      
      setState(prev => ({
        ...prev,
        selectedAnswer: answer,
        isCorrect: true,
        answerPhase: 'result',
        score: prev.score + 1,
        consecutiveCorrect: newConsecutiveCorrect,
        consecutiveWrong: 0,
        celebrationMessage: message,
        winnerAnswered: isWinnerPhase ? true : prev.winnerAnswered,
        correctWinner: isWinnerPhase ? answer : prev.correctWinner }));

      playSound('correct');
      
      if (isWinnerPhase) {
        setTimeout(moveToScorePhase, 1500);
      } else {
        setTimeout(nextQuestion, 2000);
      }
    } else {
      const newAttemptsLeft = state.attemptsLeft - 1;
      const newWrongAttempts = [...state.wrongAttempts, answer];
      
      if (newAttemptsLeft <= 0) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        
        const newConsecutiveWrong = state.consecutiveWrong + 1;
        const message = getMessage(0, newConsecutiveWrong);
        
        setState(prev => ({
          ...prev,
          selectedAnswer: answer,
          isCorrect: false,
          answerPhase: 'result',
          consecutiveCorrect: 0,
          consecutiveWrong: newConsecutiveWrong,
          attemptsLeft: 0,
          wrongAttempts: newWrongAttempts,
          celebrationMessage: message }));

        playSound('wrong');
        
        if (isWinnerPhase) {
          setTimeout(moveToScorePhase, 2000);
        } else {
          setTimeout(nextQuestion, 2000);
        }
      } else {
        setState(prev => ({
          ...prev,
          attemptsLeft: newAttemptsLeft,
          wrongAttempts: newWrongAttempts }));
        playSound('wrong');
      }
    }
  }, [state, currentFinal, getMessage, nextQuestion, moveToScorePhase, playSound]);

  const handleTimeout = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    const isWinnerPhase = state.questionPhase === 'winner';
    
    setState(prev => ({
      ...prev,
      selectedAnswer: null,
      isCorrect: false,
      answerPhase: 'result',
      consecutiveCorrect: 0,
      celebrationMessage: "انتهى الوقت! ⏰" }));

    playSound('wrong');
    
    if (isWinnerPhase) {
      setTimeout(moveToScorePhase, 1500);
    } else {
      setTimeout(nextQuestion, 1500);
    }
  }, [state.questionPhase, playSound, moveToScorePhase, nextQuestion]);

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
  }, [state.answerPhase, state.gameOver, state.currentQuestion, state.questionPhase, isPaused]);

  useEffect(() => {
    if (state.answerPhase === 'question' && state.timeLeft <= 0) {
      handleTimeout();
    }
  }, [state.timeLeft, state.answerPhase, handleTimeout]);

  const currentOptions = state.questionPhase === 'winner' ? winnerOptions : scoreOptions;
  const correctAnswer = state.questionPhase === 'winner' ? currentFinal.winner : currentFinal.score;

  const handleHelpEliminate = () => {
    const correct = correctAnswer;
    const wrongIdxs = (currentOptions || []).map((o: any, i: number) => ({ o, i })).filter((x: any) => x.o !== correct).map((x: any) => x.i);
    const toHide = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenIndices(toHide);
    setHelp1Used(true);
  };

  const handleHelpSolve = () => {
    if (correctAnswer) handleSelect(correctAnswer as any);
    setSolveUsed(true);
  };

  const handleHelpSpecial = () => {
    if (correctAnswer) handleSelect(correctAnswer as any);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };


  if (state.gameOver) {
    const isPerfect = state.score >= QUESTIONS_COUNT * 2 * 0.8;
    const isWinner = state.score >= QUESTIONS_COUNT;
    
    return (
      <div className="result-overlay animate-bounce-in">
        <div className="text-center p-8">
          {isPerfect ? (
            <>
              <Trophy className="w-24 h-24 mx-auto text-primary mb-4 animate-pulse" />
              <h2 className="game-title text-3xl md:text-4xl font-black mb-4 leading-relaxed">
                أنت أسطورة! 👑
                <br />
                خبير دوري الأبطال!
              </h2>
              <p className="text-xl text-primary mb-4">
                واضح إنك متابع حقيقي! 🏆
              </p>
            </>
          ) : isWinner ? (
            <>
              <Trophy className="w-24 h-24 mx-auto text-primary mb-4" />
              <h2 className="game-title text-4xl md:text-5xl font-black mb-4">
                🎉 أحسنت! 🎉
              </h2>
              <p className="text-xl text-muted-foreground mb-4">
                معلوماتك في دوري الأبطال جيدة!
              </p>
            </>
          ) : (
            <>
              <XCircle className="w-24 h-24 mx-auto text-destructive mb-4" />
              <h2 className="text-3xl md:text-4xl font-black text-destructive mb-4">
                رسمينننننن أنت خاسر! 😂
              </h2>
              <p className="text-xl text-muted-foreground mb-4">
                تحتاج تتابع دوري الأبطال أكثر!
              </p>
            </>
          )}
          <p className="text-2xl text-foreground mb-8">
            نتيجتك: <span className="text-primary font-bold">{state.score}</span> من {QUESTIONS_COUNT * 2}
          </p>
          <div className="flex flex-col gap-4 items-center">
            {onLevelComplete && state.score >= Math.ceil(QUESTIONS_COUNT * 0.5) && (
              <button onClick={() => onLevelComplete?.({ score: state.score, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start flex items-center gap-2">
                المستوى التالي ➡️
              </button>
            )}
            <button onClick={onRestart} className="btn-start flex items-center gap-2 bg-secondary hover:bg-secondary/80">
              <RotateCcw className="w-6 h-6" />
              العب من البداية
            </button>
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
      
      <BattleBackground />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge">
          ⚽ {state.score}
        </div>
          <div className="text-muted-foreground font-bold text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        
        <div className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all",
          state.timeLeft <= 5 
            ? "bg-destructive/20 text-destructive animate-pulse" 
            : "bg-primary/20 text-primary"
        )}>
          <Timer className="w-5 h-5" />
          {state.timeLeft}
        </div>
        
        <div className="bg-primary/20 px-3 py-1 rounded-full text-primary font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" />
          المستوى 5
        </div>
              </div>

      {/* Attempts indicator */}
      <div className="flex justify-center gap-2 mb-4 relative z-10">
        {[...Array(MAX_ATTEMPTS)].map((_, i) => (
          <div 
            key={i}
            className={cn(
              "w-4 h-4 rounded-full transition-all",
              i < state.attemptsLeft 
                ? "bg-primary" 
                : "bg-destructive/50"
            )}
          />
        ))}
        <span className="text-sm text-muted-foreground mr-2">
          {state.attemptsLeft} فرص متبقية
        </span>
      </div>

      {/* Phase indicator */}
      <div className="flex justify-center gap-4 mb-4 relative z-10">
        <div className={cn(
          "px-4 py-2 rounded-full text-sm font-bold transition-all",
          state.questionPhase === 'winner' 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted text-muted-foreground"
        )}>
          1️⃣ الفائز
        </div>
        <div className={cn(
          "px-4 py-2 rounded-full text-sm font-bold transition-all",
          state.questionPhase === 'score' 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted text-muted-foreground"
        )}>
          2️⃣ النتيجة
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-2xl">
          
          {/* Question Card */}
          <div className="bg-transparent backdrop-blur-sm border border-primary/30 rounded-2xl p-6 mb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-8 h-8 text-primary" />
              <span className="text-2xl md:text-3xl font-black text-primary">
                نهائي {currentFinal.year}
              </span>
            </div>
            
            <h2 className="question-text text-foreground mb-4">
              {state.questionPhase === 'winner' 
                ? "من فاز بدوري الأبطال؟ 🏆" 
                : `${state.correctWinner || currentFinal.winner} فاز... كم كانت النتيجة؟ ⚽`
              }
            </h2>
            
            {/* Match info - shown after score answer */}
            {state.answerPhase === 'result' && state.questionPhase === 'score' && (
              <div className="mt-4 p-4 bg-card/50 rounded-xl animate-bounce-in">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="text-center">
                    <img 
                      src={currentFinal.winnerLogo} 
                      alt={currentFinal.winner}
                      className="w-12 h-12 mx-auto mb-1 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    <span className="text-sm font-bold text-primary">{currentFinal.winner}</span>
                  </div>
                  <div className="text-xl font-bold text-foreground">{currentFinal.score}</div>
                  <div className="text-center">
                    <img 
                      src={currentFinal.runnerUpLogo} 
                      alt={currentFinal.runnerUp}
                      className="w-12 h-12 mx-auto mb-1 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    <span className="text-sm text-muted-foreground">{currentFinal.runnerUp}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">📍 {currentFinal.venue}</p>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            {currentOptions.map((option, _hIdx) => {
              if (hiddenIndices.includes(_hIdx)) return <div key={_hIdx} className="p-3 rounded-2xl border-2 border-white/10 bg-black/20 opacity-20 min-h-[52px]" />;
              let cardClass = "bg-transparent backdrop-blur-sm border-border hover:border-primary/50";
              const isWrongAttempt = state.wrongAttempts.includes(option);
              
              if (state.answerPhase === 'result') {
                if (option === correctAnswer) {
                  cardClass = "bg-primary/20 border-primary";
                } else if (option === state.selectedAnswer || isWrongAttempt) {
                  cardClass = "bg-destructive/20 border-destructive";
                }
              } else if (isWrongAttempt) {
                cardClass = "bg-destructive/20 border-destructive opacity-50";
              }
              
              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  disabled={state.answerPhase === 'result' || isWrongAttempt}
                  className={cn(
                    "rounded-2xl border-2 p-4 transition-all duration-200 flex items-center justify-center min-h-[80px]",
                    cardClass,
                    state.answerPhase === 'question' && !isWrongAttempt && "hover:scale-105 active:scale-95"
                  )}
                >
                  <span className="font-bold text-lg text-foreground">{option}</span>
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
              ? "bg-primary/20 border-primary/50" 
              : "bg-destructive/20 border-destructive/50"
          )}>
            <p className={cn(
              "text-2xl md:text-3xl font-black",
              state.isCorrect ? "text-primary" : "text-destructive"
            )}>
              {state.celebrationMessage}
            </p>
          </div>
        </div>
      )}

      {/* Wrong answer feedback without message */}
      {state.answerPhase === 'result' && state.isCorrect === false && !state.celebrationMessage && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-20">
          <div className="text-center animate-bounce-in">
            <div className="text-8xl grayscale mb-4">😅</div>
            <p className="text-xl text-primary font-bold">
              {state.questionPhase === 'winner' 
                ? `الفائز: ${currentFinal.winner}`
                : `النتيجة: ${currentFinal.score}`
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
