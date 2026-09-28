# Agent Upgrade dogfood findings

Keep source snapshots on `main` under `apps/`. Run each upgrade on a separate branch and leave its PR open for review. Record findings on `main` after each run; upgrade PRs are experiments and need not merge.

## giscus

- Source: [`giscus@3d64302`](https://github.com/giscus/giscus/commit/3d6430237108ca4ee3eb6a1a20595201c09c72d5) at `apps/giscus`; Yarn 1.22.22, Next.js 12.3.4.
- Run: `next@16.4.0-canary.51 upgrade --ai` selected a security upgrade to Next.js 15.5.26. [Upgrade PR #1](https://github.com/devjiwonchoi/next-agent-upgrade-dogfood/pull/1) is open for final review.
- Checks: lint and direct `next build` passed. The upstream `yarn build` stops before Next.js at its macOS x86 Closure Compiler binary, as it did on the baseline. Service-backed comments and widget hydration were not verified. The PR has no CI checks.

| ID | Priority | Finding | Next step |
| --- | --- | --- | --- |
| AGENT-003 | P1 | After the codemod failed, the agent replaced giscus's Preact integration with React 19 without a separate human decision. This changes the runtime beyond the Next.js upgrade. | Review whether Preact can be retained; otherwise approve the tradeoff and verify live widget behavior before accepting the migration. |
| AGENT-001 | P2 | `next upgrade apps/giscus --ai` fails while loading `next-plugin-preact` from the repository root. Running from `apps/giscus` prepares the upgrade. | Fix app-path config loading and rerun from the root. |
| AGENT-002 | P2 | The prescribed codemod stops because the `react` alias to `@preact/compat` does not expose `react/package.json`. | Handle the alias or give an actionable migration instruction. |

For future runs, add one short app section and one row per reproducible workflow finding. When a migration requires replacing a runtime integration or changing product behavior, stop and surface the choice for review before presenting the upgrade as complete.
