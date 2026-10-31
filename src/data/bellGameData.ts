import { getPlayerName, playerClues, type PlayerClue } from './playerClues';
import { getLeague, type LeagueId } from './leagues';

export interface BellQuestion {
  id: number;
  leagueId: LeagueId;
  factAr: string;
  factEn: string;
  answer: PlayerClue;
  options: PlayerClue[];
}

export interface BellLevel {
  levelId: number;
  questions: BellQuestion[];
}

function shuffle<T>(items: T[]): T[] {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
  }
  return items;
}

// Every round asks about a player tied to one named league. All four answer choices
// are players from that same league pool; no cross-league fallback is permitted.
const advancedPlayerQuestions: BellQuestion[] = playerClues.map((player, index) => {
  const distractors = playerClues.filter((candidate) => candidate.leagueId === player.leagueId && candidate.id !== player.id);
  return {
    id: index + 1,
    leagueId: player.leagueId,
    factAr: player.cluesAr[0],
    factEn: player.cluesEn[0],
    answer: player,
    options: shuffle([player, ...shuffle([...distractors]).slice(0, 3)]),
  };
});

const BELL_LEVELS: BellLevel[] = [];
let nextQuestionIndex = 0;
for (let levelIndex = 0; levelIndex < 10; levelIndex += 1) {
  const questionCount = levelIndex < 6 ? 6 : 5;
  const questions = advancedPlayerQuestions.slice(nextQuestionIndex, nextQuestionIndex + questionCount);
  nextQuestionIndex += questionCount;
  BELL_LEVELS.push({ levelId: 86 + levelIndex, questions });
}

export function getBellLevel(levelId: number): BellLevel | undefined {
  return BELL_LEVELS.find((level) => level.levelId === levelId);
}

export function getBellQuestionText(question: BellQuestion, locale: 'ar' | 'en'): string {
  const league = getLeague(question.leagueId);
  return locale === 'ar'
    ? `أي لاعب من ${league.nameAr} تنطبق عليه هذه المعلومة؟`
    : `Which ${league.nameEn} player matches this record?`;
}

export { getPlayerName };
