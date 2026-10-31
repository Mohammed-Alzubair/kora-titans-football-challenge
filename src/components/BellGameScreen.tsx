import type { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { getBellLevel, getBellQuestionText, getPlayerName, type BellQuestion } from '@/data/bellGameData';
import { useI18n } from '@/i18n/I18nProvider';
import { GameControls } from './GameControls';
import { HelpBar } from './HelpBar';
import { Bell, CheckCircle2, XCircle, Star } from 'lucide-react';
import { StoneBackground } from './StoneBackground';
import { StoneCard } from './StoneCard';

interface BellGameScreenProps {
  levelNum: number;
  onRestart: () => void;
  onLevelComplete?: (result?: LevelResult) => void;
}

export function BellGameScreen({ levelNum, onRestart, onLevelComplete }: BellGameScreenProps) {
  const { locale, isArabic } = useI18n();
  const level = getBellLevel(levelNum);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showBell, setShowBell] = useState(true);
  const [bellUsed, setBellUsed] = useState(false);
  const [hiddenOptions, setHiddenOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [phase, setPhase] = useState<'playing' | 'result'>('playing');
  const [bellTimer, setBellTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [autoSolveNext, setAutoSolveNext] = useState(false);
  const [streak, setStreak] = useState(0);
  const [streakMsg, setStreakMsg] = useState<string | null>(null);
  const [streakTier, setStreakTier] = useState<'hype' | 'epic' | 'lose' | null>(null);
  const question: BellQuestion | undefined = level?.questions[currentQ];

  useEffect(() => {
    if (!streakMsg) return;
    const timer = setTimeout(() => {
      setStreakMsg(null);
      setStreakTier(null);
    }, 1800);
    return () => clearTimeout(timer);
  }, [streakMsg]);

  const shuffledOptions = useMemo(() => question ? [...question.options].sort(() => Math.random() - 0.5) : [], [currentQ, question]);

  useEffect(() => {
    if (phase !== 'playing') return;
    setShowBell(true);
    setBellUsed(false);
    setHiddenOptions([]);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setHelp1Used(false);
    setSolveUsed(false);
    setSpecialUsed(false);
    const timer = setTimeout(() => setShowBell(false), 500);
    setBellTimer(timer);
    return () => clearTimeout(timer);
  }, [currentQ, phase]);

  const handleAnswer = useCallback((answerId: string) => {
    if (selectedAnswer !== null || !question) return;
    setSelectedAnswer(answerId);
    const correct = answerId === question.answer.id;
    setIsCorrect(correct);
    if (correct) {
      setScore((previous) => previous + 1);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak >= 4) {
        setStreakMsg(isArabic ? 'سلسلة إجابات متتالية! 🔥' : 'A strong answer streak! 🔥');
        setStreakTier('epic');
      } else if (nextStreak >= 2) {
        setStreakMsg(isArabic ? 'إجابات متتالية صحيحة!' : 'Correct answers in a row!');
        setStreakTier('hype');
      }
    } else {
      setStreak(0);
      setStreakMsg(isArabic ? 'انتهت السلسلة… والعودة تبدأ الآن! 🔥' : 'Streak broken. Your comeback starts now! 🔥');
      setStreakTier('lose');
    }
    setTimeout(() => {
      if (!level) return;
      if (currentQ < level.questions.length - 1) setCurrentQ((previous) => previous + 1);
      else setPhase('result');
    }, 1500);
  }, [selectedAnswer, question, streak, isArabic, level, currentQ]);

  useEffect(() => {
    if (!autoSolveNext || phase !== 'playing' || selectedAnswer !== null || !question) return;
    setAutoSolveNext(false);
    const timer = setTimeout(() => handleAnswer(question.answer.id), 500);
    return () => clearTimeout(timer);
  }, [autoSolveNext, currentQ, phase, selectedAnswer, question, handleAnswer]);

  const handleBellClick = useCallback(() => {
    if (bellUsed || !question || !showBell) return;
    setBellUsed(true);
    setShowBell(false);
    if (bellTimer) clearTimeout(bellTimer);
    const incorrect = question.options.filter((option) => option.id !== question.answer.id);
    setHiddenOptions(incorrect.sort(() => Math.random() - 0.5).slice(0, 1).map((option) => option.id));
  }, [bellUsed, question, showBell, bellTimer]);

  const handleEliminateTwo = () => {
    if (!question) return;
    const incorrect = shuffledOptions.filter((option) => option.id !== question.answer.id);
    setHiddenOptions(incorrect.slice(0, 2).map((option) => option.id));
    setHelp1Used(true);
  };
  const handleSolve = () => { if (question) { handleAnswer(question.answer.id); setSolveUsed(true); } };
  const handleSpecialSolve = () => {
    if (!question) return;
    handleAnswer(question.answer.id);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };

  const getStars = () => {
    if (!level) return 0;
    const count = level.questions.length;
    if (score >= Math.ceil(count * 0.8)) return 3;
    if (score >= Math.ceil(count * 0.6)) return 2;
    if (score >= Math.ceil(count * 0.4)) return 1;
    return 0;
  };

  if (!level || !question) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">{isArabic ? 'تعذر تحميل المرحلة' : 'This stage could not be loaded'}</div>;
  }

  if (phase === 'result') {
    const stars = getStars();
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary p-4 gap-6">
        <div className="text-6xl mb-2">🔔</div>
        <h2 className="text-2xl font-bold text-primary">{isArabic ? 'انتهت الجولة!' : 'Round complete!'}</h2>
        <div className="flex gap-1 text-4xl">
          {[1, 2, 3].map((index) => <Star key={index} className={`w-10 h-10 ${index <= stars ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />)}
        </div>
        <p className="text-foreground text-lg">{isArabic ? 'إجابات صحيحة:' : 'Correct answers:'} <span className="text-primary font-bold">{score}</span> / <span className="text-primary font-bold">{level.questions.length}</span></p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button onClick={onRestart} className="px-6 py-3 rounded-xl bg-secondary text-foreground font-bold hover:bg-secondary/80 transition-colors">{isArabic ? 'القائمة الرئيسية' : 'Main menu'}</button>
          {onLevelComplete && <button onClick={() => onLevelComplete({ score, maxScore: level.questions.length, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors">{isArabic ? 'المرحلة التالية' : 'Next stage'} ➡️</button>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <StoneBackground levelNum={levelNum} />
      <GameControls onExit={onRestart} showPause={false} />
      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4 relative z-10">
        <div className="flex items-center justify-between w-full max-w-md">
          <span className="text-muted-foreground text-sm">{isArabic ? 'سؤال' : 'Question'} {currentQ + 1}/{level.questions.length}</span>
          <div className="flex gap-1">
            {level.questions.map((_, index) => <div key={index} className={`w-3 h-3 rounded-full ${index < currentQ ? 'bg-accent' : index === currentQ ? 'bg-primary' : 'bg-muted'}`} />)}
          </div>
          <span className="text-primary font-bold">{score} ✅</span>
        </div>

        <div className="h-20 flex items-center justify-center">
          {showBell && !bellUsed && <button onClick={handleBellClick} aria-label={isArabic ? 'استخدم الجرس لحذف خيار' : 'Use the bell to remove an option'} className="animate-bounce bg-primary/20 hover:bg-primary/40 border-2 border-primary rounded-full p-4 transition-all duration-200 active:scale-90"><Bell className="w-10 h-10 text-primary fill-primary animate-pulse" /></button>}
          {bellUsed && <div className="text-accent text-sm font-bold flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> {isArabic ? 'تم حذف خيار واحد' : 'One answer choice removed'}</div>}
        </div>

        <StoneCard levelNum={levelNum} className="w-full max-w-md text-center">
          <p className="text-white/80 text-sm font-semibold mb-2">{getBellQuestionText(question, locale)}</p>
          <p className="text-white text-lg font-bold leading-relaxed">{isArabic ? question.factAr : question.factEn}</p>
        </StoneCard>

        <div className="grid grid-cols-2 gap-3 w-full max-w-md">
          {shuffledOptions.map((option) => {
            const isHidden = hiddenOptions.includes(option.id);
            if (isHidden) return <div key={option.id} className="rounded-xl p-4 bg-muted/30 border border-border/30 opacity-30 text-center"><span className="text-muted-foreground line-through">{getPlayerName(option, locale)}</span></div>;
            const isSelected = selectedAnswer === option.id;
            const isRightAnswer = option.id === question.answer.id;
            let bgClass = 'bg-card hover:bg-secondary border-border';
            if (selectedAnswer !== null) {
              if (isRightAnswer) bgClass = 'bg-accent/20 border-accent';
              else if (isSelected && !isCorrect) bgClass = 'bg-destructive/20 border-destructive';
            }
            return <button key={option.id} onClick={() => handleAnswer(option.id)} disabled={selectedAnswer !== null} className={`rounded-xl p-4 border-2 font-bold text-foreground transition-all duration-200 ${bgClass} ${selectedAnswer === null ? 'active:scale-95' : ''}`}>
              <span className="flex items-center justify-center gap-2">
                {selectedAnswer !== null && isRightAnswer && <CheckCircle2 className="w-5 h-5 text-accent" />}
                {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive" />}
                {getPlayerName(option, locale)}
              </span>
            </button>;
          })}
        </div>

        <HelpBar questionType="choice" onHelp1={handleEliminateTwo} onSolve={handleSolve} onSpecialSolve={handleSpecialSolve} onSkipLevel={onLevelComplete || onRestart} help1Used={help1Used} solveUsed={solveUsed} specialUsed={specialUsed} disabled={selectedAnswer !== null} />
      </div>
      {streakMsg && <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 rounded-xl px-5 py-3 font-black ${streakTier === 'lose' ? 'bg-red-950/80 text-red-200' : 'bg-amber-950/80 text-amber-200'}`}>{streakMsg}</div>}
    </div>
  );
}
