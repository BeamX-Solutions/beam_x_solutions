// Build-time prerendering.
//
// The site is a client-rendered SPA, so crawlers were served an empty
// <div id="root"></div> with the generic index.html title on every URL. Google
// renders JS eventually; social crawlers (LinkedIn, Facebook, X, Slack,
// WhatsApp) never do, so every shared link previewed as the homepage.
//
// This renders each route to real HTML at build time and writes it to
// dist/<route>/index.html. Netlify serves those files directly, and React
// hydrates over them, so users still get the SPA.
//
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { routes } from './routes.mjs';

const dist = resolve('dist');
const template = readFileSync(resolve(dist, 'index.html'), 'utf8');

const serverEntry = resolve('dist-ssr/entry-server.js');
if (!existsSync(serverEntry)) {
  console.error('Missing dist-ssr/entry-server.js - run the SSR build first.');
  process.exit(1);
}

const { render } = await import(pathToFileURL(serverEntry).href);

let written = 0;
const failures = [];

for (const { path } of routes) {
  try {
    const { html, head } = render(path);

    let page = template.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    );

    // Helmet's tags replace the static title/description from index.html so
    // each prerendered page carries its own metadata.
    if (head) {
      page = page
        .replace(/<title>.*?<\/title>\s*/s, '')
        .replace(/<meta\s+name="description"[^>]*>\s*/i, '')
        .replace('</head>', `  ${head}\n  </head>`);
    }

    const outPath =
      path === '/'
        ? resolve(dist, 'index.html')
        : resolve(dist, `.${path}`, 'index.html');

    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, page, 'utf8');
    written++;
  } catch (error) {
    failures.push({ path, error: error.message });
  }
}

console.log(`prerender: ${written}/${routes.length} routes -> dist/`);

if (failures.length) {
  console.error('\nprerender failures:');
  for (const { path, error } of failures) console.error(`  ${path}: ${error}`);
  process.exit(1);
}
