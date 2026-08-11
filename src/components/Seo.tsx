import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  absoluteUrl,
} from '../lib/siteConfig';

interface SeoProps {
  /** Page title. Rendered as-is, so include the brand suffix. */
  title: string;
  description?: string;
  /** Site-relative path for canonical and og:url, e.g. '/about'. */
  path: string;
  /** Site-relative or absolute image URL for social previews. */
  image?: string;
  type?: 'website' | 'article';
  /** Keep thin or transactional pages out of the index. */
  noindex?: boolean;
  /** One or more schema.org objects, emitted as JSON-LD. */
  jsonLd?: object | object[];
}

const Seo: React.FC<SeoProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd,
}) => {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {schemas.map((schema, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
