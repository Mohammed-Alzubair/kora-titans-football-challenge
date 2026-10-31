import type { LeagueId } from './leagues';

export interface PlayerClue {
  id: string;
  leagueId: LeagueId;
  nameAr: string;
  nameEn: string;
  cluesAr: string[];
  cluesEn: string[];
}

type PlayerSeed = Omit<PlayerClue, 'cluesAr' | 'cluesEn'> & {
  factAr: string;
  factEn: string;
  clubAr: string;
  clubEn: string;
  countryAr: string;
  countryEn: string;
};

const seeds: PlayerSeed[] = [
  // Premier League: every answer option in this set has a documented PL playing career.
  { id: 'shearer', leagueId: 'premier-league', nameAr: 'آلان شيرر', nameEn: 'Alan Shearer', factAr: 'الهداف التاريخي للدوري الإنجليزي الممتاز بـ260 هدفاً.', factEn: 'The Premier League’s all-time leading scorer with 260 goals.', clubAr: 'بلاكبيرن روفرز ونيوكاسل يونايتد', clubEn: 'Blackburn Rovers and Newcastle United', countryAr: 'إنجلترا', countryEn: 'England' },
  { id: 'henry', leagueId: 'premier-league', nameAr: 'تييري هنري', nameEn: 'Thierry Henry', factAr: 'فاز بالحذاء الذهبي للدوري الإنجليزي أربع مرات.', factEn: 'Won the Premier League Golden Boot four times.', clubAr: 'أرسنال', clubEn: 'Arsenal', countryAr: 'فرنسا', countryEn: 'France' },
  { id: 'haaland', leagueId: 'premier-league', nameAr: 'إيرلينغ هالاند', nameEn: 'Erling Haaland', factAr: 'سجل 36 هدفاً في موسم 2022/23، وهو رقم قياسي لموسم من 38 مباراة.', factEn: 'Scored a record 36 goals in a 38-game Premier League season in 2022/23.', clubAr: 'مانشستر سيتي', clubEn: 'Manchester City', countryAr: 'النرويج', countryEn: 'Norway' },
  { id: 'salah', leagueId: 'premier-league', nameAr: 'محمد صلاح', nameEn: 'Mohamed Salah', factAr: 'سجل 32 هدفاً في موسم 2017/18، وهو رقم قياسي سابق لموسم من 38 مباراة.', factEn: 'Scored 32 goals in 2017/18, then a record for a 38-game Premier League season.', clubAr: 'ليفربول', clubEn: 'Liverpool', countryAr: 'مصر', countryEn: 'Egypt' },
  { id: 'rooney', leagueId: 'premier-league', nameAr: 'واين روني', nameEn: 'Wayne Rooney', factAr: 'سجل 208 أهداف في الدوري الإنجليزي الممتاز خلال مسيرته.', factEn: 'Scored 208 Premier League goals during his career.', clubAr: 'مانشستر يونايتد وإيفرتون', clubEn: 'Manchester United and Everton', countryAr: 'إنجلترا', countryEn: 'England' },
  { id: 'lampard', leagueId: 'premier-league', nameAr: 'فرانك لامبارد', nameEn: 'Frank Lampard', factAr: 'أعلى لاعب وسط تسجيلاً للأهداف في تاريخ الدوري الإنجليزي الممتاز.', factEn: 'The highest-scoring midfielder in Premier League history.', clubAr: 'تشيلسي', clubEn: 'Chelsea', countryAr: 'إنجلترا', countryEn: 'England' },
  { id: 'aguero', leagueId: 'premier-league', nameAr: 'سيرخيو أغويرو', nameEn: 'Sergio Agüero', factAr: 'سجل خمسة أهداف في 20 دقيقة أمام نيوكاسل عام 2015.', factEn: 'Scored five goals in 20 minutes against Newcastle in 2015.', clubAr: 'مانشستر سيتي', clubEn: 'Manchester City', countryAr: 'الأرجنتين', countryEn: 'Argentina' },
  { id: 'giggs', leagueId: 'premier-league', nameAr: 'ريان غيغز', nameEn: 'Ryan Giggs', factAr: 'صاحب الرقم القياسي لصناعة الأهداف في الدوري الإنجليزي الممتاز بـ162 تمريرة حاسمة.', factEn: 'Holds the Premier League record with 162 assists.', clubAr: 'مانشستر يونايتد', clubEn: 'Manchester United', countryAr: 'ويلز', countryEn: 'Wales' },

  // La Liga: historic league associations keep the clue pool stable across seasons.
  { id: 'messi', leagueId: 'la-liga', nameAr: 'ليونيل ميسي', nameEn: 'Lionel Messi', factAr: 'الهداف التاريخي للدوري الإسباني بـ474 هدفاً.', factEn: 'La Liga’s all-time leading scorer with 474 goals.', clubAr: 'برشلونة', clubEn: 'Barcelona', countryAr: 'الأرجنتين', countryEn: 'Argentina' },
  { id: 'cristiano', leagueId: 'la-liga', nameAr: 'كريستيانو رونالدو', nameEn: 'Cristiano Ronaldo', factAr: 'سجل 311 هدفاً في 292 مباراة بالدوري الإسباني.', factEn: 'Scored 311 goals in 292 La Liga appearances.', clubAr: 'ريال مدريد', clubEn: 'Real Madrid', countryAr: 'البرتغال', countryEn: 'Portugal' },
  { id: 'benzema', leagueId: 'la-liga', nameAr: 'كريم بنزيما', nameEn: 'Karim Benzema', factAr: 'فاز بالكرة الذهبية لعام 2022 بعد موسم قاد فيه ريال مدريد إلى لقب الدوري ودوري الأبطال.', factEn: 'Won the 2022 Ballon d’Or after leading Real Madrid to the league and Champions League titles.', clubAr: 'ريال مدريد', clubEn: 'Real Madrid', countryAr: 'فرنسا', countryEn: 'France' },
  { id: 'raul', leagueId: 'la-liga', nameAr: 'راؤول غونزاليس', nameEn: 'Raúl González', factAr: 'كان هداف ريال مدريد التاريخي حتى تجاوزه كريستيانو رونالدو.', factEn: 'Was Real Madrid’s all-time leading scorer before Cristiano Ronaldo surpassed him.', clubAr: 'ريال مدريد', clubEn: 'Real Madrid', countryAr: 'إسبانيا', countryEn: 'Spain' },
  { id: 'xavi', leagueId: 'la-liga', nameAr: 'تشافي هيرنانديز', nameEn: 'Xavi Hernández', factAr: 'خاض 505 مباريات في الدوري الإسباني مع برشلونة.', factEn: 'Made 505 La Liga appearances for Barcelona.', clubAr: 'برشلونة', clubEn: 'Barcelona', countryAr: 'إسبانيا', countryEn: 'Spain' },
  { id: 'iniesta', leagueId: 'la-liga', nameAr: 'أندريس إنييستا', nameEn: 'Andrés Iniesta', factAr: 'فاز بتسعة ألقاب للدوري الإسباني مع برشلونة.', factEn: 'Won nine La Liga titles with Barcelona.', clubAr: 'برشلونة', clubEn: 'Barcelona', countryAr: 'إسبانيا', countryEn: 'Spain' },
  { id: 'suarez-la-liga', leagueId: 'la-liga', nameAr: 'لويس سواريز', nameEn: 'Luis Suárez', factAr: 'أنهى موسم 2015/16 هدافاً وصانعاً للأهداف في الدوري الإسباني: 40 هدفاً و16 تمريرة حاسمة.', factEn: 'Finished as La Liga’s 2015/16 top scorer and joint top assist provider, with 40 goals and 16 assists.', clubAr: 'برشلونة', clubEn: 'Barcelona', countryAr: 'الأوروغواي', countryEn: 'Uruguay' },
  { id: 'aduriz', leagueId: 'la-liga', nameAr: 'أريتس أدوريز', nameEn: 'Aritz Aduriz', factAr: 'كان أكثر لاعب إسباني تسجيلاً في الدوري موسم 2015/16 برصيد 20 هدفاً.', factEn: 'Was La Liga’s highest-scoring Spanish player in 2015/16 with 20 goals.', clubAr: 'أتلتيك بلباو', clubEn: 'Athletic Club', countryAr: 'إسبانيا', countryEn: 'Spain' },

  // Serie A.
  { id: 'totti', leagueId: 'serie-a', nameAr: 'فرانشيسكو توتي', nameEn: 'Francesco Totti', factAr: 'سجل 250 هدفاً في الدوري الإيطالي، جميعها بقميص نادٍ واحد.', factEn: 'Scored 250 Serie A goals, all for one club.', clubAr: 'روما', clubEn: 'Roma', countryAr: 'إيطاليا', countryEn: 'Italy' },
  { id: 'del-piero', leagueId: 'serie-a', nameAr: 'أليساندرو ديل بييرو', nameEn: 'Alessandro Del Piero', factAr: 'الهداف التاريخي ليوفنتوس في المباريات الرسمية بـ290 هدفاً.', factEn: 'Juventus’ all-time leading scorer in official matches with 290 goals.', clubAr: 'يوفنتوس', clubEn: 'Juventus', countryAr: 'إيطاليا', countryEn: 'Italy' },
  { id: 'maradona', leagueId: 'serie-a', nameAr: 'دييغو مارادونا', nameEn: 'Diego Maradona', factAr: 'قاد نابولي إلى لقبي الدوري الإيطالي في 1986/87 و1989/90.', factEn: 'Led Napoli to the Serie A titles of 1986/87 and 1989/90.', clubAr: 'نابولي', clubEn: 'Napoli', countryAr: 'الأرجنتين', countryEn: 'Argentina' },
  { id: 'maldini', leagueId: 'serie-a', nameAr: 'باولو مالديني', nameEn: 'Paolo Maldini', factAr: 'قضى كامل مسيرته الاحترافية مع نادٍ واحد، وفاز بخمسة ألقاب أوروبية كبرى معه.', factEn: 'Spent his entire professional career at one club and won five European Cups there.', clubAr: 'ميلان', clubEn: 'AC Milan', countryAr: 'إيطاليا', countryEn: 'Italy' },
  { id: 'kaka', leagueId: 'serie-a', nameAr: 'كاكا', nameEn: 'Kaká', factAr: 'فاز بالكرة الذهبية لعام 2007 بعد قيادته ميلان للفوز بدوري الأبطال.', factEn: 'Won the 2007 Ballon d’Or after helping AC Milan win the Champions League.', clubAr: 'ميلان', clubEn: 'AC Milan', countryAr: 'البرازيل', countryEn: 'Brazil' },
  { id: 'buffon', leagueId: 'serie-a', nameAr: 'جانلويجي بوفون', nameEn: 'Gianluigi Buffon', factAr: 'يحمل الرقم القياسي لعدد مباريات الدوري الإيطالي وفق رابطة الدوري.', factEn: 'Holds the Serie A appearance record according to the league.', clubAr: 'يوفنتوس', clubEn: 'Juventus', countryAr: 'إيطاليا', countryEn: 'Italy' },
  { id: 'piola', leagueId: 'serie-a', nameAr: 'سيلفيو بيولا', nameEn: 'Silvio Piola', factAr: 'الهداف التاريخي للدوري الإيطالي في حقبة الدوري ذي المجموعة الواحدة بـ274 هدفاً.', factEn: 'The single-group era’s all-time Serie A leading scorer with 274 goals.', clubAr: 'لاتسيو ونوفارا وأندية إيطالية أخرى', clubEn: 'Lazio, Novara and other Italian clubs', countryAr: 'إيطاليا', countryEn: 'Italy' },
  { id: 'immobile', leagueId: 'serie-a', nameAr: 'تشيرو إيموبيلي', nameEn: 'Ciro Immobile', factAr: 'سجل 36 هدفاً في موسم 2019/20، معادلاً الرقم القياسي لأهداف موسم واحد في الدوري الإيطالي.', factEn: 'Scored 36 goals in 2019/20, equalling the Serie A single-season record.', clubAr: 'لاتسيو', clubEn: 'Lazio', countryAr: 'إيطاليا', countryEn: 'Italy' },

  // Bundesliga.
  { id: 'lewandowski', leagueId: 'bundesliga', nameAr: 'روبرت ليفاندوفسكي', nameEn: 'Robert Lewandowski', factAr: 'سجل 41 هدفاً في موسم 2020/21، محطماً الرقم القياسي للأهداف في موسم واحد.', factEn: 'Scored a record 41 goals in the 2020/21 Bundesliga season.', clubAr: 'بايرن ميونخ', clubEn: 'Bayern Munich', countryAr: 'بولندا', countryEn: 'Poland' },
  { id: 'gerd-muller', leagueId: 'bundesliga', nameAr: 'غيرد مولر', nameEn: 'Gerd Müller', factAr: 'الهداف التاريخي للدوري الألماني بـ365 هدفاً.', factEn: 'The Bundesliga’s all-time leading scorer with 365 goals.', clubAr: 'بايرن ميونخ', clubEn: 'Bayern Munich', countryAr: 'ألمانيا', countryEn: 'Germany' },
  { id: 'lahm', leagueId: 'bundesliga', nameAr: 'فيليب لام', nameEn: 'Philipp Lahm', factAr: 'رفع كأس دوري الأبطال قائداً لبايرن ميونخ في 2013.', factEn: 'Lifted the Champions League trophy as Bayern Munich captain in 2013.', clubAr: 'بايرن ميونخ', clubEn: 'Bayern Munich', countryAr: 'ألمانيا', countryEn: 'Germany' },
  { id: 'reus', leagueId: 'bundesliga', nameAr: 'ماركو رويس', nameEn: 'Marco Reus', factAr: 'اختير أفضل لاعب ألماني في 2012 قبل أن يصبح أحد أبرز قادة بوروسيا دورتموند.', factEn: 'Was named Germany’s Footballer of the Year in 2012 and became a Dortmund captain.', clubAr: 'بوروسيا دورتموند', clubEn: 'Borussia Dortmund', countryAr: 'ألمانيا', countryEn: 'Germany' },
  { id: 'ribery', leagueId: 'bundesliga', nameAr: 'فرانك ريبيري', nameEn: 'Franck Ribéry', factAr: 'كان جزءاً من ثلاثية بايرن التاريخية في موسم 2012/13.', factEn: 'Was part of Bayern’s historic treble-winning side in 2012/13.', clubAr: 'بايرن ميونخ', clubEn: 'Bayern Munich', countryAr: 'فرنسا', countryEn: 'France' },
  { id: 'neuer', leagueId: 'bundesliga', nameAr: 'مانويل نوير', nameEn: 'Manuel Neuer', factAr: 'فاز بكأس العالم 2014 وحارساً أساسياً لبايرن في ثلاثية 2013.', factEn: 'Won the 2014 World Cup and was Bayern’s starting goalkeeper in the 2013 treble.', clubAr: 'بايرن ميونخ', clubEn: 'Bayern Munich', countryAr: 'ألمانيا', countryEn: 'Germany' },
  { id: 'fischer', leagueId: 'bundesliga', nameAr: 'كلاوس فيشر', nameEn: 'Klaus Fischer', factAr: 'ثالث هدافي الدوري الألماني تاريخياً بـ268 هدفاً خلال 535 مباراة.', factEn: 'Third on the Bundesliga all-time scoring list with 268 goals in 535 appearances.', clubAr: 'شالكه وكولن وبوخوم وميونخ 1860', clubEn: 'Schalke, Cologne, Bochum and 1860 Munich', countryAr: 'ألمانيا', countryEn: 'Germany' },
  { id: 'pizarro', leagueId: 'bundesliga', nameAr: 'كلاوديو بيتزارو', nameEn: 'Claudio Pizarro', factAr: 'أكبر هداف في تاريخ الدوري الألماني؛ سجل بعمر 40 عاماً وسبعة أشهر.', factEn: 'The Bundesliga’s oldest goalscorer, scoring aged 40 years and seven months.', clubAr: 'بايرن ميونخ وفيردر بريمن وكولن', clubEn: 'Bayern Munich, Werder Bremen and Cologne', countryAr: 'بيرو', countryEn: 'Peru' },

  // Ligue 1.
  { id: 'mbappe', leagueId: 'ligue-1', nameAr: 'كيليان مبابي', nameEn: 'Kylian Mbappé', factAr: 'فاز بالحذاء الذهبي للدوري الفرنسي ستة مواسم متتالية من 2018/19 إلى 2023/24.', factEn: 'Won the Ligue 1 Golden Boot six seasons in a row, from 2018/19 to 2023/24.', clubAr: 'باريس سان جيرمان وموناكو', clubEn: 'Paris Saint-Germain and Monaco', countryAr: 'فرنسا', countryEn: 'France' },
  { id: 'juninho', leagueId: 'ligue-1', nameAr: 'جونينيو بيرنامبوكانو', nameEn: 'Juninho Pernambucano', factAr: 'كان قائداً لليون خلال سلسلة الألقاب السبعة المتتالية في الدوري الفرنسي.', factEn: 'Captained Lyon during its run of seven consecutive French league titles.', clubAr: 'ليون', clubEn: 'Lyon', countryAr: 'البرازيل', countryEn: 'Brazil' },
  { id: 'cavani', leagueId: 'ligue-1', nameAr: 'إدينسون كافاني', nameEn: 'Edinson Cavani', factAr: 'أنهى فترته مع باريس سان جيرمان هدافاً تاريخياً للنادي قبل أن يتجاوزه مبابي.', factEn: 'Left Paris Saint-Germain as the club’s all-time top scorer before Mbappé surpassed him.', clubAr: 'باريس سان جيرمان', clubEn: 'Paris Saint-Germain', countryAr: 'الأوروغواي', countryEn: 'Uruguay' },
  { id: 'ibrahimovic', leagueId: 'ligue-1', nameAr: 'زلاتان إبراهيموفيتش', nameEn: 'Zlatan Ibrahimović', factAr: 'سجل 38 هدفاً في الدوري الفرنسي موسم 2015/16.', factEn: 'Scored 38 Ligue 1 goals in the 2015/16 season.', clubAr: 'باريس سان جيرمان', clubEn: 'Paris Saint-Germain', countryAr: 'السويد', countryEn: 'Sweden' },
  { id: 'ronaldinho', leagueId: 'ligue-1', nameAr: 'رونالدينيو', nameEn: 'Ronaldinho', factAr: 'انتقل من باريس سان جيرمان إلى برشلونة في 2003، بعد موسمين في فرنسا.', factEn: 'Moved from Paris Saint-Germain to Barcelona in 2003 after two seasons in France.', clubAr: 'باريس سان جيرمان', clubEn: 'Paris Saint-Germain', countryAr: 'البرازيل', countryEn: 'Brazil' },
  { id: 'verratti', leagueId: 'ligue-1', nameAr: 'ماركو فيراتي', nameEn: 'Marco Verratti', factAr: 'خاض أكثر من 400 مباراة رسمية مع باريس سان جيرمان.', factEn: 'Made more than 400 official appearances for Paris Saint-Germain.', clubAr: 'باريس سان جيرمان', clubEn: 'Paris Saint-Germain', countryAr: 'إيطاليا', countryEn: 'Italy' },
  { id: 'onnis', leagueId: 'ligue-1', nameAr: 'ديليو أونيس', nameEn: 'Delio Onnis', factAr: 'الهداف التاريخي للدوري الفرنسي بـ299 هدفاً.', factEn: 'The all-time leading scorer in France’s top division with 299 goals.', clubAr: 'موناكو وريمس وتور وتولون', clubEn: 'Monaco, Reims, Tours and Toulon', countryAr: 'الأرجنتين', countryEn: 'Argentina' },
  { id: 'pauleta', leagueId: 'ligue-1', nameAr: 'بيدرو باوليتا', nameEn: 'Pedro Pauleta', factAr: 'سجل 141 هدفاً في الدوري الفرنسي مع بوردو وباريس سان جيرمان.', factEn: 'Scored 141 Ligue 1 goals for Bordeaux and Paris Saint-Germain.', clubAr: 'بوردو وباريس سان جيرمان', clubEn: 'Bordeaux and Paris Saint-Germain', countryAr: 'البرتغال', countryEn: 'Portugal' },

  // Saudi Pro League: explicitly historical league links, not claims about today's squads.
  { id: 'ronaldo-saudi', leagueId: 'saudi-pro-league', nameAr: 'كريستيانو رونالدو', nameEn: 'Cristiano Ronaldo', factAr: 'سجل 35 هدفاً في دوري روشن موسم 2023/24، وهو رقم قياسي لموسم واحد.', factEn: 'Scored a record 35 goals in the 2023/24 Saudi Pro League season.', clubAr: 'النصر', clubEn: 'Al Nassr', countryAr: 'البرتغال', countryEn: 'Portugal' },
  { id: 'mitrovic', leagueId: 'saudi-pro-league', nameAr: 'ألكسندر ميتروفيتش', nameEn: 'Aleksandar Mitrović', factAr: 'سجل 28 هدفاً للهلال في موسم 2023/24، وهو أعلى رصيد للاعب في تاريخ النادي بموسم واحد.', factEn: 'Scored 28 goals for Al Hilal in 2023/24, a club single-season record.', clubAr: 'الهلال', clubEn: 'Al Hilal', countryAr: 'صربيا', countryEn: 'Serbia' },
  { id: 'mahrez', leagueId: 'saudi-pro-league', nameAr: 'رياض محرز', nameEn: 'Riyad Mahrez', factAr: 'صنع 13 هدفاً في دوري روشن موسم 2023/24، أكثر من أي لاعب آخر في ذلك الموسم.', factEn: 'Recorded 13 assists in the 2023/24 Saudi Pro League, the most that season.', clubAr: 'الأهلي', clubEn: 'Al Ahli', countryAr: 'الجزائر', countryEn: 'Algeria' },
  { id: 'mane', leagueId: 'saudi-pro-league', nameAr: 'ساديو ماني', nameEn: 'Sadio Mané', factAr: 'كان ضمن تشكيلة النصر التي أنهت موسم 2023/24 بأكثر من 100 هدف في الدوري.', factEn: 'Was part of the Al Nassr side that scored more than 100 league goals in 2023/24.', clubAr: 'النصر', clubEn: 'Al Nassr', countryAr: 'السنغال', countryEn: 'Senegal' },
  { id: 'salem', leagueId: 'saudi-pro-league', nameAr: 'سالم الدوسري', nameEn: 'Salem Al-Dawsari', factAr: 'سجل هدفين للهلال في نهائي دوري أبطال آسيا 2021 أمام بوهانغ ستيلرز.', factEn: 'Scored twice for Al Hilal in the 2021 AFC Champions League final against Pohang Steelers.', clubAr: 'الهلال', clubEn: 'Al Hilal', countryAr: 'السعودية', countryEn: 'Saudi Arabia' },
  { id: 'hamdallah', leagueId: 'saudi-pro-league', nameAr: 'عبد الرزاق حمد الله', nameEn: 'Abderrazak Hamdallah', factAr: 'أصبح ثاني هدافي دوري روشن التاريخيين في 2024 برصيد 129 هدفاً آنذاك.', factEn: 'Reached second place on the Saudi Pro League’s all-time scoring list in 2024 with 129 goals at the time.', clubAr: 'النصر والاتحاد', clubEn: 'Al Nassr and Al Ittihad', countryAr: 'المغرب', countryEn: 'Morocco' },
  { id: 'benzema-saudi', leagueId: 'saudi-pro-league', nameAr: 'كريم بنزيما', nameEn: 'Karim Benzema', factAr: 'قاد الاتحاد إلى ثنائية الدوري وكأس الملك في موسم 2024/25، وسجل 21 هدفاً في الدوري.', factEn: 'Led Al Ittihad to the 2024/25 league-and-cup double and scored 21 league goals.', clubAr: 'الاتحاد', clubEn: 'Al Ittihad', countryAr: 'فرنسا', countryEn: 'France' },
  { id: 'toney', leagueId: 'saudi-pro-league', nameAr: 'إيفان توني', nameEn: 'Ivan Toney', factAr: 'سجل 23 هدفاً للأهلي في موسم 2024/25، وجاء ثانياً في سباق الهدافين.', factEn: 'Scored 23 goals for Al Ahli in 2024/25, finishing second in the scoring race.', clubAr: 'الأهلي', clubEn: 'Al Ahli', countryAr: 'إنجلترا', countryEn: 'England' },

  // Egyptian Premier League.
  { id: 'aboutrika', leagueId: 'egyptian-premier-league', nameAr: 'محمد أبو تريكة', nameEn: 'Mohamed Aboutrika', factAr: 'فاز بدوري أبطال أفريقيا خمس مرات مع الأهلي، وكان عنصراً رئيسياً في جيل 2005–2013.', factEn: 'Won the CAF Champions League five times with Al Ahly and starred in its 2005–13 era.', clubAr: 'الأهلي', clubEn: 'Al Ahly', countryAr: 'مصر', countryEn: 'Egypt' },
  { id: 'el-hadary', leagueId: 'egyptian-premier-league', nameAr: 'عصام الحضري', nameEn: 'Essam El-Hadary', factAr: 'أصبح أكبر لاعب يشارك في مباراة بكأس العالم، بعمر 45 عاماً في 2018.', factEn: 'Became the oldest player to appear at a men’s World Cup, aged 45 in 2018.', clubAr: 'الأهلي والإسماعيلي', clubEn: 'Al Ahly and Ismaily', countryAr: 'مصر', countryEn: 'Egypt' },
  { id: 'moteab', leagueId: 'egyptian-premier-league', nameAr: 'عماد متعب', nameEn: 'Emad Moteab', factAr: 'كان هداف الدوري المصري موسم 2004/05 قبل أن يصبح أحد أبرز مهاجمي الأهلي.', factEn: 'Was the Egyptian Premier League’s top scorer in 2004/05 before becoming one of Al Ahly’s leading forwards.', clubAr: 'الأهلي', clubEn: 'Al Ahly', countryAr: 'مصر', countryEn: 'Egypt' },
  { id: 'shikabala', leagueId: 'egyptian-premier-league', nameAr: 'شيكابالا', nameEn: 'Shikabala', factAr: 'قائد الزمالك في تتويج الفريق بلقب الدوري المصري موسمي 2020/21 و2021/22.', factEn: 'Captained Zamalek during its Egyptian league titles in 2020/21 and 2021/22.', clubAr: 'الزمالك', clubEn: 'Zamalek', countryAr: 'مصر', countryEn: 'Egypt' },
  { id: 'zizo', leagueId: 'egyptian-premier-league', nameAr: 'أحمد سيد زيزو', nameEn: 'Ahmed Sayed Zizo', factAr: 'تصدر قائمة هدافي الدوري المصري موسم 2021/22 بقميص الزمالك.', factEn: 'Finished as the Egyptian Premier League’s top scorer in 2021/22 with Zamalek.', clubAr: 'الزمالك', clubEn: 'Zamalek', countryAr: 'مصر', countryEn: 'Egypt' },
  { id: 'el-shenawy', leagueId: 'egyptian-premier-league', nameAr: 'محمد الشناوي', nameEn: 'Mohamed El Shenawy', factAr: 'حارس مرمى الأهلي الذي فاز بجائزة أفضل لاعب في مباراة مصر وأوروغواي بمونديال 2018.', factEn: 'Al Ahly goalkeeper named Player of the Match in Egypt’s 2018 World Cup game against Uruguay.', clubAr: 'الأهلي', clubEn: 'Al Ahly', countryAr: 'مصر', countryEn: 'Egypt' },
  { id: 'hossam-hassan-player', leagueId: 'egyptian-premier-league', nameAr: 'حسام حسن', nameEn: 'Hossam Hassan', factAr: 'ثاني الهدافين في تاريخ الدوري المصري برصيد 168 هدفاً، وسجل للأهلي والزمالك والمصري والترسانة.', factEn: 'Second on the Egyptian league’s all-time scoring list with 168 goals for Al Ahly, Zamalek, Al Masry and Tersana.', clubAr: 'الأهلي والزمالك والمصري والترسانة', clubEn: 'Al Ahly, Zamalek, Al Masry and Tersana', countryAr: 'مصر', countryEn: 'Egypt' },
  { id: 'khatib', leagueId: 'egyptian-premier-league', nameAr: 'محمود الخطيب', nameEn: 'Mahmoud El Khatib', factAr: 'يتقاسم مع حسام حسن الرقم القياسي لهدافي الأهلي في الدوري المصري بـ109 أهداف.', factEn: 'Shares Al Ahly’s Egyptian league scoring record with Hossam Hassan at 109 goals.', clubAr: 'الأهلي', clubEn: 'Al Ahly', countryAr: 'مصر', countryEn: 'Egypt' },
];

