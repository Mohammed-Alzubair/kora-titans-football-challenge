// بيانات تحدي "ماذا تعرف عن النادي؟" - مستويات 61-65

export type TriviaQuestionType = 'yes_no' | 'mcq';

export interface ClubTriviaQuestion {
  question: string;
  type: TriviaQuestionType;
  correctAnswer: boolean | string; // boolean for yes_no, string for mcq
  options?: string[]; // for mcq only
  emoji?: string;
}

export interface ClubTriviaLevel {
  levelNum: number;
  clubName: string;
  clubLogo: string;
  questions: ClubTriviaQuestion[];
}

export const clubTriviaLevels: ClubTriviaLevel[] = [
  {
    levelNum: 61,
    clubName: 'ريال مدريد',
    clubLogo: 'https://crests.football-data.org/86.png',
    questions: [
      { question: 'هل ريال مدريد حقق دوري أبطال أوروبا؟', type: 'yes_no', correctAnswer: true, emoji: '🏆' },
      { question: 'هل تأسس ريال مدريد عام 1902؟', type: 'yes_no', correctAnswer: true, emoji: '📅' },
      { question: 'هل دربه زين الدين زيدان؟', type: 'yes_no', correctAnswer: true, emoji: '👔' },
      { question: 'هل لعب فيه ليونيل ميسي؟', type: 'yes_no', correctAnswer: false, emoji: '⚽' },
      { question: 'في أي بلد يقع ريال مدريد؟', type: 'mcq', correctAnswer: 'إسبانيا', options: ['إسبانيا', 'إيطاليا', 'إنجلترا', 'فرنسا'], emoji: '🌍' },
      { question: 'هل لعب فيه كريستيانو رونالدو؟', type: 'yes_no', correctAnswer: true, emoji: '⚽' },
      { question: 'من هو أكثر لاعب سجل أهداف في تاريخ النادي؟', type: 'mcq', correctAnswer: 'كريستيانو رونالدو', options: ['كريستيانو رونالدو', 'راؤول', 'بنزيما', 'دي ستيفانو'], emoji: '🥇' },
      { question: 'هل لون قميص النادي الأساسي أبيض؟', type: 'yes_no', correctAnswer: true, emoji: '👕' },
      { question: 'هل لعب فيه ديفيد بيكهام؟', type: 'yes_no', correctAnswer: true, emoji: '⚽' },
      { question: 'كم مرة فاز ريال مدريد بدوري الأبطال؟', type: 'mcq', correctAnswer: '15 مرة', options: ['10 مرات', '12 مرة', '15 مرة', '8 مرات'], emoji: '🏆' },
      { question: 'هل ملعبه اسمه سانتياغو برنابيو؟', type: 'yes_no', correctAnswer: true, emoji: '🏟️' },
      { question: 'هل دربه كارلو أنشيلوتي؟', type: 'yes_no', correctAnswer: true, emoji: '👔' },
      { question: 'هل لعب فيه نيمار؟', type: 'yes_no', correctAnswer: false, emoji: '⚽' },
      { question: 'هل فاز بكأس العالم للأندية؟', type: 'yes_no', correctAnswer: true, emoji: '🌍' },
      { question: 'من دربه في 2024؟', type: 'mcq', correctAnswer: 'كارلو أنشيلوتي', options: ['زيدان', 'كارلو أنشيلوتي', 'مورينيو', 'غوارديولا'], emoji: '👔' },
    ],
  },
  {
    levelNum: 62,
    clubName: 'برشلونة',
    clubLogo: 'https://crests.football-data.org/81.png',
    questions: [
      { question: 'هل برشلونة حقق دوري أبطال أوروبا؟', type: 'yes_no', correctAnswer: true, emoji: '🏆' },
      { question: 'هل تأسس برشلونة عام 1899؟', type: 'yes_no', correctAnswer: true, emoji: '📅' },
      { question: 'هل لعب فيه ليونيل ميسي؟', type: 'yes_no', correctAnswer: true, emoji: '⚽' },
      { question: 'هل دربه بيب غوارديولا؟', type: 'yes_no', correctAnswer: true, emoji: '👔' },
      { question: 'في أي مدينة يقع برشلونة؟', type: 'mcq', correctAnswer: 'برشلونة', options: ['مدريد', 'برشلونة', 'فالنسيا', 'إشبيلية'], emoji: '🌍' },
      { question: 'هل لعب فيه كريستيانو رونالدو؟', type: 'yes_no', correctAnswer: false, emoji: '⚽' },
      { question: 'ما اسم ملعب برشلونة الجديد؟', type: 'mcq', correctAnswer: 'سبوتيفاي كامب نو', options: ['سانتياغو برنابيو', 'سبوتيفاي كامب نو', 'أنفيلد', 'سان سيرو'], emoji: '🏟️' },
      { question: 'هل شعاره يحتوي على ألوان أزرق وأحمر؟', type: 'yes_no', correctAnswer: true, emoji: '🔴🔵' },
      { question: 'هل لعب فيه رونالدينيو؟', type: 'yes_no', correctAnswer: true, emoji: '⚽' },
      { question: 'هل دربه هانسي فليك؟', type: 'yes_no', correctAnswer: true, emoji: '👔' },
      { question: 'هل فاز بالسداسية (6 بطولات في سنة)؟', type: 'yes_no', correctAnswer: true, emoji: '🏆' },
      { question: 'هل لعب فيه نيمار؟', type: 'yes_no', correctAnswer: true, emoji: '⚽' },
      { question: 'كم مرة فاز بدوري الأبطال؟', type: 'mcq', correctAnswer: '5 مرات', options: ['3 مرات', '5 مرات', '7 مرات', '10 مرات'], emoji: '🏆' },
      { question: 'هل لعب فيه لامين يامال؟', type: 'yes_no', correctAnswer: true, emoji: '⚽' },
      { question: 'ما هو شعار النادي؟', type: 'mcq', correctAnswer: 'أكثر من نادي', options: ['أكثر من نادي', 'لن تمشي وحيداً', 'هلا مدريد', 'إلى الأمام'], emoji: '💙' },
    ],
  },
  {
    levelNum: 63,
    clubName: 'مانشستر يونايتد',
    clubLogo: 'https://crests.football-data.org/66.png',
    questions: [
      { question: 'هل مانشستر يونايتد حقق دوري أبطال أوروبا؟', type: 'yes_no', correctAnswer: true, emoji: '🏆' },
      { question: 'هل تأسس عام 1878؟', type: 'yes_no', correctAnswer: true, emoji: '📅' },
      { question: 'هل دربه السير أليكس فيرغسون؟', type: 'yes_no', correctAnswer: true, emoji: '👔' },
      { question: 'هل لعب فيه واين روني؟', type: 'yes_no', correctAnswer: true, emoji: '⚽' },
      { question: 'في أي مدينة يقع النادي؟', type: 'mcq', correctAnswer: 'مانشستر', options: ['لندن', 'ليفربول', 'مانشستر', 'برمنغهام'], emoji: '🌍' },
      { question: 'هل لون قميصه الأساسي أحمر؟', type: 'yes_no', correctAnswer: true, emoji: '👕' },
      { question: 'ما اسم ملعبه؟', type: 'mcq', correctAnswer: 'أولد ترافورد', options: ['أولد ترافورد', 'أنفيلد', 'الاتحاد', 'ستامفورد بريدج'], emoji: '🏟️' },
      { question: 'هل لعب فيه كريستيانو رونالدو؟', type: 'yes_no', correctAnswer: true, emoji: '⚽' },
      { question: 'هل لعب فيه ميسي؟', type: 'yes_no', correctAnswer: false, emoji: '⚽' },
      { question: 'هل يلقب بالشياطين الحمر؟', type: 'yes_no', correctAnswer: true, emoji: '👹' },
      { question: 'هل دربه جوزيه مورينيو؟', type: 'yes_no', correctAnswer: true, emoji: '👔' },
      { question: 'هل لعب فيه ديفيد بيكهام؟', type: 'yes_no', correctAnswer: true, emoji: '⚽' },
      { question: 'كم مرة فاز بالدوري الإنجليزي؟', type: 'mcq', correctAnswer: '20 مرة', options: ['15 مرة', '18 مرة', '20 مرة', '13 مرة'], emoji: '🏆' },
      { question: 'هل لعب فيه بول بوغبا؟', type: 'yes_no', correctAnswer: true, emoji: '⚽' },
      { question: 'هل دربه إريك تين هاغ؟', type: 'yes_no', correctAnswer: true, emoji: '👔' },
    ],
  },
  {
    levelNum: 64,
    clubName: 'بايرن ميونخ',
    clubLogo: 'https://crests.football-data.org/5.png',
    questions: [
      { question: 'هل بايرن ميونخ حقق دوري أبطال أوروبا؟', type: 'yes_no', correctAnswer: true, emoji: '🏆' },
      { question: 'هل تأسس عام 1900؟', type: 'yes_no', correctAnswer: true, emoji: '📅' },
      { question: 'في أي بلد يقع بايرن ميونخ؟', type: 'mcq', correctAnswer: 'ألمانيا', options: ['إنجلترا', 'ألمانيا', 'فرنسا', 'هولندا'], emoji: '🌍' },
      { question: 'هل دربه بيب غوارديولا؟', type: 'yes_no', correctAnswer: true, emoji: '👔' },
      { question: 'هل لعب فيه روبرت ليفاندوفسكي؟', type: 'yes_no', correctAnswer: true, emoji: '⚽' },
      { question: 'ما اسم ملعبه؟', type: 'mcq', correctAnswer: 'أليانز أرينا', options: ['أولد ترافورد', 'أليانز أرينا', 'سيغنال إيدونا بارك', 'الأولمبي'], emoji: '🏟️' },
      { question: 'هل لون قميصه الأساسي أحمر؟', type: 'yes_no', correctAnswer: true, emoji: '👕' },
      { question: 'هل لعب فيه توماس مولر؟', type: 'yes_no', correctAnswer: true, emoji: '⚽' },
      { question: 'هل فاز بالبوندسليغا أكثر من 30 مرة؟', type: 'yes_no', correctAnswer: true, emoji: '🏆' },
      { question: 'هل لعب فيه ميسي؟', type: 'yes_no', correctAnswer: false, emoji: '⚽' },
      { question: 'هل دربه يورغن كلوب؟', type: 'yes_no', correctAnswer: false, emoji: '👔' },
      { question: 'هل لعب فيه فرانك ريبيري؟', type: 'yes_no', correctAnswer: true, emoji: '⚽' },
      { question: 'كم مرة فاز بدوري الأبطال؟', type: 'mcq', correctAnswer: '6 مرات', options: ['4 مرات', '6 مرات', '8 مرات', '3 مرات'], emoji: '🏆' },
      { question: 'هل لعب فيه ساديو ماني؟', type: 'yes_no', correctAnswer: true, emoji: '⚽' },
      { question: 'هل النادي من مدينة ميونخ؟', type: 'yes_no', correctAnswer: true, emoji: '🏙️' },
    ],
  },
  {
    levelNum: 65,
    clubName: 'ليفربول',
    clubLogo: 'https://crests.football-data.org/64.png',
    questions: [
      { question: 'هل ليفربول حقق دوري أبطال أوروبا؟', type: 'yes_no', correctAnswer: true, emoji: '🏆' },
      { question: 'هل تأسس عام 1892؟', type: 'yes_no', correctAnswer: true, emoji: '📅' },
      { question: 'هل دربه يورغن كلوب؟', type: 'yes_no', correctAnswer: true, emoji: '👔' },
      { question: 'هل لعب فيه محمد صلاح؟', type: 'yes_no', correctAnswer: true, emoji: '⚽' },
      { question: 'في أي بلد يقع ليفربول؟', type: 'mcq', correctAnswer: 'إنجلترا', options: ['إسبانيا', 'إنجلترا', 'ألمانيا', 'فرنسا'], emoji: '🌍' },
      { question: 'ما اسم ملعبه؟', type: 'mcq', correctAnswer: 'أنفيلد', options: ['أولد ترافورد', 'أنفيلد', 'ستامفورد بريدج', 'الإمارات'], emoji: '🏟️' },
      { question: 'هل لعب فيه ستيفن جيرارد؟', type: 'yes_no', correctAnswer: true, emoji: '⚽' },
      { question: 'ما هو نشيد النادي الشهير؟', type: 'mcq', correctAnswer: 'You\'ll Never Walk Alone', options: ['You\'ll Never Walk Alone', 'Glory Glory', 'Hala Madrid', 'Blue Moon'], emoji: '🎵' },
      { question: 'هل لون قميصه الأساسي أحمر؟', type: 'yes_no', correctAnswer: true, emoji: '👕' },
      { question: 'هل لعب فيه لويس سواريز؟', type: 'yes_no', correctAnswer: true, emoji: '⚽' },
      { question: 'هل دربه رافا بينيتيز؟', type: 'yes_no', correctAnswer: true, emoji: '👔' },
      { question: 'هل فاز بالدوري الإنجليزي عام 2020؟', type: 'yes_no', correctAnswer: true, emoji: '🏆' },
      { question: 'كم مرة فاز بدوري الأبطال؟', type: 'mcq', correctAnswer: '6 مرات', options: ['4 مرات', '5 مرات', '6 مرات', '7 مرات'], emoji: '🏆' },
      { question: 'هل لعب فيه كريستيانو رونالدو؟', type: 'yes_no', correctAnswer: false, emoji: '⚽' },
      { question: 'هل يلقب بالريدز؟', type: 'yes_no', correctAnswer: true, emoji: '🔴' },
    ],
  },
];

export function getClubTriviaForLevel(levelNum: number): ClubTriviaLevel | undefined {
  return clubTriviaLevels.find(l => l.levelNum === levelNum);
}
