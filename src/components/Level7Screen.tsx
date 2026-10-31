import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { teamFormations, getRandomFormationQuestion, TeamFormation } from '@/data/teamFormations';
import { useSound } from '@/hooks/useSound';
import { Users, XCircle, RotateCcw, Timer, Crown, Trophy, Flag, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';

const QUESTIONS_COUNT = 10;
const QUESTION_TIME = 20;

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

export function Level7Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);
  const [questions] = useState<{ correct: TeamFormation; options: TeamFormation[] }[]>(() => {
    const qs: { correct: TeamFormation; options: TeamFormation[] }[] = [];
    const usedIds: string[] = [];
    
    for (let i = 0; i < QUESTIONS_COUNT; i++) {
      const q = getRandomFormationQuestion(usedIds);
      qs.push(q);
      usedIds.push(q.correct.id);
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
    consecutiveCorrect: 0,
    consecutiveWrong: 0,
    timeLeft: QUESTION_TIME,
    totalCorrect: 0 });

  // Auto-solve next question (special help)
  useEffect(() => {
    if (autoSolveNext && state.answerPhase === 'question') {
      setAutoSolveNext(false);
      setTimeout(() => { if (currentQ?.correct) handleSelect(currentQ?.correct as any); }, 500);
    }
  }, [autoSolveNext, state.currentQuestion, state.answerPhase]);

  const currentQ = questions[state.currentQuestion];

  const getMessage = useCallback((isCorrect: boolean, selectedTeam?: string): string | null => {
    if (!isCorrect && selectedTeam) {
      // عند الإجابة الخاطئة، أظهر لاعب من الفريق الصحيح
      const correctTeam = currentQ.correct;
      const randomPlayer = correctTeam.players[Math.floor(Math.random() * correctTeam.players.length)];
      return `🙂 ${randomPlayer.name} في ${correctTeam.nameAr}!`;
    }
    if (isCorrect) {
      return "خبير تشكيلات! 🔥";
    }
    return null;
  }, [currentQ]);

  const getFinalMessage = useCallback((totalCorrect: number): { title: string; subtitle: string; emoji: string } => {
    if (totalCorrect === QUESTIONS_COUNT) {
      return {
        title: "😵‍💫 أنت مدرب عالمي!",
        subtitle: "معرفتك بالتشكيلات لا تصدق!",
        emoji: "👑"
      };
    }
    if (totalCorrect >= 8) {
      return {
        title: "ممتاز! 🙂",
        subtitle: "تعرف الأندية الكبيرة جيداً",
        emoji: "🔥"
      };
    }
    if (totalCorrect >= 5) {
      return {
        title: "مش بطال!",
        subtitle: "تحتاج تتابع أكثر",
        emoji: "💪"
      };
    }
    return {
      title: "روح تابع كرة القدم! 😂",
      subtitle: "معرفتك بالتشكيلات ضعيفة",
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

    setState(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      answerPhase: 'question',
      selectedAnswer: null,
      isCorrect: null,
      celebrationMessage: null,
      timeLeft: QUESTION_TIME }));
  }, [state.currentQuestion, playSound]);

  const handleSelect = useCallback((teamId: string) => {
    if (state.answerPhase === 'result') return;

    const isCorrect = teamId === currentQ.correct.id;
    const selectedTeam = currentQ.options.find(t => t.id === teamId);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (isCorrect) {
      const newTotalCorrect = state.totalCorrect + 1;
      const message = getMessage(true);
      
      setState(prev => ({
        ...prev,
        selectedAnswer: teamId,
        isCorrect: true,
        answerPhase: 'result',
        score: prev.score + 1,
        consecutiveCorrect: prev.consecutiveCorrect + 1,
        consecutiveWrong: 0,
        celebrationMessage: message,
        totalCorrect: newTotalCorrect }));

      playSound('correct');
      setTimeout(nextQuestion, 2000);
    } else {
      const message = getMessage(false, selectedTeam?.nameAr);
      
      setState(prev => ({
        ...prev,
        selectedAnswer: teamId,
        isCorrect: false,
        answerPhase: 'result',
        consecutiveCorrect: 0,
        consecutiveWrong: prev.consecutiveWrong + 1,
        celebrationMessage: message }));

      playSound('wrong');
      setTimeout(nextQuestion, 2500);
    }
  }, [state, currentQ, getMessage, nextQuestion, playSound]);

  const handleTimeout = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    const randomPlayer = currentQ.correct.players[Math.floor(Math.random() * currentQ.correct.players.length)];
    const message = `⏰ انتهى الوقت! ${randomPlayer.name} في ${currentQ.correct.nameAr}!`;
    
    setState(prev => ({
      ...prev,
      selectedAnswer: null,
      isCorrect: false,
      answerPhase: 'result',
      consecutiveCorrect: 0,
      consecutiveWrong: prev.consecutiveWrong + 1,
      celebrationMessage: message }));

    playSound('wrong');
    setTimeout(nextQuestion, 2000);
  }, [currentQ, playSound, nextQuestion]);

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

  // Formation display positions for 4-3-3
  const getPlayerPositionStyle = (index: number, total: number): React.CSSProperties => {
    // Simplified 4-3-3 layout
    const positions: { [key: number]: { top: string; left: string } } = {
      0: { top: '85%', left: '50%' }, // GK
      1: { top: '70%', left: '80%' }, // RB
      2: { top: '70%', left: '60%' }, // CB
      3: { top: '70%', left: '40%' }, // CB
      4: { top: '70%', left: '20%' }, // LB
      5: { top: '50%', left: '70%' }, // CM
      6: { top: '50%', left: '50%' }, // CM
      7: { top: '50%', left: '30%' }, // CM
      8: { top: '25%', left: '75%' }, // RW
      9: { top: '20%', left: '50%' }, // ST
      10: { top: '25%', left: '25%' }, // LW
    };
    
    const pos = positions[index] || { top: '50%', left: '50%' };
    return {
      position: 'absolute',
      top: pos.top,
      left: pos.left,
      transform: 'translate(-50%, -50%)' };
  };

  const handleHelpEliminate = () => {
    const correctVal = currentQ?.correct;
    const wrongIdxs = (currentQ?.options || []).map((o: any, i: number) => ({ o, i })).filter((x: any) => x.o?.id !== correctVal?.id).map((x: any) => x.i);
    const toHide = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenIndices(toHide);
    setHelp1Used(true);
  };

  const handleHelpSolve = () => {
    if (currentQ?.correct) handleSelect(currentQ?.correct as any);
    setSolveUsed(true);
  };

  const handleHelpSpecial = () => {
    if (currentQ?.correct) handleSelect(currentQ?.correct as any);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };


  if (state.gameOver) {
    const finalResult = getFinalMessage(state.totalCorrect);
    const isPerfect = state.totalCorrect >= QUESTIONS_COUNT * 0.8;
    
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Stadium background */}
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
                <Users className="w-24 h-24 mx-auto text-yellow-400 mb-4" />
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
      
      {/* Stadium field background */}
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

      {/* Header */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge bg-black/50">
          ⚽ {state.score}
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
          المستوى 7
        </div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full">
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-4xl">
          
          {/* Question */}
          <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-4 mb-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Flag className="w-6 h-6 text-yellow-400" />
              <span className="text-lg md:text-xl font-bold text-white">
                من أي نادي هذه التشكيلة؟ 🏟️
              </span>
            </div>
          </div>

          {/* Formation Display */}
          <div className="relative bg-green-700/30 backdrop-blur-sm border-2 border-white/20 rounded-2xl mb-4 aspect-[4/3] max-h-[400px]">
            {/* Field markings */}
            <div className="absolute inset-4 border-2 border-white/30 rounded-lg">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white/30 rounded-full" />
              {/* Goal areas */}
              <div className="absolute top-1/3 left-0 w-8 h-1/3 border-r-2 border-t-2 border-b-2 border-white/30" />
              <div className="absolute top-1/3 right-0 w-8 h-1/3 border-l-2 border-t-2 border-b-2 border-white/30" />
            </div>
            
            {/* Players */}
            {currentQ.correct.players.map((player, index) => (
              <div
                key={index}
                style={getPlayerPositionStyle(index, currentQ.correct.players.length)}
                className="flex flex-col items-center"
              >
                <div className="bg-black/70 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-xl md:text-2xl border-2 border-white/50">
                  {player.flag}
                </div>
                <span className="text-[10px] md:text-xs text-white font-bold bg-black/50 px-1 rounded mt-1">
                  {player.position}
                </span>
              </div>
            ))}
            
            {/* Show correct team after answer */}
            {state.answerPhase === 'result' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
                <div className="text-center animate-bounce-in">
                  <img 
                    src={currentQ.correct.logo} 
                    alt={currentQ.correct.nameAr}
                    className="w-24 h-24 mx-auto mb-2 object-contain"
                  />
                  <p className="text-2xl font-black text-white">{currentQ.correct.nameAr}</p>
                  <div className={cn(
                    "mt-2 inline-block p-2 rounded-full",
                    state.isCorrect ? "bg-green-500" : "bg-red-500"
                  )}>
                    {state.isCorrect ? (
                      <Check className="w-8 h-8 text-white" strokeWidth={4} />
                    ) : (
                      <X className="w-8 h-8 text-white" strokeWidth={4} />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3">
            {currentQ.options.map((team, _hIdx) => {
              if (hiddenIndices.includes(_hIdx)) return <div key={_hIdx} className="p-3 rounded-2xl border-2 border-white/10 bg-black/20 opacity-20 min-h-[52px]" />;
              let cardClass = "bg-black/40 backdrop-blur-sm border-white/20 hover:border-green-400/50";
              
              if (state.answerPhase === 'result') {
                if (team.id === currentQ.correct.id) {
                  cardClass = "bg-green-500/30 border-green-400";
                } else if (team.id === state.selectedAnswer) {
                  cardClass = "bg-destructive/20 border-destructive";
                }
              }
              
              return (
                <button
                  key={team.id}
                  onClick={() => handleSelect(team.id)}
                  disabled={state.answerPhase === 'result'}
                  className={cn(
                    "rounded-2xl border-2 p-3 transition-all duration-200 flex items-center justify-center gap-2",
                    cardClass,
                    state.answerPhase === 'question' && "hover:scale-105 active:scale-95"
                  )}
                >
                  <img 
                    src={team.logo} 
                    alt={team.nameAr}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="font-bold text-sm md:text-base text-white">{team.nameAr}</span>
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
