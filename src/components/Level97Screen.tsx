import { LevelResult } from '@/types/levelProgression';
import { useState, useMemo, useCallback } from 'react';
import { level97Questions } from '@/data/level97MarketValues';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';
import { BattleBackground } from './BattleBackground';
import { useSound } from '@/hooks/useSound';
import { Trophy, XCircle, RotateCcw, TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';
import { StarRating } from './StarRating';

const QUESTIONS_COUNT = 10;

interface Level97ScreenProps {
  onRestart: () => void;
  onLevelComplete?: (result?: LevelResult) => void;
}

type Phase = 'pastQuestion' | 'pastReveal' | 'currentQuestion' | 'currentReveal' | 'next';

export function Level97Screen({ onRestart, onLevelComplete }: Level97ScreenProps) {
  const { playSound } = useSound();
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [phase, setPhase] = useState<Phase>('pastQuestion');
  const [selectedPast, setSelectedPast] = useState<number | null>(null);
  const [selectedCurrent, setSelectedCurrent] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [pastCorrect, setPastCorrect] = useState(false);
  const [currentCorrect, setCurrentCorrect] = useState(false);

  const question = level97Questions[currentQ];

  // Shuffle options
  const shuffledPast = useMemo(() => {
    const correct = question.pastValue;
    const shuffled = [...question.pastOptions].sort(() => Math.random() - 0.5);
    return { options: shuffled, correctIndex: shuffled.indexOf(correct) };
  }, [currentQ, question]);

  const shuffledCurrent = useMemo(() => {
    const correct = question.currentValue;
    const shuffled = [...question.currentOptions].sort(() => Math.random() - 0.5);
    return { options: shuffled, correctIndex: shuffled.indexOf(correct) };
  }, [currentQ, question]);

  const handleSelectPast = (index: number) => {
    if (phase !== 'pastQuestion' || selectedPast !== null) return;
    setSelectedPast(index);
    const isCorrect = index === shuffledPast.correctIndex;
    setPastCorrect(isCorrect);
    if (isCorrect) {
      setScore(s => s + 1);
      playSound('correct');
    } else {
      playSound('wrong');
    }
    setTimeout(() => setPhase('pastReveal'), 800);
  };

  const handleSelectCurrent = (index: number) => {
    if (phase !== 'currentQuestion' || selectedCurrent !== null) return;
    setSelectedCurrent(index);
    const isCorrect = index === shuffledCurrent.correctIndex;
    setCurrentCorrect(isCorrect);
    if (isCorrect) {
      setScore(s => s + 1);
      playSound('correct');
    } else {
      playSound('wrong');
    }
    setTimeout(() => setPhase('currentReveal'), 800);
  };

  const handleNext = () => {
    if (currentQ + 1 >= QUESTIONS_COUNT) {
      setGameOver(true);
      playSound(score >= 12 ? 'correct' : 'wrong');
    } else {
      setCurrentQ(q => q + 1);
      setSelectedPast(null);
      setSelectedCurrent(null);
      setPhase('pastQuestion');
      setPastCorrect(false);
      setCurrentCorrect(false);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setScore(0);
    setSelectedPast(null);
    setSelectedCurrent(null);
    setPhase('pastQuestion');
    setGameOver(false);
    setPastCorrect(false);
    setCurrentCorrect(false);
  };

  const formatValue = (v: number) => (v === 0 ? 'معتزل' : `${v}M€`);

  const getStars = () => {
    const pct = (score / 20) * 100;
    if (pct >= 80) return 3;
    if (pct >= 60) return 2;
    if (pct >= 40) return 1;
    return 0;
  };

  const handleHelpEliminate = () => {
    const activeCorrectIdx = phase === 'pastQuestion' ? shuffledPast.correctIndex : shuffledCurrent.correctIndex;
    const activeOptions = phase === 'pastQuestion' ? shuffledPast.options : shuffledCurrent.options;
    const wrongIdxs = activeOptions.map((_: any, i: number) => i).filter((i: number) => i !== activeCorrectIdx);
    const toHide = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenIndices(toHide);
    setHelp1Used(true);
  };

  const handleHelpSolve = () => {
    if (phase === 'pastQuestion') handleSelectPast(shuffledPast.correctIndex);
    else if (phase === 'currentQuestion') handleSelectCurrent(shuffledCurrent.correctIndex);
    setSolveUsed(true);
  };

  const handleHelpSpecial = () => {
    if (phase === 'pastQuestion') handleSelectPast(shuffledPast.correctIndex);
    else if (phase === 'currentQuestion') handleSelectCurrent(shuffledCurrent.correctIndex);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };


  if (gameOver) {
    const stars = getStars();
    const passed = stars > 0;
    return (
      <div className="min-h-screen relative flex items-center justify-center" >
        <BattleBackground />
        <div className="relative z-10 text-center p-6">
          <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${passed ? 'bg-primary/20' : 'bg-destructive/20'}`}>
            {passed ? <Trophy className="w-12 h-12 text-primary" /> : <XCircle className="w-12 h-12 text-destructive" />}
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {passed ? '💰 خبير سوق الانتقالات!' : '😅 حاول مرة ثانية!'}
          </h2>
          <div className="mb-4">
            <StarRating stars={stars} />
          </div>
          <p className="text-xl text-muted-foreground mb-2">
            النتيجة: {score} / 20
          </p>
          <p className="text-muted-foreground mb-6">
            {passed ? 'أنت تعرف أسعار اللاعبين!' : 'تابع أخبار الانتقالات أكثر!'}
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={handleRestart} className="px-6 py-3 rounded-xl bg-muted text-foreground font-bold hover:bg-muted/80 transition-all flex items-center gap-2">
              <RotateCcw className="w-5 h-5" /> إعادة
            </button>
            {passed && onLevelComplete && (
              <button onClick={() => onLevelComplete?.({ score, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all">
                المستوى التالي ➡️
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const pastRevealed = phase !== 'pastQuestion';
  const currentRevealed = phase === 'currentReveal' || phase === 'next';
  const showChart = pastRevealed || currentRevealed;

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start pt-16 pb-4 px-4" >
      <BattleBackground />
      <GameControls
        onExit={onRestart}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
        isPaused={isPaused}
      />

      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-3">
          <div className="flex items-center justify-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-primary">المستوى 97</span>
          </div>
          <h2 className="text-lg font-bold text-foreground">💰 كم كانت قيمته السوقية؟</h2>
          <p className="text-sm text-muted-foreground">
            السؤال {currentQ + 1} / {QUESTIONS_COUNT} | النقاط: {score}
          </p>
        </div>

        {/* Player name */}
        <div className="text-center mb-3">
          <h3 className="text-xl font-bold text-foreground">{question.playerName}</h3>
        </div>

        {/* Chart */}
        <div className="flex justify-center items-end gap-8 mb-4 p-4 rounded-2xl bg-card/80 border border-border backdrop-blur-sm">
          {/* Past bar */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-20 rounded-t-xl flex items-center justify-center font-bold text-sm transition-all duration-700 ${
                pastRevealed
                  ? pastCorrect
                    ? 'bg-green-500/30 border-2 border-green-500 text-green-400'
                    : 'bg-destructive/30 border-2 border-destructive text-destructive'
                  : 'bg-muted border-2 border-border text-muted-foreground'
              }`}
              style={{ height: pastRevealed ? `${Math.max(60, (question.pastValue / 200) * 120)}px` : '80px' }}
            >
              {pastRevealed ? formatValue(question.pastValue) : <HelpCircle className="w-6 h-6" />}
            </div>
            <span className="text-xs font-bold text-muted-foreground">{question.year}</span>
          </div>

          {/* Trend arrow */}
          {currentRevealed && (
            <div className="flex flex-col items-center pb-6">
              {question.currentValue > question.pastValue ? (
                <div className="text-green-400 flex flex-col items-center">
                  <TrendingUp className="w-8 h-8" />
                  <span className="text-xs font-bold mt-1">ارتفعت! 📈</span>
                </div>
              ) : question.currentValue < question.pastValue ? (
                <div className="text-destructive flex flex-col items-center">
                  <TrendingDown className="w-8 h-8" />
                  <span className="text-xs font-bold mt-1">انخفضت! 📉</span>
                </div>
              ) : (
                <span className="text-muted-foreground text-xs font-bold">ثابتة</span>
              )}
            </div>
          )}

          {/* Current bar */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-20 rounded-t-xl flex items-center justify-center font-bold text-sm transition-all duration-700 ${
                currentRevealed
                  ? currentCorrect
                    ? 'bg-green-500/30 border-2 border-green-500 text-green-400'
                    : 'bg-destructive/30 border-2 border-destructive text-destructive'
                  : 'bg-muted border-2 border-border text-muted-foreground'
              }`}
              style={{ height: currentRevealed ? `${Math.max(60, (question.currentValue / 200) * 120)}px` : '80px' }}
            >
              {currentRevealed ? formatValue(question.currentValue) : <HelpCircle className="w-6 h-6" />}
            </div>
            <span className="text-xs font-bold text-muted-foreground">2025</span>
          </div>
        </div>

        {/* Past Question */}
        {phase === 'pastQuestion' && (
          <div>
            <p className="text-center text-sm font-bold text-foreground mb-3">
              كم كانت قيمة {question.playerName} في {question.year}؟
            </p>
            <div className="grid grid-cols-2 gap-2">
              {shuffledPast.options.map((val, i) => {
                if (hiddenIndices.includes(i)) {
                  return <div key={i} className="p-3 rounded-xl border-2 border-border bg-card/30 opacity-20 min-h-[44px]" />;
                }
                return (
                <button
                  key={i}
                  onClick={() => handleSelectPast(i)}
                  disabled={selectedPast !== null}
                  className={`p-3 rounded-xl font-bold text-sm transition-all border-2 ${
                    selectedPast === null
                      ? 'bg-card border-border text-foreground hover:border-primary hover:bg-primary/10'
                      : i === shuffledPast.correctIndex
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : i === selectedPast
                      ? 'bg-destructive/20 border-destructive text-destructive'
                      : 'bg-card border-border text-muted-foreground opacity-50'
                  }`}
                >
                  {formatValue(val)}
                </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Past Reveal → go to current */}
        {phase === 'pastReveal' && (
          <div className="text-center">
            <p className="text-sm font-bold text-foreground mb-3">
              {pastCorrect ? '✅ إجابة صحيحة!' : `❌ الإجابة: ${formatValue(question.pastValue)}`}
            </p>
            <button
              onClick={() => setPhase('currentQuestion')}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all"
            >
              كم قيمته الآن؟ ➡️
            </button>
          </div>
        )}

        {/* Current Question */}
        {phase === 'currentQuestion' && (
          <div>
            <p className="text-center text-sm font-bold text-foreground mb-3">
              كم قيمة {question.playerName} الحالية في 2025؟
            </p>
            <div className="grid grid-cols-2 gap-2">
              {shuffledCurrent.options.map((val, i) => {
                if (hiddenIndices.includes(i)) {
                  return <div key={i} className="p-3 rounded-xl border-2 border-border bg-card/30 opacity-20 min-h-[44px]" />;
                }
                return (
                <button
                  key={i}
                  onClick={() => handleSelectCurrent(i)}
                  disabled={selectedCurrent !== null}
                  className={`p-3 rounded-xl font-bold text-sm transition-all border-2 ${
                    selectedCurrent === null
                      ? 'bg-card border-border text-foreground hover:border-primary hover:bg-primary/10'
                      : i === shuffledCurrent.correctIndex
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : i === selectedCurrent
                      ? 'bg-destructive/20 border-destructive text-destructive'
                      : 'bg-card border-border text-muted-foreground opacity-50'
                  }`}
                >
                  {formatValue(val)}
                </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Current Reveal → next */}
        {phase === 'currentReveal' && (
          <div className="text-center">
            <p className="text-sm font-bold text-foreground mb-3">
              {currentCorrect ? '✅ إجابة صحيحة!' : `❌ الإجابة: ${formatValue(question.currentValue)}`}
            </p>
            <button
              onClick={handleNext}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all text-lg"
            >
              {currentQ + 1 >= QUESTIONS_COUNT ? 'عرض النتيجة 🏆' : 'السؤال التالي ➡️'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
