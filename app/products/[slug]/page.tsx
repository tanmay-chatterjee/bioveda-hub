import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { sanityFetch } from '@/lib/sanity';
import { PRODUCT_BY_SLUG_QUERY, PRODUCT_SLUGS_QUERY } from '@/lib/sanity.queries';
import { generateProductMetadata } from '@/lib/seo';
import { ProductDetailHero } from '@/components/sections/ProductDetailHero';
import { ProductSpecsTable } from '@/components/sections/ProductSpecsTable';
import type { Product } from '@/types';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: PRODUCT_SLUGS_QUERY,
    tags: ['products'],
  }).catch(() => []);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await sanityFetch<Product | null>({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: [`product:${params.slug}`],
  }).catch(() => null);

  if (!product) return { title: 'Product Not Found' };

  return generateProductMetadata({
    name: product.name,
    botanicalName: product.botanicalName,
    seoTitle: product.seoTitle,
    seoDescription: product.seoDescription,
    seoKeywords: product.seoKeywords,
    shortDescription: product.shortDescription,
    slug: params.slug,
  });
}

export const revalidate = 3600;

export default async function ProductPage({ params }: PageProps) {
  const product = await sanityFetch<Product | null>({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: [`product:${params.slug}`],
  }).catch(() => null);

  if (!product) notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription || '',
    brand: { '@type': 'Brand', name: 'BioVeda Hub' },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: 'Contact for pricing',
      priceCurrency: 'INR',
      seller: { '@type': 'Organization', name: 'BioVeda Hub' },
    },
    ...(product.botanicalName && { scientificName: product.botanicalName }),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.biovedahub.com' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.biovedahub.com/products' },
      { '@type': 'ListItem', position: 3, name: product.name, item: `https://www.biovedahub.com/products/${params.slug}` },
    ],
  };

  const faqJsonLd = product.faq && product.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: product.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null;

  return (
    <>
      <Script id="product-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <Script id="breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <ProductDetailHero product={product} />
      <ProductSpecsTable product={product} />

      {/* Health benefits */}
      {product.healthBenefits && product.healthBenefits.length > 0 && (
        <section className="py-16 px-6 bg-surface-100/30">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 font-display text-3xl font-bold text-text">Health Benefits & Applications</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {product.healthBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-surface-300 bg-surface-100 p-4">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary-500 flex-shrink-0" />
                  <p className="text-sm text-text-muted">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {product.faq && product.faq.length > 0 && (
        <section className="py-16 px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 font-display text-3xl font-bold text-text">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {product.faq.map((item) => (
                <details key={item._key} className="group rounded-xl border border-surface-300 bg-surface-100">
                  <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-medium text-text">
                    {item.question}
                    <span className="text-primary-400 transition-transform group-open:rotate-180">▾</span>
                  </summary>
                  <p className="px-5 pb-5 text-sm text-text-muted leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related products */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <section className="py-16 px-6 bg-surface-100/30">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 font-display text-3xl font-bold text-text">Related Products</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {product.relatedProducts.map((p) => (
                <a key={p._id} href={`/products/${p.slug.current}`} className="group rounded-xl border border-surface-300 bg-surface-100 p-5 hover:border-primary-500/30 transition-colors">
                  <p className="text-sm font-semibold text-text group-hover:text-primary-400 transition-colors">{p.name}</p>
                  {p.standardization && <p className="mt-1 text-xs text-primary-400">{p.standardization}</p>}
                  {p.shortDescription && <p className="mt-2 text-xs text-text-muted line-clamp-2">{p.shortDescription}</p>}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
