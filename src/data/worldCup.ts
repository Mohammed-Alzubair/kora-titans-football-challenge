export interface WorldCupTeam {
  id: string;
  nameAr: string;
  nameEn: string;
  flag: string;
  confederation: 'AFC' | 'CAF' | 'Concacaf' | 'CONMEBOL' | 'OFC' | 'UEFA';
}

export interface WorldCupOption {
  id: string;
  labelAr: string;
  labelEn: string;
  flag?: string;
}

export interface WorldCupQuestion {
  id: string;
  category: 'champion' | 'host' | 'runner-up' | 'scoreline' | 'flag' | 'top-scorer' | 'player-record';
  promptAr: string;
  promptEn: string;
  explanationAr: string;
  explanationEn: string;
  options: WorldCupOption[];
  correctId: string;
  answerAr: string;
  answerEn: string;
  emblem?: string;
  flagImageUrl?: string;
  year?: number;
}

export type WorldCupMode = 'archive' | 'players' | 'teams';

export const worldCupEditions = [
  { year: 1930, hosts: ['uruguay'], champion: 'uruguay', runnerUp: 'argentina', resultAr: 'أوروغواي 4–2 الأرجنتين', resultEn: 'Uruguay 4–2 Argentina' },
  { year: 1934, hosts: ['italy'], champion: 'italy', runnerUp: 'czechoslovakia', resultAr: 'إيطاليا 2–1 تشيكوسلوفاكيا (بعد الوقت الإضافي)', resultEn: 'Italy 2–1 Czechoslovakia (after extra time)' },
  { year: 1938, hosts: ['france'], champion: 'italy', runnerUp: 'hungary', resultAr: 'إيطاليا 4–2 المجر', resultEn: 'Italy 4–2 Hungary' },
  { year: 1950, hosts: ['brazil'], champion: 'uruguay', runnerUp: 'brazil', resultAr: 'أوروغواي 2–1 البرازيل (مباراة حاسمة في الدور النهائي)', resultEn: 'Uruguay 2–1 Brazil (decisive final-round match)' },
  { year: 1954, hosts: ['switzerland'], champion: 'west-germany', runnerUp: 'hungary', resultAr: 'ألمانيا الغربية 3–2 المجر', resultEn: 'West Germany 3–2 Hungary' },
  { year: 1958, hosts: ['sweden'], champion: 'brazil', runnerUp: 'sweden', resultAr: 'البرازيل 5–2 السويد', resultEn: 'Brazil 5–2 Sweden' },
  { year: 1962, hosts: ['chile'], champion: 'brazil', runnerUp: 'czechoslovakia', resultAr: 'البرازيل 3–1 تشيكوسلوفاكيا', resultEn: 'Brazil 3–1 Czechoslovakia' },
  { year: 1966, hosts: ['england'], champion: 'england', runnerUp: 'west-germany', resultAr: 'إنجلترا 4–2 ألمانيا الغربية (بعد الوقت الإضافي)', resultEn: 'England 4–2 West Germany (after extra time)' },
  { year: 1970, hosts: ['mexico'], champion: 'brazil', runnerUp: 'italy', resultAr: 'البرازيل 4–1 إيطاليا', resultEn: 'Brazil 4–1 Italy' },
  { year: 1974, hosts: ['west-germany'], champion: 'west-germany', runnerUp: 'netherlands', resultAr: 'ألمانيا الغربية 2–1 هولندا', resultEn: 'West Germany 2–1 Netherlands' },
  { year: 1978, hosts: ['argentina'], champion: 'argentina', runnerUp: 'netherlands', resultAr: 'الأرجنتين 3–1 هولندا (بعد الوقت الإضافي)', resultEn: 'Argentina 3–1 Netherlands (after extra time)' },
  { year: 1982, hosts: ['spain'], champion: 'italy', runnerUp: 'west-germany', resultAr: 'إيطاليا 3–1 ألمانيا الغربية', resultEn: 'Italy 3–1 West Germany' },
  { year: 1986, hosts: ['mexico'], champion: 'argentina', runnerUp: 'west-germany', resultAr: 'الأرجنتين 3–2 ألمانيا الغربية', resultEn: 'Argentina 3–2 West Germany' },
  { year: 1990, hosts: ['italy'], champion: 'west-germany', runnerUp: 'argentina', resultAr: 'ألمانيا الغربية 1–0 الأرجنتين', resultEn: 'West Germany 1–0 Argentina' },
  { year: 1994, hosts: ['usa'], champion: 'brazil', runnerUp: 'italy', resultAr: 'البرازيل 0–0 إيطاليا؛ فازت البرازيل 3–2 بركلات الترجيح', resultEn: 'Brazil 0–0 Italy; Brazil won 3–2 on penalties' },
  { year: 1998, hosts: ['france'], champion: 'france', runnerUp: 'brazil', resultAr: 'فرنسا 3–0 البرازيل', resultEn: 'France 3–0 Brazil' },
  { year: 2002, hosts: ['japan', 'south-korea'], champion: 'brazil', runnerUp: 'germany', resultAr: 'البرازيل 2–0 ألمانيا', resultEn: 'Brazil 2–0 Germany' },
  { year: 2006, hosts: ['germany'], champion: 'italy', runnerUp: 'france', resultAr: 'إيطاليا 1–1 فرنسا؛ فازت إيطاليا 5–3 بركلات الترجيح', resultEn: 'Italy 1–1 France; Italy won 5–3 on penalties' },
  { year: 2010, hosts: ['south-africa'], champion: 'spain', runnerUp: 'netherlands', resultAr: 'إسبانيا 1–0 هولندا (بعد الوقت الإضافي)', resultEn: 'Spain 1–0 Netherlands (after extra time)' },
  { year: 2014, hosts: ['brazil'], champion: 'germany', runnerUp: 'argentina', resultAr: 'ألمانيا 1–0 الأرجنتين (بعد الوقت الإضافي)', resultEn: 'Germany 1–0 Argentina (after extra time)' },
  { year: 2018, hosts: ['russia'], champion: 'france', runnerUp: 'croatia', resultAr: 'فرنسا 4–2 كرواتيا', resultEn: 'France 4–2 Croatia' },
  { year: 2022, hosts: ['qatar'], champion: 'argentina', runnerUp: 'france', resultAr: 'الأرجنتين 3–3 فرنسا؛ فازت الأرجنتين 4–2 بركلات الترجيح', resultEn: 'Argentina 3–3 France; Argentina won 4–2 on penalties' },
  { year: 2026, hosts: ['canada', 'mexico', 'usa'], champion: 'spain', runnerUp: 'argentina', resultAr: 'إسبانيا 1–0 الأرجنتين (بعد الوقت الإضافي)', resultEn: 'Spain 1–0 Argentina (after extra time)' },
] as const;

