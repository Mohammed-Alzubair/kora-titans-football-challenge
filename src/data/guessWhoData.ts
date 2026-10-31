import messiImg from '@/assets/players/messi.jpg';
import ronaldoImg from '@/assets/players/ronaldo.jpg';
import neymarImg from '@/assets/players/neymar.jpg';
import mbappeImg from '@/assets/players/mbappe.jpg';
import haalandImg from '@/assets/players/haaland.jpg';
import salahImg from '@/assets/players/salah.jpg';
import bellinghamImg from '@/assets/players/bellingham.jpg';
import modricImg from '@/assets/players/lewandowski.jpg';
import ronaldinhoImg from '@/assets/players/ronaldinho.jpg';
import zidaneImg from '@/assets/players/zidane.jpg';
import guardiolaImg from '@/assets/coaches/guardiola.jpg';
import ancelottiImg from '@/assets/coaches/ancelotti.jpg';
import kloppImg from '@/assets/coaches/klopp.jpg';
import simeoneImg from '@/assets/coaches/simeone.jpg';

export interface GuessWhoEntity {
  id: string;
  name: string;
  type: 'player' | 'coach' | 'club';
  properties: Record<string, boolean>;
  hint: string;
  wrongOptions: string[];
  image?: string;
}

export interface GuessWhoQuestion {
  id: string;
  text: string;
  propertyKey: string;
  forTypes: ('player' | 'coach' | 'club')[];
}

// ===== نظام الأسئلة الحرة =====
// كل سؤال يحتوي على كلمات مفتاحية + propertyKey
// عندما يكتب المستخدم سؤال، نبحث عن أفضل تطابق بالكلمات المفتاحية

export interface FreeQuestion {
  keywords: string[];
  propertyKey: string;
  displayText: string; // النص المعروض كتأكيد
}

