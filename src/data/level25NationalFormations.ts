// المستوى 25 - خمن المنتخب من التشكيلة (شعارات الأندية بدل الأسماء)

export interface FormationPlayer {
  position: string; // GK, CB, LB, RB, CM, CDM, CAM, LW, RW, ST, CF
  clubLogo: string;
  row: number; // 0=GK, 1=DEF, 2=MID, 3=ATK
  col: number; // position in row (0-based)
}

export interface NationalFormationQuestion {
  id: number;
  teamName: string;
  teamFlag: string;
  formation: string; // e.g. "4-3-3"
  players: FormationPlayer[];
  options: string[];
  correctIndex: number;
}

// Club logos from football-data.org and api-sports
const LOGOS = {
  real_madrid: "https://crests.football-data.org/86.png",
  barcelona: "https://crests.football-data.org/81.png",
  man_city: "https://crests.football-data.org/65.png",
  man_united: "https://crests.football-data.org/66.png",
  liverpool: "https://crests.football-data.org/64.png",
  chelsea: "https://crests.football-data.org/61.png",
  arsenal: "https://crests.football-data.org/57.png",
  bayern: "https://crests.football-data.org/5.png",
  psg: "https://crests.football-data.org/524.png",
  juventus: "https://crests.football-data.org/109.png",
  ac_milan: "https://crests.football-data.org/98.png",
  inter: "https://crests.football-data.org/108.png",
  atletico: "https://crests.football-data.org/78.png",
  dortmund: "https://crests.football-data.org/4.png",
  tottenham: "https://crests.football-data.org/73.png",
  napoli: "https://crests.football-data.org/113.png",
  roma: "https://crests.football-data.org/100.png",
  al_nassr: "https://media.api-sports.io/football/teams/2939.png",
  al_hilal: "https://media.api-sports.io/football/teams/2932.png",
  aston_villa: "https://crests.football-data.org/58.png",
  leverkusen: "https://crests.football-data.org/3.png",
  athletic_bilbao: "https://crests.football-data.org/77.png",
  villarreal: "https://crests.football-data.org/94.png",
  benfica: "https://crests.football-data.org/1903.png",
  sporting: "https://crests.football-data.org/498.png",
  ajax: "https://crests.football-data.org/678.png",
  galatasaray: "https://crests.football-data.org/610.png",
  fenerbahce: "https://crests.football-data.org/612.png",
  brighton: "https://crests.football-data.org/397.png",
  newcastle: "https://crests.football-data.org/67.png",
  west_ham: "https://crests.football-data.org/563.png",
};

