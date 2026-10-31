export interface AuctionQuestion {
  id: number;
  question: string;
  maxAnswers: number;
  acceptedAnswers: string[];
  category: string;
}

export interface AuctionLevel {
  levelId: number;
  questions: AuctionQuestion[];
}

const normalize = (s: string) =>
  s.toLowerCase().replace(/[\u064B-\u065F\u0670]/g, '').replace(/\s+/g, ' ').trim();

export const isAuctionAnswerCorrect = (input: string, accepted: string[]): string | null => {
  const n = normalize(input);
  for (const a of accepted) {
    if (normalize(a) === n) return a;
  }
  return null;
};

export const AUCTION_LEVELS: AuctionLevel[] = [
  // Level 76 - 5 أسئلة
  {
    levelId: 76,
    questions: [
      {
        id: 1, category: "مدربين",
        question: "كم اسم لاعب تدرّب تحت قيادة مدرب غير إيطالي في أندية التوب 3 في الدوري الإيطالي تقدر تذكر؟",
        maxAnswers: 25,
        acceptedAnswers: [
          "Messi", "ميسي", "Lautaro", "لاوتارو", "Barella", "باريلا", "Calhanoglu", "تشالهان أوغلو",
          "Thuram", "ثورام", "Dimarco", "ديماركو", "Bastoni", "باستوني", "Dumfries", "دومفريس",
          "Leao", "ليساو", "Theo Hernandez", "تيو هيرنانديز", "Pulisic", "بوليسيتش",
          "Maignan", "مينيان", "Reijnders", "رايندرز", "Morata", "موراتا",
          "Ibrahimovic", "إبراهيموفيتش", "Ronaldinho", "رونالدينيو", "Kaka", "كاكا",
          "Seedorf", "سيدورف", "Pirlo", "بيرلو", "Shevchenko", "شيفتشينكو",
          "Lukaku", "لوكاكو", "Eriksen", "إيريكسن", "Hakimi", "حكيمي",
          "Perisic", "بيريسيتش", "Dzeko", "دجيكو", "Vidal", "فيدال",
          "Sanchez", "سانشيز", "Brozovic", "بروزوفيتش", "De Vrij", "دي فراي",
          "Dybala", "ديبالا", "Vlahovic", "فلاهوفيتش", "Chiesa", "كييزا",
          "Osimhen", "أوسيمين", "Kvara", "كفاراتسخيليا", "Lobotka", "لوبوتكا",
        ],
      },
      {
        id: 2, category: "لاعبين",
        question: "كم اسم لاعب برازيلي لعب في الدوري الإسباني تقدر تذكر؟",
        maxAnswers: 25,
        acceptedAnswers: [
          "Ronaldo", "رونالدو", "Ronaldinho", "رونالدينيو", "Rivaldo", "ريفالدو",
          "Neymar", "نيمار", "Vinicius", "فينيسيوس", "Rodrygo", "رودريغو",
          "Casemiro", "كاسيميرو", "Marcelo", "مارسيلو", "Roberto Carlos", "روبرتو كارلوس",
          "Dani Alves", "داني ألفيش", "Raphinha", "رافينيا", "Endrick", "إندريك",
          "Militao", "ميليتاو", "Bremer", "بريمير", "Arthur", "آرثر",
          "Coutinho", "كوتينيو", "Firmino", "فيرمينو", "Adriano", "أدريانو",
          "Robinho", "روبينيو", "Kaka", "كاكا", "Denilson", "دينيلسون",
          "Julio Baptista", "جوليو باتيستا", "Cicinho", "سيسينيو",
          "Emerson", "إيمرسون", "Mazinho", "مازينيو",
        ],
      },
      {
        id: 3, category: "أندية",
        question: "كم اسم نادي إنجليزي شارك في دوري أبطال أوروبا تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "Manchester United", "مانشستر يونايتد", "Liverpool", "ليفربول",
          "Chelsea", "تشيلسي", "Arsenal", "آرسنال", "Manchester City", "مانشستر سيتي",
          "Tottenham", "توتنهام", "Leeds", "ليدز", "Newcastle", "نيوكاسل",
          "Nottingham Forest", "نوتنغهام فورست", "Everton", "إيفرتون",
          "Aston Villa", "أستون فيلا", "Leicester", "ليستر",
          "Blackburn", "بلاكبيرن", "Derby County", "ديربي كاونتي",
          "West Ham", "وست هام", "Brighton", "برايتون",
          "Burnley", "بيرنلي", "Wolverhampton", "وولفرهامبتون",
        ],
      },
      {
        id: 4, category: "هدافين",
        question: "كم اسم لاعب سجّل في نهائي دوري أبطال أوروبا منذ 2005 تقدر تذكر؟",
        maxAnswers: 25,
        acceptedAnswers: [
          "Gerrard", "جيرارد", "Alonso", "ألونسو", "Smicer", "سميسر",
          "Eto'o", "إيتو", "Belletti", "بيليتي", "Messi", "ميسي",
          "Ronaldo", "رونالدو", "Bale", "بيل", "Ramos", "راموس",
          "Mandzukic", "ماندزوكيتش", "Drogba", "دروغبا", "Muller", "مولر",
          "Robben", "روبن", "Milito", "ميليتو", "Pedro", "بيدرو",
          "Villa", "فيا", "Carvajal", "كارفاخال", "Vinicius", "فينيسيوس",
          "Salah", "صلاح", "Mane", "ماني", "Origi", "أوريغي",
          "Benzema", "بنزيما", "Firmino", "فيرمينو", "Son", "سون",
          "Neymar", "نيمار", "Coman", "كومان", "Asensio", "أسينسيو",
        ],
      },
      {
        id: 5, category: "حراس",
        question: "كم اسم حارس مرمى فاز بدوري أبطال أوروبا تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "Casillas", "كاسياس", "Buffon", "بوفون", "Neuer", "نوير",
          "Courtois", "كورتوا", "Alisson", "أليسون", "Cech", "تشيخ",
          "Van der Sar", "فان دير سار", "Valdés", "فالديز",
          "Kahn", "كان", "Dida", "ديدا", "Ter Stegen", "تير شتيغن",
          "Oblak", "أوبلاك", "Ederson", "إيدرسون", "Lloris", "يوريس",
          "Julio Cesar", "جوليو سيزار", "Reina", "رينا",
          "Donnarumma", "دوناروما", "Navas", "نافاس", "Maignan", "مينيان",
        ],
      },
    ],
  },
  // Level 77
  {
    levelId: 77,
    questions: [
      {
        id: 1, category: "مدافعين",
        question: "كم اسم مدافع لعب بجانب كريستيانو رونالدو في الأندية تقدر تذكر؟",
        maxAnswers: 30,
        acceptedAnswers: [
          "Ramos", "راموس", "Pepe", "بيبي", "Marcelo", "مارسيلو",
          "Varane", "فاران", "Carvajal", "كارفاخال", "Coentrao", "كوينتراو",
          "Arbeloa", "أربيلوا", "Nacho", "ناتشو", "Militao", "ميليتاو",
          "Ferdinand", "فيرديناند", "Vidic", "فيديتش", "Evra", "إيفرا",
          "Rafael", "رافاييل", "Brown", "براون", "O'Shea", "أوشي",
          "Bonucci", "بونوتشي", "Chiellini", "كيليني", "De Ligt", "دي ليخت",
          "Alex Sandro", "أليكس ساندرو", "Danilo", "دانيلو", "Cuadrado", "كوادرادو",
          "Diallo", "ديالو", "Maguire", "ماغواير", "Shaw", "شو",
          "Dalot", "دالوت", "Lindelof", "ليندلوف", "Wan-Bissaka", "وان بيساكا",
          "Cancelo", "كانسيلو", "Rugani", "روغاني",
        ],
      },
      {
        id: 2, category: "لاعبين",
        question: "كم اسم لاعب أرجنتيني لعب في الدوري الإيطالي تقدر تذكر؟",
        maxAnswers: 25,
        acceptedAnswers: [
          "Messi", "ميسي", "Maradona", "مارادونا", "Batistuta", "باتيستوتا",
          "Crespo", "كريسبو", "Zanetti", "زانيتي", "Samuel", "صامويل",
          "Cambiasso", "كامبياسو", "Tevez", "تيفيز", "Aguero", "أغويرو",
          "Higuain", "هيغواين", "Dybala", "ديبالا", "Di Maria", "دي ماريا",
          "Lautaro", "لاوتارو", "Icardi", "إيكاردي", "Banega", "بانيغا",
          "Pastore", "باستوري", "Lamela", "لاميلا", "Correa", "كوريا",
          "Martinez", "مارتينيز", "Paredes", "باريديس", "Pereyra", "بيريرا",
          "Simeone", "سيميوني", "Veron", "فيرون", "Milito", "ميليتو",
          "Caballero", "كاباييرو",
        ],
      },
      {
        id: 3, category: "ملاعب",
        question: "كم اسم ملعب في إنجلترا تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "Old Trafford", "أولد ترافورد", "Anfield", "آنفيلد",
          "Emirates", "الإمارات", "Stamford Bridge", "ستامفورد بريدج",
          "Etihad", "الاتحاد", "Tottenham Stadium", "ملعب توتنهام",
          "Wembley", "ويمبلي", "Goodison Park", "غوديسون بارك",
          "Elland Road", "إيلاند رود", "St James Park", "سانت جيمس بارك",
          "London Stadium", "ملعب لندن", "Villa Park", "فيلا بارك",
          "Molineux", "مولينو", "Selhurst Park", "سيلهيرست بارك",
          "Craven Cottage", "كرافن كوتيج", "Bramall Lane", "براميل لين",
          "King Power", "كينغ باور", "Carrow Road", "كارو رود",
        ],
      },
      {
        id: 4, category: "مدربين",
        question: "كم اسم مدرب فاز بدوري أبطال أوروبا تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "Ancelotti", "أنشيلوتي", "Guardiola", "غوارديولا", "Zidane", "زيدان",
          "Mourinho", "مورينيو", "Ferguson", "فيرغسون", "Klopp", "كلوب",
          "Del Bosque", "ديل بوسكي", "Lippi", "ليبي", "Heynckes", "هاينكس",
          "Flick", "فليك", "Luis Enrique", "لويس إنريكي", "Rijkaard", "ريكارد",
          "Benitez", "بينيتيز", "Sacchi", "ساكي", "Capello", "كابيلو",
          "Hitzfeld", "هيتسفيلد", "Tuchel", "توخيل", "Di Matteo", "دي ماتيو",
          "Van Gaal", "فان غال", "Cruyff", "كرويف",
        ],
      },
      {
        id: 5, category: "لاعبين",
        question: "كم اسم لاعب فرنسي لعب في الدوري الإنجليزي تقدر تذكر؟",
        maxAnswers: 25,
        acceptedAnswers: [
          "Henry", "هنري", "Vieira", "فييرا", "Pires", "بيريس",
          "Cantona", "كانتونا", "Kante", "كانتي", "Pogba", "بوغبا",
          "Martial", "مارسيال", "Giroud", "جيرو", "Lloris", "يوريس",
          "Makelele", "ماكيليلي", "Anelka", "أنيلكا", "Nasri", "نصري",
          "Sagna", "ساغنا", "Clichy", "كليشي", "Evra", "إيفرا",
          "Lacazette", "لاكازيت", "Koscielny", "كوشيلني", "Welbeck", "ويلبيك",
          "Sissoko", "سيسوكو", "Ndombele", "ندومبيلي", "Mendy", "ميندي",
          "Saliba", "صليبا", "Guendouzi", "غندوزي", "Digne", "ديني",
        ],
      },
    ],
  },
  // Level 78
  {
    levelId: 78,
    questions: [
      {
        id: 1, category: "بطولات",
        question: "كم اسم لاعب حقق بطولة أوروبية مع نادٍ إيطالي عبر التاريخ تقدر تذكر؟",
        maxAnswers: 30,
        acceptedAnswers: [
          "Maldini", "مالديني", "Pirlo", "بيرلو", "Gattuso", "غاتوزو",
          "Inzaghi", "إنزاغي", "Seedorf", "سيدورف", "Kaka", "كاكا",
          "Shevchenko", "شيفتشينكو", "Nesta", "نيستا", "Cafu", "كافو",
          "Zanetti", "زانيتي", "Milito", "ميليتو", "Sneijder", "سنايدر",
          "Eto'o", "إيتو", "Maicon", "مايكون", "Cambiasso", "كامبياسو",
          "Samuel", "صامويل", "Stankovic", "ستانكوفيتش",
          "Baresi", "باريزي", "Costacurta", "كوستاكورتا",
          "Del Piero", "ديل بييرو", "Buffon", "بوفون", "Nedved", "نيدفيد",
          "Materazzi", "ماتيراتسي", "Cannavaro", "كانافارو",
          "Dida", "ديدا", "Crespo", "كريسبو", "Rui Costa", "روي كوستا",
          "Van Basten", "فان باستن", "Gullit", "خوليت", "Rijkaard", "ريكارد",
        ],
      },
      {
        id: 2, category: "لاعبين",
        question: "كم اسم لاعب ألماني لعب في دوري أبطال أوروبا تقدر تذكر؟",
        maxAnswers: 25,
        acceptedAnswers: [
          "Muller", "مولر", "Neuer", "نوير", "Kimmich", "كيميتش",
          "Kroos", "كروس", "Gundogan", "غوندوغان", "Sane", "ساني",
          "Gnabry", "غنابري", "Havertz", "هافيرتز", "Werner", "فيرنر",
          "Rudiger", "روديغر", "Goretzka", "غوريتسكا", "Schweinsteiger", "شفاينشتايغر",
          "Lahm", "لام", "Klose", "كلوزه", "Ballack", "بالاك",
          "Ozil", "أوزيل", "Reus", "رويس", "Gotze", "غوتزه",
          "Hummels", "هوملز", "Boateng", "بواتينغ", "Beckenbauer", "بيكنباور",
          "Matthaus", "ماتيوس", "Voller", "فولر", "Scholl", "شول",
        ],
      },
      {
        id: 3, category: "منتخبات",
        question: "كم اسم منتخب وصل لنصف نهائي كأس العالم منذ 2002 تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "Brazil", "البرازيل", "Germany", "ألمانيا", "Turkey", "تركيا",
          "South Korea", "كوريا الجنوبية", "France", "فرنسا", "Portugal", "البرتغال",
          "Italy", "إيطاليا", "Spain", "إسبانيا", "Netherlands", "هولندا",
          "Uruguay", "أوروغواي", "Argentina", "الأرجنتين", "Croatia", "كرواتيا",
          "Belgium", "بلجيكا", "England", "إنجلترا", "Morocco", "المغرب",
        ],
      },
      {
        id: 4, category: "لاعبين",
        question: "كم اسم لاعب إفريقي لعب في أوروبا تقدر تذكر؟",
        maxAnswers: 25,
        acceptedAnswers: [
          "Salah", "صلاح", "Mane", "ماني", "Eto'o", "إيتو",
          "Drogba", "دروغبا", "Toure", "توريه", "Essien", "إيسيان",
          "Aubameyang", "أوباميانغ", "Mahrez", "محرز", "Hakimi", "حكيمي",
          "Osimhen", "أوسيمين", "Koulibaly", "كوليبالي", "Mendy", "ميندي",
          "Keita", "كيتا", "Onana", "أونانا", "Abedi Pele", "أبيدي بيليه",
          "Weah", "وياه", "Okocha", "أوكوتشا", "Adebayor", "أديبايور",
          "Gervinho", "جيرفينيو", "Bamba", "بامبا", "Ziyech", "زياش",
          "Bennacer", "بناصر", "Benatia", "بناطيا", "Amrabat", "أمرابط",
        ],
      },
      {
        id: 5, category: "أندية",
        question: "كم اسم نادٍ فاز بالدوري الإسباني تقدر تذكر؟",
        maxAnswers: 10,
        acceptedAnswers: [
          "Real Madrid", "ريال مدريد", "Barcelona", "برشلونة",
          "Atletico Madrid", "أتلتيكو مدريد", "Valencia", "فالنسيا",
          "Deportivo", "ديبورتيفو", "Real Sociedad", "ريال سوسييداد",
          "Sevilla", "إشبيلية", "Athletic Bilbao", "أثلتيك بيلباو",
          "Real Betis", "ريال بيتيس",
        ],
      },
    ],
  },
  // Level 79
  {
    levelId: 79,
    questions: [
      {
        id: 1, category: "مهاجمين",
        question: "كم اسم مهاجم زامل كريم بنزيما في الأندية تقدر تذكر؟",
        maxAnswers: 25,
        acceptedAnswers: [
          "Ronaldo", "رونالدو", "Bale", "بيل", "Higuain", "هيغواين",
          "Vinicius", "فينيسيوس", "Rodrygo", "رودريغو", "Hazard", "هازارد",
          "Jese", "خيسي", "Asensio", "أسينسيو", "Morata", "موراتا",
          "Di Maria", "دي ماريا", "Ozil", "أوزيل", "Isco", "إيسكو",
          "Lucas Vazquez", "لوكاس فاسكيز", "Mbappe", "مبابي",
          "Juninho", "جونينيو", "Lisandro", "ليساندرو", "Fred", "فريد",
          "Gomis", "غوميس", "Lacazette", "لاكازيت", "Fekir", "فكير",
          "Ribery", "ريبيري", "Valbuena", "فالبوينا", "Griezmann", "غريزمان",
          "Giroud", "جيرو", "Mbappe", "مبابي",
        ],
      },
      {
        id: 2, category: "لاعبين",
        question: "كم اسم لاعب لعب لبرشلونة وريال مدريد تقدر تذكر؟",
        maxAnswers: 15,
        acceptedAnswers: [
          "Figo", "فيغو", "Ronaldo", "رونالدو", "R9",
          "Michael Laudrup", "لاودروب", "Luis Enrique", "لويس إنريكي",
          "Saviola", "سافيولا", "Samuel Eto'o", "إيتو",
          "Bernd Schuster", "شوستر", "Prosinecki", "بروسينيتشكي",
        ],
      },
      {
        id: 3, category: "بطولات",
        question: "كم اسم لاعب سجل في نهائي كأس العالم منذ 1998 تقدر تذكر؟",
        maxAnswers: 25,
        acceptedAnswers: [
          "Zidane", "زيدان", "Ronaldo", "رونالدو", "Mbappe", "مبابي",
          "Messi", "ميسي", "Di Maria", "دي ماريا", "Gotze", "غوتزه",
          "Iniesta", "إنييستا", "Villa", "فيا", "Torres", "توريس",
          "Materazzi", "ماتيراتسي", "Mandzukic", "ماندزوكيتش",
          "Griezmann", "غريزمان", "Pogba", "بوغبا", "Klose", "كلوزه",
          "Canavaro", "كانافارو", "Petit", "بيتي", "Dessailly", "ديسايي",
          "Rivaldo", "ريفالدو", "Scolari", "سكولاري",
          "Etoo", "إيتو", "Muller", "مولر",
        ],
      },
      {
        id: 4, category: "أندية",
        question: "كم اسم نادٍ إيطالي تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "Juventus", "يوفنتوس", "AC Milan", "ميلان", "Inter Milan", "إنتر ميلان",
          "Napoli", "نابولي", "Roma", "روما", "Lazio", "لاتسيو",
          "Fiorentina", "فيورنتينا", "Atalanta", "أتالانتا", "Bologna", "بولونيا",
          "Torino", "تورينو", "Sampdoria", "سامبدوريا", "Genoa", "جنوى",
          "Verona", "فيرونا", "Udinese", "أودينيزي", "Sassuolo", "ساسولو",
          "Cagliari", "كالياري", "Parma", "بارما", "Lecce", "ليتشي",
          "Monza", "مونزا", "Empoli", "إمبولي",
        ],
      },
      {
        id: 5, category: "مدربين",
        question: "كم اسم مدرب درّب في الدوري الإنجليزي تقدر تذكر؟",
        maxAnswers: 25,
        acceptedAnswers: [
          "Ferguson", "فيرغسون", "Wenger", "فينغر", "Mourinho", "مورينيو",
          "Guardiola", "غوارديولا", "Klopp", "كلوب", "Ancelotti", "أنشيلوتي",
          "Conte", "كونتي", "Pochettino", "بوتشيتينو", "Arteta", "أرتيتا",
          "Tuchel", "توخيل", "Emery", "إيمري", "Benitez", "بينيتيز",
          "Ranieri", "رانييري", "Sarri", "ساري", "Lampard", "لامبارد",
          "Moyes", "مويز", "Rodgers", "رودجرز", "Slot", "سلوت",
          "Ten Hag", "تين هاغ", "Amorim", "أموريم",
          "Howe", "هاو", "Dyche", "دايتش",
        ],
      },
    ],
  },
  // Level 80
  {
    levelId: 80,
    questions: [
      {
        id: 1, category: "كأس عالم",
        question: "كم اسم لاعب خسر نهائي كأس العالم ولم يفز بها أبداً تقدر تذكر؟",
        maxAnswers: 25,
        acceptedAnswers: [
          "Messi 2014", "Higuain", "هيغواين", "Aguero", "أغويرو",
          "Mascherano", "ماسكيرانو", "Robben", "روبن", "Sneijder", "سنايدر",
          "Van Persie", "فان بيرسي", "Neymar", "نيمار",
          "Buffon", "بوفون", "Ballack", "بالاك", "Kahn", "كان",
          "Zico", "زيكو", "Cruyff", "كرويف",
          "Ronaldo 1998", "مالديني", "Maldini",
          "Puskas", "بوشكاش", "Klose", "كلوزه",
          "Neuer", "نوير", "Muller", "مولر",
          "Modric", "مودريتش", "Perisic", "بيريسيتش",
          "Suker", "شوكر", "Davor", "دافور",
        ],
      },
      {
        id: 2, category: "لاعبين",
        question: "كم اسم لاعب كولومبي لعب في أوروبا تقدر تذكر؟",
        maxAnswers: 15,
        acceptedAnswers: [
          "James Rodriguez", "خاميس", "Falcao", "فالكاو", "Cuadrado", "كوادرادو",
          "Valderrama", "فالديراما", "Asprilla", "أسبريلا", "Zapata", "زاباتا",
          "Muriel", "مورييل", "Mojica", "موخيكا", "Mina", "مينا",
          "Sanchez", "سانشيز", "Arias", "آرياس", "Ospina", "أوسبينا",
          "Diaz", "دياز", "Luis Diaz", "لويس دياز",
        ],
      },
      {
        id: 3, category: "لاعبين",
        question: "كم اسم لاعب سجل أكثر من 50 هدف دولي تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "Ronaldo", "رونالدو", "Messi", "ميسي", "Ali Daei", "علي دائي",
          "Sunil Chhetri", "شيتري", "Puskas", "بوشكاش", "Pele", "بيليه",
          "Neymar", "نيمار", "Lewandowski", "ليفاندوفسكي",
          "Suarez", "سواريز", "Ibrahimovic", "إبراهيموفيتش",
          "Klose", "كلوزه", "Muller", "مولر", "Rooney", "روني",
          "Robbie Keane", "روبي كين", "Villa", "فيا",
          "Henry", "هنري", "Modrić", "مودريتش",
        ],
      },
      {
        id: 4, category: "أندية",
        question: "كم اسم نادٍ ألماني تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "Bayern Munich", "بايرن ميونخ", "Borussia Dortmund", "دورتموند",
          "Leverkusen", "ليفركوزن", "Leipzig", "لايبزيغ", "Wolfsburg", "فولفسبورغ",
          "Schalke", "شالكه", "Frankfurt", "فرانكفورت", "Gladbach", "غلادباخ",
          "Stuttgart", "شتوتغارت", "Freiburg", "فرايبورغ",
          "Hoffenheim", "هوفنهايم", "Mainz", "ماينز", "Augsburg", "أوغسبورغ",
          "Hertha Berlin", "هيرتا برلين", "Union Berlin", "يونيون برلين",
          "Koln", "كولن", "Bremen", "بريمن", "Hamburg", "هامبورغ",
        ],
      },
      {
        id: 5, category: "بطولات",
        question: "كم اسم لاعب فاز بكأس العالم ودوري الأبطال تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "Zidane", "زيدان", "Roberto Carlos", "روبرتو كارلوس", "Cafu", "كافو",
          "Ronaldo", "رونالدو", "Rivaldo", "ريفالدو",
          "Desailly", "ديسايي", "Petit", "بيتي", "Henry", "هنري",
          "Seedorf", "سيدورف", "Kaka", "كاكا",
          "Iniesta", "إنييستا", "Xavi", "تشافي", "Puyol", "بويول",
          "Ramos", "راموس", "Casemiro", "كاسيميرو",
          "Varane", "فاران", "Pogba", "بوغبا",
          "Beckenbauer", "بيكنباور", "Pele", "بيليه",
        ],
      },
    ],
  },
  // Level 81
  {
    levelId: 81,
    questions: [
      {
        id: 1, category: "بلجيكا",
        question: "كم اسم لاعب بلجيكي لعب في كأس العالم أو اليورو تقدر تذكر؟",
        maxAnswers: 25,
        acceptedAnswers: [
          "Hazard", "هازارد", "De Bruyne", "دي بروين", "Lukaku", "لوكاكو",
          "Courtois", "كورتوا", "Kompany", "كومباني", "Vertonghen", "فيرتونغن",
          "Alderweireld", "ألدرويرلد", "Mertens", "ميرتنز",
          "Witsel", "فيتسل", "Carrasco", "كاراسكو", "Chadli", "شادلي",
          "Fellaini", "فيلايني", "Nainggolan", "ناينغولان",
          "Tielemans", "تيليمانز", "Doku", "دوكو", "Openda", "أوبيندا",
          "Onana", "أونانا", "Mignolet", "مينيوليه",
          "Benteke", "بينتيكي", "Batshuayi", "باتشواي",
          "Origi", "أوريغي", "Dendoncker", "ديندونكر",
          "Casteels", "كاستيلز", "Theate", "تياتي",
        ],
      },
      {
        id: 2, category: "لاعبين",
        question: "كم اسم لاعب لعب لمانشستر سيتي وتشيلسي تقدر تذكر؟",
        maxAnswers: 15,
        acceptedAnswers: [
          "Lampard", "لامبارد", "Cole", "كول", "Bridge", "بريدج",
          "Robinho", "روبينيو", "Shaun Wright-Phillips", "رايت فيليبس",
          "Sterling", "ستيرلينغ", "Palmer", "بالمر",
          "Gallagher", "غالاغر", "Ake", "أكي",
          "Tevez", "تيفيز", "Anelka", "أنيلكا", "Sinclair", "سنكلير",
        ],
      },
      {
        id: 3, category: "هدافين",
        question: "كم اسم هداف تاريخي للدوري الإنجليزي تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "Shearer", "شيرر", "Rooney", "روني", "Lampard", "لامبارد",
          "Henry", "هنري", "Aguero", "أغويرو", "Kane", "كين",
          "Salah", "صلاح", "Vardy", "فاردي", "Defoe", "ديفو",
          "Owen", "أوين", "Drogba", "دروغبا", "Fowler", "فاولر",
          "Cole", "كول", "Hasselbaink", "هاسيلبينك",
          "Van Persie", "فان بيرسي", "Lukaku", "لوكاكو",
          "Adebayor", "أديبايور", "Berbatov", "بيرباتوف",
          "Son", "سون", "Sterling", "ستيرلينغ",
        ],
      },
      {
        id: 4, category: "لاعبين",
        question: "كم اسم لاعب ياباني لعب في أوروبا تقدر تذكر؟",
        maxAnswers: 15,
        acceptedAnswers: [
          "Nakata", "ناكاتا", "Kagawa", "كاغاوا", "Honda", "هوندا",
          "Minamino", "مينامينو", "Kubo", "كوبو", "Kamada", "كامادا",
          "Mitoma", "ميتوما", "Endo", "إندو", "Tomiyasu", "توميياسو",
          "Doan", "دوان", "Ito", "إيتو", "Hasebe", "هاسيبي",
          "Okazaki", "أوكازاكي", "Inui", "إينوي",
        ],
      },
      {
        id: 5, category: "بطولات",
        question: "كم اسم نادٍ فاز بكأس الاتحاد الأوروبي / الدوري الأوروبي تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "Sevilla", "إشبيلية", "Atletico Madrid", "أتلتيكو مدريد",
          "Chelsea", "تشيلسي", "Manchester United", "مانشستر يونايتد",
          "Porto", "بورتو", "Liverpool", "ليفربول", "Inter Milan", "إنتر ميلان",
          "Villarreal", "فياريال", "Frankfurt", "فرانكفورت",
          "Atalanta", "أتالانتا", "Galatasaray", "غلطة سراي",
          "Feyenoord", "فاينورد", "Valencia", "فالنسيا",
          "Parma", "بارما", "Zenit", "زينيت", "CSKA Moscow", "سيسكا موسكو",
          "Shakhtar", "شاختار", "Benfica", "بنفيكا",
        ],
      },
    ],
  },
  // Level 82
  {
    levelId: 82,
    questions: [
      {
        id: 1, category: "دوري إنجليزي",
        question: "كم اسم لاعب حقق وصافة الدوري الإنجليزي منذ 2010 تقدر تذكر؟",
        maxAnswers: 30,
        acceptedAnswers: [
          // Man Utd 2011, 2012
          "Rooney", "روني", "Giggs", "غيغز", "Vidic", "فيديتش",
          "Ferdinand", "فيرديناند", "Chicharito", "تشيتشاريتو",
          // Liverpool 2014, 2019, 2022
          "Gerrard", "جيرارد", "Suarez", "سواريز", "Sterling", "ستيرلينغ",
          "Salah", "صلاح", "Mane", "ماني", "Van Dijk", "فان دايك",
          "Firmino", "فيرمينو", "Alexander-Arnold", "أرنولد",
          // Man City various
          "Aguero", "أغويرو", "Silva", "سيلفا", "Kompany", "كومباني",
          "De Bruyne", "دي بروين", "Haaland", "هالاند", "Foden", "فودن",
          // Arsenal 2023
          "Saka", "ساكا", "Odegaard", "أوديغارد", "Rice", "رايس",
          // Tottenham 2017
          "Kane", "كين", "Alli", "ديلي ألي", "Son", "سون",
          "Eriksen", "إيريكسن",
        ],
      },
      {
        id: 2, category: "لاعبين",
        question: "كم اسم لاعب كرواتي لعب في أوروبا تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "Modric", "مودريتش", "Rakitic", "راكيتيتش", "Mandzukic", "ماندزوكيتش",
          "Kovacic", "كوفاسيتش", "Perisic", "بيريسيتش", "Brozovic", "بروزوفيتش",
          "Lovren", "لوفرين", "Suker", "شوكر", "Boban", "بوبان",
          "Kramaric", "كراماريتش", "Vlasic", "فلاسيتش", "Rebic", "ريبيتش",
          "Orsic", "أورسيتش", "Pasalic", "باساليتش", "Vida", "فيدا",
          "Srna", "سرنا", "Caleta-Car", "كاليتا كار",
          "Gvardiol", "غفارديول", "Sosa", "سوسا",
        ],
      },
      {
        id: 3, category: "أندية",
        question: "كم اسم نادٍ فرنسي تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "PSG", "باريس سان جيرمان", "Marseille", "مارسيليا", "Lyon", "ليون",
          "Monaco", "موناكو", "Lille", "ليل", "Nice", "نيس",
          "Rennes", "رين", "Lens", "لانس", "Strasbourg", "ستراسبورغ",
          "Nantes", "نانت", "Montpellier", "مونبلييه", "Bordeaux", "بوردو",
          "Toulouse", "تولوز", "Saint-Etienne", "سانت إتيان",
          "Brest", "بريست", "Reims", "ريمس", "Auxerre", "أوكسير",
          "Lorient", "لوريان", "Angers", "أنجيه",
        ],
      },
      {
        id: 4, category: "لاعبين",
        question: "كم اسم لاعب برتغالي لعب في أوروبا تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "Ronaldo", "رونالدو", "Figo", "فيغو", "Rui Costa", "روي كوستا",
          "Deco", "ديكو", "Nani", "ناني", "Pepe", "بيبي",
          "Bernardo Silva", "بيرناردو سيلفا", "Bruno Fernandes", "برونو فيرنانديز",
          "Joao Felix", "جواو فيليكس", "Cancelo", "كانسيلو",
          "Diogo Jota", "ديوغو جوتا", "Dias", "دياز",
          "Carvalho", "كارفاليو", "Moutinho", "موتينيو",
          "Quaresma", "كوارزما", "Simao", "سيماو",
          "Coentrao", "كوينتراو", "Eusebio", "يوسيبيو",
        ],
      },
      {
        id: 5, category: "حراس",
        question: "كم اسم حارس إسباني تقدر تذكر؟",
        maxAnswers: 15,
        acceptedAnswers: [
          "Casillas", "كاسياس", "De Gea", "دي خيا", "Reina", "رينا",
          "Valdes", "فالديز", "Simon", "سيمون", "Arrizabalaga", "أريزابالاغا",
          "Raya", "رايا", "Sanchez", "سانشيز", "Rico", "ريكو",
          "Lopez", "لوبيز", "Alvarez", "ألفاريز",
          "Bravo", "برافو", "Asenjo", "أسينخو",
        ],
      },
    ],
  },
  // Level 83
  {
    levelId: 83,
    questions: [
      {
        id: 1, category: "كلاسيكو",
        question: "كم اسم لاعب شارك في الكلاسيكو منذ 2010 حتى 2026 تقدر تذكر؟",
        maxAnswers: 40,
        acceptedAnswers: [
          // Real Madrid
          "Ronaldo", "رونالدو", "Ramos", "راموس", "Benzema", "بنزيما",
          "Modric", "مودريتش", "Kroos", "كروس", "Bale", "بيل",
          "Marcelo", "مارسيلو", "Carvajal", "كارفاخال", "Casemiro", "كاسيميرو",
          "Varane", "فاران", "Courtois", "كورتوا", "Vinicius", "فينيسيوس",
          "Bellingham", "بيلينغهام", "Mbappe", "مبابي", "Rodrygo", "رودريغو",
          "Isco", "إيسكو", "Navas", "نافاس", "Pepe", "بيبي",
          "Di Maria", "دي ماريا", "Ozil", "أوزيل", "Higuain", "هيغواين",
          // Barcelona
          "Messi", "ميسي", "Neymar", "نيمار", "Suarez", "سواريز",
          "Xavi", "تشافي", "Iniesta", "إنييستا", "Busquets", "بوسكيتس",
          "Pique", "بيكيه", "Alba", "ألبا", "Ter Stegen", "تير شتيغن",
          "Dembele", "ديمبيلي", "Pedri", "بيدري", "Gavi", "غافي",
          "Lewandowski", "ليفاندوفسكي", "Raphinha", "رافينيا",
          "Yamal", "يامال", "Araujo", "أراوخو", "Kounde", "كوندي",
          "Griezmann", "غريزمان", "Coutinho", "كوتينيو",
          "Dani Alves", "داني ألفيش", "Villa", "فيا",
        ],
      },
      {
        id: 2, category: "لاعبين",
        question: "كم اسم لاعب هولندي مشهور تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "Cruyff", "كرويف", "Van Basten", "فان باستن", "Gullit", "خوليت",
          "Bergkamp", "بيركامب", "Robben", "روبن", "Sneijder", "سنايدر",
          "Van Persie", "فان بيرسي", "De Jong", "دي يونغ", "De Ligt", "دي ليخت",
          "Depay", "ديباي", "Van Dijk", "فان دايك", "Koeman", "كومان",
          "Seedorf", "سيدورف", "Davids", "دافيدز", "Kluivert", "كلايفرت",
          "Rijkaard", "ريكارد", "Van der Sar", "فان دير سار",
          "Overmars", "أوفرمارس", "Gakpo", "غاكبو",
        ],
      },
      {
        id: 3, category: "بطولات",
        question: "كم اسم نادٍ فاز بدوري أبطال أوروبا أكثر من مرة تقدر تذكر؟",
        maxAnswers: 15,
        acceptedAnswers: [
          "Real Madrid", "ريال مدريد", "AC Milan", "ميلان",
          "Bayern Munich", "بايرن ميونخ", "Liverpool", "ليفربول",
          "Barcelona", "برشلونة", "Ajax", "أياكس",
          "Inter Milan", "إنتر ميلان", "Manchester United", "مانشستر يونايتد",
          "Juventus", "يوفنتوس", "Benfica", "بنفيكا",
          "Nottingham Forest", "نوتنغهام فورست", "Porto", "بورتو",
          "Chelsea", "تشيلسي",
        ],
      },
      {
        id: 4, category: "مدربين",
        question: "كم اسم مدرب إسباني مشهور تقدر تذكر؟",
        maxAnswers: 15,
        acceptedAnswers: [
          "Guardiola", "غوارديولا", "Luis Enrique", "لويس إنريكي",
          "Del Bosque", "ديل بوسكي", "Benitez", "بينيتيز",
          "Emery", "إيمري", "Lopetegui", "لوبيتيغي",
          "Valverde", "فالفيردي", "Setien", "سيتين",
          "Luis Aragones", "لويس أراغونيس", "Camacho", "كاماتشو",
          "Arteta", "أرتيتا", "Michel", "ميتشيل",
          "Marcelino", "مارسيلينو", "Bordalas", "بوردالاس",
        ],
      },
      {
        id: 5, category: "لاعبين",
        question: "كم اسم لاعب صربي لعب في أوروبا تقدر تذكر؟",
        maxAnswers: 15,
        acceptedAnswers: [
          "Vidic", "فيديتش", "Ivanovic", "إيفانوفيتش", "Matic", "ماتيتش",
          "Tadic", "تاديتش", "Vlahovic", "فلاهوفيتش", "Jovic", "يوفيتش",
          "Milinkovic-Savic", "ميلينكوفيتش", "Kostic", "كوستيتش",
          "Mitrovic", "ميتروفيتش", "Stankovic", "ستانكوفيتش",
          "Vidic", "فيديتش", "Gudelj", "غوديلي",
          "Pavlovic", "بافلوفيتش", "Zivkovic", "جيفكوفيتش",
        ],
      },
    ],
  },
  // Level 84
  {
    levelId: 84,
    questions: [
      {
        id: 1, category: "انتقالات",
        question: "كم اسم لاعب انتقل بأكثر من 80 مليون يورو تقدر تذكر؟",
        maxAnswers: 25,
        acceptedAnswers: [
          "Neymar", "نيمار", "Mbappe", "مبابي", "Coutinho", "كوتينيو",
          "Dembele", "ديمبيلي", "Griezmann", "غريزمان",
          "Ronaldo", "رونالدو", "Bale", "بيل", "Hazard", "هازارد",
          "Felix", "فيليكس", "Lukaku", "لوكاكو", "Pogba", "بوغبا",
          "Frenkie de Jong", "دي يونغ", "Haaland", "هالاند",
          "Tchouameni", "تشواميني", "Bellingham", "بيلينغهام",
          "Rice", "رايس", "Moises Caicedo", "كايسيدو",
          "Antony", "أنتوني", "Sancho", "سانشو",
          "Jack Grealish", "غريليش", "Romelu Lukaku", "لوكاكو",
          "Van Dijk", "فان دايك", "Allison", "أليسون",
        ],
      },
      {
        id: 2, category: "لاعبين",
        question: "كم اسم لاعب عربي لعب في أوروبا تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "Salah", "صلاح", "Hakimi", "حكيمي", "Ziyech", "زياش",
          "Mahrez", "محرز", "Bennacer", "بناصر", "Amrabat", "أمرابط",
          "Benatia", "بناطيا", "Feghouli", "فغولي", "Slimani", "سليماني",
          "Brahimi", "إبراهيمي", "Mido", "ميدو", "Aboutrika", "أبو تريكة",
          "Elneny", "النني", "Trezeguet", "تريزيغه", "Marwan Mohsen", "مروان محسن",
          "Mazraoui", "مزراوي", "Ounahi", "أوناحي", "Aguerd", "أغيرد",
          "Bono", "بونو",
        ],
      },
      {
        id: 3, category: "مدربين",
        question: "كم اسم مدرب إيطالي مشهور تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "Ancelotti", "أنشيلوتي", "Conte", "كونتي", "Allegri", "أليغري",
          "Lippi", "ليبي", "Capello", "كابيلو", "Sacchi", "ساكي",
          "Trapattoni", "تراباتوني", "Mancini", "مانشيني",
          "Spalletti", "سباليتي", "Inzaghi", "إنزاغي",
          "Sarri", "ساري", "Ranieri", "رانييري",
          "De Rossi", "دي روسي", "Gattuso", "غاتوزو",
          "Pirlo", "بيرلو", "Baroni", "باروني",
        ],
      },
      {
        id: 4, category: "لاعبين",
        question: "كم اسم لاعب لعب أكثر من 100 مباراة دولية تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "Ronaldo", "رونالدو", "Messi", "ميسي", "Ramos", "راموس",
          "Busquets", "بوسكيتس", "Modric", "مودريتش", "Buffon", "بوفون",
          "Casillas", "كاسياس", "Xavi", "تشافي", "Iniesta", "إنييستا",
          "Neuer", "نوير", "Muller", "مولر", "Kroos", "كروس",
          "Chiellini", "كيليني", "Bonucci", "بونوتشي",
          "Rooney", "روني", "Kane", "كين",
          "Lewandowski", "ليفاندوفسكي", "Neymar", "نيمار",
          "Salah", "صلاح", "Suarez", "سواريز",
        ],
      },
      {
        id: 5, category: "أندية",
        question: "كم اسم نادٍ تركي تقدر تذكر؟",
        maxAnswers: 15,
        acceptedAnswers: [
          "Galatasaray", "غلطة سراي", "Fenerbahce", "فنربخشه",
          "Besiktas", "بشكتاش", "Trabzonspor", "طرابزون سبور",
          "Basaksehir", "باشاك شهير", "Antalyaspor", "أنطاليا سبور",
          "Sivasspor", "سيفاس سبور", "Konyaspor", "كونيا سبور",
          "Kasimpasa", "قاسم باشا", "Rizespor", "ريزه سبور",
          "Adana Demirspor", "أضنة دمير سبور",
        ],
      },
    ],
  },
  // Level 85
  {
    levelId: 85,
    questions: [
      {
        id: 1, category: "أساطير",
        question: "كم اسم لاعب فاز بالكرة الذهبية عبر التاريخ تقدر تذكر؟",
        maxAnswers: 25,
        acceptedAnswers: [
          "Messi", "ميسي", "Ronaldo", "رونالدو", "Modric", "مودريتش",
          "Benzema", "بنزيما", "Ronaldinho", "رونالدينيو", "Kaka", "كاكا",
          "Zidane", "زيدان", "Figo", "فيغو", "Owen", "أوين",
          "Rivaldo", "ريفالدو", "R9", "Nedved", "نيدفيد",
          "Shevchenko", "شيفتشينكو", "Cannavaro", "كانافارو",
          "Platini", "بلاتيني", "Van Basten", "فان باستن",
          "Cruyff", "كرويف", "Beckenbauer", "بيكنباور",
          "Eusebio", "يوسيبيو", "Best", "بيست",
          "Matthaus", "ماتيوس", "Stoichkov", "ستويتشكوف",
          "Rodri", "رودري",
        ],
      },
      {
        id: 2, category: "لاعبين",
        question: "كم اسم لاعب فاز بالدوري 5 مرات أو أكثر تقدر تذكر؟",
        maxAnswers: 20,
        acceptedAnswers: [
          "Messi", "ميسي", "Xavi", "تشافي", "Iniesta", "إنييستا",
          "Busquets", "بوسكيتس", "Pique", "بيكيه", "Ramos", "راموس",
          "Marcelo", "مارسيلو", "Benzema", "بنزيما", "Modric", "مودريتش",
          "Kroos", "كروس", "Carvajal", "كارفاخال", "Casemiro", "كاسيميرو",
          "Muller", "مولر", "Neuer", "نوير", "Kimmich", "كيميتش",
          "Lewandowski", "ليفاندوفسكي", "Alaba", "ألابا",
          "Ryan Giggs", "غيغز", "Scholes", "سكولز",
        ],
      },
      {
        id: 3, category: "منتخبات",
        question: "كم اسم منتخب فاز بكأس العالم تقدر تذكر؟",
        maxAnswers: 8,
        acceptedAnswers: [
          "Brazil", "البرازيل", "Germany", "ألمانيا", "Italy", "إيطاليا",
          "Argentina", "الأرجنتين", "France", "فرنسا", "Uruguay", "أوروغواي",
          "England", "إنجلترا", "Spain", "إسبانيا",
        ],
      },
      {
        id: 4, category: "لاعبين",
        question: "كم اسم لاعب مكسيكي لعب في أوروبا تقدر تذكر؟",
        maxAnswers: 15,
        acceptedAnswers: [
          "Chicharito", "تشيتشاريتو", "Hugo Sanchez", "هوغو سانشيز",
          "Lozano", "لوزانو", "Jimenez", "خيمينيز",
          "Guardado", "غواردادو", "Herrera", "هيريرا",
          "Vela", "فيلا", "Dos Santos", "دوس سانتوس",
          "Moreno", "مورينو", "Corona", "كورونا",
          "Alvarez", "ألفاريز", "Ochoa", "أوتشوا",
          "Marquez", "ماركيز",
        ],
      },
      {
        id: 5, category: "بطولات",
        question: "كم اسم نادٍ فاز بالدوري الإنجليزي تقدر تذكر؟",
        maxAnswers: 15,
        acceptedAnswers: [
          "Manchester United", "مانشستر يونايتد", "Liverpool", "ليفربول",
          "Arsenal", "آرسنال", "Chelsea", "تشيلسي", "Manchester City", "مانشستر سيتي",
          "Everton", "إيفرتون", "Tottenham", "توتنهام",
          "Leeds", "ليدز", "Aston Villa", "أستون فيلا",
          "Leicester", "ليستر", "Blackburn", "بلاكبيرن",
          "Nottingham Forest", "نوتنغهام فورست", "Derby", "ديربي",
          "Sheffield Wednesday", "شيفيلد وينزداي", "Sunderland", "سندرلاند",
        ],
      },
    ],
  },
];

export function getAuctionLevel(levelId: number): AuctionLevel | undefined {
  return AUCTION_LEVELS.find(l => l.levelId === levelId);
}
