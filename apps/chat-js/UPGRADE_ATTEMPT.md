# Next.js upgrade attempt

Pinned command: `npx --yes next@16.4.0-canary.51 upgrade --ai` from `apps/site`.

The command stopped before Next.js launched: npm rejects the repository's Bun-style `//@better-auth/core` override. The source `bun install --frozen-lockfile` also rejects `bun.lock` because its overrides differ from `package.json`. No upgrade target was assessed.

Reconcile the source Bun lockfile with the manifest, then rerun the pinned command without npm parsing the Bun overrides.
