import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useRef, useCallback } from 'react';
import { getAuctionLevel, isAuctionAnswerCorrect, AuctionQuestion } from '@/data/auctionData';
import { GameControls } from './GameControls';
import { Timer } from './Timer';
import { Mic, MicOff, Send, CheckCircle2, XCircle, Gavel } from 'lucide-react';
import { StoneBackground } from './StoneBackground';
import { StoneCard } from './StoneCard';
import { HelpBar } from './HelpBar';

interface AuctionScreenProps {
  levelNum: number;
  onRestart: () => void;
  onLevelComplete?: (result?: LevelResult) => void;
}

type Phase = 'bid' | 'play' | 'roundResult' | 'levelResult';

export function AuctionScreen({ levelNum, onRestart, onLevelComplete }: AuctionScreenProps) {
  const level = getAuctionLevel(levelNum);
  const [currentQ, setCurrentQ] = useState(0);
  const [phase, setPhase] = useState<Phase>('bid');
  const [bid, setBid] = useState('');
  const [playerBid, setPlayerBid] = useState(0);
  const [input, setInput] = useState('');
  const [foundAnswers, setFoundAnswers] = useState<string[]>([]);
  const [wrongAttempt, setWrongAttempt] = useState<string | null>(null);
  const [duplicateAttempt, setDuplicateAttempt] = useState(false);
  const [timeLeft, setTimeLeft] = useState(35);
  const [isPaused, setIsPaused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [roundScores, setRoundScores] = useState<number[]>([]);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bidRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const question: AuctionQuestion | undefined = level?.questions[currentQ];

  // Timer
  useEffect(() => {
    if (phase !== 'play' || isPaused) return;
    if (timeLeft <= 0) { endRound(); return; }
    const t = setInterval(() => setTimeLeft(p => Math.max(0, p - 0.1)), 100);
    return () => clearInterval(t);
  }, [phase, isPaused, timeLeft]);

  const endRound = useCallback(() => {
    const score = foundAnswers.length >= 10 ? 2 : foundAnswers.length >= 5 ? 1 : 0;
    setRoundScores(prev => [...prev, score]);
    setPhase('roundResult');
  }, [foundAnswers]);

  // Auto-end when time runs out
  useEffect(() => {
    if (phase === 'play' && timeLeft <= 0) endRound();
  }, [timeLeft, phase, endRound]);

  const startBid = () => {
    const bidNum = parseInt(bid) || 0;
    setPlayerBid(Math.min(bidNum, question?.maxAnswers ?? 20));
    setFoundAnswers([]);
    setTimeLeft(35);
    setInput('');
    setPhase('play');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSubmit = useCallback(() => {
    if (!question || !input.trim() || phase !== 'play') return;
    const trimmed = input.trim();
    const match = isAuctionAnswerCorrect(trimmed, question.acceptedAnswers);
    if (match) {
      const alreadyFound = foundAnswers.some(a => isAuctionAnswerCorrect(a, [match]) !== null);
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
  }, [input, question, foundAnswers, phase]);

  const nextRound = () => {
    if (!level) return;
    if (currentQ + 1 < level.questions.length) {
      setCurrentQ(prev => prev + 1);
      setBid('');
      setPlayerBid(0);
      setFoundAnswers([]);
      setPhase('bid');
    } else {
      setPhase('levelResult');
    }
  };

  // Speech recognition
  const toggleSpeech = () => {
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return; }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = 'ar-SA';
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e: any) => { setInput(e.results[0][0].transcript); setIsListening(false); };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    recognitionRef.current = rec;
    rec.start();
    setIsListening(true);
  };

  // Help handlers for text-based auction
  const handleLetterHint = () => {
    if (!question) return;
    const notFound = question.acceptedAnswers.filter(a => !foundAnswers.some(f => isAuctionAnswerCorrect(f, [a]) !== null));
    if (notFound.length > 0) {
      const hint = notFound[0];
      const chars = hint.length < 3 ? hint.slice(0, 1) : hint.slice(0, 2);
      setInput(chars);
    }
    setHelp1Used(true);
  };

  const handleSolveText = () => {
    if (!question) return;
    const notFound = question.acceptedAnswers.filter(a => !foundAnswers.some(f => isAuctionAnswerCorrect(f, [a]) !== null));
    if (notFound.length > 0) setFoundAnswers(prev => [...prev, notFound[0]]);
    setSolveUsed(true);
  };

  const handleSpecialSolveText = () => {
    if (!question) return;
    const notFound = question.acceptedAnswers.filter(a => !foundAnswers.some(f => isAuctionAnswerCorrect(f, [a]) !== null));
    if (notFound.length > 0) setFoundAnswers(prev => [...prev, notFound[0]]);
    if (notFound.length > 1) setFoundAnswers(prev => [...prev, notFound[1]]);
    setSpecialUsed(true);
  };

  if (!level || !question) return <div className="min-h-screen flex items-center justify-center text-foreground">مرحلة غير موجودة</div>;

  const totalPoints = roundScores.reduce((a, b) => a + b, 0);
  const totalStars = totalPoints >= 8 ? 3 : totalPoints >= 5 ? 2 : totalPoints >= 2 ? 1 : 0;

  // Level result screen
  if (phase === 'levelResult') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted">
        <div className="max-w-lg w-full bg-card rounded-2xl border-2 border-primary/50 p-6 text-center animate-bounce-in">
          <Gavel className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-black text-foreground mb-2">🏛️ انتهى المزاد!</h2>
          <p className="text-lg text-muted-foreground mb-2">
            مجموع النقاط: <span className="text-primary font-bold">{totalPoints}</span> من {level.questions.length * 2}
          </p>
          <p className="text-lg font-bold text-primary mb-4">{'⭐'.repeat(totalStars)}</p>
          <div className="space-y-1 mb-4">
            {roundScores.map((s, i) => (
              <div key={i} className="flex justify-between text-sm px-4">
                <span className="text-muted-foreground">الجولة {i + 1}</span>
                <span className={s >= 2 ? 'text-green-400' : s >= 1 ? 'text-yellow-400' : 'text-red-400'}>
                  {s} نقطة {s >= 2 ? '🔥' : s >= 1 ? '⭐' : '😢'}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-center mt-4">
            <button onClick={onRestart} className="px-6 py-2 rounded-xl bg-muted text-foreground font-bold hover:bg-muted/80 transition-all">🔙 القائمة</button>
            {onLevelComplete && totalPoints >= 2 && (
              <button onClick={() => onLevelComplete?.({ score: totalPoints, maxScore: (level?.questions.length ?? 5) * 2, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all">المرحلة التالية ➡️</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Round result screen
  if (phase === 'roundResult') {
    const lastScore = roundScores[roundScores.length - 1] ?? 0;
    const metBid = foundAnswers.length >= playerBid;
    const missed = question.acceptedAnswers.filter(a => !foundAnswers.some(f => isAuctionAnswerCorrect(f, [a]) !== null));
    const uniqueMissed = [...new Set(missed)].slice(0, 10);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted">
        <div className="max-w-lg w-full bg-card rounded-2xl border-2 border-primary/50 p-6 text-center animate-bounce-in">
          <div className="text-5xl mb-3">{metBid ? '🎯' : '😤'}</div>
          <h2 className="text-xl font-black text-foreground mb-2">
            الجولة {currentQ + 1} من {level.questions.length}
          </h2>
          <p className="text-sm text-muted-foreground mb-1">مزايدتك: {playerBid} | ذكرت: {foundAnswers.length}</p>
          <p className="text-lg font-bold mb-3">
            {metBid ? <span className="text-green-400">✅ وفيت بالمزاد!</span> : <span className="text-red-400">❌ ما وفيت بالمزاد</span>}
          </p>
          <p className="text-primary font-bold mb-3">النقاط: {lastScore} {lastScore >= 2 ? '🔥' : lastScore >= 1 ? '⭐' : ''}</p>

          {foundAnswers.length > 0 && (
            <div className="mb-3 text-right">
              <p className="text-xs font-bold text-foreground mb-1">✅ إجاباتك:</p>
              <div className="flex flex-wrap gap-1">
                {foundAnswers.map((a, i) => <span key={i} className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">{a}</span>)}
              </div>
            </div>
          )}
          {uniqueMissed.length > 0 && (
            <div className="mb-3 text-right">
              <p className="text-xs font-bold text-foreground mb-1">❌ بعض الإجابات:</p>
              <div className="flex flex-wrap gap-1">
                {uniqueMissed.map((a, i) => <span key={i} className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs">{a}</span>)}
              </div>
            </div>
          )}

          <button onClick={nextRound} className="mt-3 px-8 py-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all">
            {currentQ + 1 < level.questions.length ? 'الجولة التالية ➡️' : 'النتيجة النهائية 🏆'}
          </button>
        </div>
      </div>
    );
  }

  // Bid phase
  if (phase === 'bid') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <StoneBackground levelNum={levelNum} />
        <GameControls onExit={onRestart} onPause={() => setIsPaused(true)} onResume={() => setIsPaused(false)} isPaused={isPaused} />
        <div className="max-w-lg w-full text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gavel className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-black text-foreground">🏛️ المزاد</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-2">المرحلة {levelNum} — الجولة {currentQ + 1} من {level.questions.length}</p>

          <div className="bg-card/80 backdrop-blur-sm rounded-xl p-5 mb-6 border border-primary/30">
            <p className="text-lg font-bold text-foreground mb-3">{question.question}</p>
            <p className="text-sm text-muted-foreground">الأقصى: <span className="text-primary font-bold">{question.maxAnswers}</span> إجابة</p>
          </div>

          <div className="bg-card/60 rounded-xl p-4 border border-primary/20 mb-4">
            <p className="text-sm text-foreground mb-3 font-bold">كم تقدر تذكر في 35 ثانية؟ 🤔</p>
            <input
              ref={bidRef}
              type="number"
              value={bid}
              onChange={e => setBid(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && bid && startBid()}
              placeholder="اكتب رقم مزايدتك..."
              className="w-full h-12 rounded-xl border border-input bg-background px-4 text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary"
              min="1"
              max={question.maxAnswers}
              autoFocus
            />
          </div>

          <button
            onClick={startBid}
            disabled={!bid || parseInt(bid) < 1}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all disabled:opacity-50"
          >
            ابدأ المزاد! 🔨
          </button>

          <p className="text-xs text-muted-foreground mt-3">5 إجابات = نقطة ⭐ | 10+ = نقطتين 🔥</p>
        </div>
      </div>
    );
  }

  // Play phase
  return (
    <div className="min-h-screen flex flex-col items-center p-4 pt-16 relative overflow-hidden">
      <StoneBackground levelNum={levelNum} />
      <GameControls onExit={onRestart} onPause={() => setIsPaused(true)} onResume={() => setIsPaused(false)} isPaused={isPaused} />
      <div className="w-full max-w-lg relative z-10">
        <Timer timeLeft={timeLeft} maxTime={35} />

        <div className="flex justify-between items-center mt-3 mb-3 px-2">
          <span className="text-sm text-muted-foreground">الجولة {currentQ + 1}/{level.questions.length}</span>
          <span className="text-sm font-bold">
            مزايدتك: <span className="text-primary">{playerBid}</span> | ذكرت: <span className="text-green-400">{foundAnswers.length}</span>
          </span>
        </div>

        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-3 mb-3 border border-primary/30 text-center">
          <p className="text-base font-bold text-foreground">{question.question}</p>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-3">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="اكتب إجابتك..."
            className="flex-1 h-12 rounded-xl border border-input bg-background px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          <button onClick={toggleSpeech} className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${isListening ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-muted border-input text-muted-foreground hover:text-foreground'}`}>
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <button onClick={handleSubmit} className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 transition-all">
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
            <span className="text-sm text-yellow-400">🔁 مكررة!</span>
          </div>
        )}

        {/* Progress */}
        <div className="mb-2 px-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>{foundAnswers.length} إجابة</span>
            <span>{foundAnswers.length < 5 ? `${5 - foundAnswers.length} للنقطة` : foundAnswers.length < 10 ? `${10 - foundAnswers.length} لنقطتين` : '🔥 ممتاز!'}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all bg-primary" style={{ width: `${Math.min(100, (foundAnswers.length / Math.max(playerBid, 10)) * 100)}%` }} />
          </div>
        </div>

        {/* Found answers */}
        <div className="flex flex-wrap gap-1 mb-3">
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
          disabled={phase !== 'play'}
        />

        <button onClick={endRound} className="w-full py-3 rounded-xl bg-muted text-foreground font-bold hover:bg-muted/80 transition-all border border-input mt-2">
          انتهيت ✋
        </button>
      </div>
    </div>
  );
}
