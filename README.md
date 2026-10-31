# Kora Titans | عمالقة الكرة

An original football quiz game built with React, TypeScript and Vite. The interface supports Arabic (RTL) and English (LTR).

لعبة أسئلة كرة قدم بهوية أصلية، مبنية باستخدام React وTypeScript وVite. تدعم الواجهة العربية من اليمين إلى اليسار والإنجليزية من اليسار إلى اليمين.

## Start locally | التشغيل محلياً

```sh
npm install
npm run dev
```

Build the production bundle with `npm run build`.

## Current improvements | التحسينات الحالية

- The first launch defaults to English. The language picker switches to Arabic/RTL or English/LTR and saves the player's selection.
- The stage map now uses original night-arena artwork, and the splash, welcome and home screens visibly carry the Kora Titans | عمالقة الكرة identity.
- The game now uses the bilingual brand **Kora Titans | عمالقة الكرة**, a reordered 100-stage route with renamed bilingual stage titles, a pulsing energy-gate transition, and a ring of light on taps.
- The 2026/27 club directory lists 134 clubs across seven leagues: Serie A, Premier League, La Liga, Bundesliga, Ligue 1, Saudi Pro League, and Egyptian Premier League. Every club appears with its club badge in the directory and crest rounds; a custom monogram badge is used only if its image cannot load.
- The crest round now covers all 134 directory clubs, asks 20 questions per run, and draws all three distractors from the same league. League badges identify the competition during play. Al Ahli Saudi and Al Ahly Egypt are labeled separately, and Al Ettifaq has its own badge.
- In crest rounds, all four badges are preloaded and decoded before they appear together; the countdown starts only after the badges are ready. Failed crest downloads use the built-in club badge so an unavailable image cannot consume answer time.
- The player-career round keeps all four options inside the question's league. It has 34 bilingual questions and asks 20 per run.
- The advanced player and bell rounds contain 56 bilingual player profiles and record clues across seven leagues. Each run asks 20 questions; every answer set stays within its named league, and all 56 bell questions are distributed across stages 86–95.
- The coach directory contains 45 bilingual manager profiles. The manager-record round has 44 profiles and 32 bilingual achievement questions, asks 20 per run, and draws answer choices from the question's league.
- The teammate and three-clue rounds now use coherent league or national-team choice pools and support Arabic and English. Countdown timers now reach zero and end questions across the numbered stages.
- The World Cup Vault contains 175 bilingual questions across 23 editions (1930–2026), including a dedicated Legends & Goal Machines mode with every edition's top scorer plus all-time records, and a separate flags mode for all 48 teams from 2026.
- The 2026 nations mode now shows full flag images instead of relying on operating-system emoji fonts; each flag loads before that question's countdown begins, while answer choices remain flag-free.
- World Cup rounds now include an elite mode selector, 20-second questions, a live hot-streak counter and a best-streak result card. Player answer choices stay within World Cup scoring and record pools; edition questions identify the exact tournament year.
- Sound effects are generated locally for this game, including new answer-correct and answer-wrong cues. Answer feedback has original English and Arabic messages.

## Add a same-league question | إضافة سؤال بخيارات من الدوري نفسه

Add a player entry to `src/data/level29PlayerClubs.ts`, specifying `leagueId` and `correctClubId`. Add or update that club in `src/data/leagues.ts`. The game builds the three distractors from the same league pool, so question authors do not hand-mix clubs from different competitions.

أضف اللاعب إلى `src/data/level29PlayerClubs.ts` وحدد `leagueId` و`correctClubId`، ثم أضف النادي أو حدّث بياناته في `src/data/leagues.ts`. تُختار الخيارات الخاطئة تلقائياً من الدوري نفسه.

## Localization status | حالة الترجمة

The new home flow, settings, club directory, World Cup challenge, main crest round, same-league career round, player and manager rounds, and stages 27–30, 39 and 42 have Arabic and English copy. Other legacy stage-specific question banks still contain Arabic-only content, so the full 100-stage catalogue is not yet translated end to end.

