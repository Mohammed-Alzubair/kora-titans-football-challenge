import messiImg from '@/assets/players/messi.jpg';
import ronaldoImg from '@/assets/players/ronaldo.jpg';
import neymarImg from '@/assets/players/neymar.jpg';
import mbappeImg from '@/assets/players/mbappe.jpg';
import haalandImg from '@/assets/players/haaland.jpg';
import bellinghamImg from '@/assets/players/bellingham.jpg';
import viniciusImg from '@/assets/players/vinicius.jpg';
import salahImg from '@/assets/players/salah.jpg';
import lewandowskiImg from '@/assets/players/lewandowski.jpg';
import zidaneImg from '@/assets/players/zidane.jpg';
import ronaldinhoImg from '@/assets/players/ronaldinho.jpg';
import ramosImg from '@/assets/players/ramos.jpg';

export interface MysteryPlayerQuestion {
  id: number;
  playerName: string;
  playerImage: string;
  acceptedAnswers: string[];
}

export const mysteryPlayerQuestions: MysteryPlayerQuestion[] = [
  { id: 1, playerName: 'ليونيل ميسي', playerImage: messiImg, acceptedAnswers: ['ميسي', 'messi', 'lionel', 'ليونيل', 'الماعز', 'goat', 'leo'] },
  { id: 2, playerName: 'كريستيانو رونالدو', playerImage: ronaldoImg, acceptedAnswers: ['رونالدو', 'كريستيانو', 'ronaldo', 'cristiano', 'cr7', 'الدون'] },
  { id: 3, playerName: 'نيمار', playerImage: neymarImg, acceptedAnswers: ['نيمار', 'neymar', 'ney'] },
  { id: 4, playerName: 'كيليان مبابي', playerImage: mbappeImg, acceptedAnswers: ['مبابي', 'mbappe', 'kylian', 'كيليان', 'السلحفاة'] },
  { id: 5, playerName: 'إيرلينغ هالاند', playerImage: haalandImg, acceptedAnswers: ['هالاند', 'haaland', 'erling', 'إيرلينغ', 'الروبوت'] },
  { id: 6, playerName: 'جود بيلينغهام', playerImage: bellinghamImg, acceptedAnswers: ['بيلينغهام', 'bellingham', 'jude', 'جود'] },
  { id: 7, playerName: 'فينيسيوس جونيور', playerImage: viniciusImg, acceptedAnswers: ['فينيسيوس', 'vinicius', 'vini', 'فيني', 'جونيور'] },
  { id: 8, playerName: 'محمد صلاح', playerImage: salahImg, acceptedAnswers: ['صلاح', 'salah', 'محمد', 'mo', 'الفرعون'] },
  { id: 9, playerName: 'روبرت ليفاندوفسكي', playerImage: lewandowskiImg, acceptedAnswers: ['ليفاندوفسكي', 'lewandowski', 'lewy', 'روبرت', 'ليفا'] },
  { id: 10, playerName: 'زين الدين زيدان', playerImage: zidaneImg, acceptedAnswers: ['زيدان', 'zidane', 'زين الدين', 'zizou'] },
  { id: 11, playerName: 'رونالدينيو', playerImage: ronaldinhoImg, acceptedAnswers: ['رونالدينيو', 'ronaldinho', 'dinho', 'الساحر'] },
  { id: 12, playerName: 'سيرجيو راموس', playerImage: ramosImg, acceptedAnswers: ['راموس', 'ramos', 'سيرجيو', 'sergio', 'sr4'] },
];
