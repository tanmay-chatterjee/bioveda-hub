'use client';

import { m } from 'framer-motion';
import { ArrowRight, Shield, Award, Globe, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useModal } from '@/components/providers/ModalContext';

const stats = [
  { icon: Shield, value: 'GMP & ISO', label: 'Certified' },
  { icon: Award, value: '50+ Extracts', label: 'Product Range' },
  { icon: Globe, value: '200+ Clients', label: 'B2B Partners' },
];

const floatingHerbs = [
  { emoji: '🌿', top: '15%', left: '5%', delay: 0, size: 'text-3xl' },
  { emoji: '🍃', top: '70%', left: '3%', delay: 1.2, size: 'text-2xl' },
  { emoji: '🌾', top: '20%', right: '6%', delay: 0.6, size: 'text-3xl' },
  { emoji: '🌱', top: '65%', right: '4%', delay: 1.8, size: 'text-2xl' },
  { emoji: '🌻', top: '45%', left: '8%', delay: 2.2, size: 'text-2xl' },
  { emoji: '🍀', top: '40%', right: '7%', delay: 0.9, size: 'text-2xl' },
];

export function HeroSection() {
  const reduced = useReducedMotion();
  const { open } = useModal();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden botanical-bg">

      {/* Radial warm glow center */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 h-[600px] w-[600px] rounded-full bg-primary-400/10 blur-[100px]" />
        <div className="absolute bottom-10 right-1/4 h-64 w-64 rounded-full bg-accent-400/10 blur-[80px]" />
      </div>

      {/* Floating herb decorations */}
      {!reduced && floatingHerbs.map((h, i) => (
        <m.div
          key={i}
          className={`pointer-events-none absolute hidden lg:block ${h.size} select-none`}
          style={{ top: h.top, left: h.left, right: h.right }}
          animate={{ y: [0, -14, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 5 + i * 0.7, delay: h.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {h.emoji}
        </m.div>
      ))}

      {/* Decorative mandala ring */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full border border-primary-400/8 hidden lg:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full border border-accent-400/10 hidden lg:block"
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 pb-16 text-center">
        <m.div variants={containerVariants} initial="hidden" animate="visible">

          {/* Top badge */}
          <m.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2">
            <span className="herb-badge">
              <Leaf className="h-3 w-3" />
              India&apos;s Premier Ayurvedic Extract Supplier
            </span>
          </m.div>

          {/* Headline */}
          <m.h1
            variants={itemVariants}
            className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight text-text md:text-7xl"
          >
            From Ancient{' '}
            <span className="text-gradient-saffron">Wisdom</span>
            <br />
            to Modern{' '}
            <span className="text-gradient-herb">Wellness</span>
          </m.h1>

          {/* Sub-headline */}
          <m.p
            variants={itemVariants}
            className="mx-auto mb-10 max-w-2xl text-lg text-text-muted leading-relaxed"
          >
            BioVeda Hub is India&apos;s trusted B2B wholesale supplier of pharmaceutical-grade
            Ayurvedic and herbal botanical extracts — from turmeric &amp; ashwagandha to neem
            &amp; moringa. Pure, certified, and ready for your formulations.
          </m.p>

          {/* CTAs */}
          <m.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => open()}
              className="min-w-[180px] shadow-saffron"
            >
              Request a Sample
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Products
            </Button>
          </m.div>

          {/* Stats row */}
          <m.div
            variants={itemVariants}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary-500" />
                  <span className="text-xl font-bold text-text">{value}</span>
                </div>
                <span className="text-sm text-text-muted">{label}</span>
              </div>
            ))}
          </m.div>

          {/* Herb strip */}
          <m.div
            variants={itemVariants}
            className="mt-12 inline-flex flex-wrap items-center justify-center gap-2"
          >
            {['Turmeric', 'Ashwagandha', 'Neem', 'Moringa', 'Aloe Vera', 'Green Tea', 'Brahmi', 'Triphala'].map((herb) => (
              <span key={herb} className="rounded-full bg-surface-100 border border-surface-300 px-3 py-1 text-xs text-text-muted font-medium">
                {herb}
              </span>
            ))}
          </m.div>
        </m.div>
      </div>

      {/* Scroll hint */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-text-dim tracking-widest uppercase">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-primary-500/40 to-transparent animate-pulse" />
      </m.div>
    </section>
  );
}