export const nationalFormationQuestions: NationalFormationQuestion[] = [
  {
    // فرنسا 4-3-3: ميانيان(ميلان) - كوندي(برشلونة) أوبامكانو(بايرن) سالبي(يوفنتوس) تيو(بايرن) - تشواميني(ريال) كانتي(الهلال) رابيو(يوفنتوس) - ديمبيلي(PSG) مبابي(ريال) غريزمان(أتليتكو)
    id: 1,
    teamName: "فرنسا",
    teamFlag: "🇫🇷",
    formation: "4-3-3",
    players: [
      { position: "GK", clubLogo: LOGOS.ac_milan, row: 0, col: 0 },
      { position: "RB", clubLogo: LOGOS.barcelona, row: 1, col: 0 },
      { position: "CB", clubLogo: LOGOS.bayern, row: 1, col: 1 },
      { position: "CB", clubLogo: LOGOS.juventus, row: 1, col: 2 },
      { position: "LB", clubLogo: LOGOS.bayern, row: 1, col: 3 },
      { position: "CM", clubLogo: LOGOS.real_madrid, row: 2, col: 0 },
      { position: "CM", clubLogo: LOGOS.al_hilal, row: 2, col: 1 },
      { position: "CM", clubLogo: LOGOS.juventus, row: 2, col: 2 },
      { position: "RW", clubLogo: LOGOS.psg, row: 3, col: 0 },
      { position: "ST", clubLogo: LOGOS.real_madrid, row: 3, col: 1 },
      { position: "LW", clubLogo: LOGOS.atletico, row: 3, col: 2 },
    ],
    options: ["فرنسا", "بلجيكا", "ألمانيا", "هولندا"],
    correctIndex: 0,
  },
  {
    // إسبانيا 4-3-3: أوناي سيمون(بيلباو) - كارفاخال(ريال) لابورت(الهلال) لو نورمان(أتليتكو) كوكوريا(تشيلسي) - بيدري(برشلونة) رودري(سيتي) أولمو(برشلونة) - يامال(برشلونة) موراتا(ميلان) ويليامز(بيلباو)
    id: 2,
    teamName: "إسبانيا",
    teamFlag: "🇪🇸",
    formation: "4-3-3",
    players: [
      { position: "GK", clubLogo: LOGOS.athletic_bilbao, row: 0, col: 0 },
      { position: "RB", clubLogo: LOGOS.real_madrid, row: 1, col: 0 },
      { position: "CB", clubLogo: LOGOS.al_hilal, row: 1, col: 1 },
      { position: "CB", clubLogo: LOGOS.atletico, row: 1, col: 2 },
      { position: "LB", clubLogo: LOGOS.chelsea, row: 1, col: 3 },
      { position: "CM", clubLogo: LOGOS.barcelona, row: 2, col: 0 },
      { position: "CM", clubLogo: LOGOS.man_city, row: 2, col: 1 },
      { position: "CM", clubLogo: LOGOS.barcelona, row: 2, col: 2 },
      { position: "RW", clubLogo: LOGOS.barcelona, row: 3, col: 0 },
      { position: "ST", clubLogo: LOGOS.ac_milan, row: 3, col: 1 },
      { position: "LW", clubLogo: LOGOS.athletic_bilbao, row: 3, col: 2 },
    ],
    options: ["البرتغال", "إسبانيا", "إيطاليا", "فرنسا"],
    correctIndex: 1,
  },
  {
    // إنجلترا 4-2-3-1: بيكفورد(إيفرتون→نستخدم brighton كبديل) - ووكر(سيتي) ستونز(سيتي) غوهي(كريستال→ نستخدم chelsea) شو(يونايتد) - رايس(أرسنال) بيلينغهام(ريال) - ساكا(أرسنال) فودن(سيتي) بالمر(تشيلسي) - كين(بايرن)
    id: 3,
    teamName: "إنجلترا",
    teamFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    formation: "4-2-3-1",
    players: [
      { position: "GK", clubLogo: LOGOS.man_united, row: 0, col: 0 },
      { position: "RB", clubLogo: LOGOS.man_city, row: 1, col: 0 },
      { position: "CB", clubLogo: LOGOS.man_city, row: 1, col: 1 },
      { position: "CB", clubLogo: LOGOS.chelsea, row: 1, col: 2 },
      { position: "LB", clubLogo: LOGOS.man_united, row: 1, col: 3 },
      { position: "CDM", clubLogo: LOGOS.arsenal, row: 2, col: 0 },
      { position: "CDM", clubLogo: LOGOS.real_madrid, row: 2, col: 1 },
      { position: "RW", clubLogo: LOGOS.arsenal, row: 2, col: 2 },
      { position: "CAM", clubLogo: LOGOS.man_city, row: 3, col: 0 },
      { position: "LW", clubLogo: LOGOS.chelsea, row: 3, col: 1 },
      { position: "ST", clubLogo: LOGOS.bayern, row: 3, col: 2 },
    ],
    options: ["ألمانيا", "هولندا", "إنجلترا", "فرنسا"],
    correctIndex: 2,
  },
  {
    // البرازيل 4-2-3-1: أليسون(ليفربول) - ميليتاو(ريال) ماركينيوس(PSG) ماغالايس(أرسنال) - ألفيس→ دانيلو(يوفنتوس) - كاسيميرو(يونايتد) باكيتا(وست هام) - رافينيا(برشلونة) - فينيسيوس(ريال) رودريغو(ريال) إندريك(ريال)
    id: 4,
    teamName: "البرازيل",
    teamFlag: "🇧🇷",
    formation: "4-3-3",
    players: [
      { position: "GK", clubLogo: LOGOS.liverpool, row: 0, col: 0 },
      { position: "RB", clubLogo: LOGOS.real_madrid, row: 1, col: 0 },
      { position: "CB", clubLogo: LOGOS.psg, row: 1, col: 1 },
      { position: "CB", clubLogo: LOGOS.arsenal, row: 1, col: 2 },
      { position: "LB", clubLogo: LOGOS.juventus, row: 1, col: 3 },
      { position: "CDM", clubLogo: LOGOS.man_united, row: 2, col: 0 },
      { position: "CM", clubLogo: LOGOS.west_ham, row: 2, col: 1 },
      { position: "CM", clubLogo: LOGOS.barcelona, row: 2, col: 2 },
      { position: "RW", clubLogo: LOGOS.real_madrid, row: 3, col: 0 },
      { position: "ST", clubLogo: LOGOS.real_madrid, row: 3, col: 1 },
      { position: "LW", clubLogo: LOGOS.real_madrid, row: 3, col: 2 },
    ],
    options: ["الأرجنتين", "كولومبيا", "أوروغواي", "البرازيل"],
    correctIndex: 3,
  },
  {
    // الأرجنتين 4-3-3: إ.مارتينيز(أستون فيلا) - مولينا(أتليتكو) روميرو(توتنهام) ليساندرو(يونايتد) تاغليافيكو(ليون→أتليتكو) - دي بول(أتليتكو) إنزو(تشيلسي) ماك أليستر(ليفربول) - ميسي(إنتر ميامي) ألفاريز(أتليتكو) دي ماريا(بنفيكا)
    id: 5,
    teamName: "الأرجنتين",
    teamFlag: "🇦🇷",
    formation: "4-3-3",
    players: [
      { position: "GK", clubLogo: LOGOS.aston_villa, row: 0, col: 0 },
      { position: "RB", clubLogo: LOGOS.atletico, row: 1, col: 0 },
      { position: "CB", clubLogo: LOGOS.tottenham, row: 1, col: 1 },
      { position: "CB", clubLogo: LOGOS.man_united, row: 1, col: 2 },
      { position: "LB", clubLogo: LOGOS.atletico, row: 1, col: 3 },
      { position: "CM", clubLogo: LOGOS.atletico, row: 2, col: 0 },
      { position: "CM", clubLogo: LOGOS.chelsea, row: 2, col: 1 },
      { position: "CM", clubLogo: LOGOS.liverpool, row: 2, col: 2 },
      { position: "RW", clubLogo: LOGOS.inter, row: 3, col: 0 },
      { position: "ST", clubLogo: LOGOS.atletico, row: 3, col: 1 },
      { position: "LW", clubLogo: LOGOS.benfica, row: 3, col: 2 },
    ],
    options: ["الأرجنتين", "البرازيل", "أوروغواي", "كولومبيا"],
    correctIndex: 0,
  },
  {
    // ألمانيا 4-2-3-1: نوير(بايرن) - كيميش(بايرن) تاه(ليفركوزن) ريديغر(ريال) راوم(بايرن→لايبزيغ نستخدم بايرن) - كروس(ريال) أندريش(ليفركوزن) - موسيالا(بايرن) غوندوغان(برشلونة) ساني(بايرن) - هافيرتز(أرسنال)
    id: 6,
    teamName: "ألمانيا",
    teamFlag: "🇩🇪",
    formation: "4-2-3-1",
    players: [
      { position: "GK", clubLogo: LOGOS.bayern, row: 0, col: 0 },
      { position: "RB", clubLogo: LOGOS.bayern, row: 1, col: 0 },
      { position: "CB", clubLogo: LOGOS.leverkusen, row: 1, col: 1 },
      { position: "CB", clubLogo: LOGOS.real_madrid, row: 1, col: 2 },
      { position: "LB", clubLogo: LOGOS.bayern, row: 1, col: 3 },
      { position: "CDM", clubLogo: LOGOS.real_madrid, row: 2, col: 0 },
      { position: "CDM", clubLogo: LOGOS.leverkusen, row: 2, col: 1 },
      { position: "RW", clubLogo: LOGOS.bayern, row: 2, col: 2 },
      { position: "CAM", clubLogo: LOGOS.barcelona, row: 3, col: 0 },
      { position: "LW", clubLogo: LOGOS.bayern, row: 3, col: 1 },
      { position: "ST", clubLogo: LOGOS.arsenal, row: 3, col: 2 },
    ],
    options: ["هولندا", "ألمانيا", "النمسا", "سويسرا"],
    correctIndex: 1,
  },
  {
    // البرتغال 4-3-3: كوستا(بورتو→نستخدم sporting) - كانسيلو(برشلونة) دياس(سيتي) بيبي(بورتو→نستخدم villarreal) نونو(يونايتد→نستخدم man_united) - برونو(يونايتد) فيتينيا(PSG) بالينيا(برشلونة) - ب.سيلفا(سيتي) رونالدو(النصر) ليو(ليفربول→نستخدم liverpool)
    id: 7,
    teamName: "البرتغال",
    teamFlag: "🇵🇹",
    formation: "4-3-3",
    players: [
      { position: "GK", clubLogo: LOGOS.sporting, row: 0, col: 0 },
      { position: "RB", clubLogo: LOGOS.barcelona, row: 1, col: 0 },
      { position: "CB", clubLogo: LOGOS.man_city, row: 1, col: 1 },
      { position: "CB", clubLogo: LOGOS.villarreal, row: 1, col: 2 },
      { position: "LB", clubLogo: LOGOS.man_united, row: 1, col: 3 },
      { position: "CM", clubLogo: LOGOS.man_united, row: 2, col: 0 },
      { position: "CM", clubLogo: LOGOS.psg, row: 2, col: 1 },
      { position: "CM", clubLogo: LOGOS.barcelona, row: 2, col: 2 },
      { position: "RW", clubLogo: LOGOS.man_city, row: 3, col: 0 },
      { position: "ST", clubLogo: LOGOS.al_nassr, row: 3, col: 1 },
      { position: "LW", clubLogo: LOGOS.liverpool, row: 3, col: 2 },
    ],
    options: ["إسبانيا", "البرازيل", "البرتغال", "فرنسا"],
    correctIndex: 2,
  },
  {
    // إيطاليا 4-3-3: دوناروما(PSG) - دي لورينزو(نابولي) باستوني(إنتر) بونوتشي→كالافيوري(أرسنال) ديمارزيو→دارميان(إنتر) - باريلا(إنتر) جورجينيو(أرسنال) لوكاتيلي(يوفنتوس) - كييزا(ليفربول) ريتيغي(يوفنتوس) بيلاتي→ديماركو(نابولي)
    id: 8,
    teamName: "إيطاليا",
    teamFlag: "🇮🇹",
    formation: "4-3-3",
    players: [
      { position: "GK", clubLogo: LOGOS.psg, row: 0, col: 0 },
      { position: "RB", clubLogo: LOGOS.napoli, row: 1, col: 0 },
      { position: "CB", clubLogo: LOGOS.inter, row: 1, col: 1 },
      { position: "CB", clubLogo: LOGOS.arsenal, row: 1, col: 2 },
      { position: "LB", clubLogo: LOGOS.inter, row: 1, col: 3 },
      { position: "CM", clubLogo: LOGOS.inter, row: 2, col: 0 },
      { position: "CM", clubLogo: LOGOS.arsenal, row: 2, col: 1 },
      { position: "CM", clubLogo: LOGOS.juventus, row: 2, col: 2 },
      { position: "RW", clubLogo: LOGOS.liverpool, row: 3, col: 0 },
      { position: "ST", clubLogo: LOGOS.juventus, row: 3, col: 1 },
      { position: "LW", clubLogo: LOGOS.napoli, row: 3, col: 2 },
    ],
    options: ["إسبانيا", "الأرجنتين", "فرنسا", "إيطاليا"],
    correctIndex: 3,
  },
  {
    // هولندا 4-3-3: فيربروخين(ليفربول→brighton) - دامفريس(إنتر) دي فريج(إنتر) فان دايك(ليفربول) بليند(أياكس→نستخدم ajax) - دي يونغ(برشلونة) تيمبر(أرسنال) فيينالدوم→خرابات(PSG→brighton) - بيرخوايس(توتنهام→نستخدم tottenham) ديباي(أتليتكو) غاكبو(ليفربول)
    id: 9,
    teamName: "هولندا",
    teamFlag: "🇳🇱",
    formation: "4-3-3",
    players: [
      { position: "GK", clubLogo: LOGOS.brighton, row: 0, col: 0 },
      { position: "RB", clubLogo: LOGOS.inter, row: 1, col: 0 },
      { position: "CB", clubLogo: LOGOS.inter, row: 1, col: 1 },
      { position: "CB", clubLogo: LOGOS.liverpool, row: 1, col: 2 },
      { position: "LB", clubLogo: LOGOS.ajax, row: 1, col: 3 },
      { position: "CM", clubLogo: LOGOS.barcelona, row: 2, col: 0 },
      { position: "CM", clubLogo: LOGOS.arsenal, row: 2, col: 1 },
      { position: "CM", clubLogo: LOGOS.brighton, row: 2, col: 2 },
      { position: "RW", clubLogo: LOGOS.tottenham, row: 3, col: 0 },
      { position: "ST", clubLogo: LOGOS.atletico, row: 3, col: 1 },
      { position: "LW", clubLogo: LOGOS.liverpool, row: 3, col: 2 },
    ],
    options: ["هولندا", "بلجيكا", "الدنمارك", "ألمانيا"],
    correctIndex: 0,
  },
  {
    // بلجيكا 4-3-3: كورتوا(ريال) - كاستانيه(→نستخدم villarreal) فافس→تياتي(أستون فيلا) - أونانا(أستون فيلا) تيليمانز(أستون فيلا) - دي بروين(سيتي) - لوكاكو(روما→napoli) تروسارد(أرسنال) دوكو(سيتي)
    id: 10,
    teamName: "بلجيكا",
    teamFlag: "🇧🇪",
    formation: "4-3-3",
    players: [
      { position: "GK", clubLogo: LOGOS.real_madrid, row: 0, col: 0 },
      { position: "RB", clubLogo: LOGOS.villarreal, row: 1, col: 0 },
      { position: "CB", clubLogo: LOGOS.aston_villa, row: 1, col: 1 },
      { position: "CB", clubLogo: LOGOS.aston_villa, row: 1, col: 2 },
      { position: "LB", clubLogo: LOGOS.aston_villa, row: 1, col: 3 },
      { position: "CM", clubLogo: LOGOS.aston_villa, row: 2, col: 0 },
      { position: "CM", clubLogo: LOGOS.man_city, row: 2, col: 1 },
      { position: "CM", clubLogo: LOGOS.real_madrid, row: 2, col: 2 },
      { position: "RW", clubLogo: LOGOS.arsenal, row: 3, col: 0 },
      { position: "ST", clubLogo: LOGOS.napoli, row: 3, col: 1 },
      { position: "LW", clubLogo: LOGOS.man_city, row: 3, col: 2 },
    ],
    options: ["هولندا", "بلجيكا", "فرنسا", "الدنمارك"],
    correctIndex: 1,
  },
];
