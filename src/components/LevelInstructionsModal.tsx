import { X, Clock, Lightbulb, PlayCircle } from 'lucide-react';
import { getLevelInstruction } from '@/data/levelInstructions';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/I18nProvider';
import { getLevelDescription, getLevelTitle } from '@/i18n/levelCopy';
import { LEVEL_CONFIGS } from '@/types/levelProgression';

interface LevelInstructionsModalProps {
  levelId: number;
  stageNumber?: number;
  isOpen: boolean;
  onClose: () => void;
  onStart?: () => void;
  showStartButton?: boolean;
}

export function LevelInstructionsModal({ 
  levelId, 
  stageNumber = levelId,
  isOpen, 
  onClose,
  onStart,
  showStartButton = false
}: LevelInstructionsModalProps) {
  const { locale, direction, t } = useI18n();
  const instruction = getLevelInstruction(levelId);
  
  if (!isOpen || !instruction) return null;

  const handleStart = () => {
    onClose();
    onStart?.();
  };

  const config = LEVEL_CONFIGS.find((level) => level.id === levelId);
  const title = getLevelTitle(levelId, instruction.title, locale);
  const description = getLevelDescription(levelId, config?.description ?? instruction.description, locale);
  const howToPlay = locale === 'ar'
    ? instruction.howToPlay
    : levelId >= 46 && levelId <= 65
      ? ['Ask yes-or-no questions to narrow down the hidden answer.', 'Use the clue when it becomes available.', 'Make your final guess before you run out of attempts.']
      : levelId >= 66 && levelId <= 75
        ? ['Read the category carefully.', 'Enter as many valid answers as you can before time runs out.', 'Avoid repeating an answer.']
        : levelId >= 76 && levelId <= 85
          ? ['Read the prompt and choose how many answers you can name.', 'The timer starts after your bid.', 'Submit valid answers before time runs out.']
          : levelId >= 86 && levelId <= 95
            ? ['Read the question and watch for the bell.', 'Press the bell to remove two incorrect choices.', 'Choose your answer before time expires.']
            : ['Read the question and use its clues.', 'Choose or enter the answer before time runs out.', 'Use a hint if you need help.'];
  const tips = locale === 'ar'
    ? instruction.tips
    : ['Look for the competition, country and time period in the question.', 'Use hints strategically and keep an eye on the timer.'];
  const timeLimit = locale === 'ar'
    ? instruction.timeLimit
    : instruction.timeLimit.includes('بدون وقت')
      ? 'Untimed'
      : instruction.timeLimit.replace(/\d+/g, (number) => number).replace('ثوانٍ لكل سؤال', 'seconds per question').replace('ثانية لكل سؤال', 'seconds per question').replace('ثواني لكل سؤال', 'seconds per question').replace('ثانية لكل جولة', 'seconds per round').replace('ثانية فقط لكل سؤال', 'seconds per question').replace('ثوانٍ', 'seconds').replace('ثانية', 'seconds').replace('دقيقة', 'minutes');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" dir={direction}>
      <div className="bg-gradient-to-b from-card to-card/95 border-2 border-primary/50 rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto animate-bounce-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 ${direction === 'rtl' ? 'left-4' : 'right-4'} w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-all`}
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">{instruction.emoji}</div>
          <h2 className="text-2xl font-black text-primary mb-1">
            {t('level')} {stageNumber}
          </h2>
          <h3 className="text-xl font-bold text-foreground">
            {title}
          </h3>
          <p className="text-muted-foreground mt-2">
            {description}
          </p>
        </div>

        {/* Time limit */}
        {instruction.timeLimit && (
          <div className="flex items-center justify-center gap-2 mb-4 p-3 bg-primary/10 rounded-xl border border-primary/30">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-bold text-primary"><span className="opacity-70">{t('timeLimit')}: </span>{timeLimit}</span>
          </div>
        )}

        {/* How to play */}
        <div className="mb-4">
          <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-primary" />
            {t('howToPlay')}:
          </h4>
          <ul className="space-y-2">
            {howToPlay.map((step, index) => (
              <li 
                key={index}
                className="flex items-start gap-2 text-muted-foreground"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tips */}
        <div className="mb-6">
          <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            {t('tips')}:
          </h4>
          <ul className="space-y-1">
            {tips.map((tip, index) => (
              <li 
                key={index}
                className="flex items-center gap-2 text-muted-foreground text-sm"
              >
                <span className="text-primary">💡</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          {showStartButton ? (
            <>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-xl bg-muted text-foreground font-bold hover:bg-muted/80 transition-all"
              >
                {t('close')}
              </button>
              <button
                onClick={handleStart}
                className="flex-1 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-5 h-5" />
                {t('start')}!
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all"
            >
              {t('understood')}! 👍
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
