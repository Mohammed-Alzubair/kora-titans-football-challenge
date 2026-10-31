import interMiamiLogo from '@/assets/inter-miami-logo.jpg';
import { leagueClubs, type LeagueId, type LeagueClub } from './leagues';

export interface Club {
  id: string;
  name: string;
  nameEn?: string;
  logo: string;
  fallbackLogo?: string;
}

const clubNamesEn: Record<string, string> = {
  real_madrid: 'Real Madrid', barcelona: 'Barcelona', manchester_united: 'Manchester United', liverpool: 'Liverpool',
  bayern: 'Bayern Munich', psg: 'Paris Saint-Germain', juventus: 'Juventus', chelsea: 'Chelsea',
  manchester_city: 'Manchester City', arsenal: 'Arsenal', ac_milan: 'AC Milan', inter_milan: 'Inter Milan',
  atletico: 'Atlético Madrid', dortmund: 'Borussia Dortmund', tottenham: 'Tottenham Hotspur', al_hilal: 'Al Hilal',
  al_nassr: 'Al Nassr', al_ahly: 'Al Ahly', zamalek: 'Zamalek', pyramids: 'Pyramids FC', ismailly: 'Ismaily', ajax: 'Ajax', al_ahli_saudi: 'Al Ahli',
  al_ittihad: 'Al Ittihad', wydad: 'Wydad AC', raja: 'Raja CA', inter_miami: 'Inter Miami', napoli: 'Napoli',
  roma: 'Roma', sevilla: 'Sevilla', sporting: 'Sporting CP', fiorentina: 'Fiorentina', rb_salzburg: 'Red Bull Salzburg',
  molde: 'Molde FK', leeds: 'Leeds United', rennes: 'Rennes', lyon: 'Olympique Lyonnais', dinamo_zagreb: 'Dinamo Zagreb', rb_leipzig: 'RB Leipzig',
  genk: 'Genk', flamengo: 'Flamengo', basel: 'Basel', gladbach: 'Borussia Mönchengladbach', monaco: 'Monaco',
  santos: 'Santos', gremio: 'Grêmio', bordeaux: 'Bordeaux', newell: 'Newell’s Old Boys', brescia: 'Brescia',
  werder: 'Werder Bremen', schalke: 'Schalke 04', fenerbahce: 'Fenerbahçe', porto: 'Porto', besiktas: 'Beşiktaş',
  nacional: 'Nacional', boca_juniors: 'Boca Juniors', galatasaray: 'Galatasaray', trabzonspor: 'Trabzonspor', corinthians: 'Corinthians',
};

export function getClubDisplayName(club: Club, locale: 'ar' | 'en') {
  if (locale === 'ar') return club.name;
  return club.nameEn ?? clubNamesEn[club.id] ?? club.name;
}

const clubNameAliasesEn: Record<string, string> = {
  دورتموند: 'Borussia Dortmund',
  ميلان: 'AC Milan',
  مارسيليا: 'Olympique de Marseille',
  لاتسيو: 'Lazio',
  ليل: 'LOSC Lille',
  رين: 'Stade Rennais',
  إشبيلية: 'Sevilla FC',
};

export function localizeClubOption(name: string, locale: 'ar' | 'en') {
  if (locale === 'ar') return name;
  const club = clubs.find((entry) => entry.name === name);
  return club ? getClubDisplayName(club, locale) : (clubNameAliasesEn[name] ?? name);
}

