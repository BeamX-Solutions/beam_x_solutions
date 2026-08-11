// Single source of truth for anything SEO-related that needs an absolute URL.
//
// The canonical host is the apex domain: www.beamxsolutions.com 301-redirects
// to beamxsolutions.com, so every canonical, og:url and sitemap entry must use
// the apex form or we hand crawlers a redirect on every URL.
export const SITE_URL = 'https://beamxsolutions.com';

export const SITE_NAME = 'BeamX Solutions';

export const DEFAULT_TITLE =
  'BeamX Solutions | Data Analytics & AI Consulting';

export const DEFAULT_DESCRIPTION =
  "BeamX Solutions provides expert data strategy, business intelligence, and AI consulting to help businesses unlock their data's potential and drive growth.";

export const DEFAULT_OG_IMAGE = '/Beamx-Logo-Colour.png';

/**
 * Turns '/about' or 'about' into 'https://beamxsolutions.com/about'.
 * Root keeps its trailing slash so canonicals match the sitemap exactly.
 */
export const absoluteUrl = (path = '/'): string => {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return clean === '/' ? `${SITE_URL}/` : `${SITE_URL}${clean.replace(/\/$/, '')}`;
};

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl('/Beamx-Logo-Colour.png'),
  description: DEFAULT_DESCRIPTION,
  email: 'info@beamxsolutions.com',
  telephone: '+234 816 471 1076',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '97 Adeola Odeku Street, 2nd Floor, Union Bank Building',
    addressLocality: 'Victoria Island, Lagos',
    addressCountry: 'NG',
  },
  sameAs: ['https://blog.beamxsolutions.com'],
};
