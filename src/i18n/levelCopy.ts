import type { Locale } from './I18nProvider';

const titlesEn: Record<number, string> = {
  1: 'Opening Signal', 2: 'Crest Under Pressure', 3: 'Originality Check', 4: 'Club Cipher',
  5: 'European Nights Ledger', 6: 'Hairline Read', 7: 'Shape of the XI', 8: 'Player Profile: First Clue',
  9: 'The Missing Transfer', 10: 'Former Shirt Search', 11: 'Touchline Connection', 12: 'Career Coordinates',
  13: 'Name in Pieces', 14: 'Manager in Pieces', 15: 'Groundskeeper’s Clue', 16: 'Academy Spark',
  17: 'First Clásico File', 18: 'Home Ground Audit', 19: 'Trophy Cabinet Clues', 20: 'Name on the Input',
  21: 'Line-up Gap', 22: 'Crest Time Capsule', 23: 'Young Star, Big Career', 24: 'Flag to Football',
  25: 'National XI Puzzle', 26: 'Number on the Back', 27: 'Legend’s Club Trail', 28: 'Foundation Date Decode',
  29: 'Domestic Route Map', 30: 'Two Stars, One Stop', 31: 'Was He There?', 32: 'Transfer Trailhead',
  33: 'Three Clues, One Club', 34: 'Manager’s Old Address', 35: 'Colours on the Kit', 36: 'City Club Compass',
  37: 'Memory Flash: Elite', 38: 'Reveal the Player', 39: 'Former Team-mate Link', 40: 'Career Across Borders',
  41: 'Ten-second Touch', 42: 'Three-step Dossier', 43: 'Clásico: Quick Break', 44: 'The Roar Test',
  45: 'Clásico: Final Whistle', 96: 'Forecast Lens', 97: 'Value Curve', 98: 'Order of Greatness',
  99: 'The Draft Room', 100: 'Hall of Champions',
};

const titlesAr: Record<number, string> = {
  1: 'إشارة الانطلاق', 2: 'الشعار تحت الضغط', 3: 'اختبار الأصالة', 4: 'شفرة النادي',
  5: 'سجل الليالي الأوروبية', 6: 'قراءة قصة الشعر', 7: 'ملامح التشكيلة', 8: 'ملف لاعب: الدليل الأول',
  9: 'الانتقال المفقود', 10: 'أثر القميص السابق', 11: 'صلة على خط التماس', 12: 'إحداثيات المسيرة',
  13: 'اسم من حروف مبعثرة', 14: 'مدرب من حروف مبعثرة', 15: 'دليل من أرض الملعب', 16: 'شرارة الأكاديمية',
  17: 'ملف الكلاسيكو الأول', 18: 'تفتيش معقل الفريق', 19: 'أدلة خزانة الألقاب', 20: 'اكتب اسم اللاعب',
  21: 'فراغ في التشكيلة', 22: 'كبسولة الشعارات الزمنية', 23: 'نجم صغير ومسيرة كبيرة', 24: 'من العلم إلى المنتخب',
  25: 'لغز التشكيلة الدولية', 26: 'الرقم خلف القميص', 27: 'أثر أساطير النادي', 28: 'فك سنة التأسيس',
  29: 'خريطة المسيرة المحلية', 30: 'نجمان ومحطة واحدة', 31: 'هل لعب هنا؟', 32: 'بداية أثر الانتقال',
  33: 'ثلاثة أدلة ونادٍ واحد', 34: 'محطة المدرب السابقة', 35: 'ألوان القميص', 36: 'بوصلة أندية المدينة',
  37: 'ومضة الذاكرة: النخبة', 38: 'اكشف اللاعب', 39: 'صلة زميل سابق', 40: 'مسيرة عبر الحدود',
  41: 'لمسة العشر ثوانٍ', 42: 'ملف بثلاث قرائن', 43: 'الكلاسيكو: هجمة خاطفة', 44: 'اختبار هدير المدرجات',
  45: 'الكلاسيكو: صافرة الحسم', 96: 'عدسة التوقع', 97: 'منحنى القيمة', 98: 'ترتيب العظماء',
  99: 'غرفة اختيار التشكيلة', 100: 'قاعة الأبطال',
};

