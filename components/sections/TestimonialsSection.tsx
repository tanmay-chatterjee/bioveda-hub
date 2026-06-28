'use client';

import { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const data = testimonials.length > 0 ? testimonials : fallbackTestimonials;
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setInterval(() => setCurrent((c) => (c + 1) % data.length), 5500);
    return () => clearInterval(timer);
  }, [data.length]);

  return (
    <section className="py-24 px-6 botanical-bg-green">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <span className="herb-badge mb-3 inline-flex">Client Testimonials</span>
          <h2 className="mt-2 font-display text-4xl font-bold text-text">
            Trusted by <span className="text-gradient-saffron">Industry Leaders</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className={`transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="warm-card p-8 md:p-10 min-h-[220px]">
            <Quote className="h-8 w-8 text-primary-400/50 mb-5" />
            <p className="text-lg text-text leading-relaxed mb-8 font-light italic">
              &ldquo;{data[current].quote}&rdquo;
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold text-text">{data[current].contactName}</p>
                <p className="text-sm text-text-muted">
                  {data[current].designation && `${data[current].designation}, `}
                  {data[current].companyName}
                </p>
                {data[current].industry && (
                  <span className="mt-1 inline-block text-xs font-medium text-primary-600">
                    {data[current].industry}
                  </span>
                )}
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: data[current].rating || 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary-500 text-primary-500" />
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setCurrent((c) => (c - 1 + data.length) % data.length)}
              className="rounded-full border border-surface-300 bg-white p-2 text-text-muted hover:text-text hover:border-primary-300 transition-colors shadow-warm-sm"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {data.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all ${i === current ? 'w-6 bg-primary-500' : 'w-1.5 bg-surface-300'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => (c + 1) % data.length)}
              className="rounded-full border border-surface-300 bg-white p-2 text-text-muted hover:text-text hover:border-primary-300 transition-colors shadow-warm-sm"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
