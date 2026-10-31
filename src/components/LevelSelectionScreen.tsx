import { LevelResult } from '@/types/levelProgression';
import { useState } from 'react';
import { Lock, Star, Trophy, Info, Crown, Flame, ArrowRight } from 'lucide-react';
import { useLevelProgression } from '@/hooks/useLevelProgression';
import { ORDERED_LEVEL_CONFIGS, getStageNumber } from '@/types/levelProgression';
import { StarRating } from './StarRating';
import { LevelInstructionsModal } from './LevelInstructionsModal';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n/I18nProvider';
import { getLevelDescription, getLevelTitle } from '@/i18n/levelCopy';

import cardLava from '@/assets/card-lava.jpg';
import cardMoss from '@/assets/card-moss.jpg';
import cardLegendary from '@/assets/card-legendary.jpg';
import cardLocked from '@/assets/card-locked.jpg';
import badgeRuby from '@/assets/badge-ruby.png';
import mapArena from '@/assets/level-map-arena-v2.png';

interface LevelSelectionScreenProps {
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
}

export function LevelSelectionScreen({ onSelectLevel, onBack }: LevelSelectionScreenProps) {
  const { locale, direction, t } = useI18n();
  const { 
    isLevelUnlocked, 
    getStarsForLevel, 
    totalStars, 
    maxPossibleStars,
    levelsLocked 
  } = useLevelProgression();

  const [selectedLevelForInfo, setSelectedLevelForInfo] = useState<number | null>(null);

  const handleLevelClick = (levelId: number, unlocked: boolean) => {
    if (unlocked) {
      setSelectedLevelForInfo(levelId);
    }
  };

  const handleStartLevel = () => {
    if (selectedLevelForInfo) {
      onSelectLevel(selectedLevelForInfo);
    }
  };

  const getCardBackground = (stars: number, unlocked: boolean) => {
    if (!unlocked) return cardLocked;
    if (stars >= 5) return cardLegendary;
    if (stars >= 3) return cardMoss;
    return cardLava;
  };

  const getStarColor = (stars: number, unlocked: boolean) => {
    if (!unlocked) return 'text-gray-600';
    if (stars >= 5) return 'text-yellow-400';
    if (stars >= 3) return 'text-emerald-400';
    return 'text-orange-400';
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center relative overflow-hidden"
      dir={direction}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(2,6,23,.72), rgba(2,6,23,.82)), url(${mapArena})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="pointer-events-none absolute -left-24 top-16 h-80 w-80 rounded-full bg-cyan-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-amber-500/10 blur-[110px]" />

      {/* Header */}
      <div className="relative z-10 text-center mb-4 mt-4 w-full max-w-2xl px-4">
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute right-4 top-0 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-amber-600/40 flex items-center justify-center active:scale-90 transition-transform z-20"
        >
          <ArrowRight className="w-5 h-5 text-amber-300" />
        </button>
        <p className="mb-2 text-[10px] font-black uppercase tracking-[.28em] text-cyan-100/80">{t('brand')}</p>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
          <h1 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-orange-400 to-red-500 drop-shadow-lg"
            style={{ textShadow: '0 0 20px rgba(255,150,0,0.5)' }}
          >
            {t('levelMap')}
          </h1>
          <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
        </div>
        
        {/* Total Stars Badge */}
        <div className="relative rounded-2xl overflow-hidden mx-auto max-w-xs border-2 border-yellow-600/50"
          style={{
            backgroundImage: `url(${cardLava})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="flex items-center justify-center gap-3 relative z-10 p-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                backgroundImage: `url(${badgeRuby})`,
                backgroundSize: 'cover',
              }}
            >
              <Trophy className="w-4 h-4 text-yellow-300" />
            </div>
            <div className="text-center">
              <span className="text-xl font-black text-yellow-300 drop-shadow-lg">
                {totalStars} / {maxPossibleStars}
              </span>
              <p className="text-gray-300 text-xs">
                {t('collectedStars')}
              </p>
            </div>
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-lg" />
          </div>
        </div>
      </div>

      {/* Levels Grid */}
      <div className="relative z-10 w-full max-w-2xl space-y-3 pb-4 px-3">
        {ORDERED_LEVEL_CONFIGS.map((level) => {
          const unlocked = isLevelUnlocked(level.id);
          const stars = getStarsForLevel(level.id);
          const bgImage = getCardBackground(stars, unlocked);
          
          return (
            <button
              key={level.id}
              onClick={() => handleLevelClick(level.id, unlocked)}
              disabled={!unlocked}
              className={cn(
                "w-full relative overflow-hidden rounded-2xl transition-all duration-300 group",
                unlocked ? "cursor-pointer active:scale-[0.98]" : "cursor-not-allowed opacity-80",
                unlocked && "hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,150,0,0.3)]",
              )}
              style={{ minHeight: '100px' }}
            >
              {/* Background Image */}
              <img
                src={bgImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              
              {/* Dark overlay for readability */}
              <div className={cn(
                "absolute inset-0",
                unlocked ? "bg-black/30" : "bg-black/60"
              )} />

              {/* Content */}
              <div className="relative z-10 flex items-center gap-3 p-4 text-start">
                
                {/* Level Badge - Ruby gem style */}
                <div className="relative shrink-0">
                  <div 
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                    style={{
                      backgroundImage: `url(${badgeRuby})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {unlocked ? (
                      <span className="text-lg md:text-xl font-black text-white drop-shadow-lg">
                        {getStageNumber(level.id)}
                      </span>
                    ) : (
                      <Lock className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  {stars >= 5 && (
                    <Crown className="absolute -top-2 -right-1 w-5 h-5 text-yellow-400 drop-shadow-lg" 
                      style={{ filter: 'drop-shadow(0 0 4px rgba(255,200,0,0.8))' }}
                    />
                  )}
                </div>

                {/* Level Info */}
                <div className="flex-1 min-w-0">
                  <h3 className={cn(
                    "text-base md:text-lg font-black truncate drop-shadow-lg",
                    unlocked ? "text-white" : "text-gray-400"
                  )}>
                    {getLevelTitle(level.id, level.name, locale)}
                  </h3>
                  <p className={cn(
                    "text-xs truncate",
                    unlocked ? "text-gray-200" : "text-gray-500"
                  )}>
                    {getLevelDescription(level.id, level.description, locale)}
                  </p>
                </div>

                {/* Stars & Info */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  {/* Info button */}
                  {unlocked && (
                    <Info className="w-4 h-4 text-yellow-400/70" />
                  )}
                  
                  {/* Stars display */}
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={cn(
                          "w-3.5 h-3.5 drop-shadow",
                          s <= stars
                            ? `${getStarColor(stars, unlocked)} fill-current`
                            : "text-gray-600"
                        )}
                      />
                    ))}
                  </div>
                  
                  {!unlocked && levelsLocked && (
                    <span className="text-[9px] text-gray-500 whitespace-nowrap">
                      🔒 {t('lockedWith')}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom glow line */}
              {unlocked && (
                <div className={cn(
                  "absolute bottom-0 left-0 right-0 h-1",
                  stars >= 5 
                    ? "bg-gradient-to-r from-red-600 via-yellow-500 to-red-600" 
                    : stars >= 3
                    ? "bg-gradient-to-r from-emerald-700 via-emerald-400 to-emerald-700"
                    : "bg-gradient-to-r from-orange-700 via-orange-400 to-orange-700"
                )}
                  style={{ 
                    backgroundSize: '200% 100%',
                    animation: 'lava-flow 3s linear infinite',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="relative z-10 mt-4 mb-6 overflow-hidden rounded-2xl border-2 border-yellow-600/50 px-8 py-3 font-bold text-white transition-all hover:scale-105 hover:border-yellow-500"
        style={{
          backgroundImage: `url(${cardLava})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <span className="relative z-10 drop-shadow-lg">🔙 {t('backHome')}</span>
      </button>

      {/* Dev Mode Notice */}
      {!levelsLocked && (
        <div className="relative z-10 mb-4 px-4 py-2 bg-orange-900/60 border border-orange-500/50 rounded-lg backdrop-blur-sm">
          <p className="text-orange-300 text-sm text-center">
            ⚠️ {t('developmentMode')}
          </p>
        </div>
      )}

      {/* Level Instructions Modal */}
      <LevelInstructionsModal
        levelId={selectedLevelForInfo || 1}
        stageNumber={selectedLevelForInfo ? getStageNumber(selectedLevelForInfo) : 1}
        isOpen={selectedLevelForInfo !== null}
        onClose={() => setSelectedLevelForInfo(null)}
        onStart={handleStartLevel}
        showStartButton={true}
      />
    </div>
  );
}
