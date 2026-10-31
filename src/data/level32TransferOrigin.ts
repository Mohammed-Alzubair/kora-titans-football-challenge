export interface TransferOriginQuestion {
  id: number;
  player: string;
  toClub: string;
  toClubLogo: string;
  year: number;
  correctFrom: string;
  options: string[];
  correctIndex: number;
}

export const transferOriginQuestions: TransferOriginQuestion[] = [
  { id: 1, player: 'كريستيانو رونالدو', toClub: 'ريال مدريد', toClubLogo: 'https://crests.football-data.org/86.png', year: 2009, correctFrom: 'مانشستر يونايتد', options: ['ليفربول', 'مانشستر يونايتد', 'سبورتينغ لشبونة', 'تشيلسي'], correctIndex: 1 },
  { id: 2, player: 'نيمار', toClub: 'باريس سان جيرمان', toClubLogo: 'https://crests.football-data.org/524.png', year: 2017, correctFrom: 'برشلونة', options: ['سانتوس', 'برشلونة', 'ريال مدريد', 'ميلان'], correctIndex: 1 },
  { id: 3, player: 'كيليان مبابي', toClub: 'ريال مدريد', toClubLogo: 'https://crests.football-data.org/86.png', year: 2024, correctFrom: 'باريس سان جيرمان', options: ['موناكو', 'باريس سان جيرمان', 'ليون', 'مارسيليا'], correctIndex: 1 },
  { id: 4, player: 'زين الدين زيدان', toClub: 'ريال مدريد', toClubLogo: 'https://crests.football-data.org/86.png', year: 2001, correctFrom: 'يوفنتوس', options: ['بوردو', 'يوفنتوس', 'مارسيليا', 'ميلان'], correctIndex: 1 },
  { id: 5, player: 'محمد صلاح', toClub: 'ليفربول', toClubLogo: 'https://crests.football-data.org/64.png', year: 2017, correctFrom: 'روما', options: ['فيورنتينا', 'تشيلسي', 'روما', 'بازل'], correctIndex: 2 },
  { id: 6, player: 'لويس سواريز', toClub: 'برشلونة', toClubLogo: 'https://crests.football-data.org/81.png', year: 2014, correctFrom: 'ليفربول', options: ['أياكس', 'ليفربول', 'ناسيونال', 'مانشستر سيتي'], correctIndex: 1 },
  { id: 7, player: 'إيرلينغ هالاند', toClub: 'مانشستر سيتي', toClubLogo: 'https://crests.football-data.org/65.png', year: 2022, correctFrom: 'بوروسيا دورتموند', options: ['ريد بول سالزبورغ', 'بوروسيا دورتموند', 'مولده', 'لايبزيغ'], correctIndex: 1 },
  { id: 8, player: 'جود بيلينغهام', toClub: 'ريال مدريد', toClubLogo: 'https://crests.football-data.org/86.png', year: 2023, correctFrom: 'بوروسيا دورتموند', options: ['برمنغهام', 'بوروسيا دورتموند', 'ليفربول', 'تشيلسي'], correctIndex: 1 },
  { id: 9, player: 'روبرت ليفاندوفسكي', toClub: 'برشلونة', toClubLogo: 'https://crests.football-data.org/81.png', year: 2022, correctFrom: 'بايرن ميونخ', options: ['بايرن ميونخ', 'دورتموند', 'ليخ بوزنان', 'ريال مدريد'], correctIndex: 0 },
  { id: 10, player: 'تيبو كورتوا', toClub: 'ريال مدريد', toClubLogo: 'https://crests.football-data.org/86.png', year: 2018, correctFrom: 'تشيلسي', options: ['أتلتيكو مدريد', 'تشيلسي', 'جينك', 'ليفربول'], correctIndex: 1 },
  { id: 11, player: 'أنطوان غريزمان', toClub: 'برشلونة', toClubLogo: 'https://crests.football-data.org/81.png', year: 2019, correctFrom: 'أتلتيكو مدريد', options: ['ريال سوسيداد', 'أتلتيكو مدريد', 'بايرن ميونخ', 'باريس سان جيرمان'], correctIndex: 1 },
  { id: 12, player: 'فيرجيل فان دايك', toClub: 'ليفربول', toClubLogo: 'https://crests.football-data.org/64.png', year: 2018, correctFrom: 'ساوثهامبتون', options: ['سلتيك', 'ساوثهامبتون', 'غرونينغن', 'أياكس'], correctIndex: 1 },
  { id: 13, player: 'لوكا مودريتش', toClub: 'ريال مدريد', toClubLogo: 'https://crests.football-data.org/86.png', year: 2012, correctFrom: 'توتنهام', options: ['دينامو زغرب', 'توتنهام', 'إنتر ميلان', 'مانشستر يونايتد'], correctIndex: 1 },
  { id: 14, player: 'كاكا', toClub: 'ريال مدريد', toClubLogo: 'https://crests.football-data.org/86.png', year: 2009, correctFrom: 'ميلان', options: ['ساو باولو', 'ميلان', 'يوفنتوس', 'إنتر ميلان'], correctIndex: 1 },
  { id: 15, player: 'إيدين هازار', toClub: 'ريال مدريد', toClubLogo: 'https://crests.football-data.org/86.png', year: 2019, correctFrom: 'تشيلسي', options: ['ليل', 'تشيلسي', 'مانشستر يونايتد', 'أرسنال'], correctIndex: 1 },
];
