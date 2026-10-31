import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, Crown, Flag, Flame, History, LoaderCircle, RotateCcw, Sparkles, Trophy, XCircle } from 'lucide-react';
import { pickWorldCupQuestions, worldCupEditions, worldCupQuestions, worldCup2026Teams, type WorldCupMode, type WorldCupQuestion } from '@/data/worldCup';
import { useI18n } from '@/i18n/I18nProvider';
import { StoneBackground } from './StoneBackground';
import { GameControls } from './GameControls';
import { useSound } from '@/hooks/useSound';
import { getAnswerFeedback } from '@/i18n/answerFeedback';
import { AnswerFeedback } from './AnswerFeedback';

const QUESTION_TIME = 20;
const QUESTION_COUNT = 20;

export function WorldCupChallengeScreen({ onBack }: { onBack: () => void }) {
  const { locale, direction, isArabic } = useI18n();
  const { playSound } = useSound();
  const [mode, setMode] = useState<WorldCupMode | null>(null);
  const [questions, setQuestions] = useState<WorldCupQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [questionFlagReady, setQuestionFlagReady] = useState(true);
  const [questionFlagFailed, setQuestionFlagFailed] = useState(false);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const question = mode ? questions[currentIndex] : undefined;

  const startRound = (nextMode: WorldCupMode) => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    const nextQuestions = pickWorldCupQuestions(QUESTION_COUNT, Math.random, nextMode);
    if (nextQuestions.length === 0) {
      setMode(null);
      setQuestions([]);
      setFinished(false);
      return;
    }
    setQuestions(nextQuestions);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(QUESTION_TIME);
    setSelected(null);
    setAnswered(false);
    setPaused(false);
    setFinished(false);
    setQuestionFlagReady(nextMode !== 'teams');
    setQuestionFlagFailed(false);
    setMode(nextMode);
  };

  const answer = useCallback((optionId: string | null) => {
    if (!question || answered || finished) return;
    setAnswered(true);
    setSelected(optionId);
    const correct = optionId === question.correctId;
    if (correct) {
      setScore((value) => value + 1);
      setStreak((value) => {
        const next = value + 1;
        setBestStreak((best) => Math.max(best, next));
        return next;
      });
    } else {
      setStreak(0);
    }
    playSound(correct ? 'correct' : 'wrong');
    advanceTimer.current = setTimeout(() => {
      if (currentIndex >= questions.length - 1) {
        setFinished(true);
        playSound('gameOver');
        return;
      }
      setCurrentIndex((value) => value + 1);
      setTimeLeft(QUESTION_TIME);
      setAnswered(false);
      setSelected(null);
      if (mode === 'teams') {
        setQuestionFlagReady(false);
        setQuestionFlagFailed(false);
      }
    }, 1250);
  }, [answered, currentIndex, finished, mode, playSound, question, questions.length]);

  useEffect(() => {
    if (mode !== 'teams' || !question?.flagImageUrl) return;
    let cancelled = false;
    const finishLoading = (failed = false) => {
      if (cancelled) return;
      if (failed) setQuestionFlagFailed(true);
      setQuestionFlagReady(true);
    };
    const flag = new Image();
    const timeout = window.setTimeout(() => finishLoading(true), 5000);
    flag.onload = () => {
      if (typeof flag.decode === 'function') flag.decode().then(() => finishLoading()).catch(() => finishLoading(flag.naturalWidth === 0));
      else finishLoading();
    };
    flag.onerror = () => finishLoading(true);
    flag.src = question.flagImageUrl;
    if (flag.complete) {
      if (flag.naturalWidth > 0 && typeof flag.decode === 'function') flag.decode().then(() => finishLoading()).catch(() => finishLoading(flag.naturalWidth === 0));
      else finishLoading(flag.naturalWidth === 0);
    }
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [mode, question?.id, question?.flagImageUrl]);

  useEffect(() => {
    if (!mode || !question || answered || paused || finished || !questionFlagReady) return;
    if (timeLeft <= 0) {
      answer(null);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [answer, answered, finished, mode, paused, question, questionFlagReady, timeLeft]);

  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  }, []);

  const restart = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setQuestions(pickWorldCupQuestions(QUESTION_COUNT, Math.random, mode ?? 'archive'));
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(QUESTION_TIME);
    setSelected(null);
    setAnswered(false);
    setPaused(false);
    setFinished(false);
    setQuestionFlagReady(mode !== 'teams');
    setQuestionFlagFailed(false);
  };

  const labelFor = (value: { labelAr: string; labelEn: string }) => locale === 'ar' ? value.labelAr : value.labelEn;
  const categoryLabel = question?.category === 'top-scorer'
    ? (isArabic ? 'هدّافو كل نسخة' : 'Edition top scorers')
    : question?.category === 'player-record'
      ? (isArabic ? 'أرقام الأساطير' : 'Legend records')
      : question?.category === 'flag'
    ? (isArabic ? 'تعرّف على المنتخب' : 'National teams')
    : question?.category === 'champion'
      ? (isArabic ? 'أبطال العالم' : 'World champions')
      : question?.category === 'host'
        ? (isArabic ? 'الدول المستضيفة' : 'Host nations')
        : question?.category === 'scoreline'
          ? (isArabic ? 'نتائج النهائيات' : 'Final results')
          : (isArabic ? 'الوصيف' : 'Runners-up');

  if (finished) {
    const greatRound = score >= 12;
    const finishedDescription = mode === 'players'
      ? (isArabic ? 'تحدّيت هدّافي النسخ وأرقام أساطير كأس العالم.' : 'You faced World Cup top scorers and the legends’ records.')
      : mode === 'teams'
        ? (isArabic ? 'اختبرت معرفتك بمنتخبات نسخة 2026 وأعلامها.' : 'You tested your knowledge of the 2026 teams and their flags.')
        : (isArabic ? 'واجهت أسئلة من تاريخ البطولة واللاعبين والمنتخبات عبر الأجيال.' : 'You faced questions about tournament history, players and national teams.');
    return (
      <main className="relative min-h-screen overflow-hidden text-white" dir={direction}>
        <StoneBackground levelNum={100} />
        <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
          <section className="w-full max-w-xl rounded-[2rem] border border-white/15 bg-slate-950/75 p-7 text-center shadow-2xl backdrop-blur-2xl md:p-10">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-amber-200/25 bg-amber-300/10 text-amber-100"><Trophy className="h-10 w-10" /></div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-100/65">{isArabic ? 'نهاية التحدي' : 'CHALLENGE COMPLETE'}</p>
            <h1 className="mt-2 text-3xl font-black md:text-4xl">{greatRound ? (isArabic ? 'موسوعة كروية!' : 'World Cup expert!') : (isArabic ? 'جولة قوية!' : 'Good round!')}</h1>
            <p className="mt-3 text-slate-200/70">{finishedDescription}</p>
            <div className="my-7 rounded-2xl border border-emerald-100/15 bg-emerald-300/[0.07] py-5"><p className="text-sm font-bold text-emerald-50/70">{isArabic ? 'نتيجتك' : 'Your score'}</p><p className="mt-1 text-5xl font-black text-emerald-100">{score}<span className="text-2xl text-white/50"> / {questions.length}</span></p></div>
            <p className="-mt-3 mb-6 inline-flex items-center gap-2 rounded-full border border-amber-100/15 bg-amber-200/[0.06] px-4 py-2 text-sm font-bold text-amber-50/80"><Flame className="h-4 w-4 text-amber-300" />{isArabic ? `أفضل سلسلة: ${bestStreak}` : `Best streak: ${bestStreak}`}</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button onClick={restart} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 to-cyan-200 px-5 font-black text-slate-950"><RotateCcw className="h-4 w-4" />{isArabic ? 'جولة جديدة' : 'Play another round'}</button>
              <button onClick={onBack} className="min-h-12 rounded-xl border border-white/15 bg-white/[0.06] px-5 font-bold text-white">{isArabic ? 'العودة للرئيسية' : 'Back to home'}</button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (!mode) {
    const archiveCount = worldCupQuestions.length;
    const playerCount = worldCupQuestions.filter((item) => item.category === 'top-scorer' || item.category === 'player-record').length;
    const modeCards: Array<{ id: WorldCupMode; icon: typeof Trophy; titleAr: string; titleEn: string; detailAr: string; detailEn: string; count: number; accent: string }> = [
      { id: 'archive', icon: History, titleAr: 'أرشيف المونديال', titleEn: 'World Cup archive', detailAr: 'أبطال ووصيفون ونتائج ومضيفون وأسئلة لاعبين من 23 نسخة.', detailEn: 'Champions, finalists, scores, hosts and player questions across 23 editions.', count: archiveCount, accent: 'from-amber-300/20 to-orange-400/5 border-amber-200/25 hover:border-amber-100/55' },
      { id: 'players', icon: Crown, titleAr: 'قاعة الأساطير', titleEn: 'Legends & goal machines', detailAr: 'هدّافو النسخ والأرقام التاريخية، مع اختيارات كلها من عالم كأس العالم.', detailEn: 'Edition top scorers and historic records, with every choice from World Cup history.', count: playerCount, accent: 'from-fuchsia-300/15 to-violet-400/5 border-fuchsia-200/20 hover:border-fuchsia-100/50' },
      { id: 'teams', icon: Flag, titleAr: 'رايات العالم', titleEn: 'Nations & flags', detailAr: 'تعرّف على منتخبات نسخة 2026 الـ48 من أعلامها.', detailEn: 'Identify all 48 teams from the 2026 tournament by their flags.', count: worldCup2026Teams.length, accent: 'from-cyan-300/15 to-emerald-400/5 border-cyan-100/20 hover:border-cyan-100/50' },
    ];

    return (
      <main className="relative min-h-screen overflow-hidden text-white" dir={direction}>
        <StoneBackground levelNum={92} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.13),transparent_52%)]" />
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 pb-10 md:px-8 md:py-8">
          <header className="flex items-center justify-between">
            <button onClick={onBack} className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/15 bg-slate-950/55 px-3 text-sm font-bold backdrop-blur-xl">
              {isArabic ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}{isArabic ? 'الرئيسية' : 'Home'}
            </button>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-slate-950/55 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-amber-100/80"><Trophy className="h-4 w-4" />FIFA WORLD CUP · 1930–2026</span>
          </header>

          <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-8">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-100/20 bg-gradient-to-br from-amber-200/15 to-cyan-200/10 shadow-[0_0_50px_rgba(34,211,238,0.1)]"><Sparkles className="h-8 w-8 text-amber-100" /></div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-100/65">{isArabic ? 'الملف الذهبي · تحدٍّ للنخبة' : 'THE GOLDEN FILE · AN ELITE CHALLENGE'}</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">{isArabic ? 'أرشيف المونديال' : 'World Cup Vault'}</h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-200/70 md:text-base">{isArabic ? `من أوروغواي 1930 إلى الولايات المتحدة وكندا والمكسيك 2026. اختر ساحتك من ${archiveCount} سؤالاً وابدأ مطاردة الرقم القياسي.` : `From Uruguay 1930 to Canada, Mexico and the USA 2026. Choose your arena from ${archiveCount} questions and chase the record.`}</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs font-bold text-white/70">
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2">🏆 {worldCupEditions.length} {isArabic ? 'نسخة' : 'editions'}</span>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2">👑 {playerCount} {isArabic ? 'سؤال لاعب وسجل' : 'player & record questions'}</span>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2">🌍 {worldCup2026Teams.length} {isArabic ? 'منتخباً في 2026' : '2026 teams'}</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {modeCards.map(({ id, icon: Icon, titleAr, titleEn, detailAr, detailEn, count, accent }) => (
                <button type="button" key={id} onClick={() => startRound(id)} aria-label={`${count} ${isArabic ? 'سؤال، ابدأ' : 'questions, start challenge'} · ${isArabic ? titleAr : titleEn}`} className={`group relative flex min-h-[238px] flex-col overflow-hidden rounded-3xl border bg-gradient-to-br ${accent} p-5 text-start shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_70px_rgba(15,23,42,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100`}>
                  <div className="pointer-events-none absolute -end-12 -top-12 h-36 w-36 rounded-full bg-white/[0.045] blur-2xl transition group-hover:bg-white/[0.09]" />
                  <div className="relative flex w-full items-start justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-slate-950/45"><Icon className="h-6 w-6 text-amber-100" /></span>
                    <span className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1.5 text-xs font-black text-white/80">{count} {isArabic ? 'سؤال' : 'questions'}</span>
                  </div>
                  <div className="relative mt-6">
                    <h2 className="text-xl font-black md:text-2xl">{isArabic ? titleAr : titleEn}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-200/70">{isArabic ? detailAr : detailEn}</p>
                  </div>
                  <span className="relative mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-cyan-100">{isArabic ? 'ادخل التحدي' : 'Enter challenge'}<span className="transition group-hover:translate-x-1" aria-hidden="true">{isArabic ? '←' : '→'}</span></span>
                </button>
              ))}
            </div>
            <p className="mt-5 text-center text-xs font-semibold text-white/40">{isArabic ? '٢٠ سؤالاً · ٢٠ ثانية لكل سؤال · لا رحمة في ركلات الترجيح' : '20 questions · 20 seconds each · no mercy in the shootout'}</p>
          </section>
        </div>
      </main>
    );
  }

  if (!question) {
    return (
      <main className="relative min-h-screen overflow-hidden text-white" dir={direction}>
        <StoneBackground levelNum={92} />
        <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
          <section role="alert" className="w-full max-w-lg rounded-3xl border border-cyan-100/20 bg-slate-950/80 p-7 text-center shadow-2xl backdrop-blur-xl">
            <Flag className="mx-auto mb-4 h-10 w-10 text-cyan-100" />
            <h1 className="text-2xl font-black">{isArabic ? 'الملعب جاهز… أعد اختيار التحدّي' : 'The arena is ready… choose your challenge again'}</h1>
            <p className="mt-3 text-sm leading-6 text-slate-200/75">{isArabic ? 'لم تُحمّل الأسئلة هذه المرة. ارجع إلى أوضاع كأس العالم وابدأ جولة جديدة.' : 'The questions did not load this time. Return to the World Cup modes and start a fresh round.'}</p>
            <button type="button" onClick={() => { setMode(null); setQuestions([]); setFinished(false); }} className="mt-6 rounded-xl bg-gradient-to-r from-emerald-300 to-cyan-200 px-5 py-3 font-black text-slate-950">{isArabic ? 'العودة إلى أوضاع كأس العالم' : 'Back to World Cup modes'}</button>
          </section>
        </div>
      </main>
    );
  }

  const answerIsCorrect = selected === question.correctId;
  const feedback = answered
    ? getAnswerFeedback(
        locale,
        answerIsCorrect,
        labelFor({ labelAr: question.answerAr, labelEn: question.answerEn }),
        'worldCup',
      )
    : null;

  return (
    <main className="relative min-h-screen overflow-hidden text-white" dir={direction}>
      <StoneBackground levelNum={92} />
      <GameControls onExit={onBack} onPause={() => setPaused(true)} onResume={() => setPaused(false)} isPaused={paused} />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-5 pb-10 md:px-8 md:py-8">
        <header className="mb-5 flex items-center justify-between gap-3">
          <button onClick={onBack} className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/15 bg-slate-950/55 px-3 text-sm font-bold backdrop-blur-xl">
            {isArabic ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}{isArabic ? 'خروج' : 'Exit'}
          </button>
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-amber-100/20 bg-amber-200/10 px-3 py-2 text-center"><p className="text-[10px] font-bold uppercase tracking-wider text-amber-100/65">{isArabic ? 'النتيجة' : 'SCORE'}</p><p className="font-black text-amber-50">{score}</p></div>
            <div className="rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2 text-center"><p className="text-[10px] font-bold uppercase tracking-wider text-white/50">{isArabic ? 'السؤال' : 'QUESTION'}</p><p className="font-black">{currentIndex + 1} / {questions.length}</p></div>
            <div className="rounded-xl border border-amber-100/15 bg-amber-200/[0.06] px-3 py-2 text-center"><p className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-100/60"><Flame className="h-3 w-3" />{isArabic ? 'سلسلة' : 'STREAK'}</p><p className="font-black text-amber-50">{streak}</p></div>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100/20 bg-slate-950/55 px-3 py-2 text-xs font-black text-cyan-50 backdrop-blur-lg"><Trophy className="h-4 w-4 text-amber-100" />{categoryLabel}</span>
            <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-black tabular-nums ${questionFlagReady && timeLeft <= 5 ? 'border-rose-200/30 bg-rose-400/15 text-rose-100' : 'border-white/10 bg-slate-950/45 text-slate-100'}`}><Clock3 className="h-4 w-4" />{questionFlagReady ? `${timeLeft}s` : '…'}</span>
          </div>
          <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-white/10"><div className={`h-full rounded-full transition-all duration-500 ${questionFlagReady && timeLeft <= 5 ? 'bg-rose-400' : 'bg-gradient-to-r from-cyan-300 to-emerald-200'}`} style={{ width: `${questionFlagReady ? (timeLeft / QUESTION_TIME) * 100 : 100}%` }} /></div>

          <section className="rounded-[1.75rem] border border-white/15 bg-slate-950/70 p-5 shadow-2xl backdrop-blur-2xl md:p-8">
            <div className="mb-6 text-center">
              {question.category === 'flag' && question.flagImageUrl ? (
                <div className="mb-4 flex min-h-24 items-center justify-center" role="img" aria-label={isArabic ? 'علم المنتخب' : 'National team flag'}>
                  {questionFlagReady ? (
                    questionFlagFailed ? <span className="text-7xl drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]" aria-hidden="true">{question.emblem ?? <Flag className="h-16 w-16" />}</span>
                      : <img src={question.flagImageUrl} alt={isArabic ? 'علم المنتخب' : 'National team flag'} className="h-20 w-auto max-w-[min(80vw,20rem)] rounded-xl border border-white/20 object-contain shadow-[0_8px_24px_rgba(0,0,0,0.45)]" />
                  ) : <div className="flex flex-col items-center gap-2 text-xs font-bold text-white/60"><LoaderCircle className="h-8 w-8 animate-spin text-cyan-100" /><span>{isArabic ? 'جارٍ تحميل العلم…' : 'Loading flag…'}</span></div>}
                </div>
              ) : question.emblem && <div className="mb-4 text-7xl drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]" aria-label={isArabic ? 'رمز التحدي' : 'Challenge emblem'}>{question.emblem}</div>}
              <p className="text-xl font-black leading-relaxed md:text-3xl">{locale === 'ar' ? question.promptAr : question.promptEn}</p>
              {question.year && <p className="mt-2 text-sm font-bold text-cyan-100/55">FIFA World Cup · {question.year}</p>}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {question.options.map((option, index) => {
                const isCorrectOption = option.id === question.correctId;
                const wasSelected = selected === option.id;
                const showCorrect = answered && isCorrectOption;
                const showWrong = answered && wasSelected && !isCorrectOption;
                return <button key={`${question.id}-${option.id}`} disabled={answered || paused} onClick={() => answer(option.id)} className={`flex min-h-[60px] items-center gap-3 rounded-xl border p-3 text-start transition ${showCorrect ? 'border-emerald-200/70 bg-emerald-400/20' : showWrong ? 'border-rose-200/60 bg-rose-400/20' : 'border-white/10 bg-white/[0.045] hover:border-cyan-100/35 hover:bg-cyan-100/[0.07] disabled:hover:border-white/10 disabled:hover:bg-white/[0.045]'}`}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-xs font-black text-slate-300">{String.fromCharCode(65 + index)}</span>
                  {option.flag && mode !== 'teams' && <span className="text-2xl leading-none">{option.flag}</span>}
                  <span className="flex-1 font-bold">{labelFor(option)}</span>
                  {showCorrect && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-100" />}
                  {showWrong && <XCircle className="h-5 w-5 shrink-0 text-rose-100" />}
                </button>;
              })}
            </div>

            {feedback && <div className="mt-4 space-y-3">
              <AnswerFeedback isCorrect={answerIsCorrect} title={feedback.title} detail={feedback.detail} />
              <p className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm font-semibold leading-6 text-white/75">{locale === 'ar' ? question.explanationAr : question.explanationEn}</p>
            </div>}
          </section>
        </div>
      </div>
    </main>
  );
}
