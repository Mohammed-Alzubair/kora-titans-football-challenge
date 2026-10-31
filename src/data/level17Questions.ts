// أسئلة المستوى 17 - كلاسيكو الذهاب 🔥
// بنك أسئلة كبير لعدم التكرار

export interface Level17Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  round: number; // 1, 2, or 3
}

// بنك أسئلة الجولة 1
export const round1Questions: Level17Question[] = [
  { id: 1, round: 1, question: "من سجل هدف التعادل في نهائي دوري الأبطال 2014 لريال مدريد في الدقيقة 93؟", options: ["بنزيما", "رونالدو", "سيرخيو راموس", "بيل"], correctIndex: 2 },
  { id: 2, round: 1, question: "كم هدف سجل ميسي في نهائيات دوري الأبطال طوال مسيرته؟", options: ["6", "8", "3", "5"], correctIndex: 0 },
  { id: 3, round: 1, question: "من هو أصغر لاعب سجل في نهائي دوري الأبطال؟", options: ["مبابي", "أنسو فاتي", "باتريك كلويفرت", "رونالدو"], correctIndex: 2 },
  { id: 10, round: 1, question: "من هو أكثر لاعب حصل على بطاقات حمراء في تاريخ الكلاسيكو؟", options: ["راموس", "بيبي", "بويول", "جيرارد بيكيه"], correctIndex: 0 },
  { id: 11, round: 1, question: "كم مرة فاز ريال مدريد بدوري الأبطال؟", options: ["13", "14", "15", "12"], correctIndex: 2 },
  { id: 12, round: 1, question: "من سجل أسرع هدف في تاريخ نهائيات دوري الأبطال؟", options: ["مالديني", "رونالدو", "إيتو", "راموس"], correctIndex: 0 },
  { id: 13, round: 1, question: "من هو الحارس الأكثر مشاركة في تاريخ دوري الأبطال؟", options: ["بوفون", "كاسياس", "نوير", "تشيك"], correctIndex: 1 },
  { id: 14, round: 1, question: "أي فريق فاز بدوري الأبطال 3 مرات متتالية مؤخراً؟", options: ["بايرن ميونخ", "برشلونة", "ريال مدريد", "ليفربول"], correctIndex: 2 },
  { id: 15, round: 1, question: "من هو هداف برشلونة التاريخي في الكلاسيكو؟", options: ["ميسي", "رونالدينيو", "سواريز", "إيتو"], correctIndex: 0 },
  { id: 16, round: 1, question: "في أي سنة كانت ريمونتادا برشلونة 6-1 على باريس؟", options: ["2016", "2017", "2018", "2015"], correctIndex: 1 },
];

// بنك أسئلة الجولة 2
export const round2Questions: Level17Question[] = [
  { id: 4, round: 2, question: "في أي دقيقة سجل زيدان هدفه الشهير بالفولي في نهائي 2002؟", options: ["الدقيقة 45", "الدقيقة 35", "الدقيقة 44", "الدقيقة 38"], correctIndex: 0 },
  { id: 5, round: 2, question: "من هو الحارس الذي تصدى لـ3 ركلات ترجيح في نهائي 2005 لليفربول؟", options: ["ريينا", "دوديك", "كاسياس", "بوفون"], correctIndex: 1 },
  { id: 6, round: 2, question: "كم مرة خسر يوفنتوس نهائي دوري الأبطال منذ 1996؟", options: ["3 مرات", "5 مرات", "4 مرات", "6 مرات"], correctIndex: 1 },
  { id: 20, round: 2, question: "من سجل هاتريك في نهائي دوري الأبطال 1960؟", options: ["بوشكاش", "دي ستيفانو", "جينتو", "ريال"], correctIndex: 0 },
  { id: 21, round: 2, question: "كم عدد الأهداف في نهائي دوري الأبطال 2005 بين ليفربول وميلان؟", options: ["5", "6", "7", "8"], correctIndex: 1 },
  { id: 22, round: 2, question: "من سجل هدف الفوز لإنتر ميلان في نهائي 2010؟", options: ["ميليتو", "إيتو", "سنايدر", "ماتيراتزي"], correctIndex: 0 },
  { id: 23, round: 2, question: "أي فريق هزم بايرن 7-0 في مجموع المباراتين بنصف النهائي 2013؟", options: ["ريال مدريد", "برشلونة", "دورتموند", "تشيلسي"], correctIndex: 1 },
  { id: 24, round: 2, question: "من هو المدرب الذي فاز بدوري الأبطال مع فريقين مختلفين؟", options: ["أنشيلوتي", "مورينيو", "غوارديولا", "فيرغسون"], correctIndex: 0 },
  { id: 25, round: 2, question: "كم هدف سجل رونالدو في موسم واحد من دوري الأبطال كرقم قياسي؟", options: ["15", "17", "13", "19"], correctIndex: 1 },
  { id: 26, round: 2, question: "من الفريق الذي فاز بأول نسخة من دوري الأبطال 1956؟", options: ["ريال مدريد", "ميلان", "بنفيكا", "سلتيك"], correctIndex: 0 },
];

