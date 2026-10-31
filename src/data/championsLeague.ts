// بيانات نهائيات دوري الأبطال من 2000 إلى 2025
export interface ChampionsLeagueFinal {
  year: number;
  winner: string;
  winnerLogo: string;
  runnerUp: string;
  runnerUpLogo: string;
  score: string;
  venue: string;
}

export const championsLeagueFinals: ChampionsLeagueFinal[] = [
  {
    year: 2000,
    winner: "ريال مدريد",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    runnerUp: "فالنسيا",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Valenciacf.svg/1200px-Valenciacf.svg.png",
    score: "3-0",
    venue: "باريس"
  },
  {
    year: 2001,
    winner: "بايرن ميونخ",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
    runnerUp: "فالنسيا",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Valenciacf.svg/1200px-Valenciacf.svg.png",
    score: "1-1 (ركلات 5-4)",
    venue: "ميلانو"
  },
  {
    year: 2002,
    winner: "ريال مدريد",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    runnerUp: "باير ليفركوزن",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Bayer_04_Leverkusen_logo.svg/1200px-Bayer_04_Leverkusen_logo.svg.png",
    score: "2-1",
    venue: "غلاسكو"
  },
  {
    year: 2003,
    winner: "ميلان",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/1200px-Logo_of_AC_Milan.svg.png",
    runnerUp: "يوفنتوس",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juventus_FC_2017_icon_%28black%29.svg/1200px-Juventus_FC_2017_icon_%28black%29.svg.png",
    score: "0-0 (ركلات 3-2)",
    venue: "مانشستر"
  },
  {
    year: 2004,
    winner: "بورتو",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/FC_Porto.svg/1200px-FC_Porto.svg.png",
    runnerUp: "موناكو",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/AS_Monaco_FC.svg/1200px-AS_Monaco_FC.svg.png",
    score: "3-0",
    venue: "غيلزنكيرشن"
  },
  {
    year: 2005,
    winner: "ليفربول",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png",
    runnerUp: "ميلان",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/1200px-Logo_of_AC_Milan.svg.png",
    score: "3-3 (ركلات 3-2)",
    venue: "إسطنبول"
  },
  {
    year: 2006,
    winner: "برشلونة",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png",
    runnerUp: "أرسنال",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png",
    score: "2-1",
    venue: "باريس"
  },
  {
    year: 2007,
    winner: "ميلان",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/1200px-Logo_of_AC_Milan.svg.png",
    runnerUp: "ليفربول",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png",
    score: "2-1",
    venue: "أثينا"
  },
  {
    year: 2008,
    winner: "مانشستر يونايتد",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png",
    runnerUp: "تشيلسي",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
    score: "1-1 (ركلات 6-5)",
    venue: "موسكو"
  },
  {
    year: 2009,
    winner: "برشلونة",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png",
    runnerUp: "مانشستر يونايتد",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png",
    score: "2-0",
    venue: "روما"
  },
  {
    year: 2010,
    winner: "إنتر ميلان",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/1200px-FC_Internazionale_Milano_2021.svg.png",
    runnerUp: "بايرن ميونخ",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
    score: "2-0",
    venue: "مدريد"
  },
  {
    year: 2011,
    winner: "برشلونة",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png",
    runnerUp: "مانشستر يونايتد",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png",
    score: "3-1",
    venue: "لندن"
  },
  {
    year: 2012,
    winner: "تشيلسي",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
    runnerUp: "بايرن ميونخ",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
    score: "1-1 (ركلات 4-3)",
    venue: "ميونخ"
  },
  {
    year: 2013,
    winner: "بايرن ميونخ",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
    runnerUp: "بوروسيا دورتموند",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png",
    score: "2-1",
    venue: "لندن"
  },
  {
    year: 2014,
    winner: "ريال مدريد",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    runnerUp: "أتلتيكو مدريد",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Atletico_Madrid_2017_logo.svg/1200px-Atletico_Madrid_2017_logo.svg.png",
    score: "4-1",
    venue: "لشبونة"
  },
  {
    year: 2015,
    winner: "برشلونة",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png",
    runnerUp: "يوفنتوس",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juventus_FC_2017_icon_%28black%29.svg/1200px-Juventus_FC_2017_icon_%28black%29.svg.png",
    score: "3-1",
    venue: "برلين"
  },
  {
    year: 2016,
    winner: "ريال مدريد",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    runnerUp: "أتلتيكو مدريد",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Atletico_Madrid_2017_logo.svg/1200px-Atletico_Madrid_2017_logo.svg.png",
    score: "1-1 (ركلات 5-3)",
    venue: "ميلانو"
  },
  {
    year: 2017,
    winner: "ريال مدريد",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    runnerUp: "يوفنتوس",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juventus_FC_2017_icon_%28black%29.svg/1200px-Juventus_FC_2017_icon_%28black%29.svg.png",
    score: "4-1",
    venue: "كارديف"
  },
  {
    year: 2018,
    winner: "ريال مدريد",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    runnerUp: "ليفربول",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png",
    score: "3-1",
    venue: "كييف"
  },
  {
    year: 2019,
    winner: "ليفربول",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png",
    runnerUp: "توتنهام",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Tottenham_Hotspur.svg/1200px-Tottenham_Hotspur.svg.png",
    score: "2-0",
    venue: "مدريد"
  },
  {
    year: 2020,
    winner: "بايرن ميونخ",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
    runnerUp: "باريس سان جيرمان",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png",
    score: "1-0",
    venue: "لشبونة"
  },
  {
    year: 2021,
    winner: "تشيلسي",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
    runnerUp: "مانشستر سيتي",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
    score: "1-0",
    venue: "بورتو"
  },
  {
    year: 2022,
    winner: "ريال مدريد",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    runnerUp: "ليفربول",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png",
    score: "1-0",
    venue: "باريس"
  },
  {
    year: 2023,
    winner: "مانشستر سيتي",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
    runnerUp: "إنتر ميلان",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/1200px-FC_Internazionale_Milano_2021.svg.png",
    score: "1-0",
    venue: "إسطنبول"
  },
  {
    year: 2024,
    winner: "ريال مدريد",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    runnerUp: "بوروسيا دورتموند",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png",
    score: "2-0",
    venue: "لندن"
  },
  {
    year: 2025,
    winner: "ريال مدريد",
    winnerLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    runnerUp: "باريس سان جيرمان",
    runnerUpLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png",
    score: "2-1",
    venue: "ميونخ"
  },
];

// خيارات خاطئة للأندية
export const wrongAnswersPool = [
  "برشلونة", "ريال مدريد", "بايرن ميونخ", "مانشستر سيتي", 
  "ليفربول", "تشيلسي", "يوفنتوس", "أتلتيكو مدريد",
  "باريس سان جيرمان", "مانشستر يونايتد", "إنتر ميلان", "ميلان",
  "بورتو", "أرسنال", "توتنهام", "بوروسيا دورتموند"
];

// خيارات خاطئة للنتائج
export const wrongScoresPool = [
  "1-0", "2-0", "2-1", "3-0", "3-1", "3-2", "4-0", "4-1", "4-2",
  "1-1 (ركلات 4-3)", "1-1 (ركلات 5-4)", "0-0 (ركلات 3-2)", "2-2 (ركلات 4-2)"
];
