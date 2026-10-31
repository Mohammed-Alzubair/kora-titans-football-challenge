// بيانات المستوى 99 - المستوى النهائي: ابنِ فريقك

export interface PlayerCard {
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  tier: 'star' | 'good' | 'young';
  cost: number;
  attack: number;
  defense: number;
  label: string;
}

export interface Formation {
  id: string;
  label: string;
  slots: { position: 'GK' | 'DEF' | 'MID' | 'FWD'; count: number }[];
}

export interface PlayStyle {
  id: 'attacking' | 'defensive' | 'counter';
  label: string;
  emoji: string;
  attackBonus: number;
  defenseBonus: number;
}

export interface Scenario {
  situation: string;
  options: { text: string; score: number }[];
  bestFor: 'attacking' | 'defensive' | 'counter';
}

export const DEFAULT_BUDGET = 200;

export const FORMATIONS: Formation[] = [
  { id: '4-3-3', label: '4-3-3', slots: [{ position: 'GK', count: 1 }, { position: 'DEF', count: 4 }, { position: 'MID', count: 3 }, { position: 'FWD', count: 3 }] },
  { id: '4-4-2', label: '4-4-2', slots: [{ position: 'GK', count: 1 }, { position: 'DEF', count: 4 }, { position: 'MID', count: 4 }, { position: 'FWD', count: 2 }] },
  { id: '3-5-2', label: '3-5-2', slots: [{ position: 'GK', count: 1 }, { position: 'DEF', count: 3 }, { position: 'MID', count: 5 }, { position: 'FWD', count: 2 }] },
];

export const PLAY_STYLES: PlayStyle[] = [
  { id: 'attacking', label: 'هجومي', emoji: '⚔️', attackBonus: 20, defenseBonus: -10 },
  { id: 'defensive', label: 'دفاعي', emoji: '🛡️', attackBonus: -10, defenseBonus: 20 },
  { id: 'counter', label: 'مرتدات', emoji: '⚡', attackBonus: 10, defenseBonus: 10 },
];

export const AVAILABLE_PLAYERS: PlayerCard[] = [
  // حراس
  { name: 'كورتوا', position: 'GK', tier: 'star', cost: 50, attack: 5, defense: 95, label: '⭐ نجم عالمي' },
  { name: 'تير شتيغن', position: 'GK', tier: 'good', cost: 25, attack: 5, defense: 80, label: '✅ لاعب جيد' },
  { name: 'حارس شاب', position: 'GK', tier: 'young', cost: 10, attack: 5, defense: 60, label: '🌱 موهبة' },

  // مدافعين
  { name: 'راموس', position: 'DEF', tier: 'star', cost: 50, attack: 40, defense: 90, label: '⭐ نجم عالمي' },
  { name: 'مالديني', position: 'DEF', tier: 'star', cost: 50, attack: 30, defense: 95, label: '⭐ نجم عالمي' },
  { name: 'بيبي', position: 'DEF', tier: 'good', cost: 25, attack: 30, defense: 80, label: '✅ لاعب جيد' },
  { name: 'مارسيلو', position: 'DEF', tier: 'good', cost: 25, attack: 55, defense: 70, label: '✅ لاعب جيد' },
  { name: 'مدافع شاب ١', position: 'DEF', tier: 'young', cost: 10, attack: 20, defense: 55, label: '🌱 موهبة' },
  { name: 'مدافع شاب ٢', position: 'DEF', tier: 'young', cost: 10, attack: 25, defense: 50, label: '🌱 موهبة' },
  { name: 'مدافع شاب ٣', position: 'DEF', tier: 'young', cost: 10, attack: 15, defense: 58, label: '🌱 موهبة' },

  // لاعبي وسط
  { name: 'كروس', position: 'MID', tier: 'star', cost: 50, attack: 70, defense: 60, label: '⭐ نجم عالمي' },
  { name: 'بيدري', position: 'MID', tier: 'star', cost: 50, attack: 75, defense: 55, label: '⭐ نجم عالمي' },
  { name: 'مودريتش', position: 'MID', tier: 'good', cost: 25, attack: 65, defense: 60, label: '✅ لاعب جيد' },
  { name: 'فودن', position: 'MID', tier: 'good', cost: 25, attack: 70, defense: 45, label: '✅ لاعب جيد' },
  { name: 'أوزيل', position: 'MID', tier: 'good', cost: 25, attack: 72, defense: 35, label: '✅ لاعب جيد' },
  { name: 'لاعب وسط شاب ١', position: 'MID', tier: 'young', cost: 10, attack: 50, defense: 40, label: '🌱 موهبة' },
  { name: 'لاعب وسط شاب ٢', position: 'MID', tier: 'young', cost: 10, attack: 45, defense: 45, label: '🌱 موهبة' },
  { name: 'لاعب وسط شاب ٣', position: 'MID', tier: 'young', cost: 10, attack: 55, defense: 35, label: '🌱 موهبة' },

  // مهاجمين
  { name: 'رونالدو', position: 'FWD', tier: 'star', cost: 50, attack: 95, defense: 20, label: '⭐ نجم عالمي' },
  { name: 'ميسي', position: 'FWD', tier: 'star', cost: 50, attack: 95, defense: 25, label: '⭐ نجم عالمي' },
  { name: 'مبابي', position: 'FWD', tier: 'star', cost: 50, attack: 92, defense: 20, label: '⭐ نجم عالمي' },
  { name: 'هالاند', position: 'FWD', tier: 'good', cost: 25, attack: 85, defense: 15, label: '✅ لاعب جيد' },
  { name: 'سواريز', position: 'FWD', tier: 'good', cost: 25, attack: 82, defense: 30, label: '✅ لاعب جيد' },
  { name: 'لامين يامال', position: 'FWD', tier: 'good', cost: 25, attack: 78, defense: 25, label: '✅ لاعب جيد' },
  { name: 'مهاجم شاب ١', position: 'FWD', tier: 'young', cost: 10, attack: 55, defense: 10, label: '🌱 موهبة' },
  { name: 'مهاجم شاب ٢', position: 'FWD', tier: 'young', cost: 10, attack: 60, defense: 10, label: '🌱 موهبة' },
];

