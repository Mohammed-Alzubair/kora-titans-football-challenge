export interface WhatDoYouKnowChallenge {
  id: number;
  levelId: number;
  question: string;
  hint: string;
  acceptedAnswers: string[];
  minForOnePoint: number;
  minForTwoPoints: number;
  timeLimit: number;
  category: string;
}

const normalize = (s: string) =>
  s.toLowerCase().replace(/[\u064B-\u065F\u0670]/g, '').replace(/\s+/g, ' ').trim();

export const normalizeAnswer = normalize;

export const isAnswerCorrect = (input: string, accepted: string[]): string | null => {
  const n = normalize(input);
  for (const a of accepted) {
    if (normalize(a) === n) return a;
  }
  return null;
};

export const WHAT_DO_YOU_KNOW_CHALLENGES: WhatDoYouKnowChallenge[] = [
  {
    id: 1,
    levelId: 66,
    question: "اذكر أندية أوروبية بترتيب الأحرف الإنجليزية من A إلى M",
    hint: "💡 فكر في أندية إسبانيا وإنجلترا وإيطاليا...",
    category: "أندية",
    timeLimit: 90,
    minForOnePoint: 5,
    minForTwoPoints: 10,
    acceptedAnswers: [
      "Arsenal", "آرسنال", "Aston Villa", "أستون فيلا", "Ajax", "أياكس", "Atalanta", "أتالانتا",
      "Atletico Madrid", "أتلتيكو مدريد", "AC Milan", "ميلان", "Bayern Munich", "بايرن ميونخ",
      "Barcelona", "برشلونة", "Benfica", "بنفيكا", "Borussia Dortmund", "دورتموند", "Bologna", "بولونيا",
      "Brighton", "برايتون", "Burnley", "بيرنلي", "Chelsea", "تشيلسي", "Celtic", "سلتيك",
      "Club Brugge", "كلوب بروج", "Crystal Palace", "كريستال بالاس",
      "Dortmund", "Everton", "إيفرتون", "Eintracht Frankfurt", "آينتراخت فرانكفورت",
      "Feyenoord", "فاينورد", "Fiorentina", "فيورنتينا", "Fulham", "فولهام",
      "Galatasaray", "غلطة سراي", "Genoa", "جنوى",
      "Hamburg", "هامبورغ", "Hoffenheim", "هوفنهايم",
      "Inter Milan", "إنتر ميلان", "Juventus", "يوفنتوس",
      "Lazio", "لاتسيو", "Leicester", "ليستر", "Leeds", "ليدز",
      "Leverkusen", "ليفركوزن", "Lille", "ليل", "Liverpool", "ليفربول", "Lyon", "ليون",
      "Manchester United", "مانشستر يونايتد", "Manchester City", "مانشستر سيتي",
      "Marseille", "مارسيليا", "Monaco", "موناكو", "Milan", "AC Milan",
    ],
  },
  {
    id: 2,
    levelId: 67,
    question: "اذكر حراس مرمى أجانب لعبوا في الدوري الإيطالي منذ عام 2000",
    hint: "💡 فكر في حراس برازيليين وألمان وفرنسيين...",
    category: "حراس",
    timeLimit: 90,
    minForOnePoint: 5,
    minForTwoPoints: 10,
    acceptedAnswers: [
      "Dida", "ديدا", "Julio Cesar", "جوليو سيزار", "Alisson", "أليسون",
      "Neuer", "نوير", "Szczesny", "شتشيسني", "Handanovic", "هاندانوفيتش",
      "Sommer", "زومر", "Reina", "رينا", "Cech", "تشيخ", "Navas", "نافاس",
      "Lloris", "يوريس", "Maignan", "مينيان", "Onana", "أونانا",
      "Oblak", "أوبلاك", "Neto", "نيتو", "Perin", "بيرين",
      "Robin Olsen", "أولسن", "Strakosha", "ستراكوشا",
      "Muslera", "موسليرا", "Rui Patricio", "روي باتريسيو",
      "Ederson", "إيدرسون", "Gabriel", "غابرييل",
      "Amir Abedzadeh", "عابد زاده", "Sepe", "سيبي",
      "Berisha", "بيريشا", "Dragowski", "دراغوفسكي",
      "Provedel", "بروفيديل", "Carnesecchi", "كارنيسيكي",
      "Juan Musso", "موسو", "Martinez", "مارتينيز",
    ],
  },
  {
    id: 3,
    levelId: 68,
    question: "اذكر لاعبين حققوا الثلاثية التاريخية مع بايرن ميونخ في 2013 و 2020",
    hint: "💡 فكر في القائد والحارس والمهاجمين...",
    category: "بايرن",
    timeLimit: 90,
    minForOnePoint: 5,
    minForTwoPoints: 10,
    acceptedAnswers: [
      // 2013
      "Neuer", "نوير", "Lahm", "لام", "Boateng", "بواتينغ",
      "Dante", "دانتي", "Alaba", "ألابا", "Schweinsteiger", "شفاينشتايغر",
      "Martinez", "مارتينيز", "Muller", "مولر", "Ribery", "ريبيري",
      "Robben", "روبن", "Mandzukic", "ماندزوكيتش", "Gomez", "غوميز",
      "Gustavo", "غوستافو", "Rafinha", "رافينيا", "Van Buyten", "فان بويتن",
      "Kroos", "كروس", "Shaqiri", "شاكيري",
      // 2020
      "Lewandowski", "ليفاندوفسكي", "Gnabry", "غنابري",
      "Kimmich", "كيميتش", "Goretzka", "غوريتسكا", "Thiago", "تياغو",
      "Davies", "ديفيز", "Coman", "كومان", "Sane", "ساني",
      "Pavard", "بافار", "Sule", "زوله", "Hernandez", "هيرنانديز",
      "Perisic", "بيريسيتش", "Coutinho", "كوتينيو",
    ],
  },
  {
    id: 4,
    levelId: 69,
    question: "اذكر لاعبين أجانب سجلوا أكثر من 100 هدف في الدوريات الثلاث الكبرى (إنجلترا، إسبانيا، إيطاليا)",
    hint: "💡 فكر في الهدافين التاريخيين من أمريكا الجنوبية وأفريقيا...",
    category: "هدافين",
    timeLimit: 90,
    minForOnePoint: 5,
    minForTwoPoints: 10,
    acceptedAnswers: [
      "Thierry Henry", "هنري", "Aguero", "أغويرو", "Salah", "صلاح",
      "Drogba", "دروغبا", "Suarez", "سواريز", "Messi", "ميسي",
      "Ronaldo", "رونالدو", "Cristiano", "كريستيانو",
      "Lewandowski", "ليفاندوفسكي", "Haaland", "هالاند",
      "Ibrahimovic", "إبراهيموفيتش", "Eto'o", "إيتو",
      "Van Persie", "فان بيرسي", "Cavani", "كافاني",
      "Benzema", "بنزيما", "Griezmann", "غريزمان",
      "Aubameyang", "أوباميانغ", "Lukaku", "لوكاكو",
      "Trezeguet", "تريزيغه", "Shevchenko", "شيفتشينكو",
      "Batistuta", "باتيستوتا", "Crespo", "كريسبو",
      "Forlan", "فورلان", "Villa", "فيا", "Torres", "توريس",
      "Neymar", "نيمار", "Mbappe", "مبابي",
      "Son", "سون", "Kane", "كين",
    ],
  },
  {
    id: 5,
    levelId: 70,
    question: "اذكر لاعبين سجلوا في نهائي كأس السوبر الأوروبي منذ عام 2000",
    hint: "💡 فكر في نهائيات ريال مدريد وتشيلسي وبايرن...",
    category: "سوبر أوروبي",
    timeLimit: 90,
    minForOnePoint: 5,
    minForTwoPoints: 10,
    acceptedAnswers: [
      "Figo", "فيغو", "Raul", "راؤول", "Shevchenko", "شيفتشينكو",
      "Messi", "ميسي", "Ronaldo", "رونالدو", "Bale", "بيل",
      "Ramos", "راموس", "Benzema", "بنزيما", "Isco", "إيسكو",
      "Casemiro", "كاسيميرو", "Carvajal", "كارفاخال",
      "Hazard", "هازارد", "Giroud", "جيرو", "Abraham", "إبراهيم",
      "Torres", "توريس", "Lampard", "لامبارد",
      "Lewandowski", "ليفاندوفسكي", "Martinez", "مارتينيز",
      "Javi Martinez", "خافي مارتينيز",
      "Falcao", "فالكاو", "Pedro", "بيدرو", "Iniesta", "إنييستا",
      "Villa", "فيا", "Neymar", "نيمار", "Dani Alves", "داني ألفيش",
      "Griezmann", "غريزمان", "Saul", "ساؤول",
      "Dzeko", "دجيكو", "Muller", "مولر",
    ],
  },
  {
    id: 6,
    levelId: 71,
    question: "اذكر لاعبين فازوا بالكرة الذهبية (Ballon d'Or) منذ عام 2000",
    hint: "💡 فكر في ميسي ورونالدو ومن فاز بينهما...",
    category: "كرة ذهبية",
    timeLimit: 90,
    minForOnePoint: 5,
    minForTwoPoints: 10,
    acceptedAnswers: [
      "Figo", "فيغو", "Owen", "أوين", "Ronaldo", "رونالدو", "R9",
      "Nedved", "نيدفيد", "Shevchenko", "شيفتشينكو",
      "Ronaldinho", "رونالدينيو", "Cannavaro", "كانافارو",
      "Kaka", "كاكا", "Cristiano Ronaldo", "كريستيانو رونالدو", "كريستيانو",
      "Messi", "ميسي", "Modric", "مودريتش",
      "Benzema", "بنزيما", "Bellingham", "بيلينغهام",
      "Rodri", "رودري", "Yamal", "يامال",
    ],
  },
  {
    id: 7,
    levelId: 72,
    question: "اذكر مدربين درّبوا ريال مدريد أو برشلونة",
    hint: "💡 فكر في المدربين الأساطير والأجانب...",
    category: "مدربين",
    timeLimit: 90,
    minForOnePoint: 5,
    minForTwoPoints: 10,
    acceptedAnswers: [
      "Guardiola", "غوارديولا", "Ancelotti", "أنشيلوتي",
      "Zidane", "زيدان", "Mourinho", "مورينيو",
      "Enrique", "إنريكي", "Luis Enrique", "لويس إنريكي",
      "Xavi", "تشافي", "Koeman", "كومان",
      "Setien", "سيتين", "Valverde", "فالفيردي",
      "Lopetegui", "لوبيتيغي", "Solari", "سولاري",
      "Benitez", "بينيتيز", "Pellegrini", "بيلليغريني",
      "Capello", "كابيلو", "Rijkaard", "ريكارد",
      "Van Gaal", "فان غال", "Del Bosque", "ديل بوسكي",
      "Heynckes", "هاينكس", "Queiroz", "كيروش",
      "Flick", "فليك", "Tata Martino", "تاتا مارتينو",
      "Schuster", "شوستر", "Luxemburgo", "لوكسمبورغو",
    ],
  },
  {
    id: 8,
    levelId: 73,
    question: "اذكر لاعبين لعبوا لريال مدريد ومانشستر يونايتد",
    hint: "💡 فكر في الانتقالات الكبيرة بين النادين...",
    category: "لاعبين",
    timeLimit: 90,
    minForOnePoint: 5,
    minForTwoPoints: 10,
    acceptedAnswers: [
      "Cristiano Ronaldo", "كريستيانو", "Beckham", "بيكهام",
      "Van Nistelrooy", "فان نيستلروي", "Di Maria", "دي ماريا",
      "Chicharito", "تشيتشاريتو", "Forlan", "فورلان",
      "Heinze", "هاينزه", "Casemiro", "كاسيميرو",
      "Varane", "فاران", "Owen", "أوين",
    ],
  },
  {
    id: 9,
    levelId: 74,
    question: "اذكر ملاعب استضافت نهائي دوري الأبطال الأوروبي منذ عام 2000",
    hint: "💡 فكر في ملاعب إنجلترا وإسبانيا وألمانيا...",
    category: "ملاعب",
    timeLimit: 90,
    minForOnePoint: 5,
    minForTwoPoints: 10,
    acceptedAnswers: [
      "Wembley", "ويمبلي", "Stade de France", "ستاد دو فرانس",
      "San Siro", "سان سيرو", "Ataturk", "أتاتورك",
      "Olimpico", "أولمبيكو", "Luzhniki", "لوجنيكي",
      "Bernabeu", "برنابيو", "Santiago Bernabeu", "سانتياغو برنابيو",
      "Allianz Arena", "أليانز أرينا", "Hampden Park", "هامبدن بارك",
      "Old Trafford", "أولد ترافورد", "Amsterdam Arena", "أمستردام أرينا",
      "Millennium", "ميلينيوم", "Olympic Stadium", "الملعب الأولمبي",
      "Estadio da Luz", "استاديو دا لوز",
      "NSC Olimpiyskiy", "أولمبيسكي كييف",
      "Metropolitano", "متروبوليتانو",
      "Dragao", "دراغاو", "Parc des Princes", "بارك دي برانس",
    ],
  },
  {
    id: 10,
    levelId: 75,
    question: "اذكر لاعبين سجلوا هاتريك في دوري أبطال أوروبا",
    hint: "💡 فكر في ميسي ورونالدو وليفاندوفسكي...",
    category: "هاتريك",
    timeLimit: 90,
    minForOnePoint: 5,
    minForTwoPoints: 10,
    acceptedAnswers: [
      "Messi", "ميسي", "Cristiano Ronaldo", "كريستيانو", "رونالدو",
      "Lewandowski", "ليفاندوفسكي", "Haaland", "هالاند",
      "Benzema", "بنزيما", "Bale", "بيل", "Neymar", "نيمار",
      "Mbappe", "مبابي", "Salah", "صلاح",
      "Shevchenko", "شيفتشينكو", "Raul", "راؤول",
      "Inzaghi", "إنزاغي", "Gomez", "غوميز",
      "Luiz Adriano", "لويز أدريانو", "Muller", "مولر",
      "Robben", "روبن", "Ribery", "ريبيري",
      "Griezmann", "غريزمان", "Havertz", "هافيرتز",
      "Giroud", "جيرو", "Sterling", "ستيرلينغ",
      "Kane", "كين", "Son", "سون",
      "Dzeko", "دجيكو", "Cavani", "كافاني",
    ],
  },
];

export function getChallengeByLevel(levelId: number): WhatDoYouKnowChallenge | undefined {
  return WHAT_DO_YOU_KNOW_CHALLENGES.find(c => c.levelId === levelId);
}