export const clubs: Club[] = [
  { id: "real_madrid", name: "ريال مدريد", logo: "https://crests.football-data.org/86.png" },
  { id: "barcelona", name: "برشلونة", logo: "https://crests.football-data.org/81.png" },
  { id: "manchester_united", name: "مانشستر يونايتد", logo: "https://crests.football-data.org/66.png" },
  { id: "liverpool", name: "ليفربول", logo: "https://crests.football-data.org/64.png" },
  { id: "bayern", name: "بايرن ميونخ", logo: "https://crests.football-data.org/5.png" },
  { id: "psg", name: "باريس سان جيرمان", logo: "https://crests.football-data.org/524.png" },
  { id: "juventus", name: "يوفنتوس", logo: "https://crests.football-data.org/109.png" },
  { id: "chelsea", name: "تشيلسي", logo: "https://crests.football-data.org/61.png" },
  { id: "manchester_city", name: "مانشستر سيتي", logo: "https://crests.football-data.org/65.png" },
  { id: "arsenal", name: "أرسنال", logo: "https://crests.football-data.org/57.png" },
  { id: "ac_milan", name: "ميلان", logo: "https://crests.football-data.org/98.png" },
  { id: "inter_milan", name: "إنتر ميلان", logo: "https://crests.football-data.org/108.png" },
  { id: "atletico", name: "أتلتيكو مدريد", logo: "https://crests.football-data.org/78.png" },
  { id: "dortmund", name: "بوروسيا دورتموند", logo: "https://crests.football-data.org/4.png" },
  { id: "tottenham", name: "توتنهام", logo: "https://crests.football-data.org/73.png" },
  { id: "al_hilal", name: "الهلال", logo: "https://media.api-sports.io/football/teams/2932.png" },
  { id: "al_nassr", name: "النصر", logo: "https://media.api-sports.io/football/teams/2939.png" },
  { id: "al_ahly", name: "الأهلي المصري", logo: "https://www.footylogos.com/dls/logo/rgba-v1/al-ahly-sc.png" },
  { id: "zamalek", name: "الزمالك", logo: "https://media.api-sports.io/football/teams/1021.png" },
  { id: "ajax", name: "أياكس", logo: "https://crests.football-data.org/678.png" },
  { id: "al_ahli_saudi", name: "الأهلي السعودي", logo: "https://www.footylogos.com/dls/logo/rgba-v1/al-ahli.png" },
  { id: "al_ittihad", name: "الاتحاد", logo: "https://media.api-sports.io/football/teams/2935.png" },
  { id: "wydad", name: "الوداد المغربي", logo: "https://media.api-sports.io/football/teams/968.png" },
  { id: "raja", name: "الرجاء", logo: "https://media.api-sports.io/football/teams/967.png" },
  { id: "inter_miami", name: "إنتر ميامي", logo: interMiamiLogo },
  { id: "napoli", name: "نابولي", logo: "https://crests.football-data.org/113.png" },
  { id: "roma", name: "روما", logo: "https://crests.football-data.org/100.png" },
  { id: "sevilla", name: "إشبيلية", logo: "https://crests.football-data.org/559.png" },
  { id: "sporting", name: "سبورتينغ لشبونة", logo: "https://crests.football-data.org/498.png" },
  { id: "fiorentina", name: "فيورنتينا", logo: "https://crests.football-data.org/99.png" },
  { id: "rb_salzburg", name: "ريد بول سالزبورغ", logo: "https://crests.football-data.org/1877.png" },
  { id: "molde", name: "مولده", logo: "https://media.api-sports.io/football/teams/313.png" },
  { id: "leeds", name: "ليدز يونايتد", logo: "https://crests.football-data.org/341.png" },
  { id: "rennes", name: "رين", logo: "https://media.api-sports.io/football/teams/94.png" },
  { id: "lyon", name: "ليون", logo: "https://crests.football-data.org/523.png" },
  { id: "dinamo_zagreb", name: "دينامو زغرب", logo: "https://media.api-sports.io/football/teams/620.png" },
  { id: "rb_leipzig", name: "لايبزيغ", logo: "https://crests.football-data.org/721.png" },
  { id: "genk", name: "جينك", logo: "https://media.api-sports.io/football/teams/739.png" },
  { id: "flamengo", name: "فلامينغو", logo: "https://media.api-sports.io/football/teams/127.png" },
  { id: "basel", name: "بازل", logo: "https://media.api-sports.io/football/teams/571.png" },
  { id: "gladbach", name: "مونشنغلادباخ", logo: "https://crests.football-data.org/18.png" },
  { id: "monaco", name: "موناكو", logo: "https://media.api-sports.io/football/teams/91.png" },
  { id: "santos", name: "سانتوس", logo: "https://media.api-sports.io/football/teams/128.png" },
  { id: "gremio", name: "غريميو", logo: "https://media.api-sports.io/football/teams/130.png" },
  { id: "bordeaux", name: "بوردو", logo: "https://www.footylogos.com/dls/logo/bordeaux.png" },
  { id: "newell", name: "نيولز أولد بويز", logo: "https://media.api-sports.io/football/teams/442.png" },
  { id: "brescia", name: "بريشا", logo: "https://media.api-sports.io/football/teams/500.png" },
  { id: "werder", name: "فيردر بريمن", logo: "https://crests.football-data.org/12.png" },
  { id: "schalke", name: "شالكه", logo: "https://crests.football-data.org/6.png" },
  { id: "fenerbahce", name: "فنربخشة", logo: "https://media.api-sports.io/football/teams/611.png" },
  { id: "porto", name: "بورتو", logo: "https://crests.football-data.org/503.png" },
  { id: "besiktas", name: "بشكتاش", logo: "https://media.api-sports.io/football/teams/549.png" },
  { id: "nacional", name: "ناسيونال", logo: "https://media.api-sports.io/football/teams/2371.png" },
  { id: "boca_juniors", name: "بوكا جونيورز", logo: "https://media.api-sports.io/football/teams/451.png" },
  { id: "pyramids", name: "بيراميدز", logo: "https://media.api-sports.io/football/teams/1024.png" },
  { id: "ismailly", name: "الإسماعيلي", logo: "https://media.api-sports.io/football/teams/1025.png" },
  { id: "galatasaray", name: "غلطة سراي", logo: "https://media.api-sports.io/football/teams/645.png" },
  { id: "trabzonspor", name: "طرابزون سبور", logo: "https://media.api-sports.io/football/teams/998.png" },
  { id: "corinthians", name: "كورينثيانز", logo: "https://media.api-sports.io/football/teams/131.png" },
];

