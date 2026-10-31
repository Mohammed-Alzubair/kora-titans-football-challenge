import { useState, useLayoutEffect, useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import type { LevelResult } from '@/types/levelProgression';
import { getNextLevelId, getStageNumber } from '@/types/levelProgression';
import TapBallEffect from '@/components/TapBallEffect';
import { StartScreen } from '@/components/StartScreen';
import { SplashScreen } from '@/components/SplashScreen';
import { OnboardingScreen } from '@/components/OnboardingScreen';
import { WelcomeLogoScreen } from '@/components/WelcomeLogoScreen';
import { InterstitialAd } from '@/components/InterstitialAd';
import { useAds } from '@/hooks/useAds';
import { useSound } from '@/hooks/useSound';
import { useLevelProgression } from '@/hooks/useLevelProgression';
import { LevelSelectionScreen } from '@/components/LevelSelectionScreen';
import { SettingsScreen } from '@/components/SettingsScreen';
import { WorldCupChallengeScreen } from '@/components/WorldCupChallengeScreen';
import { ClubDirectoryScreen } from '@/components/ClubDirectoryScreen';
import type { TeamData } from '@/components/Level100Screen';
import { useI18n } from '@/i18n/I18nProvider';
import { StageTransitionScreen } from '@/components/StageTransitionScreen';

const LoadingFallback = () => {
  const { isArabic } = useI18n();
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-emerald-950'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-4 border-emerald-300 border-t-transparent mx-auto mb-4'></div>
        <p className='text-emerald-100 text-lg font-bold'>{isArabic ? 'جارٍ التحميل...' : 'Loading…'}</p>
      </div>
    </div>
  );
};

