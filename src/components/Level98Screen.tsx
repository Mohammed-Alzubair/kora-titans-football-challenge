import { LevelResult } from '@/types/levelProgression';
import { useState, useMemo, useCallback } from 'react';
import { level98Questions, OrderItem } from '@/data/level98OrderData';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';
import { BattleBackground } from './BattleBackground';
import { useSound } from '@/hooks/useSound';
import { Trophy, RotateCcw, ArrowUp, ArrowDown, GripVertical, Check, X } from 'lucide-react';
import { StarRating } from './StarRating';

const QUESTIONS_COUNT = 10;

interface Level98ScreenProps {
  onRestart: () => void;
  onLevelComplete?: (result?: LevelResult) => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Level98Screen({ onRestart, onLevelComplete }: Level98ScreenProps) {
  const { playSound } = useSound();
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const questions = useMemo(() => {
    const shuffled = shuffleArray(level98Questions);
    return shuffled.slice(0, QUESTIONS_COUNT);
  }, []);

  const question = questions[currentQ];

  // Shuffled order for the current question
  const [userOrder, setUserOrder] = useState<OrderItem[]>(() =>
    shuffleArray(questions[0].items)
  );

  const isCorrectOrder = useCallback(() => {
    return userOrder.every((item, i) => item.name === question.items[i].name);
  }, [userOrder, question]);

  const handleSubmit = () => {
    setSubmitted(true);
    if (isCorrectOrder()) {
      setScore(s => s + 1);
      playSound('correct');
    } else {
      playSound('wrong');
    }
  };

  const handleNext = () => {
    const next = currentQ + 1;
    if (next >= QUESTIONS_COUNT) {
      setGameOver(true);
      playSound('gameOver');
    } else {
      setCurrentQ(next);
      setUserOrder(shuffleArray(questions[next].items));
      setSubmitted(false);
      setDraggedIndex(null);
    }
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (submitted) return;
    const newOrder = [...userOrder];
    const [moved] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, moved);
    setUserOrder(newOrder);
  };

  const moveUp = (index: number) => {
    if (index > 0) moveItem(index, index - 1);
  };

  const moveDown = (index: number) => {
    if (index < userOrder.length - 1) moveItem(index, index + 1);
  };

