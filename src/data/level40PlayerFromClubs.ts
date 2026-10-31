export interface PlayerFromClubsQuestion {
  id: number;
  clubs: string[];
  correctPlayer: string;
  options: string[];
}

export const playerFromClubsQuestions: PlayerFromClubsQuestion[] = [
  { id: 1, clubs: ['Ajax', 'Juventus', 'FC Barcelona', 'AC Milan'], correctPlayer: 'زلاتان إبراهيموفيتش', options: ['زلاتان إبراهيموفيتش', 'تييري هنري', 'صامويل إيتو', 'ديفيد بيكهام'] },
  { id: 2, clubs: ['Manchester United', 'Real Madrid', 'LA Galaxy', 'PSG'], correctPlayer: 'ديفيد بيكهام', options: ['ديفيد بيكهام', 'كريستيانو رونالدو', 'أنخيل دي ماريا', 'واين روني'] },
  { id: 3, clubs: ['Monaco', 'Arsenal', 'FC Barcelona', 'New York Red Bulls'], correctPlayer: 'تييري هنري', options: ['تييري هنري', 'روبرت بيريس', 'باتريك فييرا', 'نيكولا أنيلكا'] },
  { id: 4, clubs: ['RCD Mallorca', 'FC Barcelona', 'Inter Milan', 'Chelsea'], correctPlayer: 'صامويل إيتو', options: ['صامويل إيتو', 'ديدييه دروغبا', 'رونالدينيو', 'زلاتان إبراهيموفيتش'] },
  { id: 5, clubs: ['São Paulo', 'AC Milan', 'Real Madrid', 'Orlando City'], correctPlayer: 'كاكا', options: ['كاكا', 'رونالدينيو', 'روبينيو', 'ريفالدو'] },
  { id: 6, clubs: ['Santos', 'FC Barcelona', 'PSG', 'Al-Hilal'], correctPlayer: 'نيمار', options: ['نيمار', 'رونالدينيو', 'ميسي', 'فينيسيوس جونيور'] },
  { id: 7, clubs: ['Sporting', 'Manchester United', 'Real Madrid', 'Juventus'], correctPlayer: 'كريستيانو رونالدو', options: ['كريستيانو رونالدو', 'لويس فيغو', 'واين روني', 'ديفيد بيكهام'] },
  { id: 8, clubs: ['Grêmio', 'PSG', 'FC Barcelona', 'AC Milan'], correctPlayer: 'رونالدينيو', options: ['رونالدينيو', 'ريفالدو', 'كاكا', 'نيمار'] },
  { id: 9, clubs: ['Sevilla', 'Real Madrid', 'PSG'], correctPlayer: 'سيرجيو راموس', options: ['سيرجيو راموس', 'جيرارد بيكيه', 'رافائيل فاران', 'بيبي'] },
  { id: 10, clubs: ['Schalke', 'Werder Bremen', 'Real Madrid', 'Arsenal'], correctPlayer: 'مسعود أوزيل', options: ['مسعود أوزيل', 'توني كروس', 'سامي خضيرة', 'ماركو رويس'] },
  { id: 11, clubs: ['Nacional', 'Ajax', 'Liverpool', 'FC Barcelona'], correctPlayer: 'لويس سواريز', options: ['لويس سواريز', 'ديرك كويت', 'فيرناندو توريس', 'روبن فان بيرسي'] },
  { id: 12, clubs: ['Boca Juniors', 'FC Barcelona', 'Napoli', 'Sevilla'], correctPlayer: 'دييغو مارادونا', options: ['دييغو مارادونا', 'ليونيل ميسي', 'غابرييل باتيستوتا', 'خوان ريكيلمي'] },
  { id: 13, clubs: ['Basel', 'Chelsea', 'Roma', 'Liverpool'], correctPlayer: 'محمد صلاح', options: ['محمد صلاح', 'إيدين هازار', 'ساديو ماني', 'فرانشيسكو توتي'] },
  { id: 14, clubs: ['Chelsea', 'Real Madrid', 'Bayern Munich', 'Arsenal'], correctPlayer: 'مسعود أوزيل', options: ['تيبو كورتوا', 'مسعود أوزيل', 'إيدين هازار', 'توني كروس'] },
  { id: 15, clubs: ['Bordeaux', 'Juventus', 'Real Madrid'], correctPlayer: 'زين الدين زيدان', options: ['زين الدين زيدان', 'تييري هنري', 'ديفيد تريزيغيه', 'باتريك فييرا'] },
];