const pad = (value: number) => String(value).padStart(2, '0');
for (let id = 46; id <= 55; id += 1) {
  titlesEn[id] = `Scout File ${pad(id - 45)}`;
  titlesAr[id] = `ملف الكشاف ${pad(id - 45)}`;
}
for (let id = 56; id <= 60; id += 1) {
  titlesEn[id] = `Touchline File ${pad(id - 55)}`;
  titlesAr[id] = `ملف خط التماس ${pad(id - 55)}`;
}
for (let id = 61; id <= 65; id += 1) {
  titlesEn[id] = `Badge File ${pad(id - 60)}`;
  titlesAr[id] = `ملف الشعار ${pad(id - 60)}`;
}
for (let id = 66; id <= 75; id += 1) {
  titlesEn[id] = `Rapid Recall ${pad(id - 65)}`;
  titlesAr[id] = `استدعاء خاطف ${pad(id - 65)}`;
}
for (let id = 76; id <= 85; id += 1) {
  titlesEn[id] = `The Bid Board ${pad(id - 75)}`;
  titlesAr[id] = `لوحة المزايدة ${pad(id - 75)}`;
}
for (let id = 86; id <= 95; id += 1) {
  titlesEn[id] = `Countdown Desk ${pad(id - 85)}`;
  titlesAr[id] = `مكتب العد التنازلي ${pad(id - 85)}`;
}

export function getLevelTitle(levelId: number, arabicTitle: string, locale: Locale) {
  const localizedTitle = (locale === 'ar' ? titlesAr : titlesEn)[levelId];
  return localizedTitle ?? (locale === 'ar' ? arabicTitle : `Stage ${levelId}`);
}

export function getLevelDescription(levelId: number, arabicDescription: string, locale: Locale) {
  if (locale === 'ar') return arabicDescription;
  if (levelId === 29) return 'Identify the player’s club from four choices in the same domestic league.';
  if (levelId >= 46 && levelId <= 65) return 'Ask smart yes-or-no questions and narrow down the hidden answer.';
  if (levelId >= 66 && levelId <= 75) return 'Name as many correct answers as you can before time runs out.';
  if (levelId >= 76 && levelId <= 85) return 'Estimate how many answers you can give, then prove it.';
  if (levelId >= 86 && levelId <= 95) return 'Beat the clock to earn a one-time 50/50 assist.';
  const descriptions: Record<number, string> = {
    1: 'Study the crest and choose the club.', 2: 'Recognize the crest before it disappears.',
    3: 'Compare the details and find the authentic crest.', 4: 'Use the clues to identify the club.',
    5: 'Test your Champions League knowledge.', 6: 'Identify the player from a hairstyle.',
    7: 'Read the formation and name the team.', 8: 'Use the clues to identify the player.',
    9: 'Find the player who never represented the club.', 10: 'Choose a player who represented the club.',
    11: 'Match a coach with a club they managed.', 12: 'Identify the player from their career path.',
    13: 'Rearrange the letters to reveal the name.', 14: 'Unscramble a coach’s name.',
    15: 'Identify the stadium from its clues.', 16: 'A mixed round of memorable football moments.',
    17: 'Take on an El Clásico knowledge round.', 18: 'Match a stadium to its home club.',
    19: 'Identify the coach from their achievements.', 20: 'Type the correct player name.',
    21: 'Complete the missing place in the line-up.', 22: 'Recognize classic club crests.',
    23: 'Identify a player from a childhood photo.', 24: 'Name the national team.',
    25: 'Identify a nation from its line-up.', 26: 'Match a shirt number to its player.',
    27: 'Identify a club from its former stars.', 28: 'Match the club with its founding year.',
    30: 'Find the club shared by two players.', 31: 'Decide whether the player represented the club.',
    32: 'Trace a transfer to its previous club.', 33: 'Solve three clues to reveal the club.',
    34: 'Name a club managed by the coach.', 35: 'Identify a club from its kit colours.',
    36: 'Match a city with one of its clubs.', 37: 'Remember the names shown in a flash.',
    38: 'Identify the player as the image is revealed.', 39: 'Find a player who shared a club with the star.',
    40: 'Follow a career across several clubs.', 41: 'Answer before the short timer ends.',
    42: 'Guess the player from three clues.', 43: 'A fast El Clásico player challenge.',
    44: 'Stay calm as clues appear under pressure.', 45: 'A mixed final quiz on El Clásico.',
    96: 'Watch a short clip and predict what happens next.', 97: 'Compare a player’s historical and current market value.',
    98: 'Put clubs or players in the requested order.', 99: 'Build a squad and make tactical decisions.',
    100: 'Celebrate completing the challenge.',
  };
  return descriptions[levelId] ?? `Take on football challenge ${levelId}.`;
}
