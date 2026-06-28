'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { FlaskConical, Package, Clock, Thermometer } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/components/providers/ModalContext';
import { urlFor } from '@/lib/sanity';
import { staggerContainer, fadeInUp } from '@/hooks/useInViewAnimation';
import type { Product } from '@/types';

interface ProductDetailHeroProps {
  product: Product;
}

export function ProductDetailHero({ product }: ProductDetailHeroProps) {
  const { open } = useModal();

  const imageUrl = product.heroImage
    ? urlFor(product.heroImage).width(900).height(600).format('webp').url()
    : null;

  return (
    <section className="pt-28 pb-16 px-6">
      <div className="mx-auto max-w-7xl">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center"
        >
          {/* Image */}
          <m.div variants={fadeInUp} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.heroImage?.alt || product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary-950 to-surface-200 flex items-center justify-center">
                <FlaskConical className="h-24 w-24 text-primary-700" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent" />
          </m.div>

          {/* Info */}
          <m.div variants={staggerContainer}>
            <m.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-4">
              {product.category && <Badge variant="green">{product.category}</Badge>}
              {product.status === 'Coming Soon' && <Badge variant="neutral">Coming Soon</Badge>}
            </m.div>

            <m.h1 variants={fadeInUp} className="font-display text-4xl font-bold text-text mb-2 md:text-5xl">
              {product.name}
            </m.h1>

            {product.botanicalName && (
              <m.p variants={fadeInUp} className="text-lg text-text-muted italic mb-6">
                {product.botanicalName}
              </m.p>
            )}

            {product.shortDescription && (
              <m.p variants={fadeInUp} className="text-text-muted leading-relaxed mb-8">
                {product.shortDescription}
              </m.p>
            )}

            {/* Quick specs grid */}
            <m.div variants={fadeInUp} className="grid grid-cols-2 gap-3 mb-8">
              {product.standardization && (
                <div className="rounded-xl bg-surface-100 border border-surface-300 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <FlaskConical className="h-4 w-4 text-primary-400" />
                    <span className="text-xs text-text-dim">Standardization</span>
                  </div>
                  <p className="font-semibold text-primary-400">{product.standardization}</p>
                </div>
              )}
              {product.moq && (
                <div className="rounded-xl bg-surface-100 border border-surface-300 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="h-4 w-4 text-accent-400" />
                    <span className="text-xs text-text-dim">Min. Order Qty</span>
                  </div>
                  <p className="font-semibold text-text">{product.moq}</p>
                </div>
              )}
              {product.shelfLife && (
                <div className="rounded-xl bg-surface-100 border border-surface-300 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-xs text-text-dim">Shelf Life</span>
                  </div>
                  <p className="font-semibold text-text">{product.shelfLife}</p>
                </div>
              )}
              {product.storageConditions && (
                <div className="rounded-xl bg-surface-100 border border-surface-300 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Thermometer className="h-4 w-4 text-orange-400" />
                    <span className="text-xs text-text-dim">Storage</span>
                  </div>
                  <p className="font-semibold text-text text-sm">{product.storageConditions}</p>
                </div>
              )}
            </m.div>

            <m.div variants={fadeInUp} className="flex gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => open({ productSlug: product.slug.current, productName: product.name })}
                className="flex-1"
              >
                Request Bulk Enquiry
              </Button>
              {product.coaDocument && (
                <Button variant="secondary" size="lg">
                  Download COA
                </Button>
              )}
            </m.div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
