export interface SpeedQuestion {
  id: number;
  question: string;
  correctAnswer: string;
  options: string[];
}

export const speedQuestions: SpeedQuestion[] = [
  { id: 1, question: 'في أي نادي يلعب إيرلينغ هالاند؟', correctAnswer: 'Manchester City', options: ['Manchester City', 'Borussia Dortmund', 'Real Madrid', 'Bayern Munich'] },
  { id: 2, question: 'في أي نادي يلعب محمد صلاح؟', correctAnswer: 'Liverpool', options: ['Liverpool', 'Chelsea', 'AS Roma', 'PSG'] },
  { id: 3, question: 'في أي نادي يلعب كيليان مبابي؟', correctAnswer: 'Real Madrid', options: ['Real Madrid', 'PSG', 'Monaco', 'Barcelona'] },
  { id: 4, question: 'في أي نادي يلعب فينيسيوس جونيور؟', correctAnswer: 'Real Madrid', options: ['Real Madrid', 'Flamengo', 'PSG', 'Barcelona'] },
  { id: 5, question: 'في أي نادي يلعب جود بيلينغهام؟', correctAnswer: 'Real Madrid', options: ['Real Madrid', 'Dortmund', 'Manchester City', 'Chelsea'] },
  { id: 6, question: 'في أي نادي يلعب روبرت ليفاندوفسكي؟', correctAnswer: 'FC Barcelona', options: ['FC Barcelona', 'Bayern Munich', 'Dortmund', 'PSG'] },
  { id: 7, question: 'في أي نادي يلعب لامين يامال؟', correctAnswer: 'FC Barcelona', options: ['FC Barcelona', 'Real Madrid', 'PSG', 'Manchester City'] },
  { id: 8, question: 'في أي نادي يلعب بيدري؟', correctAnswer: 'FC Barcelona', options: ['FC Barcelona', 'Real Madrid', 'Atletico Madrid', 'Sevilla'] },
  { id: 9, question: 'في أي نادي يلعب فيل فودين؟', correctAnswer: 'Manchester City', options: ['Manchester City', 'Liverpool', 'Chelsea', 'Arsenal'] },
  { id: 10, question: 'في أي نادي يلعب بوكايو ساكا؟', correctAnswer: 'Arsenal', options: ['Arsenal', 'Chelsea', 'Manchester City', 'Tottenham'] },
  { id: 11, question: 'في أي نادي يلعب رافينيا؟', correctAnswer: 'FC Barcelona', options: ['FC Barcelona', 'Leeds United', 'Rennes', 'PSG'] },
  { id: 12, question: 'في أي نادي يلعب تيبو كورتوا؟', correctAnswer: 'Real Madrid', options: ['Real Madrid', 'Chelsea', 'Atletico Madrid', 'Genk'] },
  { id: 13, question: 'في أي نادي يلعب إرلينغ هالاند؟', correctAnswer: 'Manchester City', options: ['Manchester City', 'Dortmund', 'RB Salzburg', 'Bayern Munich'] },
  { id: 14, question: 'من هو هداف دوري الأبطال التاريخي؟', correctAnswer: 'كريستيانو رونالدو', options: ['كريستيانو رونالدو', 'ليونيل ميسي', 'روبرت ليفاندوفسكي', 'كريم بنزيما'] },
  { id: 15, question: 'في أي نادي يلعب داني أولمو؟', correctAnswer: 'FC Barcelona', options: ['FC Barcelona', 'RB Leipzig', 'Dinamo Zagreb', 'Real Madrid'] },
];
