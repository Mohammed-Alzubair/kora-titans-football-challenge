import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/I18nProvider';

interface AdRewardButtonProps {
  onClick: () => void;
  disabled?: boolean;
  rewardAmount?: number;
}

export function AdRewardButton({ onClick, disabled, rewardAmount = 10 }: AdRewardButtonProps) {
  const { t } = useI18n();
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 transition-all active:scale-95",
        "shadow-md backdrop-blur-sm",
        disabled
          ? "opacity-40 border-white/10 bg-black/20 cursor-not-allowed"
          : "border-emerald-400/30 bg-black/40 hover:bg-emerald-500/20 hover:border-emerald-400/50 cursor-pointer"
      )}
    >
      <span className="text-lg">🎬</span>
      <span className="text-white text-sm font-bold">{t('watchAd')}</span>
      <span className="text-yellow-400 text-sm font-bold">+{rewardAmount}⭐</span>
    </button>
  );
}
