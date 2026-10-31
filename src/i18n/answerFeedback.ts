import type { Locale } from './I18nProvider';

export type FeedbackContext = 'club' | 'worldCup';

export function getAnswerFeedback(
  locale: Locale,
  isCorrect: boolean,
  correctAnswer: string,
  context: FeedbackContext = 'club',
) {
  if (context === 'worldCup') {
    return isCorrect
      ? locale === 'ar'
        ? { title: 'لمسة من ذهب!', detail: 'قراءة ممتازة لتاريخ المونديال.' }
        : { title: 'A golden touch!', detail: 'A brilliant read of World Cup history.' }
      : locale === 'ar'
        ? { title: 'هذه المرة لم تصب الهدف', detail: `الإجابة الصحيحة: ${correctAnswer}` }
        : { title: 'Not this time', detail: `The answer was ${correctAnswer}.` };
  }

  return isCorrect
    ? locale === 'ar'
      ? { title: 'هدف في الزاوية!', detail: 'عرفت الشعار واخترت النادي الصحيح.' }
      : { title: 'Top-corner finish!', detail: 'You read the crest and picked the right club.' }
    : locale === 'ar'
      ? { title: 'خارج المرمى هذه المرة', detail: `النادي الصحيح هو ${correctAnswer}. ركّز على الشعار التالي!` }
      : { title: 'Off target this time', detail: `The right club is ${correctAnswer}. Reset and read the next crest.` };
}
