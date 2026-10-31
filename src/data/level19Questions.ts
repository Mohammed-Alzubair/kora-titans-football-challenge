import type { LeagueId } from './leagues';

export interface CoachQuizProfile {
  id: string;
  nameAr: string;
  nameEn: string;
  leagueIds: LeagueId[];
}

export interface CoachAchievementQuestion {
  id: number;
  coachId: string;
  leagueId: LeagueId;
  achievementsAr: string[];
  achievementsEn: string[];
  options: CoachQuizProfile[];
  correctIndex: number;
}

const coachProfiles: CoachQuizProfile[] = [
  { id: 'ferguson', nameAr: 'السير أليكس فيرغسون', nameEn: 'Sir Alex Ferguson', leagueIds: ['premier-league'] },
  { id: 'wenger', nameAr: 'أرسين فينغر', nameEn: 'Arsène Wenger', leagueIds: ['premier-league'] },
  { id: 'pep', nameAr: 'بيب غوارديولا', nameEn: 'Pep Guardiola', leagueIds: ['premier-league', 'la-liga', 'bundesliga'] },
  { id: 'mourinho', nameAr: 'جوزيه مورينيو', nameEn: 'José Mourinho', leagueIds: ['premier-league', 'la-liga'] },
  { id: 'klopp', nameAr: 'يورغن كلوب', nameEn: 'Jürgen Klopp', leagueIds: ['premier-league', 'bundesliga'] },
  { id: 'conte', nameAr: 'أنطونيو كونتي', nameEn: 'Antonio Conte', leagueIds: ['premier-league', 'serie-a'] },
  { id: 'ranieri', nameAr: 'كلاوديو رانييري', nameEn: 'Claudio Ranieri', leagueIds: ['premier-league', 'serie-a'] },
  { id: 'arteta', nameAr: 'ميكيل أرتيتا', nameEn: 'Mikel Arteta', leagueIds: ['premier-league'] },
  { id: 'ancelotti', nameAr: 'كارلو أنشيلوتي', nameEn: 'Carlo Ancelotti', leagueIds: ['premier-league', 'la-liga', 'serie-a', 'bundesliga', 'ligue-1'] },
  { id: 'simeone', nameAr: 'دييغو سيميوني', nameEn: 'Diego Simeone', leagueIds: ['la-liga'] },
  { id: 'zidane', nameAr: 'زين الدين زيدان', nameEn: 'Zinedine Zidane', leagueIds: ['la-liga'] },
  { id: 'luis-enrique', nameAr: 'لويس إنريكي', nameEn: 'Luis Enrique', leagueIds: ['la-liga', 'ligue-1'] },
  { id: 'del-bosque', nameAr: 'فيسنتي ديل بوسكي', nameEn: 'Vicente del Bosque', leagueIds: ['la-liga'] },
  { id: 'capello', nameAr: 'فابيو كابيلو', nameEn: 'Fabio Capello', leagueIds: ['la-liga', 'serie-a'] },
  { id: 'inzaghi', nameAr: 'سيموني إنزاغي', nameEn: 'Simone Inzaghi', leagueIds: ['serie-a'] },
  { id: 'lippi', nameAr: 'مارشيلو ليبي', nameEn: 'Marcello Lippi', leagueIds: ['serie-a'] },
  { id: 'allegri', nameAr: 'ماسيميليانو أليغري', nameEn: 'Massimiliano Allegri', leagueIds: ['serie-a'] },
  { id: 'sarri', nameAr: 'ماوريتسيو ساري', nameEn: 'Maurizio Sarri', leagueIds: ['serie-a'] },
  { id: 'spalletti', nameAr: 'لوتشيانو سباليتي', nameEn: 'Luciano Spalletti', leagueIds: ['serie-a'] },
  { id: 'heynckes', nameAr: 'يوب هاينكس', nameEn: 'Jupp Heynckes', leagueIds: ['bundesliga'] },
  { id: 'flick', nameAr: 'هانزي فليك', nameEn: 'Hansi Flick', leagueIds: ['bundesliga'] },
  { id: 'tuchel', nameAr: 'توماس توخيل', nameEn: 'Thomas Tuchel', leagueIds: ['bundesliga', 'ligue-1'] },
  { id: 'hitzfeld', nameAr: 'أوتمار هيتسفيلد', nameEn: 'Ottmar Hitzfeld', leagueIds: ['bundesliga'] },
  { id: 'nagelsmann', nameAr: 'يوليان ناغلسمان', nameEn: 'Julian Nagelsmann', leagueIds: ['bundesliga'] },
  { id: 'blanc', nameAr: 'لوران بلان', nameEn: 'Laurent Blanc', leagueIds: ['ligue-1', 'saudi-pro-league'] },
  { id: 'galtier', nameAr: 'كريستوف غالتييه', nameEn: 'Christophe Galtier', leagueIds: ['ligue-1'] },
  { id: 'pochettino', nameAr: 'ماوريسيو بوكيتينو', nameEn: 'Mauricio Pochettino', leagueIds: ['ligue-1'] },
  { id: 'emery', nameAr: 'أوناي إيمري', nameEn: 'Unai Emery', leagueIds: ['ligue-1'] },
  { id: 'jesus', nameAr: 'جورجي جيسوس', nameEn: 'Jorge Jesus', leagueIds: ['saudi-pro-league'] },
  { id: 'nuno', nameAr: 'نونو إسبيريتو سانتو', nameEn: 'Nuno Espírito Santo', leagueIds: ['saudi-pro-league'] },
  { id: 'ramon-diaz', nameAr: 'رامون دياز', nameEn: 'Ramón Díaz', leagueIds: ['saudi-pro-league'] },
  { id: 'gallardo', nameAr: 'مارسيلو غاياردو', nameEn: 'Marcelo Gallardo', leagueIds: ['saudi-pro-league'] },
  { id: 'pioli', nameAr: 'ستيفانو بيولي', nameEn: 'Stefano Pioli', leagueIds: ['saudi-pro-league', 'serie-a'] },
  { id: 'rui-vitoria', nameAr: 'روي فيتوريا', nameEn: 'Rui Vitória', leagueIds: ['saudi-pro-league'] },
  { id: 'manuel-jose', nameAr: 'مانويل جوزيه', nameEn: 'Manuel José', leagueIds: ['egyptian-premier-league'] },
  { id: 'mosimane', nameAr: 'بيتسو موسيماني', nameEn: 'Pitso Mosimane', leagueIds: ['egyptian-premier-league'] },
  { id: 'koller', nameAr: 'مارسيل كولر', nameEn: 'Marcel Koller', leagueIds: ['egyptian-premier-league'] },
  { id: 'ferreira', nameAr: 'جوسفالدو فيريرا', nameEn: 'Jesualdo Ferreira', leagueIds: ['egyptian-premier-league'] },
  { id: 'weiller', nameAr: 'رينيه فايلر', nameEn: 'René Weiler', leagueIds: ['egyptian-premier-league'] },
  { id: 'badry', nameAr: 'حسام البدري', nameEn: 'Hossam El Badry', leagueIds: ['egyptian-premier-league'] },
  { id: 'hossam-hassan', nameAr: 'حسام حسن', nameEn: 'Hossam Hassan', leagueIds: ['egyptian-premier-league'] },
  { id: 'mancini', nameAr: 'روبرتو مانشيني', nameEn: 'Roberto Mancini', leagueIds: ['premier-league'] },
  { id: 'valverde', nameAr: 'إرنستو فالفيردي', nameEn: 'Ernesto Valverde', leagueIds: ['la-liga'] },
  { id: 'schaaf', nameAr: 'توماس شاف', nameEn: 'Thomas Schaaf', leagueIds: ['bundesliga'] },
  { id: 'houllier', nameAr: 'جيرار هوييه', nameEn: 'Gérard Houllier', leagueIds: ['ligue-1'] },
];

