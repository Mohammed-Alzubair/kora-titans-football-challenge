// المستوى 24 - اعرف المنتخب من الحارس والمهاجم

export interface NationalTeamQuestion {
  id: number;
  teamName: string;
  teamFlag: string;
  goalkeeper: { name: string; number: number; shirtColor: string };
  striker: { name: string; number: number; shirtColor: string };
  options: string[];
  correctIndex: number;
}

export const nationalTeamQuestions: NationalTeamQuestion[] = [
  {
    id: 1,
    teamName: "البرازيل",
    teamFlag: "🇧🇷",
    goalkeeper: { name: "أليسون", number: 1, shirtColor: "#2ECC71" },
    striker: { name: "فينيسيوس", number: 11, shirtColor: "#F1C40F" },
    options: ["البرازيل", "الأرجنتين", "كولومبيا", "أوروغواي"],
    correctIndex: 0,
  },
  {
    id: 2,
    teamName: "ألمانيا",
    teamFlag: "🇩🇪",
    goalkeeper: { name: "نوير", number: 1, shirtColor: "#95A5A6" },
    striker: { name: "هافيرتز", number: 9, shirtColor: "#ECF0F1" },
    options: ["فرنسا", "ألمانيا", "هولندا", "بلجيكا"],
    correctIndex: 1,
  },
  {
    id: 3,
    teamName: "فرنسا",
    teamFlag: "🇫🇷",
    goalkeeper: { name: "مينيان", number: 16, shirtColor: "#E74C3C" },
    striker: { name: "مبابي", number: 10, shirtColor: "#2C3E50" },
    options: ["إيطاليا", "إسبانيا", "فرنسا", "البرتغال"],
    correctIndex: 2,
  },
  {
    id: 4,
    teamName: "الأرجنتين",
    teamFlag: "🇦🇷",
    goalkeeper: { name: "إ. مارتينيز", number: 23, shirtColor: "#27AE60" },
    striker: { name: "ميسي", number: 10, shirtColor: "#3498DB" },
    options: ["أوروغواي", "تشيلي", "البرازيل", "الأرجنتين"],
    correctIndex: 3,
  },
  {
    id: 5,
    teamName: "إسبانيا",
    teamFlag: "🇪🇸",
    goalkeeper: { name: "أوناي سيمون", number: 23, shirtColor: "#F39C12" },
    striker: { name: "موراتا", number: 7, shirtColor: "#E74C3C" },
    options: ["إسبانيا", "البرتغال", "إيطاليا", "المغرب"],
    correctIndex: 0,
  },
  {
    id: 6,
    teamName: "إنجلترا",
    teamFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    goalkeeper: { name: "بيكفورد", number: 1, shirtColor: "#F1C40F" },
    striker: { name: "كين", number: 9, shirtColor: "#ECF0F1" },
    options: ["هولندا", "إنجلترا", "ألمانيا", "الدنمارك"],
    correctIndex: 1,
  },
  {
    id: 7,
    teamName: "البرتغال",
    teamFlag: "🇵🇹",
    goalkeeper: { name: "كوستا", number: 1, shirtColor: "#1ABC9C" },
    striker: { name: "رونالدو", number: 7, shirtColor: "#C0392B" },
    options: ["إسبانيا", "البرازيل", "البرتغال", "المغرب"],
    correctIndex: 2,
  },
  {
    id: 8,
    teamName: "إيطاليا",
    teamFlag: "🇮🇹",
    goalkeeper: { name: "دوناروما", number: 1, shirtColor: "#27AE60" },
    striker: { name: "ريتيغي", number: 11, shirtColor: "#2980B9" },
    options: ["فرنسا", "الأرجنتين", "إسبانيا", "إيطاليا"],
    correctIndex: 3,
  },
  {
    id: 9,
    teamName: "هولندا",
    teamFlag: "🇳🇱",
    goalkeeper: { name: "فيربروخين", number: 1, shirtColor: "#F1C40F" },
    striker: { name: "ديباي", number: 10, shirtColor: "#E67E22" },
    options: ["هولندا", "بلجيكا", "ألمانيا", "الدنمارك"],
    correctIndex: 0,
  },
  {
    id: 10,
    teamName: "المغرب",
    teamFlag: "🇲🇦",
    goalkeeper: { name: "بونو", number: 1, shirtColor: "#2ECC71" },
    striker: { name: "إن نصيري", number: 19, shirtColor: "#C0392B" },
    options: ["تونس", "المغرب", "الجزائر", "مصر"],
    correctIndex: 1,
  },
];
