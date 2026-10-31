// Level 26: من صاحب الرقم؟

export interface SquadNumberQuestion {
  id: number;
  clubName: string;
  clubLogo: string;
  number: number;
  correctPlayer: string;
  options: string[];
  correctIndex: number;
}

export const squadNumberQuestions: SquadNumberQuestion[] = [
  {
    id: 1,
    clubName: 'Real Madrid',
    clubLogo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    number: 7,
    correctPlayer: 'فينيسيوس جونيور',
    options: ['فينيسيوس جونيور', 'رودريغو', 'بيلينغهام', 'مبابي'],
    correctIndex: 0,
  },
  {
    id: 2,
    clubName: 'FC Barcelona',
    clubLogo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    number: 10,
    correctPlayer: 'أنسو فاتي',
    options: ['بيدري', 'أنسو فاتي', 'لامين يامال', 'رافينيا'],
    correctIndex: 1,
  },
  {
    id: 3,
    clubName: 'Manchester City',
    clubLogo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    number: 9,
    correctPlayer: 'إيرلينغ هالاند',
    options: ['فودين', 'إيرلينغ هالاند', 'دي بروين', 'غريليش'],
    correctIndex: 1,
  },
  {
    id: 4,
    clubName: 'Liverpool',
    clubLogo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
    number: 11,
    correctPlayer: 'محمد صلاح',
    options: ['محمد صلاح', 'نونيز', 'سوبوسلاي', 'دياز'],
    correctIndex: 0,
  },
  {
    id: 5,
    clubName: 'PSG',
    clubLogo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
    number: 7,
    correctPlayer: 'مبابي',
    options: ['ديمبلي', 'مبابي', 'هاكيمي', 'أسينسيو'],
    correctIndex: 1,
  },
  {
    id: 6,
    clubName: 'Real Madrid',
    clubLogo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    number: 5,
    correctPlayer: 'جود بيلينغهام',
    options: ['تشواميني', 'جود بيلينغهام', 'كامافينغا', 'فالفيردي'],
    correctIndex: 1,
  },
  {
    id: 7,
    clubName: 'Bayern Munich',
    clubLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
    number: 9,
    correctPlayer: 'هاري كين',
    options: ['ساني', 'هاري كين', 'مولر', 'غنابري'],
    correctIndex: 1,
  },
  {
    id: 8,
    clubName: 'FC Barcelona',
    clubLogo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    number: 19,
    correctPlayer: 'لامين يامال',
    options: ['رافينيا', 'فيرمين', 'لامين يامال', 'غافي'],
    correctIndex: 2,
  },
  {
    id: 9,
    clubName: 'Manchester United',
    clubLogo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
    number: 10,
    correctPlayer: 'ماركوس راشفورد',
    options: ['برونو فيرنانديز', 'ماركوس راشفورد', 'غارناتشو', 'هويلوند'],
    correctIndex: 1,
  },
  {
    id: 10,
    clubName: 'Real Madrid',
    clubLogo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    number: 9,
    correctPlayer: 'مبابي',
    options: ['فينيسيوس', 'رودريغو', 'مبابي', 'بيلينغهام'],
    correctIndex: 2,
  },
  {
    id: 11,
    clubName: 'Arsenal',
    clubLogo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
    number: 7,
    correctPlayer: 'ساكا',
    options: ['ساكا', 'مارتينيلي', 'أوديغارد', 'هافيرتز'],
    correctIndex: 0,
  },
  {
    id: 12,
    clubName: 'Juventus',
    clubLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Juventus_FC_-_pictogram.svg',
    number: 10,
    correctPlayer: 'بوغبا',
    options: ['فلاهوفيتش', 'كييزا', 'بوغبا', 'لوكاتيلي'],
    correctIndex: 2,
  },
];