  // Touch drag handling
  const handleDragStart = (index: number) => {
    if (submitted) return;
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      moveItem(draggedIndex, index);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const getStars = () => {
    if (score >= 9) return 3;
    if (score >= 7) return 2;
    if (score >= 5) return 1;
    return 0;
  };

  const handleHelpEliminate = () => {
    // For ordering level, place first item correctly
    const correctFirst = question.items[0];
    const idx = userOrder.findIndex(item => item.name === correctFirst.name);
    if (idx > 0) moveItem(idx, 0);
    setHelp1Used(true);
  };
  const handleHelpSolve = () => {
    // Set correct order
    setUserOrder([...question.items]);
    setSolveUsed(true);
  };
  const handleHelpSpecial = () => {
    setUserOrder([...question.items]);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };


  if (gameOver) {
    const stars = getStars();
    return (
      <div className="min-h-screen relative flex items-center justify-center" >
        <BattleBackground />
        <div className="relative z-10 text-center p-6">
          <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-2">انتهى المستوى! 🏆</h2>
          <p className="text-xl text-muted-foreground mb-4">
            نتيجتك: {score} / {QUESTIONS_COUNT}
          </p>
          <StarRating stars={stars} />
          <div className="flex gap-3 justify-center mt-6">
            <button onClick={onRestart} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-bold hover:bg-secondary/80 transition-all">
              <RotateCcw className="w-5 h-5" /> القائمة
            </button>
            {onLevelComplete && (
              <button onClick={() => onLevelComplete?.({ score, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all">
                المستوى التالي ➡️
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col" >
      <BattleBackground />
      <GameControls
        onExit={onRestart}
        isPaused={isPaused}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
      />

      {isPaused ? (
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="text-center p-6 bg-card/90 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">⏸️ إيقاف مؤقت</h2>
            <button onClick={() => setIsPaused(false)} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold">متابعة</button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-start relative z-10 px-4 pt-16 pb-4">
          {/* Progress */}
          <div className="w-full max-w-md mb-3">
            <div className="flex justify-between items-center text-sm text-muted-foreground mb-1">
              <span>السؤال {currentQ + 1} / {QUESTIONS_COUNT}</span>
              <span>النتيجة: {score}</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((currentQ + 1) / QUESTIONS_COUNT) * 100}%` }} />
            </div>
          </div>

          {/* Question */}
          <div className="w-full max-w-md mb-3">
            <div className="bg-card/90 backdrop-blur rounded-xl border border-border p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">
                {question.type === 'clubs' ? '🏟️ أندية' : '⚽ لاعبين'}
              </p>
              <h3 className="text-base font-bold text-foreground leading-tight">
                {question.question}
              </h3>
              <p className="text-xs text-primary mt-1">⬆️ الأعلى أولاً ⬇️</p>
            </div>
          </div>

          {/* Sortable items */}
          <div className="w-full max-w-md space-y-2 mb-4">
            {userOrder.map((item, index) => {
              const correctIndex = question.items.findIndex(ci => ci.name === item.name);
              const isCorrectPosition = submitted && correctIndex === index;
              const isWrongPosition = submitted && correctIndex !== index;

              return (
                <div
                  key={item.name}
                  draggable={!submitted}
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`
                    flex items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300
                    ${draggedIndex === index ? 'opacity-50 scale-95' : ''}
                    ${isCorrectPosition ? 'bg-green-500/20 border-green-500' : ''}
                    ${isWrongPosition ? 'bg-red-500/20 border-red-500' : ''}
                    ${!submitted ? 'bg-card/90 border-border hover:border-primary/50 cursor-grab active:cursor-grabbing' : 'bg-card/90 border-border'}
                  `}
                >
                  {/* Rank number */}
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
                    ${isCorrectPosition ? 'bg-green-500 text-white' : ''}
                    ${isWrongPosition ? 'bg-red-500 text-white' : ''}
                    ${!submitted ? 'bg-primary/20 text-primary' : ''}
                  `}>
                    {submitted ? (isCorrectPosition ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />) : index + 1}
                  </div>

                  {/* Drag handle */}
                  {!submitted && (
                    <GripVertical className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}

                  {/* Item name */}
                  <span className="flex-1 font-bold text-foreground text-sm">{item.name}</span>

                  {/* Move buttons (for mobile) */}
                  {!submitted && (
                    <div className="flex flex-col gap-0.5 flex-shrink-0">
                      <button
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        className="p-1 rounded bg-muted hover:bg-primary/20 disabled:opacity-30 transition-colors"
                      >
                        <ArrowUp className="w-3 h-3 text-foreground" />
                      </button>
                      <button
                        onClick={() => moveDown(index)}
                        disabled={index === userOrder.length - 1}
                        className="p-1 rounded bg-muted hover:bg-primary/20 disabled:opacity-30 transition-colors"
                      >
                        <ArrowDown className="w-3 h-3 text-foreground" />
                      </button>
                    </div>
                  )}

                  {/* Show value after submit */}
                  {submitted && (
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {question.items[correctIndex].value} {question.unit}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Correct order after submit */}
          {submitted && !isCorrectOrder() && (
            <div className="w-full max-w-md mb-4">
              <div className="bg-card/90 backdrop-blur rounded-xl border border-primary/30 p-3">
                <p className="text-xs text-primary font-bold mb-2 text-center">✅ الترتيب الصحيح:</p>
                <div className="space-y-1">
                  {question.items.map((item, i) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <span className="text-foreground font-medium">{item.name}</span>
                      <span className="text-muted-foreground text-xs mr-auto">{item.value} {question.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action button */}
          <div className="w-full max-w-md">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all text-lg"
              >
                تأكيد الترتيب ✅
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all text-lg"
              >
                {currentQ + 1 >= QUESTIONS_COUNT ? 'عرض النتيجة 🏆' : 'السؤال التالي ➡️'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
