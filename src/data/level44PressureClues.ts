export interface PressureClueQuestion {
  id: number;
  clues: string[];
  correctPlayer: string;
  options: string[];
}

export const pressureClueQuestions: PressureClueQuestion[] = [
  {
    id: 1,
    clues: ['لاعب إسباني', 'لعب سنوات طويلة مع FC Barcelona', 'قائد الفريق سابقاً'],
    correctPlayer: 'Carles Puyol',
    options: ['Carles Puyol', 'Xavi Hernández', 'Andrés Iniesta', 'Gerard Piqué'],
  },
  {
    id: 2,
    clues: ['لاعب إسباني', 'قائد Real Madrid', 'مدافع عنيف'],
    correctPlayer: 'Sergio Ramos',
    options: ['Sergio Ramos', 'Pepe', 'Raúl González', 'Iker Casillas'],
  },
  {
    id: 3,
    clues: ['لاعب برازيلي', 'ملك المراوغة', 'لعب مع FC Barcelona'],
    correctPlayer: 'Ronaldinho',
    options: ['Ronaldinho', 'Rivaldo', 'Neymar', 'Romário'],
  },
  {
    id: 4,
    clues: ['لاعب فرنسي', 'صلعاء شهيرة', 'لعب مع Real Madrid'],
    correctPlayer: 'Zinedine Zidane',
    options: ['Zinedine Zidane', 'Thierry Henry', 'Karim Benzema', 'Claude Makélélé'],
  },
  {
    id: 5,
    clues: ['حارس إسباني', 'أسطورة Real Madrid', 'قائد المنتخب'],
    correctPlayer: 'Iker Casillas',
    options: ['Iker Casillas', 'Víctor Valdés', 'David de Gea', 'Marc-André ter Stegen'],
  },
  {
    id: 6,
    clues: ['لاعب إسباني', 'صانع ألعاب أسطوري', 'لعب كل مسيرته مع FC Barcelona'],
    correctPlayer: 'Xavi Hernández',
    options: ['Xavi Hernández', 'Andrés Iniesta', 'Cesc Fàbregas', 'Sergio Busquets'],
  },
  {
    id: 7,
    clues: ['لاعب برازيلي', 'ظاهرة كرة القدم', 'لعب مع Real Madrid'],
    correctPlayer: 'Ronaldo Nazário',
    options: ['Ronaldo Nazário', 'Kaká', 'Roberto Carlos', 'Robinho'],
  },
  {
    id: 8,
    clues: ['لاعب أوروغوياني', 'هداف خطير', 'لعب مع FC Barcelona'],
    correctPlayer: 'Luis Suárez',
    options: ['Luis Suárez', 'Diego Forlán', 'Edinson Cavani', 'Federico Valverde'],
  },
  {
    id: 9,
    clues: ['لاعب ويلزي', 'سرعة خارقة', 'لعب مع Real Madrid'],
    correctPlayer: 'Gareth Bale',
    options: ['Gareth Bale', 'Aaron Ramsey', 'Ryan Giggs', 'Joe Allen'],
  },
  {
    id: 10,
    clues: ['لاعب برازيلي', 'نجم باريس سابقاً', 'لعب مع FC Barcelona'],
    correctPlayer: 'Neymar',
    options: ['Neymar', 'Dani Alves', 'Philippe Coutinho', 'Arthur Melo'],
  },
  {
    id: 11,
    clues: ['لاعب ألماني', 'خط وسط', 'اعتزل في Real Madrid'],
    correctPlayer: 'Toni Kroos',
    options: ['Toni Kroos', 'Mesut Özil', 'Sami Khedira', 'Bastian Schweinsteiger'],
  },
  {
    id: 12,
    clues: ['لاعب كاميروني', 'هداف أفريقي', 'لعب مع FC Barcelona و Real Madrid'],
    correctPlayer: "Samuel Eto'o",
    options: ["Samuel Eto'o", 'Didier Drogba', 'Yaya Touré', 'Sadio Mané'],
  },
];
