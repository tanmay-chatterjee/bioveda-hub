'use client';

import { ArrowRight, ShieldCheck, Award, Globe, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/components/providers/ModalContext';

const stats = [
  { icon: ShieldCheck, value: 'GMP & ISO', label: 'Certified' },
  { icon: Award, value: '50+ Extracts', label: 'Product Range' },
  { icon: Globe, value: '200+ Clients', label: 'B2B Partners' },
];

// Featured ingredient preview strip
const ingredients = [
  { name: 'Turmeric', img: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=120&h=120&fit=crop&q=80' },
  { name: 'Ashwagandha', img: 'https://images.pexels.com/photos/10902685/pexels-photo-10902685.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop' },
  { name: 'Neem', img: 'https://images.pexels.com/photos/16061011/pexels-photo-16061011.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop' },
  { name: 'Moringa', img: 'https://images.pexels.com/photos/33500190/pexels-photo-33500190.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop' },
  { name: 'Aloe Vera', img: 'https://images.pexels.com/photos/7408838/pexels-photo-7408838.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop' },
  { name: 'Green Tea', img: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=120&h=120&fit=crop&q=80' },
];

export function HeroSection() {
  const { open } = useModal();

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Full-bleed background image ───────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1920&h=1080&fit=crop&q=85"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        {/* Warm gradient overlay — left-heavy so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/80 to-surface/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/30 via-transparent to-surface/60" />
      </div>

      {/* ── Decorative mandala/lotus watermark behind text ─────────────── */}
      <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center opacity-[0.06]" aria-hidden="true">
        <svg viewBox="0 0 500 500" className="h-[600px] w-[600px] md:h-[750px] md:w-[750px] translate-x-[10%] -translate-y-[5%]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mandala rings */}
          <circle cx="250" cy="250" r="240" stroke="#92400e" strokeWidth="0.8" />
          <circle cx="250" cy="250" r="200" stroke="#92400e" strokeWidth="0.5" />
          <circle cx="250" cy="250" r="160" stroke="#92400e" strokeWidth="0.4" />
          {/* Petal pattern */}
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse
              key={i}
              cx="250" cy="120"
              rx="18" ry="70"
              fill="#92400e"
              transform={`rotate(${i * 30} 250 250)`}
              opacity="0.6"
            />
          ))}
          {/* Inner petals */}
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={`inner-${i}`}
              cx="250" cy="170"
              rx="12" ry="45"
              fill="#d97706"
              transform={`rotate(${i * 45} 250 250)`}
              opacity="0.4"
            />
          ))}
          {/* Center */}
          <circle cx="250" cy="250" r="25" fill="#d97706" opacity="0.5" />
          <circle cx="250" cy="250" r="12" fill="#92400e" opacity="0.6" />
        </svg>
      </div>

      {/* ── Main content ──────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col items-start justify-center mx-auto max-w-7xl w-full px-6 pt-28 pb-10">
        <div className="max-w-2xl">

          {/* Top badge */}
          <div className="mb-5 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <span className="herb-badge">
              <Leaf className="h-3 w-3" />
              India&apos;s Premier Ayurvedic Extract Supplier
            </span>
          </div>

          {/* Headline */}
          <h1
            className="mb-5 font-display text-5xl font-bold leading-tight tracking-tight text-text md:text-6xl lg:text-7xl animate-fade-in"
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            From Ancient{' '}
            <span className="text-gradient-saffron">Wisdom</span>
            <br />
            to Modern{' '}
            <span className="text-gradient-herb">Wellness</span>
          </h1>

          {/* Sub-headline */}
          <p
            className="mb-8 text-lg text-text-muted leading-relaxed max-w-xl animate-fade-in"
            style={{ animationDelay: '0.35s', animationFillMode: 'both' }}
          >
            India&apos;s trusted B2B wholesale supplier of pharmaceutical-grade Ayurvedic
            and herbal botanical extracts. Pure, certified, and ready for your formulations.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center gap-4 mb-12 animate-fade-in"
            style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
          >
            <Button variant="primary" size="lg" onClick={() => open()} className="shadow-saffron">
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
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-8 animate-fade-in"
            style={{ animationDelay: '0.65s', animationFillMode: 'both' }}
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary-500" />
                  <span className="text-xl font-bold text-text">{value}</span>
                </div>
                <span className="text-sm text-text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Ingredient strip ──────────────────────────────────────────── */}
      <div className="relative z-10 bg-white/70 backdrop-blur-sm border-t border-surface-200">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-none">
            <span className="text-xs font-semibold text-text-dim uppercase tracking-wider whitespace-nowrap flex-shrink-0">
              Key Extracts
            </span>
            <div className="flex gap-5">
              {ingredients.map((herb) => (
                <button
                  key={herb.name}
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex flex-col items-center gap-2 group flex-shrink-0"
                >
                  <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-surface-200 group-hover:border-primary-400 transition-colors shadow-warm-sm">
                    <img
                      src={herb.img}
                      alt={herb.name}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-xs text-text-muted group-hover:text-primary-600 transition-colors">{herb.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
