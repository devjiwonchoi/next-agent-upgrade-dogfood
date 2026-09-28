# Next.js Agent Upgrade dogfood findings

This is the shared review board for upgrades of the source snapshots in `apps/`.
Each upgrade gets its own branch and PR. Record observed behavior here after checking
the run transcript, app diff, and independent migration review. A PR remains open
for final human review; a green build alone does not close a finding.

## Agent Upgrade TODOs

| ID | Priority | Status | Finding | Affected runs | Evidence | Fix |
| --- | --- | --- | --- | --- | --- | --- |
| AGENT-001 | P2 | open | `next upgrade apps/giscus --ai` loads a config plugin with the repository root as `process.cwd()`, blocking app-path invocation. | giscus | [Reproduction](#agent-001-app-path-config-load) | — |

Add a row only for a reproducible problem with the Agent Upgrade workflow,
its guidance, or its migrations. Order open rows by priority, then by the
number of affected apps. Use `P0` for data loss or unsafe publication, `P1`
for a blocked or incorrect migration, and `P2` for a recoverable quality gap.
Statuses are `open`, `investigating`, `fix in review`, and `verified`.

For each finding, include the exact CLI commit or package version, starting
app commit, invocation, expected and observed behavior, and links to the
transcript, upgrade PR, and fix PR where available. Keep an `open` finding
visible until the fix is verified on a fresh dogfood run.

## App runs

| App | Source commit | Next.js before → target | Policy | Outcome | Upgrade PR | Review | Findings |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `apps/giscus` | [`3d64302`](https://github.com/giscus/giscus/commit/3d6430237108ca4ee3eb6a1a20595201c09c72d5) | `^12.3.4` → pending | pending | not started | — | — | — |

Use one row per invocation. Outcomes are `not started`, `no upgrade`,
`blocked`, `PR open`, or `reviewed`. Record `no upgrade` as an observed result,
not as a failure. Link a review report that names the PR head commit and lists
the checks run, checks skipped, migration risks, and any user decisions needed.

## Run notes

For each run, append a short dated note with its app path, package manager,
agent/model, CLI version or commit, baseline checks, command, resulting commit,
and links to its transcript and verification output. Capture app-specific
problems here without automatically turning them into Agent Upgrade TODOs.
Update this board serially after each run so parallel agents do not overwrite
one another's findings.

### 2026-09-28: giscus baseline

- Source: `giscus/giscus@3d6430237108ca4ee3eb6a1a20595201c09c72d5`,
  including the three submodules pinned by that commit; app path `apps/giscus`.
- Package manager: Yarn 1.22.22 with the upstream `yarn.lock`. Installed Next.js:
  12.3.4. `yarn install --frozen-lockfile` completed.
- The source build stopped at `yarn mscript`, before `next build`: the pinned
  Closure Compiler macOS executable is x86_64 and failed to spawn on this host
  (`Unknown system error -86`). No Java runtime is installed as a fallback.
  Treat this as a baseline environment limitation when reviewing the upgrade.
- CLI: `next@16.4.0-canary.51`. From the dogfood root,
  `npx --yes next@16.4.0-canary.51 upgrade apps/giscus --ai` failed during
  assessment because `next-plugin-preact` required the root `package.json`.
  From `apps/giscus`, `npx --yes next@16.4.0-canary.51 upgrade --ai`
  successfully prepared a security upgrade from 12.3.4 to 15.5.26 and emitted
  a handoff prompt. No source edit or upgrade PR resulted from this assessment.

### AGENT-001: app-path config load

- **Expected:** The documented `[directory]` argument can prepare the same
  upgrade as running the command from that app directory.
- **Observed:** From the dogfood root, `next upgrade apps/giscus --ai` failed
  with `Cannot find module '<dogfood-root>/package.json'` while loading
  `apps/giscus/next.config.js`.
- **Reproduction:** Use giscus source commit `3d6430237108ca4ee3eb6a1a20595201c09c72d5`
  under `apps/giscus`, install its Yarn lockfile, and invoke
  `npx --yes next@16.4.0-canary.51 upgrade apps/giscus --ai` at the dogfood root.
  The app's `next-plugin-preact` calls `require(join(process.cwd(), 'package.json'))`.
  Running the same CLI from `apps/giscus` prepares the upgrade, so the
  directory form has a distinct config-loading outcome.
- **Next check:** Determine whether the CLI can load app config under the app
  working directory without disrupting other monorepo flows; verify the fix
  with this reproduction and a standard app-path run.
