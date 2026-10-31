import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useStarBalance } from '@/hooks/useStarBalance';
import { Star } from 'lucide-react';
import { AdRewardButton } from '@/components/AdRewardButton';
import { RewardedAdModal } from '@/components/RewardedAdModal';
import { useI18n } from '@/i18n/I18nProvider';

export type QuestionType = 'choice' | 'text';

interface HelpBarProps {
  questionType: QuestionType;
  /** For choice: eliminate 2 wrong options. For text: reveal 2 letters */
  onHelp1: () => void;
  /** Solve current question */
  onSolve: () => void;
  /** Special solve: solve current + next question */
  onSpecialSolve: () => void;
  /** Skip entire level */
  onSkipLevel: () => void;
  /** Block re-use per question */
  help1Used?: boolean;
  solveUsed?: boolean;
  specialUsed?: boolean;
  disabled?: boolean;
  isLastLevel?: boolean;
}

const COSTS = { help1: 5, solve: 15, special: 20, skip: 30 };

interface ConfirmState {
  type: 'help1' | 'solve' | 'special' | 'skip' | null;
  message: string;
  cost: number;
}

export function HelpBar({
  questionType, onHelp1, onSolve, onSpecialSolve, onSkipLevel,
  help1Used, solveUsed, specialUsed, disabled, isLastLevel,
}: HelpBarProps) {
  const { isArabic, direction, t } = useI18n();
  const { balance, spendStars, canAfford, addStars } = useStarBalance();
  const [confirm, setConfirm] = useState<ConfirmState>({ type: null, message: '', cost: 0 });
  const [insufficientMsg, setInsufficientMsg] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const AD_REWARD = 10;

  const showConfirm = (type: ConfirmState['type'], message: string, cost: number) => {
    if (disabled) return;
    if ((type === 'help1' && help1Used) || (type === 'solve' && solveUsed) || (type === 'special' && specialUsed)) return;
    setConfirm({ type, message, cost });
  };

  const handleConfirm = () => {
    if (!confirm.type) return;
    if (!canAfford(confirm.cost)) {
      setConfirm({ type: null, message: '', cost: 0 });
      setInsufficientMsg(true);
      setTimeout(() => setInsufficientMsg(false), 2000);
      return;
    }
    const success = spendStars(confirm.cost);
    if (!success) {
      setConfirm({ type: null, message: '', cost: 0 });
      setInsufficientMsg(true);
      setTimeout(() => setInsufficientMsg(false), 2000);
      return;
    }
    const t = confirm.type;
    setConfirm({ type: null, message: '', cost: 0 });
    if (t === 'help1') onHelp1();
    else if (t === 'solve') onSolve();
    else if (t === 'special') onSpecialSolve();
    else if (t === 'skip') onSkipLevel();
  };

  const help1Label = questionType === 'choice' ? t('eliminateTwo') : t('revealLetters');
  const help1Icon = questionType === 'choice' ? '❌' : '💡';
  const makeMessage = (prefix: string, cost: number) => `${prefix} ${cost}⭐${isArabic ? '؟' : '?'}`;

  const cards = [
    { key: 'help1' as const, icon: help1Icon, label: help1Label, cost: COSTS.help1, used: help1Used, msg: makeMessage(questionType === 'choice' ? t('confirmEliminate') : t('confirmLetters'), COSTS.help1) },
    { key: 'solve' as const, icon: '✅', label: t('solveQuestion'), cost: COSTS.solve, used: solveUsed, msg: makeMessage(t('confirmSolve'), COSTS.solve) },
    { key: 'special' as const, icon: '🔥', label: t('specialAssist'), cost: COSTS.special, used: specialUsed, msg: makeMessage(t('confirmSpecial'), COSTS.special) },
  ];

  return (
    <div className="w-full max-w-lg mx-auto mt-3 space-y-2" dir={direction}>
      {/* Star balance */}
      <div className="flex justify-center">
        <div className="flex items-center gap-1.5 bg-yellow-500/20 border border-yellow-400/30 rounded-full px-4 py-1.5">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-yellow-300 font-bold text-sm">{balance}</span>
        </div>
      </div>

      {/* Help cards */}
      <div className="flex gap-2 justify-center" >
        {cards.map(c => (
          <button
            key={c.key}
            onClick={() => showConfirm(c.key, c.msg, c.cost)}
            disabled={disabled || c.used}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl border-2 transition-all active:scale-95 min-w-[70px]",
              "shadow-md backdrop-blur-sm",
              c.used
                ? "opacity-40 border-white/10 bg-black/20 cursor-not-allowed"
                : !canAfford(c.cost)
                  ? "opacity-60 border-white/10 bg-black/30 cursor-pointer"
                  : "border-yellow-400/30 bg-black/40 hover:bg-yellow-500/20 hover:border-yellow-400/50 cursor-pointer"
            )}
          >
            <span className="text-xl">{c.icon}</span>
            <span className="text-white text-xs font-bold">{c.label}</span>
            <span className="text-yellow-400 text-xs font-bold flex items-center gap-0.5">⭐ {c.cost}</span>
          </button>
        ))}
      </div>

      {/* Skip level button */}
      {!isLastLevel && (
        <button
          onClick={() => showConfirm('skip', makeMessage(t('confirmSkip'), COSTS.skip), COSTS.skip)}
          disabled={disabled}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2 rounded-xl border-2 transition-all active:scale-95",
            "shadow-md backdrop-blur-sm",
            !canAfford(COSTS.skip)
              ? "opacity-60 border-white/10 bg-black/30"
              : "border-orange-400/30 bg-black/40 hover:bg-orange-500/20 hover:border-orange-400/50"
          )}
        >
          <span className="text-lg">⏭️</span>
          <span className="text-white text-sm font-bold">{t('skipStage')}</span>
          <span className="text-yellow-400 text-sm font-bold">⭐ {COSTS.skip}</span>
        </button>
      )}

      {/* Ad reward button - shows when balance is low */}
      {balance < 15 && (
        <AdRewardButton onClick={() => setShowAdModal(true)} rewardAmount={AD_REWARD} />
      )}

      {/* Rewarded Ad Modal */}
      <RewardedAdModal
        open={showAdModal}
        rewardAmount={AD_REWARD}
        onClose={(rewarded) => {
          setShowAdModal(false);
          if (rewarded) addStars(AD_REWARD);
        }}
      />

      {/* Confirmation dialog */}
      {confirm.type && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setConfirm({ type: null, message: '', cost: 0 })}>
          <div className="bg-gray-900 border-2 border-yellow-400/40 rounded-2xl p-6 mx-4 max-w-sm text-center animate-bounce-in" onClick={e => e.stopPropagation()}>
            <p className="text-white text-lg font-bold mb-4">{confirm.message}</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-300 font-bold">{t('balance')}: {balance}</span>
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={handleConfirm} className="px-6 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold transition-all active:scale-95">{t('yes')} ✅</button>
              <button onClick={() => setConfirm({ type: null, message: '', cost: 0 })} className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all active:scale-95">{t('no')} ❌</button>
            </div>
          </div>
        </div>
      )}

      {/* Insufficient stars message */}
      {insufficientMsg && (
        <div className="fixed top-20 left-0 right-0 flex justify-center z-50 pointer-events-none">
          <div className="bg-red-500/30 border-2 border-red-400/50 backdrop-blur-sm rounded-2xl px-6 py-3 animate-bounce-in">
            <p className="text-red-300 font-bold text-lg">{t('insufficientStars')} ⭐</p>
          </div>
        </div>
      )}
    </div>
  );
}
