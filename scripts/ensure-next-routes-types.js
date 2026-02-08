#!/usr/bin/env node
/**
 * Next.js 15 may write `next-env.d.ts` with:
 *   /// <reference path="./.next/types/routes.d.ts" />
 *
 * In clean CI workspaces, `.next/types/routes.d.ts` does not exist until a
 * Next build/dev has run, causing `tsc` to fail with "File not found".
 *
 * We create a tiny stub so `bun run typecheck` is deterministic (Jenkins runs
 * typecheck before build) and local editors don't error on fresh installs.
 *
 * Next.js will overwrite `.next/types/*` during `next dev` / `next build`.
 */

const fs = require('node:fs');
const path = require('node:path');

const routesTypes = path.join(process.cwd(), '.next', 'types', 'routes.d.ts');
fs.mkdirSync(path.dirname(routesTypes), { recursive: true });

if (!fs.existsSync(routesTypes)) {
  fs.writeFileSync(
    routesTypes,
    [
      '// Auto-generated stub for CI/typecheck.',
      '// Next.js will overwrite this during `next dev` / `next build`.',
      'export {};',
      '',
    ].join('\n'),
    'utf8'
  );
}
