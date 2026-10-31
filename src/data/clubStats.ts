import { Club, clubs } from './clubs';

export interface ClubStats {
  clubId: string;
  stats: {
    label: string;
    value: number | string;
  }[];
}

export interface QuizQuestion {
  stats: ClubStats;
  correctClub: Club;
  wrongOptions: Club[];
}

// إحصائيات الأندية الحقيقية
const clubStatsData: ClubStats[] = [
  {
    clubId: 'real_madrid',
    stats: [
      { label: 'دوري أبطال أوروبا 🏆', value: 15 },
      { label: 'الدوري الإسباني 🥇', value: 36 },
      { label: 'كأس العالم للأندية 🌍', value: 5 },
      { label: 'كأس ملك إسبانيا 👑', value: 20 },
      { label: 'كأس السوبر الأوروبي ⭐', value: 6 },
    ],
  },
  {
    clubId: 'barcelona',
    stats: [
      { label: 'دوري أبطال أوروبا 🏆', value: 5 },
      { label: 'الدوري الإسباني 🥇', value: 27 },
      { label: 'كأس العالم للأندية 🌍', value: 3 },
      { label: 'كأس ملك إسبانيا 👑', value: 31 },
      { label: 'أفضل لاعب في العالم 🌟', value: '12 لاعب' },
    ],
  },
  {
    clubId: 'bayern',
    stats: [
      { label: 'دوري أبطال أوروبا 🏆', value: 6 },
      { label: 'الدوري الألماني 🥇', value: 33 },
      { label: 'كأس العالم للأندية 🌍', value: 2 },
      { label: 'كأس ألمانيا 🏅', value: 20 },
      { label: 'أطول سلسلة بطولات متتالية 📊', value: '11 بطولة' },
    ],
  },
  {
    clubId: 'manchester_united',
    stats: [
      { label: 'دوري أبطال أوروبا 🏆', value: 3 },
      { label: 'الدوري الإنجليزي 🥇', value: 20 },
      { label: 'كأس الاتحاد الإنجليزي 🏅', value: 13 },
      { label: 'الدوري الأوروبي 🌟', value: 1 },
      { label: 'أغلى نادي في التاريخ 💰', value: '2012' },
    ],
  },
  {
    clubId: 'liverpool',
    stats: [
      { label: 'دوري أبطال أوروبا 🏆', value: 6 },
      { label: 'الدوري الإنجليزي 🥇', value: 19 },
      { label: 'كأس العالم للأندية 🌍', value: 1 },
      { label: 'كأس الاتحاد الأوروبي 🌟', value: 3 },
      { label: 'ليلة إسطنبول الأسطورية 🔥', value: '2005' },
    ],
  },
  {
    clubId: 'ac_milan',
    stats: [
      { label: 'دوري أبطال أوروبا 🏆', value: 7 },
      { label: 'الدوري الإيطالي 🥇', value: 19 },
      { label: 'كأس العالم للأندية 🌍', value: 1 },
      { label: 'كأس إيطاليا 🏅', value: 5 },
      { label: 'كأس السوبر الأوروبي ⭐', value: 5 },
    ],
  },
  {
    clubId: 'inter_milan',
    stats: [
      { label: 'دوري أبطال أوروبا 🏆', value: 3 },
      { label: 'الدوري الإيطالي 🥇', value: 20 },
      { label: 'كأس العالم للأندية 🌍', value: 1 },
      { label: 'الثلاثية التاريخية 🔥', value: '2010' },
      { label: 'كأس إيطاليا 🏅', value: 9 },
    ],
  },
  {
    clubId: 'juventus',
    stats: [
      { label: 'الدوري الإيطالي 🥇', value: 36 },
      { label: 'دوري أبطال أوروبا 🏆', value: 2 },
      { label: 'كأس إيطاليا 🏅', value: 14 },
      { label: '9 بطولات متتالية 📊', value: '2012-2020' },
      { label: 'كأس السوبر الإيطالي ⭐', value: 9 },
    ],
  },
  {
    clubId: 'psg',
    stats: [
      { label: 'الدوري الفرنسي 🥇', value: 12 },
      { label: 'كأس فرنسا 🏅', value: 15 },
      { label: 'أغلى صفقة في التاريخ 💰', value: '222 مليون' },
      { label: 'وصيف دوري الأبطال 🥈', value: 1 },
      { label: 'ملعب بارك دي برانس 🏟️', value: '48,712 مقعد' },
    ],
  },
  {
    clubId: 'manchester_city',
    stats: [
      { label: 'الدوري الإنجليزي 🥇', value: 10 },
      { label: 'دوري أبطال أوروبا 🏆', value: 1 },
      { label: 'الثلاثية التاريخية 🔥', value: '2023' },
      { label: 'كأس الاتحاد الإنجليزي 🏅', value: 7 },
      { label: '4 بطولات دوري متتالية 📊', value: '2021-2024' },
    ],
  },
];

// دالة لإنشاء سؤال عشوائي
export function generateQuizQuestion(usedClubIds: string[] = []): QuizQuestion | null {
  // فلترة الأندية المستخدمة
  const availableStats = clubStatsData.filter(s => !usedClubIds.includes(s.clubId));
  
  if (availableStats.length === 0) {
    return null;
  }
  
  // اختيار سؤال عشوائي
  const randomStats = availableStats[Math.floor(Math.random() * availableStats.length)];
  const correctClub = clubs.find(c => c.id === randomStats.clubId)!;
  
  // اختيار 3 أندية خاطئة من نفس الفئة تقريباً
  const wrongClubs = clubs
    .filter(c => c.id !== correctClub.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  return {
    stats: randomStats,
    correctClub,
    wrongOptions: wrongClubs,
  };
}

export function getAllQuizQuestions(): QuizQuestion[] {
  return clubStatsData.map(stats => {
    const correctClub = clubs.find(c => c.id === stats.clubId)!;
    const wrongClubs = clubs
      .filter(c => c.id !== correctClub.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    return {
      stats,
      correctClub,
      wrongOptions: wrongClubs,
    };
  }).sort(() => Math.random() - 0.5);
}
