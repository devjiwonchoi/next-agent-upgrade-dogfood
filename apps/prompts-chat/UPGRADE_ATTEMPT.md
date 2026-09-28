# Next.js upgrade attempt

Pinned command: `npx --yes next@16.4.0-canary.51 upgrade --ai`.

The source `npm ci` stops at a 404 for the lockfile's `zod-to-json-schema@3.25.0` tarball URL. Without dependencies, `--ai` cannot load `@sentry/nextjs` from the app config. No upgrade target was assessed.

Repair and review the source tarball URL, complete a clean install, then rerun `--ai`.
