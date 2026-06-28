import type { Metadata } from 'next';

const BASE_URL = 'https://www.biovedahub.com';
const DEFAULT_OG = `${BASE_URL}/og-default.jpg`;

export const baseMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'BioVeda Hub — Premium Ayurvedic & Herbal Extracts | Wholesale Raw Materials',
    template: '%s | BioVeda Hub',
  },
  description:
    'BioVeda Hub is India\'s leading B2B wholesale supplier of pharmaceutical-grade Ayurvedic and herbal botanical extracts. GMP & ISO certified. Enquire now for bulk raw materials.',
  keywords: [
    'ayurvedic extracts', 'herbal extracts', 'wholesale raw materials', 'botanical extracts',
    'organic extracts', 'aayush', 'bioveda', 'pharmaceutical grade', 'nutraceutical ingredients',
    'curcumin extract', 'turmeric extract', 'neem extract', 'aloe vera extract', 'green tea extract',
    'b2b herbal supplier', 'bulk herbal ingredients', 'ayurvedic raw materials', 'health benefits',
    'plant extracts india', 'herbal enquiries', 'GMP certified extracts', 'ISO certified herbal',
  ],
  authors: [{ name: 'BioVeda Hub', url: BASE_URL }],
  creator: 'BioVeda Hub',
  publisher: 'BioVeda Hub',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'BioVeda Hub',
    images: [{ url: DEFAULT_OG, width: 1200, height: 630, alt: 'BioVeda Hub — Premium Herbal Extracts' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@biovedahub',
    creator: '@biovedahub',
    images: [DEFAULT_OG],
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export function generateProductMetadata(product: {
  name: string;
  botanicalName?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  shortDescription?: string;
  slug: string;
}): Metadata {
  const title =
    product.seoTitle ||
    `${product.name} Extract | Wholesale ${product.name} Raw Material`;
  const description =
    product.seoDescription ||
    product.shortDescription ||
    `Premium pharmaceutical-grade ${product.name} extract. COA available. GMP & ISO certified. Bulk wholesale enquiries welcome. ${product.botanicalName ? `Botanical name: ${product.botanicalName}.` : ''}`;

  const url = `${BASE_URL}/products/${product.slug}`;
  return {
    title,
    description,
    keywords: [
      ...(product.seoKeywords || []),
      `${product.name.toLowerCase()} extract`,
      `wholesale ${product.name.toLowerCase()}`,
      `${product.name.toLowerCase()} raw material`,
      `buy ${product.name.toLowerCase()} bulk`,
      'ayurvedic extract', 'herbal extract', 'organic', 'pharmaceutical grade',
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
  };
}
