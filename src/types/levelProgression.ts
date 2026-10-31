// Level Progression Types and Configuration

export interface StarRequirements {
  // Time-based requirements (seconds remaining)
  timeForOneStar: number;
  timeForTwoStars: number;
  timeForThreeStars: number;
  
  // Score-based requirements (percentage of max possible)
  scoreForOneStar: number;
  scoreForTwoStars: number;
  scoreForThreeStars: number;
  
  // No-loss bonus (adds a star if player didn't lose any attempts)
  noLossBonus: boolean;
}

export interface LevelConfig {
  id: number;
  name: string;
  description: string;
  totalQuestions: number;
  timePerQuestion: number;
  maxAttempts: number;
  requirements: StarRequirements;
}

export interface LevelProgress {
  levelId: number;
  isUnlocked: boolean;
  starsEarned: number;
  bestScore: number;
  bestTime: number;
  completedWithNoLoss: boolean;
}

export interface GameProgress {
  levels: LevelProgress[];
  totalStars: number;
}

export interface LevelResult {
  score: number;
  maxScore: number;
  timeRemaining: number;
  totalTime: number;
  lostAttempts: number;
}

// ============================================
// CONFIGURATION - Easy to modify
// ============================================

// Toggle this to enable/disable level locking
// Set to false for testing, true for production
export const LEVELS_LOCKED = true;

// Stars required to unlock next level
export const STARS_TO_UNLOCK = 3; // Keep 3 — easy unlock with 5-star system