// Lazy-loaded level components
const GameScreen = lazy(() => import('@/components/GameScreen').then(m => ({ default: m.GameScreen })));
const LevelTransition = lazy(() => import('@/components/LevelTransition').then(m => ({ default: m.LevelTransition })));
const Level2Screen = lazy(() => import('@/components/Level2Screen').then(m => ({ default: m.Level2Screen })));
const Level3Transition = lazy(() => import('@/components/Level3Transition').then(m => ({ default: m.Level3Transition })));
const Level3Screen = lazy(() => import('@/components/Level3Screen').then(m => ({ default: m.Level3Screen })));
const Level4Transition = lazy(() => import('@/components/Level4Transition').then(m => ({ default: m.Level4Transition })));
const Level4Screen = lazy(() => import('@/components/Level4Screen').then(m => ({ default: m.Level4Screen })));
const Level5Transition = lazy(() => import('@/components/Level5Transition').then(m => ({ default: m.Level5Transition })));
const Level5Screen = lazy(() => import('@/components/Level5Screen').then(m => ({ default: m.Level5Screen })));
const Level6Transition = lazy(() => import('@/components/Level6Transition').then(m => ({ default: m.Level6Transition })));
const Level6Screen = lazy(() => import('@/components/Level6Screen').then(m => ({ default: m.Level6Screen })));
const Level7Transition = lazy(() => import('@/components/Level7Transition').then(m => ({ default: m.Level7Transition })));
const Level7Screen = lazy(() => import('@/components/Level7Screen').then(m => ({ default: m.Level7Screen })));
const Level8Transition = lazy(() => import('@/components/Level8Transition').then(m => ({ default: m.Level8Transition })));
const Level8Screen = lazy(() => import('@/components/Level8Screen').then(m => ({ default: m.Level8Screen })));
const Level9Transition = lazy(() => import('@/components/Level9Transition').then(m => ({ default: m.Level9Transition })));
const Level9Screen = lazy(() => import('@/components/Level9Screen').then(m => ({ default: m.Level9Screen })));
const Level10Transition = lazy(() => import('@/components/Level10Transition').then(m => ({ default: m.Level10Transition })));
const Level10Screen = lazy(() => import('@/components/Level10Screen').then(m => ({ default: m.Level10Screen })));
const Level11Transition = lazy(() => import('@/components/Level11Transition').then(m => ({ default: m.Level11Transition })));
const Level11Screen = lazy(() => import('@/components/Level11Screen').then(m => ({ default: m.Level11Screen })));
const Level12Transition = lazy(() => import('@/components/Level12Transition').then(m => ({ default: m.Level12Transition })));
const Level12Screen = lazy(() => import('@/components/Level12Screen').then(m => ({ default: m.Level12Screen })));
const Level13Transition = lazy(() => import('@/components/Level13Transition').then(m => ({ default: m.Level13Transition })));
const Level13Screen = lazy(() => import('@/components/Level13Screen').then(m => ({ default: m.Level13Screen })));
const Level14Transition = lazy(() => import('@/components/Level14Transition').then(m => ({ default: m.Level14Transition })));
const Level14Screen = lazy(() => import('@/components/Level14Screen').then(m => ({ default: m.Level14Screen })));
const Level15Transition = lazy(() => import('@/components/Level15Transition').then(m => ({ default: m.Level15Transition })));
const Level15Screen = lazy(() => import('@/components/Level15Screen').then(m => ({ default: m.Level15Screen })));
const Level16Transition = lazy(() => import('@/components/Level16Transition').then(m => ({ default: m.Level16Transition })));
const Level16Screen = lazy(() => import('@/components/Level16Screen').then(m => ({ default: m.Level16Screen })));
const Level17Transition = lazy(() => import('@/components/Level17Transition').then(m => ({ default: m.Level17Transition })));
const Level17Screen = lazy(() => import('@/components/Level17Screen').then(m => ({ default: m.Level17Screen })));
const Level18Transition = lazy(() => import('@/components/Level18Transition').then(m => ({ default: m.Level18Transition })));
const Level18Screen = lazy(() => import('@/components/Level18Screen').then(m => ({ default: m.Level18Screen })));
const Level19Transition = lazy(() => import('@/components/Level19Transition').then(m => ({ default: m.Level19Transition })));
const Level19Screen = lazy(() => import('@/components/Level19Screen').then(m => ({ default: m.Level19Screen })));
const Level20Transition = lazy(() => import('@/components/Level20Transition').then(m => ({ default: m.Level20Transition })));
const Level20Screen = lazy(() => import('@/components/Level20Screen').then(m => ({ default: m.Level20Screen })));
const Level21Transition = lazy(() => import('@/components/Level21Transition').then(m => ({ default: m.Level21Transition })));
const Level21Screen = lazy(() => import('@/components/Level21Screen').then(m => ({ default: m.Level21Screen })));
const Level22Transition = lazy(() => import('@/components/Level22Transition').then(m => ({ default: m.Level22Transition })));
const Level22Screen = lazy(() => import('@/components/Level22Screen').then(m => ({ default: m.Level22Screen })));
const Level23Transition = lazy(() => import('@/components/Level23Transition').then(m => ({ default: m.Level23Transition })));
const Level23Screen = lazy(() => import('@/components/Level23Screen').then(m => ({ default: m.Level23Screen })));
const Level24Transition = lazy(() => import('@/components/Level24Transition').then(m => ({ default: m.Level24Transition })));
const Level24Screen = lazy(() => import('@/components/Level24Screen').then(m => ({ default: m.Level24Screen })));
const Level25Transition = lazy(() => import('@/components/Level25Transition').then(m => ({ default: m.Level25Transition })));
const Level25Screen = lazy(() => import('@/components/Level25Screen').then(m => ({ default: m.Level25Screen })));
const Level26Transition = lazy(() => import('@/components/Level26Transition').then(m => ({ default: m.Level26Transition })));
const Level26Screen = lazy(() => import('@/components/Level26Screen').then(m => ({ default: m.Level26Screen })));
const Level27Transition = lazy(() => import('@/components/Level27Transition').then(m => ({ default: m.Level27Transition })));
const Level27Screen = lazy(() => import('@/components/Level27Screen').then(m => ({ default: m.Level27Screen })));
const Level28Transition = lazy(() => import('@/components/Level28Transition').then(m => ({ default: m.Level28Transition })));
const Level28Screen = lazy(() => import('@/components/Level28Screen').then(m => ({ default: m.Level28Screen })));
const Level29Transition = lazy(() => import('@/components/Level29Transition').then(m => ({ default: m.Level29Transition })));
const Level29Screen = lazy(() => import('@/components/Level29Screen').then(m => ({ default: m.Level29Screen })));
const Level30Transition = lazy(() => import('@/components/Level30Transition').then(m => ({ default: m.Level30Transition })));
const Level30Screen = lazy(() => import('@/components/Level30Screen').then(m => ({ default: m.Level30Screen })));
const Level31Transition = lazy(() => import('@/components/Level31Transition').then(m => ({ default: m.Level31Transition })));
const Level31Screen = lazy(() => import('@/components/Level31Screen').then(m => ({ default: m.Level31Screen })));
const Level32Transition = lazy(() => import('@/components/Level32Transition').then(m => ({ default: m.Level32Transition })));
const Level32Screen = lazy(() => import('@/components/Level32Screen').then(m => ({ default: m.Level32Screen })));
const Level33Transition = lazy(() => import('@/components/Level33Transition').then(m => ({ default: m.Level33Transition })));
const Level33Screen = lazy(() => import('@/components/Level33Screen').then(m => ({ default: m.Level33Screen })));
const Level34Transition = lazy(() => import('@/components/Level34Transition').then(m => ({ default: m.Level34Transition })));
const Level34Screen = lazy(() => import('@/components/Level34Screen').then(m => ({ default: m.Level34Screen })));
const Level35Transition = lazy(() => import('@/components/Level35Transition').then(m => ({ default: m.Level35Transition })));
const Level35Screen = lazy(() => import('@/components/Level35Screen').then(m => ({ default: m.Level35Screen })));
const Level36Transition = lazy(() => import('@/components/Level36Transition').then(m => ({ default: m.Level36Transition })));
const Level36Screen = lazy(() => import('@/components/Level36Screen').then(m => ({ default: m.Level36Screen })));
const Level37Transition = lazy(() => import('@/components/Level37Transition').then(m => ({ default: m.Level37Transition })));
const Level37Screen = lazy(() => import('@/components/Level37Screen').then(m => ({ default: m.Level37Screen })));
const Level38Transition = lazy(() => import('@/components/Level38Transition').then(m => ({ default: m.Level38Transition })));
const Level38Screen = lazy(() => import('@/components/Level38Screen').then(m => ({ default: m.Level38Screen })));
const Level39Transition = lazy(() => import('@/components/Level39Transition').then(m => ({ default: m.Level39Transition })));
const Level39Screen = lazy(() => import('@/components/Level39Screen').then(m => ({ default: m.Level39Screen })));
const Level40Transition = lazy(() => import('@/components/Level40Transition').then(m => ({ default: m.Level40Transition })));
const Level40Screen = lazy(() => import('@/components/Level40Screen').then(m => ({ default: m.Level40Screen })));
const Level41Transition = lazy(() => import('@/components/Level41Transition').then(m => ({ default: m.Level41Transition })));
const Level41Screen = lazy(() => import('@/components/Level41Screen').then(m => ({ default: m.Level41Screen })));
const Level42Transition = lazy(() => import('@/components/Level42Transition').then(m => ({ default: m.Level42Transition })));
const Level42Screen = lazy(() => import('@/components/Level42Screen').then(m => ({ default: m.Level42Screen })));
const Level43Transition = lazy(() => import('@/components/Level43Transition').then(m => ({ default: m.Level43Transition })));
const Level43Screen = lazy(() => import('@/components/Level43Screen').then(m => ({ default: m.Level43Screen })));
const Level44Transition = lazy(() => import('@/components/Level44Transition').then(m => ({ default: m.Level44Transition })));
const Level44Screen = lazy(() => import('@/components/Level44Screen').then(m => ({ default: m.Level44Screen })));
const Level45Transition = lazy(() => import('@/components/Level45Transition').then(m => ({ default: m.Level45Transition })));
const Level45Screen = lazy(() => import('@/components/Level45Screen').then(m => ({ default: m.Level45Screen })));
const Level46Transition = lazy(() => import('@/components/Level46Transition').then(m => ({ default: m.Level46Transition })));
const Level46Screen = lazy(() => import('@/components/Level46Screen').then(m => ({ default: m.Level46Screen })));
const Level47Transition = lazy(() => import('@/components/Level47Transition').then(m => ({ default: m.Level47Transition })));
const Level47Screen = lazy(() => import('@/components/Level47Screen').then(m => ({ default: m.Level47Screen })));
const Level48Transition = lazy(() => import('@/components/Level48Transition').then(m => ({ default: m.Level48Transition })));
const Level48Screen = lazy(() => import('@/components/Level48Screen').then(m => ({ default: m.Level48Screen })));
const Level49Transition = lazy(() => import('@/components/Level49Transition').then(m => ({ default: m.Level49Transition })));
const Level49Screen = lazy(() => import('@/components/Level49Screen').then(m => ({ default: m.Level49Screen })));
const Level50Transition = lazy(() => import('@/components/Level50Transition').then(m => ({ default: m.Level50Transition })));
const Level50Screen = lazy(() => import('@/components/Level50Screen').then(m => ({ default: m.Level50Screen })));
const Level51Transition = lazy(() => import('@/components/Level51Transition').then(m => ({ default: m.Level51Transition })));
const Level51Screen = lazy(() => import('@/components/Level51Screen').then(m => ({ default: m.Level51Screen })));
const Level52Transition = lazy(() => import('@/components/Level52Transition').then(m => ({ default: m.Level52Transition })));
const Level52Screen = lazy(() => import('@/components/Level52Screen').then(m => ({ default: m.Level52Screen })));
const Level53Transition = lazy(() => import('@/components/Level53Transition').then(m => ({ default: m.Level53Transition })));
const Level53Screen = lazy(() => import('@/components/Level53Screen').then(m => ({ default: m.Level53Screen })));
const Level54Transition = lazy(() => import('@/components/Level54Transition').then(m => ({ default: m.Level54Transition })));
const Level54Screen = lazy(() => import('@/components/Level54Screen').then(m => ({ default: m.Level54Screen })));
const Level55Transition = lazy(() => import('@/components/Level55Transition').then(m => ({ default: m.Level55Transition })));
const Level55Screen = lazy(() => import('@/components/Level55Screen').then(m => ({ default: m.Level55Screen })));
const Level56Transition = lazy(() => import('@/components/Level56Transition').then(m => ({ default: m.Level56Transition })));
const Level56Screen = lazy(() => import('@/components/Level56Screen').then(m => ({ default: m.Level56Screen })));
const Level57Transition = lazy(() => import('@/components/Level57Transition').then(m => ({ default: m.Level57Transition })));
const Level57Screen = lazy(() => import('@/components/Level57Screen').then(m => ({ default: m.Level57Screen })));
const Level58Transition = lazy(() => import('@/components/Level58Transition').then(m => ({ default: m.Level58Transition })));
const Level58Screen = lazy(() => import('@/components/Level58Screen').then(m => ({ default: m.Level58Screen })));
const Level59Transition = lazy(() => import('@/components/Level59Transition').then(m => ({ default: m.Level59Transition })));
const Level59Screen = lazy(() => import('@/components/Level59Screen').then(m => ({ default: m.Level59Screen })));
const Level60Transition = lazy(() => import('@/components/Level60Transition').then(m => ({ default: m.Level60Transition })));
const Level60Screen = lazy(() => import('@/components/Level60Screen').then(m => ({ default: m.Level60Screen })));
const Level61Transition = lazy(() => import('@/components/Level61Transition').then(m => ({ default: m.Level61Transition })));
const Level61Screen = lazy(() => import('@/components/Level61Screen').then(m => ({ default: m.Level61Screen })));
const Level62Transition = lazy(() => import('@/components/Level62Transition').then(m => ({ default: m.Level62Transition })));
const Level62Screen = lazy(() => import('@/components/Level62Screen').then(m => ({ default: m.Level62Screen })));
const Level63Transition = lazy(() => import('@/components/Level63Transition').then(m => ({ default: m.Level63Transition })));
const Level63Screen = lazy(() => import('@/components/Level63Screen').then(m => ({ default: m.Level63Screen })));
const Level64Transition = lazy(() => import('@/components/Level64Transition').then(m => ({ default: m.Level64Transition })));
const Level64Screen = lazy(() => import('@/components/Level64Screen').then(m => ({ default: m.Level64Screen })));
const Level65Transition = lazy(() => import('@/components/Level65Transition').then(m => ({ default: m.Level65Transition })));
const Level65Screen = lazy(() => import('@/components/Level65Screen').then(m => ({ default: m.Level65Screen })));