export const freeQuestions: FreeQuestion[] = [
  // === الدوريات والبلدان ===
  { keywords: ['إسبانيا', 'الليغا', 'ليغا', 'الدوري الإسباني', 'اسبانيا'], propertyKey: 'playsInSpain', displayText: 'هل يلعب في إسبانيا؟' },
  { keywords: ['إنجلترا', 'انجلترا', 'البريميرليغ', 'بريميرليغ', 'الدوري الإنجليزي', 'انكلترا'], propertyKey: 'playsInEngland', displayText: 'هل يلعب في إنجلترا؟' },
  { keywords: ['فرنسا', 'الدوري الفرنسي', 'ليغ 1', 'ليغ١'], propertyKey: 'playsInFrance', displayText: 'هل يلعب في فرنسا؟' },
  { keywords: ['إيطاليا', 'ايطاليا', 'السيري', 'سيري أ', 'الدوري الإيطالي', 'الكالتشيو'], propertyKey: 'playsInItaly', displayText: 'هل يلعب في إيطاليا؟' },
  { keywords: ['ألمانيا', 'المانيا', 'البوندسليغا', 'بوندسليغا', 'الدوري الألماني'], propertyKey: 'playsInGermany', displayText: 'هل يلعب في ألمانيا؟' },
  { keywords: ['الخمس', 'الكبرى', 'الدوريات الكبرى', 'الخمس الكبار', 'أوروبا', 'اوروبا', 'دوري أوروبي'], propertyKey: 'playsInTop5League', displayText: 'هل يلعب في الدوريات الخمس الكبرى؟' },
  { keywords: ['السعودية', 'الدوري السعودي', 'روشن'], propertyKey: 'playsInSaudiArabia', displayText: 'هل يلعب في السعودية؟' },
  { keywords: ['أمريكا', 'امريكا', 'MLS', 'الدوري الأمريكي'], propertyKey: 'playsInUSA', displayText: 'هل يلعب في أمريكا؟' },

  // === المراكز ===
  { keywords: ['مهاجم', 'هداف', 'سنتر فورد', 'فورورد'], propertyKey: 'isForward', displayText: 'هل هو مهاجم؟' },
  { keywords: ['وسط', 'خط وسط', 'ميدفيلدر', 'بلاي ميكر', 'صانع ألعاب', 'صانع العاب'], propertyKey: 'isMidfielder', displayText: 'هل هو لاعب وسط؟' },
  { keywords: ['مدافع', 'دفاع', 'ظهير', 'سنتر باك', 'ستوبر'], propertyKey: 'isDefender', displayText: 'هل هو مدافع؟' },
  { keywords: ['حارس', 'حارس مرمى', 'جول كيبر', 'قولكيبر'], propertyKey: 'isGoalkeeper', displayText: 'هل هو حارس مرمى؟' },
  { keywords: ['جناح', 'وينغر', 'جناح أيمن', 'جناح أيسر', 'على الجنب'], propertyKey: 'isWinger', displayText: 'هل هو جناح؟' },

  // === الجنسيات ===
  { keywords: ['برازيلي', 'البرازيل', 'برازيل'], propertyKey: 'isBrazilian', displayText: 'هل هو برازيلي؟' },
  { keywords: ['أرجنتيني', 'ارجنتيني', 'الأرجنتين', 'ارجنتين'], propertyKey: 'isArgentine', displayText: 'هل هو أرجنتيني؟' },
  { keywords: ['فرنسي', 'فرنسا الجنسية'], propertyKey: 'isFrenchNationality', displayText: 'هل هو فرنسي؟' },
  { keywords: ['برتغالي', 'البرتغال', 'برتغال'], propertyKey: 'isPortuguese', displayText: 'هل هو برتغالي؟' },
  { keywords: ['إسباني', 'اسباني'], propertyKey: 'isSpanishNat', displayText: 'هل هو إسباني؟' },
  { keywords: ['ألماني', 'الماني'], propertyKey: 'isGermanNat', displayText: 'هل هو ألماني؟' },
  { keywords: ['إنجليزي', 'انجليزي', 'بريطاني'], propertyKey: 'isEnglish', displayText: 'هل هو إنجليزي؟' },
  { keywords: ['مصري', 'مصر'], propertyKey: 'isEgyptian', displayText: 'هل هو مصري؟' },
  { keywords: ['كرواتي', 'كرواتيا'], propertyKey: 'isCroatian', displayText: 'هل هو كرواتي؟' },
  { keywords: ['نرويجي', 'النرويج', 'نرويج'], propertyKey: 'isNorwegian', displayText: 'هل هو نرويجي؟' },
  { keywords: ['بولندي', 'بولندا'], propertyKey: 'isPolish', displayText: 'هل هو بولندي؟' },
  { keywords: ['أوروبي', 'اوروبي', 'من أوروبا'], propertyKey: 'isEuropean', displayText: 'هل هو أوروبي؟' },
  { keywords: ['أفريقي', 'افريقي', 'من أفريقيا', 'افريقيا'], propertyKey: 'isAfrican', displayText: 'هل هو أفريقي؟' },
  { keywords: ['أمريكا الجنوبية', 'من أمريكا الجنوبية', 'لاتيني'], propertyKey: 'isSouthAmerican', displayText: 'هل هو من أمريكا الجنوبية؟' },
  { keywords: ['عربي', 'عرب'], propertyKey: 'isArab', displayText: 'هل هو عربي؟' },
  { keywords: ['هولندي', 'هولندا'], propertyKey: 'isDutch', displayText: 'هل هو هولندي؟' },
  { keywords: ['إيطالي', 'ايطالي'], propertyKey: 'isItalianNat', displayText: 'هل هو إيطالي؟' },

  // === الأندية ===
  { keywords: ['ريال مدريد', 'الريال', 'مدريد الملكي'], propertyKey: 'playedForRealMadrid', displayText: 'هل لعب لريال مدريد؟' },
  { keywords: ['برشلونة', 'البارسا', 'بارسا', 'بارشا'], propertyKey: 'playedForBarcelona', displayText: 'هل لعب لبرشلونة؟' },
  { keywords: ['مانشستر يونايتد', 'اليونايتد', 'يونايتد', 'الشياطين الحمر'], propertyKey: 'playedForManUtd', displayText: 'هل لعب لمانشستر يونايتد؟' },
  { keywords: ['ليفربول'], propertyKey: 'playedForLiverpool', displayText: 'هل لعب لليفربول؟' },
  { keywords: ['بايرن', 'بايرن ميونخ', 'ميونخ'], propertyKey: 'playedForBayern', displayText: 'هل لعب لبايرن ميونخ؟' },
  { keywords: ['تشيلسي', 'البلوز'], propertyKey: 'playedForChelsea', displayText: 'هل لعب لتشيلسي؟' },
  { keywords: ['يوفنتوس', 'اليوفي', 'السيدة العجوز'], propertyKey: 'playedForJuventus', displayText: 'هل لعب ليوفنتوس؟' },
  { keywords: ['باريس', 'باريس سان جيرمان', 'سان جيرمان', 'PSG'], propertyKey: 'playedForPSG', displayText: 'هل لعب لباريس سان جيرمان؟' },
  { keywords: ['مانشستر سيتي', 'السيتي', 'سيتي'], propertyKey: 'playedForManCity', displayText: 'هل لعب لمانشستر سيتي؟' },
  { keywords: ['أتلتيكو', 'اتلتيكو', 'اتليتيكو'], propertyKey: 'playedForAtletico', displayText: 'هل لعب لأتلتيكو مدريد؟' },
  { keywords: ['دورتموند', 'بوروسيا'], propertyKey: 'playedForDortmund', displayText: 'هل لعب لدورتموند؟' },
  { keywords: ['ميلان', 'اي سي ميلان', 'AC Milan'], propertyKey: 'playedForACMilan', displayText: 'هل لعب لميلان؟' },
  { keywords: ['إنتر', 'انتر', 'انتر ميلان'], propertyKey: 'playedForInter', displayText: 'هل لعب لإنتر ميلان؟' },
  { keywords: ['أرسنال', 'ارسنال', 'المدفعجية'], propertyKey: 'playedForArsenal', displayText: 'هل لعب لأرسنال؟' },
  { keywords: ['توتنهام', 'سبيرز'], propertyKey: 'playedForTottenham', displayText: 'هل لعب لتوتنهام؟' },

  // === البطولات والألقاب ===
  { keywords: ['كأس العالم', 'كاس العالم', 'مونديال', 'وورلد كاب'], propertyKey: 'wonWorldCup', displayText: 'هل فاز بكأس العالم؟' },
  { keywords: ['دوري الأبطال', 'دوري ابطال', 'تشامبيونز ليغ', 'أبطال أوروبا', 'شامبيونز'], propertyKey: 'wonCL', displayText: 'هل فاز بدوري الأبطال؟' },
  { keywords: ['الكرة الذهبية', 'بالون دور', 'كرة ذهبية'], propertyKey: 'wonBallonDor', displayText: 'هل فاز بالكرة الذهبية؟' },
  { keywords: ['الدوري', 'فاز بالدوري', 'بطل الدوري', 'لقب الدوري'], propertyKey: 'wonLeague', displayText: 'هل فاز بالدوري؟' },
  { keywords: ['الحذاء الذهبي', 'هداف أوروبا'], propertyKey: 'wonGoldenBoot', displayText: 'هل فاز بالحذاء الذهبي؟' },
  { keywords: ['يورو', 'أمم أوروبا', 'كأس أوروبا', 'بطولة أوروبا'], propertyKey: 'wonEuros', displayText: 'هل فاز بكأس أمم أوروبا؟' },
  { keywords: ['كوبا أمريكا', 'كوبا امريكا'], propertyKey: 'wonCopaAmerica', displayText: 'هل فاز بكوبا أمريكا؟' },

  // === العمر والتقاعد ===
  { keywords: ['معتزل', 'اعتزل', 'متقاعد', 'اعتزال'], propertyKey: 'isRetired', displayText: 'هل هو معتزل؟' },
  { keywords: ['شاب', 'صغير', 'أقل من 25', 'تحت 25'], propertyKey: 'isUnder25', displayText: 'هل عمره أقل من 25؟' },
  { keywords: ['فوق 30', 'أكبر من 30', 'كبير في السن', 'أكثر من 30'], propertyKey: 'isOver30', displayText: 'هل عمره أكثر من 30؟' },
  { keywords: ['فوق 35', 'أكبر من 35', 'أكثر من 35'], propertyKey: 'isOver35', displayText: 'هل عمره أكثر من 35؟' },

  // === القدرات والصفات ===
  { keywords: ['سريع', 'سرعة', 'أسرع'], propertyKey: 'isFast', displayText: 'هل هو سريع؟' },
  { keywords: ['قصير', 'قصير القامة'], propertyKey: 'isShort', displayText: 'هل هو قصير القامة؟' },
  { keywords: ['طويل', 'طويل القامة'], propertyKey: 'isTall', displayText: 'هل هو طويل القامة؟' },
  { keywords: ['يسار', 'أعسر', 'رجل يسرى', 'يسراوي', 'شمال'], propertyKey: 'isLeftFooted', displayText: 'هل يلعب بالقدم اليسرى؟' },
  { keywords: ['يمين', 'رجل يمنى', 'يميناوي'], propertyKey: 'isRightFooted', displayText: 'هل يلعب بالقدم اليمنى؟' },
  { keywords: ['قائد', 'كابتن', 'كابتن المنتخب', 'يحمل الشارة'], propertyKey: 'isCaptain', displayText: 'هل هو قائد فريقه أو منتخبه؟' },
  { keywords: ['رقم 10', 'عشرة', 'يلبس 10', 'يرتدي 10'], propertyKey: 'wearsNumber10', displayText: 'هل يرتدي الرقم 10؟' },
  { keywords: ['رقم 7', 'سبعة', 'يلبس 7', 'يرتدي 7'], propertyKey: 'wearsNumber7', displayText: 'هل يرتدي الرقم 7؟' },
  { keywords: ['رقم 9', 'تسعة', 'يلبس 9', 'يرتدي 9'], propertyKey: 'wearsNumber9', displayText: 'هل يرتدي الرقم 9؟' },
  { keywords: ['هداف', 'يسجل كثير', 'أهداف كثيرة', 'غزير', 'أكثر من 500 هدف'], propertyKey: 'isProlificScorer', displayText: 'هل هو هداف غزير؟' },
  { keywords: ['تمرير', 'باسر', 'يمرر', 'تمريرات حاسمة', 'صناعة'], propertyKey: 'isGreatPasser', displayText: 'هل هو ممرر بارع؟' },
  { keywords: ['مراوغ', 'دريبل', 'مهارات', 'مراوغة'], propertyKey: 'isGreatDribbler', displayText: 'هل هو مراوغ ماهر؟' },

  // === خصائص إضافية ===
  { keywords: ['وشم', 'تاتو', 'وشوم', 'موشوم'], propertyKey: 'hasTattoos', displayText: 'هل لديه وشوم؟' },
  { keywords: ['أكثر من نادي', 'أكثر من 3 أندية', 'انتقل كثير', 'عدة أندية'], propertyKey: 'playedFor3PlusClubs', displayText: 'هل لعب لأكثر من 3 أندية؟' },
  { keywords: ['فاز بأكثر من 3 دوري أبطال', 'أكثر من 3 أبطال', '3 دوري أبطال'], propertyKey: 'won3PlusCL', displayText: 'هل فاز بأكثر من 3 ألقاب دوري أبطال؟' },
  { keywords: ['فاز بأكثر من 5 دوري أبطال', '5 أبطال', 'خمسة أبطال'], propertyKey: 'won5PlusCL', displayText: 'هل فاز بأكثر من 5 ألقاب دوري أبطال؟' },
  { keywords: ['لعب في أكثر من دوري', 'أكثر من دوري', 'عدة دوريات'], propertyKey: 'playedInMultipleLeagues', displayText: 'هل لعب في أكثر من دوري؟' },
  { keywords: ['أفضل لاعب بالعالم', 'أفضل لاعب', 'أحسن لاعب'], propertyKey: 'wasBestInWorld', displayText: 'هل كان أفضل لاعب في العالم؟' },
  { keywords: ['100 هدف', 'أكثر من 100 هدف دولي', '100 هدف دولي', 'مئة هدف'], propertyKey: 'scored100IntlGoals', displayText: 'هل سجل أكثر من 100 هدف دولي؟' },

  // === المدربين ===
  { keywords: ['يدرب في إسبانيا', 'يدرب اسبانيا', 'مدرب في إسبانيا'], propertyKey: 'coachesInSpain', displayText: 'هل يدرب في إسبانيا؟' },
  { keywords: ['يدرب في إنجلترا', 'يدرب انجلترا', 'مدرب في إنجلترا'], propertyKey: 'coachesInEngland', displayText: 'هل يدرب في إنجلترا؟' },
  { keywords: ['فاز بدوري الأبطال كمدرب', 'أبطال كمدرب', 'حقق دوري أبطال', 'حقق الأبطال كمدرب'], propertyKey: 'wonCLAsCoach', displayText: 'هل حقق دوري الأبطال كمدرب؟' },
  { keywords: ['لاعب سابق', 'كان لاعب'], propertyKey: 'wasPlayer', displayText: 'هل كان لاعب سابق؟' },
  { keywords: ['درب أكثر من نادي', 'عدة أندية كمدرب'], propertyKey: 'coachedMultipleBigClubs', displayText: 'هل درب أكثر من نادي كبير؟' },
  { keywords: ['درب في ألمانيا', 'مدرب في ألمانيا'], propertyKey: 'coachedInGermany', displayText: 'هل درب في ألمانيا؟' },
  { keywords: ['درب كريستيانو', 'درب رونالدو', 'كريستيانو لاعبه'], propertyKey: 'coachedRonaldo', displayText: 'هل درب كريستيانو رونالدو؟' },
  { keywords: ['درب ميسي', 'ميسي لاعبه', 'درب ليونيل'], propertyKey: 'coachedMessi', displayText: 'هل درب ميسي؟' },
  { keywords: ['درب ريال مدريد', 'درب الريال', 'درب مدريد', 'مدرب ريال'], propertyKey: 'coachedRealMadrid', displayText: 'هل درب ريال مدريد؟' },
  { keywords: ['درب برشلونة', 'درب البارسا', 'مدرب برشلونة', 'مدرب بارسا'], propertyKey: 'coachedBarcelona', displayText: 'هل درب برشلونة؟' },
  { keywords: ['درب مانشستر سيتي', 'درب السيتي', 'مدرب مانشستر سيتي'], propertyKey: 'coachedManCity', displayText: 'هل درب مانشستر سيتي؟' },
  { keywords: ['درب تشيلسي', 'مدرب تشيلسي', 'درب البلوز'], propertyKey: 'coachedChelsea', displayText: 'هل درب تشيلسي؟' },
  { keywords: ['درب بايرن', 'درب بايرن ميونخ', 'مدرب بايرن'], propertyKey: 'coachedBayern', displayText: 'هل درب بايرن ميونخ؟' },
  { keywords: ['درب يوفنتوس', 'مدرب يوفنتوس', 'درب اليوفي'], propertyKey: 'coachedJuventus', displayText: 'هل درب يوفنتوس؟' },
  { keywords: ['درب إنتر', 'درب انتر', 'مدرب إنتر ميلان'], propertyKey: 'coachedInter', displayText: 'هل درب إنتر ميلان؟' },
  { keywords: ['درب ميلان', 'مدرب ميلان', 'درب AC Milan'], propertyKey: 'coachedACMilan', displayText: 'هل درب ميلان؟' },
  { keywords: ['درب ليفربول', 'مدرب ليفربول'], propertyKey: 'coachedLiverpool', displayText: 'هل درب ليفربول؟' },
  { keywords: ['درب باريس', 'درب PSG', 'مدرب باريس سان جيرمان'], propertyKey: 'coachedPSG', displayText: 'هل درب باريس سان جيرمان؟' },
  { keywords: ['درب دورتموند', 'مدرب دورتموند', 'درب بوروسيا'], propertyKey: 'coachedDortmund', displayText: 'هل درب دورتموند؟' },
  { keywords: ['درب أتلتيكو', 'مدرب أتلتيكو', 'درب اتليتيكو'], propertyKey: 'coachedAtletico', displayText: 'هل درب أتلتيكو مدريد؟' },
  { keywords: ['درب منتخب', 'مدرب منتخب وطني', 'درب منتخب وطني'], propertyKey: 'coachedNationalTeam', displayText: 'هل درب منتخب وطني؟' },

  // === الأندية ===
  { keywords: ['النادي من إسبانيا', 'نادي إسباني', 'الليغا النادي'], propertyKey: 'clubInSpain', displayText: 'هل النادي من إسبانيا؟' },
  { keywords: ['النادي من إنجلترا', 'نادي إنجليزي', 'البريميرليغ النادي'], propertyKey: 'clubInEngland', displayText: 'هل النادي من إنجلترا؟' },
  { keywords: ['النادي من إيطاليا', 'نادي إيطالي', 'السيري النادي'], propertyKey: 'clubInItaly', displayText: 'هل النادي من إيطاليا؟' },
  { keywords: ['النادي من ألمانيا', 'نادي ألماني', 'البوندسليغا النادي'], propertyKey: 'clubInGermany', displayText: 'هل النادي من ألمانيا؟' },
  { keywords: ['النادي من فرنسا', 'نادي فرنسي'], propertyKey: 'clubInFrance', displayText: 'هل النادي من فرنسا؟' },
  { keywords: ['قميص أحمر', 'قميصه أحمر', 'يلبس أحمر', 'أحمر'], propertyKey: 'hasRedKit', displayText: 'هل قميصه أحمر؟' },
  { keywords: ['قميص أزرق', 'قميصه أزرق', 'يلبس أزرق', 'أزرق'], propertyKey: 'hasBlueKit', displayText: 'هل قميصه أزرق؟' },
  { keywords: ['قميص أبيض', 'قميصه أبيض', 'يلبس أبيض', 'أبيض'], propertyKey: 'hasWhiteKit', displayText: 'هل قميصه أبيض؟' },
  { keywords: ['قميص أصفر', 'قميصه أصفر', 'أصفر'], propertyKey: 'hasYellowKit', displayText: 'هل قميصه أصفر؟' },
  { keywords: ['قميص أسود', 'قميصه أسود', 'أسود'], propertyKey: 'hasBlackKit', displayText: 'هل قميصه أسود؟' },
  { keywords: ['مخطط', 'قميص مخطط', 'خطوط'], propertyKey: 'hasStripedKit', displayText: 'هل قميصه مخطط؟' },
  { keywords: ['تأسس قبل 1900', 'قديم جداً', 'عمره أكثر من 100'], propertyKey: 'foundedBefore1900', displayText: 'هل تأسس قبل 1900؟' },
  { keywords: ['أكثر من 5 دوري أبطال', '5 أبطال كنادي', 'خمس بطولات أوروبية'], propertyKey: 'wonCL5Plus', displayText: 'هل فاز بأكثر من 5 ألقاب دوري أبطال؟' },
  { keywords: ['ملعب كبير', '80 ألف', 'ملعبه يتسع', 'أكثر من 80000'], propertyKey: 'stadiumOver80k', displayText: 'هل ملعبه يتسع لأكثر من 80 ألف؟' },
  { keywords: ['فاز النادي بدوري الأبطال', 'النادي بطل أوروبا', 'حقق دوري أبطال'], propertyKey: 'clubWonCL', displayText: 'هل فاز النادي بدوري الأبطال؟' },

  // === أسئلة أندية: المدربين ===
  { keywords: ['دربه زيدان', 'زيدان درب النادي', 'زيدان مدرب النادي', 'دربه زيزو'], propertyKey: 'clubCoachedByZidane', displayText: 'هل دربه زيدان؟' },
  { keywords: ['دربه غوارديولا', 'غوارديولا درب النادي', 'بيب درب النادي', 'دربه بيب'], propertyKey: 'clubCoachedByGuardiola', displayText: 'هل دربه غوارديولا؟' },
  { keywords: ['دربه أنشيلوتي', 'أنشيلوتي درب النادي', 'دربه انشيلوتي'], propertyKey: 'clubCoachedByAncelotti', displayText: 'هل دربه أنشيلوتي؟' },
  { keywords: ['دربه كلوب', 'كلوب درب النادي', 'دربه يورغن'], propertyKey: 'clubCoachedByKlopp', displayText: 'هل دربه كلوب؟' },
  { keywords: ['دربه مورينيو', 'مورينيو درب النادي', 'دربه جوزيه'], propertyKey: 'clubCoachedByMourinho', displayText: 'هل دربه مورينيو؟' },
  { keywords: ['دربه فيرغسون', 'فيرغسون درب النادي', 'السير أليكس', 'دربه سير أليكس'], propertyKey: 'clubCoachedByFerguson', displayText: 'هل دربه فيرغسون؟' },
  { keywords: ['دربه سيميوني', 'سيميوني درب النادي'], propertyKey: 'clubCoachedBySimeone', displayText: 'هل دربه سيميوني؟' },
  { keywords: ['دربه فليك', 'فليك درب النادي', 'هانسي فليك'], propertyKey: 'clubCoachedByFlick', displayText: 'هل دربه فليك؟' },

  // === أسئلة أندية: اللاعبين ===
  { keywords: ['لعب فيه ميسي', 'ميسي لعب في النادي', 'ميسي كان في النادي'], propertyKey: 'clubMessiPlayed', displayText: 'هل لعب فيه ميسي؟' },
  { keywords: ['لعب فيه رونالدو', 'رونالدو لعب في النادي', 'كريستيانو لعب فيه'], propertyKey: 'clubRonaldoPlayed', displayText: 'هل لعب فيه كريستيانو رونالدو؟' },
  { keywords: ['لعب فيه نيمار', 'نيمار لعب في النادي'], propertyKey: 'clubNeymarPlayed', displayText: 'هل لعب فيه نيمار؟' },
  { keywords: ['لعب فيه مبابي', 'مبابي لعب في النادي'], propertyKey: 'clubMbappePlayed', displayText: 'هل لعب فيه مبابي؟' },
  { keywords: ['لعب فيه صلاح', 'صلاح لعب في النادي', 'محمد صلاح'], propertyKey: 'clubSalahPlayed', displayText: 'هل لعب فيه صلاح؟' },
  { keywords: ['لعب فيه بنزيما', 'بنزيما لعب في النادي'], propertyKey: 'clubBenzemaPlayed', displayText: 'هل لعب فيه بنزيما؟' },
  { keywords: ['لعب فيه رونالدينيو', 'رونالدينيو لعب في النادي'], propertyKey: 'clubRonaldinhoPlayed', displayText: 'هل لعب فيه رونالدينيو؟' },
  { keywords: ['لعب فيه هالاند', 'هالاند لعب في النادي'], propertyKey: 'clubHaalandPlayed', displayText: 'هل لعب فيه هالاند؟' },
  { keywords: ['لعب فيه ليفاندوفسكي', 'ليفاندوفسكي لعب في النادي'], propertyKey: 'clubLewandowskiPlayed', displayText: 'هل لعب فيه ليفاندوفسكي؟' },
  { keywords: ['لعب فيه بيكهام', 'بيكهام لعب في النادي'], propertyKey: 'clubBeckhamPlayed', displayText: 'هل لعب فيه بيكهام؟' },
  { keywords: ['لعب فيه مارادونا', 'مارادونا لعب في النادي'], propertyKey: 'clubMaradonaPlayed', displayText: 'هل لعب فيه مارادونا؟' },
  { keywords: ['لعب فيه بيليه', 'بيليه لعب في النادي'], propertyKey: 'clubPelePlayed', displayText: 'هل لعب فيه بيليه؟' },

  // === أسئلة أندية: التأسيس ===
  { keywords: ['تأسس 1902', 'عام 1902', 'سنة 1902'], propertyKey: 'clubFounded1902', displayText: 'هل تأسس عام 1902؟' },
  { keywords: ['تأسس 1899', 'عام 1899', 'سنة 1899'], propertyKey: 'clubFounded1899', displayText: 'هل تأسس عام 1899؟' },
  { keywords: ['تأسس 1892', 'عام 1892', 'سنة 1892'], propertyKey: 'clubFounded1892', displayText: 'هل تأسس عام 1892؟' },
  { keywords: ['تأسس 1900', 'عام 1900', 'سنة 1900', 'تأسس في القرن العشرين'], propertyKey: 'clubFoundedAfter1900', displayText: 'هل تأسس بعد 1900؟' },

  // === أسئلة أندية: المدينة والبلد ===
  { keywords: ['النادي في مدريد', 'مدينة مدريد'], propertyKey: 'clubInMadrid', displayText: 'هل النادي في مدريد؟' },
  { keywords: ['النادي في لندن', 'مدينة لندن'], propertyKey: 'clubInLondon', displayText: 'هل النادي في لندن؟' },
  { keywords: ['النادي في ميلانو', 'مدينة ميلان', 'ميلانو'], propertyKey: 'clubInMilan', displayText: 'هل النادي في ميلانو؟' },
  { keywords: ['النادي في مانشستر', 'مدينة مانشستر'], propertyKey: 'clubInManchester', displayText: 'هل النادي في مانشستر؟' },
  { keywords: ['النادي في باريس', 'مدينة باريس'], propertyKey: 'clubInParis', displayText: 'هل النادي في باريس؟' },
  { keywords: ['النادي في ميونخ', 'مدينة ميونخ'], propertyKey: 'clubInMunich', displayText: 'هل النادي في ميونخ؟' },
  { keywords: ['النادي في تورينو', 'مدينة تورين', 'تورينو'], propertyKey: 'clubInTurin', displayText: 'هل النادي في تورينو؟' },
  { keywords: ['النادي في ليفربول', 'مدينة ليفربول'], propertyKey: 'clubInLiverpoolCity', displayText: 'هل النادي في مدينة ليفربول؟' },
  { keywords: ['النادي في برشلونة', 'مدينة برشلونة'], propertyKey: 'clubInBarcelonaCity', displayText: 'هل النادي في مدينة برشلونة؟' },

  // === أسئلة أندية: خصائص أخرى ===
  { keywords: ['أكثر نادي تتويج', 'أكثر ألقاب', 'أكثر بطولات'], propertyKey: 'clubMostTitles', displayText: 'هل هو أكثر نادي تتويجاً في بلده؟' },
  { keywords: ['كلاسيكو', 'يلعب الكلاسيكو', 'الكلاسيكو'], propertyKey: 'clubPlaysClassico', displayText: 'هل يلعب الكلاسيكو؟' },
  { keywords: ['ديربي', 'يلعب ديربي', 'ديربي المدينة'], propertyKey: 'clubPlaysDerby', displayText: 'هل يلعب ديربي مدينة شهير؟' },
  { keywords: ['فاز بالثلاثية', 'الثلاثية', 'ثلاثية تاريخية'], propertyKey: 'clubWonTreble', displayText: 'هل حقق الثلاثية؟' },
  { keywords: ['أكثر من 10 دوري أبطال', '10 أبطال', 'عشر بطولات أوروبية'], propertyKey: 'clubWonCL10Plus', displayText: 'هل فاز بأكثر من 10 ألقاب دوري أبطال؟' },
  { keywords: ['كأس العالم للأندية', 'مونديال الأندية'], propertyKey: 'clubWonCWC', displayText: 'هل فاز بكأس العالم للأندية؟' },

  // === أسئلة أندية: الشعار ===
  { keywords: ['شعار أبيض', 'الشعار أبيض', 'لوقو أبيض', 'شعاره أبيض'], propertyKey: 'logoWhite', displayText: 'هل شعار النادي أبيض؟' },
  { keywords: ['شعار أحمر', 'الشعار أحمر', 'لوقو أحمر', 'شعاره أحمر'], propertyKey: 'logoRed', displayText: 'هل شعار النادي أحمر؟' },
  { keywords: ['شعار أزرق', 'الشعار أزرق', 'لوقو أزرق', 'شعاره أزرق'], propertyKey: 'logoBlue', displayText: 'هل شعار النادي أزرق؟' },
  { keywords: ['شعار ذهبي', 'الشعار ذهبي', 'شعاره ذهبي', 'لون ذهبي في الشعار'], propertyKey: 'logoGold', displayText: 'هل في شعار النادي لون ذهبي؟' },
  { keywords: ['تاج في الشعار', 'شعاره فيه تاج', 'تاج', 'كراون'], propertyKey: 'logoCrown', displayText: 'هل في شعار النادي تاج؟' },
  { keywords: ['نجمة في الشعار', 'نجمة', 'نجوم في الشعار', 'شعاره فيه نجمة'], propertyKey: 'logoStar', displayText: 'هل في شعار النادي نجمة؟' },
  { keywords: ['حيوان في الشعار', 'شعاره فيه حيوان', 'طائر في الشعار', 'أسد في الشعار'], propertyKey: 'logoAnimal', displayText: 'هل في شعار النادي حيوان أو طائر؟' },

  // === أسئلة أندية: الملعب والتاريخ ===
  { keywords: ['ملعبه اسمه', 'اسم الملعب', 'اسم ملعب النادي'], propertyKey: 'stadiumFamous', displayText: 'هل ملعبه من أشهر الملاعب؟' },
  { keywords: ['لقب النادي', 'يلقب بـ', 'لقبه'], propertyKey: 'hasNickname', displayText: 'هل للنادي لقب مشهور؟' },
  { keywords: ['فاز بالدوري أكثر من 30', 'أكثر من 30 دوري', '30 لقب دوري'], propertyKey: 'won30PlusLeagues', displayText: 'هل فاز بأكثر من 30 لقب دوري؟' },
  { keywords: ['النادي عمره أكثر من 120', 'أكثر من 120 سنة', 'عمره 120'], propertyKey: 'clubOlderThan120', displayText: 'هل عمر النادي أكثر من 120 سنة؟' },
];

