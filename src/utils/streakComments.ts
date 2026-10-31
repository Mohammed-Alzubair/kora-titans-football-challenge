// تعليقات المعلق الرياضي - Football commentator streak comments

const streak3Comments = [
  'لا لا لا! الحركة هذي لازم تُدرس!',
  'مستحيل فاز بالطريقة هذي!',
  'أقسم بالله لعبه فيه وقاحة 😂',
  'يا رجل وش الذكاء هذا!',
  'هذا مو قيم… هذا فيلم أكشن!',
  'من أول دقيقة وهو داخل يجلد!',
  'يا جماعة شوف التركيز! شوف الرهيب!',
  'الحركة الأخيرة؟ نهاااية أسطورية!',
  'هذا اللاعب عنده أفكار غير بشرية!',
  'حرام إنه جلدهم جلد!',
];

const streak5Comments = [
  'انتظر… انتظر… انتظر… أووووووووووه!!',
  'يا ساتر يا ساتر يا ساتر!',
  'هناااااا انفجرت المباراة!',
  'الدقيقة هذي غيّرت كل شيء!',
  'من هنا بدأ الجنون الحقيقي!',
  'اللقطة هذي قلبت السيناريو بالكامل!',
  'مستحيل أحد كان يتوقع النهاية هذي!',
  'هذه اللحظة… لحظة تاريخية!',
  'يااااه يا جماعة! وش النهاية المجنونة!',
  'والله المشهد هذا يجيب قشعريرة!',
  'ياعف الله🤯 شنو هذاا',
  'طغيتتتتتتتتت هههه مستحيل😂🙂',
  'ياراجل شنو هذا🙂💪 سفاح',
];

const loseStreakComments = [
  'جسمك ظعييييييف😂🤣 شو هاد',
  'ياعفو الله 🫣 حجمك صغيررررر',
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Returns a commentator message based on streak count.
 * - streak >= 5: epic tier (win)
 * - streak >= 3: hype tier (win)
 * - wrongStreak >= 3: lose tier
 * - Returns null otherwise
 */
export function getStreakComment(streak: number, wrongStreak?: number): { message: string; tier: 'hype' | 'epic' | 'lose' } | null {
  if (streak >= 5) {
    return { message: randomFrom(streak5Comments), tier: 'epic' };
  }
  if (streak >= 3) {
    return { message: randomFrom(streak3Comments), tier: 'hype' };
  }
  if (wrongStreak !== undefined && wrongStreak >= 3) {
    return { message: randomFrom(loseStreakComments), tier: 'lose' };
  }
  return null;
}
