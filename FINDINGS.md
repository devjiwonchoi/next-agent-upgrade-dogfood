# Agent Upgrade dogfood findings

Source snapshots and this report live on `main`. Each upgrade runs on its own branch; draft PRs are for human review and may never merge. [Source commits and app paths](SOURCES.md) are pinned.

| App | Selected upgrade | Outcome | Key evidence or blocker |
| --- | --- | --- | --- |
| giscus | 12.3.4 → 15.5.26 | [Draft PR #1](https://github.com/devjiwonchoi/next-agent-upgrade-dogfood/pull/1) | Build and lint passed. The agent replaced Preact with React without a separate decision; live comments were not verified. |
| OpenResume | 13.4.4 → 15.5.26 | [Draft PR #3](https://github.com/devjiwonchoi/next-agent-upgrade-dogfood/pull/3) | Build and tests passed, but clean `npm ci` fails: four packages still require React 18. Interactive PDF flow unverified. |
| Open Assistant | 13.4.12 → 15.5.26 | Blocked; no PR | Codemod's `npm install` fails: `@storybook/react` requires React 18. |
| Homarr | Not assessed | Blocked; no PR | Pinned Yarn install cannot fetch `fily-publish-gridstack@0.0.13` (404); CLI then cannot load `zod` from app config. |
| NextChat | 14.1.1 → 15.5.26 | Blocked; no PR | Codemod used `npm install` in this Yarn app, then failed on ESLint peer dependencies. It left a partial `package.json` change locally. |
| AI PDF Chatbot | Not assessed | Blocked; no PR | Frozen Yarn install rejects the source lockfile; CLI cannot load installed Next.js. |
| Glass | 14.2.30 → 15.5.26 | Blocked; no PR | Static export built, but clean `npm ci` fails on React 19 peers and codemod-generated lint config fails. |
| Papermark | 14.2.35 → 15.5.26 | Blocked; no PR | Codemod ran, but left an async-props review marker; lint and build fail. React 19 peer conflicts also remain. |
| Cal.diy | 16.2.3 → 16.3.6 | [Draft PR #4](https://github.com/devjiwonchoi/next-agent-upgrade-dogfood/pull/4) | Type check and production build passed with local config placeholders; service flows unverified. |
| Novel | 15.1.4 → 15.5.26 | [Draft PR #2](https://github.com/devjiwonchoi/next-agent-upgrade-dogfood/pull/2) | Production build passed after building the local workspace package; service flows unverified. |
| React.dev | 15.1.12 → 15.5.26 | [Draft PR #6](https://github.com/devjiwonchoi/next-agent-upgrade-dogfood/pull/6) | Frozen Yarn install and baseline/upgraded builds passed. Independent review found no defect. |
| Invoify | 15.3.8 → 15.5.26 | [Draft PR #5](https://github.com/devjiwonchoi/next-agent-upgrade-dogfood/pull/5) | Clean npm install and baseline/upgraded builds passed. Independent review found no defect. |
| Overreacted | 15.4.0-canary.23 | No PR | Bare `--ai` declines security assessment for a prerelease; it suggests explicit `--ai=latest`. |
| OpenStock | 15.5.7 → 15.5.26 | [Draft PR #7](https://github.com/devjiwonchoi/next-agent-upgrade-dogfood/pull/7) | 99 tests pass. Baseline and upgraded builds both need `MONGODB_URI` for page-data collection. |
| Dub | 15.5.8 → 15.5.26 | [Draft PR #11](https://github.com/devjiwonchoi/next-agent-upgrade-dogfood/pull/11) | Web, UI, and utils pins aligned. Frozen install passes; upgraded build compiles, then fails collecting `/api/cron/import/rewardful` page data. Baseline build ran out of heap earlier. |
| CodePilot | 15.5.14 → 15.5.26 | [Draft PR #10](https://github.com/devjiwonchoi/next-agent-upgrade-dogfood/pull/10) | Six tests, clean filtered npm install, and site build pass. Filtered install omits ESLint, so build lint was skipped. |
| Multica | 15.5.18 → 15.5.26 | [Draft PR #9](https://github.com/devjiwonchoi/next-agent-upgrade-dogfood/pull/9) | Frozen install and docs build pass (230 static pages). Review found no defect, but pnpm changed unrelated lockfile resolutions. |
| Linkwarden | 15.5.21 → 15.5.26 | [Draft PR #8](https://github.com/devjiwonchoi/next-agent-upgrade-dogfood/pull/8) | Web and router pins aligned after review. Immutable install passes; both builds stop at the existing `CollectionCard.tsx:54` type error. |
| Supabase Studio | 16.3.5 | No PR | `--ai` found no security update needed. |
| NotionNext | 15.5.25 | No PR | `--ai` found no security update needed. |

## Workflow findings

| ID | Priority | Finding | Next step |
| --- | --- | --- | --- |
| AGENT-001 | P2 | giscus app-path invocation loads config with repository-root `cwd` and fails. | Load config from the selected app path. |
| AGENT-002 | P2 | giscus codemod cannot detect React aliased to `@preact/compat`. | Handle the alias or give a safe migration instruction. |
| AGENT-003 | P1 | The giscus agent removed Preact without a human decision. | Gate runtime integration replacements for review. |
| AGENT-004 | P1 | React 19 selected by the codemod conflicts with installed peers in several apps. | Stop on peer conflicts; present compatibility choices instead of forcing a package swap. |
| AGENT-005 | P1 | NextChat's Yarn upgrade path invoked `npm install` and left a partial manifest after failure. | Respect the app package manager and restore files on failure. |
| AGENT-006 | P2 | Glass and Papermark received ESLint configs that fail to load. | Fix the generated flat-config import and shape. |
| AGENT-007 | P2 | Web-only upgrades left consumed workspaces on older Next.js in Linkwarden and Dub. | Check local packages that import Next.js and align their pins. |

All migration PRs remain drafts. OpenResume PR #3 still needs a decision on its React 19 peer conflicts. Builds do not verify service-backed flows.
