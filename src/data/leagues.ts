export type LeagueId =
  | 'serie-a'
  | 'premier-league'
  | 'la-liga'
  | 'bundesliga'
  | 'ligue-1'
  | 'saudi-pro-league'
  | 'egyptian-premier-league';

export const CURRENT_SEASON = '2026/27' as const;

export interface LeagueClub {
  id: string;
  nameAr: string;
  nameEn: string;
  leagueId: LeagueId;
  countryCode: string;
}

export interface League {
  id: LeagueId;
  nameAr: string;
  nameEn: string;
  countryAr: string;
  countryEn: string;
  season: typeof CURRENT_SEASON;
  clubIds: string[];
}

type LeagueDefinition = Omit<League, 'season' | 'clubIds'> & {
  countryCode: string;
  clubs: Array<[id: string, nameAr: string, nameEn: string]>;
};

// Official 2026/27 top-flight membership for every league featured in the game.
const leagueDefinitions: LeagueDefinition[] = [
  {
    id: 'serie-a', nameAr: 'الدوري الإيطالي', nameEn: 'Serie A', countryAr: 'إيطاليا', countryEn: 'Italy', countryCode: 'IT', clubs: [
      ['atalanta', 'أتالانتا', 'Atalanta'], ['bologna', 'بولونيا', 'Bologna'], ['cagliari', 'كالياري', 'Cagliari'], ['como', 'كومو', 'Como'],
      ['fiorentina', 'فيورنتينا', 'Fiorentina'], ['frosinone', 'فروزينوني', 'Frosinone'], ['genoa', 'جنوى', 'Genoa'], ['inter', 'إنتر', 'Inter'],
      ['juventus', 'يوفنتوس', 'Juventus'], ['lazio', 'لاتسيو', 'Lazio'], ['lecce', 'ليتشي', 'Lecce'], ['milan', 'ميلان', 'AC Milan'],
      ['monza', 'مونزا', 'Monza'], ['napoli', 'نابولي', 'Napoli'], ['parma', 'بارما', 'Parma'], ['roma', 'روما', 'Roma'],
      ['sassuolo', 'ساسولو', 'Sassuolo'], ['torino', 'تورينو', 'Torino'], ['udinese', 'أودينيزي', 'Udinese'], ['venezia', 'فينيتسيا', 'Venezia'],
    ],
  },
  {
    id: 'premier-league', nameAr: 'الدوري الإنجليزي الممتاز', nameEn: 'Premier League', countryAr: 'إنجلترا', countryEn: 'England', countryCode: 'GB-ENG', clubs: [
      ['bournemouth', 'بورنموث', 'AFC Bournemouth'], ['arsenal', 'أرسنال', 'Arsenal'], ['aston-villa', 'أستون فيلا', 'Aston Villa'], ['brentford', 'برينتفورد', 'Brentford'],
      ['brighton', 'برايتون', 'Brighton & Hove Albion'], ['chelsea', 'تشيلسي', 'Chelsea'], ['coventry', 'كوفنتري سيتي', 'Coventry City'], ['palace', 'كريستال بالاس', 'Crystal Palace'],
      ['everton', 'إيفرتون', 'Everton'], ['fulham', 'فولهام', 'Fulham'], ['hull', 'هال سيتي', 'Hull City'], ['ipswich', 'إيبسويتش تاون', 'Ipswich Town'],
      ['leeds', 'ليدز يونايتد', 'Leeds United'], ['liverpool', 'ليفربول', 'Liverpool'], ['man-city', 'مانشستر سيتي', 'Manchester City'], ['man-utd', 'مانشستر يونايتد', 'Manchester United'],
      ['newcastle', 'نيوكاسل يونايتد', 'Newcastle United'], ['forest', 'نوتنغهام فورست', 'Nottingham Forest'], ['sunderland', 'سندرلاند', 'Sunderland'], ['tottenham', 'توتنهام هوتسبير', 'Tottenham Hotspur'],
    ],
  },
  {
    id: 'la-liga', nameAr: 'الدوري الإسباني', nameEn: 'La Liga', countryAr: 'إسبانيا', countryEn: 'Spain', countryCode: 'ES', clubs: [
      ['athletic', 'أتلتيك بلباو', 'Athletic Club'], ['atletico', 'أتلتيكو مدريد', 'Atlético de Madrid'], ['osasuna', 'أوساسونا', 'CA Osasuna'], ['celta', 'سيلتا فيغو', 'Celta'],
      ['alaves', 'ألافيس', 'Deportivo Alavés'], ['elche', 'إلتشي', 'Elche CF'], ['barcelona', 'برشلونة', 'FC Barcelona'], ['getafe', 'خيتافي', 'Getafe CF'],
      ['levante', 'ليفانتي', 'Levante UD'], ['malaga', 'مالاغا', 'Málaga CF'], ['racing-santander', 'راسينغ سانتاندير', 'Racing Santander'], ['rayo', 'رايو فاييكانو', 'Rayo Vallecano'],
      ['deportivo', 'ديبورتيفو لاكورونيا', 'Deportivo La Coruña'], ['espanyol', 'إسبانيول', 'Espanyol'], ['betis', 'ريال بيتيس', 'Real Betis'], ['real-madrid', 'ريال مدريد', 'Real Madrid'],
      ['real-sociedad', 'ريال سوسيداد', 'Real Sociedad'], ['sevilla', 'إشبيلية', 'Sevilla FC'], ['valencia', 'فالنسيا', 'Valencia CF'], ['villarreal', 'فياريال', 'Villarreal CF'],
    ],
  },
  {
    id: 'bundesliga', nameAr: 'الدوري الألماني', nameEn: 'Bundesliga', countryAr: 'ألمانيا', countryEn: 'Germany', countryCode: 'DE', clubs: [
      ['augsburg', 'أوغسبورغ', 'FC Augsburg'], ['union-berlin', 'يونيون برلين', 'Union Berlin'], ['werder', 'فيردر بريمن', 'Werder Bremen'], ['dortmund', 'بوروسيا دورتموند', 'Borussia Dortmund'],
      ['elversberg', 'إلفرسبرغ', 'SV Elversberg'], ['frankfurt', 'آينتراخت فرانكفورت', 'Eintracht Frankfurt'], ['freiburg', 'فرايبورغ', 'SC Freiburg'], ['hamburg', 'هامبورغ', 'Hamburger SV'],
      ['hoffenheim', 'هوفنهايم', 'TSG Hoffenheim'], ['koln', 'كولن', '1. FC Köln'], ['leipzig', 'لايبزيغ', 'RB Leipzig'], ['leverkusen', 'باير ليفركوزن', 'Bayer Leverkusen'],
      ['mainz', 'ماينز', 'Mainz 05'], ['gladbach', 'بوروسيا مونشنغلادباخ', 'Borussia Mönchengladbach'], ['bayern', 'بايرن ميونخ', 'Bayern Munich'], ['paderborn', 'بادربورن', 'SC Paderborn'],
      ['schalke', 'شالكه', 'Schalke 04'], ['stuttgart', 'شتوتغارت', 'VfB Stuttgart'],
    ],
  },
  {
    id: 'ligue-1', nameAr: 'الدوري الفرنسي', nameEn: 'Ligue 1', countryAr: 'فرنسا', countryEn: 'France', countryCode: 'FR', clubs: [
      ['monaco', 'موناكو', 'AS Monaco'], ['lyon', 'ليون', 'Olympique Lyonnais'], ['paris-fc', 'باريس إف سي', 'Paris FC'], ['lille', 'ليل', 'LOSC Lille'],
      ['rennes', 'رين', 'Stade Rennais'], ['psg', 'باريس سان جيرمان', 'Paris Saint-Germain'], ['angers', 'أنجيه', 'Angers SCO'], ['strasbourg', 'ستراسبورغ', 'RC Strasbourg Alsace'],
      ['le-mans', 'لو مان', 'Le Mans FC'], ['auxerre', 'أوكسير', 'AJ Auxerre'], ['brest', 'بريست', 'Stade Brestois 29'], ['lorient', 'لوريان', 'FC Lorient'],
      ['toulouse', 'تولوز', 'Toulouse FC'], ['nice', 'نيس', 'OGC Nice'], ['lens', 'لانس', 'RC Lens'], ['troyes', 'تروا', 'ESTAC Troyes'],
      ['marseille', 'مارسيليا', 'Olympique de Marseille'], ['le-havre', 'لو هافر', 'Le Havre AC'],
    ],
  },
  {
    id: 'saudi-pro-league', nameAr: 'دوري روشن السعودي', nameEn: 'Saudi Pro League', countryAr: 'السعودية', countryEn: 'Saudi Arabia', countryCode: 'SA', clubs: [
      ['abha', 'أبها', 'Abha'], ['al-ahli', 'الأهلي السعودي', 'Al Ahli (Saudi Arabia)'], ['al-ettifaq', 'الاتفاق', 'Al Ettifaq'], ['al-faisaly', 'الفيصلي', 'Al Faisaly'],
      ['al-fateh', 'الفتح', 'Al Fateh'], ['al-fayha', 'الفيحاء', 'Al Fayha'], ['al-hazem', 'الحزم', 'Al Hazem'], ['al-hilal', 'الهلال', 'Al Hilal'],
      ['al-ittihad', 'الاتحاد', 'Al Ittihad'], ['al-khaleej', 'الخليج', 'Al Khaleej'], ['al-kholood', 'الخلود', 'Al Kholood'], ['al-nassr', 'النصر', 'Al Nassr'],
      ['al-qadsiah', 'القادسية', 'Al Qadsiah'], ['al-riyadh', 'الرياض', 'Al Riyadh'], ['al-shabab', 'الشباب', 'Al Shabab'], ['al-taawoun', 'التعاون', 'Al Taawoun'],
      ['diriyah', 'الدرعية', 'Diriyah Club'], ['neom', 'نيوم', 'NEOM SC'],
    ],
  },
  {
    id: 'egyptian-premier-league', nameAr: 'الدوري المصري الممتاز', nameEn: 'Egyptian Premier League', countryAr: 'مصر', countryEn: 'Egypt', countryCode: 'EG', clubs: [
      ['al-ahly-eg', 'الأهلي المصري', 'Al Ahly (Egypt)'], ['ittihad-alex', 'الاتحاد السكندري', 'Al Ittihad Alexandria'], ['national-bank', 'البنك الأهلي', 'National Bank of Egypt'], ['el-gouna', 'الجونة', 'El Gouna'],
      ['zamalek', 'الزمالك', 'Zamalek'], ['al-masry', 'المصري', 'Al Masry'], ['sharqia-enppi', 'الشرقية إنبي', 'Sharqia ENPPI'], ['pyramids', 'بيراميدز', 'Pyramids FC'],
      ['zed', 'زد', 'ZED FC'], ['smouha', 'سموحة', 'Smouha'], ['ceramica', 'سيراميكا كليوباترا', 'Ceramica Cleopatra'], ['talaea', 'طلائع الجيش', 'Tala’ea El Gaish'],
      ['modern-sport', 'مودرن سبورت', 'Modern Sport'], ['suez-petrojet', 'السويس بتروجيت', 'Suez Petrojet'], ['ghazl', 'غزل المحلة', 'Ghazl El Mahalla'], ['wadi-degla', 'وادي دجلة', 'Wadi Degla'],
      ['mokawloon', 'المقاولون العرب', 'Arab Contractors'], ['abu-qir', 'أبو قير للأسمدة', 'Abu Qir Fertilizers'], ['asyut-petroleum', 'بترول أسيوط', 'Asyut Petroleum'], ['canal', 'القناة', 'Canal SC'],
    ],
  },
];