// FIFA's 2026 final standings list the 48 nations that played in the tournament.
export const worldCup2026Teams: WorldCupTeam[] = [
  { id: 'canada', nameAr: 'كندا', nameEn: 'Canada', flag: '🇨🇦', confederation: 'Concacaf' },
  { id: 'mexico', nameAr: 'المكسيك', nameEn: 'Mexico', flag: '🇲🇽', confederation: 'Concacaf' },
  { id: 'usa', nameAr: 'الولايات المتحدة', nameEn: 'United States', flag: '🇺🇸', confederation: 'Concacaf' },
  { id: 'australia', nameAr: 'أستراليا', nameEn: 'Australia', flag: '🇦🇺', confederation: 'AFC' },
  { id: 'iraq', nameAr: 'العراق', nameEn: 'Iraq', flag: '🇮🇶', confederation: 'AFC' },
  { id: 'iran', nameAr: 'إيران', nameEn: 'IR Iran', flag: '🇮🇷', confederation: 'AFC' },
  { id: 'japan', nameAr: 'اليابان', nameEn: 'Japan', flag: '🇯🇵', confederation: 'AFC' },
  { id: 'jordan', nameAr: 'الأردن', nameEn: 'Jordan', flag: '🇯🇴', confederation: 'AFC' },
  { id: 'south-korea', nameAr: 'كوريا الجنوبية', nameEn: 'Korea Republic', flag: '🇰🇷', confederation: 'AFC' },
  { id: 'qatar', nameAr: 'قطر', nameEn: 'Qatar', flag: '🇶🇦', confederation: 'AFC' },
  { id: 'saudi-arabia', nameAr: 'السعودية', nameEn: 'Saudi Arabia', flag: '🇸🇦', confederation: 'AFC' },
  { id: 'uzbekistan', nameAr: 'أوزبكستان', nameEn: 'Uzbekistan', flag: '🇺🇿', confederation: 'AFC' },
  { id: 'algeria', nameAr: 'الجزائر', nameEn: 'Algeria', flag: '🇩🇿', confederation: 'CAF' },
  { id: 'cabo-verde', nameAr: 'الرأس الأخضر', nameEn: 'Cabo Verde', flag: '🇨🇻', confederation: 'CAF' },
  { id: 'congo-dr', nameAr: 'الكونغو الديمقراطية', nameEn: 'Congo DR', flag: '🇨🇩', confederation: 'CAF' },
  { id: 'cote-divoire', nameAr: 'كوت ديفوار', nameEn: 'Côte d’Ivoire', flag: '🇨🇮', confederation: 'CAF' },
  { id: 'egypt', nameAr: 'مصر', nameEn: 'Egypt', flag: '🇪🇬', confederation: 'CAF' },
  { id: 'ghana', nameAr: 'غانا', nameEn: 'Ghana', flag: '🇬🇭', confederation: 'CAF' },
  { id: 'morocco', nameAr: 'المغرب', nameEn: 'Morocco', flag: '🇲🇦', confederation: 'CAF' },
  { id: 'senegal', nameAr: 'السنغال', nameEn: 'Senegal', flag: '🇸🇳', confederation: 'CAF' },
  { id: 'south-africa', nameAr: 'جنوب أفريقيا', nameEn: 'South Africa', flag: '🇿🇦', confederation: 'CAF' },
  { id: 'tunisia', nameAr: 'تونس', nameEn: 'Tunisia', flag: '🇹🇳', confederation: 'CAF' },
  { id: 'curacao', nameAr: 'كوراساو', nameEn: 'Curaçao', flag: '🇨🇼', confederation: 'Concacaf' },
  { id: 'haiti', nameAr: 'هايتي', nameEn: 'Haiti', flag: '🇭🇹', confederation: 'Concacaf' },
  { id: 'panama', nameAr: 'بنما', nameEn: 'Panama', flag: '🇵🇦', confederation: 'Concacaf' },
  { id: 'argentina', nameAr: 'الأرجنتين', nameEn: 'Argentina', flag: '🇦🇷', confederation: 'CONMEBOL' },
  { id: 'brazil', nameAr: 'البرازيل', nameEn: 'Brazil', flag: '🇧🇷', confederation: 'CONMEBOL' },
  { id: 'colombia', nameAr: 'كولومبيا', nameEn: 'Colombia', flag: '🇨🇴', confederation: 'CONMEBOL' },
  { id: 'ecuador', nameAr: 'الإكوادور', nameEn: 'Ecuador', flag: '🇪🇨', confederation: 'CONMEBOL' },
  { id: 'paraguay', nameAr: 'باراغواي', nameEn: 'Paraguay', flag: '🇵🇾', confederation: 'CONMEBOL' },
  { id: 'uruguay', nameAr: 'أوروغواي', nameEn: 'Uruguay', flag: '🇺🇾', confederation: 'CONMEBOL' },
  { id: 'new-zealand', nameAr: 'نيوزيلندا', nameEn: 'New Zealand', flag: '🇳🇿', confederation: 'OFC' },
  { id: 'austria', nameAr: 'النمسا', nameEn: 'Austria', flag: '🇦🇹', confederation: 'UEFA' },
  { id: 'belgium', nameAr: 'بلجيكا', nameEn: 'Belgium', flag: '🇧🇪', confederation: 'UEFA' },
  { id: 'bosnia', nameAr: 'البوسنة والهرسك', nameEn: 'Bosnia and Herzegovina', flag: '🇧🇦', confederation: 'UEFA' },
  { id: 'croatia', nameAr: 'كرواتيا', nameEn: 'Croatia', flag: '🇭🇷', confederation: 'UEFA' },
  { id: 'czechia', nameAr: 'التشيك', nameEn: 'Czechia', flag: '🇨🇿', confederation: 'UEFA' },
  { id: 'england', nameAr: 'إنجلترا', nameEn: 'England', flag: '🏴', confederation: 'UEFA' },
  { id: 'france', nameAr: 'فرنسا', nameEn: 'France', flag: '🇫🇷', confederation: 'UEFA' },
  { id: 'germany', nameAr: 'ألمانيا', nameEn: 'Germany', flag: '🇩🇪', confederation: 'UEFA' },
  { id: 'netherlands', nameAr: 'هولندا', nameEn: 'Netherlands', flag: '🇳🇱', confederation: 'UEFA' },
  { id: 'norway', nameAr: 'النرويج', nameEn: 'Norway', flag: '🇳🇴', confederation: 'UEFA' },
  { id: 'portugal', nameAr: 'البرتغال', nameEn: 'Portugal', flag: '🇵🇹', confederation: 'UEFA' },
  { id: 'scotland', nameAr: 'اسكتلندا', nameEn: 'Scotland', flag: '🏴', confederation: 'UEFA' },
  { id: 'spain', nameAr: 'إسبانيا', nameEn: 'Spain', flag: '🇪🇸', confederation: 'UEFA' },
  { id: 'sweden', nameAr: 'السويد', nameEn: 'Sweden', flag: '🇸🇪', confederation: 'UEFA' },
  { id: 'switzerland', nameAr: 'سويسرا', nameEn: 'Switzerland', flag: '🇨🇭', confederation: 'UEFA' },
  { id: 'turkiye', nameAr: 'تركيا', nameEn: 'Türkiye', flag: '🇹🇷', confederation: 'UEFA' },
];

