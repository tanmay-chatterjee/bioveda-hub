import type { Metadata } from 'next';
import Script from 'next/script';
import { HeroSection } from '@/components/sections/HeroSection';
import { IngredientsShowcase } from '@/components/sections/IngredientsShowcase';
import { WhyBioVeda } from '@/components/sections/WhyBioVeda';
import { TrustSignals } from '@/components/sections/TrustSignals';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { sanityFetch } from '@/lib/sanity';
import { FEATURED_PRODUCTS_QUERY, CERTIFICATIONS_QUERY, TESTIMONIALS_QUERY } from '@/lib/sanity.queries';
import type { Product, Certification, Testimonial } from '@/types';

export const metadata: Metadata = {
  title: 'BioVeda Hub — Premium Ayurvedic & Herbal Extracts | Wholesale Raw Materials',
  description:
    'India\'s #1 B2B wholesale supplier of pharmaceutical-grade Ayurvedic and herbal extracts. Organic, GMP & ISO certified. Turmeric, Neem, Ashwagandha & 50+ more. Bulk enquiries welcome.',
  openGraph: {
    title: 'BioVeda Hub — Premium Ayurvedic & Herbal Extracts',
    description: 'Wholesale Ayurvedic raw materials for pharmaceutical, nutraceutical & cosmetic industries.',
    type: 'website',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BioVeda Hub',
  url: 'https://www.biovedahub.com',
  logo: 'https://www.biovedahub.com/logo.svg',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-98XXX-XXXXX',
    contactType: 'Sales',
    email: 'sales@biovedahub.com',
    areaServed: 'Worldwide',
    availableLanguage: ['English', 'Hindi'],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://linkedin.com/company/bioveda-hub',
    'https://twitter.com/biovedahub',
  ],
  description:
    'BioVeda Hub is a premium B2B wholesale supplier of pharmaceutical-grade Ayurvedic and herbal botanical extracts.',
};

export default async function HomePage() {
  const [products, certifications, testimonials] = await Promise.all([
    sanityFetch<Product[]>({
      query: FEATURED_PRODUCTS_QUERY,
      tags: ['products'],
    }).catch(() => [] as Product[]),
    sanityFetch<Certification[]>({
      query: CERTIFICATIONS_QUERY,
      tags: ['certifications'],
    }).catch(() => [] as Certification[]),
    sanityFetch<Testimonial[]>({
      query: TESTIMONIALS_QUERY,
      tags: ['testimonials'],
    }).catch(() => [] as Testimonial[]),
  ]);

  return (
    <>
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      <HeroSection />
      <IngredientsShowcase products={products} />
      <WhyBioVeda />
      <TrustSignals certifications={certifications} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </>
  );
}
