// بيانات المستوى 98 - الترتيب الصحيح

export interface OrderItem {
  name: string;
  value: number; // القيمة المستخدمة للترتيب
  image?: string; // رابط صورة اختياري
}

export interface OrderQuestion {
  question: string;
  type: 'clubs' | 'players';
  criteria: string; // ما يتم الترتيب حسبه
  items: OrderItem[]; // مرتبة بالترتيب الصحيح (من الأعلى للأسفل)
  unit: string; // وحدة القياس (بطولة، هدف، الخ)
}

export const level98Questions: OrderQuestion[] = [
  // أسئلة أندية
  {
    question: "رتّب هذه الأندية حسب عدد بطولات دوري الأبطال",
    type: 'clubs',
    criteria: "عدد بطولات دوري الأبطال",
    unit: "بطولة",
    items: [
      { name: "ريال مدريد", value: 15 },
      { name: "أي سي ميلان", value: 7 },
      { name: "ليفربول", value: 6 },
      { name: "برشلونة", value: 5 },
    ],
  },
  {
    question: "رتّب هذه الأندية حسب سنة التأسيس (الأقدم أولاً)",
    type: 'clubs',
    criteria: "سنة التأسيس",
    unit: "",
    items: [
      { name: "أرسنال", value: 1886 },
      { name: "ليفربول", value: 1892 },
      { name: "يوفنتوس", value: 1897 },
      { name: "ريال مدريد", value: 1902 },
    ],
  },
  {
    question: "رتّب هذه الأندية حسب عدد بطولات الدوري المحلي",
    type: 'clubs',
    criteria: "عدد بطولات الدوري",
    unit: "بطولة",
    items: [
      { name: "ريال مدريد", value: 36 },
      { name: "يوفنتوس", value: 36 },
      { name: "بايرن ميونخ", value: 33 },
      { name: "برشلونة", value: 27 },
    ],
  },
  {
    question: "رتّب هذه الأندية حسب سعة الملعب (الأكبر أولاً)",
    type: 'clubs',
    criteria: "سعة الملعب",
    unit: "متفرج",
    items: [
      { name: "برشلونة", value: 99354 },
      { name: "دورتموند", value: 81365 },
      { name: "ريال مدريد", value: 78300 },
      { name: "مانشستر يونايتد", value: 74310 },
    ],
  },
  {
    question: "رتّب هذه الأندية حسب عدد بطولات الدوري الأوروبي",
    type: 'clubs',
    criteria: "عدد بطولات الدوري الأوروبي",
    unit: "بطولة",
    items: [
      { name: "إشبيلية", value: 7 },
      { name: "إنتر ميلان", value: 3 },
      { name: "يوفنتوس", value: 3 },
      { name: "أتلتيكو مدريد", value: 3 },
    ],
  },
  // أسئلة لاعبين
  {
    question: "رتّب هؤلاء اللاعبين حسب عدد أهداف دوري الأبطال",
    type: 'players',
    criteria: "أهداف دوري الأبطال",
    unit: "هدف",
    items: [
      { name: "كريستيانو رونالدو", value: 140 },
      { name: "ليونيل ميسي", value: 129 },
      { name: "روبرت ليفاندوفسكي", value: 97 },
      { name: "كريم بنزيما", value: 90 },
    ],
  },
  {
    question: "رتّب هؤلاء اللاعبين حسب عدد الكرات الذهبية",
    type: 'players',
    criteria: "عدد الكرات الذهبية",
    unit: "كرة ذهبية",
    items: [
      { name: "ليونيل ميسي", value: 8 },
      { name: "كريستيانو رونالدو", value: 5 },
      { name: "ميشيل بلاتيني", value: 3 },
      { name: "يوهان كرويف", value: 3 },
    ],
  },
  {
    question: "رتّب هؤلاء اللاعبين حسب عدد الأهداف الدولية",
    type: 'players',
    criteria: "أهداف دولية",
    unit: "هدف",
    items: [
      { name: "كريستيانو رونالدو", value: 130 },
      { name: "ليونيل ميسي", value: 108 },
      { name: "نيمار", value: 79 },
      { name: "محمد صلاح", value: 56 },
    ],
  },
  {
    question: "رتّب هؤلاء اللاعبين حسب أغلى انتقال في التاريخ",
    type: 'players',
    criteria: "قيمة الانتقال",
    unit: "مليون €",
    items: [
      { name: "نيمار", value: 222 },
      { name: "كيليان مبابي", value: 180 },
      { name: "فيليبي كوتينيو", value: 160 },
      { name: "عثمان ديمبلي", value: 140 },
    ],
  },
  {
    question: "رتّب هؤلاء اللاعبين حسب عدد مباريات دوري الأبطال",
    type: 'players',
    criteria: "مباريات دوري الأبطال",
    unit: "مباراة",
    items: [
      { name: "كريستيانو رونالدو", value: 183 },
      { name: "ليونيل ميسي", value: 163 },
      { name: "إيكر كاسياس", value: 150 },
      { name: "كريم بنزيما", value: 148 },
    ],
  },
];
