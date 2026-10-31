import { useState, useCallback, useMemo } from 'react';
import {
  GameProgress,
  LevelProgress,
  LevelResult,
  LEVEL_CONFIGS,
  ORDERED_LEVEL_CONFIGS,
  getNextLevelId,
  LEVELS_LOCKED,
  STARS_TO_UNLOCK,
} from '@/types/levelProgression';

const STORAGE_KEY = 'game_progress';

// Initialize default progress
const createDefaultProgress = (): GameProgress => ({
  levels: ORDERED_LEVEL_CONFIGS.map((config, index) => ({
    levelId: config.id,
    // First level always unlocked, others based on LEVELS_LOCKED setting
    isUnlocked: index === 0 || !LEVELS_LOCKED,
    starsEarned: 0,
    bestScore: 0,
    bestTime: 0,
    completedWithNoLoss: false,
  })),
  totalStars: 0,
});

// Load progress from localStorage
const loadProgress = (): GameProgress => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<GameProgress>;
      if (Array.isArray(parsed.levels)) {
        const savedById = new Map(parsed.levels.map((level) => [level.levelId, level]));
        const unlockedCount = Math.max(1, parsed.levels.filter((level) => level.isUnlocked).length);
        const levels = ORDERED_LEVEL_CONFIGS.map((config, index) => {
          const prior = savedById.get(config.id);
          return {
            levelId: config.id,
            isUnlocked: !LEVELS_LOCKED || index < unlockedCount,
            starsEarned: prior?.starsEarned ?? 0,
            bestScore: prior?.bestScore ?? 0,
            bestTime: prior?.bestTime ?? 0,
            completedWithNoLoss: prior?.completedWithNoLoss ?? false,
          };
        });
        return { levels, totalStars: levels.reduce((sum, level) => sum + level.starsEarned, 0) };
      }
    }
  } catch (error) {
    console.error('Failed to load game progress:', error);
  }
  return createDefaultProgress();
};

// Save progress to localStorage
const saveProgress = (progress: GameProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save game progress:', error);
  }
};

/**
 * Calculate stars earned based on level result
 */
export const calculateStars = (_levelId: number, result: LevelResult): number => {
  const percentage = result.score / result.maxScore;

  if (percentage < 0.5) return 0;
  if (percentage === 1) return 5;
  if (percentage >= 0.8) return 4;
  if (percentage >= 0.6) return 3;
  if (percentage > 0.5) return 2;
  return 1; // exactly 50%
};

/**
 * Hook for managing level progression
 */
export const useLevelProgression = () => {
  const [progress, setProgress] = useState<GameProgress>(loadProgress);

  // Check if a level is unlocked
  const isLevelUnlocked = useCallback((levelId: number): boolean => {
    // If levels are not locked, all are available
    if (!LEVELS_LOCKED) return true;

    const level = progress.levels.find(l => l.levelId === levelId);
    return level?.isUnlocked ?? false;
  }, [progress.levels]);

  // Get level progress
  const getLevelProgress = useCallback((levelId: number): LevelProgress | undefined => {
    return progress.levels.find(l => l.levelId === levelId);
  }, [progress.levels]);

  // Complete a level and update progress
  const completeLevel = useCallback((levelId: number, result: LevelResult): number => {
    const stars = calculateStars(levelId, result);

    setProgress(prev => {
      const nextLevelId = getNextLevelId(levelId);
      const newLevels = prev.levels.map((level) => {
        // Update current level
        if (level.levelId === levelId) {
          return {
            ...level,
            starsEarned: Math.max(level.starsEarned, stars),
            bestScore: Math.max(level.bestScore, result.score),
            bestTime: Math.max(level.bestTime, result.timeRemaining),
            completedWithNoLoss: level.completedWithNoLoss || result.lostAttempts === 0,
          };
        }

        // Unlock next level if enough stars earned
        if (level.levelId === nextLevelId && stars >= STARS_TO_UNLOCK) {
          return {
            ...level,
            isUnlocked: true,
          };
        }

        return level;
      });

      const newProgress: GameProgress = {
        levels: newLevels,
        totalStars: newLevels.reduce((sum, l) => sum + l.starsEarned, 0),
      };

      saveProgress(newProgress);
      return newProgress;
    });

    return stars;
  }, []);

  // Reset all progress
  const resetProgress = useCallback(() => {
    const defaultProgress = createDefaultProgress();
    setProgress(defaultProgress);
    saveProgress(defaultProgress);
  }, []);

  // Get stars for display
  const getStarsForLevel = useCallback((levelId: number): number => {
    return progress.levels.find(l => l.levelId === levelId)?.starsEarned ?? 0;
  }, [progress.levels]);

  // Check if can proceed to next level
  const canProceedToNextLevel = useCallback((currentLevelId: number): boolean => {
    if (!LEVELS_LOCKED) return true;
    
    const currentLevel = progress.levels.find(l => l.levelId === currentLevelId);
    return (currentLevel?.starsEarned ?? 0) >= STARS_TO_UNLOCK;
  }, [progress.levels]);

  // Memoized values
  const totalStars = useMemo(() => progress.totalStars, [progress.totalStars]);
  const maxPossibleStars = useMemo(() => LEVEL_CONFIGS.length * 5, []);

  return {
    progress,
    isLevelUnlocked,
    getLevelProgress,
    completeLevel,
    resetProgress,
    getStarsForLevel,
    canProceedToNextLevel,
    totalStars,
    maxPossibleStars,
    levelsLocked: LEVELS_LOCKED,
    starsToUnlock: STARS_TO_UNLOCK,
  };
};
