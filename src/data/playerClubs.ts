// بيانات اللاعبين والأندية التي لعبوا لها - للمستوى 9 و 10

import ronaldoImg from '@/assets/players/ronaldo.jpg';
import messiImg from '@/assets/players/messi.jpg';
import neymarImg from '@/assets/players/neymar.jpg';
import mbappeImg from '@/assets/players/mbappe.jpg';
import ramosImg from '@/assets/players/ramos.jpg';
import suarezImg from '@/assets/players/suarez.jpg';
import lamineYamalImg from '@/assets/players/lamine_yamal.jpg';
import bellinghamImg from '@/assets/players/bellingham.jpg';
import pedriImg from '@/assets/players/pedri.jpg';
import raphinhaImg from '@/assets/players/raphinha.jpg';
import salahImg from '@/assets/players/salah.jpg';
import maradonaImg from '@/assets/players/maradona.jpg';
import haalandImg from '@/assets/players/haaland.jpg';
import ronaldinhoImg from '@/assets/players/ronaldinho.jpg';
import olmoImg from '@/assets/players/olmo.jpg';
import lewandowskiImg from '@/assets/players/lewandowski.jpg';
import courtoisImg from '@/assets/players/courtois.jpg';
import viniciusImg from '@/assets/players/vinicius.jpg';
import terStegenImg from '@/assets/players/ter_stegen.jpg';
import fodenImg from '@/assets/players/foden.jpg';
import baleImg from '@/assets/players/bale.jpg';
import marceloImg from '@/assets/players/marcelo.jpg';
import ozilImg from '@/assets/players/ozil.jpg';
import pepeImg from '@/assets/players/pepe.jpg';
import maldiniImg from '@/assets/players/maldini.jpg';
import zidaneImg from '@/assets/players/zidane.jpg';

export interface PlayerClubInfo {
  id: string;
  name: string;
  image: string;
  clubs: string[]; // الأندية التي لعب لها
}

// الأندية المتاحة للأسئلة
export const QUESTION_CLUBS = [
  'ريال مدريد',
  'برشلونة',
  'مانشستر سيتي',
  'ليفربول',
  'بايرن ميونخ',
  'باريس سان جيرمان',
  'يوفنتوس',
  'تشيلسي',
  'مانشستر يونايتد',
  'أرسنال',
  'ميلان',
  'إنتر ميلان',
  'أتلتيكو مدريد',
  'بوروسيا دورتموند',
  'توتنهام',
];

export const allPlayers: PlayerClubInfo[] = [
  {
    id: 'ronaldo',
    name: 'كريستيانو رونالدو',
    image: ronaldoImg,
    clubs: ['ريال مدريد', 'مانشستر يونايتد', 'يوفنتوس'],
  },
  {
    id: 'messi',
    name: 'ليونيل ميسي',
    image: messiImg,
    clubs: ['برشلونة', 'باريس سان جيرمان'],
  },
  {
    id: 'neymar',
    name: 'نيمار',
    image: neymarImg,
    clubs: ['برشلونة', 'باريس سان جيرمان'],
  },
  {
    id: 'mbappe',
    name: 'كيليان مبابي',
    image: mbappeImg,
    clubs: ['باريس سان جيرمان', 'ريال مدريد'],
  },
  {
    id: 'ramos',
    name: 'سيرجيو راموس',
    image: ramosImg,
    clubs: ['ريال مدريد', 'باريس سان جيرمان'],
  },
  {
    id: 'suarez',
    name: 'لويس سواريز',
    image: suarezImg,
    clubs: ['ليفربول', 'برشلونة', 'أتلتيكو مدريد'],
  },
  {
    id: 'lamine_yamal',
    name: 'لامين يامال',
    image: lamineYamalImg,
    clubs: ['برشلونة'],
  },
  {
    id: 'bellingham',
    name: 'جود بيلينغهام',
    image: bellinghamImg,
    clubs: ['ريال مدريد', 'بوروسيا دورتموند'],
  },
  {
    id: 'pedri',
    name: 'بيدري',
    image: pedriImg,
    clubs: ['برشلونة'],
  },
  {
    id: 'raphinha',
    name: 'رافينيا',
    image: raphinhaImg,
    clubs: ['برشلونة', 'ليدز يونايتد'],
  },
  {
    id: 'salah',
    name: 'محمد صلاح',
    image: salahImg,
    clubs: ['ليفربول', 'تشيلسي', 'روما'],
  },
  {
    id: 'maradona',
    name: 'دييغو مارادونا',
    image: maradonaImg,
    clubs: ['برشلونة', 'نابولي'],
  },
  {
    id: 'haaland',
    name: 'إيرلينغ هالاند',
    image: haalandImg,
    clubs: ['مانشستر سيتي', 'بوروسيا دورتموند'],
  },
  {
    id: 'ronaldinho',
    name: 'رونالدينيو',
    image: ronaldinhoImg,
    clubs: ['برشلونة', 'باريس سان جيرمان', 'ميلان'],
  },
  {
    id: 'olmo',
    name: 'داني أولمو',
    image: olmoImg,
    clubs: ['برشلونة'],
  },
  {
    id: 'lewandowski',
    name: 'روبرت ليفاندوفسكي',
    image: lewandowskiImg,
    clubs: ['برشلونة', 'بايرن ميونخ', 'بوروسيا دورتموند'],
  },
  {
    id: 'courtois',
    name: 'تيبو كورتوا',
    image: courtoisImg,
    clubs: ['ريال مدريد', 'تشيلسي', 'أتلتيكو مدريد'],
  },
  {
    id: 'vinicius',
    name: 'فينيسيوس جونيور',
    image: viniciusImg,
    clubs: ['ريال مدريد'],
  },
  {
    id: 'ter_stegen',
    name: 'تير شتيغن',
    image: terStegenImg,
    clubs: ['برشلونة'],
  },
  {
    id: 'foden',
    name: 'فيل فودين',
    image: fodenImg,
    clubs: ['مانشستر سيتي'],
  },
  {
    id: 'bale',
    name: 'غاريث بيل',
    image: baleImg,
    clubs: ['ريال مدريد', 'توتنهام'],
  },
  {
    id: 'marcelo',
    name: 'مارسيلو',
    image: marceloImg,
    clubs: ['ريال مدريد'],
  },
  {
    id: 'ozil',
    name: 'مسعود أوزيل',
    image: ozilImg,
    clubs: ['ريال مدريد', 'أرسنال'],
  },
  {
    id: 'pepe',
    name: 'بيبي',
    image: pepeImg,
    clubs: ['ريال مدريد'],
  },
  {
    id: 'maldini',
    name: 'باولو مالديني',
    image: maldiniImg,
    clubs: ['ميلان'],
  },
  {
    id: 'zidane',
    name: 'زين الدين زيدان',
    image: zidaneImg,
    clubs: ['ريال مدريد', 'يوفنتوس'],
  },
];

