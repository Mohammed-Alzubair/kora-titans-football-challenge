// بيانات قصات شعر اللاعبين للمستوى السادس

// Import player images
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

export interface PlayerHaircut {
  id: string;
  name: string;
  image: string;
  generation: 'old' | 'new';
}

// 20 لاعب بصور حقيقية
export const playerHaircuts: PlayerHaircut[] = [
  {
    id: 'ronaldo',
    name: 'كريستيانو رونالدو',
    image: ronaldoImg,
    generation: 'new',
  },
  {
    id: 'messi',
    name: 'ليونيل ميسي',
    image: messiImg,
    generation: 'new',
  },
  {
    id: 'neymar',
    name: 'نيمار',
    image: neymarImg,
    generation: 'new',
  },
  {
    id: 'mbappe',
    name: 'كيليان مبابي',
    image: mbappeImg,
    generation: 'new',
  },
  {
    id: 'ramos',
    name: 'سيرجيو راموس',
    image: ramosImg,
    generation: 'new',
  },
  {
    id: 'suarez',
    name: 'لويس سواريز',
    image: suarezImg,
    generation: 'new',
  },
  {
    id: 'lamine_yamal',
    name: 'لامين يامال',
    image: lamineYamalImg,
    generation: 'new',
  },
  {
    id: 'bellingham',
    name: 'جود بيلينغهام',
    image: bellinghamImg,
    generation: 'new',
  },
  {
    id: 'pedri',
    name: 'بيدري',
    image: pedriImg,
    generation: 'new',
  },
  {
    id: 'raphinha',
    name: 'رافينيا',
    image: raphinhaImg,
    generation: 'new',
  },
  {
    id: 'salah',
    name: 'محمد صلاح',
    image: salahImg,
    generation: 'new',
  },
  {
    id: 'maradona',
    name: 'دييغو مارادونا',
    image: maradonaImg,
    generation: 'old',
  },
  {
    id: 'haaland',
    name: 'إيرلينغ هالاند',
    image: haalandImg,
    generation: 'new',
  },
  {
    id: 'ronaldinho',
    name: 'رونالدينيو',
    image: ronaldinhoImg,
    generation: 'old',
  },
  {
    id: 'olmo',
    name: 'داني أولمو',
    image: olmoImg,
    generation: 'new',
  },
  {
    id: 'lewandowski',
    name: 'روبرت ليفاندوفسكي',
    image: lewandowskiImg,
    generation: 'new',
  },
  {
    id: 'courtois',
    name: 'تيبو كورتوا',
    image: courtoisImg,
    generation: 'new',
  },
  {
    id: 'vinicius',
    name: 'فينيسيوس جونيور',
    image: viniciusImg,
    generation: 'new',
  },
  {
    id: 'ter_stegen',
    name: 'مارك أندريه تير شتيغن',
    image: terStegenImg,
    generation: 'new',
  },
  {
    id: 'foden',
    name: 'فيل فودين',
    image: fodenImg,
    generation: 'new',
  },
];

// مجموعة الأسماء الخاطئة للخيارات
export const wrongPlayerNames: string[] = [
  'فيرناندو توريس',
  'ستيفن جيرارد',
  'فرانك لامبارد',
  'ميشايل بالاك',
  'ديديه دروغبا',
  'صامويل إيتو',
  'راؤول غونزاليس',
  'أندريس إنييستا',
  'تشافي هيرنانديز',
  'كارلوس تيفيز',
  'واين روني',
  'روبن فان بيرسي',
  'أرين روبن',
  'فرانك ريبيري',
  'مانويل نوير',
  'سيرجيو أغويرو',
  'لوكا مودريتش',
  'إيدين هازارد',
  'كيفين دي بروين',
  'هاري كين',
];
