export interface FinalQuizQuestion {
  id: number;
  type: 'club' | 'player' | 'coach' | 'history';
  question: string;
  correctAnswer: string;
  options: string[];
}

export const finalQuizQuestions: FinalQuizQuestion[] = [
  {
    id: 1, type: 'club',
    question: 'أي نادي فاز بأكبر عدد من دوري أبطال أوروبا؟',
    correctAnswer: 'Real Madrid',
    options: ['Real Madrid', 'AC Milan', 'Liverpool FC', 'FC Barcelona'],
  },
  {
    id: 2, type: 'player',
    question: 'من هو الهداف التاريخي للكلاسيكو؟',
    correctAnswer: 'Lionel Messi',
    options: ['Cristiano Ronaldo', 'Lionel Messi', 'Raúl González', 'Alfredo Di Stéfano'],
  },
  {
    id: 3, type: 'history',
    question: 'في أي سنة فاز Real Madrid بأول دوري أبطال؟',
    correctAnswer: '1956',
    options: ['1956', '1960', '1966', '1950'],
  },
  {
    id: 4, type: 'coach',
    question: 'من المدرب الذي قاد FC Barcelona للثلاثية عام 2009؟',
    correctAnswer: 'Pep Guardiola',
    options: ['Pep Guardiola', 'Frank Rijkaard', 'Luis Enrique', 'Johan Cruyff'],
  },
  {
    id: 5, type: 'player',
    question: 'من اللاعب الذي سجل أكثر أهداف في تاريخ Real Madrid؟',
    correctAnswer: 'Cristiano Ronaldo',
    options: ['Cristiano Ronaldo', 'Raúl González', 'Alfredo Di Stéfano', 'Karim Benzema'],
  },
  {
    id: 6, type: 'history',
    question: 'كم مرة فاز FC Barcelona بدوري أبطال أوروبا؟',
    correctAnswer: '5',
    options: ['5', '4', '6', '3'],
  },
  {
    id: 7, type: 'player',
    question: 'من اللاعب الذي انتقل من FC Barcelona إلى Real Madrid عام 2000؟',
    correctAnswer: 'Luis Figo',
    options: ['Luis Figo', 'Ronaldo Nazário', 'Michael Laudrup', "Samuel Eto'o"],
  },
  {
    id: 8, type: 'coach',
    question: 'من المدرب الذي فاز بـ 3 دوري أبطال متتالية مع Real Madrid؟',
    correctAnswer: 'Zinedine Zidane',
    options: ['Zinedine Zidane', 'Carlo Ancelotti', 'José Mourinho', 'Vicente del Bosque'],
  },
  {
    id: 9, type: 'club',
    question: 'أي نادي يلعب في ملعب Santiago Bernabéu؟',
    correctAnswer: 'Real Madrid',
    options: ['Real Madrid', 'Atlético Madrid', 'FC Barcelona', 'Sevilla FC'],
  },
  {
    id: 10, type: 'player',
    question: 'من اللاعب الذي لعب أكثر كلاسيكو في التاريخ؟',
    correctAnswer: 'Sergio Ramos',
    options: ['Sergio Ramos', 'Lionel Messi', 'Xavi Hernández', 'Marcelo'],
  },
  {
    id: 11, type: 'history',
    question: 'ما أكبر نتيجة في تاريخ الكلاسيكو الحديث؟',
    correctAnswer: '5-0 لبرشلونة',
    options: ['5-0 لبرشلونة', '4-0 لريال مدريد', '6-2 لبرشلونة', '3-0 لريال مدريد'],
  },
  {
    id: 12, type: 'player',
    question: 'من سجل هدف الفوز في نهائي كأس الملك 2011 (كلاسيكو)؟',
    correctAnswer: 'Cristiano Ronaldo',
    options: ['Cristiano Ronaldo', 'Lionel Messi', 'Gareth Bale', 'Sergio Ramos'],
  },
];
