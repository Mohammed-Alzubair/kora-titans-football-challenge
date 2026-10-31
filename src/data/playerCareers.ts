// بيانات مسيرة اللاعبين - المستوى 12
// نعرض شعارات الأندية التي لعب لها اللاعب بالترتيب ويجب على اللاعب تخمين من هو

import { clubs } from './clubs';

export interface PlayerCareer {
  id: string;
  name: string;
  retired: boolean;
  careerClubIds: string[]; // IDs من clubs.ts بالترتيب الزمني
}

export const playerCareers: PlayerCareer[] = [
  {
    id: 'ronaldo_career',
    name: 'كريستيانو رونالدو',
    retired: false,
    careerClubIds: ['sporting', 'manchester_united', 'real_madrid', 'juventus', 'manchester_united', 'al_nassr'],
  },
  {
    id: 'messi_career',
    name: 'ليونيل ميسي',
    retired: false,
    careerClubIds: ['newell', 'barcelona', 'psg', 'inter_miami'],
  },
  {
    id: 'neymar_career',
    name: 'نيمار',
    retired: false,
    careerClubIds: ['santos', 'barcelona', 'psg', 'al_hilal', 'santos'],
  },
  {
    id: 'mbappe_career',
    name: 'كيليان مبابي',
    retired: false,
    careerClubIds: ['monaco', 'psg', 'real_madrid'],
  },
  {
    id: 'suarez_career',
    name: 'لويس سواريز',
    retired: true,
    careerClubIds: ['nacional', 'ajax', 'liverpool', 'barcelona', 'atletico', 'inter_miami', 'gremio'],
  },
  {
    id: 'salah_career',
    name: 'محمد صلاح',
    retired: false,
    careerClubIds: ['basel', 'chelsea', 'fiorentina', 'roma', 'liverpool'],
  },
  {
    id: 'haaland_career',
    name: 'إيرلينغ هالاند',
    retired: false,
    careerClubIds: ['molde', 'rb_salzburg', 'dortmund', 'manchester_city'],
  },
  {
    id: 'ronaldinho_career',
    name: 'رونالدينيو',
    retired: true,
    careerClubIds: ['gremio', 'psg', 'barcelona', 'ac_milan', 'flamengo'],
  },
  {
    id: 'lewandowski_career',
    name: 'روبرت ليفاندوفسكي',
    retired: false,
    careerClubIds: ['dortmund', 'bayern', 'barcelona'],
  },
  {
    id: 'courtois_career',
    name: 'تيبو كورتوا',
    retired: false,
    careerClubIds: ['genk', 'atletico', 'chelsea', 'real_madrid'],
  },
  {
    id: 'bale_career',
    name: 'غاريث بيل',
    retired: true,
    careerClubIds: ['tottenham', 'real_madrid', 'tottenham'],
  },
  {
    id: 'ozil_career',
    name: 'مسعود أوزيل',
    retired: true,
    careerClubIds: ['schalke', 'werder', 'real_madrid', 'arsenal', 'fenerbahce'],
  },
  {
    id: 'zidane_career',
    name: 'زين الدين زيدان',
    retired: true,
    careerClubIds: ['bordeaux', 'juventus', 'real_madrid'],
  },
  {
    id: 'maldini_career',
    name: 'باولو مالديني',
    retired: true,
    careerClubIds: ['ac_milan'],
  },
  {
    id: 'bellingham_career',
    name: 'جود بيلينغهام',
    retired: false,
    careerClubIds: ['dortmund', 'real_madrid'],
  },
  {
    id: 'ramos_career',
    name: 'سيرجيو راموس',
    retired: true,
    careerClubIds: ['sevilla', 'real_madrid', 'psg'],
  },
  {
    id: 'raphinha_career',
    name: 'رافينيا',
    retired: false,
    careerClubIds: ['rennes', 'leeds', 'barcelona'],
  },
  {
    id: 'olmo_career',
    name: 'داني أولمو',
    retired: false,
    careerClubIds: ['dinamo_zagreb', 'rb_leipzig', 'barcelona'],
  },
  {
    id: 'maradona_career',
    name: 'دييغو مارادونا',
    retired: true,
    careerClubIds: ['boca_juniors', 'barcelona', 'napoli', 'sevilla', 'newell', 'boca_juniors'],
  },
  {
    id: 'pepe_career',
    name: 'بيبي',
    retired: true,
    careerClubIds: ['porto', 'real_madrid', 'besiktas', 'porto'],
  },
];

export function getClubLogo(clubId: string): string {
  const club = clubs.find(c => c.id === clubId);
  return club?.logo || '/placeholder.svg';
}

export function getClubName(clubId: string): string {
  const club = clubs.find(c => c.id === clubId);
  return club?.name || clubId;
}

export function generateLevel12Question(usedPlayerIds: string[]): {
  player: PlayerCareer;
  options: PlayerCareer[];
} | null {
  const available = playerCareers.filter(p => !usedPlayerIds.includes(p.id));
  const pool = available.length >= 1 ? available : playerCareers;
  
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const correctPlayer = shuffled[0];
  
  const wrongPlayers = playerCareers
    .filter(p => p.id !== correctPlayer.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  const options = [...wrongPlayers, correctPlayer].sort(() => Math.random() - 0.5);
  
  return { player: correctPlayer, options };
}
