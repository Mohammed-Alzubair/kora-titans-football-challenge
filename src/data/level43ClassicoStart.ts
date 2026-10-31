export interface ClassicoStartQuestion {
  id: number;
  clues: string[];
  correctPlayer: string;
  options: string[];
}

export const clasicoStartQuestions: ClassicoStartQuestion[] = [
  {
    id: 1,
    clues: ['لاعب برازيلي', 'جناح سريع', 'لعب مع Real Madrid'],
    correctPlayer: 'Vinícius Júnior',
    options: ['Vinícius Júnior', 'Rodrygo', 'Raphinha', 'Endrick'],
  },
  {
    id: 2,
    clues: ['لاعب أرجنتيني', 'أفضل لاعب في التاريخ', 'لعب مع FC Barcelona'],
    correctPlayer: 'Lionel Messi',
    options: ['Lionel Messi', 'Diego Maradona', 'Sergio Agüero', 'Ángel Di María'],
  },
  {
    id: 3,
    clues: ['لاعب فرنسي', 'أسرع لاعب في العالم', 'انتقل إلى Real Madrid'],
    correctPlayer: 'Kylian Mbappé',
    options: ['Kylian Mbappé', 'Ousmane Dembélé', 'Antoine Griezmann', 'Karim Benzema'],
  },
  {
    id: 4,
    clues: ['لاعب إسباني', 'صانع ألعاب', 'لعب مع FC Barcelona'],
    correctPlayer: 'Pedri',
    options: ['Pedri', 'Gavi', 'Dani Olmo', 'Isco'],
  },
  {
    id: 5,
    clues: ['لاعب كرواتي', 'فاز بالكرة الذهبية', 'لعب مع Real Madrid'],
    correctPlayer: 'Luka Modrić',
    options: ['Luka Modrić', 'Ivan Rakitić', 'Mateo Kovačić', 'Marcelo Brozović'],
  },
  {
    id: 6,
    clues: ['لاعب بولندي', 'هداف خارق', 'لعب مع FC Barcelona'],
    correctPlayer: 'Robert Lewandowski',
    options: ['Robert Lewandowski', 'Karim Benzema', 'Luis Suárez', 'Erling Haaland'],
  },
  {
    id: 7,
    clues: ['لاعب برازيلي', 'مدافع أسطوري', 'كابتن Real Madrid'],
    correctPlayer: 'Marcelo',
    options: ['Marcelo', 'Roberto Carlos', 'Casemiro', 'Éder Militão'],
  },
  {
    id: 8,
    clues: ['لاعب إسباني', 'مدافع صلب', 'لعب للفريقين'],
    correctPlayer: 'Luis Figo',
    options: ['Luis Figo', 'Sergio Ramos', 'Gerard Piqué', 'Samuel Eto\'o'],
  },
  {
    id: 9,
    clues: ['لاعب إنجليزي', 'جناح يمين', 'لعب مع Real Madrid'],
    correctPlayer: 'Jude Bellingham',
    options: ['Jude Bellingham', 'David Beckham', 'Michael Owen', 'Steve McManaman'],
  },
  {
    id: 10,
    clues: ['لاعب إسباني', 'جناح سريع', 'لعب مع FC Barcelona'],
    correctPlayer: 'Lamine Yamal',
    options: ['Lamine Yamal', 'Ansu Fati', 'Ferran Torres', 'Pedri'],
  },
  {
    id: 11,
    clues: ['لاعب برتغالي', 'هداف تاريخي', 'لعب مع Real Madrid 9 سنوات'],
    correctPlayer: 'Cristiano Ronaldo',
    options: ['Cristiano Ronaldo', 'Luis Figo', 'Pepe', 'Ricardo Kaká'],
  },
  {
    id: 12,
    clues: ['لاعب ألماني', 'حارس مرمى', 'لعب مع FC Barcelona'],
    correctPlayer: 'Marc-André ter Stegen',
    options: ['Marc-André ter Stegen', 'Manuel Neuer', 'Thibaut Courtois', 'Jan Oblak'],
  },
];
