export interface DidPlayerPlayQuestion {
  id: number;
  player: string;
  club: string;
  clubLogo: string;
  answer: boolean; // true = yes played, false = no
  funFact?: string;
}

export const didPlayerPlayQuestions: DidPlayerPlayQuestion[] = [
  { id: 1, player: 'تييري هنري', club: 'يوفنتوس', clubLogo: 'https://crests.football-data.org/109.png', answer: true, funFact: 'لعب موسم واحد فقط 1999!' },
  { id: 2, player: 'كريستيانو رونالدو', club: 'باريس سان جيرمان', clubLogo: 'https://crests.football-data.org/524.png', answer: false },
  { id: 3, player: 'ليونيل ميسي', club: 'باريس سان جيرمان', clubLogo: 'https://crests.football-data.org/524.png', answer: true, funFact: 'انتقل في 2021 بعد رحيله عن برشلونة' },
  { id: 4, player: 'زلاتان إبراهيموفيتش', club: 'برشلونة', clubLogo: 'https://crests.football-data.org/81.png', answer: true, funFact: 'موسم واحد فقط 2009-2010!' },
  { id: 5, player: 'نيمار', club: 'ريال مدريد', clubLogo: 'https://crests.football-data.org/86.png', answer: false },
  { id: 6, player: 'ديفيد بيكهام', club: 'ميلان', clubLogo: 'https://crests.football-data.org/98.png', answer: true, funFact: 'إعارة من لوس أنجلوس غالاكسي!' },
  { id: 7, player: 'روبيرتو كارلوس', club: 'إنتر ميلان', clubLogo: 'https://crests.football-data.org/108.png', answer: true, funFact: 'قبل انتقاله لريال مدريد 1996' },
  { id: 8, player: 'محمد صلاح', club: 'تشيلسي', clubLogo: 'https://crests.football-data.org/61.png', answer: true, funFact: 'لعب في 2014 قبل الإعارة!' },
  { id: 9, player: 'كيليان مبابي', club: 'ليفربول', clubLogo: 'https://crests.football-data.org/64.png', answer: false },
  { id: 10, player: 'أنطوان غريزمان', club: 'برشلونة', clubLogo: 'https://crests.football-data.org/81.png', answer: true, funFact: 'انتقل في 2019 بمبلغ 120 مليون!' },
  { id: 11, player: 'سيرجيو أغويرو', club: 'برشلونة', clubLogo: 'https://crests.football-data.org/81.png', answer: true, funFact: 'اعتزل فيه بسبب مشاكل في القلب' },
  { id: 12, player: 'لوكا مودريتش', club: 'مانشستر يونايتد', clubLogo: 'https://crests.football-data.org/66.png', answer: false },
  { id: 13, player: 'كاكا', club: 'ريال مدريد', clubLogo: 'https://crests.football-data.org/86.png', answer: true, funFact: 'انتقل في 2009 مقابل 65 مليون!' },
  { id: 14, player: 'رونالدينيو', club: 'ميلان', clubLogo: 'https://crests.football-data.org/98.png', answer: true, funFact: 'لعب من 2008 إلى 2011' },
  { id: 15, player: 'وين روني', club: 'ريال مدريد', clubLogo: 'https://crests.football-data.org/86.png', answer: false },
  { id: 16, player: 'جيمس رودريغيز', club: 'بايرن ميونخ', clubLogo: 'https://crests.football-data.org/5.png', answer: true, funFact: 'إعارة من ريال مدريد 2017-2019' },
  { id: 17, player: 'إيدين هازار', club: 'ريال مدريد', clubLogo: 'https://crests.football-data.org/86.png', answer: true, funFact: 'انتقل في 2019 بـ100 مليون!' },
  { id: 18, player: 'بول بوغبا', club: 'يوفنتوس', clubLogo: 'https://crests.football-data.org/109.png', answer: true, funFact: 'لعب مرتين ليوفنتوس!' },
  { id: 19, player: 'فيرجيل فان دايك', club: 'برشلونة', clubLogo: 'https://crests.football-data.org/81.png', answer: false },
  { id: 20, player: 'غاريث بيل', club: 'توتنهام', clubLogo: 'https://crests.football-data.org/73.png', answer: true, funFact: 'بدأ مسيرته هناك ورجع إعارة 2020!' },
];
