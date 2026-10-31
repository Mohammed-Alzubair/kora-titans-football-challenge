import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, X } from 'lucide-react';
import { CURRENT_SEASON, leagues, leagueClubs, type LeagueId } from '@/data/leagues';
import { useI18n } from '@/i18n/I18nProvider';
import { StoneBackground } from './StoneBackground';
import { ClubBadge, LeagueBadge } from './FootballBadges';

export function ClubDirectoryScreen({ onBack }: { onBack: () => void }) {
  const { locale, direction, isArabic } = useI18n();
  const [activeLeague, setActiveLeague] = useState<LeagueId | 'all'>('all');
  const [search, setSearch] = useState('');

  const visibleLeagues = useMemo(() => leagues.filter((league) => activeLeague === 'all' || league.id === activeLeague), [activeLeague]);
  const clubsByLeague = useMemo(() => visibleLeagues.map((league) => ({
    league,
    clubs: leagueClubs.filter((club) => club.leagueId === league.id && `${club.nameAr} ${club.nameEn}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())),
  })).filter((group) => group.clubs.length > 0), [visibleLeagues, search]);
  const resultCount = clubsByLeague.reduce((count, group) => count + group.clubs.length, 0);

  return (
    <main className="relative min-h-screen overflow-hidden text-white" dir={direction}>
      <StoneBackground levelNum={78} />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-5 md:px-8 md:py-8">
        <header className="mb-6 flex items-center justify-between gap-4">
          <button onClick={onBack} className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/15 bg-slate-950/55 px-4 font-bold backdrop-blur-xl transition hover:bg-white/10">
            {isArabic ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            <span>{isArabic ? 'الرئيسية' : 'Home'}</span>
          </button>
          <span className="rounded-full border border-emerald-200/20 bg-emerald-300/10 px-3 py-2 text-xs font-black text-emerald-100">{CURRENT_SEASON}</span>
        </header>

        <section className="mb-6 rounded-[1.75rem] border border-white/15 bg-slate-950/55 p-5 shadow-2xl backdrop-blur-xl md:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-100/70">{isArabic ? 'موسم كرة القدم 2026/27' : '2026/27 FOOTBALL SEASON'}</p>
              <h1 className="mt-2 text-3xl font-black md:text-5xl">{isArabic ? 'دليل الأندية' : 'Club directory'}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-200/75">{isArabic ? 'تصفّح الأندية المشاركة في الدوريات السبعة المدرجة في التحدي. خيارات أسئلة كل دوري تُسحب من أنديته فقط.' : 'Browse every club in the seven leagues used by the challenge. League quiz choices stay within the selected league.'}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:min-w-[250px]">
              <Metric value={String(resultCount)} label={isArabic ? 'نادٍ ظاهر' : 'clubs shown'} />
              <Metric value={String(visibleLeagues.length)} label={isArabic ? 'دوري' : 'leagues'} />
            </div>
          </div>

          <div className="relative mt-5">
            <Search className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${isArabic ? 'right-4' : 'left-4'}`} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={isArabic ? 'ابحث عن نادٍ...' : 'Search clubs...'} aria-label={isArabic ? 'ابحث عن نادٍ' : 'Search clubs'} className={`h-12 w-full rounded-xl border border-white/15 bg-slate-950/65 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-100/50 focus:ring-2 focus:ring-cyan-100/15 ${isArabic ? 'pr-11 pl-11 text-right' : 'pl-11 pr-11 text-left'}`} />
            {search && <button onClick={() => setSearch('')} aria-label={isArabic ? 'مسح البحث' : 'Clear search'} className={`absolute top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white ${isArabic ? 'left-2' : 'right-2'}`}><X className="h-4 w-4" /></button>}
          </div>

          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label={isArabic ? 'تصفية الدوريات' : 'Filter leagues'}>
            <LeagueFilter active={activeLeague === 'all'} onClick={() => setActiveLeague('all')} label={isArabic ? 'الكل' : 'All leagues'} count={leagueClubs.length} />
            {leagues.map((league) => <LeagueFilter key={league.id} active={activeLeague === league.id} onClick={() => setActiveLeague(league.id)} label={isArabic ? league.nameAr : league.nameEn} count={league.clubIds.length} />)}
          </nav>
        </section>

        {clubsByLeague.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-8 text-center text-slate-200/70">{isArabic ? 'لا توجد أندية تطابق البحث.' : 'No clubs match your search.'}</div>
        ) : clubsByLeague.map(({ league, clubs }) => (
          <section key={league.id} className="mb-6 rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4 backdrop-blur-lg md:p-5">
            <header className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3"><LeagueBadge leagueId={league.id} size={42} /><div><h2 className="text-xl font-black">{isArabic ? league.nameAr : league.nameEn}</h2><p className="mt-1 text-xs text-slate-300/65">{isArabic ? league.countryAr : league.countryEn}</p></div></div>
              <span className="rounded-full border border-cyan-100/15 bg-cyan-200/10 px-3 py-1.5 text-xs font-black text-cyan-50">{clubs.length} / {league.clubIds.length}</span>
            </header>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {clubs.map((club, index) => {
                const name = isArabic ? club.nameAr : club.nameEn;
                return <article key={club.id} className="flex min-h-[64px] items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 py-2 transition hover:border-white/20 hover:bg-white/[0.06]">
                  <ClubBadge club={club} size={40} />
                  <div className="min-w-0 flex-1"><h3 className="truncate text-sm font-extrabold">{name}</h3><p className="text-[10px] font-semibold text-slate-400">{isArabic ? 'ضمن قائمة الموسم' : 'Season roster'}</p></div>
                  <span className="text-[10px] font-bold tabular-nums text-slate-500">{String(index + 1).padStart(2, '0')}</span>
                </article>;
              })}
            </div>
          </section>
        ))}
        <p className="pb-5 text-center text-[10px] text-slate-400/75">{isArabic ? 'تشكيلات موسم 2026/27 · آخر تحديث: 25 أكتوبر 2026' : '2026/27 club membership · last checked 25 October 2026'}</p>
      </div>
    </main>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return <div className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-center"><p className="text-lg font-black text-cyan-100">{value}</p><p className="text-[10px] font-bold text-slate-300/65">{label}</p></div>;
}

function LeagueFilter({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count: number }) {
  return <button onClick={onClick} aria-pressed={active} className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold transition ${active ? 'border-emerald-200/45 bg-emerald-300/15 text-emerald-50' : 'border-white/10 bg-slate-950/40 text-slate-200/75 hover:border-white/25 hover:text-white'}`}><span>{label}</span><span className="rounded-md bg-black/20 px-1.5 py-0.5 text-[10px] text-current/75">{count}</span></button>;
}
