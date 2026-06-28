'use client';

import dynamic from 'next/dynamic';
import { m } from 'framer-motion';
import { ArrowRight, Shield, Award, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FluidBackground } from '@/components/3d/FluidBackground';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useModal } from '@/components/providers/ModalContext';

const ParticleField = dynamic(
  () => import('@/components/3d/ParticleField').then((m) => m.ParticleField),
  { ssr: false, loading: () => <FluidBackground /> }
);

const stats = [
  { icon: Shield, value: 'GMP & ISO', label: 'Certified' },
  { icon: Award, value: '50+ Extracts', label: 'Product Range' },
  { icon: Globe, value: '200+ Clients', label: 'B2B Partners' },
];

export function HeroSection() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const { open } = useModal();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      {!reduced && !isMobile ? <ParticleField /> : <FluidBackground />}

      {/* Content overlay */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 pb-16 text-center">
        <m.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Label */}
          <m.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-xs font-medium text-primary-400 tracking-wider uppercase">
              Premium Ayurvedic & Herbal Extracts
            </span>
          </m.div>

          {/* Headline */}
          <m.h1
            variants={itemVariants}
            className="mb-6 font-display text-5xl font-bold leading-tight tracking-tight text-text md:text-7xl"
          >
            From Ancient{' '}
            <span className="text-gradient-green">Wisdom</span>
            <br />
            to Modern{' '}
            <span className="text-gradient-gold">Science</span>
          </m.h1>

          {/* Subheadline */}
          <m.p
            variants={itemVariants}
            className="mx-auto mb-10 max-w-2xl text-lg text-text-muted leading-relaxed"
          >
            BioVeda Hub is India&apos;s premier wholesale supplier of pharmaceutical-grade
            Ayurvedic and herbal botanical extracts. Trusted by 200+ pharmaceutical,
            nutraceutical, and cosmetic manufacturers worldwide.
          </m.p>

          {/* CTAs */}
          <m.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => open()}
              className="min-w-[180px]"
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

          {/* Stats */}
          <m.div
            variants={itemVariants}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary-400" />
                  <span className="text-xl font-bold text-text">{value}</span>
                </div>
                <span className="text-sm text-text-muted">{label}</span>
              </div>
            ))}
          </m.div>
        </m.div>
      </div>

      {/* Scroll hint */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-text-dim tracking-widest uppercase">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-primary-500/50 to-transparent animate-pulse" />
      </m.div>
    </section>
  );
}