const countryNames: Record<string, { ar: string; en: string }> = {
  uruguay: { ar: 'أوروغواي', en: 'Uruguay' }, argentina: { ar: 'الأرجنتين', en: 'Argentina' }, italy: { ar: 'إيطاليا', en: 'Italy' },
  czechoslovakia: { ar: 'تشيكوسلوفاكيا', en: 'Czechoslovakia' }, france: { ar: 'فرنسا', en: 'France' }, hungary: { ar: 'المجر', en: 'Hungary' },
  brazil: { ar: 'البرازيل', en: 'Brazil' }, 'west-germany': { ar: 'ألمانيا الغربية', en: 'West Germany' }, switzerland: { ar: 'سويسرا', en: 'Switzerland' },
  sweden: { ar: 'السويد', en: 'Sweden' }, chile: { ar: 'تشيلي', en: 'Chile' }, england: { ar: 'إنجلترا', en: 'England' },
  mexico: { ar: 'المكسيك', en: 'Mexico' }, netherlands: { ar: 'هولندا', en: 'Netherlands' }, spain: { ar: 'إسبانيا', en: 'Spain' },
  usa: { ar: 'الولايات المتحدة', en: 'United States' }, japan: { ar: 'اليابان', en: 'Japan' }, 'south-korea': { ar: 'كوريا الجنوبية', en: 'South Korea' },
  'south-africa': { ar: 'جنوب أفريقيا', en: 'South Africa' }, russia: { ar: 'روسيا', en: 'Russia' }, qatar: { ar: 'قطر', en: 'Qatar' },
  canada: { ar: 'كندا', en: 'Canada' }, croatia: { ar: 'كرواتيا', en: 'Croatia' },
};

