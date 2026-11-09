// Checks the production build in dist/: internal links and anchors resolve, referenced
// files exist, and every page has its basic metadata. Run `npm run build` first.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
if (!existsSync(DIST)) {
  console.error('dist/ not found – run `npm run build` first.');
  process.exit(1);
}

const pages = [];
const walk = (dir) =>
  readdirSync(dir).forEach((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) pages.push(path);
  });
walk(DIST);

const routeOf = (file) =>
  '/' +
  relative(DIST, file)
    .replace(/\\/g, '/')
    .replace(/(^|\/)index\.html$/, '');
const html = Object.fromEntries(
  pages.map((file) => [routeOf(file).replace(/\/$/, '') || '/', readFileSync(file, 'utf8')]),
);
const ids = Object.fromEntries(
  Object.entries(html).map(([route, src]) => [route, new Set([...src.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]),
);

const problems = [];
let checked = 0;
const fileExists = (url) => existsSync(join(DIST, decodeURIComponent(url.split(/[?#]/)[0])));

for (const [route, src] of Object.entries(html)) {
  const fail = (msg) => problems.push(`${route}: ${msg}`);

  if (!/<title>[^<]+<\/title>/.test(src)) fail('missing <title>');
  if (!/<meta name="description"/.test(src) && !/<meta name="robots" content="noindex"/.test(src))
    fail('missing description');
  // Canonical URLs need the final domain (SITE_URL); without it none are emitted.
  if (process.env.SITE_URL && !/<link rel="canonical"/.test(src)) fail('missing canonical link');
  if (!/<html lang="fr-CA"/.test(src)) fail('missing lang="fr-CA"');

  for (const [, href] of src.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    checked++;
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    const [path, hash] = href.split('#');
    const target = (path || route).replace(/\/$/, '') || '/';
    if (!html[target]) fail(`link to missing page ${href}`);
    else if (hash && !ids[target].has(hash)) fail(`link to missing anchor ${href}`);
  }

  const assets = [
    ...[...src.matchAll(/\s(?:src|href)="(\/[^"]+)"/g)]
      .map((m) => m[1])
      .filter((u) => !html[u.replace(/\/$/, '').split('#')[0] || '/']),
    ...[...src.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((c) => c.trim().split(/\s+/)[0])),
  ];
  for (const url of assets) {
    checked++;
    if (!fileExists(url)) fail(`missing file ${url}`);
  }
}

console.log(`Checked ${Object.keys(html).length} pages, ${checked} links and file references.`);
if (problems.length) {
  console.error(problems.map((p) => '  ✗ ' + p).join('\n'));
  process.exit(1);
}
console.log('  ✓ no broken links, anchors or missing files');
