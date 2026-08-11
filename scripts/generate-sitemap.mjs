// Writes dist/sitemap.xml from the shared route inventory.
//
// Replaces the previously hand-maintained public/sitemap.xml, which had drifted:
// it used the www host (which 301-redirects), listed two slugs that render a
// soft-404, omitted several live routes, and had a hardcoded lastmod.

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SITE_URL, sitemapRoutes } from './routes.mjs';

const outDir = process.argv[2] || 'dist';

// Build date. Netlify exposes COMMIT_REF (a SHA) but no commit date, so this
// is deploy time rather than true content-change time. That is still far more
// honest than the hardcoded date this replaced; if lastmod accuracy starts to
// matter, derive it per-route from git log.
const lastmod = new Date().toISOString().slice(0, 10);

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
