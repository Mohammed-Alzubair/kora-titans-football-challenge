import { useState, useCallback } from 'react';

const LEVELS_KEY = 'levels_since_last_ad';
const INTERSTITIAL_INTERVAL = 4;

function getLevelsSinceAd(): number {
  try { return parseInt(localStorage.getItem(LEVELS_KEY) || '0', 10); }
  catch { return 0; }
}

function setLevelsSinceAd(n: number) {
  localStorage.setItem(LEVELS_KEY, String(n));
}

export function useAds() {
  const [showRewardedModal, setShowRewardedModal] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [onRewardCallback, setOnRewardCallback] = useState<(() => void) | null>(null);
  const [onInterstitialDone, setOnInterstitialDone] = useState<(() => void) | null>(null);

  const openRewardedAd = useCallback((onReward: () => void) => {
    setOnRewardCallback(() => onReward);
    setShowRewardedModal(true);
  }, []);

  const closeRewardedAd = useCallback((rewarded: boolean) => {
    setShowRewardedModal(false);
    if (rewarded && onRewardCallback) {
      onRewardCallback();
    }
    setOnRewardCallback(null);
  }, [onRewardCallback]);

  const checkInterstitial = useCallback((onDone: () => void) => {
    const count = getLevelsSinceAd() + 1;
    if (count >= INTERSTITIAL_INTERVAL) {
      setLevelsSinceAd(0);
      setOnInterstitialDone(() => onDone);
      setShowInterstitial(true);
    } else {
      setLevelsSinceAd(count);
      onDone();
    }
  }, []);

  const closeInterstitial = useCallback(() => {
    setShowInterstitial(false);
    if (onInterstitialDone) {
      onInterstitialDone();
    }
    setOnInterstitialDone(null);
  }, [onInterstitialDone]);

  return {
    showRewardedModal,
    showInterstitial,
    openRewardedAd,
    closeRewardedAd,
    checkInterstitial,
    closeInterstitial,
  };
}
