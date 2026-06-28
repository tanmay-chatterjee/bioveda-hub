'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, FlaskConical, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/components/providers/ModalContext';
import type { Product } from '@/types';

interface IngredientsShowcaseProps {
  products: Product[];
}

// Fallback cards shown when Sanity CMS has no data yet
const FALLBACK_PRODUCTS = [
  {
    id: 'turmeric',
    name: 'Turmeric Curcumin Extract',
    botanicalName: 'Curcuma longa',
    category: 'Anti-inflammatory',
    standardization: 'Curcuminoids 95% by HPLC',
    shortDescription: 'India\'s golden herb — potent anti-inflammatory and antioxidant. Pharmaceutical-grade with full standardization documentation.',
    benefits: ['Joint health', 'Anti-inflammatory', 'Antioxidant', 'Liver support'],
    img: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&h=400&fit=crop&q=80',
    slug: 'turmeric-curcumin',
    moq: '25 kg',
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha Extract',
    botanicalName: 'Withania somnifera',
    category: 'Adaptogen',
    standardization: 'Withanolides 5–10% by HPLC',
    shortDescription: 'The ultimate Ayurvedic adaptogen — proven to reduce stress, boost energy, and support hormonal balance.',
    benefits: ['Stress relief', 'Energy & stamina', 'Hormonal balance', 'Cognitive support'],
    img: 'https://images.unsplash.com/photo-1611241893603-3c228ee0ce9f?w=600&h=400&fit=crop&q=80',
    slug: 'ashwagandha',
    moq: '25 kg',
  },
  {
    id: 'neem',
    name: 'Neem Extract',
    botanicalName: 'Azadirachta indica',
    category: 'Skin & Hair',
    standardization: 'Azadirachtin 0.3–3%',
    shortDescription: 'Nature\'s purifier — neem extract is trusted for skincare, haircare, oral hygiene, and immune support formulations.',
    benefits: ['Skin purification', 'Anti-bacterial', 'Hair health', 'Immune support'],
    img: 'https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?w=600&h=400&fit=crop&q=80',
    slug: 'neem',
    moq: '25 kg',
  },
  {
    id: 'moringa',
    name: 'Moringa Leaf Extract',
    botanicalName: 'Moringa oleifera',
    category: 'General Wellness',
    standardization: 'Total phenols ≥ 5%',
    shortDescription: 'The "miracle tree" — dense in vitamins, minerals, and antioxidants. Ideal for nutraceutical and wellness supplement formulations.',
    benefits: ['Rich in vitamins', 'Antioxidant', 'Energy boost', 'Nutritional support'],
    img: 'https://images.unsplash.com/photo-1622467827417-bbe2237067a9?w=600&h=400&fit=crop&q=80',
    slug: 'moringa',
    moq: '25 kg',
  },
  {
    id: 'aloe-vera',
    name: 'Aloe Vera Extract',
    botanicalName: 'Aloe barbadensis miller',
    category: 'Skin & Hair',
    standardization: 'Aloin ≤ 10 ppm, Polysaccharides 10%',
    shortDescription: 'Centuries-old skin soother and digestive aid. Cold-processed to preserve bioactive polysaccharides and enzymes.',
    benefits: ['Skin hydration', 'Wound healing', 'Digestive health', 'Anti-aging'],
    img: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&h=400&fit=crop&q=80',
    slug: 'aloe-vera',
    moq: '25 kg',
  },
  {
    id: 'green-tea',
    name: 'Green Tea Extract',
    botanicalName: 'Camellia sinensis',
    category: 'Antioxidant',
    standardization: 'EGCG 50–98% by HPLC',
    shortDescription: 'One of the most researched antioxidants globally — EGCG-rich extract for weight management, skin health, and metabolic support.',
    benefits: ['Metabolism boost', 'Antioxidant', 'Weight management', 'Cognitive clarity'],
    img: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=600&h=400&fit=crop&q=80',
    slug: 'green-tea',
    moq: '25 kg',
  },
];

const categoryColors: Record<string, string> = {
  'Anti-inflammatory': 'bg-terra-100 text-terra-500',
  'Adaptogen':         'bg-primary-100 text-primary-700',
  'Skin & Hair':       'bg-accent-100 text-accent-700',
  'General Wellness':  'bg-surface-200 text-text-muted',
  'Antioxidant':       'bg-green-100 text-green-700',
  'Immunity':          'bg-amber-100 text-amber-700',
};

