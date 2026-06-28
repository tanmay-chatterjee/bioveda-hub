'use client';

import { m } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/hooks/useInViewAnimation';
import type { Certification } from '@/types';

interface TrustSignalsProps {
  certifications: Certification[];
}

const partnerNames = [
  'Sun Pharma', 'Dabur', 'Himalaya', 'Patanjali', 'Lupin',
  'Emami', 'Marico', 'Cipla', 'Ayurvedagram', 'Biotique',
];

export function TrustSignals({ certifications }: TrustSignalsProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <m.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center text-sm text-text-dim uppercase tracking-widest mb-8"
        >
          Trusted by India&apos;s leading pharmaceutical &amp; wellness brands
        </m.p>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...partnerNames, ...partnerNames].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="inline-block text-xl font-display font-semibold text-text-dim opacity-40 hover:opacity-80 transition-opacity select-none"
              >
                {name}
              </span>
            ))}
          </div>
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent" />
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mt-16 flex flex-wrap items-center justify-center gap-6"
          >
            {certifications.map((cert) => (
              <m.div
                key={cert._id}
                variants={fadeInUp}
                className="flex flex-col items-center gap-2 rounded-xl border border-surface-300 bg-surface-100 px-6 py-4"
              >
                <span className="text-sm font-semibold text-text">{cert.name}</span>
                {cert.issuingBody && (
                  <span className="text-xs text-text-dim">{cert.issuingBody}</span>
                )}
              </m.div>
            ))}
          </m.div>
        )}

        {/* Fallback certification badges if no CMS data */}
        {certifications.length === 0 && (
          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mt-16 flex flex-wrap items-center justify-center gap-4"
          >
            {['GMP Certified', 'ISO 9001:2015', 'FSSAI Approved', 'AYUSH Compliant', 'COA Guaranteed'].map((c) => (
              <m.div
                key={c}
                variants={fadeInUp}
                className="flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/5 px-5 py-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                <span className="text-sm font-medium text-primary-300">{c}</span>
              </m.div>
            ))}
          </m.div>
        )}
      </div>
    </section>
  );
}
