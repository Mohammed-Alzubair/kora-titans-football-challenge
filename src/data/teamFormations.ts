// Team Formations Data for Level 7
// Top European clubs with their formations and player nationalities

export interface PlayerPosition {
  position: string; // e.g., "GK", "CB", "CM", "ST"
  name: string;
  country: string;
  flag: string;
}

export interface TeamFormation {
  id: string;
  name: string;
  nameAr: string;
  logo: string;
  league: string;
  formation: string; // e.g., "4-3-3"
  players: PlayerPosition[];
}

export const teamFormations: TeamFormation[] = [
  {
    id: "real_madrid",
    name: "Real Madrid",
    nameAr: "ريال مدريد",
    logo: "https://crests.football-data.org/86.png",
    league: "La Liga",
    formation: "4-3-3",
    players: [
      { position: "GK", name: "Courtois", country: "Belgium", flag: "🇧🇪" },
      { position: "RB", name: "Carvajal", country: "Spain", flag: "🇪🇸" },
      { position: "CB", name: "Rüdiger", country: "Germany", flag: "🇩🇪" },
      { position: "CB", name: "Alaba", country: "Austria", flag: "🇦🇹" },
      { position: "LB", name: "Mendy", country: "France", flag: "🇫🇷" },
      { position: "CM", name: "Tchouaméni", country: "France", flag: "🇫🇷" },
      { position: "CM", name: "Valverde", country: "Uruguay", flag: "🇺🇾" },
      { position: "CM", name: "Bellingham", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { position: "RW", name: "Rodrygo", country: "Brazil", flag: "🇧🇷" },
      { position: "ST", name: "Mbappé", country: "France", flag: "🇫🇷" },
      { position: "LW", name: "Vinícius Jr.", country: "Brazil", flag: "🇧🇷" },
    ]
  },
  {
    id: "barcelona",
    name: "Barcelona",
    nameAr: "برشلونة",
    logo: "https://crests.football-data.org/81.png",
    league: "La Liga",
    formation: "4-3-3",
    players: [
      { position: "GK", name: "Ter Stegen", country: "Germany", flag: "🇩🇪" },
      { position: "RB", name: "Koundé", country: "France", flag: "🇫🇷" },
      { position: "CB", name: "Cubarsí", country: "Spain", flag: "🇪🇸" },
      { position: "CB", name: "Martínez", country: "Uruguay", flag: "🇺🇾" },
      { position: "LB", name: "Balde", country: "Spain", flag: "🇪🇸" },
      { position: "CM", name: "Pedri", country: "Spain", flag: "🇪🇸" },
      { position: "CM", name: "De Jong", country: "Netherlands", flag: "🇳🇱" },
      { position: "CM", name: "Gavi", country: "Spain", flag: "🇪🇸" },
      { position: "RW", name: "Lamine Yamal", country: "Spain", flag: "🇪🇸" },
      { position: "ST", name: "Lewandowski", country: "Poland", flag: "🇵🇱" },
      { position: "LW", name: "Raphinha", country: "Brazil", flag: "🇧🇷" },
    ]
  },
  {
    id: "manchester_city",
    name: "Manchester City",
    nameAr: "مانشستر سيتي",
    logo: "https://crests.football-data.org/65.png",
    league: "Premier League",
    formation: "4-3-3",
    players: [
      { position: "GK", name: "Ederson", country: "Brazil", flag: "🇧🇷" },
      { position: "RB", name: "Walker", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { position: "CB", name: "Dias", country: "Portugal", flag: "🇵🇹" },
      { position: "CB", name: "Stones", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { position: "LB", name: "Gvardiol", country: "Croatia", flag: "🇭🇷" },
      { position: "CM", name: "Rodri", country: "Spain", flag: "🇪🇸" },
      { position: "CM", name: "De Bruyne", country: "Belgium", flag: "🇧🇪" },
      { position: "CM", name: "Silva", country: "Portugal", flag: "🇵🇹" },
      { position: "RW", name: "Foden", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { position: "ST", name: "Haaland", country: "Norway", flag: "🇳🇴" },
      { position: "LW", name: "Grealish", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    ]
  },
  {
    id: "liverpool",
    name: "Liverpool",
    nameAr: "ليفربول",
    logo: "https://crests.football-data.org/64.png",
    league: "Premier League",
    formation: "4-3-3",
    players: [
      { position: "GK", name: "Alisson", country: "Brazil", flag: "🇧🇷" },
      { position: "RB", name: "Alexander-Arnold", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { position: "CB", name: "Van Dijk", country: "Netherlands", flag: "🇳🇱" },
      { position: "CB", name: "Konaté", country: "France", flag: "🇫🇷" },
      { position: "LB", name: "Robertson", country: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
      { position: "CM", name: "Mac Allister", country: "Argentina", flag: "🇦🇷" },
      { position: "CM", name: "Szoboszlai", country: "Hungary", flag: "🇭🇺" },
      { position: "CM", name: "Gravenberch", country: "Netherlands", flag: "🇳🇱" },
      { position: "RW", name: "Salah", country: "Egypt", flag: "🇪🇬" },
      { position: "ST", name: "Núñez", country: "Uruguay", flag: "🇺🇾" },
      { position: "LW", name: "Díaz", country: "Colombia", flag: "🇨🇴" },
    ]
  },
  {
    id: "psg",
    name: "Paris Saint-Germain",
    nameAr: "باريس سان جيرمان",
    logo: "https://crests.football-data.org/524.png",
    league: "Ligue 1",
    formation: "4-3-3",
    players: [
      { position: "GK", name: "Donnarumma", country: "Italy", flag: "🇮🇹" },
      { position: "RB", name: "Hakimi", country: "Morocco", flag: "🇲🇦" },
      { position: "CB", name: "Marquinhos", country: "Brazil", flag: "🇧🇷" },
      { position: "CB", name: "Škriniar", country: "Slovakia", flag: "🇸🇰" },
      { position: "LB", name: "Mendes", country: "Portugal", flag: "🇵🇹" },
      { position: "CM", name: "Vitinha", country: "Portugal", flag: "🇵🇹" },
      { position: "CM", name: "Zaïre-Emery", country: "France", flag: "🇫🇷" },
      { position: "CM", name: "Ruiz", country: "Spain", flag: "🇪🇸" },
      { position: "RW", name: "Dembélé", country: "France", flag: "🇫🇷" },
      { position: "ST", name: "Gonçalo Ramos", country: "Portugal", flag: "🇵🇹" },
      { position: "LW", name: "Barcola", country: "France", flag: "🇫🇷" },
    ]
  },
  {
    id: "bayern",
    name: "Bayern Munich",
    nameAr: "بايرن ميونخ",
    logo: "https://crests.football-data.org/5.png",
    league: "Bundesliga",
    formation: "4-2-3-1",
    players: [
      { position: "GK", name: "Neuer", country: "Germany", flag: "🇩🇪" },
      { position: "RB", name: "Kimmich", country: "Germany", flag: "🇩🇪" },
      { position: "CB", name: "Upamecano", country: "France", flag: "🇫🇷" },
      { position: "CB", name: "Kim", country: "South Korea", flag: "🇰🇷" },
      { position: "LB", name: "Davies", country: "Canada", flag: "🇨🇦" },
      { position: "CDM", name: "Goretzka", country: "Germany", flag: "🇩🇪" },
      { position: "CDM", name: "Laimer", country: "Austria", flag: "🇦🇹" },
      { position: "RW", name: "Sané", country: "Germany", flag: "🇩🇪" },
      { position: "CAM", name: "Musiala", country: "Germany", flag: "🇩🇪" },
      { position: "LW", name: "Coman", country: "France", flag: "🇫🇷" },
      { position: "ST", name: "Kane", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    ]
  },
  {
    id: "juventus",
    name: "Juventus",
    nameAr: "يوفنتوس",
    logo: "https://crests.football-data.org/109.png",
    league: "Serie A",
    formation: "4-3-3",
    players: [
      { position: "GK", name: "Di Gregorio", country: "Italy", flag: "🇮🇹" },
      { position: "RB", name: "Cambiaso", country: "Italy", flag: "🇮🇹" },
      { position: "CB", name: "Gatti", country: "Italy", flag: "🇮🇹" },
      { position: "CB", name: "Bremer", country: "Brazil", flag: "🇧🇷" },
      { position: "LB", name: "Cabal", country: "Colombia", flag: "🇨🇴" },
      { position: "CM", name: "Locatelli", country: "Italy", flag: "🇮🇹" },
      { position: "CM", name: "Douglas Luiz", country: "Brazil", flag: "🇧🇷" },
      { position: "CM", name: "McKennie", country: "USA", flag: "🇺🇸" },
      { position: "RW", name: "Conceição", country: "Portugal", flag: "🇵🇹" },
      { position: "ST", name: "Vlahović", country: "Serbia", flag: "🇷🇸" },
      { position: "LW", name: "Yıldız", country: "Turkey", flag: "🇹🇷" },
    ]
  },
  {
    id: "inter_milan",
    name: "Inter Milan",
    nameAr: "إنتر ميلان",
    logo: "https://crests.football-data.org/108.png",
    league: "Serie A",
    formation: "3-5-2",
    players: [
      { position: "GK", name: "Sommer", country: "Switzerland", flag: "🇨🇭" },
      { position: "CB", name: "Pavard", country: "France", flag: "🇫🇷" },
      { position: "CB", name: "Acerbi", country: "Italy", flag: "🇮🇹" },
      { position: "CB", name: "Bastoni", country: "Italy", flag: "🇮🇹" },
      { position: "RWB", name: "Darmian", country: "Italy", flag: "🇮🇹" },
      { position: "CM", name: "Barella", country: "Italy", flag: "🇮🇹" },
      { position: "CM", name: "Çalhanoğlu", country: "Turkey", flag: "🇹🇷" },
      { position: "CM", name: "Mkhitaryan", country: "Armenia", flag: "🇦🇲" },
      { position: "LWB", name: "Dimarco", country: "Italy", flag: "🇮🇹" },
      { position: "ST", name: "Lautaro", country: "Argentina", flag: "🇦🇷" },
      { position: "ST", name: "Thuram", country: "France", flag: "🇫🇷" },
    ]
  },
  {
    id: "arsenal",
    name: "Arsenal",
    nameAr: "أرسنال",
    logo: "https://crests.football-data.org/57.png",
    league: "Premier League",
    formation: "4-3-3",
    players: [
      { position: "GK", name: "Raya", country: "Spain", flag: "🇪🇸" },
      { position: "RB", name: "White", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { position: "CB", name: "Saliba", country: "France", flag: "🇫🇷" },
      { position: "CB", name: "Gabriel", country: "Brazil", flag: "🇧🇷" },
      { position: "LB", name: "Timber", country: "Netherlands", flag: "🇳🇱" },
      { position: "CM", name: "Rice", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { position: "CM", name: "Ødegaard", country: "Norway", flag: "🇳🇴" },
      { position: "CM", name: "Havertz", country: "Germany", flag: "🇩🇪" },
      { position: "RW", name: "Saka", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { position: "ST", name: "Jesus", country: "Brazil", flag: "🇧🇷" },
      { position: "LW", name: "Martinelli", country: "Brazil", flag: "🇧🇷" },
    ]
  },
  {
    id: "dortmund",
    name: "Borussia Dortmund",
    nameAr: "بوروسيا دورتموند",
    logo: "https://crests.football-data.org/4.png",
    league: "Bundesliga",
    formation: "4-2-3-1",
    players: [
      { position: "GK", name: "Kobel", country: "Switzerland", flag: "🇨🇭" },
      { position: "RB", name: "Ryerson", country: "Norway", flag: "🇳🇴" },
      { position: "CB", name: "Schlotterbeck", country: "Germany", flag: "🇩🇪" },
      { position: "CB", name: "Hummels", country: "Germany", flag: "🇩🇪" },
      { position: "LB", name: "Maatsen", country: "Netherlands", flag: "🇳🇱" },
      { position: "CDM", name: "Can", country: "Germany", flag: "🇩🇪" },
      { position: "CDM", name: "Sabitzer", country: "Austria", flag: "🇦🇹" },
      { position: "RW", name: "Sancho", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { position: "CAM", name: "Brandt", country: "Germany", flag: "🇩🇪" },
      { position: "LW", name: "Adeyemi", country: "Germany", flag: "🇩🇪" },
      { position: "ST", name: "Fullkrug", country: "Germany", flag: "🇩🇪" },
    ]
  },
];

export function getRandomFormationQuestion(excludeIds: string[] = []): { correct: TeamFormation; options: TeamFormation[] } {
  const availableTeams = teamFormations.filter(t => !excludeIds.includes(t.id));
  
  if (availableTeams.length < 4) {
    return getRandomFormationQuestion([]);
  }
  
  const shuffled = [...availableTeams].sort(() => Math.random() - 0.5);
  const correct = shuffled[0];
  const wrong = shuffled.slice(1, 4);
  
  const options = [...wrong, correct].sort(() => Math.random() - 0.5);
  
  return { correct, options };
}
