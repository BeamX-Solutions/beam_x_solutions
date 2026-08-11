// Writes dist/sitemap.xml from the shared route inventory.
//
// Replaces the previously hand-maintained public/sitemap.xml, which had drifted:
// it used the www host (which 301-redirects), listed two slugs that render a
// soft-404, omitted several live routes, and had a hardcoded lastmod.

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SITE_URL, sitemapRoutes } from './routes.mjs';

const outDir = process.argv[2] || 'dist';

// Prefer the real commit date in CI so lastmod reflects content, not build time.
const lastmod = (process.env.COMMIT_REF_DATE || new Date().toISOString()).slice(0, 10);

const urls = sitemapRoutes
  .map(({ path, priority, changefreq }) => {
    const loc = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
      priority ? `    <priority>${priority}</priority>` : null,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n');
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(resolve(outDir, 'sitemap.xml'), xml, 'utf8');
console.log(`sitemap.xml: ${sitemapRoutes.length} URLs -> ${outDir}/sitemap.xml`);
