import type { LeagueId } from './leagues';

export interface PlayerClubQuestion {
  id: number;
  playerNameAr: string;
  playerNameEn: string;
  leagueId: LeagueId;
  correctClubId: string;
  hintAr: string;
  hintEn: string;
}

// Every question is tied to one league. Distractors are generated only from that league's season pool.
export const playerClubQuestions: PlayerClubQuestion[] = [
  { id: 1, playerNameAr: 'زلاتان إبراهيموفيتش', playerNameEn: 'Zlatan Ibrahimović', leagueId: 'serie-a', correctClubId: 'milan', hintAr: 'عاد إلى ميلان في نهاية مسيرته الإيطالية.', hintEn: 'He returned to Milan late in his Italian career.' },
  { id: 2, playerNameAr: 'فرانشيسكو توتي', playerNameEn: 'Francesco Totti', leagueId: 'serie-a', correctClubId: 'roma', hintAr: 'قضى مسيرته كلها تقريباً في العاصمة.', hintEn: 'He spent almost his entire career in the capital.' },
  { id: 3, playerNameAr: 'لاوتارو مارتينيز', playerNameEn: 'Lautaro Martínez', leagueId: 'serie-a', correctClubId: 'inter', hintAr: 'يحمل شارة قيادة فريق أزرق وأسود في ميلانو.', hintEn: 'He captains a blue-and-black side from Milan.' },
  { id: 4, playerNameAr: 'باولو ديبالا', playerNameEn: 'Paulo Dybala', leagueId: 'serie-a', correctClubId: 'juventus', hintAr: 'لُقّب بالجوهرة خلال سنواته في تورينو.', hintEn: 'He was nicknamed La Joya during his years in Turin.' },
  { id: 5, playerNameAr: 'أندريا بيرلو', playerNameEn: 'Andrea Pirlo', leagueId: 'serie-a', correctClubId: 'juventus', hintAr: 'انتقل من ميلانو إلى تورينو في 2011.', hintEn: 'He moved from Milan to Turin in 2011.' },
  { id: 6, playerNameAr: 'كاكا', playerNameEn: 'Kaká', leagueId: 'serie-a', correctClubId: 'milan', hintAr: 'فاز بالكرة الذهبية عام 2007.', hintEn: 'He won the Ballon d’Or in 2007.' },
  { id: 7, playerNameAr: 'تييري هنري', playerNameEn: 'Thierry Henry', leagueId: 'premier-league', correctClubId: 'arsenal', hintAr: 'أصبح أحد أبرز الهدافين في تاريخ النادي اللندني.', hintEn: 'He became one of the London club’s greatest scorers.' },
  { id: 8, playerNameAr: 'ستيفن جيرارد', playerNameEn: 'Steven Gerrard', leagueId: 'premier-league', correctClubId: 'liverpool', hintAr: 'قائد ارتبط اسمه بمدينة ليفربول.', hintEn: 'The long-time captain was synonymous with Liverpool.' },
  { id: 9, playerNameAr: 'واين روني', playerNameEn: 'Wayne Rooney', leagueId: 'premier-league', correctClubId: 'man-utd', hintAr: 'سجل رقماً قياسياً تهديفياً مع نادٍ من مانشستر.', hintEn: 'He became the Manchester club’s record scorer.' },
  { id: 10, playerNameAr: 'فرانك لامبارد', playerNameEn: 'Frank Lampard', leagueId: 'premier-league', correctClubId: 'chelsea', hintAr: 'لاعب وسط هداف من الجيل الذهبي للنادي الأزرق.', hintEn: 'A prolific midfielder from the blue club’s golden era.' },
  { id: 11, playerNameAr: 'كيفن دي بروين', playerNameEn: 'Kevin De Bruyne', leagueId: 'premier-league', correctClubId: 'man-city', hintAr: 'صانع ألعاب بلجيكي تألق في مانشستر السماوي.', hintEn: 'The Belgian playmaker starred in sky blue in Manchester.' },
  { id: 12, playerNameAr: 'غاريث بيل', playerNameEn: 'Gareth Bale', leagueId: 'premier-league', correctClubId: 'tottenham', hintAr: 'جناح ويلزي عاد إلى شمال لندن بعد تجربة في إسبانيا.', hintEn: 'The Welsh winger returned to north London after Spain.' },
  { id: 13, playerNameAr: 'كريم بنزيما', playerNameEn: 'Karim Benzema', leagueId: 'la-liga', correctClubId: 'real-madrid', hintAr: 'مهاجم فرنسي حمل الرقم 9 في العاصمة.', hintEn: 'The French striker wore number 9 in the capital.' },
  { id: 14, playerNameAr: 'أندريس إنييستا', playerNameEn: 'Andrés Iniesta', leagueId: 'la-liga', correctClubId: 'barcelona', hintAr: 'صانع ألعاب سجل هدف الفوز لإسبانيا في نهائي 2010.', hintEn: 'The midfielder scored Spain’s winner in the 2010 final.' },
  { id: 15, playerNameAr: 'أنطوان غريزمان', playerNameEn: 'Antoine Griezmann', leagueId: 'la-liga', correctClubId: 'atletico', hintAr: 'مهاجم فرنسي تألق في ملعب ميتروبوليتانو.', hintEn: 'The French forward starred at the Metropolitano.' },
  { id: 16, playerNameAr: 'دافيد فيا', playerNameEn: 'David Villa', leagueId: 'la-liga', correctClubId: 'valencia', hintAr: 'مهاجم إسباني سجل كثيراً قبل انتقاله إلى برشلونة.', hintEn: 'The Spanish striker scored freely before moving to Barcelona.' },
  { id: 17, playerNameAr: 'تشافي هيرنانديز', playerNameEn: 'Xavi Hernández', leagueId: 'la-liga', correctClubId: 'barcelona', hintAr: 'قائد وسط اشتهر بتمريراته القصيرة الدقيقة.', hintEn: 'The midfield leader was known for precise short passing.' },
  { id: 18, playerNameAr: 'رونالدينيو', playerNameEn: 'Ronaldinho', leagueId: 'la-liga', correctClubId: 'barcelona', hintAr: 'نجم برازيلي ارتدى الرقم 10 في كتالونيا.', hintEn: 'The Brazilian star wore number 10 in Catalonia.' },
  { id: 19, playerNameAr: 'توماس مولر', playerNameEn: 'Thomas Müller', leagueId: 'bundesliga', correctClubId: 'bayern', hintAr: 'لاعب ألماني ارتبطت مسيرته بفريق بافاريا.', hintEn: 'The German forward spent his career with the Bavarian side.' },
  { id: 20, playerNameAr: 'ماركو رويس', playerNameEn: 'Marco Reus', leagueId: 'bundesliga', correctClubId: 'dortmund', hintAr: 'قائد مهاجم ارتدى الأصفر والأسود سنوات طويلة.', hintEn: 'The captain spent many years in yellow and black.' },
  { id: 21, playerNameAr: 'هيونغ مين سون', playerNameEn: 'Heung-min Son', leagueId: 'bundesliga', correctClubId: 'hamburg', hintAr: 'بدأ مغامرته الألمانية مع نادٍ من هامبورغ.', hintEn: 'He began his German career with a club from Hamburg.' },
  { id: 22, playerNameAr: 'آريين روبن', playerNameEn: 'Arjen Robben', leagueId: 'bundesliga', correctClubId: 'bayern', hintAr: 'جناح هولندي اشتهر بالانطلاق من اليمين والتسديد لليسار.', hintEn: 'The Dutch winger was known for cutting inside from the right.' },
  { id: 23, playerNameAr: 'كيليان مبابي', playerNameEn: 'Kylian Mbappé', leagueId: 'ligue-1', correctClubId: 'psg', hintAr: 'مهاجم فرنسي لمع في باريس قبل انتقاله إلى إسبانيا.', hintEn: 'The French forward starred in Paris before moving to Spain.' },
  { id: 24, playerNameAr: 'ديدييه دروغبا', playerNameEn: 'Didier Drogba', leagueId: 'ligue-1', correctClubId: 'marseille', hintAr: 'لعب لموسم واحد في جنوب فرنسا قبل تشيلسي.', hintEn: 'He spent one season in southern France before Chelsea.' },
  { id: 25, playerNameAr: 'جونينيو بيرنامبوكانو', playerNameEn: 'Juninho Pernambucano', leagueId: 'ligue-1', correctClubId: 'lyon', hintAr: 'سجل من الركلات الحرة مع فريق سيطر على فرنسا.', hintEn: 'He scored free kicks for a side that dominated France.' },
  { id: 26, playerNameAr: 'إيدين هازارد', playerNameEn: 'Eden Hazard', leagueId: 'ligue-1', correctClubId: 'lille', hintAr: 'فاز بالدوري الفرنسي قبل انتقاله إلى تشيلسي.', hintEn: 'He won the French league before joining Chelsea.' },
  { id: 27, playerNameAr: 'كريستيانو رونالدو', playerNameEn: 'Cristiano Ronaldo', leagueId: 'saudi-pro-league', correctClubId: 'al-nassr', hintAr: 'انضم إلى فريق يرتدي الأصفر في الرياض.', hintEn: 'He joined the yellow side from Riyadh.' },
  { id: 28, playerNameAr: 'كريم بنزيما', playerNameEn: 'Karim Benzema', leagueId: 'saudi-pro-league', correctClubId: 'al-ittihad', hintAr: 'انضم إلى فريق من جدة بعد سنواته في مدريد.', hintEn: 'He joined a Jeddah club after his years in Madrid.' },
  { id: 29, playerNameAr: 'سالم الدوسري', playerNameEn: 'Salem Al-Dawsari', leagueId: 'saudi-pro-league', correctClubId: 'al-hilal', hintAr: 'جناح سعودي سجل هدفاً شهيراً أمام الأرجنتين في كأس العالم.', hintEn: 'The Saudi winger scored a famous World Cup goal against Argentina.' },
  { id: 30, playerNameAr: 'رياض محرز', playerNameEn: 'Riyad Mahrez', leagueId: 'saudi-pro-league', correctClubId: 'al-ahli', hintAr: 'الجناح الجزائري انتقل إلى جدة بعد فوزه بدوري الأبطال.', hintEn: 'The Algerian winger moved to Jeddah after winning the Champions League.' },
  { id: 31, playerNameAr: 'أحمد فتحي', playerNameEn: 'Ahmed Fathy', leagueId: 'egyptian-premier-league', correctClubId: 'al-ahly-eg', hintAr: 'ظهير أيمن مصري فاز بألقاب كثيرة مع الأهلي.', hintEn: 'The Egyptian right-back won many titles with Al Ahly.' },
  { id: 32, playerNameAr: 'محمد أبو تريكة', playerNameEn: 'Mohamed Aboutrika', leagueId: 'egyptian-premier-league', correctClubId: 'al-ahly-eg', hintAr: 'صانع ألعاب تُوّج بألقاب قارية كثيرة مع نادي القاهرة.', hintEn: 'The playmaker won many continental titles with the Cairo club.' },
  { id: 33, playerNameAr: 'حازم إمام', playerNameEn: 'Hazem Emam', leagueId: 'egyptian-premier-league', correctClubId: 'zamalek', hintAr: 'جناح مصري ارتبط اسمه بالفارس الأبيض.', hintEn: 'The Egyptian winger was closely associated with the White Knights.' },
  { id: 34, playerNameAr: 'عبد الله السعيد', playerNameEn: 'Abdallah El Said', leagueId: 'egyptian-premier-league', correctClubId: 'pyramids', hintAr: 'صانع ألعاب مصري لعب مع فريق بيراميدز.', hintEn: 'The Egyptian playmaker represented Pyramids.' },
];
