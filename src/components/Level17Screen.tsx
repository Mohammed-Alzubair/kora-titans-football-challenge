import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSound } from '@/hooks/useSound';
import { Timer, RotateCcw, Trophy, XCircle, Zap, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';
import { round1Questions, round2Questions, round3Questions, goldenGoalQuestions, penaltyQuestions, pickRandomQuestions, Level17Question } from '@/data/level17Questions';

const QUESTION_TIME = 20;
const PENALTY_TIME = 6;
const GOLDEN_TIME = 8;
const TRANSITION_DELAY = 2500;

type Phase = 'round1' | 'round2' | 'round3' | 'penalty' | 'goldenGoal' | 'gameOver';

interface GameState {
  phase: Phase;
  currentQuestionInRound: number;
  playerGoals: number;
  opponentGoals: number;
  timeLeft: number;
  selectedOption: number | null;
  answerPhase: 'question' | 'result';
  isCorrect: boolean | null;
  celebrationMessage: string | null;
  penaltyIndex: number;
  penaltyPlayerScore: number;
  penaltyOpponentScore: number;
  penaltyRound: number;
  isPaused: boolean;
  // أسئلة مختارة عشوائياً لكل جولة
  round1Qs: Level17Question[];
  round2Qs: Level17Question[];
  round3Qs: Level17Question[];
  goldenQ: Level17Question;
  penaltyQs: Level17Question[];
  usedIds: Set<number>;
}

const ROUND_COMMENTS = {
  correct: [
    '🎤 هدددددف! الجمهور يهتف! 🔥',
    '🎤 يااااه! هدف خرافي! ⚽💥',
    '🎤 الكورة في الشبكة! 🥅🔥',
  ],
  wrong: [
    '🎤 هدف عليك! الجمهور يصفر! 😰',
    '🎤 غلط! الخصم يسجل! ⚽😤',
    '🎤 سقوط مؤلم! هدف للخصم! 💔',
  ] };

function initGame(): GameState {
  const usedIds = new Set<number>();
  const r1 = pickRandomQuestions(round1Questions, 3, usedIds);
  r1.forEach(q => usedIds.add(q.id));
  const r2 = pickRandomQuestions(round2Questions, 3, usedIds);
  r2.forEach(q => usedIds.add(q.id));
  const r3 = pickRandomQuestions(round3Questions, 3, usedIds);
  r3.forEach(q => usedIds.add(q.id));
  const gq = pickRandomQuestions(goldenGoalQuestions, 1, usedIds);
  gq.forEach(q => usedIds.add(q.id));
  const pq = pickRandomQuestions(penaltyQuestions, 3, usedIds);
  pq.forEach(q => usedIds.add(q.id));

  return {
    phase: 'round1', currentQuestionInRound: 0,
    playerGoals: 0, opponentGoals: 0, timeLeft: QUESTION_TIME,
    selectedOption: null, answerPhase: 'question', isCorrect: null,
    celebrationMessage: null, penaltyIndex: 0,
    penaltyPlayerScore: 0, penaltyOpponentScore: 0, penaltyRound: 0,
    isPaused: false,
    round1Qs: r1, round2Qs: r2, round3Qs: r3,
    goldenQ: gq[0], penaltyQs: pq, usedIds };
}

export function Level17Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [state, setState] = useState<GameState>(initGame);

  const getCurrentQuestion = () => {
    if (state.phase === 'goldenGoal') return state.goldenQ;
    if (state.phase === 'penalty') return state.penaltyQs[state.penaltyIndex % state.penaltyQs.length];
    if (state.phase === 'round1') return state.round1Qs[state.currentQuestionInRound];
    if (state.phase === 'round2') return state.round2Qs[state.currentQuestionInRound];
    return state.round3Qs[state.currentQuestionInRound];
  };

  const currentQ = getCurrentQuestion();

  const advanceToNextPhase = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }

    setState(prev => {
      if (['round1', 'round2', 'round3'].includes(prev.phase) && prev.currentQuestionInRound < 2) {
        return { ...prev, currentQuestionInRound: prev.currentQuestionInRound + 1, timeLeft: QUESTION_TIME, selectedOption: null, answerPhase: 'question', isCorrect: null, celebrationMessage: null };
      }
      if (prev.phase === 'round1') return { ...prev, phase: 'round2', currentQuestionInRound: 0, timeLeft: QUESTION_TIME, selectedOption: null, answerPhase: 'question', isCorrect: null, celebrationMessage: null };
      if (prev.phase === 'round2') return { ...prev, phase: 'round3', currentQuestionInRound: 0, timeLeft: QUESTION_TIME, selectedOption: null, answerPhase: 'question', isCorrect: null, celebrationMessage: null };

      if (prev.phase === 'round3') {
        if (prev.playerGoals > prev.opponentGoals) return { ...prev, phase: 'gameOver', celebrationMessage: '🏆 فزت بالكلاسيكو!' };
        if (prev.playerGoals < prev.opponentGoals) return { ...prev, phase: 'gameOver', celebrationMessage: '💔 خسرت الكلاسيكو!' };
        return { ...prev, phase: 'goldenGoal', timeLeft: GOLDEN_TIME, selectedOption: null, answerPhase: 'question', isCorrect: null, celebrationMessage: '⚡ الهدف الذهبي! جاوب صح تفوز فوراً!' };
      }

      if (prev.phase === 'goldenGoal') {
        return { ...prev, phase: 'penalty', penaltyIndex: 0, penaltyRound: 1, timeLeft: PENALTY_TIME, selectedOption: null, answerPhase: 'question', isCorrect: null, celebrationMessage: '🎯 ركلات الترجيح!' };
      }

      if (prev.phase === 'penalty') {
        const newRound = prev.penaltyRound + 1;
        const opponentScores = Math.random() > 0.4;
        const newOpScore = opponentScores ? prev.penaltyOpponentScore + 1 : prev.penaltyOpponentScore;
        if (newRound > 3) {
          if (prev.penaltyPlayerScore > newOpScore) return { ...prev, phase: 'gameOver', penaltyOpponentScore: newOpScore, celebrationMessage: '🏆 فزت بركلات الترجيح!' };
          if (prev.penaltyPlayerScore < newOpScore) return { ...prev, phase: 'gameOver', penaltyOpponentScore: newOpScore, celebrationMessage: '💔 خسرت بركلات الترجيح!' };
        }
        return { ...prev, penaltyIndex: prev.penaltyIndex + 1, penaltyRound: newRound, penaltyOpponentScore: newOpScore, timeLeft: PENALTY_TIME, selectedOption: null, answerPhase: 'question', isCorrect: null, celebrationMessage: opponentScores ? '⚽ الخصم سجل! دورك!' : '❌ الخصم ضيع! فرصتك!' };
      }

      return { ...prev, phase: 'gameOver' };
    });
  }, []);

  const handleAnswer = useCallback((optionIndex: number) => {
    if (state.answerPhase === 'result') return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    const isCorrect = optionIndex === currentQ.correctIndex;

    if (state.phase === 'goldenGoal' && isCorrect) {
      setState(prev => ({ ...prev, selectedOption: optionIndex, answerPhase: 'result', isCorrect: true, celebrationMessage: '🎤 يااااااااااه! هدف ذهبي في الوقت القاتل! أنت بطل الكلاسيكو! 🔥🔥🏆' }));
      playSound('correct');
      setTimeout(() => setState(prev => ({ ...prev, phase: 'gameOver' })), 3000);
      return;
    }

    if (state.phase === 'penalty') {
      setState(prev => ({ ...prev, selectedOption: optionIndex, answerPhase: 'result', isCorrect, penaltyPlayerScore: isCorrect ? prev.penaltyPlayerScore + 1 : prev.penaltyPlayerScore, celebrationMessage: isCorrect ? '🥅 سجلت الركلة! ⚽' : '❌ ضيعت الركلة!' }));
      playSound(isCorrect ? 'correct' : 'wrong');
      setTimeout(() => setState(prev => ({ ...prev, selectedOption: null, answerPhase: 'question', celebrationMessage: null })), TRANSITION_DELAY - 300);
      setTimeout(advanceToNextPhase, TRANSITION_DELAY);
      return;
    }

    const comment = isCorrect
      ? ROUND_COMMENTS.correct[Math.floor(Math.random() * ROUND_COMMENTS.correct.length)]
      : ROUND_COMMENTS.wrong[Math.floor(Math.random() * ROUND_COMMENTS.wrong.length)];

    setState(prev => ({
      ...prev, selectedOption: optionIndex, answerPhase: 'result', isCorrect,
      playerGoals: isCorrect ? prev.playerGoals + 1 : prev.playerGoals,
      opponentGoals: isCorrect ? prev.opponentGoals : prev.opponentGoals + 1,
      celebrationMessage: comment }));
    playSound(isCorrect ? 'correct' : 'wrong');
    setTimeout(() => setState(prev => ({ ...prev, selectedOption: null, answerPhase: 'question', celebrationMessage: null })), TRANSITION_DELAY - 300);
    setTimeout(advanceToNextPhase, TRANSITION_DELAY);
  }, [state, currentQ, advanceToNextPhase, playSound]);

  const handleTimeout = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (state.phase === 'goldenGoal') {
      setState(prev => ({ ...prev, answerPhase: 'result', isCorrect: false, celebrationMessage: '⏰ انتهى الوقت! ضاعت فرصة الهدف الذهبي!' }));
      playSound('wrong');
      setTimeout(() => setState(prev => ({ ...prev, selectedOption: null, answerPhase: 'question', celebrationMessage: null })), TRANSITION_DELAY - 300);
      setTimeout(advanceToNextPhase, TRANSITION_DELAY);
      return;
    }
    setState(prev => ({ ...prev, answerPhase: 'result', isCorrect: false, opponentGoals: state.phase === 'penalty' ? prev.opponentGoals : prev.opponentGoals + 1, celebrationMessage: '⏰ انتهى الوقت! هدف للخصم!' }));
    playSound('wrong');
    setTimeout(() => setState(prev => ({ ...prev, selectedOption: null, answerPhase: 'question', celebrationMessage: null })), TRANSITION_DELAY - 300);
    setTimeout(advanceToNextPhase, TRANSITION_DELAY);
  }, [state.phase, playSound, advanceToNextPhase]);

  useEffect(() => {
    if (state.answerPhase !== 'question' || state.phase === 'gameOver' || state.isPaused) return;
    timerRef.current = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 0) return prev;
        return { ...prev, timeLeft: Math.max(0, prev.timeLeft - 1) };
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state.answerPhase, state.phase, state.currentQuestionInRound, state.penaltyIndex, state.isPaused]);

  useEffect(() => {
    if (state.answerPhase === 'question' && state.timeLeft <= 0) handleTimeout();
  }, [state.timeLeft, state.answerPhase, handleTimeout]);

  if (state.phase === 'gameOver') {
    const won = state.playerGoals > state.opponentGoals || (state.celebrationMessage?.includes('بطل') ?? false) || state.penaltyPlayerScore > state.penaltyOpponentScore;

    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950 via-red-900 to-black" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-black/70 backdrop-blur-md rounded-3xl border border-red-500/40 max-w-md mx-4 animate-bounce-in">
            <div className="text-center p-8">
              {won ? <Trophy className="w-24 h-24 mx-auto text-yellow-400 mb-4 animate-pulse" /> : <XCircle className="w-24 h-24 mx-auto text-red-400 mb-4" />}
              <div className="text-5xl mb-4">{won ? '🏆👑' : '💔😰'}</div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">{won ? 'بطل الكلاسيكو! 🏆' : 'خسرت الكلاسيكو! 💔'}</h2>
              <div className="bg-black/40 rounded-2xl p-4 mb-6">
                <p className="text-xl text-white mb-2">النتيجة</p>
                <div className="flex items-center justify-center gap-6 text-3xl font-black">
                  <span className="text-emerald-400">{state.playerGoals}</span>
                  <span className="text-white/50">-</span>
                  <span className="text-red-400">{state.opponentGoals}</span>
                </div>
                {(state.penaltyPlayerScore > 0 || state.penaltyOpponentScore > 0) && (
                  <p className="text-sm text-yellow-400 mt-2">ركلات ترجيح: {state.penaltyPlayerScore} - {state.penaltyOpponentScore}</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                {won && onLevelComplete && <button onClick={() => onLevelComplete?.({ score: state.playerGoals, maxScore: 10, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start flex items-center gap-2 mx-auto">المرحلة التالية 🏆</button>}
                <button onClick={onRestart} className="btn-start flex items-center gap-2 mx-auto opacity-70"><RotateCcw className="w-6 h-6" /> العب من البداية</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getRoundLabel = () => {
    if (state.phase === 'round1') return 'الجولة الأولى';
    if (state.phase === 'round2') return 'الجولة الثانية';
    if (state.phase === 'round3') return 'الجولة الأخيرة!';
    if (state.phase === 'goldenGoal') return '⚡ الهدف الذهبي!';
    if (state.phase === 'penalty') return `🎯 ركلة ${state.penaltyRound}`;
    return '';
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col relative overflow-hidden">
      <GameControls onExit={onRestart} onPause={() => setState(p => ({ ...p, isPaused: true }))} onResume={() => setState(p => ({ ...p, isPaused: false }))} isPaused={state.isPaused} />
      <div className="absolute inset-0 bg-gradient-to-b from-red-950 via-red-900 to-black" />

      <div className="relative z-10 mb-4">
        <div className="bg-black/60 backdrop-blur-sm border border-red-500/30 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <p className="text-sm text-emerald-400 font-bold">أنت</p>
              <p className="text-4xl font-black text-white">{state.playerGoals}</p>
            </div>
            <div className="text-center px-4">
              <p className="text-sm text-yellow-400 font-bold mb-1">{getRoundLabel()}</p>
              <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg", state.timeLeft <= 3 ? "bg-red-500/30 text-red-300 animate-pulse" : "bg-white/10 text-white")}>
                <Timer className="w-5 h-5" /> {state.timeLeft}
              </div>
            </div>
            <div className="text-center flex-1">
              <p className="text-sm text-red-400 font-bold">الخصم</p>
              <p className="text-4xl font-black text-white">{state.opponentGoals}</p>
            </div>
          </div>
        </div>
      </div>

      {state.phase === 'goldenGoal' && (
        <div className="relative z-10 flex justify-center mb-3">
          <div className="bg-yellow-500/20 border border-yellow-400/40 rounded-full px-4 py-2 flex items-center gap-2 animate-pulse">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-bold">الهدف الذهبي - جاوب صح تفوز فوراً!</span>
          </div>
        </div>
      )}

      {state.phase === 'penalty' && (
        <div className="relative z-10 flex justify-center mb-3">
          <div className="bg-blue-500/20 border border-blue-400/40 rounded-full px-4 py-2 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-bold">ركلات الترجيح: {state.penaltyPlayerScore} - {state.penaltyOpponentScore}</span>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-2xl">
          <div className="bg-black/50 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 mb-6 text-center">
            <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">{currentQ.question}</p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((option, index) => {
              if (hiddenIndices.includes(index)) return <div key={index} className="p-3 rounded-2xl border-2 border-white/10 bg-black/20 opacity-20 min-h-[52px]" />;
              const isSelected = state.selectedOption === index;
              const isCorrectOption = index === currentQ.correctIndex;
              const showResult = state.answerPhase === 'result';
              return (
                <button key={index} onClick={() => handleAnswer(index)} disabled={showResult}
                  className={cn("py-4 px-6 rounded-2xl font-bold text-lg transition-all text-right",
                    showResult && isCorrectOption ? "bg-emerald-500/40 border-2 border-emerald-400 text-emerald-300" :
                    showResult && isSelected && !isCorrectOption ? "bg-red-500/40 border-2 border-red-400 text-red-300" :
                    !showResult ? "bg-black/40 border-2 border-white/20 text-white hover:border-red-400 hover:bg-red-500/20 active:scale-95" :
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
            onHelp1={() => {
              const wrongIdxs = currentQ?.options.map((_: any, i: number) => i).filter((i: number) => i !== currentQ?.correctIndex) || [];
              const toHide = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
              setHiddenIndices(toHide);
              setHelp1Used(true);
            }}
            onSolve={() => {
              if (currentQ) handleAnswer(currentQ.correctIndex);
              setSolveUsed(true);
            }}
            onSpecialSolve={() => {
              if (currentQ) handleAnswer(currentQ.correctIndex);
              setSpecialUsed(true);
              setAutoSolveNext(true);
            }}
            onSkipLevel={onLevelComplete || onRestart}
            help1Used={help1Used}
            solveUsed={solveUsed}
            specialUsed={specialUsed}
            disabled={state.answerPhase === 'result'}
          />

      {state.celebrationMessage && (
        <div className="fixed top-28 left-0 right-0 pointer-events-none flex justify-center z-20">
          <div className={cn("p-4 px-8 rounded-2xl border-2 backdrop-blur-sm animate-bounce-in text-center max-w-sm",
            state.isCorrect ? "bg-green-500/30 border-green-400/50" : state.isCorrect === false ? "bg-red-500/30 border-red-400/50" : "bg-yellow-500/30 border-yellow-400/50")}>
            <p className={cn("text-lg md:text-xl font-black", state.isCorrect ? "text-green-400" : state.isCorrect === false ? "text-red-400" : "text-yellow-400")}>{state.celebrationMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
