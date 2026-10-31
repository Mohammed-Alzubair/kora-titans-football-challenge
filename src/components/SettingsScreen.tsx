import { useState } from 'react';
import {
  ArrowRight,
  Volume2,
  VolumeX,
  Music,
  Sun,
  Languages,
  HelpCircle,
  RotateCcw,
  LogOut,
  ChevronDown,
  ChevronUp,
  Settings,
  Zap,
  Palette,
  Trophy } from 'lucide-react';
import sportsArena from '@/assets/sports-arena-2027.png';
import { useI18n } from '@/i18n/I18nProvider';
import { CURRENT_SEASON, leagues, leagueClubs } from '@/data/leagues';
import { useSound } from '@/hooks/useSound';

interface SettingsScreenProps {
  onBack: () => void;
  setMenuVolume: (v: number) => void;
  setProgressVolume: (v: number) => void;
  setSfxVolume: (v: number) => void;
  menuVolume: number;
  progressVolume: number;
  sfxVolume: number;
}

export function SettingsScreen({ onBack, setMenuVolume, setProgressVolume, setSfxVolume, menuVolume, progressVolume, sfxVolume }: SettingsScreenProps) {
  const { locale, setLocale, direction, isArabic, t } = useI18n();
  const { playSound } = useSound();
  
  // Settings state (persisted via localStorage)
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('game_sound');
    return saved !== null ? saved === 'true' : true;
  });
  const [musicEnabled, setMusicEnabled] = useState(() => {
    const saved = localStorage.getItem('game_music');
    return saved !== null ? saved === 'true' : true;
  });
  const [sfxEnabled, setSfxEnabled] = useState(() => {
    const saved = localStorage.getItem('game_sfx');
    return saved !== null ? saved === 'true' : true;
  });
  const [menuVolumeState, setMenuVolumeLocal] = useState(() => {
    const saved = localStorage.getItem('game_menu_volume');
    return saved !== null ? parseInt(saved) : 30;
  });
  const [progressVolumeState, setProgressVolumeLocal] = useState(() => {
    const saved = localStorage.getItem('game_progress_volume');
    return saved !== null ? parseInt(saved) : 30;
  });
  const [sfxVolumeState, setSfxVolumeLocalState] = useState(() => {
    const saved = localStorage.getItem('game_sfx_volume');
    return saved !== null ? parseInt(saved) : 70;
  });
  const [brightness, setBrightness] = useState(() => {
    const saved = localStorage.getItem('game_brightness');
    return saved !== null ? parseInt(saved) : 100;
  });
  const [visualTheme, setVisualTheme] = useState(() => {
    const saved = localStorage.getItem('game_visual_theme');
    return saved === 'pitch-green' || saved === 'champion-gold' ? saved : 'stadium-blue';
  });
  const [showExplanation, setShowExplanation] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showResetProgressModal, setShowResetProgressModal] = useState(false);

  const handleResetProgress = () => {
    localStorage.removeItem('game_progress');
    localStorage.removeItem('has_seen_onboarding');
    window.location.reload();
  };

  const saveAndSet = (key: string, value: string, setter: (v: any) => void, val: any) => {
    localStorage.setItem(key, value);
    setter(val);
  };

  const handleReset = () => {
    localStorage.removeItem('game_sound');
    localStorage.removeItem('game_music');
    localStorage.removeItem('game_sfx');
    localStorage.removeItem('game_brightness');
    localStorage.removeItem('game_visual_theme');
    localStorage.removeItem('game_menu_volume');
    localStorage.removeItem('game_progress_volume');
    localStorage.removeItem('game_sfx_volume');
    setSoundEnabled(true);
    setMusicEnabled(true);
    setSfxEnabled(true);
    setBrightness(100);
    setVisualTheme('stadium-blue');
    setMenuVolumeLocal(30);
    setProgressVolumeLocal(30);
    setSfxVolumeLocalState(70);
    setMenuVolume(0.3);
    setProgressVolume(0.3);
    setSfxVolume(0.7);
    setShowResetModal(false);
  };

  return (
    <div
      className="settings-page min-h-screen relative overflow-hidden bg-slate-950 text-white"
      dir={direction}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img src={sportsArena} alt="" className="w-full h-full object-cover" style={{ filter: `brightness(${brightness}%)` }} />
        <div className={`absolute inset-0 ${visualTheme === 'pitch-green' ? 'bg-emerald-950/50' : visualTheme === 'champion-gold' ? 'bg-amber-950/55' : 'bg-blue-950/55'}`} />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/65 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_5%,rgba(34,211,238,0.16),transparent_58%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-5 pb-16 md:px-8 md:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={onBack}
            className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center backdrop-blur-xl hover:bg-white/15 active:scale-90 transition-transform"
            aria-label={t('backHome')}
          >
            <ArrowRight className={`w-5 h-5 text-cyan-100 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
          </button>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-100/20 bg-cyan-300/10 text-cyan-100"><Settings className="w-5 h-5" /></div>
            <div className="text-end">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-100/65">{isArabic ? 'مركز التحكم' : 'CONTROL ROOM'}</p>
              <h1 className="text-2xl md:text-3xl font-black text-white">{t('settingsTitle')}</h1>
            </div>
          </div>
          <div className="w-10" />
        </div>

        <section className="settings-hero mb-5 overflow-hidden rounded-[1.75rem] border border-white/15 p-5 md:p-7 backdrop-blur-xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100/20 bg-cyan-200/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100"><Trophy className="h-3.5 w-3.5" /> {isArabic ? 'إعدادات موسم التحدي' : 'MATCHDAY PREFERENCES'}</span>
              <h2 className="mt-3 text-2xl font-black md:text-4xl">{isArabic ? 'جهّز ساحتك للمباراة' : 'Set up your arena'}</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-200/75">{isArabic ? 'تحكم بالصوت والمظهر واللغة، واحفظ إعداداتك تلقائياً على هذا الجهاز.' : 'Tune audio, visuals and language. Your choices are saved on this device.'}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center md:min-w-[330px]">
              <SummaryStat value={CURRENT_SEASON} label={isArabic ? 'الموسم' : 'Season'} />
              <SummaryStat value={String(leagues.length)} label={isArabic ? 'دوريات' : 'Leagues'} />
              <SummaryStat value={String(leagueClubs.length)} label={isArabic ? 'نادياً' : 'Clubs'} />
            </div>
          </div>
        </section>

        {/* Settings Cards */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

          {/* Sound Toggle */}
          <SettingsCard
            icon={soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            label={t('generalSound')}
            description={t('allSounds')}
          >
            <ToggleSwitch
              enabled={soundEnabled}
              onChange={(v) => {
                saveAndSet('game_sound', String(v), setSoundEnabled, v);
              }}
            />
          </SettingsCard>

          {/* Background Music */}
          <div
            className={`settings-card rounded-2xl p-4 transition-all ${!soundEnabled ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-600/30 flex items-center justify-center shrink-0 text-amber-400">
                <Music className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-white font-bold text-sm block">{t('backgroundMusic')}</span>
                <span className="text-amber-300/50 text-xs">{t('volumeControl')}</span>
              </div>
              <ToggleSwitch
                enabled={musicEnabled && soundEnabled}
                onChange={(v) => {
                  saveAndSet('game_music', String(v), setMusicEnabled, v);
                }}
                disabled={!soundEnabled}
              />
            </div>
            {/* Menu Music Volume */}
            {musicEnabled && soundEnabled && (
              <div className="mt-4 space-y-3">
                <div>
                  <span className="text-amber-300/70 text-xs font-bold block mb-1">🏠 {t('mainMenu')}</span>
                  <div className="flex items-center gap-3">
                    <VolumeX className="w-4 h-4 text-amber-400/50 shrink-0" />
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={menuVolumeState}
                      onChange={(e) => {
                        const v = parseInt(e.target.value);
                        setMenuVolumeLocal(v);
                        localStorage.setItem('game_menu_volume', String(v));
                        setMenuVolume(v / 100);
                      }}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to left, #f59e0b ${menuVolumeState}%, #44403c ${menuVolumeState}%)` }}
                    />
                    <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-amber-300/70 text-xs font-bold w-8 text-center">{menuVolumeState}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-amber-300/70 text-xs font-bold block mb-1">🗺️ {t('progressMap')}</span>
                  <div className="flex items-center gap-3">
                    <VolumeX className="w-4 h-4 text-amber-400/50 shrink-0" />
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={progressVolumeState}
                      onChange={(e) => {
                        const v = parseInt(e.target.value);
                        setProgressVolumeLocal(v);
                        localStorage.setItem('game_progress_volume', String(v));
                        setProgressVolume(v / 100);
                      }}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to left, #f59e0b ${progressVolumeState}%, #44403c ${progressVolumeState}%)` }}
                    />
                    <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-amber-300/70 text-xs font-bold w-8 text-center">{progressVolumeState}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sound Effects with Volume */}
          <div className={`settings-card rounded-2xl p-4 transition-all ${!soundEnabled ? 'opacity-50' : ''}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-600/30 flex items-center justify-center shrink-0 text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-white font-bold text-sm block">{t('soundEffects')}</span>
                <span className="text-amber-300/50 text-xs">{t('buttonAnswerSounds')}</span>
              </div>
              <ToggleSwitch
                enabled={sfxEnabled && soundEnabled}
                onChange={(v) => saveAndSet('game_sfx', String(v), setSfxEnabled, v)}
                disabled={!soundEnabled}
              />
            </div>
            {/* SFX Volume Slider */}
            {sfxEnabled && soundEnabled && (
              <div className="mt-3 space-y-3">
                <div className="flex items-center gap-3">
                  <VolumeX className="w-4 h-4 text-amber-400/50 shrink-0" />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sfxVolumeState}
                    onChange={(e) => {
                      const v = parseInt(e.target.value);
                      setSfxVolumeLocalState(v);
                      localStorage.setItem('game_sfx_volume', String(v));
                      setSfxVolume(v / 100);
                    }}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to left, #f59e0b ${sfxVolumeState}%, #44403c ${sfxVolumeState}%)` }}
                  />
                  <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-amber-300/70 text-xs font-bold w-8 text-center">{sfxVolumeState}%</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => playSound('correct')} className="rounded-xl border border-emerald-100/15 bg-emerald-300/[0.08] px-3 py-2 text-xs font-bold text-emerald-50 transition hover:bg-emerald-300/[0.14]">{isArabic ? '▶ تجربة صوت الإجابة الصحيحة' : '▶ Preview goal cue'}</button>
                  <button type="button" onClick={() => playSound('wrong')} className="rounded-xl border border-rose-100/15 bg-rose-300/[0.07] px-3 py-2 text-xs font-bold text-rose-50 transition hover:bg-rose-300/[0.13]">{isArabic ? '▶ تجربة صوت الإجابة الخاطئة' : '▶ Preview miss cue'}</button>
                </div>
              </div>
            )}
          </div>

          {/* Brightness / Visual */}
          <SettingsCard
            icon={<Sun className="w-5 h-5" />}
            label={t('brightness')}
            description={`${brightness}%`}
          >
            <div className="w-full mt-2">
              <input
                type="range"
                min={30}
                max={100}
                value={brightness}
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  saveAndSet('game_brightness', String(v), setBrightness, v);
                }}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to left, #f59e0b ${brightness}%, #44403c ${brightness}%)` }}
              />
            </div>
          </SettingsCard>

          <section className="settings-card rounded-2xl p-4 md:p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-100/15 bg-cyan-300/10 text-cyan-100"><Palette className="h-5 w-5" /></div>
              <div><h3 className="text-sm font-black text-white">{isArabic ? 'هوية الملعب' : 'Stadium look'}</h3><p className="text-xs text-slate-300/65">{isArabic ? 'اختر لوحة الألوان لخلفية اللعب' : 'Choose the color treatment for your match background'}</p></div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <ThemeButton id="stadium-blue" active={visualTheme === 'stadium-blue'} onClick={() => { setVisualTheme('stadium-blue'); localStorage.setItem('game_visual_theme', 'stadium-blue'); }} title={isArabic ? 'ليلة زرقاء' : 'Blue night'} subtitle={isArabic ? 'أزرق وسماوي' : 'Blue & cyan'} />
              <ThemeButton id="pitch-green" active={visualTheme === 'pitch-green'} onClick={() => { setVisualTheme('pitch-green'); localStorage.setItem('game_visual_theme', 'pitch-green'); }} title={isArabic ? 'طاقة الملعب' : 'Pitch energy'} subtitle={isArabic ? 'أخضر وتركواز' : 'Green & teal'} />
              <ThemeButton id="champion-gold" active={visualTheme === 'champion-gold'} onClick={() => { setVisualTheme('champion-gold'); localStorage.setItem('game_visual_theme', 'champion-gold'); }} title={isArabic ? 'ليلة الأبطال' : 'Champions gold'} subtitle={isArabic ? 'ذهبي وكهرماني' : 'Gold & amber'} />
            </div>
          </section>

          {/* Language */}
          <SettingsCard
            icon={<Languages className="w-5 h-5" />}
            label={t('languageLabel')}
            description={t('chooseLanguage')}
          >
            <div className="flex gap-2 mt-1">
              <LangButton label="العربية" active={locale === 'ar'} onClick={() => setLocale('ar')} />
              <LangButton label="English" active={locale === 'en'} onClick={() => setLocale('en')} />
            </div>
          </SettingsCard>

          {/* Game Explanation - Collapsible */}
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="settings-card w-full rounded-2xl overflow-hidden transition-all text-start"
          >
            <div className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-600/30 flex items-center justify-center text-amber-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="flex-1 text-start">
                <span className="text-white font-bold text-sm">{t('gameGuide')}</span>
                <p className="text-amber-300/50 text-xs">{t('howToPlayGame')}</p>
              </div>
              {showExplanation ? (
                <ChevronUp className="w-5 h-5 text-amber-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-amber-400" />
              )}
            </div>
          </button>

          {showExplanation && (
            <div
              className="settings-card rounded-2xl p-4 space-y-3 animate-fade-in lg:col-span-2"
            >
              <ExplanationItem emoji="⚔️" text={t('guideOne')} />
              <ExplanationItem emoji="🎯" text={t('guideTwo')} />
              <ExplanationItem emoji="⭐" text={t('guideThree')} />
              <ExplanationItem emoji="🔓" text={isArabic ? 'تحتاج إلى 3 نجوم على الأقل لفتح المرحلة التالية.' : 'Earn at least 3 stars to unlock the next stage.'} />
              <ExplanationItem emoji="💡" text={t('guideFour')} />
              <ExplanationItem emoji="🏆" text={t('guideFive')} />
              <ExplanationItem emoji="🔥" text={t('guideSix')} />
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-white/10 my-1 lg:col-span-2" />

          {/* Reset Progress */}
          <ActionCard
            icon={<RotateCcw className="w-5 h-5" />}
            label={t('resetProgress')}
            description={t('clearProgress')}
            color="red"
            onClick={() => setShowResetProgressModal(true)}
          />

          {/* Reset Settings */}
          <ActionCard
            icon={<RotateCcw className="w-5 h-5" />}
            label={t('resetSettings')}
            description={t('restoreDefaults')}
            color="amber"
            onClick={() => setShowResetModal(true)}
          />

          {/* Exit Game */}
          <ActionCard
            icon={<LogOut className="w-5 h-5" />}
            label={t('exitGame')}
            description={t('backToHome')}
            color="red"
            onClick={() => setShowExitModal(true)}
          />
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <ConfirmModal
          title={t('resetSettings')}
          message={t('resetSettingsQuestion')}
          confirmLabel={t('yesReset')}
          cancelLabel={t('cancel')}
          onConfirm={handleReset}
          onCancel={() => setShowResetModal(false)}
          icon={<RotateCcw className="w-8 h-8 text-amber-400" />}
        />
      )}

      {/* Reset Progress Confirmation Modal */}
      {showResetProgressModal && (
        <ConfirmModal
          title={t('resetProgress')}
          message={t('resetProgressQuestion')}
          confirmLabel={t('yesClearProgress')}
          cancelLabel={t('cancel')}
          onConfirm={handleResetProgress}
          onCancel={() => setShowResetProgressModal(false)}
          icon={<RotateCcw className="w-8 h-8 text-red-400" />}
          danger
        />
      )}

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <ConfirmModal
          title={t('exitGame')}
          message={t('exitQuestion')}
          confirmLabel={t('yesExit')}
          cancelLabel={t('stay')}
          onConfirm={onBack}
          onCancel={() => setShowExitModal(false)}
          icon={<LogOut className="w-8 h-8 text-red-400" />}
          danger
        />
      )}
    </div>
  );
}

