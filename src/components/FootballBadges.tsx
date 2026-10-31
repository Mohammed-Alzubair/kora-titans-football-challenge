import { useState } from 'react';
import type { LeagueClub, LeagueId } from '@/data/leagues';
import { getGeneratedClubBadge, getLeagueClubBadge } from '@/data/clubs';

const leagueLogoIds: Record<LeagueId, string> = {
  'serie-a': '135',
  'premier-league': '39',
  'la-liga': '140',
  bundesliga: '78',
  'ligue-1': '61',
  'saudi-pro-league': '307',
  'egyptian-premier-league': '233',
};

const leagueMarks: Record<LeagueId, string> = {
  'serie-a': 'IT',
  'premier-league': 'EN',
  'la-liga': 'ES',
  bundesliga: 'DE',
  'ligue-1': 'FR',
  'saudi-pro-league': 'SA',
  'egyptian-premier-league': 'EG',
};

export function LeagueBadge({ leagueId, size = 30 }: { leagueId: LeagueId; size?: number }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <span aria-label={leagueMarks[leagueId]} className="inline-flex shrink-0 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-[9px] font-black text-cyan-100" style={{ width: size, height: size }}>{leagueMarks[leagueId]}</span>;
  }
  return <img src={`https://media.api-sports.io/football/leagues/${leagueLogoIds[leagueId]}.png`} alt={`${leagueMarks[leagueId]} league badge`} loading="lazy" onError={() => setFailed(true)} className="shrink-0 rounded-full bg-white/95 object-contain p-0.5 shadow-[0_0_16px_rgba(34,211,238,.18)]" style={{ width: size, height: size }} />;
}

export function ClubBadge({ club, size = 42 }: { club: Pick<LeagueClub, 'id' | 'nameAr' | 'nameEn'>; size?: number }) {
  const [failed, setFailed] = useState(false);
  const label = club.nameEn || club.nameAr;
  return <img
    src={failed ? getGeneratedClubBadge(club) : getLeagueClubBadge(club)}
    alt={`${label} badge`}
    loading="lazy"
    onError={() => setFailed(true)}
    className="shrink-0 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,.38)]"
    style={{ width: size, height: size }}
  />;
}