const leagueByClubId: Record<string, LeagueId> = {
  real_madrid: 'la-liga', barcelona: 'la-liga', atletico: 'la-liga', sevilla: 'la-liga',
  manchester_united: 'premier-league', liverpool: 'premier-league', chelsea: 'premier-league',
  manchester_city: 'premier-league', arsenal: 'premier-league', tottenham: 'premier-league', leeds: 'premier-league',
  bayern: 'bundesliga', dortmund: 'bundesliga', rb_leipzig: 'bundesliga', gladbach: 'bundesliga', werder: 'bundesliga', schalke: 'bundesliga',
  juventus: 'serie-a', ac_milan: 'serie-a', inter_milan: 'serie-a', napoli: 'serie-a', roma: 'serie-a', fiorentina: 'serie-a', brescia: 'serie-a',
  psg: 'ligue-1', monaco: 'ligue-1', rennes: 'ligue-1', lyon: 'ligue-1', bordeaux: 'ligue-1',
  al_hilal: 'saudi-pro-league', al_nassr: 'saudi-pro-league', al_ahli_saudi: 'saudi-pro-league', al_ittihad: 'saudi-pro-league',
  al_ahly: 'egyptian-premier-league', zamalek: 'egyptian-premier-league', pyramids: 'egyptian-premier-league', ismailly: 'egyptian-premier-league',
};

const leagueClubLegacyLogoId: Record<string, string> = {
  inter: 'inter_milan', milan: 'ac_milan', arsenal: 'arsenal', chelsea: 'chelsea',
  leeds: 'leeds', liverpool: 'liverpool', 'man-city': 'manchester_city', 'man-utd': 'manchester_united',
  tottenham: 'tottenham', atletico: 'atletico', barcelona: 'barcelona', 'real-madrid': 'real_madrid',
  sevilla: 'sevilla', bayern: 'bayern', dortmund: 'dortmund', gladbach: 'gladbach', leipzig: 'rb_leipzig',
  werder: 'werder', schalke: 'schalke', juventus: 'juventus', napoli: 'napoli', roma: 'roma',
  fiorentina: 'fiorentina', monaco: 'monaco', lyon: 'lyon', rennes: 'rennes', psg: 'psg',
  'al-ahli': 'al_ahli_saudi', 'al-hilal': 'al_hilal', 'al-nassr': 'al_nassr', 'al-ittihad': 'al_ittihad',
  'al-ahly-eg': 'al_ahly', zamalek: 'zamalek', pyramids: 'pyramids', ismailly: 'ismailly',
};

const legacyLogoById = new Map(clubs.map((club) => [club.id, club.logo]));

