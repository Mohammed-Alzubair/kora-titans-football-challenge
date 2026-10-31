import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useRef } from 'react';
import { useSound } from '@/hooks/useSound';
import { HelpCircle, Trophy, XCircle, RotateCcw, Crown, Lightbulb, CheckCircle, X, Search, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GameControls } from './GameControls';
import { StoneBackground } from './StoneBackground';
import { HelpBar } from './HelpBar';
import { getEntityForLevel, findMatchingQuestion, freeQuestions, type FreeQuestion } from '@/data/guessWhoData';

interface Props {
  levelNum: number;
  onRestart: () => void;
  onLevelComplete?: (result?: LevelResult) => void;
}

const typeLabel: Record<string, string> = { player: '🎯 من هو اللاعب؟', coach: '🎯 من هو المدرب؟', club: '🎯 ما هو النادي؟' };
const MAX_QUESTIONS = 10;
const HINT_AFTER = 9;

function getWinMsg() {
  const msgs = ['🤯 عبقري!', '🏆 أسطورة!', '👑 ملك المعرفة!', '🔥 ناااار!'];
  return msgs[Math.floor(Math.random() * msgs.length)];
}

function getLetterHint(name: string): string {
  const chars = name.split('');
  if (chars.length <= 3) {
    // Show 1 letter only
    return chars[0] + chars.slice(1).map(() => ' _').join('');
  }
  // Show first letter + one random non-first letter
  const indices = chars.map((_, i) => i).filter(i => i > 0 && chars[i] !== ' ');
  const randomIdx = indices[Math.floor(Math.random() * indices.length)];
  return chars.map((c, i) => {
    if (c === ' ') return '  ';
    if (i === 0 || i === randomIdx) return c;
    return ' _';
  }).join('');
}

// مكونات فرعية

