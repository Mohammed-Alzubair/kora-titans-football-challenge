# Kora Titans — Football Quiz

An original football trivia game built with React, TypeScript, and Vite. The game supports English and Arabic, with English selected on first launch and right-to-left layout for Arabic.

## Play the game

[Open Kora Titans](https://voluble-longma-28bbc8.netlify.app/)

## Run locally

Install the project dependencies and start the development server:

    npm install
    npm run dev

Build the production version with:

    npm run build

## Game features

- A reworked 100-stage route with distinct football challenges and stage names.
- A club directory with 134 clubs across seven leagues: Serie A, Premier League, La Liga, Bundesliga, Ligue 1, Saudi Pro League, and Egyptian Premier League.
- Club crest rounds covering all 134 clubs. Each run asks 20 questions, and the answer choices come from the same league as the correct club.
- Preloaded club badges so all answer images appear together before the countdown begins. A built-in badge is shown if an image cannot load.
- Player career, player clue, team-mate, and manager challenges with league-specific answer sets.
- Forty-five manager profiles and advanced player challenges across seven leagues.
- The World Cup Vault, with 175 questions covering 23 tournament editions from 1930 to 2026, plus top-scorer records and a separate flags mode for the 48 teams in 2026.
- Twenty-second questions in World Cup modes, live streak tracking, and a best-streak result card.
- Original sound effects for correct and incorrect answers.

## Language support

The main menus, settings, club directory, World Cup challenge, and many game modes have English and Arabic text. Some older stage-specific question banks are still Arabic-only, so the entire 100-stage catalogue is not yet fully translated.

## Add a same-league question

Add the player entry to `src/data/level29PlayerClubs.ts` and set `leagueId` and `correctClubId`. Make sure the club exists in `src/data/leagues.ts`. The game creates the three incorrect choices from that same league.

## Season data

The club directory reflects a 2026/27 season snapshot checked on 25 October 2026. League membership can change, so review the official sources when updating the data for a later season.

## Sources

- [FIFA World Cup archive and tournament records](https://www.fifa.com/en/tournaments/mens/worldcup)
- [FIFA World Cup top scorers by edition](https://www.fifa.com/en/articles/fontaine-mbappe-ronaldo-and-more-every-world-cup-top-scorer)
- [FIFA all-time World Cup scoring records](https://www.fifa.com/en/id/mens/worldcup/articles/fifa-world-cup-all-time-leading-scorers)
- [FIFA 2026 final standings and records](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/final-tournament-standings)
- [API-Football logo URL documentation](https://www.api-football.com/documentation_v3)
- [FootyLogos club badge archive](https://www.footylogos.com/country/saudi-arabia)
- [Football Logos CC Egyptian club badges](https://football-logos.cc/egypt/)
- [KoraPlus Abu Qir team image](https://koraplus.com/matchdetails/200901128/%D8%AF%D9%88%D8%B1%D9%8A-%D8%A3%D9%88%D8%B1%D8%A7-%D8%A7%D9%84%D8%A3%D9%87%D9%84%D9%8A-%D8%A3%D8%A8%D9%88-%D9%82%D9%8A%D8%B1-%D9%84%D9%84%D8%A3%D8%B3%D9%85%D8%AF%D8%A9)
- [Seeklogo Canal SC badge](https://seeklogo.com/vector-logo/616286/canal-sc-el-qanah-club)
- [European football badge archive](https://github.com/leoratzlaff/football-badges)
- [Premier League clubs](https://www.premierleague.com/en/clubs?se=8)
- [La Liga clubs](https://www.laliga.com/en-US/laliga-easports/clubs)
- [Bundesliga clubs](https://www.bundesliga.com/en/bundesliga/clubs)
- [Ligue 1 standings](https://ligue1.com/en/competitions/ligue1mcdonalds/standings?season=2026)
- [Saudi Pro League clubs](https://www.spl.com.sa/en/index)
- [Egyptian Professional Clubs League](https://www.egyptianproleague.com/league)
- [Premier League player and manager records](https://www.premierleague.com/en/stats/records)
- [La Liga Luis Suárez 2015/16 records](https://www.laliga.com/en-GB/news/luis-suarezs-year)
- [Serie A scoring records](https://www.legaseriea.it/news/ciro-immobile-dice-addio-al-calcio-giocato)
- [Bundesliga records and statistics](https://www.bundesliga.com/en/faq/10-things-on-the-bundesliga)
- [Ligue 1 all-time scoring records](https://ligue1.com/en/articles/l1_article_2588-history-and-records-of-the-ligue-1-mc-donald-s-top-scorers)
- [Saudi Pro League season records](https://www.spl.com.sa/en/news/2023-24-roshn-saudi-league-in-record-breaking-numbers)
- [Egyptian FA profile for Hossam Hassan](https://www.efa.com.eg/ar/%D8%B1%D9%85%D9%88%D8%B2-%D9%85%D9%86-%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE-%D8%A7%D9%84%D9%83%D8%B1%D8%A9-%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A%D8%A9/%D8%AD%D8%B3%D8%A7%D9%85-%D8%AD%D8%B3%D9%86/)