const curatedBadgePaths: Record<string, string> = {
  // European club badges from the football-badges public CDN.
  atalanta: 'italy/atalanta-bc.png', bologna: 'italy/bologna-fc-1909.png', cagliari: 'italy/cagliari-calcio.png', como: 'italy/como-1907.png',
  fiorentina: 'italy/acf-fiorentina.png', genoa: 'italy/genoa-cfc.png', inter: 'italy/inter-milan.png', juventus: 'italy/juventus-fc.png',
  lazio: 'italy/ss-lazio.png', lecce: 'italy/us-lecce.png', milan: 'italy/ac-milan.png', napoli: 'italy/ssc-napoli.png',
  parma: 'italy/parma-calcio-1913.png', pisa: 'italy/pisa-sporting-club.png', sassuolo: 'italy/us-sassuolo.png', torino: 'italy/torino-fc.png', udinese: 'italy/udinese-calcio.png',
  bournemouth: 'england/afc-bournemouth.png', arsenal: 'england/arsenal-fc.png', 'aston-villa': 'england/aston-villa.png', brentford: 'england/brentford-fc.png',
  brighton: 'england/brighton-and-hove-albion.png', chelsea: 'england/chelsea-fc.png', palace: 'england/crystal-palace.png', everton: 'england/everton-fc.png',
  fulham: 'england/fulham-fc.png', leeds: 'england/leeds-united.png', liverpool: 'england/liverpool-fc.png', 'man-city': 'england/manchester-city.png',
  'man-utd': 'england/manchester-united.png', newcastle: 'england/newcastle-united.png', forest: 'england/nottingham-forest.png', sunderland: 'england/sunderland-afc.png',
  tottenham: 'england/tottenham-hotspur.png',
  athletic: 'spain/athletic-bilbao.png', atletico: 'spain/atletico-de-madrid.png', osasuna: 'spain/ca-osasuna.png', celta: 'spain/celta-de-vigo.png',
  alaves: 'spain/deportivo-alaves.png', elche: 'spain/elche-cf.png', barcelona: 'spain/fc-barcelona.png', getafe: 'spain/getafe-cf.png',
  levante: 'spain/levante-ud.png', espanyol: 'spain/rcd-espanyol-barcelona.png', betis: 'spain/real-betis-balompie.png', 'real-madrid': 'spain/real-madrid.png',
  'real-sociedad': 'spain/real-sociedad.png', sevilla: 'spain/sevilla-fc.png', valencia: 'spain/valencia-cf.png', villarreal: 'spain/villarreal-cf.png',
  augsburg: 'germany/fc-augsburg.png', 'union-berlin': 'germany/1fc-union-berlin.png', werder: 'germany/sv-werder-bremen.png', dortmund: 'germany/borussia-dortmund.png',
  frankfurt: 'germany/eintracht-frankfurt.png', freiburg: 'germany/sc-freiburg.png', hamburg: 'germany/hamburger-sv.png', hoffenheim: 'germany/tsg-1899-hoffenheim.png',
  koln: 'germany/1fc-koln.png', leipzig: 'germany/rb-leipzig.png', leverkusen: 'germany/bayer-04-leverkusen.png', mainz: 'germany/1fsv-mainz-05.png',
  gladbach: 'germany/borussia-monchengladbach.png', bayern: 'germany/bayern-munich.png', stuttgart: 'germany/vfb-stuttgart.png',
  monaco: 'france/as-monaco.png', lyon: 'france/olympique-lyon.png', 'paris-fc': 'france/paris-fc.png', lille: 'france/losc-lille.png',
  rennes: 'france/stade-rennais-fc.png', psg: 'france/paris-saint-germain.png', angers: 'france/angers-sco.png', strasbourg: 'france/rc-strasbourg-alsace.png',
  auxerre: 'france/aj-auxerre.png', brest: 'france/stade-brestois-29.png', lorient: 'france/fc-lorient.png', toulouse: 'france/fc-toulouse.png',
  nice: 'france/ogc-nice.png', lens: 'france/rc-lens.png', marseille: 'france/olympique-marseille.png', 'le-havre': 'france/le-havre-ac.png',
};

const publicBadgeBase = 'https://cdn.jsdelivr.net/gh/leoratzlaff/football-badges@master/logos/';
const footyLogosByClubId: Record<string, string> = {
  // Official club badge files from FootyLogos (direct PNG routes).
  frosinone: 'frosinone-calcio', monza: 'ac-monza', venezia: 'venezia-fc',
  coventry: 'coventry-city', hull: 'hull-city', ipswich: 'ipswich-town',
  malaga: 'malaga-cf', 'racing-santander': 'racing-santander', rayo: 'rayo-vallecano', deportivo: 'deportivo-la-coruna',
  elversberg: 'sv-elversberg', paderborn: 'sc-paderborn-07', schalke: 'schalke-04',
  'le-mans': 'le-mans-fc', troyes: 'troyes',
  // Saudi Pro League and Egyptian Premier League badges.
  abha: 'abha', 'al-ahli': 'al-ahli', 'al-ettifaq': 'al-ettifaq', 'al-faisaly': 'al-faisaly',
  'al-fateh': 'al-fateh', 'al-fayha': 'al-fayha', 'al-hazem': 'al-hazem', 'al-hilal': 'al-hilal',
  'al-ittihad': 'al-ittihad', 'al-khaleej': 'al-khaleej', 'al-kholood': 'al-kholood', 'al-nassr': 'al-nassr',
  'al-qadsiah': 'al-qadsiah', 'al-riyadh': 'al-riyadh', 'al-shabab': 'al-shabab', 'al-taawoun': 'al-taawoun',
  diriyah: 'diriyah', neom: 'neom',
  'al-ahly-eg': 'al-ahly-sc', 'ittihad-alex': 'ittihad-alexandria', 'national-bank': 'bank-el-ahly', 'el-gouna': 'el-gouna-fc',
  zamalek: 'zamalek-sc', 'al-masry': 'al-masry-sc', 'sharqia-enppi': 'enppi-sc', pyramids: 'pyramids-fc', zed: 'zed-fc',
  smouha: 'smouha', ceramica: 'ceramica-cleopatra-fc', talaea: 'talaea-el-gaish-sc', 'modern-sport': 'modern-sport',
  'suez-petrojet': 'petrojet-fc', ghazl: 'ghazl-el-mahalla', 'wadi-degla': 'wadi-degla-sc', mokawloon: 'el-mokawloon',
};
const directBadgeUrlsByClubId: Record<string, string> = {
  // These promoted Egyptian sides are not yet in the FootyLogos league index.
  'abu-qir': 'https://media.koraplus.com/sports/Teams/Image_20260914170729644.png',
  'asyut-petroleum': 'https://assets.football-logos.cc/logos/egypt/700x700/asyut-petroleum.88959dfc.png',
  canal: 'https://images.seeklogo.com/logo-png/61/1/canal-sc-el-qanah-club-logo-png_seeklogo-616286.png?v=1966318559747850616',
};
const footyLogosBase = 'https://www.footylogos.com/dls/logo/rgba-v1/';

