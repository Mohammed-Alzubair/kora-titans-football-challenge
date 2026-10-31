import { LevelResult } from '@/types/levelProgression';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { level96Questions } from '@/data/level96VideoQuestions';
import { GameControls } from './GameControls';
import { BattleBackground } from './BattleBackground';
import { HelpBar } from './HelpBar';
import { useSound } from '@/hooks/useSound';
import { Trophy, XCircle, RotateCcw, Play, Film } from 'lucide-react';

const PREVIEW_DURATION = 2;
const QUESTIONS_COUNT = 10;

interface Level96ScreenProps {
  onRestart: () => void;
  onLevelComplete?: (result?: LevelResult) => void;
}

type Phase = 'preview' | 'question' | 'reveal' | 'result';

export function Level96Screen({ onRestart, onLevelComplete }: Level96ScreenProps) {
  const { playSound } = useSound();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [phase, setPhase] = useState<Phase>('preview');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);

  const question = level96Questions[currentQ];

  const { shuffledOptions, shuffledCorrectIndex } = useMemo(() => {
    const correctAnswer = question.options[question.correctIndex];
    const shuffled = [...question.options].sort(() => Math.random() - 0.5);
    return { shuffledOptions: shuffled, shuffledCorrectIndex: shuffled.indexOf(correctAnswer) };
  }, [currentQ, question]);

  useEffect(() => {
    if (phase !== 'preview') return;
    setVideoEnded(false);
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
    const timer = setTimeout(() => { video.pause(); setPhase('question'); }, PREVIEW_DURATION * 1000);
    return () => clearTimeout(timer);
  }, [phase, currentQ]);

  useEffect(() => {
    if (phase !== 'reveal') return;
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  }, [phase]);

  // Auto-solve next
  useEffect(() => {
    if (autoSolveNext && phase === 'question' && selectedIndex === null) {
      setAutoSolveNext(false);
      setTimeout(() => handleSelect(shuffledCorrectIndex), 500);
    }
  }, [autoSolveNext, currentQ, phase, selectedIndex]);

  const handleVideoEnd = () => { if (phase === 'reveal') setVideoEnded(true); };

  const handleSelect = (index: number) => {
    if (phase !== 'question' || selectedIndex !== null) return;
    setSelectedIndex(index);
    const isCorrect = index === shuffledCorrectIndex;
    if (isCorrect) { setScore(s => s + 1); playSound('correct'); } else { playSound('wrong'); }
    setTimeout(() => { setPhase('reveal'); }, 800);
  };

  const handleNext = () => {
    if (currentQ + 1 >= QUESTIONS_COUNT) {
      setGameOver(true);
      playSound(score >= 6 ? 'correct' : 'wrong');
    } else {
      setCurrentQ(q => q + 1);
      setSelectedIndex(null);
      setPhase('preview');
      setHelp1Used(false);
      setSolveUsed(false);
      setSpecialUsed(false);
      setHiddenIndices([]);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0); setScore(0); setSelectedIndex(null); setPhase('preview'); setGameOver(false); setVideoEnded(false);
  };

  // Help handlers
  const handleEliminateTwo = () => {
    const wrongIndices = shuffledOptions.map((_, i) => i).filter(i => i !== shuffledCorrectIndex);
    const toHide = wrongIndices.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenIndices(toHide);
    setHelp1Used(true);
  };

  const handleSolve = () => {
    handleSelect(shuffledCorrectIndex);
    setSolveUsed(true);
  };

  const handleSpecialSolve = () => {
    handleSelect(shuffledCorrectIndex);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };

  if (gameOver) {
    const passed = score >= 6;
    return (
      <div className="min-h-screen relative flex items-center justify-center" >
        <BattleBackground />
        <div className="relative z-10 text-center p-6">
          <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${passed ? 'bg-primary/20' : 'bg-destructive/20'}`}>
            {passed ? <Trophy className="w-12 h-12 text-primary" /> : <XCircle className="w-12 h-12 text-destructive" />}
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">{passed ? '🎬 عين سينمائية!' : '😅 حاول مرة ثانية!'}</h2>
          <p className="text-xl text-muted-foreground mb-2">النتيجة: {score} / {QUESTIONS_COUNT}</p>
          <p className="text-muted-foreground mb-6">{passed ? 'أنت تعرف كل لحظة في كرة القدم!' : 'شاهد المزيد من اللحظات الكروية!'}</p>
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

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start pt-16 pb-4 px-4" >
      <BattleBackground />
      <GameControls onExit={onRestart} onPause={() => setIsPaused(true)} onResume={() => setIsPaused(false)} isPaused={isPaused} />

      <div className="relative z-10 w-full max-w-lg">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Film className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-primary">المستوى 96</span>
          </div>
          <h2 className="text-lg font-bold text-foreground">🎬 ماذا حدث بعد ذلك؟</h2>
          <p className="text-sm text-muted-foreground">السؤال {currentQ + 1} / {QUESTIONS_COUNT} | النقاط: {score}</p>
        </div>

        <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30 mb-4 bg-black aspect-video">
          <video ref={videoRef} src={question.videoUrl} className="w-full h-full object-cover" playsInline muted onEnded={handleVideoEnd} />
          {phase === 'question' && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/30 flex items-center justify-center mb-2 animate-pulse">
                  <Play className="w-8 h-8 text-primary" />
                </div>
                <p className="text-white font-bold text-lg">ماذا حدث بعد ذلك؟ 🤔</p>
              </div>
            </div>
          )}
          {phase === 'preview' && (
            <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-bold animate-pulse">⏱️ مشاهدة...</div>
          )}
        </div>

        {(phase === 'question' || phase === 'reveal') && (
          <div className="grid grid-cols-1 gap-2 mb-4">
            {shuffledOptions.map((option, i) => {
              if (hiddenIndices.includes(i)) return <div key={i} className="p-3 rounded-xl border-2 border-border/30 bg-muted/10 opacity-20" />;
              let btnClass = 'p-3 rounded-xl font-bold text-sm transition-all border-2 ';
              if (selectedIndex === null) {
                btnClass += 'bg-card border-border text-foreground hover:border-primary hover:bg-primary/10';
              } else if (i === shuffledCorrectIndex) {
                btnClass += 'bg-green-500/20 border-green-500 text-green-400';
              } else if (i === selectedIndex) {
                btnClass += 'bg-destructive/20 border-destructive text-destructive';
              } else {
                btnClass += 'bg-card border-border text-muted-foreground opacity-50';
              }
              return (
                <button key={i} onClick={() => handleSelect(i)} disabled={selectedIndex !== null} className={btnClass}>{option}</button>
              );
            })}
          </div>
        )}

        {phase === 'question' && (
          <HelpBar
            questionType="choice"
            onHelp1={handleEliminateTwo}
            onSolve={handleSolve}
            onSpecialSolve={handleSpecialSolve}
            onSkipLevel={onLevelComplete || onRestart}
            help1Used={help1Used}
            solveUsed={solveUsed}
            specialUsed={specialUsed}
            disabled={selectedIndex !== null}
          />
        )}

        {phase === 'reveal' && videoEnded && (
          <button onClick={handleNext} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all text-lg">
            {currentQ + 1 >= QUESTIONS_COUNT ? 'عرض النتيجة 🏆' : 'السؤال التالي ➡️'}
          </button>
        )}
      </div>
    </div>
  );
}
