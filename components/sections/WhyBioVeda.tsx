'use client';

import { m } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { FlaskConical, ShieldCheck, Truck, FileText, Leaf, Globe } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/hooks/useInViewAnimation';

const features = [
  {
    icon: FlaskConical,
    title: 'Pharmaceutical-Grade Quality',
    description: 'Every extract undergoes rigorous HPLC and TLC testing. Full COA provided with each batch for your formulation compliance needs.',
    color: 'text-primary-400',
    bg: 'bg-primary-500/10',
  },
  {
    icon: ShieldCheck,
    title: 'GMP & ISO Certified',
    description: 'Our manufacturing partners hold GMP, ISO 9001:2015, and FSSAI certifications. Audit-ready documentation available.',
    color: 'text-accent-400',
    bg: 'bg-accent-500/10',
  },
  {
    icon: Leaf,
    title: 'Organic & Natural Sourcing',
    description: 'Botanicals sourced from certified organic farms across India. Ayurvedic heritage meets modern extraction science.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    icon: Truck,
    title: 'Bulk Wholesale Supply',
    description: 'Flexible MOQs from 25 kg to multi-metric-tonne orders. Temperature-controlled logistics for sensitive extracts.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: FileText,
    title: 'Complete Documentation',
    description: 'COA, MSDS, TDS, and regulatory compliance documents provided. Supports FDA, EU, and AYUSH approvals.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Globe,
    title: 'Global B2B Distribution',
    description: 'Supplying to pharmaceutical and nutraceutical companies across 30+ countries. Export documentation and customs support.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
];

export function WhyBioVeda() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-24 px-6 bg-surface-100/50">
      <div className="mx-auto max-w-7xl">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16 text-center"
        >
          <m.p variants={fadeInUp} className="mb-3 text-sm font-medium tracking-wider uppercase text-accent-400">
            Why Choose BioVeda Hub
          </m.p>
          <m.h2 variants={fadeInUp} className="mb-4 font-display text-4xl font-bold text-text md:text-5xl">
            The BioVeda Advantage
          </m.h2>
          <m.p variants={fadeInUp} className="mx-auto max-w-2xl text-text-muted">
            From Ayurvedic raw materials to aayush-compliant extracts — we bridge traditional
            botanical wisdom with modern pharmaceutical standards.
          </m.p>
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feat) => (
            <m.div
              key={feat.title}
              variants={fadeInUp}
              className="rounded-2xl border border-surface-300 bg-surface-100 p-6 hover:border-surface-400 transition-colors"
            >
              <div className={`mb-4 inline-flex rounded-xl p-3 ${feat.bg}`}>
                <feat.icon className={`h-6 w-6 ${feat.color}`} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-text">{feat.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{feat.description}</p>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
