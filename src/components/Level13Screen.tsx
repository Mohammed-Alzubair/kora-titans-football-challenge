import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSound } from '@/hooks/useSound';
import { Timer, Crown, RotateCcw, Trophy, XCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HelpBar } from './HelpBar';
import { GameControls } from './GameControls';

const QUESTIONS_COUNT = 10;
const QUESTION_TIME = 20;
const TRANSITION_DELAY = 2000;
const MAX_WRONG = 4;

// لاعبين للمستوى 13
const PLAYER_NAMES = [
  'كريستيانو رونالدو',
  'ليونيل ميسي',
  'نيمار',
  'كيليان مبابي',
  'محمد صلاح',
  'إيرلينغ هالاند',
  'رونالدينيو',
  'زين الدين زيدان',
  'روبرت ليفاندوفسكي',
  'سيرجيو راموس',
  'لويس سواريز',
  'غاريث بيل',
  'مسعود أوزيل',
  'تيبو كورتوا',
  'باولو مالديني',
  'جود بيلينغهام',
  'فينيسيوس جونيور',
  'لامين يامال',
  'بيدري',
  'رافينيا',
];

function shuffleString(str: string): string {
  const chars = str.replace(/\s/g, '').split('');
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  // Make sure shuffled is different from original
  const result = chars.join('');
  if (result === str.replace(/\s/g, '')) return shuffleString(str);
  return result;
}

interface GameState {
  currentQuestion: number;
  score: number;
  timeLeft: number;
  gameOver: boolean;
  totalCorrect: number;
  totalWrong: number;
  currentPlayerName: string;
  scrambledName: string;
  userInput: string;
  answerPhase: 'question' | 'result';
  isCorrect: boolean | null;
  celebrationMessage: string | null;
  usedNames: string[];
  kicked: boolean;
}

