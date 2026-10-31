export interface CityClubQuestion {
  id: number;
  city: string;
  country: string;
  countryFlag: string;
  correctClubs: string[]; // multiple correct answers
  options: string[];
  correctIndices: number[]; // indices of correct options
}

export const cityClubQuestions: CityClubQuestion[] = [
  { id: 1, city: 'مانشستر', country: 'إنجلترا', countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', correctClubs: ['مانشستر يونايتد', 'مانشستر سيتي'], options: ['مانشستر يونايتد', 'ليفربول', 'مانشستر سيتي', 'تشيلسي'], correctIndices: [0, 2] },
  { id: 2, city: 'مدريد', country: 'إسبانيا', countryFlag: '🇪🇸', correctClubs: ['ريال مدريد', 'أتلتيكو مدريد'], options: ['برشلونة', 'ريال مدريد', 'إشبيلية', 'أتلتيكو مدريد'], correctIndices: [1, 3] },
  { id: 3, city: 'لندن', country: 'إنجلترا', countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', correctClubs: ['أرسنال', 'تشيلسي', 'توتنهام'], options: ['أرسنال', 'ليفربول', 'تشيلسي', 'مانشستر يونايتد'], correctIndices: [0, 2] },
  { id: 4, city: 'ميلانو', country: 'إيطاليا', countryFlag: '🇮🇹', correctClubs: ['ميلان', 'إنتر ميلان'], options: ['يوفنتوس', 'ميلان', 'إنتر ميلان', 'نابولي'], correctIndices: [1, 2] },
  { id: 5, city: 'ليفربول', country: 'إنجلترا', countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', correctClubs: ['ليفربول'], options: ['ليفربول', 'إيفرتون', 'مانشستر يونايتد', 'أرسنال'], correctIndices: [0] },
  { id: 6, city: 'برشلونة', country: 'إسبانيا', countryFlag: '🇪🇸', correctClubs: ['برشلونة'], options: ['ريال مدريد', 'أتلتيكو مدريد', 'برشلونة', 'إشبيلية'], correctIndices: [2] },
  { id: 7, city: 'ميونخ', country: 'ألمانيا', countryFlag: '🇩🇪', correctClubs: ['بايرن ميونخ'], options: ['بايرن ميونخ', 'دورتموند', 'لايبزيغ', 'شالكه'], correctIndices: [0] },
  { id: 8, city: 'تورينو', country: 'إيطاليا', countryFlag: '🇮🇹', correctClubs: ['يوفنتوس'], options: ['ميلان', 'إنتر ميلان', 'روما', 'يوفنتوس'], correctIndices: [3] },
  { id: 9, city: 'باريس', country: 'فرنسا', countryFlag: '🇫🇷', correctClubs: ['باريس سان جيرمان'], options: ['ليون', 'باريس سان جيرمان', 'مارسيليا', 'موناكو'], correctIndices: [1] },
  { id: 10, city: 'الرياض', country: 'السعودية', countryFlag: '🇸🇦', correctClubs: ['الهلال', 'النصر'], options: ['الهلال', 'الاتحاد', 'النصر', 'الأهلي السعودي'], correctIndices: [0, 2] },
  { id: 11, city: 'دورتموند', country: 'ألمانيا', countryFlag: '🇩🇪', correctClubs: ['بوروسيا دورتموند'], options: ['بايرن ميونخ', 'بوروسيا دورتموند', 'شالكه', 'لايبزيغ'], correctIndices: [1] },
  { id: 12, city: 'روما', country: 'إيطاليا', countryFlag: '🇮🇹', correctClubs: ['روما'], options: ['ميلان', 'نابولي', 'روما', 'يوفنتوس'], correctIndices: [2] },
  { id: 13, city: 'أمستردام', country: 'هولندا', countryFlag: '🇳🇱', correctClubs: ['أياكس'], options: ['فينورد', 'أياكس', 'آيندهوفن', 'دورتموند'], correctIndices: [1] },
  { id: 14, city: 'جدة', country: 'السعودية', countryFlag: '🇸🇦', correctClubs: ['الأهلي السعودي', 'الاتحاد'], options: ['الهلال', 'الأهلي السعودي', 'الاتحاد', 'النصر'], correctIndices: [1, 2] },
  { id: 15, city: 'إشبيلية', country: 'إسبانيا', countryFlag: '🇪🇸', correctClubs: ['إشبيلية'], options: ['برشلونة', 'أتلتيكو مدريد', 'إشبيلية', 'ريال مدريد'], correctIndices: [2] },
];
