// Level 27: النادي من اللاعبين القدامى

import type { LeagueId } from './leagues';

export interface LegendaryPlayersQuestion {
  id: number;
  players: string[];
  playersEn: string[];
  correctClub: string;
  leagueId: LeagueId;
  options: string[];
  correctIndex: number;
}

export const legendaryPlayersQuestions: LegendaryPlayersQuestion[] = [
  {
    id: 1,
    players: ['زين الدين زيدان', 'راؤول غونزاليس', 'روبيرتو كارلوس', 'لويس فيغو'],
    playersEn: ['Zinedine Zidane', 'Raúl González', 'Roberto Carlos', 'Luís Figo'],
    correctClub: 'ريال مدريد', leagueId: 'la-liga',
    options: ['ريال مدريد', 'برشلونة', 'أتلتيكو مدريد', 'إشبيلية'],
    correctIndex: 0,
  },
  {
    id: 2,
    players: ['رونالدينيو', 'بويول', 'تشافي', 'إنييستا'],
    playersEn: ['Ronaldinho', 'Carles Puyol', 'Xavi', 'Andrés Iniesta'],
    correctClub: 'برشلونة', leagueId: 'la-liga',
    options: ['ريال مدريد', 'برشلونة', 'أتلتيكو مدريد', 'إشبيلية'],
    correctIndex: 1,
  },
  {
    id: 3,
    players: ['مالديني', 'نيستا', 'بيرلو', 'كاكا'],
    playersEn: ['Paolo Maldini', 'Alessandro Nesta', 'Andrea Pirlo', 'Kaká'],
    correctClub: 'ميلان', leagueId: 'serie-a',
    options: ['إنتر ميلان', 'يوفنتوس', 'ميلان', 'روما'],
    correctIndex: 2,
  },
  {
    id: 4,
    players: ['ستيفن جيرارد', 'فيرناندو توريس', 'تشابي ألونسو', 'جيمي كاراغر'],
    playersEn: ['Steven Gerrard', 'Fernando Torres', 'Xabi Alonso', 'Jamie Carragher'],
    correctClub: 'ليفربول', leagueId: 'premier-league',
    options: ['تشيلسي', 'ليفربول', 'مانشستر يونايتد', 'أرسنال'],
    correctIndex: 1,
  },
  {
    id: 5,
    players: ['ديل بييرو', 'بوفون', 'نيدفيد', 'تريزيغيه'],
    playersEn: ['Alessandro Del Piero', 'Gianluigi Buffon', 'Pavel Nedvěd', 'David Trezeguet'],
    correctClub: 'يوفنتوس', leagueId: 'serie-a',
    options: ['ميلان', 'إنتر ميلان', 'يوفنتوس', 'روما'],
    correctIndex: 2,
  },
  {
    id: 6,
    players: ['ريان غيغز', 'بول سكولز', 'روي كين', 'إيريك كانتونا'],
    playersEn: ['Ryan Giggs', 'Paul Scholes', 'Roy Keane', 'Eric Cantona'],
    correctClub: 'مانشستر يونايتد', leagueId: 'premier-league',
    options: ['مانشستر يونايتد', 'ليفربول', 'أرسنال', 'تشيلسي'],
    correctIndex: 0,
  },
  {
    id: 7,
    players: ['تييري هنري', 'دينيس بيركامب', 'باتريك فييرا', 'روبير بيريس'],
    playersEn: ['Thierry Henry', 'Dennis Bergkamp', 'Patrick Vieira', 'Robert Pirès'],
    correctClub: 'أرسنال', leagueId: 'premier-league',
    options: ['تشيلسي', 'أرسنال', 'توتنهام', 'ليفربول'],
    correctIndex: 1,
  },
  {
    id: 8,
    players: ['فرانك لامبارد', 'ديدييه دروغبا', 'جون تيري', 'بيتر تشيك'],
    playersEn: ['Frank Lampard', 'Didier Drogba', 'John Terry', 'Petr Čech'],
    correctClub: 'تشيلسي', leagueId: 'premier-league',
    options: ['تشيلسي', 'مانشستر سيتي', 'أرسنال', 'توتنهام'],
    correctIndex: 0,
  },
  {
    id: 9,
    players: ['رونالدو البرازيلي', 'فيغو', 'بيكهام', 'أوين'],
    playersEn: ['Ronaldo Nazário', 'Luís Figo', 'David Beckham', 'Michael Owen'],
    correctClub: 'ريال مدريد', leagueId: 'la-liga',
    options: ['برشلونة', 'ريال مدريد', 'أتلتيكو مدريد', 'إشبيلية'],
    correctIndex: 1,
  },
  {
    id: 10,
    players: ['زانيتي', 'أدريانو', 'فيغو', 'إبراهيموفيتش'],
    playersEn: ['Javier Zanetti', 'Adriano', 'Luís Figo', 'Zlatan Ibrahimović'],
    correctClub: 'إنتر ميلان', leagueId: 'serie-a',
    options: ['ميلان', 'يوفنتوس', 'إنتر ميلان', 'روما'],
    correctIndex: 2,
  },
];
