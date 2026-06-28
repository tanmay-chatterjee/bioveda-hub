'use client';

import { m } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { IngredientCard } from '@/components/ui/IngredientCard';
import { staggerContainer, fadeInUp } from '@/hooks/useInViewAnimation';
import type { Product } from '@/types';

interface IngredientsShowcaseProps {
  products: Product[];
}

export function IngredientsShowcase({ products }: IngredientsShowcaseProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.15 });

  return (
    <section id="products" ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16 text-center"
        >
          <m.p variants={fadeInUp} className="mb-3 text-sm font-medium tracking-wider uppercase text-primary-400">
            Our Product Range
          </m.p>
          <m.h2 variants={fadeInUp} className="mb-4 font-display text-4xl font-bold text-text md:text-5xl">
            Premium Herbal Extracts
          </m.h2>
          <m.p variants={fadeInUp} className="mx-auto max-w-2xl text-text-muted">
            Pharmaceutical-grade Ayurvedic and organic botanical extracts sourced from
            GMP-certified manufacturers. All extracts come with full COA documentation.
          </m.p>
        </m.div>

        {/* Grid */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product) => (
            <m.div key={product._id} variants={fadeInUp}>
              <IngredientCard product={product} className="h-full" />
            </m.div>
          ))}
        </m.div>

        {/* View all CTA */}
        {products.length >= 6 && (
          <m.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mt-12 text-center"
          >
            <a
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
            >
              View all extracts →
            </a>
          </m.div>
        )}
      </div>
    </section>
  );
}
