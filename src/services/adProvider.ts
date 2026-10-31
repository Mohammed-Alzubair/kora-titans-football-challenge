// Ad Provider abstraction layer
// Replace MockAdProvider with a real provider (AdMob, etc.) when converting to mobile

export interface AdProvider {
  loadRewardedAd(): Promise<void>;
  showRewardedAd(): Promise<{ rewarded: boolean }>;
  loadInterstitialAd(): Promise<void>;
  showInterstitialAd(): Promise<void>;
  isReady(type: 'rewarded' | 'interstitial'): boolean;
}

export type AdPhase = 'idle' | 'loading' | 'playing' | 'success' | 'error';

const REWARDED_ADS_KEY = 'rewarded_ads_timestamps';
const MAX_REWARDED_PER_HOUR = 3;

function canShowRewardedAd(): boolean {
  try {
    const now = Date.now();
    const timestamps: number[] = JSON.parse(localStorage.getItem(REWARDED_ADS_KEY) || '[]');
    const recent = timestamps.filter(t => now - t < 3600000);
    return recent.length < MAX_REWARDED_PER_HOUR;
  } catch { return true; }
}

function recordRewardedAd(): void {
  try {
    const now = Date.now();
    const timestamps: number[] = JSON.parse(localStorage.getItem(REWARDED_ADS_KEY) || '[]');
    const recent = timestamps.filter(t => now - t < 3600000);
    recent.push(now);
    localStorage.setItem(REWARDED_ADS_KEY, JSON.stringify(recent));
  } catch {}
}

export class MockAdProvider implements AdProvider {
  private rewardedReady = false;
  private interstitialReady = false;

  async loadRewardedAd(): Promise<void> {
    await new Promise(r => setTimeout(r, 1500));
    this.rewardedReady = true;
  }

  async showRewardedAd(): Promise<{ rewarded: boolean }> {
    if (!canShowRewardedAd()) {
      return { rewarded: false };
    }
    this.rewardedReady = false;
    // The actual "watching" is handled by the UI component (countdown)
    recordRewardedAd();
    return { rewarded: true };
  }

  async loadInterstitialAd(): Promise<void> {
    await new Promise(r => setTimeout(r, 1200));
    this.interstitialReady = true;
  }

  async showInterstitialAd(): Promise<void> {
    this.interstitialReady = false;
  }

  isReady(type: 'rewarded' | 'interstitial'): boolean {
    return type === 'rewarded' ? this.rewardedReady : this.interstitialReady;
  }
}

// Singleton - swap this with a real provider later
export const adProvider: AdProvider = new MockAdProvider();
