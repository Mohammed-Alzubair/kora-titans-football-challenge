// المستوى 23 - اعرف اللاعب وهو صغير

import maldiniKid from '@/assets/kids/maldini_kid.jpg';
import modricKid from '@/assets/kids/modric_kid.jpg';
import modricKid2 from '@/assets/kids/modric_kid2.jpg';
import kroosKid from '@/assets/kids/kroos_kid.jpg';
import neymarKid from '@/assets/kids/neymar_kid.jpg';
import haalandKid from '@/assets/kids/haaland_kid.jpg';
import baleKid from '@/assets/kids/bale_kid.jpg';
import ozilKid from '@/assets/kids/ozil_kid.jpg';
import ronaldinhoKid from '@/assets/kids/ronaldinho_kid.jpg';
import debruyneKid from '@/assets/kids/debruyne_kid.jpg';
import piqueKid from '@/assets/kids/pique_kid.jpg';
import rooneyKid from '@/assets/kids/rooney_kid.jpg';
import kakaKid from '@/assets/kids/kaka_kid.jpg';
import jamesKid from '@/assets/kids/james_kid.jpg';
import rodriKid from '@/assets/kids/rodri_kid.jpg';
import valverdeKid from '@/assets/kids/valverde_kid.jpg';
import rodrygoKid from '@/assets/kids/rodrygo_kid.jpg';
import yamalKid from '@/assets/kids/yamal_kid.jpg';
import gulerKid from '@/assets/kids/guler_kid.jpg';
import dybalaKid from '@/assets/kids/dybala_kid.jpg';
import dybalaKid2 from '@/assets/kids/dybala_kid2.jpg';
import ramosKid from '@/assets/kids/ramos_kid.jpg';
import neymarKid2 from '@/assets/kids/neymar_kid2.jpg';
import cristianoKid from '@/assets/kids/cristiano_kid.jpg';
import mbappeKid from '@/assets/kids/mbappe_kid.jpg';
import messiKid from '@/assets/kids/messi_kid.jpg';

export interface KidPhotoQuestion {
  id: number;
  image: string;
  playerName: string;
  acceptedAnswers: string[];
  hint: string;
}

