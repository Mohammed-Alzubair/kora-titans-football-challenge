import barcelonaVeryOld from '@/assets/old-logos/barcelona_very_old.jpg';
import realMadridVeryOld from '@/assets/old-logos/real_madrid_very_old.jpg';
import manchesterUnitedVeryOld from '@/assets/old-logos/manchester_united_very_old.jpg';
import psgVeryOld from '@/assets/old-logos/psg_very_old.jpg';
import atleticoVeryOld from '@/assets/old-logos/atletico_very_old.jpg';
import manchesterCityVeryOld from '@/assets/old-logos/manchester_city_very_old.jpg';
import arsenalVeryOld from '@/assets/old-logos/arsenal_very_old.jpg';
import dortmundVeryOld from '@/assets/old-logos/dortmund_very_old.jpg';
import chelseaVeryOld from '@/assets/old-logos/chelsea_very_old.jpg';
import juventusVeryOld from '@/assets/old-logos/juventus_very_old.jpg';

export interface OldLogoQuestion {
  id: string;
  clubName: string;
  correctLogo: string;
}

export const oldLogoQuestions: OldLogoQuestion[] = [
  { id: 'barcelona', clubName: 'برشلونة', correctLogo: barcelonaVeryOld },
  { id: 'real_madrid', clubName: 'ريال مدريد', correctLogo: realMadridVeryOld },
  { id: 'manchester_united', clubName: 'مانشستر يونايتد', correctLogo: manchesterUnitedVeryOld },
  { id: 'psg', clubName: 'باريس سان جيرمان', correctLogo: psgVeryOld },
  { id: 'atletico', clubName: 'أتلتيكو مدريد', correctLogo: atleticoVeryOld },
  { id: 'manchester_city', clubName: 'مانشستر سيتي', correctLogo: manchesterCityVeryOld },
  { id: 'arsenal', clubName: 'أرسنال', correctLogo: arsenalVeryOld },
  { id: 'dortmund', clubName: 'بوروسيا دورتموند', correctLogo: dortmundVeryOld },
  { id: 'chelsea', clubName: 'تشيلسي', correctLogo: chelseaVeryOld },
  { id: 'juventus', clubName: 'يوفنتوس', correctLogo: juventusVeryOld },
];

export function generateOldLogoChoices(correctQ: OldLogoQuestion) {
  const wrong = oldLogoQuestions
    .filter(q => q.id !== correctQ.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  const all = [...wrong, correctQ].sort(() => Math.random() - 0.5);
  return { options: all, correctIndex: all.findIndex(o => o.id === correctQ.id) };
}
