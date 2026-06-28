'use client';

import { m, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/hooks/useInViewAnimation';
import type { Testimonial } from '@/types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const fallbackTestimonials: Testimonial[] = [
  {
    _id: '1', _type: 'testimonial',
    companyName: 'PharmaTech Industries',
    contactName: 'Dr. Rajan Mehta',
    designation: 'Head of Procurement',
    industry: 'Pharmaceutical',
    quote: 'BioVeda Hub has been our go-to supplier for curcumin and ashwagandha extracts. Consistent quality, on-time delivery, and excellent COA documentation every single time.',
    rating: 5, featured: true,
  },
  {
    _id: '2', _type: 'testimonial',
    companyName: 'NutriLife Solutions',
    contactName: 'Priya Kapoor',
    designation: 'R&D Director',
    industry: 'Nutraceutical',
    quote: 'The standardization quality and batch-to-batch consistency of their herbal extracts is remarkable. They truly understand pharmaceutical-grade requirements.',
    rating: 5, featured: true,
  },
  {
    _id: '3', _type: 'testimonial',
    companyName: 'Ayur Cosmetics Ltd.',
    contactName: 'Sanjay Verma',
    designation: 'Supply Chain Manager',
    industry: 'Cosmetic',
    quote: 'Excellent wholesale pricing and MOQ flexibility for our neem and aloe vera requirements. The team is responsive and the documentation is always audit-ready.',
    rating: 5, featured: true,
  },
];

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 });
  const data = testimonials.length > 0 ? testimonials : fallbackTestimonials;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % data.length), 5000);
    return () => clearInterval(timer);
  }, [data.length]);

  return (
    <section ref={ref} className="py-24 px-6 bg-surface-100/30">
      <div className="mx-auto max-w-4xl">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-12 text-center"
        >
          <m.p variants={fadeInUp} className="mb-3 text-sm font-medium tracking-wider uppercase text-primary-400">
            Client Testimonials
          </m.p>
          <m.h2 variants={fadeInUp} className="font-display text-4xl font-bold text-text">
            Trusted by Industry Leaders
          </m.h2>
        </m.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <m.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-surface-300 bg-surface-100 p-8 md:p-10"
            >
              <Quote className="h-8 w-8 text-primary-500/40 mb-6" />
              <p className="text-lg text-text leading-relaxed mb-8 font-light">
                &ldquo;{data[current].quote}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-text">{data[current].contactName}</p>
                  <p className="text-sm text-text-muted">
                    {data[current].designation && `${data[current].designation}, `}
                    {data[current].companyName}
                  </p>
                  {data[current].industry && (
                    <span className="mt-1 inline-block text-xs text-primary-400">{data[current].industry}</span>
                  )}
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: data[current].rating || 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent-400 text-accent-400" />
                  ))}
                </div>
              </div>
            </m.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setCurrent((c) => (c - 1 + data.length) % data.length)}
              className="rounded-full border border-surface-300 p-2 text-text-muted hover:text-text hover:border-surface-400 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {data.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all ${i === current ? 'w-6 bg-primary-500' : 'w-1.5 bg-surface-300'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => (c + 1) % data.length)}
              className="rounded-full border border-surface-300 p-2 text-text-muted hover:text-text hover:border-surface-400 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