export function Level13Screen({ onRestart, onLevelComplete }: { onRestart: () => void; onLevelComplete?: (result?: LevelResult) => void }) {
  const { playSound } = useSound();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);

  const getNextPlayer = (used: string[]): string => {
    const available = PLAYER_NAMES.filter(n => !used.includes(n));
    const pool = available.length > 0 ? available : PLAYER_NAMES;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const [state, setState] = useState<GameState>(() => {
    const name = getNextPlayer([]);
    return {
      currentQuestion: 0,
      score: 0,
      timeLeft: QUESTION_TIME,
      gameOver: false,
      totalCorrect: 0,
      totalWrong: 0,
      currentPlayerName: name,
      scrambledName: shuffleString(name),
      userInput: '',
      answerPhase: 'question',
      isCorrect: null,
      celebrationMessage: null,
      usedNames: [name],
      kicked: false };
  });

  // Auto-solve next question (special help)
  useEffect(() => {
    if (autoSolveNext && state.answerPhase === 'question') {
      setAutoSolveNext(false);
      setTimeout(() => { setTimeout(() => handleSubmit(), 300); }, 500);
    }
  }, [autoSolveNext, state.currentQuestion, state.answerPhase]);

  const nextQuestion = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (state.currentQuestion >= QUESTIONS_COUNT - 1) {
      setState(prev => ({ ...prev, gameOver: true }));
      playSound('gameOver');
      return;
    }
    const name = getNextPlayer(state.usedNames);
    setState(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      currentPlayerName: name,
      scrambledName: shuffleString(name),
      userInput: '',
      timeLeft: QUESTION_TIME,
      answerPhase: 'question',
      isCorrect: null,
      celebrationMessage: null,
      usedNames: [...prev.usedNames, name] }));
  }, [state.currentQuestion, state.usedNames, playSound]);

  const handleSubmit = useCallback(() => {
    if (state.answerPhase === 'result') return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }

    const normalized = state.userInput.trim();
    const isCorrect = normalized === state.currentPlayerName;
    const newWrong = isCorrect ? state.totalWrong : state.totalWrong + 1;

    // Check if kicked out (4 wrong)
    if (newWrong >= MAX_WRONG) {
      setState(prev => ({
        ...prev,
        answerPhase: 'result',
        isCorrect: false,
        totalWrong: newWrong,
        celebrationMessage: 'روح اتعلم بعدين تعالي العب 😊',
        kicked: true }));
      playSound('wrong');
      setTimeout(() => {
        setState(prev => ({ ...prev, gameOver: true }));
      }, TRANSITION_DELAY);
      return;
    }

    const correctMsgs = ['برافو 👏', 'ممتاز يا بطل! 👏', 'صحيح! برافووو 👏🔥'];
    const wrongMsgs = ['من علمك الكتابه 🙂 اقرا كويس وكتب كويسسس', 'غلط! اكتب صح يا حبيبي 🙂', 'لا مو كذا! 🙂 ركز بالحروف'];

    const msg = isCorrect
      ? correctMsgs[Math.floor(Math.random() * correctMsgs.length)]
      : wrongMsgs[Math.floor(Math.random() * wrongMsgs.length)];

    setState(prev => ({
      ...prev,
      answerPhase: 'result',
      isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
      totalCorrect: isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect,
      totalWrong: newWrong,
      celebrationMessage: msg }));
    playSound(isCorrect ? 'correct' : 'wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state, nextQuestion, playSound]);

  const handleTimeout = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    const newWrong = state.totalWrong + 1;
    if (newWrong >= MAX_WRONG) {
      setState(prev => ({
        ...prev,
        answerPhase: 'result',
        isCorrect: false,
        totalWrong: newWrong,
        celebrationMessage: 'روح اتعلم بعدين تعالي العب 😊',
        kicked: true }));
      playSound('wrong');
      setTimeout(() => {
        setState(prev => ({ ...prev, gameOver: true }));
      }, TRANSITION_DELAY);
      return;
    }
    setState(prev => ({
      ...prev,
      answerPhase: 'result',
      isCorrect: false,
      totalWrong: newWrong,
      celebrationMessage: `⏰ انتهى الوقت! الجواب: ${state.currentPlayerName}` }));
    playSound('wrong');
    setTimeout(nextQuestion, TRANSITION_DELAY);
  }, [state.currentPlayerName, state.totalWrong, playSound, nextQuestion]);

  useEffect(() => {
    if (state.answerPhase !== 'question' || state.gameOver || isPaused) return;
    timerRef.current = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 0) return prev;
        return { ...prev, timeLeft: Math.max(0, prev.timeLeft - 1) };
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state.answerPhase, state.gameOver, state.currentQuestion, isPaused]);

  useEffect(() => {
    if (state.answerPhase === 'question' && state.timeLeft <= 0) handleTimeout();
  }, [state.timeLeft, state.answerPhase, handleTimeout]);

  useEffect(() => {
    if (state.answerPhase === 'question' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.currentQuestion, state.answerPhase]);

  const handleHelpEliminate = () => {
    // Show first 2 characters as hint
    const hint = state.currentPlayerName.slice(0, 2);
    setState(prev => ({ ...prev, userInput: hint }));
    setHelp1Used(true);
  };
  const handleHelpSolve = () => {
    setState(prev => ({ ...prev, userInput: state.currentPlayerName }));
    setSolveUsed(true);
    setTimeout(() => handleSubmit(), 300);
  };
  const handleHelpSpecial = () => {
    setState(prev => ({ ...prev, userInput: state.currentPlayerName }));
    setSpecialUsed(true);
    setAutoSolveNext(true);
    setTimeout(() => handleSubmit(), 300);
  };


  if (state.gameOver) {
    const getFinalMessage = () => {
      if (state.kicked) return { title: 'روح اتعلم بعدين تعالي العب 😊', subtitle: `${MAX_WRONG} أخطاء... كثير عليك!`, emoji: '📖😊' };
      if (state.totalCorrect >= 8) return { title: 'برافو عليك! 👏🔥', subtitle: 'كاتب ممتاز!', emoji: '🏆✍️' };
      if (state.totalCorrect >= 5) return { title: 'مو بطال! 👏', subtitle: 'بس تحتاج تتمرن أكثر', emoji: '📝' };
      return { title: 'من علمك الكتابه! 🙂', subtitle: 'تحتاج تراجع الأسماء', emoji: '📖' };
    };
    const msg = getFinalMessage();

    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900 via-orange-700 to-orange-800" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="bg-black/60 backdrop-blur-md rounded-3xl border border-primary/30 max-w-md mx-4 animate-bounce-in">
            <div className="text-center p-8">
              {state.totalCorrect >= 8 ? <Trophy className="w-24 h-24 mx-auto text-primary mb-4 animate-pulse" /> : state.totalCorrect >= 5 ? <HelpCircle className="w-24 h-24 mx-auto text-yellow-400 mb-4" /> : <XCircle className="w-24 h-24 mx-auto text-destructive mb-4" />}
              <div className="text-5xl mb-4">{msg.emoji}</div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">{msg.title}</h2>
              <p className="text-lg text-muted-foreground mb-4">{msg.subtitle}</p>
              <p className="text-2xl text-foreground mb-8">
                نتيجتك: <span className="text-primary font-bold">{state.totalCorrect}</span> من {QUESTIONS_COUNT}
              </p>
              <div className="flex flex-col gap-3">
                {!state.kicked && (
                  <button onClick={() => onLevelComplete?.({ score: state.totalCorrect, maxScore: QUESTIONS_COUNT, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start flex items-center gap-2 mx-auto">
                    <Trophy className="w-6 h-6" /> المستوى التالي 🚀
                  </button>
                )}
                <button onClick={onRestart} className="btn-start flex items-center gap-2 mx-auto opacity-70">
                  <RotateCcw className="w-6 h-6" /> العب من البداية
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
      <GameControls onExit={onRestart} onPause={() => setIsPaused(true)} onResume={() => setIsPaused(false)} isPaused={isPaused} />
      <div className="absolute inset-0 bg-gradient-to-b from-orange-900 via-orange-700 to-orange-800" />

      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex flex-col items-center gap-1">
        <div className="score-badge bg-black/50">✍️ {state.score}</div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full text-sm">{state.currentQuestion + 1} / {QUESTIONS_COUNT}</div>
        </div>
        <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg transition-all", state.timeLeft <= 3 ? "bg-destructive/20 text-destructive animate-pulse" : "bg-orange-700/50 text-orange-300")}>
          <Timer className="w-5 h-5" /> {state.timeLeft}
        </div>
        <div className="bg-yellow-400/20 px-3 py-1 rounded-full text-yellow-400 font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" /> المستوى 13
        </div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full">
        </div>
      </div>

      <div className="relative z-10 flex justify-center mb-2">
        <div className="bg-red-900/40 px-4 py-1 rounded-full text-red-300 font-bold text-sm">
          أخطاء: {state.totalWrong} / {MAX_WRONG}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-2xl">
          {/* Scrambled name */}
          <div className="bg-black/50 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6 mb-6 text-center">
            <p className="text-lg text-muted-foreground mb-2">رتّب الحروف واكتب اسم اللاعب ✍️</p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {state.scrambledName.split('').map((char, i) => (
                <span
                  key={i}
                  className="bg-orange-500/30 border border-orange-400/50 rounded-lg w-10 h-10 flex items-center justify-center text-xl font-black text-white"
                >
                  {char}
                </span>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-4 mb-4">
            <input
              ref={inputRef}
              type="text"
              value={state.userInput}
              onChange={(e) => setState(prev => ({ ...prev, userInput: e.target.value }))}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
              disabled={state.answerPhase === 'result'}
              placeholder="اكتب هنا"
              className="w-full bg-transparent text-white text-xl font-bold text-center outline-none placeholder:text-white/30"
              
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={state.answerPhase === 'result' || !state.userInput.trim()}
            className={cn(
              "w-full py-3 rounded-2xl font-bold text-lg transition-all",
              state.answerPhase === 'result' || !state.userInput.trim()
                ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white active:scale-95"
            )}
          >
            تأكيد ✅
          </button>

          {/* Show correct answer on wrong */}
          {state.answerPhase === 'result' && !state.isCorrect && (
            <div className="mt-4 text-center bg-black/40 rounded-xl p-3">
              <p className="text-yellow-400 font-bold">الجواب الصحيح: <span className="text-white">{state.currentPlayerName}</span></p>
            </div>
          )}
        </div>
      </div>

      
          <HelpBar
            questionType="text"
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
          <div className={cn("p-4 px-8 rounded-2xl border-2 backdrop-blur-sm animate-bounce-in text-center max-w-sm", state.isCorrect ? "bg-green-500/30 border-green-400/50" : "bg-destructive/30 border-destructive/50")}>
            <p className={cn("text-lg md:text-xl font-black", state.isCorrect ? "text-green-400" : "text-red-400")}>
              {state.celebrationMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
