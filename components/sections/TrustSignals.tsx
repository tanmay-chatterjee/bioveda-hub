'use client';

import { ShieldCheck } from 'lucide-react';
import type { Certification } from '@/types';

interface TrustSignalsProps {
  certifications: Certification[];
}

const partnerNames = [
  'Sun Pharma', 'Dabur', 'Himalaya', 'Patanjali', 'Lupin',
  'Emami', 'Marico', 'Cipla', 'Ayurvedagram', 'Biotique',
];

const fallbackCerts = [
  { id: 'gmp',    name: 'WHO-GMP Certified',   body: 'World Health Organization' },
  { id: 'iso',    name: 'ISO 9001:2015',        body: 'International Standard' },
  { id: 'fssai',  name: 'FSSAI Approved',       body: 'Food Safety Authority of India' },
  { id: 'ayush',  name: 'AYUSH Compliant',      body: 'Ministry of AYUSH, India' },
  { id: 'coa',    name: 'COA Guaranteed',       body: 'Every Batch' },
];

export function TrustSignals({ certifications }: TrustSignalsProps) {
  const certs = certifications.length > 0
    ? certifications.map((c) => ({ id: c._id, name: c.name, body: c.issuingBody || '' }))
    : fallbackCerts;

  return (
    <section className="py-20 px-6 overflow-hidden bg-surface">
      <div className="mx-auto max-w-7xl">

        {/* Label */}
        <p className="text-center text-xs text-text-dim uppercase tracking-widest mb-8">
          Trusted by India&apos;s leading pharmaceutical &amp; wellness brands
        </p>

        {/* Partner marquee */}
        <div className="relative overflow-hidden">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...partnerNames, ...partnerNames].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="inline-block font-display text-xl font-semibold text-text-dim opacity-50 hover:opacity-90 transition-opacity select-none"
              >
                {name}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent" />
        </div>

        {/* Certification badges */}
        <div className="mt-16 flex flex-wrap items-stretch justify-center gap-4">
          {certs.map((cert) => (
            <div
              key={cert.id}
              className="warm-card flex items-center gap-3 px-5 py-3.5 min-w-[180px]"
            >
              <div className="rounded-lg bg-accent-500/10 p-2 flex-shrink-0">
                <ShieldCheck className="h-4 w-4 text-accent-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text leading-tight">{cert.name}</p>
                {cert.body && (
                  <p className="text-xs text-text-dim mt-0.5">{cert.body}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
