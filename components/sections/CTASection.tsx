'use client';

import { m } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/components/providers/ModalContext';
import { staggerContainer, fadeInUp } from '@/hooks/useInViewAnimation';

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 });
  const { open } = useModal();

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative rounded-3xl border border-primary-500/20 bg-gradient-to-br from-primary-950/50 to-surface-100 p-12 text-center overflow-hidden"
        >
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-radial from-primary-500/5 to-transparent" />

          <m.p variants={fadeInUp} className="mb-4 text-sm font-medium tracking-wider uppercase text-primary-400">
            Ready to Partner with BioVeda Hub?
          </m.p>
          <m.h2 variants={fadeInUp} className="mb-5 font-display text-4xl font-bold text-text md:text-5xl">
            Start Your Bulk Enquiry Today
          </m.h2>
          <m.p variants={fadeInUp} className="mb-8 text-text-muted max-w-xl mx-auto">
            Get pharmaceutical-grade Ayurvedic and herbal extracts with complete documentation.
            COA, MSDS, and regulatory compliance support included.
          </m.p>
          <m.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" size="lg" onClick={() => open()}>
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Button>
            <a
              href="mailto:sales@biovedahub.com"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              sales@biovedahub.com
            </a>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