const Level66Screen = lazy(() => import('@/components/Level66Screen').then(m => ({ default: m.Level66Screen })));
const Level67Transition = lazy(() => import('@/components/Level67Transition').then(m => ({ default: m.Level67Transition })));
const Level67Screen = lazy(() => import('@/components/Level67Screen').then(m => ({ default: m.Level67Screen })));
const Level68Transition = lazy(() => import('@/components/Level68Transition').then(m => ({ default: m.Level68Transition })));
const Level68Screen = lazy(() => import('@/components/Level68Screen').then(m => ({ default: m.Level68Screen })));
const Level69Transition = lazy(() => import('@/components/Level69Transition').then(m => ({ default: m.Level69Transition })));
const Level69Screen = lazy(() => import('@/components/Level69Screen').then(m => ({ default: m.Level69Screen })));
const Level70Transition = lazy(() => import('@/components/Level70Transition').then(m => ({ default: m.Level70Transition })));
const Level70Screen = lazy(() => import('@/components/Level70Screen').then(m => ({ default: m.Level70Screen })));
const Level71Transition = lazy(() => import('@/components/Level71Transition').then(m => ({ default: m.Level71Transition })));
const Level71Screen = lazy(() => import('@/components/Level71Screen').then(m => ({ default: m.Level71Screen })));
const Level72Transition = lazy(() => import('@/components/Level72Transition').then(m => ({ default: m.Level72Transition })));
const Level72Screen = lazy(() => import('@/components/Level72Screen').then(m => ({ default: m.Level72Screen })));
const Level73Transition = lazy(() => import('@/components/Level73Transition').then(m => ({ default: m.Level73Transition })));
const Level73Screen = lazy(() => import('@/components/Level73Screen').then(m => ({ default: m.Level73Screen })));
const Level74Transition = lazy(() => import('@/components/Level74Transition').then(m => ({ default: m.Level74Transition })));
const Level74Screen = lazy(() => import('@/components/Level74Screen').then(m => ({ default: m.Level74Screen })));
const Level75Transition = lazy(() => import('@/components/Level75Transition').then(m => ({ default: m.Level75Transition })));
const Level75Screen = lazy(() => import('@/components/Level75Screen').then(m => ({ default: m.Level75Screen })));
const Level76Transition = lazy(() => import('@/components/Level76Transition').then(m => ({ default: m.Level76Transition })));
const Level76Screen = lazy(() => import('@/components/Level76Screen').then(m => ({ default: m.Level76Screen })));
const Level77Transition = lazy(() => import('@/components/Level77Transition').then(m => ({ default: m.Level77Transition })));
const Level77Screen = lazy(() => import('@/components/Level77Screen').then(m => ({ default: m.Level77Screen })));
const Level78Transition = lazy(() => import('@/components/Level78Transition').then(m => ({ default: m.Level78Transition })));
const Level78Screen = lazy(() => import('@/components/Level78Screen').then(m => ({ default: m.Level78Screen })));
const Level79Transition = lazy(() => import('@/components/Level79Transition').then(m => ({ default: m.Level79Transition })));
const Level79Screen = lazy(() => import('@/components/Level79Screen').then(m => ({ default: m.Level79Screen })));
const Level80Transition = lazy(() => import('@/components/Level80Transition').then(m => ({ default: m.Level80Transition })));
const Level80Screen = lazy(() => import('@/components/Level80Screen').then(m => ({ default: m.Level80Screen })));
const Level81Transition = lazy(() => import('@/components/Level81Transition').then(m => ({ default: m.Level81Transition })));
const Level81Screen = lazy(() => import('@/components/Level81Screen').then(m => ({ default: m.Level81Screen })));
const Level82Transition = lazy(() => import('@/components/Level82Transition').then(m => ({ default: m.Level82Transition })));
const Level82Screen = lazy(() => import('@/components/Level82Screen').then(m => ({ default: m.Level82Screen })));
const Level83Transition = lazy(() => import('@/components/Level83Transition').then(m => ({ default: m.Level83Transition })));
const Level83Screen = lazy(() => import('@/components/Level83Screen').then(m => ({ default: m.Level83Screen })));
const Level84Transition = lazy(() => import('@/components/Level84Transition').then(m => ({ default: m.Level84Transition })));
const Level84Screen = lazy(() => import('@/components/Level84Screen').then(m => ({ default: m.Level84Screen })));
const Level85Transition = lazy(() => import('@/components/Level85Transition').then(m => ({ default: m.Level85Transition })));
const Level85Screen = lazy(() => import('@/components/Level85Screen').then(m => ({ default: m.Level85Screen })));
const Level86Transition = lazy(() => import('@/components/Level86Transition').then(m => ({ default: m.Level86Transition })));
const Level86Screen = lazy(() => import('@/components/Level86Screen').then(m => ({ default: m.Level86Screen })));
const Level87Transition = lazy(() => import('@/components/Level87Transition').then(m => ({ default: m.Level87Transition })));
const Level87Screen = lazy(() => import('@/components/Level87Screen').then(m => ({ default: m.Level87Screen })));
const Level88Transition = lazy(() => import('@/components/Level88Transition').then(m => ({ default: m.Level88Transition })));
const Level88Screen = lazy(() => import('@/components/Level88Screen').then(m => ({ default: m.Level88Screen })));
const Level89Transition = lazy(() => import('@/components/Level89Transition').then(m => ({ default: m.Level89Transition })));
const Level89Screen = lazy(() => import('@/components/Level89Screen').then(m => ({ default: m.Level89Screen })));
const Level90Transition = lazy(() => import('@/components/Level90Transition').then(m => ({ default: m.Level90Transition })));
const Level90Screen = lazy(() => import('@/components/Level90Screen').then(m => ({ default: m.Level90Screen })));
const Level91Transition = lazy(() => import('@/components/Level91Transition').then(m => ({ default: m.Level91Transition })));
const Level91Screen = lazy(() => import('@/components/Level91Screen').then(m => ({ default: m.Level91Screen })));
const Level92Transition = lazy(() => import('@/components/Level92Transition').then(m => ({ default: m.Level92Transition })));
const Level92Screen = lazy(() => import('@/components/Level92Screen').then(m => ({ default: m.Level92Screen })));
const Level93Transition = lazy(() => import('@/components/Level93Transition').then(m => ({ default: m.Level93Transition })));
const Level93Screen = lazy(() => import('@/components/Level93Screen').then(m => ({ default: m.Level93Screen })));
const Level94Transition = lazy(() => import('@/components/Level94Transition').then(m => ({ default: m.Level94Transition })));
const Level94Screen = lazy(() => import('@/components/Level94Screen').then(m => ({ default: m.Level94Screen })));
const Level95Transition = lazy(() => import('@/components/Level95Transition').then(m => ({ default: m.Level95Transition })));
const Level95Screen = lazy(() => import('@/components/Level95Screen').then(m => ({ default: m.Level95Screen })));
const Level96Transition = lazy(() => import('@/components/Level96Transition').then(m => ({ default: m.Level96Transition })));
const Level96Screen = lazy(() => import('@/components/Level96Screen').then(m => ({ default: m.Level96Screen })));
const Level97Transition = lazy(() => import('@/components/Level97Transition').then(m => ({ default: m.Level97Transition })));
const Level97Screen = lazy(() => import('@/components/Level97Screen').then(m => ({ default: m.Level97Screen })));
const Level98Transition = lazy(() => import('@/components/Level98Transition').then(m => ({ default: m.Level98Transition })));
const Level98Screen = lazy(() => import('@/components/Level98Screen').then(m => ({ default: m.Level98Screen })));
const Level99Transition = lazy(() => import('@/components/Level99Transition').then(m => ({ default: m.Level99Transition })));
const Level99Screen = lazy(() => import('@/components/Level99Screen').then(m => ({ default: m.Level99Screen })));
const ChallengeWelcomeScreen = lazy(() => import('@/components/ChallengeWelcomeScreen').then(m => ({ default: m.ChallengeWelcomeScreen })));
const Level100Screen = lazy(() => import('@/components/Level100Screen').then(m => ({ default: m.Level100Screen })));

