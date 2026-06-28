import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Leaf } from 'lucide-react';
import { COMPANY_INFO, NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-surface-100 botanical-bg">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary-500 flex items-center justify-center shadow-saffron">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-text">
                BioVeda<span className="text-primary-500"> Hub</span>
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs mb-2">
              India&apos;s premier B2B wholesale supplier of pharmaceutical-grade Ayurvedic and
              herbal botanical extracts. GMP &amp; ISO certified. Trusted by 200+ global partners.
            </p>
            <p className="text-xs text-text-dim mb-6 italic">
              Rooted in Ayurveda. Refined for the modern world.
            </p>
            <div className="space-y-2.5">
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-2 text-sm text-text-muted hover:text-primary-600 transition-colors">
                <Mail className="h-4 w-4 text-primary-500" /> {COMPANY_INFO.email}
              </a>
              <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-2 text-sm text-text-muted hover:text-primary-600 transition-colors">
                <Phone className="h-4 w-4 text-primary-500" /> {COMPANY_INFO.phone}
              </a>
              <span className="flex items-center gap-2 text-sm text-text-muted">
                <MapPin className="h-4 w-4 text-primary-500" /> {COMPANY_INFO.address}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-xs font-semibold text-text-dim uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-muted hover:text-primary-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-5 text-xs font-semibold text-text-dim uppercase tracking-wider">Key Extracts</h3>
            <ul className="space-y-2.5">
              {['Turmeric (Curcumin)', 'Ashwagandha', 'Neem Extract', 'Aloe Vera', 'Green Tea', 'Moringa'].map((p) => (
                <li key={p}>
                  <Link href="/products" className="text-sm text-text-muted hover:text-primary-600 transition-colors">
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-surface-200 pt-8 md:flex-row">
          <p className="text-xs text-text-dim">
            © {new Date().getFullYear()} BioVeda Hub. All rights reserved. &nbsp;·&nbsp; Ayurvedic &amp; Herbal Extracts &nbsp;·&nbsp; Wholesale Raw Materials
          </p>
          <div className="flex items-center gap-4">
            <a href={SOCIAL_LINKS.linkedin} className="text-text-dim hover:text-primary-600 transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={SOCIAL_LINKS.twitter} className="text-text-dim hover:text-primary-600 transition-colors" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