// دالة للبحث عن أفضل سؤال مطابق للنص الحر
export function findMatchingQuestion(userInput: string): FreeQuestion | null {
  const input = userInput.trim().toLowerCase();
  if (!input) return null;

  let bestMatch: FreeQuestion | null = null;
  let bestScore = 0;

  for (const q of freeQuestions) {
    let score = 0;
    for (const kw of q.keywords) {
      if (input.includes(kw.toLowerCase()) || kw.toLowerCase().includes(input)) {
        // تطابق أطول = أفضل
        score = Math.max(score, kw.length);
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = q;
    }
  }

  return bestMatch;
}

// Legacy exports for compatibility
export const playerQuestions: GuessWhoQuestion[] = [];
export const coachQuestions: GuessWhoQuestion[] = [];
export const clubQuestions: GuessWhoQuestion[] = [];

// 10 لاعبين (مراحل 46-55)
export const guessWhoEntities: GuessWhoEntity[] = [
  // === لاعبين ===
  {
    id: 'messi', name: 'ليونيل ميسي', type: 'player',
    image: messiImg,
    properties: {
      playsInSpain: false, playsInEngland: false, playsInFrance: false, playsInItaly: false, playsInGermany: false,
      playsInTop5League: false, playsInSaudiArabia: false, playsInUSA: true,
      isForward: true, isMidfielder: false, isDefender: false, isGoalkeeper: false, isWinger: true,
      isBrazilian: false, isArgentine: true, isFrenchNationality: false, isPortuguese: false,
      isSpanishNat: false, isGermanNat: false, isEnglish: false, isEgyptian: false,
      isCroatian: false, isNorwegian: false, isPolish: false,
      isEuropean: false, isAfrican: false, isSouthAmerican: true, isArab: false, isDutch: false, isItalianNat: false,
      playedForRealMadrid: false, playedForBarcelona: true, playedForManUtd: false, playedForLiverpool: false,
      playedForBayern: false, playedForChelsea: false, playedForJuventus: false, playedForPSG: true,
      playedForManCity: false, playedForAtletico: false, playedForDortmund: false, playedForACMilan: false,
      playedForInter: false, playedForArsenal: false, playedForTottenham: false,
      wonWorldCup: true, wonCL: true, wonBallonDor: true, wonLeague: true, wonGoldenBoot: true,
      wonEuros: false, wonCopaAmerica: true,
      isRetired: false, isUnder25: false, isOver30: true, isOver35: true,
      isFast: true, isShort: true, isTall: false, isLeftFooted: true, isRightFooted: false,
      isCaptain: true, wearsNumber10: true, wearsNumber7: false, wearsNumber9: false,
      isProlificScorer: true, isGreatPasser: true, isGreatDribbler: true,
      hasTattoos: true, playedFor3PlusClubs: true, won3PlusCL: true, won5PlusCL: false,
      playedInMultipleLeagues: true, wasBestInWorld: true, scored100IntlGoals: true,
    },
    hint: 'لعب في برشلونة أكثر من 20 سنة',
    wrongOptions: ['كريستيانو رونالدو', 'نيمار', 'مبابي'],
  },
  {
    id: 'ronaldo', name: 'كريستيانو رونالدو', type: 'player',
    image: ronaldoImg,
    properties: {
      playsInSpain: false, playsInEngland: false, playsInFrance: false, playsInItaly: false, playsInGermany: false,
      playsInTop5League: false, playsInSaudiArabia: true, playsInUSA: false,
      isForward: true, isMidfielder: false, isDefender: false, isGoalkeeper: false, isWinger: true,
      isBrazilian: false, isArgentine: false, isFrenchNationality: false, isPortuguese: true,
      isSpanishNat: false, isGermanNat: false, isEnglish: false, isEgyptian: false,
      isCroatian: false, isNorwegian: false, isPolish: false,
      isEuropean: true, isAfrican: false, isSouthAmerican: false, isArab: false, isDutch: false, isItalianNat: false,
      playedForRealMadrid: true, playedForBarcelona: false, playedForManUtd: true, playedForLiverpool: false,
      playedForBayern: false, playedForChelsea: false, playedForJuventus: true, playedForPSG: false,
      playedForManCity: false, playedForAtletico: false, playedForDortmund: false, playedForACMilan: false,
      playedForInter: false, playedForArsenal: false, playedForTottenham: false,
      wonWorldCup: false, wonCL: true, wonBallonDor: true, wonLeague: true, wonGoldenBoot: true,
      wonEuros: true, wonCopaAmerica: false,
      isRetired: false, isUnder25: false, isOver30: true, isOver35: true,
      isFast: true, isShort: false, isTall: true, isLeftFooted: false, isRightFooted: true,
      isCaptain: true, wearsNumber10: false, wearsNumber7: true, wearsNumber9: false,
      isProlificScorer: true, isGreatPasser: false, isGreatDribbler: true,
      hasTattoos: false, playedFor3PlusClubs: true, won3PlusCL: true, won5PlusCL: true,
      playedInMultipleLeagues: true, wasBestInWorld: true, scored100IntlGoals: true,
    },
    hint: 'هداف دوري الأبطال التاريخي',
    wrongOptions: ['ليونيل ميسي', 'كريم بنزيما', 'واين روني'],
  },
  {
    id: 'neymar', name: 'نيمار', type: 'player',
    image: neymarImg,
    properties: {
      playsInSpain: false, playsInEngland: false, playsInFrance: false, playsInItaly: false, playsInGermany: false,
      playsInTop5League: false, playsInSaudiArabia: false, playsInUSA: false,
      isForward: true, isMidfielder: false, isDefender: false, isGoalkeeper: false, isWinger: true,
      isBrazilian: true, isArgentine: false, isFrenchNationality: false, isPortuguese: false,
      isSpanishNat: false, isGermanNat: false, isEnglish: false, isEgyptian: false,
      isCroatian: false, isNorwegian: false, isPolish: false,
      isEuropean: false, isAfrican: false, isSouthAmerican: true, isArab: false, isDutch: false, isItalianNat: false,
      playedForRealMadrid: false, playedForBarcelona: true, playedForManUtd: false, playedForLiverpool: false,
      playedForBayern: false, playedForChelsea: false, playedForJuventus: false, playedForPSG: true,
      playedForManCity: false, playedForAtletico: false, playedForDortmund: false, playedForACMilan: false,
      playedForInter: false, playedForArsenal: false, playedForTottenham: false,
      wonWorldCup: false, wonCL: true, wonBallonDor: false, wonLeague: true, wonGoldenBoot: false,
      wonEuros: false, wonCopaAmerica: true,
      isRetired: false, isUnder25: false, isOver30: true, isOver35: false,
      isFast: true, isShort: false, isTall: false, isLeftFooted: false, isRightFooted: true,
      isCaptain: true, wearsNumber10: true, wearsNumber7: false, wearsNumber9: false,
      isProlificScorer: true, isGreatPasser: true, isGreatDribbler: true,
      hasTattoos: true, playedFor3PlusClubs: true, won3PlusCL: false, won5PlusCL: false,
      playedInMultipleLeagues: true, wasBestInWorld: false, scored100IntlGoals: false,
    },
    hint: 'انتقل من برشلونة لباريس بصفقة تاريخية',
    wrongOptions: ['فينيسيوس', 'رونالدينيو', 'ريفالدو'],
  },
  {
    id: 'mbappe', name: 'كيليان مبابي', type: 'player',
    image: mbappeImg,
    properties: {
      playsInSpain: true, playsInEngland: false, playsInFrance: false, playsInItaly: false, playsInGermany: false,
      playsInTop5League: true, playsInSaudiArabia: false, playsInUSA: false,
      isForward: true, isMidfielder: false, isDefender: false, isGoalkeeper: false, isWinger: true,
      isBrazilian: false, isArgentine: false, isFrenchNationality: true, isPortuguese: false,
      isSpanishNat: false, isGermanNat: false, isEnglish: false, isEgyptian: false,
      isCroatian: false, isNorwegian: false, isPolish: false,
      isEuropean: true, isAfrican: false, isSouthAmerican: false, isArab: false, isDutch: false, isItalianNat: false,
      playedForRealMadrid: true, playedForBarcelona: false, playedForManUtd: false, playedForLiverpool: false,
      playedForBayern: false, playedForChelsea: false, playedForJuventus: false, playedForPSG: true,
      playedForManCity: false, playedForAtletico: false, playedForDortmund: false, playedForACMilan: false,
      playedForInter: false, playedForArsenal: false, playedForTottenham: false,
      wonWorldCup: true, wonCL: false, wonBallonDor: false, wonLeague: true, wonGoldenBoot: false,
      wonEuros: false, wonCopaAmerica: false,
      isRetired: false, isUnder25: true, isOver30: false, isOver35: false,
      isFast: true, isShort: false, isTall: false, isLeftFooted: false, isRightFooted: true,
      isCaptain: true, wearsNumber10: false, wearsNumber7: false, wearsNumber9: true,
      isProlificScorer: true, isGreatPasser: false, isGreatDribbler: true,
      hasTattoos: false, playedFor3PlusClubs: false, won3PlusCL: false, won5PlusCL: false,
      playedInMultipleLeagues: true, wasBestInWorld: false, scored100IntlGoals: false,
    },
    hint: 'فاز بكأس العالم 2018 مع فرنسا وعمره 19 سنة',
    wrongOptions: ['أنطوان غريزمان', 'عثمان ديمبيلي', 'فينيسيوس'],
  },
  {
    id: 'haaland', name: 'إيرلينغ هالاند', type: 'player',
    image: haalandImg,
    properties: {
      playsInSpain: false, playsInEngland: true, playsInFrance: false, playsInItaly: false, playsInGermany: false,
      playsInTop5League: true, playsInSaudiArabia: false, playsInUSA: false,
      isForward: true, isMidfielder: false, isDefender: false, isGoalkeeper: false, isWinger: false,
      isBrazilian: false, isArgentine: false, isFrenchNationality: false, isPortuguese: false,
      isSpanishNat: false, isGermanNat: false, isEnglish: false, isEgyptian: false,
      isCroatian: false, isNorwegian: true, isPolish: false,
      isEuropean: true, isAfrican: false, isSouthAmerican: false, isArab: false, isDutch: false, isItalianNat: false,
      playedForRealMadrid: false, playedForBarcelona: false, playedForManUtd: false, playedForLiverpool: false,
      playedForBayern: false, playedForChelsea: false, playedForJuventus: false, playedForPSG: false,
      playedForManCity: true, playedForAtletico: false, playedForDortmund: true, playedForACMilan: false,
      playedForInter: false, playedForArsenal: false, playedForTottenham: false,
      wonWorldCup: false, wonCL: true, wonBallonDor: false, wonLeague: true, wonGoldenBoot: true,
      wonEuros: false, wonCopaAmerica: false,
      isRetired: false, isUnder25: true, isOver30: false, isOver35: false,
      isFast: true, isShort: false, isTall: true, isLeftFooted: false, isRightFooted: true,
      isCaptain: false, wearsNumber10: false, wearsNumber7: false, wearsNumber9: true,
      isProlificScorer: true, isGreatPasser: false, isGreatDribbler: false,
      hasTattoos: false, playedFor3PlusClubs: true, won3PlusCL: false, won5PlusCL: false,
      playedInMultipleLeagues: true, wasBestInWorld: false, scored100IntlGoals: false,
    },
    hint: 'نرويجي يسجل أهداف بالجملة في الدوري الإنجليزي',
    wrongOptions: ['هاري كين', 'روبرت ليفاندوفسكي', 'كريم بنزيما'],
  },
  {
    id: 'salah', name: 'محمد صلاح', type: 'player',
    image: salahImg,
    properties: {
      playsInSpain: false, playsInEngland: true, playsInFrance: false, playsInItaly: false, playsInGermany: false,
      playsInTop5League: true, playsInSaudiArabia: false, playsInUSA: false,
      isForward: true, isMidfielder: false, isDefender: false, isGoalkeeper: false, isWinger: true,
      isBrazilian: false, isArgentine: false, isFrenchNationality: false, isPortuguese: false,
      isSpanishNat: false, isGermanNat: false, isEnglish: false, isEgyptian: true,
      isCroatian: false, isNorwegian: false, isPolish: false,
      isEuropean: false, isAfrican: true, isSouthAmerican: false, isArab: true, isDutch: false, isItalianNat: false,
      playedForRealMadrid: false, playedForBarcelona: false, playedForManUtd: false, playedForLiverpool: true,
      playedForBayern: false, playedForChelsea: true, playedForJuventus: false, playedForPSG: false,
      playedForManCity: false, playedForAtletico: false, playedForDortmund: false, playedForACMilan: false,
      playedForInter: false, playedForArsenal: false, playedForTottenham: false,
      wonWorldCup: false, wonCL: true, wonBallonDor: false, wonLeague: true, wonGoldenBoot: true,
      wonEuros: false, wonCopaAmerica: false,
      isRetired: false, isUnder25: false, isOver30: true, isOver35: false,
      isFast: true, isShort: false, isTall: false, isLeftFooted: true, isRightFooted: false,
      isCaptain: true, wearsNumber10: false, wearsNumber7: false, wearsNumber9: false,
      isProlificScorer: true, isGreatPasser: false, isGreatDribbler: true,
      hasTattoos: false, playedFor3PlusClubs: true, won3PlusCL: false, won5PlusCL: false,
      playedInMultipleLeagues: true, wasBestInWorld: false, scored100IntlGoals: false,
    },
    hint: 'الملك المصري في أنفيلد',
    wrongOptions: ['ساديو ماني', 'رياض محرز', 'بيير أوباميانغ'],
  },
  {
    id: 'benzema', name: 'كريم بنزيما', type: 'player',
    properties: {
      playsInSpain: false, playsInEngland: false, playsInFrance: false, playsInItaly: false, playsInGermany: false,
      playsInTop5League: false, playsInSaudiArabia: true, playsInUSA: false,
      isForward: true, isMidfielder: false, isDefender: false, isGoalkeeper: false, isWinger: false,
      isBrazilian: false, isArgentine: false, isFrenchNationality: true, isPortuguese: false,
      isSpanishNat: false, isGermanNat: false, isEnglish: false, isEgyptian: false,
      isCroatian: false, isNorwegian: false, isPolish: false,
      isEuropean: true, isAfrican: false, isSouthAmerican: false, isArab: false, isDutch: false, isItalianNat: false,
      playedForRealMadrid: true, playedForBarcelona: false, playedForManUtd: false, playedForLiverpool: false,
      playedForBayern: false, playedForChelsea: false, playedForJuventus: false, playedForPSG: false,
      playedForManCity: false, playedForAtletico: false, playedForDortmund: false, playedForACMilan: false,
      playedForInter: false, playedForArsenal: false, playedForTottenham: false,
      wonWorldCup: false, wonCL: true, wonBallonDor: true, wonLeague: true, wonGoldenBoot: false,
      wonEuros: false, wonCopaAmerica: false,
      isRetired: false, isUnder25: false, isOver30: true, isOver35: true,
      isFast: false, isShort: false, isTall: true, isLeftFooted: false, isRightFooted: true,
      isCaptain: false, wearsNumber10: false, wearsNumber7: false, wearsNumber9: true,
      isProlificScorer: true, isGreatPasser: true, isGreatDribbler: false,
      hasTattoos: true, playedFor3PlusClubs: false, won3PlusCL: true, won5PlusCL: false,
      playedInMultipleLeagues: true, wasBestInWorld: true, scored100IntlGoals: false,
    },
    hint: 'فرنسي قضى 14 سنة في ريال مدريد',
    wrongOptions: ['كريستيانو رونالدو', 'راؤول', 'لويس سواريز'],
  },
  {
    id: 'modric', name: 'لوكا مودريتش', type: 'player',
    properties: {
      playsInSpain: true, playsInEngland: false, playsInFrance: false, playsInItaly: false, playsInGermany: false,
      playsInTop5League: true, playsInSaudiArabia: false, playsInUSA: false,
      isForward: false, isMidfielder: true, isDefender: false, isGoalkeeper: false, isWinger: false,
      isBrazilian: false, isArgentine: false, isFrenchNationality: false, isPortuguese: false,
      isSpanishNat: false, isGermanNat: false, isEnglish: false, isEgyptian: false,
      isCroatian: true, isNorwegian: false, isPolish: false,
      isEuropean: true, isAfrican: false, isSouthAmerican: false, isArab: false, isDutch: false, isItalianNat: false,
      playedForRealMadrid: true, playedForBarcelona: false, playedForManUtd: false, playedForLiverpool: false,
      playedForBayern: false, playedForChelsea: false, playedForJuventus: false, playedForPSG: false,
      playedForManCity: false, playedForAtletico: false, playedForDortmund: false, playedForACMilan: false,
      playedForInter: false, playedForArsenal: false, playedForTottenham: true,
      wonWorldCup: false, wonCL: true, wonBallonDor: true, wonLeague: true, wonGoldenBoot: false,
      wonEuros: false, wonCopaAmerica: false,
      isRetired: false, isUnder25: false, isOver30: true, isOver35: true,
      isFast: false, isShort: true, isTall: false, isLeftFooted: false, isRightFooted: true,
      isCaptain: true, wearsNumber10: true, wearsNumber7: false, wearsNumber9: false,
      isProlificScorer: false, isGreatPasser: true, isGreatDribbler: true,
      hasTattoos: false, playedFor3PlusClubs: true, won3PlusCL: true, won5PlusCL: true,
      playedInMultipleLeagues: true, wasBestInWorld: true, scored100IntlGoals: false,
    },
    hint: 'كرواتي كسر احتكار ميسي ورونالدو للكرة الذهبية',
    wrongOptions: ['توني كروس', 'أندريس إنييستا', 'تشابي'],
  },
  {
    id: 'ronaldinho', name: 'رونالدينيو', type: 'player',
    image: ronaldinhoImg,
    properties: {
      playsInSpain: false, playsInEngland: false, playsInFrance: false, playsInItaly: false, playsInGermany: false,
      playsInTop5League: false, playsInSaudiArabia: false, playsInUSA: false,
      isForward: true, isMidfielder: true, isDefender: false, isGoalkeeper: false, isWinger: true,
      isBrazilian: true, isArgentine: false, isFrenchNationality: false, isPortuguese: false,
      isSpanishNat: false, isGermanNat: false, isEnglish: false, isEgyptian: false,
      isCroatian: false, isNorwegian: false, isPolish: false,
      isEuropean: false, isAfrican: false, isSouthAmerican: true, isArab: false, isDutch: false, isItalianNat: false,
      playedForRealMadrid: false, playedForBarcelona: true, playedForManUtd: false, playedForLiverpool: false,
      playedForBayern: false, playedForChelsea: false, playedForJuventus: false, playedForPSG: true,
      playedForManCity: false, playedForAtletico: false, playedForDortmund: false, playedForACMilan: true,
      playedForInter: false, playedForArsenal: false, playedForTottenham: false,
      wonWorldCup: true, wonCL: true, wonBallonDor: true, wonLeague: true, wonGoldenBoot: false,
      wonEuros: false, wonCopaAmerica: true,
      isRetired: true, isUnder25: false, isOver30: true, isOver35: true,
      isFast: true, isShort: false, isTall: false, isLeftFooted: false, isRightFooted: true,
      isCaptain: false, wearsNumber10: true, wearsNumber7: false, wearsNumber9: false,
      isProlificScorer: true, isGreatPasser: true, isGreatDribbler: true,
      hasTattoos: true, playedFor3PlusClubs: true, won3PlusCL: false, won5PlusCL: false,
      playedInMultipleLeagues: true, wasBestInWorld: true, scored100IntlGoals: false,
    },
    hint: 'الساحر البرازيلي صاحب الابتسامة الشهيرة',
    wrongOptions: ['ريفالدو', 'كاكا', 'روماريو'],
  },
  {
    id: 'zidane_player', name: 'زين الدين زيدان', type: 'player',
    image: zidaneImg,
    properties: {
      playsInSpain: false, playsInEngland: false, playsInFrance: false, playsInItaly: false, playsInGermany: false,
      playsInTop5League: false, playsInSaudiArabia: false, playsInUSA: false,
      isForward: false, isMidfielder: true, isDefender: false, isGoalkeeper: false, isWinger: false,
      isBrazilian: false, isArgentine: false, isFrenchNationality: true, isPortuguese: false,
      isSpanishNat: false, isGermanNat: false, isEnglish: false, isEgyptian: false,
      isCroatian: false, isNorwegian: false, isPolish: false,
      isEuropean: true, isAfrican: false, isSouthAmerican: false, isArab: false, isDutch: false, isItalianNat: false,
      playedForRealMadrid: true, playedForBarcelona: false, playedForManUtd: false, playedForLiverpool: false,
      playedForBayern: false, playedForChelsea: false, playedForJuventus: true, playedForPSG: false,
      playedForManCity: false, playedForAtletico: false, playedForDortmund: false, playedForACMilan: false,
      playedForInter: false, playedForArsenal: false, playedForTottenham: false,
      wonWorldCup: true, wonCL: true, wonBallonDor: true, wonLeague: true, wonGoldenBoot: false,
      wonEuros: true, wonCopaAmerica: false,
      isRetired: true, isUnder25: false, isOver30: true, isOver35: true,
      isFast: false, isShort: false, isTall: true, isLeftFooted: false, isRightFooted: true,
      isCaptain: true, wearsNumber10: false, wearsNumber7: false, wearsNumber9: false,
      isProlificScorer: false, isGreatPasser: true, isGreatDribbler: true,
      hasTattoos: false, playedFor3PlusClubs: true, won3PlusCL: false, won5PlusCL: false,
      playedInMultipleLeagues: true, wasBestInWorld: true, scored100IntlGoals: false,
    },
    hint: 'نطحة رأس شهيرة في نهائي كأس العالم 2006',
    wrongOptions: ['ميشيل بلاتيني', 'تييري هنري', 'ديفيد بيكهام'],
  },

  // === مدربين ===
  {
    id: 'guardiola_coach', name: 'بيب غوارديولا', type: 'coach',
    image: guardiolaImg,
    properties: {
      coachesInSpain: false, coachesInEngland: true,
      wonCLAsCoach: true, isSpanish: true, isSpanishNat: true, wasPlayer: true,
      coachedMultipleBigClubs: true, isGerman: false, isGermanNat: false, isItalian: false, isItalianNat: false,
      wonLeague3Plus: true, coachedInGermany: true, isArgentineCoach: false, isArgentine: false,
      isFrench: false, isFrenchNationality: false,
      isEuropean: true, isOver30: true, isOver35: true,
      coachedRonaldo: false, coachedMessi: true, coachedRealMadrid: false, coachedBarcelona: true,
      coachedManCity: true, coachedChelsea: false, coachedBayern: true, coachedJuventus: false,
      coachedInter: false, coachedACMilan: false, coachedLiverpool: false, coachedPSG: false,
      coachedDortmund: false, coachedAtletico: false, coachedNationalTeam: false,
    },
    hint: 'أسطورة تيكي تاكا مع برشلونة',
    wrongOptions: ['كارلو أنشيلوتي', 'يورغن كلوب', 'توماس توخيل'],
  },
  {
    id: 'ancelotti_coach', name: 'كارلو أنشيلوتي', type: 'coach',
    image: ancelottiImg,
    properties: {
      coachesInSpain: true, coachesInEngland: false,
      wonCLAsCoach: true, isSpanish: false, isSpanishNat: false, wasPlayer: true,
      coachedMultipleBigClubs: true, isGerman: false, isGermanNat: false, isItalian: true, isItalianNat: true,
      wonLeague3Plus: true, coachedInGermany: false, isArgentineCoach: false, isArgentine: false,
      isFrench: false, isFrenchNationality: false,
      isEuropean: true, isOver30: true, isOver35: true,
      coachedRonaldo: true, coachedMessi: false, coachedRealMadrid: true, coachedBarcelona: false,
      coachedManCity: false, coachedChelsea: true, coachedBayern: true, coachedJuventus: true,
      coachedInter: false, coachedACMilan: true, coachedLiverpool: false, coachedPSG: true,
      coachedDortmund: false, coachedAtletico: false, coachedNationalTeam: false,
    },
    hint: 'درب ميلان وريال مدريد وفاز بدوري الأبطال مع الاثنين',
    wrongOptions: ['بيب غوارديولا', 'جوزيه مورينيو', 'زين الدين زيدان'],
  },
  {
    id: 'klopp_coach', name: 'يورغن كلوب', type: 'coach',
    image: kloppImg,
    properties: {
      coachesInSpain: false, coachesInEngland: false,
      wonCLAsCoach: true, isSpanish: false, isSpanishNat: false, wasPlayer: true,
      coachedMultipleBigClubs: true, isGerman: true, isGermanNat: true, isItalian: false, isItalianNat: false,
      wonLeague3Plus: false, coachedInGermany: true, isArgentineCoach: false, isArgentine: false,
      isFrench: false, isFrenchNationality: false,
      isEuropean: true, isOver30: true, isOver35: true,
      coachedRonaldo: false, coachedMessi: false, coachedRealMadrid: false, coachedBarcelona: false,
      coachedManCity: false, coachedChelsea: false, coachedBayern: false, coachedJuventus: false,
      coachedInter: false, coachedACMilan: false, coachedLiverpool: true, coachedPSG: false,
      coachedDortmund: true, coachedAtletico: false, coachedNationalTeam: false,
    },
    hint: 'أعاد ليفربول للمجد بعد 30 سنة',
    wrongOptions: ['توماس توخيل', 'بيب غوارديولا', 'هانسي فليك'],
  },
  {
    id: 'simeone_coach', name: 'دييغو سيميوني', type: 'coach',
    image: simeoneImg,
    properties: {
      coachesInSpain: true, coachesInEngland: false,
      wonCLAsCoach: false, isSpanish: false, isSpanishNat: false, wasPlayer: true,
      coachedMultipleBigClubs: false, isGerman: false, isGermanNat: false, isItalian: false, isItalianNat: false,
      wonLeague3Plus: false, coachedInGermany: false, isArgentineCoach: true, isArgentine: true,
      isFrench: false, isFrenchNationality: false,
      isEuropean: false, isSouthAmerican: true, isOver30: true, isOver35: true,
      coachedRonaldo: false, coachedMessi: false, coachedRealMadrid: false, coachedBarcelona: false,
      coachedManCity: false, coachedChelsea: false, coachedBayern: false, coachedJuventus: false,
      coachedInter: true, coachedACMilan: false, coachedLiverpool: false, coachedPSG: false,
      coachedDortmund: false, coachedAtletico: true, coachedNationalTeam: false,
    },
    hint: 'يدرب أتلتيكو مدريد منذ أكثر من 10 سنوات',
    wrongOptions: ['كارلو أنشيلوتي', 'بيب غوارديولا', 'مارسيلو بييلسا'],
  },
  {
    id: 'zidane_coach', name: 'زين الدين زيدان (مدرب)', type: 'coach',
    image: zidaneImg,
    properties: {
      coachesInSpain: false, coachesInEngland: false,
      wonCLAsCoach: true, isSpanish: false, isSpanishNat: false, wasPlayer: true,
      coachedMultipleBigClubs: false, isGerman: false, isGermanNat: false, isItalian: false, isItalianNat: false,
      wonLeague3Plus: false, coachedInGermany: false, isArgentineCoach: false, isArgentine: false,
      isFrench: true, isFrenchNationality: true,
      isEuropean: true, isOver30: true, isOver35: true,
      coachedRonaldo: true, coachedMessi: false, coachedRealMadrid: true, coachedBarcelona: false,
      coachedManCity: false, coachedChelsea: false, coachedBayern: false, coachedJuventus: false,
      coachedInter: false, coachedACMilan: false, coachedLiverpool: false, coachedPSG: false,
      coachedDortmund: false, coachedAtletico: false, coachedNationalTeam: false,
    },
    hint: 'فاز بـ3 دوري أبطال متتالية كمدرب',
    wrongOptions: ['كارلو أنشيلوتي', 'بيب غوارديولا', 'ديديه ديشان'],
  },

  // === أندية ===
  {
    id: 'real_madrid_club', name: 'ريال مدريد', type: 'club',
    properties: {
      clubInSpain: true, clubInEngland: false, clubInItaly: false, clubInGermany: false, clubInFrance: false,
      clubWonCL: true, wonCL5Plus: true, clubWonCL10Plus: true,
      hasRedKit: false, hasBlueKit: false, hasWhiteKit: true, hasYellowKit: false, hasBlackKit: false, hasStripedKit: false,
      foundedBefore1900: false, stadiumOver80k: true,
      clubCoachedByZidane: true, clubCoachedByGuardiola: false, clubCoachedByAncelotti: true, clubCoachedByKlopp: false,
      clubCoachedByMourinho: true, clubCoachedByFerguson: false, clubCoachedBySimeone: false, clubCoachedByFlick: false,
      clubMessiPlayed: false, clubRonaldoPlayed: true, clubNeymarPlayed: false, clubMbappePlayed: true,
      clubSalahPlayed: false, clubBenzemaPlayed: true, clubRonaldinhoPlayed: false, clubHaalandPlayed: false,
      clubLewandowskiPlayed: false, clubBeckhamPlayed: true, clubMaradonaPlayed: false, clubPelePlayed: false,
      clubFounded1902: true, clubFounded1899: false, clubFounded1892: false, clubFoundedAfter1900: true,
      clubInMadrid: true, clubInLondon: false, clubInMilan: false, clubInManchester: false,
      clubInParis: false, clubInMunich: false, clubInTurin: false, clubInLiverpoolCity: false, clubInBarcelonaCity: false,
      clubMostTitles: true, clubPlaysClassico: true, clubPlaysDerby: true, clubWonTreble: false, clubWonCWC: true,
      logoWhite: true, logoRed: false, logoBlue: false, logoGold: true, logoCrown: true, logoStar: false, logoAnimal: false,
      stadiumFamous: true, hasNickname: true, won30PlusLeagues: true, clubOlderThan120: true,
    },
    hint: 'النادي الملكي... صاحب أكثر ألقاب في دوري الأبطال',
    wrongOptions: ['برشلونة', 'بايرن ميونخ', 'ليفربول'],
  },
  {
    id: 'barcelona_club', name: 'برشلونة', type: 'club',
    properties: {
      clubInSpain: true, clubInEngland: false, clubInItaly: false, clubInGermany: false, clubInFrance: false,
      clubWonCL: true, wonCL5Plus: true, clubWonCL10Plus: false,
      hasRedKit: true, hasBlueKit: true, hasWhiteKit: false, hasYellowKit: false, hasBlackKit: false, hasStripedKit: true,
      foundedBefore1900: true, stadiumOver80k: true,
      clubCoachedByZidane: false, clubCoachedByGuardiola: true, clubCoachedByAncelotti: false, clubCoachedByKlopp: false,
      clubCoachedByMourinho: false, clubCoachedByFerguson: false, clubCoachedBySimeone: false, clubCoachedByFlick: true,
      clubMessiPlayed: true, clubRonaldoPlayed: false, clubNeymarPlayed: true, clubMbappePlayed: false,
      clubSalahPlayed: false, clubBenzemaPlayed: false, clubRonaldinhoPlayed: true, clubHaalandPlayed: false,
      clubLewandowskiPlayed: true, clubBeckhamPlayed: false, clubMaradonaPlayed: true, clubPelePlayed: false,
      clubFounded1902: false, clubFounded1899: true, clubFounded1892: false, clubFoundedAfter1900: false,
      clubInMadrid: false, clubInLondon: false, clubInMilan: false, clubInManchester: false,
      clubInParis: false, clubInMunich: false, clubInTurin: false, clubInLiverpoolCity: false, clubInBarcelonaCity: true,
      clubMostTitles: false, clubPlaysClassico: true, clubPlaysDerby: true, clubWonTreble: true, clubWonCWC: true,
      logoWhite: false, logoRed: true, logoBlue: true, logoGold: true, logoCrown: false, logoStar: false, logoAnimal: false,
      stadiumFamous: true, hasNickname: true, won30PlusLeagues: false, clubOlderThan120: true,
    },
    hint: 'Més que un club... أكثر من مجرد نادي',
    wrongOptions: ['ريال مدريد', 'أتلتيكو مدريد', 'إشبيلية'],
  },
  {
    id: 'liverpool_club', name: 'ليفربول', type: 'club',
    properties: {
      clubInSpain: false, clubInEngland: true, clubInItaly: false, clubInGermany: false, clubInFrance: false,
      clubWonCL: true, wonCL5Plus: true, clubWonCL10Plus: false,
      hasRedKit: true, hasBlueKit: false, hasWhiteKit: false, hasYellowKit: false, hasBlackKit: false, hasStripedKit: false,
      foundedBefore1900: true, stadiumOver80k: false,
      clubCoachedByZidane: false, clubCoachedByGuardiola: false, clubCoachedByAncelotti: false, clubCoachedByKlopp: true,
      clubCoachedByMourinho: false, clubCoachedByFerguson: false, clubCoachedBySimeone: false, clubCoachedByFlick: false,
      clubMessiPlayed: false, clubRonaldoPlayed: false, clubNeymarPlayed: false, clubMbappePlayed: false,
      clubSalahPlayed: true, clubBenzemaPlayed: false, clubRonaldinhoPlayed: false, clubHaalandPlayed: false,
      clubLewandowskiPlayed: false, clubBeckhamPlayed: false, clubMaradonaPlayed: false, clubPelePlayed: false,
      clubFounded1902: false, clubFounded1899: false, clubFounded1892: true, clubFoundedAfter1900: false,
      clubInMadrid: false, clubInLondon: false, clubInMilan: false, clubInManchester: false,
      clubInParis: false, clubInMunich: false, clubInTurin: false, clubInLiverpoolCity: true, clubInBarcelonaCity: false,
      clubMostTitles: false, clubPlaysClassico: false, clubPlaysDerby: true, clubWonTreble: false, clubWonCWC: true,
      logoWhite: false, logoRed: true, logoBlue: false, logoGold: true, logoCrown: false, logoStar: false, logoAnimal: true,
      stadiumFamous: true, hasNickname: true, won30PlusLeagues: false, clubOlderThan120: true,
    },
    hint: 'You\'ll Never Walk Alone... أنفيلد والجماهير',
    wrongOptions: ['مانشستر يونايتد', 'آرسنال', 'تشيلسي'],
  },
  {
    id: 'bayern_club', name: 'بايرن ميونخ', type: 'club',
    properties: {
      clubInSpain: false, clubInEngland: false, clubInItaly: false, clubInGermany: true, clubInFrance: false,
      clubWonCL: true, wonCL5Plus: true, clubWonCL10Plus: false,
      hasRedKit: true, hasBlueKit: false, hasWhiteKit: true, hasYellowKit: false, hasBlackKit: false, hasStripedKit: false,
      foundedBefore1900: true, stadiumOver80k: true,
      clubCoachedByZidane: false, clubCoachedByGuardiola: true, clubCoachedByAncelotti: true, clubCoachedByKlopp: false,
      clubCoachedByMourinho: false, clubCoachedByFerguson: false, clubCoachedBySimeone: false, clubCoachedByFlick: true,
      clubMessiPlayed: false, clubRonaldoPlayed: false, clubNeymarPlayed: false, clubMbappePlayed: false,
      clubSalahPlayed: false, clubBenzemaPlayed: false, clubRonaldinhoPlayed: false, clubHaalandPlayed: false,
      clubLewandowskiPlayed: true, clubBeckhamPlayed: false, clubMaradonaPlayed: false, clubPelePlayed: false,
      clubFounded1902: false, clubFounded1899: false, clubFounded1892: false, clubFoundedAfter1900: true,
      clubInMadrid: false, clubInLondon: false, clubInMilan: false, clubInManchester: false,
      clubInParis: false, clubInMunich: true, clubInTurin: false, clubInLiverpoolCity: false, clubInBarcelonaCity: false,
      clubMostTitles: true, clubPlaysClassico: false, clubPlaysDerby: false, clubWonTreble: true, clubWonCWC: true,
      logoWhite: true, logoRed: true, logoBlue: true, logoGold: false, logoCrown: false, logoStar: true, logoAnimal: false,
      stadiumFamous: true, hasNickname: true, won30PlusLeagues: true, clubOlderThan120: true,
    },
    hint: 'عملاق بافاريا... أكثر نادي ألماني تتويجاً',
    wrongOptions: ['بوروسيا دورتموند', 'ريال مدريد', 'إنتر ميلان'],
  },
  {
    id: 'juventus_club', name: 'يوفنتوس', type: 'club',
    properties: {
      clubInSpain: false, clubInEngland: false, clubInItaly: true, clubInGermany: false, clubInFrance: false,
      clubWonCL: true, wonCL5Plus: false, clubWonCL10Plus: false,
      hasRedKit: false, hasBlueKit: false, hasWhiteKit: true, hasYellowKit: false, hasBlackKit: true, hasStripedKit: true,
      foundedBefore1900: true, stadiumOver80k: false,
      clubCoachedByZidane: false, clubCoachedByGuardiola: false, clubCoachedByAncelotti: true, clubCoachedByKlopp: false,
      clubCoachedByMourinho: false, clubCoachedByFerguson: false, clubCoachedBySimeone: false, clubCoachedByFlick: false,
      clubMessiPlayed: false, clubRonaldoPlayed: true, clubNeymarPlayed: false, clubMbappePlayed: false,
      clubSalahPlayed: false, clubBenzemaPlayed: false, clubRonaldinhoPlayed: false, clubHaalandPlayed: false,
      clubLewandowskiPlayed: false, clubBeckhamPlayed: false, clubMaradonaPlayed: false, clubPelePlayed: false,
      clubFounded1902: false, clubFounded1899: false, clubFounded1892: false, clubFoundedAfter1900: true,
      clubInMadrid: false, clubInLondon: false, clubInMilan: false, clubInManchester: false,
      clubInParis: false, clubInMunich: false, clubInTurin: true, clubInLiverpoolCity: false, clubInBarcelonaCity: false,
      clubMostTitles: true, clubPlaysClassico: false, clubPlaysDerby: true, clubWonTreble: false, clubWonCWC: true,
      logoWhite: true, logoRed: false, logoBlue: false, logoGold: true, logoCrown: true, logoStar: true, logoAnimal: false,
      stadiumFamous: true, hasNickname: true, won30PlusLeagues: true, clubOlderThan120: true,
    },
    hint: 'السيدة العجوز... أبيض وأسود',
    wrongOptions: ['إيه سي ميلان', 'إنتر ميلان', 'نابولي'],
  },
];

// خريطة المراحل للكيانات
export const levelEntityMap: Record<number, string> = {
  46: 'messi', 47: 'ronaldo', 48: 'neymar', 49: 'mbappe', 50: 'haaland',
  51: 'salah', 52: 'benzema', 53: 'modric', 54: 'ronaldinho', 55: 'zidane_player',
  56: 'guardiola_coach', 57: 'ancelotti_coach', 58: 'klopp_coach', 59: 'simeone_coach', 60: 'zidane_coach',
  61: 'real_madrid_club', 62: 'barcelona_club', 63: 'liverpool_club', 64: 'bayern_club', 65: 'juventus_club',
};

export function getEntityForLevel(levelNum: number): GuessWhoEntity | undefined {
  const entityId = levelEntityMap[levelNum];
  return guessWhoEntities.find(e => e.id === entityId);
}

export function getQuestionsForType(type: 'player' | 'coach' | 'club'): GuessWhoQuestion[] {
  if (type === 'player') return playerQuestions;
  if (type === 'coach') return coachQuestions;
  return clubQuestions;
}
