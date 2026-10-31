import bernabeuImg from '@/assets/stadiums/bernabeu.jpg';
import campNouImg from '@/assets/stadiums/camp_nou.jpg';
import anfieldImg from '@/assets/stadiums/anfield.jpg';
import oldTraffordImg from '@/assets/stadiums/old_trafford.jpg';
import etihadImg from '@/assets/stadiums/etihad.jpg';
import allianzImg from '@/assets/stadiums/allianz.jpg';
import sanSiroImg from '@/assets/stadiums/san_siro.jpg';
import parcDesPrincesImg from '@/assets/stadiums/parc_des_princes.jpg';
import emiratesImg from '@/assets/stadiums/emirates.jpg';
import stamfordBridgeImg from '@/assets/stadiums/stamford_bridge.jpg';
import signalIdunaImg from '@/assets/stadiums/signal_iduna.jpg';
import tottenhamStadiumImg from '@/assets/stadiums/tottenham_stadium.jpg';
import wandaImg from '@/assets/stadiums/wanda.jpg';
import maracanaImg from '@/assets/stadiums/maracana.jpg';
import wembleyImg from '@/assets/stadiums/wembley.jpg';

export interface Stadium {
  id: string;
  name: string;
  clubName: string;
  image: string;
}

export const stadiums: Stadium[] = [
  { id: 'bernabeu', name: 'سانتياغو برنابيو', clubName: 'ريال مدريد', image: bernabeuImg },
  { id: 'camp_nou', name: 'كامب نو', clubName: 'برشلونة', image: campNouImg },
  { id: 'anfield', name: 'أنفيلد', clubName: 'ليفربول', image: anfieldImg },
  { id: 'old_trafford', name: 'أولد ترافورد', clubName: 'مانشستر يونايتد', image: oldTraffordImg },
  { id: 'etihad', name: 'الاتحاد', clubName: 'مانشستر سيتي', image: etihadImg },
  { id: 'allianz', name: 'أليانز أرينا', clubName: 'بايرن ميونخ', image: allianzImg },
  { id: 'san_siro', name: 'سان سيرو', clubName: 'إيه سي ميلان / إنتر ميلان', image: sanSiroImg },
  { id: 'parc_des_princes', name: 'بارك دي برانس', clubName: 'باريس سان جيرمان', image: parcDesPrincesImg },
  { id: 'emirates', name: 'الإمارات', clubName: 'أرسنال', image: emiratesImg },
  { id: 'stamford_bridge', name: 'ستامفورد بريدج', clubName: 'تشيلسي', image: stamfordBridgeImg },
  { id: 'signal_iduna', name: 'سيغنال إيدونا بارك', clubName: 'بوروسيا دورتموند', image: signalIdunaImg },
  { id: 'tottenham_stadium', name: 'توتنهام هوتسبير', clubName: 'توتنهام', image: tottenhamStadiumImg },
  { id: 'wanda', name: 'واندا متروبوليتانو', clubName: 'أتلتيكو مدريد', image: wandaImg },
  { id: 'maracana', name: 'ماراكانا', clubName: 'البرازيل', image: maracanaImg },
  { id: 'wembley', name: 'ويمبلي', clubName: 'إنجلترا', image: wembleyImg },
];

export const STADIUM_NAMES = stadiums.map(s => s.name);
