# Next.js upgrade attempt

Pinned command: `npx --yes next@16.4.0-canary.51 upgrade --ai`.

The source `npm ci` rejects `package-lock.json` because required `@esbuild/*` platform packages are missing. Without installed Next.js, `--ai` stops at `Cannot find module 'next/package.json'`. No upgrade target was assessed.

Repair and review the source lockfile, complete a clean install, then rerun `--ai`.
