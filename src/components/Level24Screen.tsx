import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSound } from '@/hooks/useSound';
import { Timer, Crown, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';
import { StreakOverlay } from './StreakOverlay';
import { getStreakComment } from '@/utils/streakComments';
import { nationalTeamQuestions } from '@/data/level24NationalTeams';

const QUESTIONS_COUNT = 10;
const QUESTION_TIME = 20;
const TRANSITION_DELAY = 1200;

function getComment(correct: number, wrong: number, isCorrect: boolean, streak: number) {
  if (!isCorrect) {
    if (wrong >= 3) return '🙃 عادك تعطيني امل انك غبي';
    return ['غلط! 😅', 'لا مو كذا! 🙃', 'ركز! 😬'][Math.floor(Math.random() * 3)];
  }
  if (streak >= 4) return '😑 ساحق ماحق! وحش!';
  if (streak >= 3) return '😑 ساحق ماحق الكره انت!';
  if (correct >= 7) return '🔥 ما يوقف! عرفتهم كلهم!';
  return ['صحيح! 🏳️', 'برافو! 👏', 'ممتاز! 🎯'][Math.floor(Math.random() * 3)];
}

function ShirtSVG({ name, number, color, isGK }: { name: string; number: number; color: string; isGK: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28 md:w-32 md:h-32">
        <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-xl">
          <path d="M10,20 L5,15 L15,5 L22,10 L38,10 L45,5 L55,15 L50,20 L50,55 L10,55 Z" fill={color} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          <path d="M5,15 L0,25 L10,28 L10,20 Z" fill={color} stroke="rgba(255,255,255,0.2)" strokeWidth="1" opacity="0.9" />
          <path d="M55,15 L60,25 L50,28 L50,20 Z" fill={color} stroke="rgba(255,255,255,0.2)" strokeWidth="1" opacity="0.9" />
          {isGK && <path d="M15,25 L45,25 L45,50 L15,50 Z" fill="rgba(0,0,0,0.15)" />}
          <text x="30" y="40" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial">{number}</text>
        </svg>
      </div>
      <p className="text-white text-sm font-bold mt-1">{name}</p>
      <p className="text-white/50 text-xs">{isGK ? 'حارس' : 'مهاجم'}</p>
    </div>
  );
}

interface GameState {
  currentQuestion: number;
  score: number;
  timeLeft: number;
  gameOver: boolean;
  totalCorrect: number;
  totalWrong: number;
  currentQ: typeof nationalTeamQuestions[0];
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

function shuffleOptions(q: typeof nationalTeamQuestions[0]) {
  const correct = q.options[q.correctIndex];
  const shuffled = [...q.options].sort(() => Math.random() - 0.5);
  return { shuffled, correctIdx: shuffled.indexOf(correct) };
}

export function Level24Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);

  const getNext = (used: number[]) => {
    const available = nationalTeamQuestions.filter(q => !used.includes(q.id));
    const pool = available.length > 0 ? available : nationalTeamQuestions;
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
      setTimeout(() => { const correctIdx = state.shuffledCorrectIndex; if (correctIdx !== undefined) handleAnswer(correctIdx); }, 500);
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

  const handleAnswer = useCallback((optionIndex: number) => {
    if (state.answerPhase === 'result') return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    const isCorrect = optionIndex === state.shuffledCorrectIndex;
    const newCorrect = isCorrect ? state.totalCorrect + 1 : state.totalCorrect;
    const newWrong = isCorrect ? state.totalWrong : state.totalWrong + 1;
    const newStreak = isCorrect ? state.streak + 1 : 0;
    const newWrongStreak = isCorrect ? 0 : (state.wrongStreak || 0) + 1;
    const msg = getComment(newCorrect, newWrong, isCorrect, newStreak);

    setState(prev => ({
      ...prev, selectedOption: optionIndex, answerPhase: 'result', isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
      totalCorrect: newCorrect, totalWrong: newWrong, streak: newStreak, wrongStreak: isCorrect ? 0 : prev.wrongStreak + 1,
      celebrationMessage: msg }));
    playSound(isCorrect ? 'correct' : 'wrong');
    setTimeout(() => setState(prev => ({ ...prev, selectedOption: null, answerPhase: 'question', celebrationMessage: null })), TRANSITION_DELAY - 300);
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state, nextQuestion, playSound]);

  const handleTimeout = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setState(prev => ({
      ...prev, answerPhase: 'result', isCorrect: false,
      totalWrong: prev.totalWrong + 1, streak: 0, wrongStreak: 0,
      streakMsg: null as string | null, streakTier: null as 'hype' | 'epic' | 'lose' | null,
      celebrationMessage: `⏰ الجواب: ${state.currentQ.teamName} ${state.currentQ.teamFlag}` }));
    playSound('wrong');
    setTimeout(() => setState(prev => ({ ...prev, selectedOption: null, answerPhase: 'question', celebrationMessage: null })), TRANSITION_DELAY - 300);
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state.currentQ, playSound, nextQuestion]);

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
    if (correctIdx !== undefined) handleAnswer(correctIdx);
    setSolveUsed(true);
  };

  const handleHelpSpecial = () => {
    const correctIdx = state.shuffledCorrectIndex;
    if (correctIdx !== undefined) handleAnswer(correctIdx);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };


  if (state.gameOver) {
    const getFinal = () => {
      if (state.totalCorrect >= 8) return { title: '😑 ساحق ماحق!', subtitle: 'عرفت كل المنتخبات!', emoji: '🏳️🏆' };
      if (state.totalCorrect >= 5) return { title: 'كبيرررر! 💪', subtitle: 'بس تقدر أحسن', emoji: '🏳️' };
      return { title: '🙃 غبي والله', subtitle: 'ما تعرف منتخبات!', emoji: '📖' };
    };
    const msg = getFinal();

    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900 via-teal-700 to-teal-900" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-black/60 backdrop-blur-md rounded-3xl border border-teal-500/30 max-w-md mx-4 animate-bounce-in">
            <div className="text-center p-8">
              {state.totalCorrect >= 8 ? <Trophy className="w-24 h-24 mx-auto text-yellow-400 mb-4 animate-pulse" /> : <XCircle className="w-24 h-24 mx-auto text-teal-400 mb-4" />}
              <div className="text-5xl mb-4">{msg.emoji}</div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">{msg.title}</h2>
              <p className="text-lg text-white/70 mb-4">{msg.subtitle}</p>
              <p className="text-2xl text-white mb-8">نتيجتك: <span className="text-teal-400 font-bold">{state.totalCorrect}</span> من {QUESTIONS_COUNT}</p>
              <div className="flex flex-col gap-3">
                {onLevelComplete && <button onClick={() => onLevelComplete?.({ score: state.totalCorrect, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start flex items-center gap-2 mx-auto">المرحلة التالية 🏆</button>}
                <button onClick={onRestart} className="btn-start flex items-center gap-2 mx-auto opacity-70"><RotateCcw className="w-5 h-5" /> من البداية</button>
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
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900 via-teal-700 to-teal-900" />
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge bg-black/50">🏳️ {state.score}</div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all", state.timeLeft <= 3 ? "bg-red-500/20 text-red-300 animate-pulse" : "bg-teal-700/50 text-teal-300")}>
          <Timer className="w-5 h-5" /> {state.timeLeft}
        </div>
        <div className="bg-yellow-400/20 px-3 py-1 rounded-full text-yellow-400 font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" /> المستوى 24
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-lg">
          <div className="bg-black/50 backdrop-blur-sm border border-teal-500/30 rounded-2xl p-4 mb-4 text-center">
            <p className="text-lg text-white/70 mb-1">من أي منتخب هؤلاء اللاعبين؟ 🏳️</p>
          </div>

          {/* Mini pitch with GK and Striker */}
          <div className="relative bg-green-700/60 border-2 border-green-400/30 rounded-2xl p-8 mb-4 overflow-hidden" style={{ minHeight: '380px' }}>
            {/* Pitch lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-2 border-white/20 rounded-full" />
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 border-b-2 border-l-2 border-r-2 border-white/20 rounded-b-xl" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-20 border-t-2 border-l-2 border-r-2 border-white/20 rounded-t-xl" />
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-px h-full bg-white/10" />

            {/* Goalkeeper at bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <ShirtSVG
                name={state.currentQ.goalkeeper.name}
                number={state.currentQ.goalkeeper.number}
                color={state.currentQ.goalkeeper.shirtColor}
                isGK={true}
              />
            </div>

            {/* Striker at top */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2">
              <ShirtSVG
                name={state.currentQ.striker.name}
                number={state.currentQ.striker.number}
                color={state.currentQ.striker.shirtColor}
                isGK={false}
              />
            </div>

            {state.answerPhase === 'result' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2 animate-bounce-in">
                  <p className="text-2xl font-black text-yellow-400">{state.currentQ.teamFlag} {state.currentQ.teamName}</p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {state.shuffledOptions.map((option, index) => {
              if (hiddenIndices.includes(index)) return <div key={index} className="p-3 rounded-2xl border-2 border-white/10 bg-black/20 opacity-20 min-h-[52px]" />;
              const isSelected = state.selectedOption === index;
              const isCorrectOption = index === state.shuffledCorrectIndex;
              const showResult = state.answerPhase === 'result';
              return (
                <button key={index} onClick={() => handleAnswer(index)} disabled={showResult}
                  className={cn("py-4 px-4 rounded-2xl font-bold text-lg transition-all",
                    showResult && isCorrectOption ? "bg-emerald-500/40 border-2 border-emerald-400 text-emerald-300" :
                    showResult && isSelected && !isCorrectOption ? "bg-red-500/40 border-2 border-red-400 text-red-300" :
                    !showResult ? "bg-black/40 border-2 border-white/20 text-white hover:border-teal-400 hover:bg-teal-500/20 active:scale-95" :
                    "bg-black/20 border-2 border-white/10 text-white/40")}>
                  {option}
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