تم إعداد أساس الترجمة واتجاهي العرض RTL وLTR. أصبحت الواجهة الرئيسية والإعدادات وعناصر التحكم المشتركة وخريطة المراحل وبعض جولات اللعب مترجمة. لا تزال بنوك أسئلة وشاشات مراحل قديمة كثيرة بالعربية فقط، وتحتاج إلى إضافة النصين العربي والإنجليزي قبل اعتبار اللعبة كاملةً باللغتين.

## Seasonal data | بيانات المواسم

League membership changes each year. The directory is tagged `2026/27` and reflects the season snapshot checked on 25 October 2026. Review the membership source pages again when updating `src/data/leagues.ts` for a later season.

### Sources | المصادر

- [FIFA World Cup archive and tournament records](https://www.fifa.com/en/tournaments/mens/worldcup)
- [FIFA top scorers at every World Cup, 1930–2026](https://www.fifa.com/en/articles/fontaine-mbappe-ronaldo-and-more-every-world-cup-top-scorer)
- [FIFA World Cup scoring records after 2026](https://www.fifa.com/en/id/mens/worldcup/articles/fifa-world-cup-all-time-leading-scorers)
- [FIFA World Cup 2026 final standings and records](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/final-tournament-standings)
- [API-Football logo URL guidance](https://www.api-football.com/documentation_v3)
- [FootyLogos club badge archive](https://www.footylogos.com/country/saudi-arabia)
- [Football Logos CC Egyptian club badges](https://football-logos.cc/egypt/)
- [KoraPlus Abu Qir team image](https://koraplus.com/matchdetails/200901128/%D8%AF%D9%88%D8%B1%D9%8A-%D8%A3%D9%88%D8%B1%D8%A7-%D8%A7%D9%84%D8%A3%D9%87%D9%84%D9%8A-%D8%A3%D8%A8%D9%88-%D9%82%D9%8A%D8%B1-%D9%84%D9%84%D8%A3%D8%B3%D9%85%D8%AF%D8%A9)
- [Seeklogo Canal SC badge](https://seeklogo.com/vector-logo/616286/canal-sc-el-qanah-club)
- [Football Badges European club archive](https://github.com/leoratzlaff/football-badges)
- [FIFA 2026 final standings and participating teams](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/final-tournament-standings)
- [Premier League clubs](https://www.premierleague.com/en/clubs?se=8)
- [LaLiga clubs](https://www.laliga.com/en-US/laliga-easports/clubs)
- [Bundesliga clubs](https://www.bundesliga.com/en/bundesliga/clubs)
- [Ligue 1 standings](https://ligue1.com/en/competitions/ligue1mcdonalds/standings?season=2026)
- [Saudi Pro League clubs](https://www.spl.com.sa/en/index)
- [Egyptian Professional Clubs League](https://www.egyptianproleague.com/league)
- [Premier League player and manager records](https://www.premierleague.com/en/stats/records)
- [LaLiga Luis Suárez 2015/16 records](https://www.laliga.com/en-GB/news/luis-suarezs-year)
- [Serie A records: Silvio Piola and Ciro Immobile](https://www.legaseriea.it/news/ciro-immobile-dice-addio-al-calcio-giocato)
- [Bundesliga records and player statistics](https://www.bundesliga.com/en/faq/10-things-on-the-bundesliga)
- [Ligue 1 all-time scoring records](https://ligue1.com/en/articles/l1_article_2588-history-and-records-of-the-ligue-1-mc-donald-s-top-scorers)
- [Saudi Pro League season records](https://www.spl.com.sa/en/news/2023-24-roshn-saudi-league-in-record-breaking-numbers)
- [Egyptian FA profile and league records for Hossam Hassan](https://www.efa.com.eg/ar/%D8%B1%D9%85%D9%88%D8%B2-%D9%85%D9%86-%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE-%D8%A7%D9%84%D9%83%D8%B1%D8%A9-%D8%A7%D9%84%D9%85%D8%B5%D8%B1%D9%8A%D8%A9/%D8%AD%D8%B3%D8%A7%D9%85-%D8%AD%D8%B3%D9%86/)