function GameOverScreen({ won, entity, questionsUsed, onRestart, onLevelComplete, levelNum }: {
  won: boolean;
  entity: { name: string; image?: string };
  questionsUsed: number;
  onRestart: () => void;
  onLevelComplete?: (result?: LevelResult) => void;
  levelNum: number;
}) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StoneBackground levelNum={levelNum} />
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="bg-black/60 backdrop-blur-md rounded-3xl border border-purple-500/30 max-w-md mx-4 animate-bounce-in">
          <div className="text-center p-8">
            {won ? (
              <Trophy className="w-24 h-24 mx-auto text-yellow-400 mb-4 animate-pulse" />
            ) : (
              <XCircle className="w-24 h-24 mx-auto text-red-400 mb-4" />
            )}
            {won && entity.image && (
              <div className="mb-4">
                <img src={entity.image} alt={entity.name} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-yellow-400 shadow-lg shadow-yellow-400/30" />
              </div>
            )}
            <div className="text-5xl mb-4">{won ? '🎉🏆' : '😞'}</div>
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">
              {won ? getWinMsg() : 'للأسف... غلط!'}
            </h2>
            <p className="text-lg text-white/70 mb-2">
              {won
                ? `عرفته بـ ${questionsUsed} أسئلة!`
                : `الجواب الصحيح: ${entity.name}`}
            </p>
            {!won && entity.image && (
              <div className="mb-4">
                <img src={entity.image} alt={entity.name} className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-red-400/50" />
              </div>
            )}
            <p className="text-white/50 mb-6">أسئلة مستخدمة: {questionsUsed} / {MAX_QUESTIONS}</p>
            <div className="flex flex-col gap-3">
              {won && onLevelComplete && (
                <button onClick={() => onLevelComplete?.({ score: won ? 10 : 0, maxScore: 10, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start text-xl px-8 py-4 animate-pulse">
                  المرحلة التالية 🚀
                </button>
              )}
              <button onClick={onRestart} className="btn-start flex items-center gap-2 mx-auto opacity-80">
                <RotateCcw className="w-5 h-5" /> من البداية
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionSuggestions({ suggestions, onSelect }: {
  suggestions: FreeQuestion[];
  onSelect: (q: FreeQuestion) => void;
}) {
  if (suggestions.length === 0) return null;
  return (
    <div className="bg-black/40 border border-purple-400/30 rounded-xl p-2 mb-2 max-h-40 overflow-y-auto">
      {suggestions.map((q, i) => (
        <button key={i} onClick={() => onSelect(q)}
          className="w-full text-right p-2 rounded-lg text-sm text-white/80 hover:bg-purple-500/30 transition-all">
          {q.displayText}
        </button>
      ))}
    </div>
  );
}

export function GuessWhoScreen({ levelNum, onRestart, onLevelComplete }: Props) {
  const entity = getEntityForLevel(levelNum)!;
  const { playSound } = useSound();
  const [isPaused, setIsPaused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const guessInputRef = useRef<HTMLInputElement>(null);

  const [askedQuestions, setAskedQuestions] = useState<{ displayText: string; answer: boolean }[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [guessMode, setGuessMode] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [questionInput, setQuestionInput] = useState('');
  const [guessInput, setGuessInput] = useState('');
  const [suggestions, setSuggestions] = useState<FreeQuestion[]>([]);
  const [noMatch, setNoMatch] = useState(false);
  const [letterHint, setLetterHint] = useState<string | null>(null);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);

  // تحديث الاقتراحات عند الكتابة
  useEffect(() => {
    if (!questionInput.trim()) {
      setSuggestions([]);
      setNoMatch(false);
      return;
    }
    const input = questionInput.trim().toLowerCase();
    const matched = freeQuestions.filter(q =>
      q.keywords.some(kw => kw.toLowerCase().includes(input) || input.includes(kw.toLowerCase())) ||
      q.displayText.toLowerCase().includes(input)
    ).slice(0, 8);
    setSuggestions(matched);
    setNoMatch(false);
  }, [questionInput]);

  const askFreeQuestion = (fq: FreeQuestion) => {
    if (askedQuestions.length >= MAX_QUESTIONS || guessMode || gameOver) return;
    const answer = !!entity.properties[fq.propertyKey];
    playSound(answer ? 'correct' : 'wrong');
    const newAsked = [...askedQuestions, { displayText: fq.displayText, answer }];
    setAskedQuestions(newAsked);
    if (newAsked.length >= HINT_AFTER) setShowHint(true);
    setQuestionInput('');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const handleQuestionSubmit = () => {
    if (!questionInput.trim()) return;
    const match = findMatchingQuestion(questionInput);
    if (match) {
      askFreeQuestion(match);
    } else {
      setNoMatch(true);
      playSound('wrong');
    }
  };

  const handleSelectSuggestion = (q: FreeQuestion) => {
    askFreeQuestion(q);
  };

  const handleGuessSubmit = () => {
    if (!guessInput.trim()) return;
    const guess = guessInput.trim();
    const normalize = (s: string) => s.replace(/[\u064B-\u065F\u0670]/g, '').replace(/\s+/g, ' ').trim();
    const isCorrect = normalize(guess) === normalize(entity.name) ||
      guess.toLowerCase() === entity.name.toLowerCase();
    setGameOver(true);
    setWon(isCorrect);
    playSound(isCorrect ? 'correct' : 'wrong');
    };

  // Help handlers
  const handleLetterHint = () => {
    setLetterHint(getLetterHint(entity.name));
    setHelp1Used(true);
  };

  const handleSolve = () => {
    setGameOver(true);
    setWon(true);
    playSound('correct');
    setSolveUsed(true);
  };

  const handleSpecialSolve = () => {
    setGameOver(true);
    setWon(true);
    playSound('correct');
    setSpecialUsed(true);
  };

  if (gameOver) {
    return <GameOverScreen won={won} entity={entity} questionsUsed={askedQuestions.length} onRestart={onRestart} onLevelComplete={onLevelComplete} levelNum={levelNum} />;
  }

  // وضع التخمين - كتابة الاسم
  if (guessMode) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex flex-col relative overflow-hidden">
        <GameControls onExit={onRestart} onPause={() => setIsPaused(true)} onResume={() => setIsPaused(false)} isPaused={isPaused} />
        <StoneBackground levelNum={levelNum} />
        <div className="flex justify-between items-center mb-4 relative z-10">
          <div className="bg-purple-400/20 px-3 py-1 rounded-full text-purple-300 font-bold text-sm flex items-center gap-1">
            <Crown className="w-4 h-4" /> المستوى {levelNum}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
          <div className="w-full max-w-lg">
            <div className="bg-black/50 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6 mb-6 text-center">
              <HelpCircle className="w-12 h-12 mx-auto text-yellow-400 mb-3" />
              <h2 className="text-2xl font-black text-white mb-2">🎯 اكتب إجابتك!</h2>
              <p className="text-white/60">{typeLabel[entity.type]}</p>
            </div>

            {letterHint && (
              <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-2xl p-4 mb-4 text-center animate-bounce-in">
                <p className="text-yellow-300 font-bold text-sm mb-1">💡 تلميح بالحروف:</p>
                <p className="text-2xl font-black text-yellow-200 tracking-widest" >{letterHint}</p>
              </div>
            )}

            <div className="bg-black/40 backdrop-blur-sm border border-yellow-400/20 rounded-2xl p-4 mb-4">
              <div className="flex gap-2">
                <input
                  ref={guessInputRef}
                  type="text"
                  value={guessInput}
                  onChange={e => setGuessInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleGuessSubmit()}
                  placeholder="اكتب اسم اللاعب / المدرب / النادي..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-400/50 text-right"
                  autoFocus
                  
                />
                <button onClick={handleGuessSubmit}
                  className="bg-yellow-500/30 hover:bg-yellow-500/50 border border-yellow-400/40 rounded-xl px-4 py-3 text-yellow-300 transition-all active:scale-95">
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-white/40 text-xs mt-2 text-center">⚠️ فرصة واحدة فقط - إذا غلطت تخسر!</p>
            </div>

            <HelpBar
              questionType="text"
              onHelp1={handleLetterHint}
              onSolve={handleSolve}
              onSpecialSolve={handleSpecialSolve}
              onSkipLevel={onLevelComplete || onRestart}
              help1Used={help1Used}
              solveUsed={solveUsed}
              specialUsed={specialUsed}
              disabled={gameOver}
            />

            <button onClick={() => setGuessMode(false)}
              className="w-full p-3 rounded-xl bg-white/10 text-white/60 hover:bg-white/20 transition-all text-sm mt-3">
              ← ارجع واسأل أسئلة أكثر
            </button>
          </div>
        </div>
      </div>
    );
  }

  // المرحلة الرئيسية - كتابة الأسئلة
  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col relative overflow-hidden">
      <GameControls onExit={onRestart} onPause={() => setIsPaused(true)} onResume={() => setIsPaused(false)} isPaused={isPaused} />
      <StoneBackground levelNum={levelNum} />

      {/* Header */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="bg-purple-400/20 px-3 py-1 rounded-full text-purple-300 font-bold text-sm flex items-center gap-1">
          <Crown className="w-4 h-4" /> المستوى {levelNum}
        </div>
        <div className="text-white font-bold bg-black/30 px-3 py-1 rounded-full">
          أسئلة: {askedQuestions.length} / {MAX_QUESTIONS}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative z-10 overflow-y-auto">
        <div className="w-full max-w-lg mx-auto">
          {/* Title */}
          <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-4 mb-4 text-center">
            <HelpCircle className="w-10 h-10 mx-auto text-purple-400 mb-2" />
            <h2 className="text-xl font-black text-white">{typeLabel[entity.type]}</h2>
            <p className="text-white/50 text-sm mt-1">اكتب سؤالك بنفسك! (نعم / لا)</p>
          </div>

          {/* Previous Answers */}
          {askedQuestions.length > 0 && (
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-4">
              <h3 className="text-white/70 font-bold text-sm mb-3">📋 الإجابات السابقة:</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {askedQuestions.map((item, idx) => (
                  <div key={idx} className={cn("flex items-center gap-2 p-2 rounded-xl text-sm",
                    item.answer ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300")}>
                    {item.answer ? <CheckCircle className="w-4 h-4 shrink-0" /> : <X className="w-4 h-4 shrink-0" />}
                    <span className="font-bold">{item.displayText}</span>
                    <span className="mr-auto font-black">{item.answer ? 'نعم ✅' : 'لا ❌'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Letter Hint */}
          {letterHint && (
            <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-2xl p-4 mb-4 text-center animate-bounce-in">
              <p className="text-yellow-300 font-bold text-sm mb-1">💡 تلميح بالحروف:</p>
              <p className="text-2xl font-black text-yellow-200 tracking-widest" >{letterHint}</p>
            </div>
          )}

          {/* Hint */}
          {showHint && (
            <div className="bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-2xl p-4 mb-4 animate-bounce-in">
              <div className="flex items-center gap-2 text-yellow-300">
                <Lightbulb className="w-5 h-5" />
                <span className="font-bold">💡 تلميح:</span>
              </div>
              <p className="text-yellow-200 mt-1 font-bold">{entity.hint}</p>
            </div>
          )}

          {/* Question Input */}
          {askedQuestions.length < MAX_QUESTIONS && (
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-4">
              <h3 className="text-white/70 font-bold text-sm mb-3 flex items-center gap-2">
                <Search className="w-4 h-4" /> اكتب سؤالك:
              </h3>
              <div className="flex gap-2 mb-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={questionInput}
                  onChange={e => setQuestionInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleQuestionSubmit()}
                  placeholder="مثال: هل هو برازيلي؟ هل يلعب في إسبانيا؟"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-400/50 text-right text-sm"
                  
                  autoFocus
                />
                <button onClick={handleQuestionSubmit}
                  className="bg-purple-500/30 hover:bg-purple-500/50 border border-purple-400/40 rounded-xl px-4 py-3 text-purple-300 transition-all active:scale-95">
                  <Send className="w-5 h-5" />
                </button>
              </div>

              {/* Suggestions dropdown */}
              <QuestionSuggestions suggestions={suggestions} onSelect={handleSelectSuggestion} />

              {noMatch && (
                <p className="text-red-300 text-xs mt-1 animate-pulse">❌ لم أفهم سؤالك، جرب كلمات أخرى مثل: برازيلي، مهاجم، ريال مدريد...</p>
              )}
            </div>
          )}

          {/* Help Bar */}
          <HelpBar
            questionType="text"
            onHelp1={handleLetterHint}
            onSolve={handleSolve}
            onSpecialSolve={handleSpecialSolve}
            onSkipLevel={onLevelComplete || onRestart}
            help1Used={help1Used}
            solveUsed={solveUsed}
            specialUsed={specialUsed}
            disabled={gameOver}
          />

          {/* Guess Button */}
          <button onClick={() => { setGuessMode(true); }}
            className="w-full p-4 rounded-2xl font-black text-xl border-2 border-yellow-400/50 bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/40 transition-all active:scale-95 animate-pulse mb-4 mt-3">
            🎯 أخمن الآن!
          </button>

          {askedQuestions.length >= MAX_QUESTIONS && (
            <p className="text-center text-red-300 font-bold animate-pulse">
              انتهت أسئلتك! اضغط &quot;أخمن الآن&quot; 👆
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