const teamMap = new Map(worldCup2026Teams.map((team) => [team.id, team]));
const flagCodeOverrides: Record<string, string> = { england: 'gb-eng', scotland: 'gb-sct' };
const getFlagImageUrl = (team: WorldCupTeam) => {
  const override = flagCodeOverrides[team.id];
  const regionalIndicators = [...team.flag]
    .map((character) => character.codePointAt(0) ?? 0)
    .filter((codePoint) => codePoint >= 0x1f1e6 && codePoint <= 0x1f1ff);
  const countryCode = override ?? (regionalIndicators.length === 2
    ? regionalIndicators.map((codePoint) => String.fromCharCode(codePoint - 0x1f1e6 + 65)).join('').toLowerCase()
    : undefined);
  return countryCode ? `https://flagcdn.com/w160/${countryCode}.png` : undefined;
};
const flagFor = (id: string) => teamMap.get(id)?.flag;
const namesFor = (id: string) => {
  const current = teamMap.get(id);
  if (current) return { ar: current.nameAr, en: current.nameEn };
  return countryNames[id] ?? { ar: id, en: id };
};
const shuffled = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

function makeOptions(correct: WorldCupOption, pool: WorldCupOption[], count = 4, fallbackPool = pool): WorldCupOption[] {
  const candidates = [...new Map([...pool, ...fallbackPool].filter((option) => option.id !== correct.id).map((option) => [option.id, option])).values()];
  const others = shuffled(candidates).slice(0, count - 1);
  return shuffled([correct, ...others]);
}

function teamOption(id: string): WorldCupOption {
  const names = namesFor(id);
  return { id, labelAr: names.ar, labelEn: names.en, flag: flagFor(id) };
}

function hostOption(codes: readonly string[]): WorldCupOption {
  const labels = codes.map(namesFor);
  const labelAr = labels.length === 1 ? labels[0].ar : labels.length === 2
    ? `${labels[0].ar} و${labels[1].ar}`
    : labels.map((label) => label.ar).join('، ');
  const labelEn = labels.length === 1 ? labels[0].en : labels.length === 2
    ? `${labels[0].en} and ${labels[1].en}`
    : `${labels.slice(0, -1).map((label) => label.en).join(', ')} and ${labels[labels.length - 1].en}`;
  return { id: `hosts-${codes.join('-')}`, labelAr, labelEn };
}

interface WorldCupScorerAward {
  year: number;
  goals: number;
  players: Array<{ ar: string; en: string }>;
}

