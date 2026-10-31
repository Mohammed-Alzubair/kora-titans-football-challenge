export interface JerseyColorQuestion {
  id: number;
  colorDescription: string;
  colorEmoji: string;
  correctClub: string;
  options: string[];
  correctIndex: number;
}

export const jerseyColorQuestions: JerseyColorQuestion[] = [
  { id: 1, colorDescription: 'قميصه أحمر بالكامل', colorEmoji: '🔴', correctClub: 'ليفربول', options: ['ليفربول', 'تشيلسي', 'إنتر ميلان', 'مانشستر سيتي'], correctIndex: 0 },
  { id: 2, colorDescription: 'قميصه أبيض بالكامل', colorEmoji: '⚪', correctClub: 'ريال مدريد', options: ['برشلونة', 'ريال مدريد', 'بايرن ميونخ', 'ليفربول'], correctIndex: 1 },
  { id: 3, colorDescription: 'قميصه أزرق غامق وأحمر (مخطط)', colorEmoji: '🔵🔴', correctClub: 'برشلونة', options: ['أتلتيكو مدريد', 'باريس سان جيرمان', 'برشلونة', 'ميلان'], correctIndex: 2 },
  { id: 4, colorDescription: 'قميصه أسود وأبيض مخطط عمودي', colorEmoji: '⚫⚪', correctClub: 'يوفنتوس', options: ['يوفنتوس', 'نيوكاسل', 'ريال مدريد', 'توتنهام'], correctIndex: 0 },
  { id: 5, colorDescription: 'قميصه أحمر وأسود مخطط عمودي', colorEmoji: '🔴⚫', correctClub: 'ميلان', options: ['مانشستر يونايتد', 'ميلان', 'فلامينغو', 'أتلتيكو مدريد'], correctIndex: 1 },
  { id: 6, colorDescription: 'قميصه أزرق سماوي', colorEmoji: '🩵', correctClub: 'مانشستر سيتي', options: ['تشيلسي', 'مانشستر سيتي', 'نابولي', 'لاتسيو'], correctIndex: 1 },
  { id: 7, colorDescription: 'قميصه أزرق غامق (كحلي)', colorEmoji: '🔵', correctClub: 'تشيلسي', options: ['إنتر ميلان', 'باريس سان جيرمان', 'تشيلسي', 'برشلونة'], correctIndex: 2 },
  { id: 8, colorDescription: 'قميصه أحمر وأبيض مخطط عمودي', colorEmoji: '🔴⚪', correctClub: 'أتلتيكو مدريد', options: ['ميلان', 'أتلتيكو مدريد', 'أرسنال', 'موناكو'], correctIndex: 1 },
  { id: 9, colorDescription: 'قميصه أصفر بالكامل', colorEmoji: '🟡', correctClub: 'بوروسيا دورتموند', options: ['برشلونة', 'النصر', 'بوروسيا دورتموند', 'فياريال'], correctIndex: 2 },
  { id: 10, colorDescription: 'قميصه أزرق وأسود مخطط عمودي', colorEmoji: '🔵⚫', correctClub: 'إنتر ميلان', options: ['أتالانتا', 'إنتر ميلان', 'تشيلسي', 'بروج'], correctIndex: 1 },
  { id: 11, colorDescription: 'قميصه أحمر مع أكمام بيضاء', colorEmoji: '🔴⚪', correctClub: 'أرسنال', options: ['أرسنال', 'ليفربول', 'مانشستر يونايتد', 'أتلتيكو مدريد'], correctIndex: 0 },
  { id: 12, colorDescription: 'قميصه أحمر بالكامل (ألمانيا)', colorEmoji: '🔴🇩🇪', correctClub: 'بايرن ميونخ', options: ['لايبزيغ', 'بايرن ميونخ', 'فرايبورغ', 'ليفركوزن'], correctIndex: 1 },
  { id: 13, colorDescription: 'قميصه أبيض مع خط أزرق غامق وأحمر', colorEmoji: '⚪🔵🔴', correctClub: 'باريس سان جيرمان', options: ['ليون', 'مارسيليا', 'باريس سان جيرمان', 'موناكو'], correctIndex: 2 },
  { id: 14, colorDescription: 'قميصه أبيض بالكامل (إنجلترا)', colorEmoji: '⚪🏴󠁧󠁢󠁥󠁮󠁧󠁿', correctClub: 'توتنهام', options: ['ليدز يونايتد', 'توتنهام', 'ريال مدريد', 'سوانزي'], correctIndex: 1 },
  { id: 15, colorDescription: 'قميصه أزرق سماوي (السعودية)', colorEmoji: '🩵🇸🇦', correctClub: 'الهلال', options: ['النصر', 'الهلال', 'الأهلي السعودي', 'الاتحاد'], correctIndex: 1 },
];