type GameState = 'splash' | 'onboarding' | 'welcomeLogo' | 'start' | 'settings' | 'levelSelect' | 'worldCup' | 'clubDirectory' | 'stageTransition' | 'level1' | 'transition' | 'level2' | 'transition3' | 'level3' | 'transition4' | 'level4' | 'transition5' | 'level5' | 'transition6' | 'level6' | 'transition7' | 'level7' | 'transition8' | 'level8' | 'transition9' | 'level9' | 'transition10' | 'level10' | 'transition11' | 'level11' | 'transition12' | 'level12' | 'transition13' | 'level13' | 'transition14' | 'level14' | 'transition15' | 'level15' | 'transition16' | 'level16' | 'transition17' | 'level17' | 'transition18' | 'level18' | 'transition19' | 'level19' | 'transition20' | 'level20' | 'transition21' | 'level21' | 'transition22' | 'level22' | 'transition23' | 'level23' | 'transition24' | 'level24' | 'transition25' | 'level25' | 'transition26' | 'level26' | 'transition27' | 'level27' | 'transition28' | 'level28' | 'transition29' | 'level29' | 'transition30' | 'level30' | 'transition31' | 'level31' | 'transition32' | 'level32' | 'transition33' | 'level33' | 'transition34' | 'level34' | 'transition35' | 'level35' | 'transition36' | 'level36' | 'transition37' | 'level37' | 'transition38' | 'level38' | 'transition39' | 'level39' | 'transition40' | 'level40' | 'transition41' | 'level41' | 'transition42' | 'level42' | 'transition43' | 'level43' | 'transition44' | 'level44' | 'transition45' | 'level45' | 'transition46' | 'level46' | 'transition47' | 'level47' | 'transition48' | 'level48' | 'transition49' | 'level49' | 'transition50' | 'level50' | 'transition51' | 'level51' | 'transition52' | 'level52' | 'transition53' | 'level53' | 'transition54' | 'level54' | 'transition55' | 'level55' | 'transition56' | 'level56' | 'transition57' | 'level57' | 'transition58' | 'level58' | 'transition59' | 'level59' | 'transition60' | 'level60' | 'transition61' | 'level61' | 'transition62' | 'level62' | 'transition63' | 'level63' | 'transition64' | 'level64' | 'transition65' | 'level65' | 'challengeWelcome' | 'level66' | 'transition67' | 'level67' | 'transition68' | 'level68' | 'transition69' | 'level69' | 'transition70' | 'level70' | 'transition71' | 'level71' | 'transition72' | 'level72' | 'transition73' | 'level73' | 'transition74' | 'level74' | 'transition75' | 'level75' | 'transition76' | 'level76' | 'transition77' | 'level77' | 'transition78' | 'level78' | 'transition79' | 'level79' | 'transition80' | 'level80' | 'transition81' | 'level81' | 'transition82' | 'level82' | 'transition83' | 'level83' | 'transition84' | 'level84' | 'transition85' | 'level85' | 'transition86' | 'level86' | 'transition87' | 'level87' | 'transition88' | 'level88' | 'transition89' | 'level89' | 'transition90' | 'level90' | 'transition91' | 'level91' | 'transition92' | 'level92' | 'transition93' | 'level93' | 'transition94' | 'level94' | 'transition95' | 'level95' | 'transition96' | 'level96' | 'transition97' | 'level97' | 'transition98' | 'level98' | 'transition99' | 'level99' | 'level100';