// FIFA's official top-scorer archive, covering every men's tournament from 1930 through 2026.
const worldCupScorerAwards: WorldCupScorerAward[] = [
  { year: 1930, goals: 8, players: [{ ar: 'غييرمو ستابيلي', en: 'Guillermo Stábile' }] },
  { year: 1934, goals: 5, players: [{ ar: 'أولدريخ نيديدلي', en: 'Oldřich Nejedlý' }] },
  { year: 1938, goals: 7, players: [{ ar: 'ليونيداس دا سيلفا', en: 'Leônidas da Silva' }] },
  { year: 1950, goals: 9, players: [{ ar: 'أديمير', en: 'Ademir' }] },
  { year: 1954, goals: 11, players: [{ ar: 'شاندور كوتشيس', en: 'Sándor Kocsis' }] },
  { year: 1958, goals: 13, players: [{ ar: 'جوست فونتين', en: 'Just Fontaine' }] },
  { year: 1962, goals: 4, players: [
    { ar: 'فلوريان ألبرت', en: 'Flórián Albert' }, { ar: 'فالنتين إيفانوف', en: 'Valentin Ivanov' },
    { ar: 'غارينشا', en: 'Garrincha' }, { ar: 'فافا', en: 'Vavá' },
    { ar: 'دراغان يركوفيتش', en: 'Dražan Jerković' }, { ar: 'ليونيل سانشيز', en: 'Leonel Sánchez' },
  ] },
  { year: 1966, goals: 9, players: [{ ar: 'أوزيبيو', en: 'Eusébio' }] },
  { year: 1970, goals: 10, players: [{ ar: 'غيرد مولر', en: 'Gerd Müller' }] },
  { year: 1974, goals: 7, players: [{ ar: 'غريغورز لاتو', en: 'Grzegorz Lato' }] },
  { year: 1978, goals: 6, players: [{ ar: 'ماريو كيمبس', en: 'Mario Kempes' }] },
  { year: 1982, goals: 6, players: [{ ar: 'باولو روسي', en: 'Paolo Rossi' }] },
  { year: 1986, goals: 6, players: [{ ar: 'غاري لينيكر', en: 'Gary Lineker' }] },
  { year: 1990, goals: 6, players: [{ ar: 'سلفاتوري سكيلاتشي', en: 'Salvatore Schillaci' }] },
  { year: 1994, goals: 6, players: [
    { ar: 'خريستو ستويتشكوف', en: 'Hristo Stoichkov' }, { ar: 'أوليغ سالينكو', en: 'Oleg Salenko' },
  ] },
  { year: 1998, goals: 6, players: [{ ar: 'دافور سوكر', en: 'Davor Šuker' }] },
  { year: 2002, goals: 8, players: [{ ar: 'رونالدو نازاريو', en: 'Ronaldo Nazário' }] },
  { year: 2006, goals: 5, players: [{ ar: 'ميروسلاف كلوزه', en: 'Miroslav Klose' }] },
  { year: 2010, goals: 5, players: [
    { ar: 'توماس مولر', en: 'Thomas Müller' }, { ar: 'دافيد فيا', en: 'David Villa' },
    { ar: 'ويسلي شنايدر', en: 'Wesley Sneijder' }, { ar: 'دييغو فورلان', en: 'Diego Forlán' },
  ] },
  { year: 2014, goals: 6, players: [{ ar: 'خاميس رودريغيز', en: 'James Rodríguez' }] },
  { year: 2018, goals: 6, players: [{ ar: 'هاري كين', en: 'Harry Kane' }] },
  { year: 2022, goals: 8, players: [{ ar: 'كيليان مبابي', en: 'Kylian Mbappé' }] },
  { year: 2026, goals: 10, players: [{ ar: 'كيليان مبابي', en: 'Kylian Mbappé' }] },
];

const joinPeople = (players: WorldCupScorerAward['players'], locale: 'ar' | 'en') => {
  const names = players.map((player) => player[locale]);
  if (locale === 'ar') return names.join('، ');
  if (names.length < 2) return names[0];
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
};

const scorerAwardOptions: WorldCupOption[] = worldCupScorerAwards.map((award) => ({
  id: `top-scorers-${award.year}`,
  labelAr: `${joinPeople(award.players, 'ar')} · ${award.goals} أهداف`,
  labelEn: `${joinPeople(award.players, 'en')} · ${award.goals} goals`,
}));

const scorerAwardQuestions: WorldCupQuestion[] = worldCupScorerAwards.map((award) => {
  const correct = scorerAwardOptions.find((option) => option.id === `top-scorers-${award.year}`)!;
  const namesAr = joinPeople(award.players, 'ar');
  const namesEn = joinPeople(award.players, 'en');
  return {
    id: `${award.year}-top-scorers`, category: 'top-scorer', year: award.year,
    promptAr: `من تصدّر قائمة هدّافي كأس العالم ${award.year}؟`,
    promptEn: `Who finished top of the scoring chart at the ${award.year} World Cup?`,
    explanationAr: `${namesAr} تصدّروا قائمة الهدّافين بـ${award.goals} أهداف${award.players.length > 1 ? ' لكل لاعب' : ''}.`,
    explanationEn: `${namesEn} led the scoring chart with ${award.goals} goal${award.goals === 1 ? '' : 's'}${award.players.length > 1 ? ' each' : ''}.`,
    options: makeOptions(correct, scorerAwardOptions), correctId: correct.id,
    answerAr: correct.labelAr, answerEn: correct.labelEn, emblem: '🏅',
  };
});

const playerRecord = (
  id: string,
  year: number,
  promptAr: string,
  promptEn: string,
  explanationAr: string,
  explanationEn: string,
  answer: WorldCupOption,
  options: WorldCupOption[],
): WorldCupQuestion => ({
  id, category: 'player-record', year, promptAr, promptEn, explanationAr, explanationEn,
  options: makeOptions(answer, options), correctId: answer.id,
  answerAr: answer.labelAr, answerEn: answer.labelEn, emblem: '👑',
});

