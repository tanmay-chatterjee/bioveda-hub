'use client';

import { m, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { X, ArrowRight, Leaf, FlaskConical } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/components/providers/ModalContext';
import { urlFor } from '@/lib/sanity';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

interface IngredientCardProps {
  product: Product;
  className?: string;
}

export function IngredientCard({ product, className }: IngredientCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { open } = useModal();

  const imageUrl = product.heroImage
    ? urlFor(product.heroImage).width(600).height(400).format('webp').url()
    : null;

  const blurUrl = product.heroImage
    ? urlFor(product.heroImage).width(20).height(14).format('webp').blur(10).url()
    : undefined;

  return (
    <>
      {/* ─── Collapsed card ──────────────────────────────────────────────── */}
      <m.div
        layoutId={`card-${product._id}`}
        onClick={() => setExpanded(true)}
        whileHover={{
          boxShadow: '0 0 0 1px rgba(34,197,94,0.3), 0 8px 32px rgba(34,197,94,0.08)',
          y: -4,
        }}
        transition={{ duration: 0.25 }}
        className={cn(
          'relative cursor-pointer rounded-2xl border border-surface-300',
          'bg-surface-100 overflow-hidden group',
          className
        )}
        role="button"
        aria-label={`View details for ${product.name}`}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpanded(true); }}
      >
        {/* Image */}
        <m.div layoutId={`card-image-${product._id}`} className="relative h-44 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.heroImage?.alt || product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              placeholder={blurUrl ? 'blur' : 'empty'}
              blurDataURL={blurUrl}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-primary-950 to-surface-200 flex items-center justify-center">
              <Leaf className="h-12 w-12 text-primary-700" />
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-100/80 via-transparent to-transparent" />

          {product.featured && (
            <span className="absolute top-3 left-3">
              <Badge variant="gold">Featured</Badge>
            </span>
          )}
          {product.status === 'Coming Soon' && (
            <span className="absolute top-3 right-3">
              <Badge variant="neutral">Coming Soon</Badge>
            </span>
          )}
        </m.div>

        {/* Content */}
        <m.div layoutId={`card-content-${product._id}`} className="p-5">
          {product.category && (
            <Badge variant="green" className="mb-2">{product.category}</Badge>
          )}
          <m.h3 layoutId={`card-title-${product._id}`} className="text-lg font-semibold text-text mb-1">
            {product.name}
          </m.h3>
          {product.botanicalName && (
            <p className="text-xs text-text-muted italic mb-3">{product.botanicalName}</p>
          )}
          {product.standardization && (
            <div className="flex items-center gap-1.5 mb-3">
              <FlaskConical className="h-3.5 w-3.5 text-primary-400 flex-shrink-0" />
              <span className="text-xs text-primary-400 font-medium">{product.standardization}</span>
            </div>
          )}
          {product.shortDescription && (
            <p className="text-sm text-text-muted line-clamp-2 mb-4">{product.shortDescription}</p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-dim">Click to explore</span>
            <ArrowRight className="h-4 w-4 text-primary-500 transition-transform group-hover:translate-x-1" />
          </div>
        </m.div>
      </m.div>

      {/* ─── Expanded overlay ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {expanded && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpanded(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />

            {/* Expanded card */}
            <m.div
              layoutId={`card-${product._id}`}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 mx-auto max-w-2xl rounded-2xl border border-surface-300 bg-surface-100 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setExpanded(false)}
                className="absolute top-4 right-4 z-10 rounded-full bg-surface-200 p-2 text-text-muted hover:text-text transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Image */}
              <m.div layoutId={`card-image-${product._id}`} className="relative h-64">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={product.heroImage?.alt || product.name}
                    fill
                    className="object-cover"
                    placeholder={blurUrl ? 'blur' : 'empty'}
                    blurDataURL={blurUrl}
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-primary-950 to-surface-200" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-100 via-transparent to-transparent" />
              </m.div>

              {/* Details */}
              <m.div layoutId={`card-content-${product._id}`} className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    {product.category && <Badge variant="green" className="mb-2">{product.category}</Badge>}
                    <m.h2 layoutId={`card-title-${product._id}`} className="text-2xl font-bold text-text">
                      {product.name}
                    </m.h2>
                    {product.botanicalName && (
                      <p className="text-sm text-text-muted italic mt-1">{product.botanicalName}</p>
                    )}
                  </div>
                </div>

                {/* Quick specs */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {product.standardization && (
                    <div className="rounded-lg bg-surface-200 p-3">
                      <p className="text-xs text-text-dim mb-1">Standardization</p>
                      <p className="text-sm font-medium text-primary-400">{product.standardization}</p>
                    </div>
                  )}
                  {product.moq && (
                    <div className="rounded-lg bg-surface-200 p-3">
                      <p className="text-xs text-text-dim mb-1">Min. Order Qty</p>
                      <p className="text-sm font-medium text-text">{product.moq}</p>
                    </div>
                  )}
                  {product.form && product.form.length > 0 && (
                    <div className="rounded-lg bg-surface-200 p-3">
                      <p className="text-xs text-text-dim mb-1">Available Forms</p>
                      <p className="text-sm font-medium text-text">{product.form.join(', ')}</p>
                    </div>
                  )}
                  {product.shelfLife && (
                    <div className="rounded-lg bg-surface-200 p-3">
                      <p className="text-xs text-text-dim mb-1">Shelf Life</p>
                      <p className="text-sm font-medium text-text">{product.shelfLife}</p>
                    </div>
                  )}
                </div>

                {product.shortDescription && (
                  <p className="text-sm text-text-muted mb-6 leading-relaxed">{product.shortDescription}</p>
                )}

                {product.healthBenefits && product.healthBenefits.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-text mb-3">Key Health Benefits</h4>
                    <ul className="space-y-1.5">
                      {product.healthBenefits.slice(0, 4).map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-text-muted">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTAs */}
                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => { setExpanded(false); open({ productSlug: product.slug.current, productName: product.name }); }}
                  >
                    Request Enquiry
                  </Button>
                  <Link href={`/products/${product.slug.current}`} onClick={() => setExpanded(false)}>
                    <Button variant="secondary">
                      Full Details <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </m.div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
