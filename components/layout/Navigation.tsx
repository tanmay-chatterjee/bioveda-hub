'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/components/providers/ModalContext';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollDirection = useScrollDirection();
  const { open } = useModal();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const hidden = scrollDirection === 'down' && scrolled;

  return (
    <m.header
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 inset-x-0 z-30 transition-all duration-300',
        scrolled
          ? 'bg-surface/90 backdrop-blur-xl border-b border-surface-200 shadow-warm-sm'
          : 'bg-surface/70 backdrop-blur-sm'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-8 w-8 rounded-lg bg-primary-500 flex items-center justify-center shadow-saffron">
            <Leaf className="h-4 w-4 text-white" />
          </div>
          <span className="font-display font-bold text-lg text-text">
            BioVeda<span className="text-primary-500"> Hub</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-primary-600 bg-primary-500/10'
                  : 'text-text-muted hover:text-text hover:bg-surface-200'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="primary" size="sm" onClick={() => open()}>
            Get a Quote
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden rounded-lg p-2 text-text-muted hover:text-text hover:bg-surface-200 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <m.div
        initial={{ height: 0, opacity: 0 }}
        animate={mobileOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden md:hidden bg-surface/95 backdrop-blur-xl border-b border-surface-200"
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'px-3 py-2.5 rounded-lg text-sm font-medium',
                pathname === link.href
                  ? 'text-primary-600 bg-primary-500/10'
                  : 'text-text-muted hover:text-text hover:bg-surface-200'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-surface-200">
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={() => { setMobileOpen(false); open(); }}
            >
              Get a Quote
            </Button>
          </div>
        </div>
      </m.div>
    </m.header>
  );
}
