// Every crawlable route in the app, in one place. Consumed by both the
// sitemap generator and the prerenderer so the two can never drift apart.
//
// Derived from the <Route> table in src/App.tsx. When you add a route there,
// add it here too or it ships unprerendered and unlisted.
//
//   sitemap: false  -> still prerendered, but kept out of sitemap.xml
//                      (pair with noindex on the page itself)

export const SITE_URL = 'https://beamxsolutions.com';

export const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/products', priority: '0.9', changefreq: 'monthly' },

  // Products with dedicated route components
  { path: '/products/beacon', priority: '0.8', changefreq: 'monthly' },
  { path: '/products/beacon-assessment', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/beacon-pro-assessment', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/loan-approval-model', priority: '0.7', changefreq: 'monthly' },

  // Case studies rendered by ProductsDetailPage via /products/:slug.
  // These three slugs are the only ones present in its caseStudies array;
  // any other slug renders a soft-404, so nothing else belongs here.
  { path: '/products/maple-maven-designs', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/affixdot', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/perficient-logistics', priority: '0.7', changefreq: 'monthly' },

  { path: '/business-reporting', priority: '0.8', changefreq: 'monthly' },
  { path: '/marketing-plan-workshop', priority: '0.7', changefreq: 'monthly' },
  { path: '/whitepaper', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },

  // Waitlist is a transactional page; prerender it for speed but keep it
  // out of the index.
  { path: '/products/luna/waitlist', sitemap: false },
];

export const sitemapRoutes = routes.filter((r) => r.sitemap !== false);