export const SCENARIOS: Scenario[] = [
  {
    situation: 'أنت متأخر 1-0 في الدقيقة 75، ماذا تفعل؟',
    options: [
      { text: 'أدخل مهاجم بدل مدافع وأهاجم بكل قوة', score: 3 },
      { text: 'أحافظ على التشكيلة وألعب بصبر', score: 1 },
      { text: 'أغير أسلوب اللعب للمرتدات السريعة', score: 2 },
    ],
    bestFor: 'attacking',
  },
  {
    situation: 'الخصم يضغط بقوة من الأجنحة، كيف تتصرف؟',
    options: [
      { text: 'أسحب لاعبي الوسط للخلف لتغطية الأجنحة', score: 3 },
      { text: 'أهاجم من الجهة المقابلة', score: 2 },
      { text: 'أبقى على نفس الخطة', score: 0 },
    ],
    bestFor: 'defensive',
  },
  {
    situation: 'تتقدم 2-1 في نصف ساعة الأخيرة، ما خطتك؟',
    options: [
      { text: 'أدافع بعمق وأنتظر المرتدات', score: 3 },
      { text: 'أستمر بالهجوم لتسجيل الثالث', score: 1 },
      { text: 'أبدل لاعب وسط بمدافع', score: 2 },
    ],
    bestFor: 'counter',
  },
  {
    situation: 'حارسك أصيب والبديل ضعيف، ماذا تختار؟',
    options: [
      { text: 'ألعب دفاعياً لتقليل الفرص عليه', score: 3 },
      { text: 'أهاجم بقوة حتى لا يصل الكرة للحارس', score: 2 },
      { text: 'لا أغير شيئاً', score: 0 },
    ],
    bestFor: 'defensive',
  },
  {
    situation: 'المباراة 0-0 وأنت تلعب ضد فريق دفاعي جداً، ماذا تفعل؟',
    options: [
      { text: 'أغير التشكيلة لـ 3 مهاجمين', score: 3 },
      { text: 'ألعب كرات طويلة', score: 1 },
      { text: 'أصبر وأنتظر فرصة من مرتدة', score: 2 },
    ],
    bestFor: 'attacking',
  },
];

export const OPPONENT_NAMES = [
  'الخصم الذكي 🤖',
  'المحلل التكتيكي 🧠',
  'المدرب الآلي ⚙️',
  'الاستراتيجي 📊',
];

export function generateOpponent(
  playerFormation: string,
  playerStyle: PlayStyle,
  playerTeamAttack: number,
  playerTeamDefense: number
) {
  // Counter logic
  const opponentStyle = playerStyle.id === 'attacking' ? 'دفاعي 🛡️'
    : playerStyle.id === 'defensive' ? 'هجومي ⚔️' : 'مرتدات ⚡';

  const opponentFormation = playerFormation === '4-3-3' ? '5-4-1'
    : playerFormation === '3-5-2' ? '4-4-2' : '4-5-1';

  const opponentAttack = Math.round(playerTeamDefense * 0.9 + Math.random() * 10);
  const opponentDefense = Math.round(playerTeamAttack * 0.9 + Math.random() * 10);

  const name = OPPONENT_NAMES[Math.floor(Math.random() * OPPONENT_NAMES.length)];

  return { name, formation: opponentFormation, style: opponentStyle, attack: opponentAttack, defense: opponentDefense };
}