export const kidPhotoQuestions: KidPhotoQuestion[] = [
  {
    id: 1,
    image: maldiniKid,
    playerName: "مالديني",
    acceptedAnswers: ["مالديني", "maldini", "باولو مالديني", "paolo maldini"],
    hint: "أسطورة إيطالية في الدفاع 🇮🇹",
  },
  {
    id: 2,
    image: modricKid2,
    playerName: "مودريتش",
    acceptedAnswers: ["مودريتش", "modric", "لوكا مودريتش", "luka modric"],
    hint: "ساحر كرواتي فاز بالكرة الذهبية 🇭🇷",
  },
  {
    id: 3,
    image: kroosKid,
    playerName: "كروس",
    acceptedAnswers: ["كروس", "kroos", "توني كروس", "toni kroos"],
    hint: "ألماني دقيق في التمرير 🇩🇪",
  },
  {
    id: 4,
    image: neymarKid,
    playerName: "بيبي",
    acceptedAnswers: ["بيبي", "pepe", "بي بي", "كيبير لوبيز", "kepler lopes"],
    hint: "مدافع برتغالي شرس من ريال مدريد 🇵🇹",
  },
  {
    id: 5,
    image: modricKid,
    playerName: "مودريتش",
    acceptedAnswers: ["مودريتش", "modric", "لوكا مودريتش", "luka modric"],
    hint: "قائد كرواتيا في كأس العالم 🇭🇷",
  },
  {
    id: 6,
    image: haalandKid,
    playerName: "هالاند",
    acceptedAnswers: ["هالاند", "haaland", "إيرلينغ هالاند", "erling haaland"],
    hint: "وحش نرويجي يسجل الأهداف 🇳🇴",
  },
  {
    id: 7,
    image: baleKid,
    playerName: "بيل",
    acceptedAnswers: ["بيل", "bale", "غاريث بيل", "gareth bale"],
    hint: "ويلزي سريع كالصاروخ 🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  },
  {
    id: 8,
    image: ozilKid,
    playerName: "أوزيل",
    acceptedAnswers: ["أوزيل", "اوزيل", "ozil", "مسعود أوزيل", "mesut ozil"],
    hint: "عيون مميزة وتمريرات ساحرة 🇩🇪",
  },
  {
    id: 9,
    image: ronaldinhoKid,
    playerName: "رونالدينيو",
    acceptedAnswers: ["رونالدينيو", "ronaldinho"],
    hint: "ابتسامة برازيلية ومهارات خرافية 🇧🇷",
  },
  {
    id: 10,
    image: debruyneKid,
    playerName: "دي بروين",
    acceptedAnswers: ["دي بروين", "de bruyne", "كيفن دي بروين", "kevin de bruyne"],
    hint: "بلجيكي ملك التمريرات الحاسمة 🇧🇪",
  },
  {
    id: 11,
    image: piqueKid,
    playerName: "بيكيه",
    acceptedAnswers: ["بيكيه", "pique", "بيكي", "جيرارد بيكيه", "gerard pique"],
    hint: "مدافع برشلونة الأسطوري 🇪🇸",
  },
  {
    id: 12,
    image: rooneyKid,
    playerName: "روني",
    acceptedAnswers: ["روني", "rooney", "واين روني", "wayne rooney"],
    hint: "أسطورة مانشستر يونايتد 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  },
  {
    id: 13,
    image: kakaKid,
    playerName: "كاكا",
    acceptedAnswers: ["كاكا", "kaka", "كاكا", "ricardo kaka"],
    hint: "برازيلي فاز بالكرة الذهبية مع ميلان 🇧🇷",
  },
  {
    id: 14,
    image: jamesKid,
    playerName: "خاميس",
    acceptedAnswers: ["خاميس", "james", "خاميس رودريغيز", "james rodriguez", "هاميس"],
    hint: "كولومبي هداف كأس العالم 2014 🇨🇴",
  },
  {
    id: 15,
    image: rodriKid,
    playerName: "رودري",
    acceptedAnswers: ["رودري", "rodri", "رودري هيرنانديز", "rodrigo hernandez"],
    hint: "إسباني فاز بالكرة الذهبية مع السيتي 🇪🇸",
  },
  {
    id: 16,
    image: valverdeKid,
    playerName: "فالفيردي",
    acceptedAnswers: ["فالفيردي", "valverde", "فيدي فالفيردي", "fede valverde"],
    hint: "أوروغواياني يركض كالحصان في ريال مدريد 🇺🇾",
  },
  {
    id: 17,
    image: rodrygoKid,
    playerName: "رودريغو",
    acceptedAnswers: ["رودريغو", "rodrygo", "رودريغو غويز", "rodrygo goes"],
    hint: "برازيلي شاب يلعب لريال مدريد 🇧🇷",
  },
  {
    id: 18,
    image: yamalKid,
    playerName: "لامين يامال",
    acceptedAnswers: ["يامال", "لامين يامال", "lamine yamal", "yamal", "لامين"],
    hint: "أصغر نجم في تاريخ برشلونة وإسبانيا 🇪🇸",
  },
  {
    id: 19,
    image: gulerKid,
    playerName: "أردا غولر",
    acceptedAnswers: ["غولر", "أردا غولر", "arda guler", "guler", "اردا غولر", "اردا"],
    hint: "تركي موهوب في ريال مدريد 🇹🇷",
  },
  {
    id: 20,
    image: dybalaKid,
    playerName: "ديبالا",
    acceptedAnswers: ["ديبالا", "dybala", "باولو ديبالا", "paulo dybala"],
    hint: "أرجنتيني يحتفل بقناع الجوهرة 🇦🇷",
  },
  {
    id: 21,
    image: dybalaKid2,
    playerName: "ديبالا",
    acceptedAnswers: ["ديبالا", "dybala", "باولو ديبالا", "paulo dybala"],
    hint: "الجوهرة الأرجنتينية 🇦🇷",
  },
  {
    id: 22,
    image: ramosKid,
    playerName: "راموس",
    acceptedAnswers: ["راموس", "ramos", "سيرخيو راموس", "sergio ramos"],
    hint: "قائد ريال مدريد الأسطوري 🇪🇸",
  },
  {
    id: 23,
    image: neymarKid2,
    playerName: "نيمار",
    acceptedAnswers: ["نيمار", "neymar", "نيمار جونيور", "neymar jr"],
    hint: "برازيلي ساحر بمهارات خرافية 🇧🇷",
  },
  {
    id: 24,
    image: cristianoKid,
    playerName: "كريستيانو",
    acceptedAnswers: ["كريستيانو", "رونالدو", "cristiano", "ronaldo", "cr7", "كريستيانو رونالدو"],
    hint: "الدون البرتغالي 🇵🇹",
  },
  {
    id: 25,
    image: mbappeKid,
    playerName: "مبابي",
    acceptedAnswers: ["مبابي", "mbappe", "كيليان مبابي", "kylian mbappe", "امبابي"],
    hint: "سلحفاة فرنسية سريعة 🇫🇷",
  },
  {
    id: 26,
    image: messiKid,
    playerName: "ميسي",
    acceptedAnswers: ["ميسي", "messi", "ليونيل ميسي", "lionel messi", "ليو ميسي"],
    hint: "الماعز الأرجنتيني 🐐🇦🇷",
  },
];
