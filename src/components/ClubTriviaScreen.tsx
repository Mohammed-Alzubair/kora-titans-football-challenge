import { LevelResult } from '@/types/levelProgression';
import { useState, useEffect, useRef } from 'react';
import { useSound } from '@/hooks/useSound';
import { Trophy, XCircle, RotateCcw, CheckCircle, X } from 'lucide-react';
import { GameControls } from './GameControls';
import { StoneBackground } from './StoneBackground';
import { StoneCard } from './StoneCard';
import { StoneButton } from './StoneButton';
import { StreakOverlay } from './StreakOverlay';
import { getStreakComment } from '@/utils/streakComments';
import { getClubTriviaForLevel, ClubTriviaQuestion } from '@/data/clubTriviaData';
import { HelpBar } from './HelpBar';

interface Props {
  levelNum: number;
  onRestart: () => void;
  onLevelComplete?: (result?: LevelResult) => void;
}

const QUESTIONS_PER_LEVEL = 7;
const TIME_PER_QUESTION = 10;

export function ClubTriviaScreen({ levelNum, onRestart, onLevelComplete }: Props) {
  const levelData = getClubTriviaForLevel(levelNum);
  const { playSound } = useSound();
  const [isPaused, setIsPaused] = useState(false);
  const [help1Used, setHelp1Used] = useState(false);
  const [solveUsed, setSolveUsed] = useState(false);
  const [specialUsed, setSpecialUsed] = useState(false);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [autoSolveNext, setAutoSolveNext] = useState(false);

  // Pick random questions from pool
  const [questions] = useState<ClubTriviaQuestion[]>(() => {
    if (!levelData) return [];
    const shuffled = [...levelData.questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, QUESTIONS_PER_LEVEL);
  });

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [gameOver, setGameOver] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [streak, setStreak] = useState(0);
  const [wrongStreak, setWrongStreak] = useState(0);
  const [streakMsg, setStreakMsg] = useState<string | null>(null);
  const [streakTier, setStreakTier] = useState<'hype' | 'epic' | 'lose' | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer
  useEffect(() => {
    if (answered !== null || gameOver || isPaused) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0.1) {
          clearInterval(timerRef.current!);
          handleAnswer(null); // time out
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [currentQ, answered, gameOver, isPaused]);

  const handleAnswer = (answer: boolean | string | null) => {
    if (answered !== null) return;
    const q = questions[currentQ];
    if (!q) return;

    let isCorrect = false;
    if (answer === null) {
      isCorrect = false; // timeout
    } else if (q.type === 'yes_no') {
      isCorrect = answer === q.correctAnswer;
    } else {
      isCorrect = answer === q.correctAnswer;
    }

    setSelectedAnswer(answer);
    setAnswered(isCorrect);
    setShowFeedback(true);
    if (isCorrect) {
      setScore(prev => prev + 1);
      playSound('correct');
      const newStreak = streak + 1;
      setStreak(newStreak);
      setWrongStreak(0);
      const comment = getStreakComment(newStreak);
      if (comment) {
        setStreakMsg(comment.message);
        setStreakTier(comment.tier);
      }
    } else {
      setStreak(0);
      setWrongStreak(prev => {
        const nw = prev + 1;
        const loseComment = getStreakComment(0, nw);
        if (loseComment) { setStreakMsg(loseComment.message); setStreakTier(loseComment.tier); }
        return nw;
      });
      playSound('wrong');
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQ + 1 >= QUESTIONS_PER_LEVEL) {
        setGameOver(true);
        playSound('gameOver');
      } else {
        setCurrentQ(prev => prev + 1);
        setAnswered(null);
        setSelectedAnswer(null);
        setTimeLeft(TIME_PER_QUESTION);
        setHelp1Used(false);
        setSolveUsed(false);
        setSpecialUsed(false);
        setHiddenIndices([]);
      }
    }, 1500);
  };

  // Auto-solve next question if special was used
  useEffect(() => {
    if (autoSolveNext && answered === null && questions[currentQ]) {
      setAutoSolveNext(false);
      const q = questions[currentQ];
      setTimeout(() => handleAnswer(q.correctAnswer), 500);
    }
  }, [autoSolveNext, currentQ, answered]);

  // Help handlers
  const handleEliminateTwo = () => {
    const q = questions[currentQ];
    if (!q || q.type === 'yes_no' || !q.options) return;
    const wrongOpts = q.options
      .map((opt, i) => ({ opt, i }))
      .filter(x => x.opt !== q.correctAnswer);
    const toHide = wrongOpts.sort(() => Math.random() - 0.5).slice(0, 2).map(x => x.i);
    setHiddenIndices(toHide);
    setHelp1Used(true);
  };

  const handleSolve = () => {
    const q = questions[currentQ];
    if (!q) return;
    handleAnswer(q.correctAnswer);
    setSolveUsed(true);
  };

  const handleSpecialSolve = () => {
    const q = questions[currentQ];
    if (!q) return;
    handleAnswer(q.correctAnswer);
    setSpecialUsed(true);
    setAutoSolveNext(true);
  };

  if (!levelData) return <div className="min-h-screen flex items-center justify-center text-white text-2xl">خطأ في تحميل المستوى</div>;

  if (gameOver) {
    const isWinner = score >= Math.ceil(QUESTIONS_PER_LEVEL / 2);
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900" />
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="bg-black/60 backdrop-blur-md rounded-3xl border border-purple-500/30 max-w-md w-full animate-bounce-in p-8 text-center">
            <img src={levelData.clubLogo} alt={levelData.clubName} className="w-24 h-24 mx-auto mb-4 object-contain" />
            {isWinner ? (
              <>
                <Trophy className="w-20 h-20 mx-auto text-yellow-400 mb-4 animate-pulse" />
                <div className="text-5xl mb-4">🎉🏆</div>
                <h2 className="text-2xl font-black text-white mb-2">أحسنت! أنت تعرف {levelData.clubName}!</h2>
                <p className="text-xl text-purple-300 mb-6">{score} / {QUESTIONS_PER_LEVEL}</p>
                {onLevelComplete && (
                  <button onClick={() => onLevelComplete?.({ score, maxScore: 10, timeRemaining: 0, totalTime: 0, lostAttempts: 0 })} className="btn-start flex items-center gap-2 mx-auto mb-4">
                    <Trophy className="w-6 h-6" /> المستوى التالي! 🚀
                  </button>
                )}
                <button onClick={onRestart} className="text-white/60 underline text-sm">أو العب من البداية</button>
              </>
            ) : (
              <>
                <XCircle className="w-20 h-20 mx-auto text-red-400 mb-4" />
                <div className="text-5xl mb-4">😞</div>
                <h2 className="text-2xl font-black text-white mb-2">حظ أوفر!</h2>
                <p className="text-xl text-red-300 mb-6">{score} / {QUESTIONS_PER_LEVEL}</p>
                <button onClick={onRestart} className="btn-start flex items-center gap-2 mx-auto">
                  <RotateCcw className="w-6 h-6" /> حاول مرة ثانية
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  const timerPercent = (timeLeft / TIME_PER_QUESTION) * 100;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StoneBackground levelNum={levelNum} />
      
      <GameControls onExit={onRestart} onPause={() => setIsPaused(true)} onResume={() => setIsPaused(false)} isPaused={isPaused} />

      <div className="relative z-10 min-h-screen flex flex-col p-4 pt-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col items-center gap-1">
          <div className="bg-yellow-500/20 text-yellow-400 font-bold px-4 py-2 rounded-xl text-lg">⚽ {score}</div>
          <div className="text-white/70 font-bold text-sm">{currentQ + 1} / {QUESTIONS_PER_LEVEL}</div>
          </div>
        </div>

        {/* Timer bar */}
        <div className="w-full h-2 bg-white/10 rounded-full mb-4 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-100 ${timerPercent > 30 ? 'bg-green-500' : 'bg-red-500'}`}
            style={{ width: `${timerPercent}%` }}
          />
        </div>

        {/* Club Info */}
        <div className="text-center mb-4">
          <img src={levelData.clubLogo} alt={levelData.clubName} className="w-20 h-20 mx-auto mb-2 object-contain drop-shadow-lg" />
          <h2 className="text-xl font-black text-white">ماذا تعرف عن {levelData.clubName}؟</h2>
        </div>

        {/* Question Card */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <StoneCard levelNum={levelNum} className="max-w-md w-full mb-6 text-center">
            <div className="text-4xl mb-3">{q.emoji || '❓'}</div>
            <p className="text-white text-xl font-bold leading-relaxed">{q.question}</p>
          </StoneCard>

          {/* Answer Buttons */}
          {q.type === 'yes_no' ? (
            <div className="flex gap-4 w-full max-w-md">
              <StoneButton
                onClick={() => handleAnswer(true)}
                disabled={answered !== null}
                state={answered !== null ? (q.correctAnswer === true ? 'correct' : selectedAnswer === true ? 'wrong' : 'idle') : 'idle'}
                levelNum={levelNum}
                className="flex-1 py-5 text-2xl text-center"
              >
                ✅ نعم
              </StoneButton>
              <StoneButton
                onClick={() => handleAnswer(false)}
                disabled={answered !== null}
                state={answered !== null ? (q.correctAnswer === false ? 'correct' : selectedAnswer === false ? 'wrong' : 'idle') : 'idle'}
                levelNum={levelNum}
                className="flex-1 py-5 text-2xl text-center"
              >
                ❌ لا
              </StoneButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 w-full max-w-md">
              {q.options?.map((opt, i) => {
                if (hiddenIndices.includes(i)) {
                  return <div key={i} className="rounded-xl border-2 border-white/5 bg-black/10 opacity-20 p-3 h-12" />;
                }
                const isCorrectOpt = opt === q.correctAnswer;
                const isSelected = selectedAnswer === opt;
                let btnState: 'idle' | 'correct' | 'wrong' = 'idle';
                if (answered !== null) {
                  if (isCorrectOpt) btnState = 'correct';
                  else if (isSelected) btnState = 'wrong';
                }
                return (
                  <StoneButton
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    disabled={answered !== null}
                    state={btnState}
                    levelNum={levelNum}
                    className={answered !== null && !isCorrectOpt && !isSelected ? 'opacity-40' : ''}
                  >
                    {opt}
                  </StoneButton>
                );
              })}
            </div>
          )}
        </div>

          <HelpBar
            questionType="choice"
            onHelp1={handleEliminateTwo}
            onSolve={handleSolve}
            onSpecialSolve={handleSpecialSolve}
            onSkipLevel={onLevelComplete || onRestart}
            help1Used={help1Used || q.type === 'yes_no'}
            solveUsed={solveUsed}
            specialUsed={specialUsed}
            disabled={answered !== null || gameOver}
          />

        {showFeedback && (
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-40">
            <div className={`text-8xl animate-bounce-in ${answered ? '' : 'grayscale'}`}>
              {answered ? '✅' : '❌'}
            </div>
          </div>
        )}
      </div>

      <StreakOverlay message={streakMsg} tier={streakTier} />
    </div>
  );
}
