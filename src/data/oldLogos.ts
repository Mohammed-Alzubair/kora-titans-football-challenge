import realMadridOld from '@/assets/old-logos/real_madrid_old.png';
import realMadrid1910Old from '@/assets/old-logos/real_madrid_1910_old.png';
import barcelonaOld from '@/assets/old-logos/barcelona_old.png';
import liverpoolOld from '@/assets/old-logos/liverpool_old.png';
import manchesterUnitedOld from '@/assets/old-logos/manchester_united_old.png';
import manchesterCityOld from '@/assets/old-logos/manchester_city_old.png';
import arsenalOld from '@/assets/old-logos/arsenal_old.png';
import acMilanOld from '@/assets/old-logos/ac_milan_old.png';
import interOld from '@/assets/old-logos/inter_old.png';
import dortmundOld from '@/assets/old-logos/dortmund_old.png';
import tottenhamOld from '@/assets/old-logos/tottenham_old.png';
import bayernOld from '@/assets/old-logos/bayern_old.png';
import chelseaOld from '@/assets/old-logos/chelsea_old.png';
import psgOld from '@/assets/old-logos/psg_old.png';
import ajaxOld from '@/assets/old-logos/ajax_old.png';

export interface OldLogoClub {
  id: string;
  name: string;
  oldLogo: string;
}

export const oldLogoClubs: OldLogoClub[] = [
  { id: 'real_madrid', name: 'ريال مدريد', oldLogo: realMadridOld },
  { id: 'real_madrid_1910', name: 'ريال مدريد 1910', oldLogo: realMadrid1910Old },
  { id: 'barcelona', name: 'برشلونة', oldLogo: barcelonaOld },
  { id: 'liverpool', name: 'ليفربول', oldLogo: liverpoolOld },
  { id: 'manchester_united', name: 'مانشستر يونايتد', oldLogo: manchesterUnitedOld },
  { id: 'manchester_city', name: 'مانشستر سيتي', oldLogo: manchesterCityOld },
  { id: 'arsenal', name: 'أرسنال', oldLogo: arsenalOld },
  { id: 'ac_milan', name: 'ميلان', oldLogo: acMilanOld },
  { id: 'inter', name: 'إنتر ميلان', oldLogo: interOld },
  { id: 'dortmund', name: 'بوروسيا دورتموند', oldLogo: dortmundOld },
  { id: 'tottenham', name: 'توتنهام', oldLogo: tottenhamOld },
  { id: 'bayern', name: 'بايرن ميونخ', oldLogo: bayernOld },
  { id: 'chelsea', name: 'تشيلسي', oldLogo: chelseaOld },
  { id: 'psg', name: 'باريس سان جيرمان', oldLogo: psgOld },
  { id: 'ajax', name: 'أياكس', oldLogo: ajaxOld },
];

export function generateOldLogoQuestion(usedIds: string[]): {
  correctClub: OldLogoClub;
  options: OldLogoClub[];
} {
  const available = oldLogoClubs.filter(c => !usedIds.includes(c.id));
  const pool = available.length >= 1 ? available : oldLogoClubs;
  
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const correctClub = shuffled[0];
  
  // Get 3 wrong options
  const wrongOptions = oldLogoClubs
    .filter(c => c.id !== correctClub.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  const options = [...wrongOptions, correctClub].sort(() => Math.random() - 0.5);
  
  return { correctClub, options };
}

// Preload old logo images
export function preloadOldLogos() {
  oldLogoClubs.forEach(club => {
    const img = new Image();
    img.src = club.oldLogo;
  });
}