function makeClubBadgeDataUri(club: Pick<LeagueClub, 'id' | 'nameEn'>): string {
  const palette = ['#0ea5e9', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444', '#14b8a6', '#f97316'];
  const hash = [...club.id].reduce((value, char) => (value * 31 + char.charCodeAt(0)) >>> 0, 7);
  const color = palette[hash % palette.length];
  const initials = club.nameEn.replace(/\b(FC|SC|CF|AC|AS|AFC|SV|TSG|RB|LOSC|OGC)\b/gi, '').trim().split(/[^\p{L}\p{N}]+/u).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || club.nameEn.slice(0, 2).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 140"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="${color}"/><stop offset="1" stop-color="#0b1220"/></linearGradient></defs><path d="M60 5 108 22v44c0 31-21 52-48 68C33 118 12 97 12 66V22z" fill="url(#g)" stroke="#f8fafc" stroke-opacity=".78" stroke-width="5"/><path d="M60 18 96 31v35c0 23-15 40-36 53-21-13-36-30-36-53V31z" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="2"/><text x="60" y="78" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="34" fill="#fff">${initials}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function getGeneratedClubBadge(club: Pick<LeagueClub, 'id' | 'nameEn'>) {
  return makeClubBadgeDataUri(club);
}

export function getLeagueClubBadge(club: Pick<LeagueClub, 'id' | 'nameEn'>) {
  const legacyId = leagueClubLegacyLogoId[club.id];
  const footyLogo = footyLogosByClubId[club.id];
  return directBadgeUrlsByClubId[club.id]
    || (footyLogo ? `${footyLogosBase}${footyLogo}.png` : undefined)
    || (legacyId && legacyLogoById.get(legacyId))
    || (curatedBadgePaths[club.id] ? `${publicBadgeBase}${curatedBadgePaths[club.id]}` : makeClubBadgeDataUri(club));
}

const leagueClubPool: Club[] = leagueClubs.map((club) => ({
  id: club.id,
  name: club.nameAr,
  nameEn: club.nameEn,
  logo: getLeagueClubBadge(club),
  fallbackLogo: makeClubBadgeDataUri(club),
}));

const leagueByCurrentClubId = Object.fromEntries(leagueClubs.map((club) => [club.id, club.leagueId])) as Record<string, LeagueId>;

export function getClubLeagueId(clubId: string): LeagueId | undefined {
  return leagueByCurrentClubId[clubId] ?? leagueByClubId[clubId];
}

export function getRandomQuestion(excludeIds: string[] = []): { correct: Club; options: Club[] } {
  const availableClubs = leagueClubPool.filter(c => !excludeIds.includes(c.id));
  
  if (availableClubs.length < 4) {
    // Reset if we've used most clubs
    return getRandomQuestion([]);
  }
  
  const correct = availableClubs[Math.floor(Math.random() * availableClubs.length)];
  const leagueId = leagueByCurrentClubId[correct.id];
  const compatible = leagueId
    ? leagueClubPool.filter(c => c.id !== correct.id && leagueByCurrentClubId[c.id] === leagueId)
    : [];
  const freshWrong = compatible.filter(c => !excludeIds.includes(c.id));
  const wrong = [...(freshWrong.length >= 3 ? freshWrong : compatible)]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  const options = [...wrong, correct].sort(() => Math.random() - 0.5);
  
  return { correct, options };
}