type QuestionSeed = Omit<CoachAchievementQuestion, 'options' | 'correctIndex'>;

const questionSeeds: QuestionSeed[] = [
  { id: 1, coachId: 'ferguson', leagueId: 'premier-league', achievementsAr: ['فاز بـ13 لقباً للدوري الإنجليزي الممتاز مع مانشستر يونايتد.', 'حقق أول لقب في موسم 1992/93، والأخير في موسمه الختامي 2012/13.', 'يحمل الرقم القياسي لعدد ألقاب مدرب واحد في المسابقة.'], achievementsEn: ['Won 13 Premier League titles with Manchester United.', 'His first came in 1992/93 and his last in his final season, 2012/13.', 'He holds the competition record for titles by a manager.'] },
  { id: 2, coachId: 'wenger', leagueId: 'premier-league', achievementsAr: ['قاد أرسنال إلى موسم دوري بلا هزيمة في 2003/04.', 'فاز بثلاثة ألقاب للدوري الإنجليزي مع النادي.', 'ارتبط فريقه غير المهزوم بلقب «اللا يقهرون».'], achievementsEn: ['Led Arsenal through an unbeaten league season in 2003/04.', 'Won three Premier League titles with the club.', 'That unbeaten side became known as “The Invincibles”.'] },
  { id: 3, coachId: 'pep', leagueId: 'premier-league', achievementsAr: ['قاد مانشستر سيتي إلى أربعة ألقاب متتالية من 2020/21 إلى 2023/24.', 'حقق مع النادي ستة ألقاب للدوري الإنجليزي حتى نهاية 2023/24.', 'أصبح أول مدرب يحقق أربعة ألقاب متتالية في المسابقة.'], achievementsEn: ['Led Manchester City to four straight titles from 2020/21 to 2023/24.', 'Had won six Premier League titles with the club by the end of 2023/24.', 'Became the first manager to win four consecutive titles in the competition.'] },
  { id: 4, coachId: 'klopp', leagueId: 'premier-league', achievementsAr: ['قاد ليفربول إلى لقب الدوري الإنجليزي موسم 2019/20.', 'كان ذلك أول لقب دوري للنادي منذ 1990.', 'فاز معه أيضاً بدوري أبطال أوروبا في 2019.'], achievementsEn: ['Led Liverpool to the 2019/20 Premier League title.', 'It was the club’s first league title since 1990.', 'He also won the 2019 Champions League with Liverpool.'] },

  { id: 5, coachId: 'simeone', leagueId: 'la-liga', achievementsAr: ['قاد أتلتيكو مدريد إلى لقب الدوري الإسباني في 2013/14 ثم 2020/21.', 'كسر في 2013/14 هيمنة ريال مدريد وبرشلونة على اللقب.', 'كان لاعب وسط أرجنتينياً قبل أن يصبح مدرب الفريق.'], achievementsEn: ['Led Atlético Madrid to La Liga titles in 2013/14 and 2020/21.', 'His 2013/14 side broke the Real Madrid–Barcelona title duopoly.', 'He had been an Argentine midfielder before taking charge of the club.'] },
  { id: 6, coachId: 'zidane', leagueId: 'la-liga', achievementsAr: ['فاز بالدوري الإسباني مع ريال مدريد في 2016/17 و2019/20.', 'قاد الفريق إلى ثلاثة ألقاب متتالية في دوري الأبطال.', 'كان لاعباً فرنسياً فاز بالكرة الذهبية قبل التدريب.'], achievementsEn: ['Won La Liga with Real Madrid in 2016/17 and 2019/20.', 'Led the club to three consecutive Champions League titles.', 'He was a French Ballon d’Or-winning player before coaching.'] },
  { id: 7, coachId: 'pep', leagueId: 'la-liga', achievementsAr: ['قاد برشلونة إلى ثلاثية الدوري والكأس ودوري الأبطال في موسم 2008/09.', 'فاز بثلاثة ألقاب متتالية للدوري الإسباني من 2008/09 إلى 2010/11.', 'كان لاعب وسط سابقاً في برشلونة.'], achievementsEn: ['Led Barcelona to the league, cup and Champions League treble in 2008/09.', 'Won three consecutive La Liga titles from 2008/09 through 2010/11.', 'He had previously played as a Barcelona midfielder.'] },
  { id: 8, coachId: 'del-bosque', leagueId: 'la-liga', achievementsAr: ['قاد ريال مدريد إلى لقب الدوري الإسباني مرتين في بدايات الألفية.', 'فاز معه بدوري أبطال أوروبا عامي 2000 و2002.', 'قاد منتخب إسبانيا لاحقاً إلى كأس العالم 2010.'], achievementsEn: ['Led Real Madrid to two La Liga titles around the turn of the millennium.', 'Won the Champions League with the club in 2000 and 2002.', 'Later guided Spain to the 2010 World Cup.'] },

  { id: 9, coachId: 'conte', leagueId: 'serie-a', achievementsAr: ['فاز بثلاثة ألقاب متتالية للدوري الإيطالي مع يوفنتوس من 2011/12 إلى 2013/14.', 'أنهى موسمه الأول مع يوفنتوس بلا هزيمة في الدوري.', 'فاز لاحقاً بلقب الدوري الإيطالي مع إنتر في 2020/21.'], achievementsEn: ['Won three straight Serie A titles with Juventus from 2011/12 to 2013/14.', 'His first Juventus league season was unbeaten.', 'Later won Serie A with Inter in 2020/21.'] },
  { id: 10, coachId: 'inzaghi', leagueId: 'serie-a', achievementsAr: ['قاد إنتر إلى لقب الدوري الإيطالي 2023/24 وإلى النجمة الثانية للنادي.', 'فاز مع إنتر بكأس إيطاليا مرتين متتاليتين في 2022 و2023.', 'كان مهاجماً دولياً قبل أن يصبح مدرباً.'], achievementsEn: ['Led Inter to the 2023/24 Serie A title and the club’s second star.', 'Won back-to-back Coppa Italia titles with Inter in 2022 and 2023.', 'He was an international striker before becoming a manager.'] },
  { id: 11, coachId: 'lippi', leagueId: 'serie-a', achievementsAr: ['قاد يوفنتوس إلى خمسة ألقاب للدوري الإيطالي خلال فترته الأولى والثانية.', 'فاز بدوري أبطال أوروبا مع يوفنتوس عام 1996.', 'قاد إيطاليا لاحقاً إلى الفوز بكأس العالم 2006.'], achievementsEn: ['Led Juventus to five Serie A titles across his two spells.', 'Won the 1996 Champions League with Juventus.', 'Later guided Italy to the 2006 World Cup.'] },
  { id: 12, coachId: 'ancelotti', leagueId: 'serie-a', achievementsAr: ['قاد ميلان إلى لقب الدوري الإيطالي موسم 2003/04.', 'فاز بدوري الأبطال مع ميلان في 2003 و2007.', 'كان لاعب وسط في منتخب إيطاليا وميلان قبل التدريب.'], achievementsEn: ['Led AC Milan to the 2003/04 Serie A title.', 'Won the Champions League with Milan in 2003 and 2007.', 'He had been a midfielder for Italy and AC Milan before coaching.'] },

  { id: 13, coachId: 'pep', leagueId: 'bundesliga', achievementsAr: ['فاز بثلاثة ألقاب متتالية للدوري الألماني مع بايرن ميونخ.', 'قاد بايرن بين 2013 و2016.', 'سبق له الفوز بالدوري الإسباني والدوري الإنجليزي أيضاً.'], achievementsEn: ['Won three consecutive Bundesliga titles with Bayern Munich.', 'Managed Bayern from 2013 to 2016.', 'He had also won the Spanish and English league titles.'] },
  { id: 14, coachId: 'heynckes', leagueId: 'bundesliga', achievementsAr: ['قاد بايرن ميونخ إلى الثلاثية التاريخية في موسم 2012/13.', 'فاز بالدوري الألماني ودوري الأبطال في ذلك الموسم.', 'قاد الفريق إلى لقب دوري ألماني آخر في عودته عام 2018.'], achievementsEn: ['Led Bayern Munich to the historic treble in 2012/13.', 'Won the Bundesliga and Champions League that season.', 'Returned to guide the club to another German league title in 2018.'] },
  { id: 15, coachId: 'flick', leagueId: 'bundesliga', achievementsAr: ['قاد بايرن إلى ستة ألقاب في عام 2020، بينها الدوري الألماني ودوري الأبطال.', 'أكمل بايرن معه الثلاثية في موسم 2019/20.', 'سبق أن عمل مساعداً ليواخيم لوف مع منتخب ألمانيا.'], achievementsEn: ['Led Bayern to six trophies in 2020, including the Bundesliga and Champions League.', 'Completed the 2019/20 treble with Bayern.', 'Earlier served as Joachim Löw’s assistant with Germany.'] },
  { id: 16, coachId: 'klopp', leagueId: 'bundesliga', achievementsAr: ['قاد بوروسيا دورتموند إلى لقبين متتاليين للدوري الألماني في 2011 و2012.', 'حقق الثنائية المحلية في موسم 2011/12.', 'كان لاعباً ومدرباً لماينز قبل انتقاله إلى دورتموند.'], achievementsEn: ['Led Borussia Dortmund to consecutive Bundesliga titles in 2011 and 2012.', 'Completed the domestic double in 2011/12.', 'He had played for and managed Mainz before moving to Dortmund.'] },

  { id: 17, coachId: 'blanc', leagueId: 'ligue-1', achievementsAr: ['قاد باريس سان جيرمان إلى ثلاثة ألقاب متتالية للدوري الفرنسي بين 2013/14 و2015/16.', 'حقق مع النادي الثلاثية المحلية الفرنسية في موسمي 2014/15 و2015/16.', 'كان مدافعاً دولياً فرنسياً قبل التدريب.'], achievementsEn: ['Led Paris Saint-Germain to three straight Ligue 1 titles from 2013/14 to 2015/16.', 'Won the domestic treble in both 2014/15 and 2015/16.', 'He was a French international defender before coaching.'] },
  { id: 18, coachId: 'galtier', leagueId: 'ligue-1', achievementsAr: ['قاد ليل إلى لقب الدوري الفرنسي موسم 2020/21 متقدماً على باريس سان جيرمان.', 'اختير مدرب الموسم في فرنسا لذلك الإنجاز.', 'فاز لاحقاً بالدوري الفرنسي مع باريس سان جيرمان.'], achievementsEn: ['Led Lille to the 2020/21 Ligue 1 title ahead of Paris Saint-Germain.', 'Was named France’s Manager of the Year for that achievement.', 'Later won Ligue 1 with Paris Saint-Germain.'] },
  { id: 19, coachId: 'ancelotti', leagueId: 'ligue-1', achievementsAr: ['قاد باريس سان جيرمان إلى لقب 2012/13، أول لقب دوري للنادي منذ 1994.', 'تولى الفريق في منتصف موسم 2011/12.', 'سبق له الفوز بالدوري في إيطاليا وإنجلترا وألمانيا وإسبانيا.'], achievementsEn: ['Led Paris Saint-Germain to the 2012/13 title, its first league crown since 1994.', 'Took charge midway through the 2011/12 season.', 'He had also won league titles in Italy, England, Germany and Spain.'] },
  { id: 20, coachId: 'luis-enrique', leagueId: 'ligue-1', achievementsAr: ['قاد باريس سان جيرمان إلى لقب الدوري الفرنسي في موسمه الأول 2023/24.', 'حقق مع برشلونة الثلاثية الأوروبية والمحلية في موسم 2014/15.', 'كان لاعباً دولياً لمنتخب إسبانيا.'], achievementsEn: ['Led Paris Saint-Germain to the Ligue 1 title in his first season, 2023/24.', 'Won the European and domestic treble with Barcelona in 2014/15.', 'He was a Spain international as a player.'] },

  { id: 21, coachId: 'jesus', leagueId: 'saudi-pro-league', achievementsAr: ['قاد الهلال إلى لقب دوري روشن 2023/24 دون هزيمة: 31 فوزاً وثلاثة تعادلات.', 'جمع الهلال 96 نقطة وسجل 101 هدف في ذلك الموسم.', 'قاد الفريق إلى سلسلة قياسية من 34 فوزاً متتالياً في جميع المسابقات.'], achievementsEn: ['Led Al Hilal to the unbeaten 2023/24 title: 31 wins and three draws.', 'Al Hilal collected 96 points and scored 101 goals that season.', 'The team set a world-record 34-match winning streak across competitions.'] },
  { id: 22, coachId: 'nuno', leagueId: 'saudi-pro-league', achievementsAr: ['قاد الاتحاد إلى لقب الدوري السعودي في موسم 2022/23.', 'أنهى الاتحاد ذلك الموسم متقدماً على النصر بفارق خمس نقاط.', 'قاد وولفرهامبتون قبل ذلك إلى الصعود للدوري الإنجليزي الممتاز.'], achievementsEn: ['Led Al Ittihad to the Saudi league title in 2022/23.', 'Al Ittihad finished that season five points ahead of Al Nassr.', 'Before that, he guided Wolverhampton Wanderers to promotion to the Premier League.'] },
  { id: 23, coachId: 'ramon-diaz', leagueId: 'saudi-pro-league', achievementsAr: ['قاد الهلال إلى لقب الدوري السعودي في موسمي 2016/17 و2021/22.', 'فاز مع الهلال بكأس الملك في 2017.', 'سبق له الفوز بالدوري الأرجنتيني مع ريفر بليت.'], achievementsEn: ['Led Al Hilal to Saudi league titles in 2016/17 and 2021/22.', 'Won the King’s Cup with Al Hilal in 2017.', 'He had earlier won Argentina’s league title with River Plate.'] },
  { id: 24, coachId: 'gallardo', leagueId: 'saudi-pro-league', achievementsAr: ['تولى تدريب الاتحاد السعودي بعد حقبة طويلة وناجحة مع ريفر بليت.', 'قاد ريفر بليت إلى لقبين في كوبا ليبرتادوريس.', 'عمل لاعباً ومدرباً في أندية الأرجنتين قبل انتقاله إلى السعودية.'], achievementsEn: ['Took charge of Al Ittihad after a long, successful River Plate spell.', 'Led River Plate to two Copa Libertadores titles.', 'His playing and coaching career was rooted in Argentine clubs before Saudi Arabia.'] },

  { id: 25, coachId: 'manuel-jose', leagueId: 'egyptian-premier-league', achievementsAr: ['قاد الأهلي إلى أربعة ألقاب لدوري أبطال أفريقيا بين 2001 و2010.', 'حقق مع الأهلي ستة ألقاب متتالية للدوري المصري من 2004/05 إلى 2009/10.', 'ارتبط اسمه بأحد أنجح أجيال الأهلي القارية.'], achievementsEn: ['Led Al Ahly to four CAF Champions League titles between 2001 and 2010.', 'Won six consecutive Egyptian league titles with Al Ahly from 2004/05 to 2009/10.', 'He is associated with one of Al Ahly’s most successful continental eras.'] },
  { id: 26, coachId: 'mosimane', leagueId: 'egyptian-premier-league', achievementsAr: ['قاد الأهلي إلى لقبين متتاليين لدوري أبطال أفريقيا في 2020 و2021.', 'أصبح أول مدرب يفوز بالبطولة مع ماميلودي صن داونز ثم الأهلي.', 'حقق مع الأهلي لقب الدوري المصري موسم 2020/21.'], achievementsEn: ['Led Al Ahly to back-to-back CAF Champions League titles in 2020 and 2021.', 'Became the first coach to win the competition with both Mamelodi Sundowns and Al Ahly.', 'Won the Egyptian league with Al Ahly in 2020/21.'] },
  { id: 27, coachId: 'koller', leagueId: 'egyptian-premier-league', achievementsAr: ['قاد الأهلي إلى دوري أبطال أفريقيا وكأس مصر والدوري المصري في موسم 2022/23.', 'بدأ مهمته في سبتمبر 2022.', 'أصبح أول مدرب سويسري يتولى تدريب الأهلي.'], achievementsEn: ['Led Al Ahly to the CAF Champions League, Egyptian Cup and league title in 2022/23.', 'He began the job in September 2022.', 'Became the first Swiss manager of Al Ahly.'] },
  { id: 28, coachId: 'ferreira', leagueId: 'egyptian-premier-league', achievementsAr: ['قاد الزمالك إلى ثنائية الدوري والكأس في موسم 2014/15.', 'عاد إلى الزمالك وقاده إلى لقب الدوري المصري 2021/22.', 'سبق له تدريب بورتو وسبورتينغ لشبونة في البرتغال.'], achievementsEn: ['Led Zamalek to the league-and-cup double in 2014/15.', 'Returned to lead Zamalek to the 2021/22 Egyptian league title.', 'Earlier managed Porto and Sporting CP in Portugal.'] },
  { id: 29, coachId: 'mancini', leagueId: 'premier-league', achievementsAr: ['قاد مانشستر سيتي إلى أول لقب له في الدوري الإنجليزي الممتاز.', 'حُسم لقب 2011/12 بفارق الأهداف بعد تساوي سيتي ومانشستر يونايتد في النقاط.', 'جاء هدف سيرخيو أغويرو الحاسم في الوقت بدل الضائع من الجولة الأخيرة.'], achievementsEn: ['Led Manchester City to its first Premier League title.', 'The 2011/12 title was decided on goal difference after City and Manchester United tied on points.', 'Sergio Agüero scored the decisive stoppage-time goal on the final day.'] },
  { id: 30, coachId: 'valverde', leagueId: 'la-liga', achievementsAr: ['قاد برشلونة إلى لقبين متتاليين للدوري الإسباني في 2017/18 و2018/19.', 'حقق الثنائية المحلية في موسمه الأول مع برشلونة.', 'كان مهاجماً سابقاً لأتلتيك بلباو قبل أن يدربه في فترتين.'], achievementsEn: ['Led Barcelona to back-to-back La Liga titles in 2017/18 and 2018/19.', 'Won the domestic double in his first season with Barcelona.', 'He had been an Athletic Club forward before managing the club in two spells.'] },
  { id: 31, coachId: 'schaaf', leagueId: 'bundesliga', achievementsAr: ['قاد فيردر بريمن إلى لقب الدوري الألماني موسم 2003/04.', 'حقق الفريق الثنائية المحلية بإضافة كأس ألمانيا في الموسم نفسه.', 'تولى تدريب الفريق الأول في 1999 وبقي حتى 2013.'], achievementsEn: ['Led Werder Bremen to the 2003/04 Bundesliga title.', 'The club completed the domestic double by adding the German Cup that season.', 'He took charge of the first team in 1999 and stayed until 2013.'] },
  { id: 32, coachId: 'houllier', leagueId: 'ligue-1', achievementsAr: ['قاد ليون إلى لقبين متتاليين للدوري الفرنسي في 2005/06 و2006/07.', 'حقق 49 فوزاً في 76 مباراة بالدوري مع النادي.', 'كانت فترته على مقاعد ليون بين مايو 2005 ومايو 2007.'], achievementsEn: ['Led Lyon to consecutive Ligue 1 titles in 2005/06 and 2006/07.', 'Recorded 49 wins in 76 league matches with the club.', 'His Lyon spell ran from May 2005 to May 2007.'] },
];

function shuffle<T>(items: T[]): T[] {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
  }
  return items;
}

export const coachAchievementQuestions: CoachAchievementQuestion[] = questionSeeds.map((seed) => {
  const correctCoach = coachProfiles.find((coach) => coach.id === seed.coachId)!;
  const sameLeagueCoaches = coachProfiles.filter((coach) => coach.leagueIds.includes(seed.leagueId) && coach.id !== seed.coachId);
  const options = shuffle([correctCoach, ...shuffle([...sameLeagueCoaches]).slice(0, 3)]);
  return { ...seed, options, correctIndex: options.findIndex((coach) => coach.id === seed.coachId) };
});

export function getCoachName(coach: CoachQuizProfile, locale: 'ar' | 'en'): string {
  return locale === 'ar' ? coach.nameAr : coach.nameEn;
}
