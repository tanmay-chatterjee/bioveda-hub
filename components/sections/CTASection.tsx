'use client';

import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/components/providers/ModalContext';

export function CTASection() {
  const { open } = useModal();

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="relative rounded-3xl overflow-hidden shadow-warm-lg">
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=1200&h=500&fit=crop&q=80"
            alt="Ayurvedic herbs background"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800/90 via-primary-700/85 to-accent-800/80" />

          <div className="relative z-10 p-12 md:p-16 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 uppercase tracking-wider mb-6">
              Ready to Partner with BioVeda Hub?
            </span>
            <h2 className="mb-5 font-display text-4xl font-bold text-white md:text-5xl">
              Start Your Bulk Enquiry Today
            </h2>
            <p className="mb-8 text-white/80 max-w-xl mx-auto text-lg">
              Get pharmaceutical-grade Ayurvedic and herbal extracts with complete documentation.
              COA, MSDS, and regulatory compliance support included.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="accent"
                size="lg"
                onClick={() => open()}
                className="bg-white text-primary-700 hover:bg-surface shadow-warm-md"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Button>
              <a
                href="mailto:sales@biovedahub.com"
                className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                sales@biovedahub.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