// Level configurations
export const LEVEL_CONFIGS: LevelConfig[] = [
  {
    id: 1,
    name: "المستوى الأول",
    description: "تعرف على الشعارات",
    totalQuestions: 15,
    timePerQuestion: 5,
    maxAttempts: 3,
    requirements: {
      timeForOneStar: 0,
      timeForTwoStars: 20,
      timeForThreeStars: 35,
      scoreForOneStar: 50,
      scoreForTwoStars: 70,
      scoreForThreeStars: 90,
      noLossBonus: true,
    },
  },
  {
    id: 2,
    name: "المستوى الثاني",
    description: "الشعارات الوميضية",
    totalQuestions: 15,
    timePerQuestion: 5,
    maxAttempts: 3,
    requirements: {
      timeForOneStar: 0,
      timeForTwoStars: 20,
      timeForThreeStars: 35,
      scoreForOneStar: 50,
      scoreForTwoStars: 70,
      scoreForThreeStars: 90,
      noLossBonus: true,
    },
  },
  {
    id: 3,
    name: "المستوى الثالث",
    description: "اكتشف الأصلي",
    totalQuestions: 10,
    timePerQuestion: 5,
    maxAttempts: 3,
    requirements: {
      timeForOneStar: 0,
      timeForTwoStars: 20,
      timeForThreeStars: 35,
      scoreForOneStar: 50,
      scoreForTwoStars: 70,
      scoreForThreeStars: 90,
      noLossBonus: true,
    },
  },
  {
    id: 4,
    name: "المستوى الرابع",
    description: "تخمين النادي",
    totalQuestions: 10,
    timePerQuestion: 10,
    maxAttempts: 3,
    requirements: {
      timeForOneStar: 0,
      timeForTwoStars: 40,
      timeForThreeStars: 70,
      scoreForOneStar: 50,
      scoreForTwoStars: 70,
      scoreForThreeStars: 90,
      noLossBonus: true,
    },
  },
  {
    id: 5,
    name: "المستوى الخامس",
    description: "نهائيات دوري الأبطال",
    totalQuestions: 10,
    timePerQuestion: 20,
    maxAttempts: 3,
    requirements: {
      timeForOneStar: 0,
      timeForTwoStars: 60,
      timeForThreeStars: 120,
      scoreForOneStar: 50,
      scoreForTwoStars: 70,
      scoreForThreeStars: 90,
      noLossBonus: true,
    },
  },
  {
    id: 6,
    name: "المستوى السادس",
    description: "تخمين قصات شعر اللاعبين",
    totalQuestions: 10,
    timePerQuestion: 5,
    maxAttempts: 1,
    requirements: {
      timeForOneStar: 0,
      timeForTwoStars: 30,
      timeForThreeStars: 40,
      scoreForOneStar: 50,
      scoreForTwoStars: 70,
      scoreForThreeStars: 90,
      noLossBonus: true,
    },
  },
  {
    id: 7,
    name: "المستوى السابع",
    description: "تخمين تشكيلة الفريق",
    totalQuestions: 10,
    timePerQuestion: 15,
    maxAttempts: 1,
    requirements: {
      timeForOneStar: 0,
      timeForTwoStars: 60,
      timeForThreeStars: 100,
      scoreForOneStar: 50,
      scoreForTwoStars: 70,
      scoreForThreeStars: 90,
      noLossBonus: true,
    },
  },
  {
    id: 8,
    name: "المستوى الثامن",
    description: "اعرف من هو اللاعب",
    totalQuestions: 10,
    timePerQuestion: 10,
    maxAttempts: 1,
    requirements: {
      timeForOneStar: 0,
      timeForTwoStars: 40,
      timeForThreeStars: 70,
      scoreForOneStar: 40,
      scoreForTwoStars: 60,
      scoreForThreeStars: 80,
      noLossBonus: true,
    },
  },
  {
    id: 9,
    name: "المستوى التاسع",
    description: "من لم يلعب للنادي؟",
    totalQuestions: 10,
    timePerQuestion: 10,
    maxAttempts: 1,
    requirements: {
      timeForOneStar: 0,
      timeForTwoStars: 40,
      timeForThreeStars: 70,
      scoreForOneStar: 40,
      scoreForTwoStars: 60,
      scoreForThreeStars: 80,
      noLossBonus: true,
    },
  },
  {
    id: 10,
    name: "المستوى العاشر",
    description: "من لعب للنادي؟",
    totalQuestions: 10,
    timePerQuestion: 10,
    maxAttempts: 1,
    requirements: {
      timeForOneStar: 0,
      timeForTwoStars: 40,
      timeForThreeStars: 70,
      scoreForOneStar: 40,
      scoreForTwoStars: 60,
      scoreForThreeStars: 80,
      noLossBonus: true,
    },
  },
  {
    id: 11,
    name: "المستوى الحادي عشر",
    description: "مدرب أي نادي؟",
    totalQuestions: 10,
    timePerQuestion: 5,
    maxAttempts: 1,
    requirements: {
      timeForOneStar: 0,
      timeForTwoStars: 40,
      timeForThreeStars: 70,
      scoreForOneStar: 40,
      scoreForTwoStars: 60,
      scoreForThreeStars: 80,
      noLossBonus: true,
    },
  },
  {
    id: 12,
    name: "المستوى الثاني عشر",
    description: "خمّن اللاعب من مسيرته",
    totalQuestions: 10,
    timePerQuestion: 10,
    maxAttempts: 1,
    requirements: {
      timeForOneStar: 0,
      timeForTwoStars: 40,
      timeForThreeStars: 70,
      scoreForOneStar: 40,
      scoreForTwoStars: 60,
      scoreForThreeStars: 80,
      noLossBonus: true,
    },
  },
  {
    id: 13,
    name: "المستوى الثالث عشر",
    description: "رتّب الحروف واكتب الاسم",
    totalQuestions: 10, timePerQuestion: 15, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 50, timeForThreeStars: 100, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 14,
    name: "المستوى الرابع عشر",
    description: "رتّب حروف اسم المدرب",
    totalQuestions: 10, timePerQuestion: 15, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 50, timeForThreeStars: 100, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 15,
    name: "المستوى الخامس عشر",
    description: "اكتب اسم الملعب",
    totalQuestions: 10, timePerQuestion: 10, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 50, timeForThreeStars: 100, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 16,
    name: "المستوى السادس عشر",
    description: "موهبة الحي",
    totalQuestions: 5, timePerQuestion: 15, maxAttempts: 5,
    requirements: { timeForOneStar: 0, timeForTwoStars: 30, timeForThreeStars: 50, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 17,
    name: "المستوى السابع عشر",
    description: "كلاسيكو الذهاب",
    totalQuestions: 9, timePerQuestion: 12, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 40, timeForThreeStars: 70, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 18,
    name: "المستوى الثامن عشر",
    description: "ملعب أي نادي؟",
    totalQuestions: 10, timePerQuestion: 10, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 40, timeForThreeStars: 70, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 19,
    name: "المستوى التاسع عشر",
    description: "اعرف المدرب من إنجازاته",
    totalQuestions: 10, timePerQuestion: 12, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 40, timeForThreeStars: 70, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 20,
    name: "المستوى العشرون",
    description: "اكتب اسم اللاعب",
    totalQuestions: 10, timePerQuestion: 10, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 40, timeForThreeStars: 70, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 21,
    name: "المستوى الحادي والعشرون",
    description: "اللاعب الناقص",
    totalQuestions: 10, timePerQuestion: 15, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 50, timeForThreeStars: 100, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 22,
    name: "المستوى الثاني والعشرون",
    description: "الشعارات القديمة",
    totalQuestions: 10, timePerQuestion: 10, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 40, timeForThreeStars: 70, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 23,
    name: "المستوى الثالث والعشرون",
    description: "اعرف اللاعب وهو صغير",
    totalQuestions: 10, timePerQuestion: 15, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 50, timeForThreeStars: 100, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 24,
    name: "المستوى الرابع والعشرون",
    description: "اعرف المنتخب",
    totalQuestions: 10, timePerQuestion: 12, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 40, timeForThreeStars: 70, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 25,
    name: "المستوى الخامس والعشرون",
    description: "خمن المنتخب من التشكيلة",
    totalQuestions: 10, timePerQuestion: 10, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 40, timeForThreeStars: 70, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 26,
    name: "المستوى السادس والعشرون",
    description: "من صاحب الرقم؟",
    totalQuestions: 10, timePerQuestion: 10, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 40, timeForThreeStars: 70, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 27,
    name: "المستوى السابع والعشرون",
    description: "النادي من اللاعبين القدامى",
    totalQuestions: 10, timePerQuestion: 10, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 40, timeForThreeStars: 70, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 28,
    name: "المستوى الثامن والعشرون",
    description: "النادي من سنة التأسيس",
    totalQuestions: 10, timePerQuestion: 10, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 40, timeForThreeStars: 70, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 29,
    name: "المستوى التاسع والعشرون",
    description: "اللاعب لعب في أي نادي؟",
    totalQuestions: 15, timePerQuestion: 10, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 40, timeForThreeStars: 70, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 30, name: "المستوى الثلاثون", description: "النادي المشترك بين لاعبين",
    totalQuestions: 10, timePerQuestion: 10, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 40, timeForThreeStars: 70, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 31, name: "المستوى الحادي والثلاثون", description: "هل لعب هنا أم لا؟",
    totalQuestions: 10, timePerQuestion: 8, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 30, timeForThreeStars: 60, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 32, name: "المستوى الثاني والثلاثون", description: "خمّن نادي الانتقال",
    totalQuestions: 10, timePerQuestion: 10, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 40, timeForThreeStars: 70, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 33, name: "المستوى الثالث والثلاثون", description: "النادي الغامض",
    totalQuestions: 10, timePerQuestion: 12, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 40, timeForThreeStars: 80, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 34, name: "المستوى الرابع والثلاثون", description: "النادي من المدرب",
    totalQuestions: 10, timePerQuestion: 10, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 40, timeForThreeStars: 70, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 35, name: "المستوى الخامس والثلاثون", description: "النادي من لون القميص",
    totalQuestions: 10, timePerQuestion: 8, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 30, timeForThreeStars: 60, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 36, name: "المستوى السادس والثلاثون", description: "النادي من المدينة",
    totalQuestions: 10, timePerQuestion: 8, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 30, timeForThreeStars: 60, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 37, name: "المستوى السابع والثلاثون", description: "تحدي النجوم",
    totalQuestions: 10, timePerQuestion: 6, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 20, timeForThreeStars: 40, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 38, name: "المستوى الثامن والثلاثون", description: "اللاعب الغامض",
    totalQuestions: 10, timePerQuestion: 15, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 50, timeForThreeStars: 100, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 39, name: "المستوى التاسع والثلاثون", description: "من زميله؟",
    totalQuestions: 10, timePerQuestion: 10, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 40, timeForThreeStars: 70, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 40, name: "المستوى الأربعون", description: "لاعب مر على أندية كثيرة",
    totalQuestions: 10, timePerQuestion: 10, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 40, timeForThreeStars: 70, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 41, name: "المستوى الحادي والأربعون", description: "سؤال الوقت",
    totalQuestions: 10, timePerQuestion: 5, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 15, timeForThreeStars: 35, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 42, name: "المستوى الثاني والأربعون", description: "من اللاعب؟ (3 تلميحات)",
    totalQuestions: 10, timePerQuestion: 7, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 20, timeForThreeStars: 45, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 43, name: "المستوى الثالث والأربعون", description: "بداية الكلاسيكو",
    totalQuestions: 10, timePerQuestion: 5, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 15, timeForThreeStars: 35, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 44, name: "المستوى الرابع والأربعون", description: "ضغط الجماهير",
    totalQuestions: 10, timePerQuestion: 7, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 20, timeForThreeStars: 45, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  {
    id: 45, name: "المستوى الخامس والأربعون", description: "الكلاسيكو النهائي",
    totalQuestions: 10, timePerQuestion: 8, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 25, timeForThreeStars: 55, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: true },
  },
  // مراحل "من هو؟" (46-65)
  ...Array.from({ length: 20 }, (_, i) => {
    const id = 46 + i;
    const desc = id <= 55 ? 'من هو اللاعب؟' : id <= 60 ? 'من هو المدرب؟' : 'ما هو النادي؟';
    return {
      id, name: `المستوى ${id}`, description: desc,
      totalQuestions: 1, timePerQuestion: 0, maxAttempts: 1,
      requirements: { timeForOneStar: 0, timeForTwoStars: 0, timeForThreeStars: 0, scoreForOneStar: 100, scoreForTwoStars: 100, scoreForThreeStars: 100, noLossBonus: true },
    };
  }),
  // مراحل "ماذا تعرف؟" (66-75)
  ...Array.from({ length: 10 }, (_, i) => {
    const id = 66 + i;
    const names = ['أندية A-M', 'حراس إيطاليا', 'ثلاثية بايرن', 'هدافون 100+', 'سوبر أوروبي', 'كرة ذهبية', 'مدربون', 'مدريد-يونايتد', 'ملاعب أبطال', 'هاتريك أبطال'];
    return {
      id, name: `المستوى ${id}`, description: `ماذا تعرف: ${names[i]}`,
      totalQuestions: 1, timePerQuestion: 90, maxAttempts: 1,
      requirements: { timeForOneStar: 0, timeForTwoStars: 0, timeForThreeStars: 0, scoreForOneStar: 50, scoreForTwoStars: 80, scoreForThreeStars: 100, noLossBonus: false },
    };
  }),
  // مراحل "المزاد" (76-85)
  ...Array.from({ length: 10 }, (_, i) => {
    const id = 76 + i;
    return {
      id, name: `المستوى ${id}`, description: 'المزاد',
      totalQuestions: 5, timePerQuestion: 35, maxAttempts: 1,
      requirements: { timeForOneStar: 0, timeForTwoStars: 0, timeForThreeStars: 0, scoreForOneStar: 20, scoreForTwoStars: 50, scoreForThreeStars: 80, noLossBonus: false },
    };
  }),
  // مراحل "الجرس" (86-95)
  ...Array.from({ length: 10 }, (_, i) => {
    const id = 86 + i;
    return {
      id, name: `المستوى ${id}`, description: 'الجرس',
      totalQuestions: 5, timePerQuestion: 0, maxAttempts: 1,
      requirements: { timeForOneStar: 0, timeForTwoStars: 0, timeForThreeStars: 0, scoreForOneStar: 60, scoreForTwoStars: 80, scoreForThreeStars: 100, noLossBonus: false },
    };
  }),
  // المستوى 96 - ماذا حدث بعد ذلك؟
  {
    id: 96, name: 'المستوى 96', description: 'ماذا حدث بعد ذلك؟ 🎬',
    totalQuestions: 10, timePerQuestion: 0, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 0, timeForThreeStars: 0, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: false },
  },
  // المستوى 97 - القيمة السوقية
  {
    id: 97, name: 'المستوى 97', description: 'كم كانت قيمته السوقية؟ 💰',
    totalQuestions: 10, timePerQuestion: 0, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 0, timeForThreeStars: 0, scoreForOneStar: 40, scoreForTwoStars: 60, scoreForThreeStars: 80, noLossBonus: false },
  },
  // المستوى 98 - الترتيب الصحيح
  {
    id: 98, name: 'المستوى 98', description: 'الترتيب الصحيح 📊',
    totalQuestions: 10, timePerQuestion: 0, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 0, timeForThreeStars: 0, scoreForOneStar: 50, scoreForTwoStars: 70, scoreForThreeStars: 90, noLossBonus: false },
  },
  // المستوى 99 - المستوى النهائي
  {
    id: 99, name: 'المستوى 99', description: 'ابنِ فريقك 🏆',
    totalQuestions: 1, timePerQuestion: 0, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 0, timeForThreeStars: 0, scoreForOneStar: 30, scoreForTwoStars: 55, scoreForThreeStars: 80, noLossBonus: false },
  },
  // المستوى 100 - التتويج النهائي
  {
    id: 100, name: 'المستوى 100', description: 'التتويج النهائي 👑',
    totalQuestions: 0, timePerQuestion: 0, maxAttempts: 1,
    requirements: { timeForOneStar: 0, timeForTwoStars: 0, timeForThreeStars: 0, scoreForOneStar: 0, scoreForTwoStars: 0, scoreForThreeStars: 0, noLossBonus: false },
  },
];

