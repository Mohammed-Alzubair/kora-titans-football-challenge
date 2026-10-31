export interface CoachClubQuestion {
  id: number;
  coach: string;
  coachImage?: string;
  correctClub: string;
  options: string[];
  correctIndex: number;
  hint?: string;
}

export const coachClubQuestions: CoachClubQuestion[] = [
  { id: 1, coach: 'زين الدين زيدان', correctClub: 'ريال مدريد', options: ['يوفنتوس', 'ريال مدريد', 'باريس سان جيرمان', 'برشلونة'], correctIndex: 1, hint: '3 دوري أبطال متتالية! 🏆🏆🏆' },
  { id: 2, coach: 'بيب غوارديولا', correctClub: 'برشلونة', options: ['برشلونة', 'بايرن ميونخ', 'مانشستر سيتي', 'ريال مدريد'], correctIndex: 0, hint: 'سداسية تاريخية 2009! 🏆' },
  { id: 3, coach: 'يورغن كلوب', correctClub: 'ليفربول', options: ['دورتموند', 'بايرن ميونخ', 'ليفربول', 'تشيلسي'], correctIndex: 2, hint: 'You\'ll Never Walk Alone 🎵' },
  { id: 4, coach: 'كارلو أنشيلوتي', correctClub: 'ميلان', options: ['ميلان', 'ريال مدريد', 'تشيلسي', 'نابولي'], correctIndex: 0, hint: 'ليلة إسطنبول 2005 (خسرها!) 😱' },
  { id: 5, coach: 'جوزيه مورينيو', correctClub: 'إنتر ميلان', options: ['تشيلسي', 'ريال مدريد', 'إنتر ميلان', 'مانشستر يونايتد'], correctIndex: 2, hint: 'الثلاثية التاريخية 2010! 🏆' },
  { id: 6, coach: 'أليكس فيرغسون', correctClub: 'مانشستر يونايتد', options: ['ليفربول', 'مانشستر يونايتد', 'أرسنال', 'تشيلسي'], correctIndex: 1, hint: 'السير! 26 سنة في النادي 👑' },
  { id: 7, coach: 'دييغو سيميوني', correctClub: 'أتلتيكو مدريد', options: ['إنتر ميلان', 'لاتسيو', 'أتلتيكو مدريد', 'ريال مدريد'], correctIndex: 2, hint: 'El Cholo! 🇦🇷' },
  { id: 8, coach: 'أرسين فينغر', correctClub: 'أرسنال', options: ['أرسنال', 'توتنهام', 'مانشستر يونايتد', 'موناكو'], correctIndex: 0, hint: 'The Invincibles 2004! 🏆' },
  { id: 9, coach: 'بوكيتينو', correctClub: 'توتنهام', options: ['باريس سان جيرمان', 'تشيلسي', 'ساوثهامبتون', 'توتنهام'], correctIndex: 3, hint: 'نهائي دوري الأبطال 2019!' },
  { id: 10, coach: 'هانسي فليك', correctClub: 'بايرن ميونخ', options: ['برشلونة', 'بايرن ميونخ', 'دورتموند', 'لايبزيغ'], correctIndex: 1, hint: 'سداسية 2020! 🏆' },
  { id: 11, coach: 'توماس توخيل', correctClub: 'تشيلسي', options: ['باريس سان جيرمان', 'تشيلسي', 'بايرن ميونخ', 'دورتموند'], correctIndex: 1, hint: 'فاز بدوري الأبطال 2021! 🏆' },
  { id: 12, coach: 'لويس إنريكي', correctClub: 'برشلونة', options: ['ريال مدريد', 'برشلونة', 'باريس سان جيرمان', 'روما'], correctIndex: 1, hint: 'الثلاثية مع MSN 2015! ⚽' },
  { id: 13, coach: 'ميكيل أرتيتا', correctClub: 'أرسنال', options: ['مانشستر سيتي', 'إيفرتون', 'أرسنال', 'ريال سوسيداد'], correctIndex: 2, hint: 'المدفعجية الجدد! 💣' },
  { id: 14, coach: 'رافائيل بينيتيز', correctClub: 'ليفربول', options: ['تشيلسي', 'ريال مدريد', 'ليفربول', 'نابولي'], correctIndex: 2, hint: 'معجزة إسطنبول 2005! 🏆' },
  { id: 15, coach: 'أنطونيو كونتي', correctClub: 'يوفنتوس', options: ['يوفنتوس', 'تشيلسي', 'إنتر ميلان', 'نابولي'], correctIndex: 0, hint: '3 سكوديتو متتالية! 🇮🇹' },
];
