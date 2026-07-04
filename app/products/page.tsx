import type { Metadata } from 'next';
import { ProductCatalog } from '@/components/sections/ProductCatalog';
import { sanityFetch } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import { PRODUCTS_QUERY } from '@/lib/sanity.queries';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { CATALOG_PRODUCTS } from '@/lib/catalog-data';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Herbal Extract & Ingredient Catalog | Wholesale Botanical Raw Materials',
  description:
    'Browse 50+ pharmaceutical-grade Ayurvedic and herbal extracts, amino acids, essential oils, and pharma excipients. Ashwagandha, Turmeric, Boswellia, CoQ10 and more. Wholesale bulk pricing with COA guaranteed.',
  keywords: [
    'herbal extract catalog',
    'wholesale botanical extracts',
    'ayurvedic raw materials bulk',
    'pharmaceutical excipients india',
    'amino acids wholesale supplier',
    'essential oils bulk india',
    'pharmaceutical grade extracts',
    'nutraceutical ingredients supplier',
  ],
};

export default async function ProductsPage() {
  // Try Sanity first — fall through gracefully if not configured
  const sanityProducts = await sanityFetch<Product[]>({
    query: PRODUCTS_QUERY,
    tags: ['products'],
  }).catch(() => [] as Product[]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-surface">
      <div className="mx-auto max-w-7xl">

        {/* ── Page header ──────────────────────────────────────────────── */}
        <div className="mb-12 text-center">
          <span className="herb-badge herb-badge-green mb-3 inline-flex">
            M.U. Enterprises × Medisol Enterprises
          </span>
          <h1 className="mb-4 font-display text-4xl font-bold text-text md:text-5xl">
            Ingredient &amp; Extract <span className="text-gradient-saffron">Catalog</span>
          </h1>
          <p className="mx-auto max-w-2xl text-text-muted text-base">
            Pharmaceutical-grade Ayurvedic botanicals, amino acids, essential oils, pharma
            excipients, and nutraceuticals for wholesale supply. Every product ships with
            full COA, MSDS, and regulatory documentation.
          </p>
        </div>

        {/* ── Stats bar ────────────────────────────────────────────────── */}
        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: '50+',    label: 'Listed Products' },
            { value: '200+',   label: 'Total Catalog SKUs' },
            { value: '8',      label: 'Product Categories' },
            { value: 'GMP',    label: 'Certified Facilities' },
          ].map((stat) => (
            <div key={stat.label} className="warm-card p-4 text-center">
              <p className="font-display text-2xl font-bold text-primary-500">{stat.value}</p>
              <p className="text-xs text-text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Sanity products (if CMS configured) ─────────────────────── */}
        {sanityProducts.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 font-display text-2xl font-bold text-text">
              Featured Extracts
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sanityProducts.map((product) => {
                const imageUrl = product.heroImage
                  ? urlFor(product.heroImage).width(400).height(280).format('webp').url()
                  : null;
                return (
                  <Link
                    key={product._id}
                    href={`/products/${product.slug.current}`}
                    className="group"
                  >
                    <div className="rounded-2xl border border-surface-300 bg-surface-100 overflow-hidden hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1">
                      <div className="relative h-48">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={product.heroImage?.alt || product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="h-full bg-gradient-to-br from-primary-950 to-surface-200" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-100/70 to-transparent" />
                        {product.featured && (
                          <span className="absolute top-3 left-3">
                            <Badge variant="gold">Featured</Badge>
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        {product.category && (
                          <Badge variant="green" className="mb-2">{product.category}</Badge>
                        )}
                        <h2 className="text-base font-semibold text-text mb-1 group-hover:text-primary-400 transition-colors">
                          {product.name}
                        </h2>
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
          </section>
        )}

        {/* ── Static catalog (always shown) ───────────────────────────── */}
        <ProductCatalog />

      </div>
    </div>
  );
}