const scoringRecordOptions: WorldCupOption[] = [
  { id: 'mbappe', labelAr: 'كيليان مبابي', labelEn: 'Kylian Mbappé' },
  { id: 'messi', labelAr: 'ليونيل ميسي', labelEn: 'Lionel Messi' },
  { id: 'klose', labelAr: 'ميروسلاف كلوزه', labelEn: 'Miroslav Klose' },
  { id: 'ronaldo-brazil', labelAr: 'رونالدو نازاريو', labelEn: 'Ronaldo Nazário' },
  { id: 'muller-gerd', labelAr: 'غيرد مولر', labelEn: 'Gerd Müller' },
  { id: 'fontaine', labelAr: 'جوست فونتين', labelEn: 'Just Fontaine' },
  { id: 'salenko', labelAr: 'أوليغ سالينكو', labelEn: 'Oleg Salenko' },
  { id: 'kocsis', labelAr: 'شاندور كوتشيس', labelEn: 'Sándor Kocsis' },
  { id: 'pele', labelAr: 'بيليه', labelEn: 'Pelé' },
];

const recordOptions = (ids: string[]) => ids.map((id) => scoringRecordOptions.find((option) => option.id === id)!);

const playerRecordQuestions: WorldCupQuestion[] = [
  playerRecord('record-all-time-scorer-2026', 2026,
    'من أصبح الهدّاف التاريخي لكأس العالم بعد نسخة 2026؟',
    'Who became the all-time leading scorer in World Cup history after 2026?',
    'وصل كيليان مبابي إلى 22 هدفاً في كأس العالم، متجاوزاً الرقم السابق.',
    'Kylian Mbappé reached 22 World Cup goals, setting a new all-time record.',
    scoringRecordOptions[0], recordOptions(['mbappe', 'messi', 'klose', 'ronaldo-brazil'])),
  playerRecord('record-second-all-time-scorer-2026', 2026,
    'من يحتل المركز الثاني في قائمة هدّافي كأس العالم بعد نسخة 2026؟',
    'Who ranks second on the all-time World Cup scoring list after 2026?',
    'ليونيل ميسي أنهى نسخة 2026 برصيد 21 هدفاً في كأس العالم.',
    'Lionel Messi finished the 2026 edition with 21 World Cup goals.',
    scoringRecordOptions[1], recordOptions(['messi', 'mbappe', 'klose', 'ronaldo-brazil'])),
  playerRecord('record-former-all-time-scorer', 2026,
    'من كان صاحب الرقم القياسي السابق قبل أن يتجاوزه هدّافا 2026؟',
    'Who held the previous all-time scoring record before the 2026 leaders passed it?',
    'احتفظ ميروسلاف كلوزه بالرقم القياسي برصيد 16 هدفاً قبل نسخة 2026.',
    'Miroslav Klose held the record with 16 goals before the 2026 tournament.',
    scoringRecordOptions[2], recordOptions(['klose', 'ronaldo-brazil', 'muller-gerd', 'fontaine'])),
  playerRecord('record-single-edition', 1958,
    'من سجّل الرقم القياسي لأكبر عدد من الأهداف في نسخة واحدة؟',
    'Who holds the record for the most goals in a single World Cup edition?',
    'سجّل جوست فونتين 13 هدفاً لفرنسا في نسخة 1958، وهو الرقم القياسي لنسخة واحدة.',
    'Just Fontaine scored 13 goals for France in 1958, the single-edition record.',
    scoringRecordOptions[5], recordOptions(['fontaine', 'kocsis', 'muller-gerd', 'mbappe'])),
  playerRecord('record-single-match', 1994,
    'من سجّل خمسة أهداف في مباراة واحدة، وهو رقم قياسي للمونديال؟',
    'Who scored five goals in one match, a World Cup single-game record?',
    'سجّل أوليغ سالينكو خمسة أهداف لروسيا أمام الكاميرون في نسخة 1994.',
    'Oleg Salenko scored five for Russia against Cameroon at the 1994 World Cup.',
    scoringRecordOptions[6], recordOptions(['salenko', 'fontaine', 'kocsis', 'ronaldo-brazil'])),
  playerRecord('record-2026-double-digits', 2026,
    'من سجّل 10 أهداف في نسخة 2026 وأصبح رابع لاعب يبلغ هذا العدد في نسخة واحدة؟',
    'Who scored 10 goals at the 2026 World Cup, becoming the fourth player to reach double figures in one edition?',
    'سجّل كيليان مبابي 10 أهداف في 2026، لينضم إلى فونتين وكوتشيس وغيرد مولر.',
    'Kylian Mbappé scored 10 in 2026, joining Fontaine, Kocsis and Gerd Müller.',
    scoringRecordOptions[0], recordOptions(['mbappe', 'fontaine', 'kocsis', 'muller-gerd'])),
  playerRecord('record-2022-final-hattrick', 2022,
    'من سجّل ثلاثية في نهائي كأس العالم 2022؟',
    'Who scored a hat-trick in the 2022 World Cup final?',
    'سجّل كيليان مبابي ثلاثية لفرنسا أمام الأرجنتين في نهائي قطر 2022.',
    'Kylian Mbappé scored a hat-trick for France against Argentina in the 2022 final.',
    scoringRecordOptions[0], recordOptions(['mbappe', 'messi', 'ronaldo-brazil', 'klose'])),
  playerRecord('record-2014-surpassed-ronaldo', 2014,
    'من تجاوز رونالدو البرازيلي وأصبح الهدّاف التاريخي للمونديال في 2014؟',
    'Who passed Brazil’s Ronaldo to become the World Cup’s all-time top scorer in 2014?',
    'تجاوز ميروسلاف كلوزه رقم رونالدو عندما سجّل هدفه السادس عشر في البطولة.',
    'Miroslav Klose passed Ronaldo’s mark when he scored his 16th World Cup goal.',
    scoringRecordOptions[2], recordOptions(['klose', 'ronaldo-brazil', 'messi', 'mbappe'])),
  playerRecord('record-1954-kocsis', 1954,
    'من سجّل 11 هدفاً في نسخة 1954، وهو رقم قياسي آنذاك؟',
    'Who scored 11 goals at the 1954 World Cup, a record at the time?',
    'سجّل المجري شاندور كوتشيس 11 هدفاً في نسخة سويسرا 1954.',
    'Hungary’s Sándor Kocsis scored 11 at Switzerland 1954.',
    scoringRecordOptions[7], recordOptions(['kocsis', 'fontaine', 'muller-gerd', 'salenko'])),
  playerRecord('record-1970-muller', 1970,
    'من سجّل 10 أهداف في المكسيك 1970 قبل أن يعادل مبابي هذا العدد في 2026؟',
    'Who scored 10 goals at Mexico 1970 before Mbappé matched that total in 2026?',
    'سجّل الألماني غيرد مولر 10 أهداف في نسخة 1970.',
    'Germany’s Gerd Müller scored 10 goals at the 1970 edition.',
    scoringRecordOptions[4], recordOptions(['muller-gerd', 'mbappe', 'fontaine', 'kocsis'])),
  playerRecord('record-2010-tiebreak', 2010,
    'من حصد جائزة هدّاف 2010 بعد التعادل في عدد الأهداف بفضل معيار كسر التعادل؟',
    'Who took the 2010 top-scorer award after the goal tie was broken by the tie-break criteria?',
    'حصل توماس مولر على الجائزة بعد تسجيل خمسة أهداف وتفوّقه بمعيار كسر التعادل.',
    'Thomas Müller took the award with five goals, winning the tie-break.',
    { id: 'muller-thomas', labelAr: 'توماس مولر', labelEn: 'Thomas Müller' },
    [
      { id: 'muller-thomas', labelAr: 'توماس مولر', labelEn: 'Thomas Müller' },
      { id: 'villa', labelAr: 'دافيد فيا', labelEn: 'David Villa' },
      { id: 'sneijder', labelAr: 'ويسلي شنايدر', labelEn: 'Wesley Sneijder' },
      { id: 'forlan', labelAr: 'دييغو فورلان', labelEn: 'Diego Forlán' },
    ]),
  playerRecord('record-1962-brazil-joint-scorer', 1962,
    'أي لاعب برازيلي كان ضمن الهدّافين الستة المتعادلين في نسخة 1962؟',
    'Which Brazilian was one of the six joint top scorers in 1962?',
    'تقاسم غارينشا وفافا صدارة الهدّافين بأربعة أهداف لكل منهما. بيليه ودِيدي لم يكونا ضمن الستة.',
    'Garrincha and Vavá shared the top-scorer lead with four goals each. Pelé and Didi were not among the six.',
    { id: 'garrincha', labelAr: 'غارينشا', labelEn: 'Garrincha' },
    [
      { id: 'garrincha', labelAr: 'غارينشا', labelEn: 'Garrincha' },
      { id: 'pele', labelAr: 'بيليه', labelEn: 'Pelé' },
      { id: 'didi', labelAr: 'دِيدي', labelEn: 'Didi' },
      { id: 'amarildo', labelAr: 'أماريلدو', labelEn: 'Amarildo' },
    ]),
];

