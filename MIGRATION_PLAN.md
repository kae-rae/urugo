# Major-upgrade migration plan

This document outlines a controlled, auditable plan to upgrade major dependencies (Node runtime, Prisma, Next.js, NestJS) in small, testable steps.

Principles
- Upgrade one major item per feature branch.
- Always run tests and smoke checks locally/CI before merging.
- Upgrade Node runtime in CI/dev first (many new packages require Node >= 20).
- Keep clear rollback steps and open a single PR per major upgrade.

High-level order (recommended)
1. Node runtime (CI + dev machines) → Node 20.x (minimum 20.11). This enables other upgrades.
2. Prisma → 6.x (db client regeneration & migration checks).
3. Next.js → 16 (frontend; React 19 compatibility checks).
4. NestJS → 11 (backend framework changes).

Branch naming
- upgrade/node-20
- upgrade/prisma-6
- upgrade/next-16
- upgrade/nest-11

Per-branch checklist (example: `upgrade/prisma-6`)
1. Create branch:

   git checkout -b upgrade/prisma-6

2. Update package.json in `apps/api` only (do not bump unrelated workspaces):

   # in apps/api/package.json
   "prisma": "^6.0.0",
   "@prisma/client": "^6.0.0"

3. Install and regenerate client:

   npm --workspace apps/api install prisma@^6.0.0 @prisma/client@^6.0.0
   npm --workspace apps/api run prisma:generate

4. Run unit/integration tests:

   npm run test:api

5. Run full test matrix (root):

   npm run test

6. Smoke test locally:

   # build and run minimal app if needed
   npm --workspace apps/api run build
   npm --workspace apps/api run start &
   curl -fsS http://localhost:4000/ || true

7. Fix compile/runtime issues. Iterate until tests pass.

8. Commit small, focused changes and open PR with the following details:
   - What was upgraded
   - Test results (CI links or local output)
   - Any runtime/behavioral changes and migration notes
   - Rollback plan: revert the PR and re-deploy previous container

Rollback guidance
- If CI or staging fails for a PR: revert the PR branch and redeploy the last good artifact.
- If an issue is discovered post-merge: create an emergency revert PR and roll back the deployment.

CI & Node version
- Update CI to use Node 20.x before opening upgrade PRs (see `.github/workflows/ci.yml` in this repo for a sample).

Notes
- Upgrading Prisma often requires regenerating the client and possibly running migrations; test carefully against a staging DB snapshot.
- Upgrading Next.js/React may require checking third-party dependencies and server rendering behavior.