/* ─── Sub-components ─── */

function SettingsCard({
  icon,
  label,
  description,
  children,
  disabled }: {
  icon: React.ReactNode;
  label: string;
  description: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div
      className={`settings-card rounded-2xl p-4 transition-all ${disabled ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-cyan-300/10 border border-cyan-100/15 flex items-center justify-center shrink-0 text-cyan-100">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-white font-bold text-sm block">{label}</span>
          <span className="text-slate-300/65 text-xs">{description}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function ToggleSwitch({
  enabled,
  onChange,
  disabled }: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      className={`relative w-14 h-8 rounded-full transition-all duration-300 shrink-0 ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer active:scale-95'
      }`}
      style={{
        background: enabled
          ? 'linear-gradient(135deg, #f59e0b, #d97706)'
          : 'linear-gradient(135deg, #44403c, #292524)',
        boxShadow: enabled ? '0 0 12px rgba(245,158,11,0.4)' : 'none' }}
    >
      <div
        className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg transition-all duration-300"
        style={{
          right: enabled ? '4px' : 'auto',
          left: enabled ? 'auto' : '4px' }}
      />
    </button>
  );
}

function LangButton({
  label,
  active,
  onClick,
  disabled }: {
  label: string;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
        active
          ? 'bg-amber-500/30 border border-amber-400/50 text-amber-300'
          : 'bg-stone-800/50 border border-stone-700/30 text-stone-400'
      } ${disabled ? 'opacity-40 cursor-not-allowed' : 'active:scale-95'}`}
    >
      {label}
    </button>
  );
}

