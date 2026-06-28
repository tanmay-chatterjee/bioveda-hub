import type { MetadataRoute } from 'next';
import { sanityFetch } from '@/lib/sanity';
import { PRODUCT_SLUGS_QUERY } from '@/lib/sanity.queries';

const BASE_URL = 'https://www.biovedahub.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productSlugs = await sanityFetch<Array<{ slug: string }>>({
    query: PRODUCT_SLUGS_QUERY,
    tags: ['products'],
  }).catch(() => []);

  const productEntries: MetadataRoute.Sitemap = productSlugs.map(({ slug }) => ({
    url: `${BASE_URL}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/certifications`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ...productEntries,
  ];
}
