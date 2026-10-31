import { useState } from 'react';
import { Pause, Play, LogOut, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/I18nProvider';

interface GameControlsProps {
  onExit: () => void;
  onPause?: () => void;
  onResume?: () => void;
  isPaused?: boolean;
  showPause?: boolean;
}

export function GameControls({ 
  onExit, 
  onPause, 
  onResume, 
  isPaused = false,
  showPause = true 
}: GameControlsProps) {
  const { direction, t } = useI18n();
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const handleExitClick = () => {
    setShowExitConfirm(true);
    onPause?.();
  };

  const handleConfirmExit = () => {
    setShowExitConfirm(false);
    onExit();
  };

  const handleCancelExit = () => {
    setShowExitConfirm(false);
    onResume?.();
  };

  const handlePauseToggle = () => {
    if (isPaused) {
      onResume?.();
    } else {
      onPause?.();
    }
  };

  return (
    <>
      {/* Control Buttons */}
      <div className={`fixed top-4 z-50 flex gap-2 ${direction === 'rtl' ? 'right-4' : 'left-4'}`}>
        {showPause && (
          <button
            onClick={handlePauseToggle}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all",
              "bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-black/70",
              isPaused && "bg-primary/50 border-primary"
            )}
            title={isPaused ? t('resume') : t('pause')}
          >
            {isPaused ? (
              <Play className="w-5 h-5 text-white" />
            ) : (
              <Pause className="w-5 h-5 text-white" />
            )}
          </button>
        )}
        
        <button
          onClick={handleExitClick}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-destructive/50 hover:border-destructive"
          title={t('exit')}
        >
          <LogOut className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-card border-2 border-primary/50 rounded-2xl p-6 max-w-sm mx-4 animate-bounce-in">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
                <LogOut className="w-8 h-8 text-destructive" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t('exitGameQuestion')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('progressLost')}
              </p>
              
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleCancelExit}
                  className="px-6 py-2 rounded-xl bg-muted text-foreground font-bold hover:bg-muted/80 transition-all flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  {t('cancel')}
                </button>
                <button
                  onClick={handleConfirmExit}
                  className="px-6 py-2 rounded-xl bg-destructive text-destructive-foreground font-bold hover:bg-destructive/80 transition-all flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  {t('exit')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pause Overlay */}
      {isPaused && !showExitConfirm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="text-center animate-bounce-in">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
              <Pause className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{t('gamePaused')}</h3>
            <p className="text-muted-foreground mb-4">{t('pressToResume')} ▶️</p>
            <button
              onClick={handlePauseToggle}
              className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all flex items-center gap-2 mx-auto"
            >
              <Play className="w-5 h-5" />
              {t('resume')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