const championOptions = [...new Set(worldCupEditions.map((edition) => edition.champion))].map(teamOption);
const runnerUpOptions = [...new Set(worldCupEditions.map((edition) => edition.runnerUp))].map(teamOption);
const scoreOptions: WorldCupOption[] = worldCupEditions.map((edition) => ({
  id: `score-${edition.year}`,
  labelAr: edition.resultAr,
  labelEn: edition.resultEn,
}));
const uniqueHostSets = [...new Map(worldCupEditions.map((edition) => [edition.hosts.join('-'), edition.hosts])).values()];
const hostOptions = uniqueHostSets.map((codes) => hostOption(codes));

export const worldCupQuestions: WorldCupQuestion[] = [
  ...worldCupEditions.flatMap((edition) => {
    const champion = teamOption(edition.champion);
    const runnerUp = teamOption(edition.runnerUp);
    const host = hostOption(edition.hosts);
    const hostNameAr = host.labelAr;
    const hostNameEn = host.labelEn;
    return [
      {
        id: `${edition.year}-champion`, category: 'champion' as const, year: edition.year,
        promptAr: `من تُوِّج بكأس العالم عام ${edition.year}؟`, promptEn: `Who won the FIFA World Cup in ${edition.year}?`,
        explanationAr: `بطل نسخة ${edition.year} التي استضافتها ${hostNameAr} هو ${champion.labelAr}.`,
        explanationEn: `${champion.labelEn} won the ${edition.year} edition hosted by ${hostNameEn}.`,
        options: makeOptions(champion, championOptions), correctId: champion.id, answerAr: champion.labelAr, answerEn: champion.labelEn,
      },
      {
        id: `${edition.year}-host`, category: 'host' as const, year: edition.year,
        promptAr: `أي دولة أو دول استضافت نسخة كأس العالم عام ${edition.year}؟`, promptEn: `Which nation or nations hosted the ${edition.year} World Cup?`,
        explanationAr: `استضافت ${hostNameAr} البطولة عام ${edition.year}.`, explanationEn: `${hostNameEn} hosted the tournament in ${edition.year}.`,
        options: makeOptions(host, hostOptions), correctId: host.id, answerAr: host.labelAr, answerEn: host.labelEn,
      },
      {
        id: `${edition.year}-runner-up`, category: 'runner-up' as const, year: edition.year,
        promptAr: `أي منتخب أنهى نسخة ${edition.year} وصيفاً؟`, promptEn: `Which team finished as runner-up in ${edition.year}?`,
        explanationAr: edition.year === 1950
          ? `لم تُلعب مباراة نهائية منفصلة عام 1950؛ أنهت البرازيل الدور النهائي في المركز الثاني خلف أوروغواي.`
          : `${runnerUp.labelAr} حلّ وصيفاً للبطل ${champion.labelAr} في نسخة ${edition.year}.`,
        explanationEn: edition.year === 1950
          ? 'There was no separate final in 1950; Brazil finished second in the final round behind Uruguay.'
          : `${runnerUp.labelEn} finished behind champions ${champion.labelEn} in ${edition.year}.`,
        options: makeOptions(runnerUp, runnerUpOptions), correctId: runnerUp.id, answerAr: runnerUp.labelAr, answerEn: runnerUp.labelEn,
      },
      {
        id: `${edition.year}-scoreline`, category: 'scoreline' as const, year: edition.year,
        promptAr: edition.year === 1950
          ? 'ما نتيجة المواجهة الحاسمة في الدور النهائي لكأس العالم 1950؟'
          : `ما نتيجة المباراة النهائية لكأس العالم ${edition.year}؟`,
        promptEn: edition.year === 1950
          ? 'What was the decisive final-round result at the 1950 World Cup?'
          : `What was the score in the ${edition.year} World Cup final?`,
        explanationAr: edition.year === 1950
          ? `${edition.resultAr}؛ لم تُقم مباراة نهائية منفصلة في نسخة 1950.`
          : `نتيجة المباراة النهائية: ${edition.resultAr}.`,
        explanationEn: edition.year === 1950
          ? `${edition.resultEn}; the 1950 tournament did not have a separate final.`
          : `Final score: ${edition.resultEn}.`,
        options: makeOptions(scoreOptions.find((option) => option.id === `score-${edition.year}`)!, scoreOptions),
        correctId: `score-${edition.year}`,
        answerAr: edition.resultAr,
        answerEn: edition.resultEn,
      },
    ];
  }),
  ...scorerAwardQuestions,
  ...playerRecordQuestions,
  ...worldCup2026Teams.map((team) => {
    const confederationPool = worldCup2026Teams.filter((candidate) => candidate.confederation === team.confederation).map((candidate) => teamOption(candidate.id));
    return {
      id: `2026-flag-${team.id}`, category: 'flag' as const,
      promptAr: 'أي منتخب مشارك في كأس العالم 2026 يمثله هذا العلم؟', promptEn: 'Which 2026 World Cup team does this flag represent?',
      explanationAr: `${team.nameAr} كان ضمن المنتخبات الـ48 المشاركة في نسخة 2026.`,
      explanationEn: `${team.nameEn} was one of the 48 teams at the 2026 tournament.`,
      options: makeOptions(teamOption(team.id), confederationPool, 4, worldCup2026Teams.map((candidate) => teamOption(candidate.id))), correctId: team.id,
      answerAr: team.nameAr, answerEn: team.nameEn, emblem: team.flag, flagImageUrl: getFlagImageUrl(team),
    };
  }),
];

export function pickWorldCupQuestions(count = 20, random = Math.random, mode: WorldCupMode = 'archive'): WorldCupQuestion[] {
  const pool = worldCupQuestions.filter((question) => {
    if (mode === 'players') return question.category === 'top-scorer' || question.category === 'player-record';
    if (mode === 'teams') return question.category === 'flag';
    return true;
  });
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}