export const leagues: League[] = leagueDefinitions.map(({ id, nameAr, nameEn, countryAr, countryEn, clubs }) => ({
  id, nameAr, nameEn, countryAr, countryEn, season: CURRENT_SEASON, clubIds: clubs.map(([clubId]) => clubId),
}));

export const leagueClubs: LeagueClub[] = leagueDefinitions.flatMap(({ id: leagueId, countryCode, clubs }) =>
  clubs.map(([clubId, nameAr, nameEn]) => ({ id: clubId, nameAr, nameEn, leagueId, countryCode })),
);

export function getLeague(leagueId: LeagueId) {
  return leagues.find((league) => league.id === leagueId)!;
}

export function getLeagueShowdownCopy(leagueId: LeagueId, locale: 'ar' | 'en') {
  const league = getLeague(leagueId);
  return locale === 'ar'
    ? `⚡ قمة ${league.countryAr} · خيارات من ساحة واحدة`
    : `⚡ ${league.countryEn} Showdown · Same-arena picks`;
}

export function getLeagueClub(clubId: string) {
  return leagueClubs.find((club) => club.id === clubId)!;
}

export function getLeagueOptions(leagueId: LeagueId, correctClubId: string, random = Math.random): LeagueClub[] {
  const correct = getLeagueClub(correctClubId);
  if (!correct || correct.leagueId !== leagueId) throw new Error(`Club ${correctClubId} is not in ${leagueId}`);
  const distractors = leagueClubs.filter((club) => club.leagueId === leagueId && club.id !== correctClubId);
  for (let i = distractors.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
  }
  const options = [correct, ...distractors.slice(0, 3)];
  for (let i = options.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}