// تحميل الصور مسبقاً
export function preloadPlayerImages() {
  allPlayers.forEach(player => {
    const img = new Image();
    img.src = player.image;
  });
}

/**
 * المستوى 9: من الذي لم يلعب في [نادي]؟
 * 3 صحيحين (لعبوا للنادي) + 1 غلط (لم يلعب)
 */
export function generateLevel9Question(usedClubs: string[]): {
  club: string;
  players: PlayerClubInfo[];
  wrongPlayer: PlayerClubInfo;
} | null {
  // أولاً نجرب الأندية الغير مستخدمة، ثم نعيد استخدام الأندية
  const availableClubs = QUESTION_CLUBS.filter(c => !usedClubs.includes(c));
  const fallbackClubs = QUESTION_CLUBS.filter(c => usedClubs.includes(c));
  const allClubs = [...availableClubs, ...fallbackClubs].sort(() => Math.random() - 0.5);

  for (const club of allClubs) {
    const playedForClub = allPlayers.filter(p => p.clubs.includes(club));
    const didNotPlay = allPlayers.filter(p => !p.clubs.includes(club));

    if (playedForClub.length >= 3 && didNotPlay.length >= 1) {
      const shuffledCorrect = [...playedForClub].sort(() => Math.random() - 0.5).slice(0, 3);
      const wrongPlayer = [...didNotPlay].sort(() => Math.random() - 0.5)[0];
      const players = [...shuffledCorrect, wrongPlayer].sort(() => Math.random() - 0.5);
      return { club, players, wrongPlayer };
    }
  }
  return null;
}

/**
 * المستوى 10: من الذي لعب في [نادي]؟
 * 1 صحيح (لعب للنادي) + 3 غلط (لم يلعبوا)
 */
export function generateLevel10Question(usedClubs: string[]): {
  club: string;
  players: PlayerClubInfo[];
  correctPlayer: PlayerClubInfo;
} | null {
  const availableClubs = QUESTION_CLUBS.filter(c => !usedClubs.includes(c));
  const fallbackClubs = QUESTION_CLUBS.filter(c => usedClubs.includes(c));
  const allClubs = [...availableClubs, ...fallbackClubs].sort(() => Math.random() - 0.5);

  for (const club of allClubs) {
    const playedForClub = allPlayers.filter(p => p.clubs.includes(club));
    const didNotPlay = allPlayers.filter(p => !p.clubs.includes(club));

    if (playedForClub.length >= 1 && didNotPlay.length >= 3) {
      const correctPlayer = [...playedForClub].sort(() => Math.random() - 0.5)[0];
      const wrongPlayers = [...didNotPlay].sort(() => Math.random() - 0.5).slice(0, 3);
      const players = [...wrongPlayers, correctPlayer].sort(() => Math.random() - 0.5);
      return { club, players, correctPlayer };
    }
  }
  return null;
}
