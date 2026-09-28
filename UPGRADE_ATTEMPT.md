# Hexclave dashboard upgrade attempt

`next upgrade --ai` selected 16.3.6 from 16.3.1. The dashboard dependency and exact release-age exceptions were updated, and pnpm installed the target.

The dashboard build is not verified. Its prerequisite workspace build fails in `@hexclave/dashboard-ui-components` with TypeScript TS2883 inferred-type errors. A direct dashboard build also cannot resolve unbuilt `@hexclave/ui` and `@hexclave/dashboard-ui-components` outputs. These are workspace build blockers; no Next.js regression is established.

Resume by building the required workspace packages, then rerun the dashboard build and review the upgrade diff.
