import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useRef, useCallback } from 'react';
import { getChallengeByLevel, isAnswerCorrect } from '@/data/whatDoYouKnowData';
import { GameControls } from './GameControls';
import { Timer } from './Timer';
import { Mic, MicOff, Send, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { StoneBackground } from './StoneBackground';
import { StoneCard } from './StoneCard';
import { HelpBar } from './HelpBar';

interface WhatDoYouKnowScreenProps {
  levelNum: number;
  onRestart: () => void;
  onLevelComplete?: (result?: LevelResult) => void;
}

export function WhatDoYouKnowScreen({ levelNum, onRestart, onLevelComplete }: WhatDoYouKnowScreenProps) {
  const challenge = getChallengeByLevel(levelNum);
  const [input, setInput] = useState('');
  const [foundAnswers, setFoundAnswers] = useState<string[]>([]);
  const [wrongAttempt, setWrongAttempt] = useState<string | null>(null);
  const [duplicateAttempt, setDuplicateAttempt] = useState(false);
  const [timeLeft, setTimeLeft] = useState(challenge?.timeLimit ?? 90);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const startTimeRef = useRef(Date.now());

  // Timer
  useEffect(() => {
    if (gameOver || isPaused) return;
    if (timeLeft <= 0) { setGameOver(true); return; }
    const t = setInterval(() => setTimeLeft(p => Math.max(0, p - 0.1)), 100);
    return () => clearInterval(t);
  }, [gameOver, isPaused, timeLeft]);

  // Show hint after 30s
  useEffect(() => {
    if (!challenge) return;
    const elapsed = challenge.timeLimit - timeLeft;
    if (elapsed >= 30 && !showHint) setShowHint(true);
  }, [timeLeft, challenge, showHint]);

  const handleSubmit = useCallback(() => {
    if (!challenge || !input.trim() || gameOver) return;
    const trimmed = input.trim();
    
    // Check duplicate
    const match = isAnswerCorrect(trimmed, challenge.acceptedAnswers);
    if (match) {
      const alreadyFound = foundAnswers.some(a => 
        isAnswerCorrect(a, [match]) !== null
      );
      if (alreadyFound) {
        setDuplicateAttempt(true);
        setTimeout(() => setDuplicateAttempt(false), 1000);
      } else {
        setFoundAnswers(prev => [...prev, match]);
      }
    } else {
      setWrongAttempt(trimmed);
      setTimeout(() => setWrongAttempt(null), 1000);
    }
    setInput('');
    inputRef.current?.focus();
  }, [input, challenge, foundAnswers, gameOver]);

  // Speech recognition
  const toggleSpeech = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = 'ar-SA';
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      setInput(text);
      setIsListening(false);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    recognitionRef.current = rec;
    rec.start();
    setIsListening(true);
  };

  const handleFinish = () => setGameOver(true);

  // Help handlers for text-based level
  const handleLetterHint = () => {
    if (!challenge) return;
    const notFound = challenge.acceptedAnswers.filter(a => !foundAnswers.some(f => isAnswerCorrect(f, [a]) !== null));
    if (notFound.length > 0) {
      const hint = notFound[0];
      const chars = hint.length < 3 ? hint.slice(0, 1) : hint.slice(0, 2);
      setInput(chars);
    }
    setHelp1Used(true);
  };

  const handleSolveText = () => {
    if (!challenge) return;
    const notFound = challenge.acceptedAnswers.filter(a => !foundAnswers.some(f => isAnswerCorrect(f, [a]) !== null));
    if (notFound.length > 0) {
      setFoundAnswers(prev => [...prev, notFound[0]]);
    }
    setSolveUsed(true);
  };

  const handleSpecialSolveText = () => {
    if (!challenge) return;
    const notFound = challenge.acceptedAnswers.filter(a => !foundAnswers.some(f => isAnswerCorrect(f, [a]) !== null));
    if (notFound.length > 0) setFoundAnswers(prev => [...prev, notFound[0]]);
    if (notFound.length > 1) setFoundAnswers(prev => [...prev, notFound[1]]);
    setSpecialUsed(true);
  };

  if (!challenge) return <div className="min-h-screen flex items-center justify-center text-foreground">تحدي غير موجود</div>;

  const points = foundAnswers.length >= challenge.minForTwoPoints ? 2 : foundAnswers.length >= challenge.minForOnePoint ? 1 : 0;
  const stars = points === 2 ? 3 : points === 1 ? 2 : foundAnswers.length > 0 ? 1 : 0;

  if (gameOver) {
    const missed = challenge.acceptedAnswers.filter(a => 
      !foundAnswers.some(f => isAnswerCorrect(f, [a]) !== null)
    );
    // Deduplicate missed (show unique names only)
    const uniqueMissed = [...new Set(missed)].slice(0, 15);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted">
        <div className="max-w-lg w-full bg-card rounded-2xl border-2 border-primary/50 p-6 text-center animate-bounce-in">
          <div className="text-6xl mb-4">{points >= 2 ? '🏆' : points >= 1 ? '⭐' : '😢'}</div>
          <h2 className="text-2xl font-black text-foreground mb-2">
            {points >= 2 ? '🔥 ممتاز!' : points >= 1 ? '👍 جيد!' : 'حاول مرة أخرى!'}
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            ذكرت <span className="text-primary font-bold">{foundAnswers.length}</span> إجابة صحيحة
          </p>
          <p className="text-lg font-bold text-primary mb-4">
            النقاط: {points} | النجوم: {'⭐'.repeat(stars)}
          </p>

          {foundAnswers.length > 0 && (
            <div className="mb-4 text-right">
              <p className="text-sm font-bold text-foreground mb-1">✅ إجاباتك:</p>
              <div className="flex flex-wrap gap-1">
                {foundAnswers.map((a, i) => (
                  <span key={i} className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">{a}</span>
                ))}
              </div>
            </div>
          )}

          {uniqueMissed.length > 0 && (
            <div className="mb-4 text-right">
              <p className="text-sm font-bold text-foreground mb-1">❌ بعض الإجابات المتبقية:</p>
              <div className="flex flex-wrap gap-1">
                {uniqueMissed.map((a, i) => (
                  <span key={i} className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">{a}</span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-center mt-4">
            <button onClick={onRestart} className="px-6 py-2 rounded-xl bg-muted text-foreground font-bold hover:bg-muted/80 transition-all">
              🔙 القائمة
            </button>
            {onLevelComplete && points >= 1 && (
              <button onClick={() => onLevelComplete?.({ score: foundAnswers.length, maxScore: challenge?.acceptedAnswers.length ?? 10, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all">
                المرحلة التالية ➡️
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pt-16 relative overflow-hidden">
      <StoneBackground levelNum={levelNum} />
      <GameControls onExit={onRestart} onPause={() => setIsPaused(true)} onResume={() => setIsPaused(false)} isPaused={isPaused} />

      <div className="w-full max-w-lg relative z-10">
        {/* Timer */}
        <Timer timeLeft={timeLeft} maxTime={challenge.timeLimit} />

        {/* Score */}
        <div className="flex justify-between items-center mt-3 mb-4 px-2">
          <span className="text-sm text-muted-foreground">المرحلة {levelNum}</span>
          <span className="text-lg font-bold text-primary">
            ✅ {foundAnswers.length} {foundAnswers.length >= challenge.minForOnePoint && '⭐'}
          </span>
        </div>

        {/* Question */}
        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 mb-4 border border-primary/30 text-center">
          <p className="text-lg font-bold text-foreground">{challenge.question}</p>
        </div>

        {/* Hint */}
        {showHint && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mb-4 flex items-center gap-2 animate-bounce-in">
            <Lightbulb className="w-5 h-5 text-yellow-500 shrink-0" />
            <p className="text-sm text-yellow-400">{challenge.hint}</p>
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="اكتب إجابتك..."
            className="flex-1 h-12 rounded-xl border border-input bg-background px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          <button
            onClick={toggleSpeech}
            className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${isListening ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-muted border-input text-muted-foreground hover:text-foreground'}`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <button
            onClick={handleSubmit}
            className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback */}
        {wrongAttempt && (
          <div className="flex items-center gap-2 mb-2 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-lg animate-bounce-in">
            <XCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-400">❌ "{wrongAttempt}" غير صحيحة</span>
          </div>
        )}
        {duplicateAttempt && (
          <div className="flex items-center gap-2 mb-2 px-3 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg animate-bounce-in">
            <span className="text-sm text-yellow-400">🔁 هذه الإجابة مكررة!</span>
          </div>
        )}

        {/* Progress bar */}
        <div className="mb-3 px-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>{foundAnswers.length} إجابة</span>
            <span>{foundAnswers.length < challenge.minForOnePoint ? `${challenge.minForOnePoint - foundAnswers.length} للنقطة ⭐` : foundAnswers.length < challenge.minForTwoPoints ? `${challenge.minForTwoPoints - foundAnswers.length} لنقطتين ⭐⭐` : '🔥 ممتاز!'}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all bg-primary"
              style={{ width: `${Math.min(100, (foundAnswers.length / challenge.minForTwoPoints) * 100)}%` }}
            />
          </div>
        </div>

        {/* Found answers */}
        <div className="flex flex-wrap gap-1 mb-4">
          {foundAnswers.map((a, i) => (
            <span key={i} className="px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-sm flex items-center gap-1 animate-bounce-in">
              <CheckCircle2 className="w-3 h-3" /> {a}
            </span>
          ))}
        </div>

        <HelpBar
          questionType="text"
          onHelp1={handleLetterHint}
          onSolve={handleSolveText}
          onSpecialSolve={handleSpecialSolveText}
          onSkipLevel={onLevelComplete || onRestart}
          help1Used={help1Used}
          solveUsed={solveUsed}
          specialUsed={specialUsed}
          disabled={gameOver}
        />

        <button
          onClick={handleFinish}
          className="w-full py-3 rounded-xl bg-muted text-foreground font-bold hover:bg-muted/80 transition-all border border-input"
        >
          انتهيت ✋
        </button>
      </div>
    </div>
  );
}
