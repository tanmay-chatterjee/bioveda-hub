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
    description: 'Every extract undergoes rigorous HPLC and TLC testing. Full COA provided with each batch for your formulation compliance.',
    iconColor: 'text-primary-600',
    iconBg: 'bg-primary-500/12',
    border: 'hover:border-primary-300',
  },
  {
    icon: ShieldCheck,
    title: 'GMP & ISO Certified',
    description: 'Our manufacturing partners hold GMP, ISO 9001:2015, and FSSAI certifications. Audit-ready documentation available.',
    iconColor: 'text-accent-600',
    iconBg: 'bg-accent-500/12',
    border: 'hover:border-accent-300',
  },
  {
    icon: Leaf,
    title: 'Organic & Natural Sourcing',
    description: 'Botanicals sourced from certified organic farms across India. Ayurvedic heritage meets modern extraction science.',
    iconColor: 'text-accent-600',
    iconBg: 'bg-accent-500/10',
    border: 'hover:border-accent-300',
  },
  {
    icon: Truck,
    title: 'Bulk Wholesale Supply',
    description: 'Flexible MOQs from 25 kg to multi-metric-tonne orders. Temperature-controlled logistics for sensitive extracts.',
    iconColor: 'text-terra-500',
    iconBg: 'bg-terra-100',
    border: 'hover:border-terra-300',
  },
  {
    icon: FileText,
    title: 'Complete Documentation',
    description: 'COA, MSDS, TDS, and regulatory compliance documents provided. Supports FDA, EU, and AYUSH approvals.',
    iconColor: 'text-primary-600',
    iconBg: 'bg-primary-500/10',
    border: 'hover:border-primary-300',
  },
  {
    icon: Globe,
    title: 'Global B2B Distribution',
    description: 'Supplying to pharmaceutical and nutraceutical companies across 30+ countries. Export documentation and customs support.',
    iconColor: 'text-accent-600',
    iconBg: 'bg-accent-500/10',
    border: 'hover:border-accent-300',
  },
];

export function WhyBioVeda() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-24 px-6 botanical-bg-green">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16 text-center"
        >
          <m.div variants={fadeInUp} className="mb-4 flex justify-center">
            <span className="herb-badge herb-badge-green">Why Choose BioVeda Hub</span>
          </m.div>
          <m.h2 variants={fadeInUp} className="mb-4 font-display text-4xl font-bold text-text md:text-5xl">
            The BioVeda <span className="text-gradient-herb">Advantage</span>
          </m.h2>
          <m.p variants={fadeInUp} className="mx-auto max-w-2xl text-text-muted">
            Bridging traditional Ayurvedic wisdom with modern pharmaceutical standards —
            so your formulations carry the purest botanical heritage.
          </m.p>
        </m.div>

        {/* Feature grid */}
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
              className={`warm-card p-6 transition-all duration-300 cursor-default ${feat.border}`}
            >
              <div className={`mb-4 inline-flex rounded-xl p-3 ${feat.iconBg}`}>
                <feat.icon className={`h-5 w-5 ${feat.iconColor}`} />
              </div>
              <h3 className="mb-2 text-base font-semibold text-text">{feat.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{feat.description}</p>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