function SummaryStat({ value, label }: { value: string; label: string }) {
  return <div className="rounded-xl border border-white/10 bg-slate-950/35 px-2 py-2.5 backdrop-blur-md"><p className="text-sm font-black text-cyan-100 md:text-base">{value}</p><p className="mt-0.5 text-[10px] font-semibold text-slate-300/65">{label}</p></div>;
}

function ThemeButton({ id, active, onClick, title, subtitle }: {
  id: 'stadium-blue' | 'pitch-green' | 'champion-gold';
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
}) {
  const swatch = id === 'pitch-green'
    ? 'linear-gradient(135deg,rgba(16,185,129,.4),rgba(8,47,73,.75))'
    : id === 'champion-gold'
      ? 'linear-gradient(135deg,rgba(245,158,11,.42),rgba(69,26,3,.8))'
      : 'linear-gradient(135deg,rgba(14,165,233,.42),rgba(15,23,42,.8))';
  return <button type="button" aria-pressed={active} onClick={onClick} className={`min-h-[74px] rounded-xl border p-2 text-start transition hover:-translate-y-0.5 ${active ? 'border-cyan-100/70 ring-2 ring-cyan-200/25' : 'border-white/10 hover:border-white/25'}`} style={{ background: swatch }}><span className="block text-[11px] font-black leading-4 text-white">{title}</span><span className="mt-1 block text-[9px] font-semibold text-white/65">{subtitle}</span></button>;
}

