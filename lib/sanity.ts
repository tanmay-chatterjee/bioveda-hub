import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = '2024-01-01';

// createClient requires a non-empty projectId — use 'placeholder' as a safe default
// so it never throws on startup when env vars aren't yet configured.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Fetch data from Sanity with Next.js ISR cache tagging.
 * Tags allow on-demand revalidation via the /api/revalidate endpoint.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number;
}): Promise<T> {
  // Skip real fetch when Sanity is not yet configured — return safe empty defaults
  // so every page renders gracefully without a real CMS connection.
  if (projectId === 'placeholder' || !projectId) {
    return ([] as unknown) as T;
  }

  return client.fetch<T>(query, params, {
    next: {
      revalidate: revalidate ?? 3600,
      ...(tags.length > 0 ? { tags } : {}),
    },
  });
}