/**
 * Public stage sequence. Keep these internal IDs stable because each ID is
 * wired to its own existing game mode and saved progress record.
 */
export const LEVEL_ROUTE_ORDER: number[] = [
  1, 6, 2, 3, 22, 18, 11, 7, 8, 4,
  12, 9, 10, 20, 26, 28, 23, 38, 37, 21,
  27, 33, 34, 35, 36, 30, 31, 32, 40, 29,
  5, 24, 25, 17, 43, 44, 45, 19, 42, 41,
  13, 14, 15, 16, 39,
  53, 47, 50, 46, 55, 48, 52, 49, 54, 51,
  61, 57, 60, 58, 63, 56, 65, 59, 62, 64,
  70, 66, 75, 68, 73, 67, 72, 69, 74, 71,
  80, 76, 84, 78, 82, 77, 83, 79, 85, 81,
  90, 86, 94, 88, 92, 87, 93, 89, 95, 91,
  98, 96, 97, 99, 100,
];

export const ORDERED_LEVEL_CONFIGS: LevelConfig[] = LEVEL_ROUTE_ORDER
  .map((id) => LEVEL_CONFIGS.find((level) => level.id === id))
  .filter((level): level is LevelConfig => Boolean(level));

export function getStageNumber(levelId: number): number {
  const index = LEVEL_ROUTE_ORDER.indexOf(levelId);
  return index === -1 ? levelId : index + 1;
}

export function getNextLevelId(levelId: number): number | undefined {
  const index = LEVEL_ROUTE_ORDER.indexOf(levelId);
  return index < 0 ? undefined : LEVEL_ROUTE_ORDER[index + 1];
}