export const playerClues: PlayerClue[] = seeds.map((player) => ({
  id: player.id,
  leagueId: player.leagueId,
  nameAr: player.nameAr,
  nameEn: player.nameEn,
  cluesAr: [player.factAr, `ارتبط في هذا الدوري بنادي ${player.clubAr}.`, `يمثل دولياً منتخب ${player.countryAr}.`],
  cluesEn: [player.factEn, `His league connection in this quiz is ${player.clubEn}.`, `He represents ${player.countryEn} internationally.`],
}));

export function getPlayerName(player: PlayerClue, locale: 'ar' | 'en'): string {
  return locale === 'ar' ? player.nameAr : player.nameEn;
}

export function getPlayerClues(player: PlayerClue, locale: 'ar' | 'en'): string[] {
  return locale === 'ar' ? player.cluesAr : player.cluesEn;
}

export function getRandomCluesQuestion(usedIds: string[]): { player: PlayerClue; options: PlayerClue[] } {
  const available = playerClues.filter((player) => !usedIds.includes(player.id));
  const player = available[Math.floor(Math.random() * available.length)];
  const sameLeaguePlayers = playerClues.filter((candidate) => candidate.leagueId === player.leagueId && candidate.id !== player.id);
  const distractors = [...sameLeaguePlayers].sort(() => Math.random() - 0.5).slice(0, 3);
  return { player, options: [player, ...distractors].sort(() => Math.random() - 0.5) };
}