export function IngredientsShowcase({ products }: IngredientsShowcaseProps) {
  const { open } = useModal();
  const useFallback = products.length === 0;

  return (
    <section id="products" className="py-24 px-6 bg-surface">

      {/* ── Section header ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="herb-badge herb-badge-green mb-3 inline-flex">Our Product Range</span>
            <h2 className="mt-2 font-display text-4xl font-bold text-text md:text-5xl">
              Premium Herbal <span className="text-gradient-saffron">Extracts</span>
            </h2>
            <p className="mt-3 max-w-xl text-text-muted">
              Pharmaceutical-grade Ayurvedic botanicals. All extracts come with full COA,
              MSDS, and HPLC/TLC test documentation.
            </p>
          </div>
          <Link href="/products">
            <Button variant="secondary" size="md">
              View All Products <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* ── Product grid ───────────────────────────────────────────────────── */}
        {useFallback ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FALLBACK_PRODUCTS.map((p) => (
              <div
                key={p.id}
                className="warm-card overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <span className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-medium ${categoryColors[p.category] ?? 'bg-surface-200 text-text-muted'}`}>
                    {p.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3 className="text-base font-semibold text-text mb-0.5">{p.name}</h3>
                  <p className="text-xs text-text-dim italic mb-2">{p.botanicalName}</p>

                  <div className="flex items-center gap-1.5 mb-3">
                    <FlaskConical className="h-3.5 w-3.5 text-primary-500 flex-shrink-0" />
                    <span className="text-xs text-primary-600 font-medium">{p.standardization}</span>
                  </div>

                  <p className="text-sm text-text-muted leading-relaxed mb-4 line-clamp-2">
                    {p.shortDescription}
                  </p>

                  {/* Benefits pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.benefits.map((b) => (
                      <span key={b} className="rounded-full bg-surface-100 border border-surface-300 px-2.5 py-0.5 text-xs text-text-muted">
                        {b}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-surface-200 pt-4">
                    <span className="text-xs text-text-dim">MOQ: <span className="font-medium text-text">{p.moq}</span></span>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => open({ productSlug: p.slug, productName: p.name })}
                    >
                      Get Quote
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const imageUrl = product.heroImage
                ? `https://cdn.sanity.io/images/${product.heroImage._sanityAsset || ''}`
                : null;
              return (
                <div key={product._id} className="warm-card overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                  <div className="relative h-48 overflow-hidden bg-surface-100">
                    {imageUrl ? (
                      <Image src={imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <Leaf className="h-12 w-12 text-primary-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-text mb-1">{product.name}</h3>
                    {product.botanicalName && <p className="text-xs italic text-text-dim mb-3">{product.botanicalName}</p>}
                    {product.shortDescription && <p className="text-sm text-text-muted line-clamp-2 mb-4">{product.shortDescription}</p>}
                    <div className="flex items-center justify-between border-t border-surface-200 pt-4">
                      <span className="text-xs text-text-dim">{product.moq ? `MOQ: ${product.moq}` : ''}</span>
                      <Button variant="primary" size="sm" onClick={() => open({ productSlug: product.slug?.current, productName: product.name })}>
                        Get Quote
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Story strip ──────────────────────────────────────────────────── */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&q=80',
              title: 'Farm to Lab',
              desc: 'Sourced from certified organic farms across India and processed in GMP-compliant facilities.',
            },
            {
              img: 'https://images.unsplash.com/photo-1605289982774-9a6fef564df8?w=600&h=400&fit=crop&q=80',
              title: 'Rigorous Testing',
              desc: 'Every batch undergoes HPLC, TLC, heavy metal, and microbial testing before dispatch.',
            },
            {
              img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=400&fit=crop&q=80',
              title: 'Global Delivery',
              desc: 'Temperature-controlled shipping to 30+ countries with full export documentation.',
            },
          ].map((item) => (
            <div key={item.title} className="warm-card overflow-hidden group">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h3 className="absolute bottom-3 left-4 font-display text-lg font-bold text-white">{item.title}</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
