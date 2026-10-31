import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Locale = 'ar' | 'en';

const messages = {
  ar: {
    brand: 'عمالقة الكرة',
    eyebrow: 'اختبر معرفتك الكروية',
    heroTitle: 'هل أنت جاهز للتحدي؟',
    heroDescription: 'مئة مرحلة من الأسئلة الذكية عن اللاعبين والأندية والدوريات والتكتيك.',
    stageCount: '100 مرحلة',
    leagueCount: 'دوريات متعددة',
    leagueOverview: 'الدوريات المتاحة',
    languageLabel: 'اللغة',
    startGame: 'ابدأ التحدي',
    viewLevels: 'استكشف المراحل',
    settings: 'الإعدادات',
    home: 'الرئيسية',
    levelMap: 'خريطة المراحل',
    collectedStars: 'النجوم التي جمعتها',
    lockedWith: 'تحتاج إلى 3 نجوم',
    backHome: 'العودة للرئيسية',
    developmentMode: 'وضع التطوير: جميع المراحل مفتوحة',
    level: 'المرحلة',
    howToPlay: 'طريقة اللعب',
    tips: 'نصائح',
    timeLimit: 'الوقت',
    close: 'إغلاق',
    start: 'ابدأ',
    understood: 'فهمت',
    arabic: 'العربية',
    english: 'English',
    sameLeagueRule: '⚡ خيارات من ساحة واحدة',
    leaguePool: 'خيارات الموسم',
    playerPlayedFor: 'أي نادٍ ارتدى هذا اللاعب شعاره؟',
    correct: 'إجابة صحيحة!',
    nextStage: 'المرحلة التالية',
    restart: 'العب مرة أخرى',
    score: 'نتيجتك',
    expert: 'خبير كروي!',
    goodRun: 'أداء جيد!',
    keepPracticing: 'واصل التدريب',
    correctClub: 'النادي الصحيح',
    settingsTitle: 'الإعدادات',
    generalSound: 'الصوت العام',
    allSounds: 'تشغيل أو إيقاف جميع الأصوات',
    backgroundMusic: 'الموسيقى الخلفية',
    volumeControl: 'تحكم في مستوى الصوت 🎵',
    mainMenu: 'الشاشة الرئيسية',
    progressMap: 'خريطة التقدم',
    soundEffects: 'المؤثرات الصوتية',
    buttonAnswerSounds: 'مؤثرات أصلية للإجابات والتحديات ⚡',
    brightness: 'السطوع',
    chooseLanguage: 'اختر لغة اللعبة',
    gameGuide: 'شرح اللعبة',
    howToPlayGame: 'كيف تلعب عمالقة الكرة؟',
    resetProgress: 'إعادة تعيين التقدم',
    clearProgress: 'مسح النجوم وإعادة قفل المراحل',
    resetSettings: 'إعادة ضبط الإعدادات',
    restoreDefaults: 'استعادة الإعدادات الافتراضية',
    exitGame: 'الخروج من اللعبة',
    backToHome: 'العودة إلى الشاشة الرئيسية',
    resetSettingsQuestion: 'هل تريد إعادة الإعدادات إلى وضعها الافتراضي؟',
    yesReset: 'نعم، أعد الضبط',
    cancel: 'إلغاء',
    resetProgressQuestion: 'سيتم مسح النجوم وإعادة قفل المراحل. هل تريد المتابعة؟',
    yesClearProgress: 'نعم، امسح التقدم',
    exitQuestion: 'هل تريد العودة إلى الشاشة الرئيسية؟',
    yesExit: 'نعم، اخرج',
    stay: 'البقاء في اللعبة',
    guideOne: 'عمالقة الكرة تضم 100 مرحلة من أسئلة كرة القدم.',
    guideTwo: 'تتنوّع الأسئلة بين اللاعبين والأندية والتشكيلات والتكتيك.',
    guideThree: 'اجمع النجوم لإحراز التقدم وفتح مراحل جديدة.',
    guideFour: 'استخدم المساعدات بحكمة عندما تحتاجها.',
    guideFive: 'أكمل كل المراحل للوصول إلى الاحتفال النهائي.',
    guideSix: 'كوّن فريقك في المرحلة 99، ثم احتفل في المرحلة 100.',
    pause: 'إيقاف مؤقت',
    resume: 'استئناف',
    exit: 'خروج',
    exitGameQuestion: 'هل تريد الخروج من اللعبة؟',
    progressLost: 'سيتم فقدان تقدمك في هذه المرحلة.',
    yes: 'نعم',
    no: 'لا',
    gamePaused: 'اللعبة متوقفة',
    pressToResume: 'اضغط للاستئناف',
    eliminateTwo: 'حذف خيارين',
    revealLetters: 'إظهار حرفين',
    solveQuestion: 'حل',
    specialAssist: 'مساعدة خاصة',
    confirmEliminate: 'هل تريد حذف خيارين مقابل',
    confirmLetters: 'هل تريد إظهار حرفين مقابل',
    confirmSolve: 'هل تريد حل السؤال مقابل',
    confirmSpecial: 'هل تريد استخدام المساعدة الخاصة مقابل',
    confirmSkip: 'هل تريد تخطي المرحلة كاملة مقابل',
    skipStage: 'تخطي المرحلة كاملة',
    balance: 'رصيدك',
    insufficientStars: 'ليس لديك نجوم كافية',
    watchAd: 'شاهد إعلاناً',
    loadingAd: 'جارٍ تحميل الإعلان...',
    demoAd: 'إعلان تجريبي',
    adPlaceholder: 'سيتم استبداله بإعلان حقيقي لاحقاً',
    secondsLeft: 'ثوانٍ متبقية...',
    earnStars: 'ستحصل على',
    congratulations: '🎉 مبروك!',
    receivedStars: 'حصلت على',
    claimReward: 'استلام المكافأة',
    adError: 'حدث خطأ، حاول مرة أخرى',
    betterLuck: '😂 حظ أوفر! 😂',
    nextStageTwo: 'انتقل إلى المرحلة التالية! 🚀',
    playFromStart: 'أو العب من البداية',
    playAgain: 'العب مرة أخرى',
    crestQuestion: 'أين شعار نادي',
    earnedStars: 'كسبت',
    star: 'نجمة',
    stars: 'نجوم',
    tapBall: 'افتح بوابة الطاقة',
  },
  en: {
    brand: 'Kora Titans',
    eyebrow: 'PUT YOUR FOOTBALL KNOWLEDGE TO THE TEST',
    heroTitle: 'Ready for the challenge?',
    heroDescription: '100 stages of sharp questions about players, clubs, leagues and tactics.',
    stageCount: '100 stages',
    leagueCount: 'Multiple leagues',
    leagueOverview: 'Available leagues',
    languageLabel: 'Language',
    startGame: 'Start challenge',
    viewLevels: 'Explore stages',
    settings: 'Settings',
    home: 'Home',
    levelMap: 'Stage map',
    collectedStars: 'Stars collected',
    lockedWith: 'Unlock with 3 stars',
    backHome: 'Back to home',
    developmentMode: 'Development mode: all stages are open',
    level: 'Stage',
    howToPlay: 'How to play',
    tips: 'Tips',
    timeLimit: 'Time limit',
    close: 'Close',
    start: 'Start',
    understood: 'Got it',
    arabic: 'العربية',
    english: 'English',
    sameLeagueRule: '⚡ Same-arena choices',
    leaguePool: 'Season pool',
    playerPlayedFor: 'Which club did this player represent?',
    correct: 'Correct!',
    nextStage: 'Next stage',
    restart: 'Play again',
    score: 'Your score',
    expert: 'Football expert!',
    goodRun: 'Good run!',
    keepPracticing: 'Keep practicing',
    correctClub: 'Correct club',
    settingsTitle: 'Settings',
    generalSound: 'Master sound',
    allSounds: 'Turn all sounds on or off',
    backgroundMusic: 'Background music',
    volumeControl: 'Adjust music volume 🎵',
    mainMenu: 'Main menu',
    progressMap: 'Stage map',
    soundEffects: 'Sound effects',
    buttonAnswerSounds: 'Original answer and challenge cues ⚡',
    brightness: 'Brightness',
    chooseLanguage: 'Choose the game language',
    gameGuide: 'Game guide',
    howToPlayGame: 'How to play Kora Titans',
    resetProgress: 'Reset progress',
    clearProgress: 'Clear stars and lock stages again',
    resetSettings: 'Reset settings',
    restoreDefaults: 'Restore default settings',
    exitGame: 'Exit game',
    backToHome: 'Return to the home screen',
    resetSettingsQuestion: 'Would you like to restore the default settings?',
    yesReset: 'Yes, reset',
    cancel: 'Cancel',
    resetProgressQuestion: 'Stars will be cleared and stages locked again. Continue?',
    yesClearProgress: 'Yes, clear progress',
    exitQuestion: 'Would you like to return to the home screen?',
    yesExit: 'Yes, exit',
    stay: 'Stay in the game',
    guideOne: 'Kora Titans has 100 football quiz stages.',
    guideTwo: 'Questions cover players, clubs, formations and tactics.',
    guideThree: 'Earn stars to track progress and unlock new stages.',
    guideFour: 'Use your assists wisely when you need them.',
    guideFive: 'Complete every stage to reach the final celebration.',
    guideSix: 'Build your squad in stage 99, then celebrate in stage 100.',
    pause: 'Pause',
    resume: 'Resume',
    exit: 'Exit',
    exitGameQuestion: 'Would you like to leave the game?',
    progressLost: 'Your progress in this stage will be lost.',
    yes: 'Yes',
    no: 'No',
    gamePaused: 'Game paused',
    pressToResume: 'Press resume to continue',
    eliminateTwo: 'Remove two',
    revealLetters: 'Reveal letters',
    solveQuestion: 'Solve',
    specialAssist: 'Special assist',
    confirmEliminate: 'Remove two choices for',
    confirmLetters: 'Reveal two letters for',
    confirmSolve: 'Solve this question for',
    confirmSpecial: 'Use the special assist for',
    confirmSkip: 'Skip this entire stage for',
    skipStage: 'Skip entire stage',
    balance: 'Balance',
    insufficientStars: 'Not enough stars',
    watchAd: 'Watch an ad',
    loadingAd: 'Loading ad…',
    demoAd: 'Demo advertisement',
    adPlaceholder: 'This placeholder can be replaced with a real ad later.',
    secondsLeft: 'seconds left…',
    earnStars: 'You will earn',
    congratulations: '🎉 Congratulations!',
    receivedStars: 'You earned',
    claimReward: 'Claim reward',
    adError: 'Something went wrong. Try again.',
    betterLuck: '😂 Better luck next time! 😂',
    nextStageTwo: 'Continue to the next stage! 🚀',
    playFromStart: 'Or start again',
    playAgain: 'Play again',
    crestQuestion: 'Find the crest for',
    earnedStars: 'You earned',
    star: 'star',
    stars: 'stars',
    tapBall: 'Open the energy gate',
  },
} as const;

export type MessageKey = keyof typeof messages.en;

interface I18nContextValue {
  locale: Locale;
  isArabic: boolean;
  direction: 'rtl' | 'ltr';
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: MessageKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLocale(): Locale {
  const saved = localStorage.getItem('challenge-arena-locale');
  return saved === 'ar' ? 'ar' : 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem('challenge-arena-locale', next);
    setLocaleState(next);
  }, []);

  useEffect(() => {
    const direction = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
    document.body.dataset.locale = locale;
    document.title = locale === 'ar' ? 'عمالقة الكرة | تحدي كرة القدم' : 'Kora Titans | Football Quiz';
    const description = locale === 'ar'
      ? 'تحديات كرة قدم باللغتين العربية والإنجليزية عن اللاعبين والأندية والدوريات والتكتيك.'
      : 'A bilingual football challenge across players, clubs, leagues and tactics.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    isArabic: locale === 'ar',
    direction: locale === 'ar' ? 'rtl' : 'ltr',
    setLocale,
    toggleLocale: () => setLocale(locale === 'ar' ? 'en' : 'ar'),
    t: (key) => messages[locale][key],
  }), [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside I18nProvider');
  return context;
}
