import ancelottiImg from '@/assets/coaches/ancelotti.jpg';
import guardiolaImg from '@/assets/coaches/guardiola.jpg';
import simeoneImg from '@/assets/coaches/simeone.jpg';
import artetaImg from '@/assets/coaches/arteta.png';
import inzaghiImg from '@/assets/coaches/inzaghi.jpg';
import flickImg from '@/assets/coaches/flick.jpg';
import slotImg from '@/assets/coaches/slot.jpg';
import kloppImg from '@/assets/coaches/klopp.jpg';
import tuchelImg from '@/assets/coaches/tuchel.jpg';
import pochettinoImg from '@/assets/coaches/pochettino.jpg';
import zidaneImg from '@/assets/players/zidane.jpg';

export interface Coach {
  id: string;
  name: string;
  nameEn: string;
  image?: string;
  clubId: string;
  clubName: string;
  clubNameEn: string;
}

const coach = (id: string, name: string, nameEn: string, clubId: string, clubName: string, clubNameEn: string, image?: string): Coach => ({
  id, name, nameEn, clubId, clubName, clubNameEn, ...(image ? { image } : {}),
});

export const coaches: Coach[] = [
  coach('ancelotti', 'كارلو أنشيلوتي', 'Carlo Ancelotti', 'real_madrid', 'ريال مدريد', 'Real Madrid', ancelottiImg),
  coach('guardiola', 'بيب غوارديولا', 'Pep Guardiola', 'manchester_city', 'مانشستر سيتي', 'Manchester City', guardiolaImg),
  coach('simeone', 'دييغو سيميوني', 'Diego Simeone', 'atletico', 'أتلتيكو مدريد', 'Atlético Madrid', simeoneImg),
  coach('arteta', 'ميكيل أرتيتا', 'Mikel Arteta', 'arsenal', 'أرسنال', 'Arsenal', artetaImg),
  coach('inzaghi', 'سيموني إنزاغي', 'Simone Inzaghi', 'inter_milan', 'إنتر ميلان', 'Inter Milan', inzaghiImg),
  coach('flick', 'هانسي فليك', 'Hansi Flick', 'barcelona', 'برشلونة', 'Barcelona', flickImg),
  coach('slot', 'آرني سلوت', 'Arne Slot', 'liverpool', 'ليفربول', 'Liverpool', slotImg),
  coach('klopp', 'يورغن كلوب', 'Jürgen Klopp', 'dortmund', 'بوروسيا دورتموند', 'Borussia Dortmund', kloppImg),
  coach('tuchel', 'توماس توخيل', 'Thomas Tuchel', 'bayern', 'بايرن ميونخ', 'Bayern Munich', tuchelImg),
  coach('pochettino', 'ماوريسيو بوكيتينو', 'Mauricio Pochettino', 'tottenham', 'توتنهام', 'Tottenham Hotspur', pochettinoImg),
  coach('zidane', 'زين الدين زيدان', 'Zinedine Zidane', 'real_madrid', 'ريال مدريد', 'Real Madrid', zidaneImg),

  // Additional managers for the club and name challenges. New profiles use a designed initials card until an approved portrait is supplied.
  coach('ferguson', 'السير أليكس فيرغسون', 'Sir Alex Ferguson', 'manchester_united', 'مانشستر يونايتد', 'Manchester United'),
  coach('wenger', 'أرسين فينغر', 'Arsène Wenger', 'arsenal', 'أرسنال', 'Arsenal'),
  coach('mourinho', 'جوزيه مورينيو', 'José Mourinho', 'chelsea', 'تشيلسي', 'Chelsea'),
  coach('ranieri', 'كلاوديو رانييري', 'Claudio Ranieri', 'chelsea', 'تشيلسي', 'Chelsea'),
  coach('del-bosque', 'فيسنتي ديل بوسكي', 'Vicente del Bosque', 'real_madrid', 'ريال مدريد', 'Real Madrid'),
  coach('capello', 'فابيو كابيلو', 'Fabio Capello', 'real_madrid', 'ريال مدريد', 'Real Madrid'),
  coach('conte', 'أنطونيو كونتي', 'Antonio Conte', 'chelsea', 'تشيلسي', 'Chelsea'),
  coach('lippi', 'مارشيلو ليبي', 'Marcello Lippi', 'juventus', 'يوفنتوس', 'Juventus'),
  coach('allegri', 'ماسيميليانو أليغري', 'Massimiliano Allegri', 'juventus', 'يوفنتوس', 'Juventus'),
  coach('sarri', 'ماوريتسيو ساري', 'Maurizio Sarri', 'juventus', 'يوفنتوس', 'Juventus'),
  coach('spalletti', 'لوتشيانو سباليتي', 'Luciano Spalletti', 'roma', 'روما', 'Roma'),
  coach('heynckes', 'يوب هاينكس', 'Jupp Heynckes', 'bayern', 'بايرن ميونخ', 'Bayern Munich'),
  coach('nagelsmann', 'يوليان ناغلسمان', 'Julian Nagelsmann', 'bayern', 'بايرن ميونخ', 'Bayern Munich'),
  coach('blanc', 'لوران بلان', 'Laurent Blanc', 'psg', 'باريس سان جيرمان', 'Paris Saint-Germain'),
  coach('galtier', 'كريستوف غالتييه', 'Christophe Galtier', 'psg', 'باريس سان جيرمان', 'Paris Saint-Germain'),
  coach('luis-enrique', 'لويس إنريكي', 'Luis Enrique', 'barcelona', 'برشلونة', 'Barcelona'),
  coach('emery', 'أوناي إيمري', 'Unai Emery', 'arsenal', 'أرسنال', 'Arsenal'),
  coach('jesus', 'جورجي جيسوس', 'Jorge Jesus', 'al_hilal', 'الهلال', 'Al Hilal'),
  coach('nuno', 'نونو إسبيريتو سانتو', 'Nuno Espírito Santo', 'al_ittihad', 'الاتحاد', 'Al Ittihad'),
  coach('ramon-diaz', 'رامون دياز', 'Ramón Díaz', 'al_hilal', 'الهلال', 'Al Hilal'),
  coach('gallardo', 'مارسيلو غاياردو', 'Marcelo Gallardo', 'al_ittihad', 'الاتحاد', 'Al Ittihad'),
  coach('pioli', 'ستيفانو بيولي', 'Stefano Pioli', 'al_nassr', 'النصر', 'Al Nassr'),
  coach('rui-vitoria', 'روي فيتوريا', 'Rui Vitória', 'al_nassr', 'النصر', 'Al Nassr'),
  coach('manuel-jose', 'مانويل جوزيه', 'Manuel José', 'al_ahly', 'الأهلي المصري', 'Al Ahly'),
  coach('mosimane', 'بيتسو موسيماني', 'Pitso Mosimane', 'al_ahly', 'الأهلي المصري', 'Al Ahly'),
  coach('koller', 'مارسيل كولر', 'Marcel Koller', 'al_ahly', 'الأهلي المصري', 'Al Ahly'),
  coach('ferreira', 'جوسفالدو فيريرا', 'Jesualdo Ferreira', 'zamalek', 'الزمالك', 'Zamalek'),
  coach('weiller', 'رينيه فايلر', 'René Weiler', 'al_ahly', 'الأهلي المصري', 'Al Ahly'),
  coach('badry', 'حسام البدري', 'Hossam El Badry', 'al_ahly', 'الأهلي المصري', 'Al Ahly'),
  coach('hossam-hassan', 'حسام حسن', 'Hossam Hassan', 'al_ahly', 'الأهلي المصري', 'Al Ahly'),
  coach('mancini', 'روبرتو مانشيني', 'Roberto Mancini', 'manchester_city', 'مانشستر سيتي', 'Manchester City'),
  coach('valverde', 'إرنستو فالفيردي', 'Ernesto Valverde', 'barcelona', 'برشلونة', 'Barcelona'),
  coach('schaaf', 'توماس شاف', 'Thomas Schaaf', 'werder', 'فيردر بريمن', 'Werder Bremen'),
  coach('houllier', 'جيرار هوييه', 'Gérard Houllier', 'lyon', 'ليون', 'Olympique Lyonnais'),
];

export function getCoachDisplayName(manager: Coach, locale: 'ar' | 'en'): string {
  return locale === 'ar' ? manager.name : manager.nameEn;
}

export function preloadCoachImages() {
  coaches.forEach((manager) => {
    if (!manager.image) return;
    const image = new Image();
    image.src = manager.image;
  });
}
