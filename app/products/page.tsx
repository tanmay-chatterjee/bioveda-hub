import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { sanityFetch } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import { PRODUCTS_QUERY } from '@/lib/sanity.queries';
import { Badge } from '@/components/ui/Badge';
import type { Product } from '@/types';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Botanical Extract Catalog | Wholesale Herbal Raw Materials',
  description:
    'Browse 50+ pharmaceutical-grade Ayurvedic and herbal extracts. Turmeric, Ashwagandha, Neem, Aloe Vera, Green Tea and more. Wholesale bulk pricing. COA guaranteed.',
  keywords: [
    'herbal extract catalog', 'wholesale botanical extracts', 'ayurvedic raw materials bulk',
    'organic herbal ingredients', 'pharmaceutical grade extracts india', 'buy herbal extracts wholesale',
  ],
};

export default async function ProductsPage() {
  const products = await sanityFetch<Product[]>({
    query: PRODUCTS_QUERY,
    tags: ['products'],
  }).catch(() => [] as Product[]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium tracking-wider uppercase text-primary-400">
            Our Complete Range
          </p>
          <h1 className="mb-4 font-display text-4xl font-bold text-text md:text-5xl">
            Herbal Extract Catalog
          </h1>
          <p className="mx-auto max-w-2xl text-text-muted">
            Pharmaceutical-grade Ayurvedic and organic botanical extracts for wholesale.
            All products available with COA, MSDS, and full regulatory documentation.
          </p>
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              const imageUrl = product.heroImage
                ? urlFor(product.heroImage).width(400).height(280).format('webp').url()
                : null;
              return (
                <Link key={product._id} href={`/products/${product.slug.current}`} className="group">
                  <div className="rounded-2xl border border-surface-300 bg-surface-100 overflow-hidden hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-48">
                      {imageUrl ? (
                        <Image src={imageUrl} alt={product.heroImage?.alt || product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="h-full bg-gradient-to-br from-primary-950 to-surface-200" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-100/70 to-transparent" />
                      {product.featured && (
                        <span className="absolute top-3 left-3"><Badge variant="gold">Featured</Badge></span>
                      )}
                    </div>
                    <div className="p-5">
                      {product.category && <Badge variant="green" className="mb-2">{product.category}</Badge>}
                      <h2 className="text-base font-semibold text-text mb-1 group-hover:text-primary-400 transition-colors">{product.name}</h2>
                      {product.standardization && (
                        <p className="text-xs text-primary-400 mb-2">{product.standardization}</p>
                      )}
                      {product.shortDescription && (
                        <p className="text-xs text-text-muted line-clamp-2">{product.shortDescription}</p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* Fallback when Sanity not yet configured */
          <div className="rounded-2xl border border-surface-300 bg-surface-100 p-12 text-center">
            <p className="text-text-muted mb-4">Product catalog will appear here once Sanity CMS is configured.</p>
            <p className="text-sm text-text-dim">See README.md for setup instructions.</p>
          </div>
        )}
      </div>
    </div>
  );
}
