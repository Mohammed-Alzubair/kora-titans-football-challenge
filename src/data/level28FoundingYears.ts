// Level 28: النادي من سنة التأسيس

import type { LeagueId } from './leagues';

export interface FoundingYearQuestion {
  id: number;
  year: number;
  correctClub: string;
  leagueId: LeagueId;
  options: string[];
  correctIndex: number;
  hint?: string;
  hintEn?: string;
}

export const foundingYearQuestions: FoundingYearQuestion[] = [
  {
    id: 1, year: 1902, correctClub: 'ريال مدريد', leagueId: 'la-liga',
    options: ['ريال مدريد', 'برشلونة', 'أتلتيكو مدريد', 'إشبيلية'],
    correctIndex: 0, hint: 'النادي الملكي 👑', hintEn: 'The Royal Club 👑',
  },
  {
    id: 2, year: 1899, correctClub: 'برشلونة', leagueId: 'la-liga',
    options: ['ريال مدريد', 'برشلونة', 'أتلتيكو مدريد', 'إشبيلية'],
    correctIndex: 1, hint: 'أكثر من نادٍ 💙❤️', hintEn: 'More than a club 💙❤️',
  },
  {
    id: 3, year: 1897, correctClub: 'يوفنتوس', leagueId: 'serie-a',
    options: ['ميلان', 'يوفنتوس', 'إنتر ميلان', 'روما'],
    correctIndex: 1, hint: 'السيدة العجوز 🦓', hintEn: 'The Old Lady 🦓',
  },
  {
    id: 4, year: 1892, correctClub: 'ليفربول', leagueId: 'premier-league',
    options: ['أرسنال', 'تشيلسي', 'ليفربول', 'مانشستر يونايتد'],
    correctIndex: 2, hint: 'لن تسير وحدك أبداً 🔴', hintEn: 'You\'ll Never Walk Alone 🔴',
  },
  {
    id: 5, year: 1878, correctClub: 'مانشستر يونايتد', leagueId: 'premier-league',
    options: ['مانشستر يونايتد', 'ليفربول', 'أرسنال', 'توتنهام'],
    correctIndex: 0, hint: 'الشياطين الحمر 👹', hintEn: 'The Red Devils 👹',
  },
  {
    id: 6, year: 1886, correctClub: 'أرسنال', leagueId: 'premier-league',
    options: ['تشيلسي', 'توتنهام', 'أرسنال', 'ليفربول'],
    correctIndex: 2, hint: 'المدفعجية 🔴⚪', hintEn: 'The Gunners 🔴⚪',
  },
  {
    id: 7, year: 1905, correctClub: 'تشيلسي', leagueId: 'premier-league',
    options: ['تشيلسي', 'مانشستر سيتي', 'أرسنال', 'ليفربول'],
    correctIndex: 0, hint: 'أسود ستامفورد بريدج 💙', hintEn: 'The Blues of Stamford Bridge 💙',
  },
  {
    id: 8, year: 1900, correctClub: 'بايرن ميونخ', leagueId: 'bundesliga',
    options: ['بايرن ميونخ', 'بوروسيا دورتموند', 'لايبزيغ', 'بوروسيا مونشنغلادباخ'],
    correctIndex: 0, hint: 'بطل ألمانيا 🇩🇪', hintEn: 'Germany’s champions 🇩🇪',
  },
  {
    id: 9, year: 1970, correctClub: 'باريس سان جيرمان', leagueId: 'ligue-1',
    options: ['ليل', 'باريس سان جيرمان', 'موناكو', 'رين'],
    correctIndex: 1, hint: 'النادي الباريسي ⚜️', hintEn: 'The Parisian club ⚜️',
  },
  {
    id: 10, year: 1908, correctClub: 'إنتر ميلان', leagueId: 'serie-a',
    options: ['ميلان', 'إنتر ميلان', 'يوفنتوس', 'روما'],
    correctIndex: 1, hint: 'الأفاعي الزرقاء والسوداء 🐍', hintEn: 'The Nerazzurri 🐍',
  },
];
