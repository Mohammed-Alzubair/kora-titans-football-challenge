import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useSound } from '@/hooks/useSound';
import { Timer, Crown, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';
import { StreakOverlay } from './StreakOverlay';
import { getStreakComment } from '@/utils/streakComments';
import { formationQuestions } from '@/data/level21Formations';

const QUESTIONS_COUNT = 10;
const QUESTION_TIME = 20;
const TRANSITION_DELAY = 1200;

// Shirt colors per team
const teamColors: Record<string, { primary: string; secondary: string; gk: string }> = {
  'برشلونة': { primary: '#A50044', secondary: '#004D98', gk: '#2ECC71' },
  'ريال مدريد': { primary: '#FFFFFF', secondary: '#FEBE10', gk: '#1ABC9C' },
  'ليفربول': { primary: '#C8102E', secondary: '#C8102E', gk: '#F1C40F' },
  'مانشستر سيتي': { primary: '#6CABDD', secondary: '#6CABDD', gk: '#E67E22' },
  'بايرن ميونخ': { primary: '#DC052D', secondary: '#DC052D', gk: '#95A5A6' },
  'يوفنتوس': { primary: '#FFFFFF', secondary: '#000000', gk: '#F39C12' },
  'باريس سان جيرمان': { primary: '#004170', secondary: '#DA291C', gk: '#27AE60' },
  'تشيلسي': { primary: '#034694', secondary: '#034694', gk: '#F1C40F' },
  'إنتر ميلان': { primary: '#009BDB', secondary: '#000000', gk: '#E74C3C' } };

interface ShuffledQ {
  question: typeof formationQuestions[0];
  shuffledOptions: string[];
  shuffledCorrectIndex: number;
}

function shuffleQuestion(q: typeof formationQuestions[0]): ShuffledQ {
  const correctAnswer = q.options[q.correctIndex];
  const shuffled = [...q.options].sort(() => Math.random() - 0.5);
  return {
    question: q,
    shuffledOptions: shuffled,
    shuffledCorrectIndex: shuffled.indexOf(correctAnswer) };
}

interface GameState {
  currentQuestion: number;
  score: number;
  timeLeft: number;
  gameOver: boolean;
  totalCorrect: number;
  totalWrong: number;
  currentSQ: ShuffledQ;
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

const derradjiComments = {
  correct: [
    "وااااااااال! 🎤🔥",
    "ياااااا سلاااام! عرفته! 🔥",
    "هذا يعرف الكورة! 🎤⚽",
    "ممتااااز! كأنك مدرب! 🧠🔥",
    "بالضبط! إجابة صحيحة! 🎤👏",
  ],
  streak: [
    "هذا لاعب كبيييير! لا يُخطئ! 🔥🔥🔥",
    "ماشاء الله! سلسلة رهيبة! 🎤🔥",
    "حفيظ دراجي يصفق لك! 👏🎤🔥",
  ],
  wrong: [
    "لا لا لا! غلط! 😤🎤",
    "كيف ما عرفته! 🎤😅",
    "ركز يا بطل! 🎤😬",
  ],
  manyWrong: [
    "روح شاهد مباريات أكثر! 🎤📺",
    "جسمك ضعييييييف! 😩🎤",
  ] };

function getComment(correct: number, wrong: number, isCorrect: boolean, streak: number) {
  if (!isCorrect) {
    if (wrong >= 3) return derradjiComments.manyWrong[Math.floor(Math.random() * derradjiComments.manyWrong.length)];
    return derradjiComments.wrong[Math.floor(Math.random() * derradjiComments.wrong.length)];
  }
  if (streak >= 3) return derradjiComments.streak[Math.floor(Math.random() * derradjiComments.streak.length)];
  return derradjiComments.correct[Math.floor(Math.random() * derradjiComments.correct.length)];
}

function PlayerShirt({ number, name, color, isGK, isMissing, showName }: {
  number: number; name: string; color: string; isGK: boolean;
  isMissing: boolean; showName: boolean;
}) {
  return (
    <div className={cn(
      "flex flex-col items-center transition-all",
      isMissing && !showName && "animate-pulse"
    )}>
      {/* Shirt SVG */}
      <div className="relative w-14 h-14 md:w-16 md:h-16">
        <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-lg">
          {/* Shirt body */}
          <path d={isGK
            ? "M10,20 L5,15 L15,5 L22,10 L38,10 L45,5 L55,15 L50,20 L50,55 L10,55 Z"
            : "M10,20 L5,15 L15,5 L22,10 L38,10 L45,5 L55,15 L50,20 L50,55 L10,55 Z"
          } fill={isMissing && !showName ? '#666' : color} stroke={isMissing && !showName ? '#f87171' : 'rgba(255,255,255,0.3)'} strokeWidth="1.5" />
          {/* Sleeves */}
          <path d="M5,15 L0,25 L10,28 L10,20 Z" fill={isMissing && !showName ? '#555' : color} stroke={isMissing && !showName ? '#f87171' : 'rgba(255,255,255,0.2)'} strokeWidth="1" opacity="0.9" />
          <path d="M55,15 L60,25 L50,28 L50,20 Z" fill={isMissing && !showName ? '#555' : color} stroke={isMissing && !showName ? '#f87171' : 'rgba(255,255,255,0.2)'} strokeWidth="1" opacity="0.9" />
          {/* Number */}
          <text x="30" y="40" textAnchor="middle" fill={isMissing && !showName ? '#f87171' : 'white'} fontSize="16" fontWeight="bold" fontFamily="Arial">{isMissing && !showName ? '?' : number}</text>
        </svg>
      </div>
      {/* Name below shirt */}
      <div className={cn(
        "text-xs font-bold mt-1 px-1 text-center max-w-[80px] truncate",
        isMissing && !showName ? "text-red-400" : "text-white",
        isMissing && showName && "text-yellow-400 animate-bounce-in"
      )}>
        {isMissing && !showName ? "❓❓❓" : name}
      </div>
    </div>
  );
}

export function Level21Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);

  const getNext = (used: number[]) => {
    const available = formationQuestions.filter(q => !used.includes(q.id));
    const pool = available.length > 0 ? available : formationQuestions;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const [state, setState] = useState<GameState>(() => {
    const q = getNext([]);
    const sq = shuffleQuestion(q);
    return {
      currentQuestion: 0, score: 0, timeLeft: QUESTION_TIME, gameOver: false,
      totalCorrect: 0, totalWrong: 0, currentSQ: sq,
      selectedOption: null, answerPhase: 'question', isCorrect: null,
      celebrationMessage: null, usedIds: [q.id], streak: 0, wrongStreak: 0,
      streakMsg: null as string | null, streakTier: null as 'hype' | 'epic' | 'lose' | null };
  });

  // Auto-solve next question (special help)
  useEffect(() => {
    if (autoSolveNext && state.answerPhase === 'question') {
      setAutoSolveNext(false);
      setTimeout(() => { const correctIdx = state.currentSQ.shuffledCorrectIndex; if (correctIdx !== undefined) handleAnswer(correctIdx); }, 500);
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
    const sq = shuffleQuestion(q);
    setState(prev => ({
      ...prev, currentQuestion: prev.currentQuestion + 1, currentSQ: sq,
      timeLeft: QUESTION_TIME, selectedOption: null,
      answerPhase: 'question', isCorrect: null, celebrationMessage: null,
      usedIds: [...prev.usedIds, q.id] }));
  }, [state.currentQuestion, state.usedIds, playSound]);

  const handleAnswer = useCallback((optionIndex: number) => {
    if (state.answerPhase === 'result') return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    const isCorrect = optionIndex === state.currentSQ.shuffledCorrectIndex;
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
    const correctName = state.currentSQ.shuffledOptions[state.currentSQ.shuffledCorrectIndex];
    setState(prev => ({
      ...prev, answerPhase: 'result', isCorrect: false,
      totalWrong: prev.totalWrong + 1, streak: 0, wrongStreak: 0,
      streakMsg: null as string | null, streakTier: null as 'hype' | 'epic' | 'lose' | null,
      celebrationMessage: `⏰ الجواب: ${correctName}` }));
    playSound('wrong');
    setTimeout(() => setState(prev => ({ ...prev, selectedOption: null, answerPhase: 'question', celebrationMessage: null })), TRANSITION_DELAY - 300);
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state.currentSQ, playSound, nextQuestion]);

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

  const { question: currentQ } = state.currentSQ;
  const colors = teamColors[currentQ.team] || { primary: '#3498DB', secondary: '#2C3E50', gk: '#27AE60' };

  const { shuffledOptions: sqOptions, shuffledCorrectIndex: sqCorrectIdx } = state.currentSQ;

  const handleHelpEliminate = () => {
    const wrongIdxs = sqOptions.map((_: any, i: number) => i).filter((i: number) => i !== sqCorrectIdx);
    const toHide = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenIndices(toHide);
    setHelp1Used(true);
  };

  const handleHelpSolve = () => {
    handleAnswer(sqCorrectIdx);
    setSolveUsed(true);
  };

  const handleHelpSpecial = () => {
    handleAnswer(sqCorrectIdx);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };


  if (state.gameOver) {
    const getFinal = () => {
      if (state.totalCorrect >= 8) return { title: 'حفيظ دراجي يقول: مجرم سفاااح! 🎤🔥', subtitle: 'ياعف الله عليك!', emoji: '⚽🏆' };
      if (state.totalCorrect >= 5) return { title: 'كبيرررر! 💪', subtitle: 'بس تقدر أحسن', emoji: '⚽' };
      return { title: 'جسمك ضعييييييف 😩', subtitle: 'روح شاهد مباريات! 📺', emoji: '📖' };
    };
    const msg = getFinal();

    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900 via-green-700 to-green-900" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-black/60 backdrop-blur-md rounded-3xl border border-green-500/30 max-w-md mx-4 animate-bounce-in">
            <div className="text-center p-8">
              {state.totalCorrect >= 8 ? <Trophy className="w-24 h-24 mx-auto text-yellow-400 mb-4 animate-pulse" /> : <XCircle className="w-24 h-24 mx-auto text-green-400 mb-4" />}
              <div className="text-5xl mb-4">{msg.emoji}</div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">{msg.title}</h2>
              <p className="text-lg text-white/70 mb-4">{msg.subtitle}</p>
              <p className="text-2xl text-white mb-8">نتيجتك: <span className="text-green-400 font-bold">{state.totalCorrect}</span> من {QUESTIONS_COUNT}</p>
              <div className="flex flex-col gap-3">
                <button onClick={() => onLevelComplete?.({ score: state.totalCorrect, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start flex items-center gap-2 mx-auto">المرحلة التالية 🏆</button>
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
      <div className="absolute inset-0 bg-gradient-to-b from-green-900 via-green-700 to-green-900" />
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge bg-black/50">⚽ {state.score}</div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all", state.timeLeft <= 3 ? "bg-red-500/20 text-red-300 animate-pulse" : "bg-green-700/50 text-green-300")}>
          <Timer className="w-5 h-5" /> {state.timeLeft}
        </div>
        <div className="bg-yellow-400/20 px-3 py-1 rounded-full text-yellow-400 font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" /> المستوى 21
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-2xl">
          <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-4 mb-4 text-center">
            <p className="text-xl text-yellow-400 font-bold mb-2">🎤 {currentQ.team} - {currentQ.season}</p>
            <p className="text-white/70 mb-1">التشكيلة: {currentQ.formation}</p>
            <p className="text-lg text-green-400 font-bold">من اللاعب الناقص؟ ❓</p>
          </div>

          {/* Formation display with shirts */}
          <div className="bg-green-800/50 backdrop-blur-sm border border-green-400/30 rounded-2xl p-4 mb-4">
            <div className="space-y-3">
              {['FWD', 'MID', 'DEF', 'GK'].map(pos => {
                const posPlayers = currentQ.players.filter(p => p.position === pos);
                if (posPlayers.length === 0) return null;
                return (
                  <div key={pos} className="flex justify-center gap-3 md:gap-4 flex-wrap">
                    {posPlayers.map((player, i) => {
              if (hiddenIndices.includes(i)) return <div key={i} className="p-3 rounded-2xl border-2 border-white/10 bg-black/20 opacity-20 min-h-[52px]" />;
                      const globalIdx = currentQ.players.indexOf(player);
                      const isMissing = globalIdx === currentQ.missingPlayerIndex;
                      const showName = state.answerPhase === 'result' && isMissing;
                      const isGK = player.position === 'GK';
                      return (
                        <PlayerShirt
                          key={i}
                          number={player.number}
                          name={player.name}
                          color={isGK ? colors.gk : colors.primary}
                          isGK={isGK}
                          isMissing={isMissing}
                          showName={showName}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {state.currentSQ.shuffledOptions.map((option, index) => {
              const isSelected = state.selectedOption === index;
              const isCorrectOption = index === state.currentSQ.shuffledCorrectIndex;
              const showResult = state.answerPhase === 'result';
              return (
                <button key={index} onClick={() => handleAnswer(index)} disabled={showResult}
                  className={cn("py-4 px-4 rounded-2xl font-bold text-lg transition-all",
                    showResult && isCorrectOption ? "bg-emerald-500/40 border-2 border-emerald-400 text-emerald-300" :
                    showResult && isSelected && !isCorrectOption ? "bg-red-500/40 border-2 border-red-400 text-red-300" :
                    !showResult ? "bg-black/40 border-2 border-white/20 text-white hover:border-green-400 hover:bg-green-500/20 active:scale-95" :
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