// بنك أسئلة الجولة 3
export const round3Questions: Level17Question[] = [
  { id: 7, round: 3, question: "من سجل أسرع هاتريك في تاريخ دوري الأبطال؟", options: ["رونالدو", "ليفاندوفسكي", "بيل", "لوكاس مورا"], correctIndex: 1 },
  { id: 8, round: 3, question: "من هو اللاعب الوحيد الذي سجل في 3 نهائيات مختلفة لدوري الأبطال؟", options: ["رونالدو", "راؤول", "دي ستيفانو", "مارسيلو"], correctIndex: 2 },
  { id: 9, round: 3, question: "كم فريق إنجليزي وصل لنهائي دوري الأبطال في نفس السنة 2019؟", options: ["1", "2", "3", "4"], correctIndex: 1 },
  { id: 30, round: 3, question: "من هو أكثر لاعب صنع أهداف في تاريخ دوري الأبطال؟", options: ["ميسي", "رونالدو", "نيمار", "دي بروين"], correctIndex: 0 },
  { id: 31, round: 3, question: "أي فريق خسر نهائي دوري الأبطال 3 مرات متتالية؟", options: ["يوفنتوس", "أتلتيكو مدريد", "لا يوجد فريق", "بايرن ميونخ"], correctIndex: 2 },
  { id: 32, round: 3, question: "من سجل هدف الفوز لتشيلسي في نهائي 2012؟", options: ["لامبارد", "دروغبا", "توريس", "ماتا"], correctIndex: 1 },
  { id: 33, round: 3, question: "كم مرة وصل أتلتيكو مدريد لنهائي دوري الأبطال وخسر أمام ريال مدريد؟", options: ["1", "2", "3", "4"], correctIndex: 1 },
  { id: 34, round: 3, question: "من هو أكبر لاعب سناً سجل في نهائي دوري الأبطال؟", options: ["مالديني", "جيغز", "توتي", "دروغبا"], correctIndex: 0 },
  { id: 35, round: 3, question: "أي مدرب وصل لنهائي دوري الأبطال 5 مرات أو أكثر؟", options: ["فيرغسون", "أنشيلوتي", "غوارديولا", "زيدان"], correctIndex: 0 },
  { id: 36, round: 3, question: "ما هو أكبر فوز في تاريخ دوري الأبطال؟", options: ["ليفربول 8-0", "ريال مدريد 8-0", "بايرن 8-2", "مانشستر يونايتد 7-1"], correctIndex: 2 },
];

// أسئلة الهدف الذهبي (بنك كبير)
export const goldenGoalQuestions: Level17Question[] = [
  { id: 99, round: 4, question: "من هو الهداف التاريخي لدوري أبطال أوروبا؟", options: ["ميسي", "رونالدو", "راؤول", "ليفاندوفسكي"], correctIndex: 1 },
  { id: 100, round: 4, question: "من سجل أسرع هدف في تاريخ نهائي دوري الأبطال (51 ثانية)؟", options: ["مالديني", "إيتو", "ميليتو", "رونالدو"], correctIndex: 0 },
  { id: 101, round: 4, question: "من هو اللاعب الوحيد الذي فاز بدوري الأبطال 6 مرات؟", options: ["جينتو", "رونالدو", "مارسيلو", "كاسياس"], correctIndex: 0 },
];

// أسئلة ركلات الترجيح (بنك كبير)
export const penaltyQuestions: Level17Question[] = [
  { id: 200, round: 5, question: "في أي سنة فاز ليفربول بدوري الأبطال بعد أن كان متأخراً 3-0؟", options: ["2003", "2005", "2007", "2001"], correctIndex: 1 },
  { id: 201, round: 5, question: "من سجل الهدف الثاني لريال مدريد في نهائي 2017 ضد يوفنتوس؟", options: ["رونالدو", "كاسيميرو", "أسينسيو", "كروس"], correctIndex: 1 },
  { id: 202, round: 5, question: "كم نهائي دوري أبطال لعب في إسطنبول؟", options: ["2", "3", "4", "5"], correctIndex: 1 },
  { id: 203, round: 5, question: "من فاز بنهائي دوري الأبطال 2021؟", options: ["مانشستر سيتي", "تشيلسي", "ليفربول", "بايرن"], correctIndex: 1 },
  { id: 204, round: 5, question: "من سجل هدف الفوز لريال مدريد في نهائي 2022؟", options: ["بنزيما", "فينيسيوس", "مودريتش", "كورتوا"], correctIndex: 1 },
  { id: 205, round: 5, question: "أي حارس حصل على جائزة أفضل لاعب في نهائي 2022؟", options: ["نوير", "كورتوا", "أليسون", "دوناروما"], correctIndex: 1 },
];

// دالة لاختيار أسئلة عشوائية بدون تكرار
export function pickRandomQuestions(pool: Level17Question[], count: number, usedIds: Set<number>): Level17Question[] {
  const available = pool.filter(q => !usedIds.has(q.id));
  const source = available.length >= count ? available : pool;
  const shuffled = [...source].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
