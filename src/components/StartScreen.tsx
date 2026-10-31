import { Brain, Globe2, Map, Settings, Shield, Sparkles, Swords, Trophy } from 'lucide-react';
import challengeArena from '@/assets/challenge-arena-hero.png';
import koraTitansMark from '@/assets/kora-titans-mark.svg';
import { useI18n } from '@/i18n/I18nProvider';
import { CURRENT_SEASON, leagues, leagueClubs } from '@/data/leagues';
import { LeagueBadge } from './FootballBadges';

interface StartScreenProps {
  onStart: () => void;
  onShowLevelSelect: () => void;
  onShowSettings: () => void;
  onShowWorldCup: () => void;
  onShowClubDirectory: () => void;
}

export function StartScreen({ onStart, onShowLevelSelect, onShowSettings, onShowWorldCup, onShowClubDirectory }: StartScreenProps) {
  const { locale, setLocale, direction, t } = useI18n();

  return (
    <main className="challenge-home relative min-h-screen overflow-hidden bg-slate-950 text-white" dir={direction}>
      <img src={challengeArena} alt="" className="absolute inset-0 h-full w-full object-cover object-center" fetchPriority="high" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/45 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(16,185,129,0.16),transparent_55%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 pb-8 pt-5 md:px-10 md:pt-8">
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/45 px-3 py-2 backdrop-blur-lg">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-300/10"><img src={koraTitansMark} alt="" className="h-10 w-10" /></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200/80">{locale === 'ar' ? 'تحديات كرة القدم' : 'Football Quiz'}</p>
              <p className="text-sm font-black tracking-wide">{t('brand')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-white/15 bg-slate-950/50 p-1 backdrop-blur-lg" aria-label={t('languageLabel')}>
              <button onClick={() => setLocale('ar')} aria-pressed={locale === 'ar'} className={`rounded-full px-3 py-2 text-xs font-bold transition ${locale === 'ar' ? 'bg-white text-slate-950' : 'text-white/75 hover:text-white'}`}>العربية</button>
              <button onClick={() => setLocale('en')} aria-pressed={locale === 'en'} className={`rounded-full px-3 py-2 text-xs font-bold transition ${locale === 'en' ? 'bg-white text-slate-950' : 'text-white/75 hover:text-white'}`}>EN</button>
            </div>
            <button onClick={onShowSettings} aria-label={t('settings')} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950/50 text-white/80 backdrop-blur-lg transition hover:bg-white/10 hover:text-white">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </header>

        <section className="my-auto grid items-center gap-8 py-12 md:grid-cols-[1.05fr_0.95fr] md:py-16">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/25 bg-emerald-300/10 px-4 py-2 text-xs font-bold tracking-wide text-emerald-100 backdrop-blur-md">
              <Sparkles className="h-4 w-4" /> {t('eyebrow')}
            </div>
            <h1 className="mb-5 text-4xl font-black leading-[1.13] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] md:text-6xl">
              {t('brand')}
            </h1>
            <p className="mb-3 text-lg font-extrabold text-emerald-100 md:text-2xl">{t('heroTitle')}</p>
            <p className="max-w-xl text-base leading-8 text-slate-200 md:text-xl md:leading-9">
              {t('heroDescription')}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/55 px-4 py-3 backdrop-blur-md">
                <Shield className="h-5 w-5 text-amber-200" /><span className="font-bold">{t('stageCount')}</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/55 px-4 py-3 backdrop-blur-md">
                <Globe2 className="h-5 w-5 text-cyan-200" /><span className="font-bold">{t('leagueCount')}</span>
              </div>
            </div>

            <div className="mt-4 max-w-xl rounded-2xl border border-white/10 bg-slate-950/45 p-4 backdrop-blur-md">
              <div className="mb-3 flex items-center justify-between gap-3 text-xs font-bold text-slate-200/75">
                <span>{t('leagueOverview')}</span><span className="text-emerald-200/70">{CURRENT_SEASON}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {leagues.map((league) => (
                  <span key={league.id} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-2 py-1 text-xs font-semibold text-slate-100/90">
                    <LeagueBadge leagueId={league.id} size={20} />
                    {locale === 'ar' ? league.nameAr : league.nameEn}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={onStart} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-300 to-lime-200 px-8 text-base font-black text-slate-950 shadow-[0_14px_42px_rgba(16,185,129,0.24)] transition hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-200">
                <Swords className="h-5 w-5" /> {t('startGame')}
              </button>
              <button onClick={onShowLevelSelect} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/20 bg-slate-950/55 px-7 text-base font-bold text-white shadow-lg backdrop-blur-md transition hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                <Map className="h-5 w-5" /> {t('viewLevels')}
              </button>
            </div>
            <div className="mt-3 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
              <button onClick={onShowWorldCup} className="group flex min-h-[76px] items-center gap-4 rounded-2xl border border-amber-200/25 bg-slate-950/55 p-4 text-start shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 hover:border-amber-200/50 hover:bg-amber-300/[0.08]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-200/20 bg-amber-300/10 text-amber-100"><Trophy className="h-5 w-5" /></span>
                <span><span className="block font-black">{locale === 'ar' ? 'تحدي كأس العالم' : 'World Cup challenge'}</span><span className="mt-1 block text-xs text-slate-300/75">{locale === 'ar' ? 'كل النسخ والمنتخبات الـ48 في 2026' : 'Every edition + all 48 teams from 2026'}</span></span>
              </button>
              <button onClick={onShowClubDirectory} className="group flex min-h-[76px] items-center gap-4 rounded-2xl border border-cyan-100/20 bg-slate-950/55 p-4 text-start shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 hover:border-cyan-100/45 hover:bg-cyan-200/[0.07]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-100/20 bg-cyan-200/10 text-cyan-100"><Globe2 className="h-5 w-5" /></span>
                <span><span className="block font-black">{locale === 'ar' ? 'دليل الأندية' : 'Club directory'}</span><span className="mt-1 block text-xs text-slate-300/75">{locale === 'ar' ? `${leagueClubs.length} نادياً · ${leagues.length} دوريات` : `${leagueClubs.length} clubs · ${leagues.length} leagues`}</span></span>
              </button>
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-md md:block">
            <div className="absolute -inset-6 rounded-[2rem] bg-emerald-300/10 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/15 bg-slate-950/60 p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200/80">{locale === 'ar' ? 'لوحة التحديات' : 'Challenge board'}</p><p className="mt-1 text-xl font-black">{locale === 'ar' ? 'اختر مهارتك' : 'Choose your game'}</p></div>
                <span className="rounded-xl bg-amber-300/15 p-3 text-amber-200"><Brain className="h-6 w-6" /></span>
              </div>
              <div className="space-y-3">
                {(locale === 'ar'
                  ? [['⚽', 'معرفة اللاعبين', 'اختبر ذاكرتك ومساراتهم'], ['🌍', 'الدوريات والأندية', 'قارن داخل المنافسة نفسها'], ['🧠', 'التكتيك والتاريخ', 'فكّر قبل أن تختار']]
                  : [['⚽', 'Player knowledge', 'Recall careers and key moments'], ['🌍', 'Leagues and clubs', 'Compare teams within one league'], ['🧠', 'Tactics and history', 'Think before you choose']]).map(([icon, title, description]) => (
                  <div key={title} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-2xl">{icon}</span>
                    <div><p className="font-extrabold">{title}</p><p className="mt-1 text-sm text-slate-300">{description}</p></div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between rounded-xl border border-amber-200/15 bg-amber-300/[0.07] px-4 py-3 text-sm">
                <span className="text-amber-100/80">{locale === 'ar' ? 'كل سؤال له سياقه' : 'Every question has context'}</span>
                <span className="font-black text-amber-100">{locale === 'ar' ? 'مستعد؟' : 'Ready?'}</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-300/80">
          <span>{locale === 'ar' ? 'تحديات كروية، بلغتك.' : 'Football challenges, in your language.'}</span>
          <span className="inline-flex items-center gap-1"><Sparkles className="h-3.5 w-3.5 text-amber-200" /> {locale === 'ar' ? 'العب. تعلّم. تقدّم.' : 'Play. Learn. Progress.'}</span>
        </footer>
        <div className="mt-3 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/15 bg-slate-950/45 px-3 py-1.5 text-[11px] font-semibold text-amber-100/75 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-200" />
            {locale === 'ar'
              ? <>صنعت بواسطة <bdi dir="ltr">MOHAMMED ALZUBAIR</bdi></>
              : <>Made by <bdi dir="ltr">MOHAMMED ALZUBAIR</bdi></>}
          </span>
        </div>
      </div>
    </main>
  );
}