const Index = () => {
  const { direction } = useI18n();
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = sessionStorage.getItem('current_game_state');
    if (saved && saved !== 'splash' && saved !== 'onboarding' && saved !== 'welcomeLogo') return saved as GameState;
    return 'splash';
  });
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [pendingNextLevelId, setPendingNextLevelId] = useState<number | null>(() => {
    const saved = Number(sessionStorage.getItem('pending_next_level_id'));
    return Number.isInteger(saved) && saved >= 1 && saved <= 100 ? saved : null;
  });
  const { showInterstitial, checkInterstitial, closeInterstitial } = useAds();
  const [pendingState, setPendingState] = useState<GameState | null>(null);
  const { playMusic, playSound, stopMusic, setMenuVolume, setProgressVolume, setSfxVolume, menuVolume, progressVolume, sfxVolume } = useSound();
  const [userInteracted, setUserInteracted] = useState(false);
  const { completeLevel } = useLevelProgression();
  const gameStateRef = useRef<GameState>((() => {
    const saved = sessionStorage.getItem('current_game_state');
    if (saved && saved !== 'splash' && saved !== 'onboarding' && saved !== 'welcomeLogo') return saved as GameState;
    return 'splash';
  })());
  const [lastEarnedStars, setLastEarnedStars] = useState(0);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  useEffect(() => {
    sessionStorage.setItem('current_game_state', gameState);
  }, [gameState]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        sessionStorage.setItem('current_game_state', gameStateRef.current);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    if (userInteracted) return;
    const unlock = () => setUserInteracted(true);
    document.addEventListener('click', unlock, { once: true });
    document.addEventListener('touchstart', unlock, { once: true });
    return () => {
      document.removeEventListener('click', unlock);
      document.removeEventListener('touchstart', unlock);
    };
  }, [userInteracted]);

  useEffect(() => {
    if (!userInteracted) return;
    if (gameState === 'splash' || gameState === 'onboarding' || gameState === 'welcomeLogo') {
      stopMusic();
    } else if (gameState === 'start' || gameState === 'settings') {
      playMusic('menu');
    } else if (gameState === 'levelSelect') {
      playMusic('progress');
    } else {
      stopMusic();
    }
  }, [gameState, userInteracted, playMusic, stopMusic]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [gameState]);

  const goToState = useCallback((state: GameState, result?: LevelResult) => {
    const currentMatch = gameStateRef.current.match(/^level(\d+)$/);
    if ((state.startsWith('transition') || state === 'challengeWelcome') && currentMatch) {
      const currentLevel = parseInt(currentMatch[1], 10);
      const defaultResult: LevelResult = { score: 8, maxScore: 10, timeRemaining: 0, totalTime: 0, lostAttempts: 0 };
      const stars = completeLevel(currentLevel, result || defaultResult);
      setLastEarnedStars(stars);
      try { localStorage.setItem('last_earned_stars', String(stars)); } catch(_) {}

      const nextLevelId = getNextLevelId(currentLevel);
      if (nextLevelId !== undefined) {
        setPendingNextLevelId(nextLevelId);
        sessionStorage.setItem('pending_next_level_id', String(nextLevelId));
        const showStageTransition = () => setGameState('stageTransition');
        if (getStageNumber(nextLevelId) % 10 === 0) checkInterstitial(showStageTransition);
        else showStageTransition();
        return;
      }
    }

    if (state.startsWith('transition')) {
      const levelMatch = state.match(/\d+/);
      const levelNum = levelMatch ? parseInt(levelMatch[0], 10) : 0;
      if (levelNum >= 10) {
        checkInterstitial(() => setGameState(state));
      } else {
        setGameState(state);
      }
    } else {
      setGameState(state);
    }
  }, [checkInterstitial, completeLevel]);

  const continueToNextStage = () => {
    if (pendingNextLevelId === null) {
      setGameState('levelSelect');
      return;
    }
    sessionStorage.removeItem('pending_next_level_id');
    const next = pendingNextLevelId;
    setPendingNextLevelId(null);
    setGameState(`level${next}` as GameState);
  };

  const handleStart = () => setGameState('level1');
  const handleShowLevelSelect = () => setGameState('levelSelect');
  const handleShowSettings = () => setGameState('settings');
  const handleShowWorldCup = () => setGameState('worldCup');
  const handleShowClubDirectory = () => setGameState('clubDirectory');
  const handleRestart = () => setGameState('start');
  const handleBackToStart = () => setGameState('start');

  const handleSelectLevel = (levelId: number) => {
    if (levelId === 100) {
      setGameState('transition99');
      return;
    }
    const state = `level${levelId}` as GameState;
    setGameState(state);
  };

  return (
    <div className="min-h-screen overflow-x-hidden overflow-y-hidden" dir={direction}>
      <TapBallEffect />
      {gameState === 'splash' && <SplashScreen onFinish={() => {
        const hasSeenOnboarding = localStorage.getItem('has_seen_onboarding');
        setGameState(hasSeenOnboarding ? 'welcomeLogo' : 'onboarding');
      }} />}
      {gameState === 'onboarding' && <OnboardingScreen onFinish={() => {
        localStorage.setItem('has_seen_onboarding', 'true');
        setGameState('start');
      }} />}
      {gameState === 'welcomeLogo' && <WelcomeLogoScreen onFinish={() => setGameState('start')} />}
      <div className={gameState === 'start' ? 'block min-h-screen' : 'hidden min-h-screen'}>
        <StartScreen onStart={handleStart} onShowLevelSelect={handleShowLevelSelect} onShowSettings={handleShowSettings} onShowWorldCup={handleShowWorldCup} onShowClubDirectory={handleShowClubDirectory} />
      </div>
      <div className={gameState === 'settings' ? 'block min-h-screen' : 'hidden min-h-screen'}>
        <SettingsScreen onBack={handleBackToStart} setMenuVolume={setMenuVolume} setProgressVolume={setProgressVolume} setSfxVolume={setSfxVolume} menuVolume={menuVolume} progressVolume={progressVolume} sfxVolume={sfxVolume} />
      </div>
      {gameState === 'levelSelect' && <LevelSelectionScreen onSelectLevel={handleSelectLevel} onBack={handleBackToStart} />}
      {gameState === 'worldCup' && <WorldCupChallengeScreen onBack={handleBackToStart} />}
      {gameState === 'clubDirectory' && <ClubDirectoryScreen onBack={handleBackToStart} />}
      {gameState === 'stageTransition' && pendingNextLevelId !== null && (
        <StageTransitionScreen
          levelId={pendingNextLevelId}
          stageNumber={getStageNumber(pendingNextLevelId)}
          onContinue={continueToNextStage}
        />
      )}
      <Suspense fallback={<LoadingFallback />}>
        {gameState === 'level1' && <GameScreen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition', result)} />}
        {gameState === 'transition' && <LevelTransition onContinue={() => setGameState('level2')} />}
        {gameState === 'level2' && <Level2Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition3', result)} />}
        {gameState === 'transition3' && <Level3Transition onContinue={() => setGameState('level3')} />}
        {gameState === 'level3' && <Level3Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition4', result)} />}
        {gameState === 'transition4' && <Level4Transition onContinue={() => setGameState('level4')} />}
        {gameState === 'level4' && <Level4Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition5', result)} />}
        {gameState === 'transition5' && <Level5Transition onContinue={() => setGameState('level5')} />}
        {gameState === 'level5' && <Level5Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition6', result)} />}
        {gameState === 'transition6' && <Level6Transition onContinue={() => setGameState('level6')} />}
        {gameState === 'level6' && <Level6Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition7', result)} />}
        {gameState === 'transition7' && <Level7Transition onContinue={() => setGameState('level7')} />}
        {gameState === 'level7' && <Level7Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition8', result)} />}
        {gameState === 'transition8' && <Level8Transition onContinue={() => setGameState('level8')} />}
        {gameState === 'level8' && <Level8Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition9', result)} />}
        {gameState === 'transition9' && <Level9Transition onContinue={() => setGameState('level9')} />}
        {gameState === 'level9' && <Level9Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition10', result)} />}
        {gameState === 'transition10' && <Level10Transition onContinue={() => setGameState('level10')} />}
        {gameState === 'level10' && <Level10Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition11', result)} />}
        {gameState === 'transition11' && <Level11Transition onContinue={() => setGameState('level11')} />}
        {gameState === 'level11' && <Level11Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition12', result)} />}
        {gameState === 'transition12' && <Level12Transition onContinue={() => setGameState('level12')} />}
        {gameState === 'level12' && <Level12Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition13', result)} />}
        {gameState === 'transition13' && <Level13Transition onContinue={() => setGameState('level13')} />}
        {gameState === 'level13' && <Level13Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition14', result)} />}
        {gameState === 'transition14' && <Level14Transition onContinue={() => setGameState('level14')} />}
        {gameState === 'level14' && <Level14Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition15', result)} />}
        {gameState === 'transition15' && <Level15Transition onContinue={() => setGameState('level15')} />}
        {gameState === 'level15' && <Level15Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition16', result)} />}
        {gameState === 'transition16' && <Level16Transition onContinue={() => setGameState('level16')} />}
        {gameState === 'level16' && <Level16Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition17', result)} />}
        {gameState === 'transition17' && <Level17Transition onContinue={() => setGameState('level17')} />}
        {gameState === 'level17' && <Level17Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition18', result)} />}
        {gameState === 'transition18' && <Level18Transition onContinue={() => setGameState('level18')} />}
        {gameState === 'level18' && <Level18Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition19', result)} />}
        {gameState === 'transition19' && <Level19Transition onContinue={() => setGameState('level19')} />}
        {gameState === 'level19' && <Level19Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition20', result)} />}
        {gameState === 'transition20' && <Level20Transition onContinue={() => setGameState('level20')} />}
        {gameState === 'level20' && <Level20Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition21', result)} />}
        {gameState === 'transition21' && <Level21Transition onContinue={() => setGameState('level21')} />}
        {gameState === 'level21' && <Level21Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition22', result)} />}
        {gameState === 'transition22' && <Level22Transition onContinue={() => setGameState('level22')} />}
        {gameState === 'level22' && <Level22Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition23', result)} />}
        {gameState === 'transition23' && <Level23Transition onContinue={() => setGameState('level23')} />}
        {gameState === 'level23' && <Level23Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition24', result)} />}
        {gameState === 'transition24' && <Level24Transition onContinue={() => setGameState('level24')} />}
        {gameState === 'level24' && <Level24Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition25', result)} />}
        {gameState === 'transition25' && <Level25Transition onContinue={() => setGameState('level25')} />}
        {gameState === 'level25' && <Level25Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition26', result)} />}
        {gameState === 'transition26' && <Level26Transition onContinue={() => setGameState('level26')} />}
        {gameState === 'level26' && <Level26Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition27', result)} />}
        {gameState === 'transition27' && <Level27Transition onContinue={() => setGameState('level27')} />}
        {gameState === 'level27' && <Level27Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition28', result)} />}
        {gameState === 'transition28' && <Level28Transition onContinue={() => setGameState('level28')} />}
        {gameState === 'level28' && <Level28Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition29', result)} />}
        {gameState === 'transition29' && <Level29Transition onContinue={() => setGameState('level29')} />}
        {gameState === 'level29' && <Level29Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition30', result)} />}
        {gameState === 'transition30' && <Level30Transition onContinue={() => setGameState('level30')} />}
        {gameState === 'level30' && <Level30Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition31', result)} />}
        {gameState === 'transition31' && <Level31Transition onContinue={() => setGameState('level31')} />}
        {gameState === 'level31' && <Level31Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition32', result)} />}
        {gameState === 'transition32' && <Level32Transition onContinue={() => setGameState('level32')} />}
        {gameState === 'level32' && <Level32Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition33', result)} />}
        {gameState === 'transition33' && <Level33Transition onContinue={() => setGameState('level33')} />}
        {gameState === 'level33' && <Level33Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition34', result)} />}
        {gameState === 'transition34' && <Level34Transition onContinue={() => setGameState('level34')} />}
        {gameState === 'level34' && <Level34Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition35', result)} />}
        {gameState === 'transition35' && <Level35Transition onContinue={() => setGameState('level35')} />}
        {gameState === 'level35' && <Level35Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition36', result)} />}
        {gameState === 'transition36' && <Level36Transition onContinue={() => setGameState('level36')} />}
        {gameState === 'level36' && <Level36Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition37', result)} />}
        {gameState === 'transition37' && <Level37Transition onContinue={() => setGameState('level37')} />}
        {gameState === 'level37' && <Level37Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition38', result)} />}
        {gameState === 'transition38' && <Level38Transition onContinue={() => setGameState('level38')} />}
        {gameState === 'level38' && <Level38Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition39', result)} />}
        {gameState === 'transition39' && <Level39Transition onContinue={() => setGameState('level39')} />}
        {gameState === 'level39' && <Level39Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition40', result)} />}
        {gameState === 'transition40' && <Level40Transition onContinue={() => setGameState('level40')} />}
        {gameState === 'level40' && <Level40Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition41', result)} />}
        {gameState === 'transition41' && <Level41Transition onContinue={() => setGameState('level41')} />}
        {gameState === 'level41' && <Level41Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition42', result)} />}
        {gameState === 'transition42' && <Level42Transition onContinue={() => setGameState('level42')} />}
        {gameState === 'level42' && <Level42Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition43', result)} />}
        {gameState === 'transition43' && <Level43Transition onContinue={() => setGameState('level43')} />}
        {gameState === 'level43' && <Level43Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition44', result)} />}
        {gameState === 'transition44' && <Level44Transition onContinue={() => setGameState('level44')} />}
        {gameState === 'level44' && <Level44Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition45', result)} />}
        {gameState === 'transition45' && <Level45Transition onContinue={() => setGameState('level45')} />}
        {gameState === 'level45' && <Level45Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition46', result)} />}
        {gameState === 'transition46' && <Level46Transition onContinue={() => setGameState('level46')} />}
        {gameState === 'level46' && <Level46Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition47', result)} />}
        {gameState === 'transition47' && <Level47Transition onContinue={() => setGameState('level47')} />}
        {gameState === 'level47' && <Level47Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition48', result)} />}
        {gameState === 'transition48' && <Level48Transition onContinue={() => setGameState('level48')} />}
        {gameState === 'level48' && <Level48Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition49', result)} />}
        {gameState === 'transition49' && <Level49Transition onContinue={() => setGameState('level49')} />}
        {gameState === 'level49' && <Level49Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition50', result)} />}
        {gameState === 'transition50' && <Level50Transition onContinue={() => setGameState('level50')} />}
        {gameState === 'level50' && <Level50Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition51', result)} />}
        {gameState === 'transition51' && <Level51Transition onContinue={() => setGameState('level51')} />}
        {gameState === 'level51' && <Level51Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition52', result)} />}
        {gameState === 'transition52' && <Level52Transition onContinue={() => setGameState('level52')} />}
        {gameState === 'level52' && <Level52Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition53', result)} />}
        {gameState === 'transition53' && <Level53Transition onContinue={() => setGameState('level53')} />}
        {gameState === 'level53' && <Level53Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition54', result)} />}
        {gameState === 'transition54' && <Level54Transition onContinue={() => setGameState('level54')} />}
        {gameState === 'level54' && <Level54Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition55', result)} />}
        {gameState === 'transition55' && <Level55Transition onContinue={() => setGameState('level55')} />}
        {gameState === 'level55' && <Level55Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition56', result)} />}
        {gameState === 'transition56' && <Level56Transition onContinue={() => setGameState('level56')} />}
        {gameState === 'level56' && <Level56Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition57', result)} />}
        {gameState === 'transition57' && <Level57Transition onContinue={() => setGameState('level57')} />}
        {gameState === 'level57' && <Level57Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition58', result)} />}
        {gameState === 'transition58' && <Level58Transition onContinue={() => setGameState('level58')} />}
        {gameState === 'level58' && <Level58Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition59', result)} />}
        {gameState === 'transition59' && <Level59Transition onContinue={() => setGameState('level59')} />}
        {gameState === 'level59' && <Level59Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition60', result)} />}
        {gameState === 'transition60' && <Level60Transition onContinue={() => setGameState('level60')} />}
        {gameState === 'level60' && <Level60Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition61', result)} />}
        {gameState === 'transition61' && <Level61Transition onContinue={() => setGameState('level61')} />}
        {gameState === 'level61' && <Level61Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition62', result)} />}
        {gameState === 'transition62' && <Level62Transition onContinue={() => setGameState('level62')} />}
        {gameState === 'level62' && <Level62Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition63', result)} />}
        {gameState === 'transition63' && <Level63Transition onContinue={() => setGameState('level63')} />}
        {gameState === 'level63' && <Level63Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition64', result)} />}
        {gameState === 'transition64' && <Level64Transition onContinue={() => setGameState('level64')} />}
        {gameState === 'level64' && <Level64Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition65', result)} />}
        {gameState === 'transition65' && <Level65Transition onContinue={() => setGameState('level65')} />}
        {gameState === 'level65' && <Level65Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('challengeWelcome', result)} />}
        {gameState === 'challengeWelcome' && <ChallengeWelcomeScreen onContinue={() => setGameState('level66')} />}
        {gameState === 'level66' && <Level66Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition67', result)} />}
        {gameState === 'transition67' && <Level67Transition onContinue={() => setGameState('level67')} />}
        {gameState === 'level67' && <Level67Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition68', result)} />}
        {gameState === 'transition68' && <Level68Transition onContinue={() => setGameState('level68')} />}
        {gameState === 'level68' && <Level68Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition69', result)} />}
        {gameState === 'transition69' && <Level69Transition onContinue={() => setGameState('level69')} />}
        {gameState === 'level69' && <Level69Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition70', result)} />}
        {gameState === 'transition70' && <Level70Transition onContinue={() => setGameState('level70')} />}
        {gameState === 'level70' && <Level70Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition71', result)} />}
        {gameState === 'transition71' && <Level71Transition onContinue={() => setGameState('level71')} />}
        {gameState === 'level71' && <Level71Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition72', result)} />}
        {gameState === 'transition72' && <Level72Transition onContinue={() => setGameState('level72')} />}
        {gameState === 'level72' && <Level72Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition73', result)} />}
        {gameState === 'transition73' && <Level73Transition onContinue={() => setGameState('level73')} />}
        {gameState === 'level73' && <Level73Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition74', result)} />}
        {gameState === 'transition74' && <Level74Transition onContinue={() => setGameState('level74')} />}
        {gameState === 'level74' && <Level74Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition75', result)} />}
        {gameState === 'transition75' && <Level75Transition onContinue={() => setGameState('level75')} />}
        {gameState === 'level75' && <Level75Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition76', result)} />}
        {gameState === 'transition76' && <Level76Transition onContinue={() => setGameState('level76')} />}
        {gameState === 'level76' && <Level76Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition77', result)} />}
        {gameState === 'transition77' && <Level77Transition onContinue={() => setGameState('level77')} />}
        {gameState === 'level77' && <Level77Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition78', result)} />}
        {gameState === 'transition78' && <Level78Transition onContinue={() => setGameState('level78')} />}
        {gameState === 'level78' && <Level78Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition79', result)} />}
        {gameState === 'transition79' && <Level79Transition onContinue={() => setGameState('level79')} />}
        {gameState === 'level79' && <Level79Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition80', result)} />}
        {gameState === 'transition80' && <Level80Transition onContinue={() => setGameState('level80')} />}
        {gameState === 'level80' && <Level80Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition81', result)} />}
        {gameState === 'transition81' && <Level81Transition onContinue={() => setGameState('level81')} />}
        {gameState === 'level81' && <Level81Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition82', result)} />}
        {gameState === 'transition82' && <Level82Transition onContinue={() => setGameState('level82')} />}
        {gameState === 'level82' && <Level82Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition83', result)} />}
        {gameState === 'transition83' && <Level83Transition onContinue={() => setGameState('level83')} />}
        {gameState === 'level83' && <Level83Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition84', result)} />}
        {gameState === 'transition84' && <Level84Transition onContinue={() => setGameState('level84')} />}
        {gameState === 'level84' && <Level84Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition85', result)} />}
        {gameState === 'transition85' && <Level85Transition onContinue={() => setGameState('level85')} />}
        {gameState === 'level85' && <Level85Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition86', result)} />}
        {gameState === 'transition86' && <Level86Transition onContinue={() => setGameState('level86')} />}
        {gameState === 'level86' && <Level86Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition87', result)} />}
        {gameState === 'transition87' && <Level87Transition onContinue={() => setGameState('level87')} />}
        {gameState === 'level87' && <Level87Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition88', result)} />}
        {gameState === 'transition88' && <Level88Transition onContinue={() => setGameState('level88')} />}
        {gameState === 'level88' && <Level88Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition89', result)} />}
        {gameState === 'transition89' && <Level89Transition onContinue={() => setGameState('level89')} />}
        {gameState === 'level89' && <Level89Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition90', result)} />}
        {gameState === 'transition90' && <Level90Transition onContinue={() => setGameState('level90')} />}
        {gameState === 'level90' && <Level90Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition91', result)} />}
        {gameState === 'transition91' && <Level91Transition onContinue={() => setGameState('level91')} />}
        {gameState === 'level91' && <Level91Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition92', result)} />}
        {gameState === 'transition92' && <Level92Transition onContinue={() => setGameState('level92')} />}
        {gameState === 'level92' && <Level92Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition93', result)} />}
        {gameState === 'transition93' && <Level93Transition onContinue={() => setGameState('level93')} />}
        {gameState === 'level93' && <Level93Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition94', result)} />}
        {gameState === 'transition94' && <Level94Transition onContinue={() => setGameState('level94')} />}
        {gameState === 'level94' && <Level94Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition95', result)} />}
        {gameState === 'transition95' && <Level95Transition onContinue={() => setGameState('level95')} />}
        {gameState === 'level95' && <Level95Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition96', result)} />}
        {gameState === 'transition96' && <Level96Transition onContinue={() => setGameState('level96')} />}
        {gameState === 'level96' && <Level96Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition97', result)} />}
        {gameState === 'transition97' && <Level97Transition onContinue={() => setGameState('level97')} />}
        {gameState === 'level97' && <Level97Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition98', result)} />}
        {gameState === 'transition98' && <Level98Transition onContinue={() => setGameState('level98')} />}
        {gameState === 'level98' && <Level98Screen onRestart={handleRestart} onLevelComplete={(result) => goToState('transition99', result)} />}
        {gameState === 'transition99' && <Level99Transition onContinue={() => setGameState('level99')} />}
        {gameState === 'level99' && <Level99Screen onRestart={handleRestart} onLevelComplete={(data) => { completeLevel(99, { score: 8, maxScore: 10, timeRemaining: 30, totalTime: 60, lostAttempts: 0 }); setTeamData(data as TeamData); setGameState('level100'); }} />}
        {gameState === 'level100' && teamData && <Level100Screen teamData={teamData} onRestart={handleRestart} />}
      </Suspense>

      <InterstitialAd open={showInterstitial} onClose={closeInterstitial} />
    </div>
  );
};

export default Index;
