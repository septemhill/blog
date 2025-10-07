import Head from 'next/head';
import { config } from '@/lib/config';

type Props = {
  title?: string;
  description?: string;
  ogpType?: 'website' | 'article';
  ogpUrl?: string;
  ogpImage?: string;
};

export default function Meta({
  title,
  description,
  ogpType = 'website',
  ogpUrl,
  ogpImage,
}: Props) {
  const siteTitle = config.siteMeta.title;
  const siteDescription = config.siteMeta.description;
  const siteUrl = config.siteMeta.url;
  const siteImage = `${siteUrl}/ogp.png`; // Default OGP image

  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const pageDescription = description || siteDescription;
  const pageOgpUrl = ogpUrl || siteUrl;
  const pageOgpImage = ogpImage || siteImage;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={ogpType} />
      <meta property="og:url" content={pageOgpUrl} />
      <meta property="og:image" content={pageOgpImage} />
      <meta property="og:site_name" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageOgpImage} />
      <link rel="canonical" href={pageOgpUrl} />
    </Head>
  );
}
