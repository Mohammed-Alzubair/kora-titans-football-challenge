import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { getRandomCluesQuestion, getPlayerName, getPlayerClues, PlayerClue } from '@/data/playerClues';
import { useI18n } from '@/i18n/I18nProvider';
import { useSound } from '@/hooks/useSound';
import { HelpCircle, XCircle, RotateCcw, Timer, Crown, Trophy, Check, X, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';

const QUESTIONS_COUNT = 20;
const QUESTION_TIME = 20;
const CLUE_INTERVAL = 2000; // كل 2 ثانية يظهر دليل جديد
const TRANSITION_DELAY = 1500;

interface GameState {
  currentQuestion: number;
  score: number;
  answerPhase: 'question' | 'result';
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  gameOver: boolean;
  celebrationMessage: string | null;
  timeLeft: number;
  totalCorrect: number;
  visibleClues: number;
}

export function Level8Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const { locale, isArabic } = useI18n();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const clueTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);
  
  const [questions] = useState(() => {
    const qs: { player: PlayerClue; options: PlayerClue[] }[] = [];
    const usedIds: string[] = [];
    for (let i = 0; i < QUESTIONS_COUNT; i++) {
      const q = getRandomCluesQuestion(usedIds);
      qs.push(q);
      usedIds.push(q.player.id);
    }
    return qs;
  });

  const [state, setState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    answerPhase: 'question',
    selectedAnswer: null,
    isCorrect: null,
    gameOver: false,
    celebrationMessage: null,
    timeLeft: QUESTION_TIME,
    totalCorrect: 0,
    visibleClues: 1 });

  const currentQ = questions[state.currentQuestion];
  const playerName = getPlayerName(currentQ.player, locale);
  const currentClues = getPlayerClues(currentQ.player, locale);

  // Auto-solve next question (special help)
  useEffect(() => {
    if (autoSolveNext && state.answerPhase === 'question') {
      setAutoSolveNext(false);
      setTimeout(() => handleSelect(currentQ.player.id), 500);
    }
  }, [autoSolveNext, state.currentQuestion, state.answerPhase]);

  const getFinalMessage = useCallback((totalCorrect: number): { title: string; subtitle: string; emoji: string } => {
    if (totalCorrect === QUESTIONS_COUNT) {
      return {
        title: isArabic ? 'إتقان كامل!' : 'Perfect run!',
        subtitle: isArabic ? 'عشرون إجابة صحيحة. ذاكرة استثنائية.' : 'Twenty correct answers. An exceptional memory.',
        emoji: "🤖"
      };
    }
    if (totalCorrect >= 7) {
      return {
        title: isArabic ? 'مستوى خبير!' : 'Expert level!',
        subtitle: isArabic ? 'اختياراتك كانت من دوري واحد في كل سؤال.' : 'You identified players from league-matched choices.',
        emoji: "🕵️"
      };
    }
    if (totalCorrect >= 4) {
      return {
        title: isArabic ? 'معرفة قوية!' : 'Strong knowledge!',
        subtitle: isArabic ? 'أثبتّ أن لديك ذاكرة كروية ممتازة.' : 'You showed excellent football knowledge.',
        emoji: "🧠"
      };
    }
    return {
      title: isArabic ? 'التحدي مستمر!' : 'Keep building your knowledge!',
      subtitle: isArabic ? 'تعرّف إلى الأرقام والإنجازات ثم حاول مجدداً.' : 'Study the records and achievements, then try again.',
      emoji: "😂"
    };
  }, [isArabic]);

  const nextQuestion = useCallback(() => {
    setHiddenIndices([]);
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (clueTimerRef.current) { clearInterval(clueTimerRef.current); clueTimerRef.current = null; }
    
    if (state.currentQuestion >= QUESTIONS_COUNT - 1) {
      setState(prev => ({ ...prev, gameOver: true }));
      playSound('gameOver');
      return;
    }

    setState(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      answerPhase: 'question',
      selectedAnswer: null,
      isCorrect: null,
      celebrationMessage: null,
      timeLeft: QUESTION_TIME,
      visibleClues: 1 }));
  }, [state.currentQuestion, playSound]);

  const handleSelect = useCallback((answer: string) => {
    if (state.answerPhase === 'result') return;

    const isCorrect = answer === currentQ.player.id;
    
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (clueTimerRef.current) { clearInterval(clueTimerRef.current); clueTimerRef.current = null; }

    const newTotalCorrect = isCorrect ? state.totalCorrect + 1 : state.totalCorrect;
    let message = '';
    if (isCorrect) {
      message = isArabic ? 'ذاكرتك من حديد! 🔥' : 'A memory of steel! 🔥';
    } else {
      message = isArabic ? `الإجابة: ${playerName} 🙂` : `Answer: ${playerName} 🙂`;
    }

    setState(prev => ({
      ...prev,
      selectedAnswer: answer,
      isCorrect,
      answerPhase: 'result',
      score: isCorrect ? prev.score + 1 : prev.score,
      celebrationMessage: message,
      totalCorrect: newTotalCorrect,
      visibleClues: currentClues.length }));

    playSound(isCorrect ? 'correct' : 'wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state, currentQ, currentClues.length, playerName, isArabic, nextQuestion, playSound]);

  const handleTimeout = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (clueTimerRef.current) { clearInterval(clueTimerRef.current); clueTimerRef.current = null; }

    setState(prev => ({
      ...prev,
      selectedAnswer: null,
      isCorrect: false,
      answerPhase: 'result',
      celebrationMessage: isArabic ? `⏰ انتهى الوقت! الإجابة: ${playerName}` : `⏰ Time is up! Answer: ${playerName}`,
      visibleClues: currentClues.length }));

    playSound('wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [currentQ, currentClues.length, playerName, isArabic, playSound, nextQuestion]);

  // Timer
  useEffect(() => {
    if (state.answerPhase !== 'question' || state.gameOver || isPaused) return;
    timerRef.current = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 0) return prev;
        return { ...prev, timeLeft: Math.max(0, prev.timeLeft - 1) };
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state.answerPhase, state.gameOver, state.currentQuestion, isPaused]);

  // Timeout check
  useEffect(() => {
    if (state.answerPhase === 'question' && state.timeLeft <= 0) handleTimeout();
  }, [state.timeLeft, state.answerPhase, handleTimeout]);

  // Clue reveal timer
  useEffect(() => {
    if (state.answerPhase !== 'question' || state.gameOver || isPaused) return;
    clueTimerRef.current = setInterval(() => {
      setState(prev => {
        if (prev.visibleClues >= currentClues.length) return prev;
        return { ...prev, visibleClues: prev.visibleClues + 1 };
      });
    }, CLUE_INTERVAL);
    return () => { if (clueTimerRef.current) clearInterval(clueTimerRef.current); };
  }, [state.answerPhase, state.gameOver, state.currentQuestion, isPaused, currentClues.length]);

  // Background music

  const handleHelpEliminate = () => {
    const correctVal = currentQ?.player?.id;
    const wrongIdxs = (currentQ?.options || []).map((option, i) => ({ option, i })).filter(({ option }) => option.id !== correctVal).map(({ i }) => i);
    const toHide = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenIndices(toHide);
    setHelp1Used(true);
  };

  const handleHelpSolve = () => {
    if (currentQ?.player?.id) handleSelect(currentQ.player.id);
    setSolveUsed(true);
  };

  const handleHelpSpecial = () => {
    if (currentQ?.player?.id) handleSelect(currentQ.player.id);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };


  if (state.gameOver) {
    const finalResult = getFinalMessage(state.totalCorrect);
    const isPerfect = state.totalCorrect >= QUESTIONS_COUNT * 0.8;
    
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900 via-green-700 to-green-800" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute w-full h-8" style={{ top: `${i * 5}%`, background: i % 2 === 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(22, 163, 74, 0.15)' }} />
          ))}
        </div>
        
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="result-overlay animate-bounce-in bg-black/60 backdrop-blur-md rounded-3xl border border-primary/30 max-w-md mx-4">
            <div className="text-center p-8">
              {isPerfect ? (
                <Trophy className="w-24 h-24 mx-auto text-primary mb-4 animate-pulse" />
              ) : state.totalCorrect >= 4 ? (
                <HelpCircle className="w-24 h-24 mx-auto text-yellow-400 mb-4" />
              ) : (
                <XCircle className="w-24 h-24 mx-auto text-destructive mb-4" />
              )}
              
              <div className="text-6xl mb-4">{finalResult.emoji}</div>
              
              <h2 className="game-title text-2xl md:text-3xl font-black mb-4 leading-relaxed text-white">
                {finalResult.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-4">{finalResult.subtitle}</p>
              
              <p className="text-2xl text-foreground mb-8">
                {isArabic ? 'نتيجتك:' : 'Your score:'} <span className="text-primary font-bold">{state.totalCorrect}</span> / {QUESTIONS_COUNT}
              </p>
              
              <div className="flex flex-col gap-3">
                {state.totalCorrect >= Math.ceil(QUESTIONS_COUNT * 0.5) && onLevelComplete && (
                  <button onClick={() => onLevelComplete?.({ score: state.totalCorrect, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start flex items-center gap-2 mx-auto bg-green-600 hover:bg-green-700">
                    {isArabic ? 'المرحلة التالية' : 'Next stage'} ➡️
                  </button>
                )}
                <button onClick={onRestart} className="btn-start flex items-center gap-2 mx-auto">
                  <RotateCcw className="w-6 h-6" />
                  {isArabic ? 'العب من البداية' : 'Play again'}
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
      <GameControls 
        onExit={onRestart}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
        isPaused={isPaused}
      />
      
      {/* Stadium background */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-900 via-green-700 to-green-800" />
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-full h-8" style={{ top: `${i * 5}%`, background: i % 2 === 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(22, 163, 74, 0.15)' }} />
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge bg-black/50">🧠 {state.score}</div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        
        <div className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all",
          state.timeLeft <= 3 ? "bg-destructive/20 text-destructive animate-pulse" : "bg-green-900/50 text-green-400"
        )}>
          <Timer className="w-5 h-5" />
          {state.timeLeft}
        </div>
        
        <div className="bg-yellow-400/20 px-3 py-1 rounded-full text-yellow-400 font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" />
          {isArabic ? 'المرحلة 8' : 'Stage 8'}
        </div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full">
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-2xl">
          
          {/* Question Card */}
          <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 mb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Eye className="w-6 h-6 text-yellow-400" />
              <span className="text-lg md:text-xl font-bold text-white">
                {isArabic ? 'من هو اللاعب؟' : 'Identify the player'} 🕵️‍♂️
              </span>
            </div>
            {/* Clues list */}
            <div className={cn('space-y-3', isArabic ? 'text-right' : 'text-left')}>
              {currentClues.map((clue, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-3 rounded-xl border transition-all duration-500",
                    index < state.visibleClues
                      ? "bg-green-900/40 border-green-500/40 opacity-100 translate-y-0"
                      : "bg-gray-900/20 border-gray-700/20 opacity-0 translate-y-4"
                  )}
                >
                  {index < state.visibleClues ? (
                    <p className="text-white font-bold text-base md:text-lg">{clue}</p>
                  ) : (
                    <p className="text-gray-600 font-bold text-base">{isArabic ? `الدليل ${index + 1}` : `Clue ${index + 1}`} 🔒</p>
                  )}
                </div>
              ))}
            </div>
            
            {/* Show player name after answer */}
            {state.answerPhase === 'result' && (
              <div className="mt-4 animate-bounce-in">
                <div className={cn(
                  "inline-block p-3 rounded-full mb-2",
                  state.isCorrect ? "bg-green-500" : "bg-red-500"
                )}>
                  {state.isCorrect ? (
                    <Check className="w-10 h-10 text-white" strokeWidth={4} />
                  ) : (
                    <X className="w-10 h-10 text-white" strokeWidth={4} />
                  )}
                </div>
                <p className="text-xl font-bold text-yellow-400">{playerName}</p>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            {currentQ.options.map((option, _hIdx) => {
              if (hiddenIndices.includes(_hIdx)) return <div key={_hIdx} className="p-3 rounded-2xl border-2 border-white/10 bg-black/20 opacity-20 min-h-[52px]" />;
              let cardClass = "bg-black/40 backdrop-blur-sm border-white/20 hover:border-green-400/50";
              
              if (state.answerPhase === 'result') {
                if (option.id === currentQ.player.id) {
                  cardClass = "bg-green-500/30 border-green-400";
                } else if (option.id === state.selectedAnswer) {
                  cardClass = "bg-destructive/20 border-destructive";
                }
              }
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={state.answerPhase === 'result'}
                  className={cn(
                    "rounded-2xl border-2 p-4 transition-all duration-200 flex items-center justify-center min-h-[70px]",
                    cardClass,
                    state.answerPhase === 'question' && "hover:scale-105 active:scale-95"
                  )}
                >
                  <span className="font-bold text-base md:text-lg text-white">{getPlayerName(option, locale)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Celebration message */}
      
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
            state.isCorrect ? "bg-green-500/30 border-green-400/50" : "bg-destructive/30 border-destructive/50"
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