function ActionCard({
  icon,
  label,
  description,
  color,
  onClick }: {
  icon: React.ReactNode;
  label: string;
  description: string;
  color: 'amber' | 'red';
  onClick: () => void;
}) {
  const colors = {
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-600/30',
      text: 'text-amber-400',
      desc: 'text-amber-300/50' },
    red: {
      bg: 'bg-red-500/10',
      border: 'border-red-600/30',
      text: 'text-red-400',
      desc: 'text-red-300/50' } };
  const c = colors[color];

  return (
    <button
      onClick={onClick}
      className={`settings-card w-full rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition-all`}
    >
      <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center ${c.text}`}>
        {icon}
      </div>
      <div className="flex-1 text-start">
        <span className={`font-bold text-sm ${c.text}`}>{label}</span>
        <p className={`text-xs ${c.desc}`}>{description}</p>
      </div>
      <ArrowRight className={`w-4 h-4 ${c.text} ${typeof document !== 'undefined' && document.documentElement.dir === 'rtl' ? 'rotate-180' : ''}`} />
    </button>
  );
}

function ExplanationItem({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-lg shrink-0">{emoji}</span>
      <p className="text-white/80 text-xs font-medium leading-relaxed">{text}</p>
    </div>
  );
}

function ConfirmModal({
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  icon,
  danger }: {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  icon: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
      <div
        className="relative rounded-3xl border border-white/15 p-6 max-w-sm w-full text-center animate-fade-in bg-slate-950/95 backdrop-blur-2xl"
      >
        <div className="mb-4">{icon}</div>
        <h3 className="text-white font-black text-lg mb-2">{title}</h3>
        <p className="text-amber-300/60 text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-stone-800/80 border border-stone-700/50 text-stone-300 font-bold text-sm active:scale-95 transition-transform"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 rounded-xl font-bold text-sm active:scale-95 transition-transform ${
              danger
                ? 'bg-red-600/80 border border-red-500/50 text-white'
                : 'bg-amber-600/80 border border-amber-500/50 text-white'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
