// Level 30: من النادي الذي لعب له اللاعبان؟

import type { LeagueId } from './leagues';

export interface SharedClubQuestion {
  id: number;
  player1: string;
  player2: string;
  player1En: string;
  player2En: string;
  correctClub: string;
  leagueId: LeagueId;
  options: string[];
  correctIndex: number;
}

export const sharedClubQuestions: SharedClubQuestion[] = [
  {
    id: 1, player1: 'كريستيانو رونالدو', player2: 'مسعود أوزيل', player1En: 'Cristiano Ronaldo', player2En: 'Mesut Özil',
    correctClub: 'ريال مدريد', leagueId: 'la-liga',
    options: ['ريال مدريد', 'برشلونة', 'أتلتيكو مدريد', 'إشبيلية'],
    correctIndex: 0,
  },
  {
    id: 2, player1: 'ليونيل ميسي', player2: 'نيمار', player1En: 'Lionel Messi', player2En: 'Neymar',
    correctClub: 'برشلونة', leagueId: 'la-liga',
    options: ['برشلونة', 'ريال مدريد', 'أتلتيكو مدريد', 'إشبيلية'],
    correctIndex: 0,
  },
  {
    id: 3, player1: 'زين الدين زيدان', player2: 'رونالدو البرازيلي', player1En: 'Zinedine Zidane', player2En: 'Ronaldo Nazário',
    correctClub: 'ريال مدريد', leagueId: 'la-liga',
    options: ['أتلتيكو مدريد', 'ريال مدريد', 'برشلونة', 'إشبيلية'],
    correctIndex: 1,
  },
  {
    id: 4, player1: 'بول بوغبا', player2: 'زلاتان إبراهيموفيتش', player1En: 'Paul Pogba', player2En: 'Zlatan Ibrahimović',
    correctClub: 'مانشستر يونايتد', leagueId: 'premier-league',
    options: ['مانشستر يونايتد', 'ليفربول', 'أرسنال', 'تشيلسي'],
    correctIndex: 0,
  },
  {
    id: 5, player1: 'ستيفن جيرارد', player2: 'فيرناندو توريس', player1En: 'Steven Gerrard', player2En: 'Fernando Torres',
    correctClub: 'ليفربول', leagueId: 'premier-league',
    options: ['تشيلسي', 'ليفربول', 'أرسنال', 'مانشستر يونايتد'],
    correctIndex: 1,
  },
  {
    id: 6, player1: 'تييري هنري', player2: 'دينيس بيركامب', player1En: 'Thierry Henry', player2En: 'Dennis Bergkamp',
    correctClub: 'أرسنال', leagueId: 'premier-league',
    options: ['توتنهام', 'مانشستر سيتي', 'أرسنال', 'ليفربول'],
    correctIndex: 2,
  },
  {
    id: 7, player1: 'كاكا', player2: 'أندريا بيرلو', player1En: 'Kaká', player2En: 'Andrea Pirlo',
    correctClub: 'ميلان', leagueId: 'serie-a',
    options: ['يوفنتوس', 'نابولي', 'ميلان', 'إنتر ميلان'],
    correctIndex: 2,
  },
  {
    id: 8, player1: 'ديفيد بيكهام', player2: 'رونالدينيو', player1En: 'David Beckham', player2En: 'Ronaldinho',
    correctClub: 'باريس سان جيرمان', leagueId: 'ligue-1',
    options: ['ليون', 'مارسيليا', 'باريس سان جيرمان', 'موناكو'],
    correctIndex: 2,
  },
  {
    id: 9, player1: 'كارلوس تيفيز', player2: 'كريستيانو رونالدو', player1En: 'Carlos Tévez', player2En: 'Cristiano Ronaldo',
    correctClub: 'مانشستر يونايتد', leagueId: 'premier-league',
    options: ['مانشستر سيتي', 'ليفربول', 'مانشستر يونايتد', 'أرسنال'],
    correctIndex: 2,
  },
  {
    id: 10, player1: 'رونالدينيو', player2: 'صامويل إيتو', player1En: 'Ronaldinho', player2En: 'Samuel Eto’o',
    correctClub: 'برشلونة', leagueId: 'la-liga',
    options: ['برشلونة', 'ريال مدريد', 'أتلتيكو مدريد', 'إشبيلية'],
    correctIndex: 0,
  },
  {
    id: 11, player1: 'جود بيلينغهام', player2: 'إيرلينغ هالاند', player1En: 'Jude Bellingham', player2En: 'Erling Haaland',
    correctClub: 'دورتموند', leagueId: 'bundesliga',
    options: ['بايرن ميونخ', 'بوروسيا دورتموند', 'لايبزيغ', 'بوروسيا مونشنغلادباخ'],
    correctIndex: 1,
  },
  {
    id: 12, player1: 'روبرت ليفاندوفسكي', player2: 'لويس سواريز', player1En: 'Robert Lewandowski', player2En: 'Luis Suárez',
    correctClub: 'برشلونة', leagueId: 'la-liga',
    options: ['إشبيلية', 'برشلونة', 'ريال مدريد', 'أتلتيكو مدريد'],
    correctIndex: 1,
  },
];
