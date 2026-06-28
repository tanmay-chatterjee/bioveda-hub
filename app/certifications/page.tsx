import type { Metadata } from 'next';
import { ShieldCheck, Award, CheckCircle } from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { CERTIFICATIONS_QUERY } from '@/lib/sanity.queries';
import type { Certification } from '@/types';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'GMP ISO COA Certified | Quality Assurance',
  description:
    'BioVeda Hub maintains GMP, ISO 9001:2015, FSSAI, and AYUSH certifications. Full COA documentation provided with every batch. Audit-ready quality standards.',
};

export default async function CertificationsPage() {
  const certifications = await sanityFetch<Certification[]>({
    query: CERTIFICATIONS_QUERY,
    tags: ['certifications'],
    revalidate: 86400,
  }).catch(() => [] as Certification[]);

  const defaultCerts = [
    { name: 'WHO-GMP', body: 'World Health Organization', desc: 'Good Manufacturing Practice certification ensuring consistent, controlled production of pharmaceutical-grade extracts.' },
    { name: 'ISO 9001:2015', body: 'International Organization for Standardization', desc: 'Quality management system certification demonstrating our commitment to process excellence and client satisfaction.' },
    { name: 'FSSAI', body: 'Food Safety and Standards Authority of India', desc: 'License for food-grade herbal extracts and nutraceutical ingredients.' },
    { name: 'AYUSH', body: 'Ministry of AYUSH, Government of India', desc: 'Approval for Ayurvedic, Yoga, Unani, Siddha, and Homeopathy product standards compliance.' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 botanical-bg">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-16 text-center">
          <span className="herb-badge mb-4 inline-flex">Quality Assurance</span>
          <h1 className="mt-4 mb-4 font-display text-4xl font-bold text-text md:text-5xl">
            Certified Quality at <span className="text-gradient-saffron">Every Step</span>
          </h1>
          <p className="mx-auto max-w-2xl text-text-muted">
            Our stringent quality standards and international certifications ensure every batch
            of Ayurvedic and herbal extract meets pharmaceutical-grade requirements.
          </p>
        </div>

        {/* Certifications grid */}
        <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {defaultCerts.map((cert) => (
            <div key={cert.name} className="warm-card p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-accent-500/10 p-3">
                  <ShieldCheck className="h-5 w-5 text-accent-600" />
                </div>
                <div>
                  <h3 className="font-bold text-text">{cert.name}</h3>
                  <p className="text-xs text-text-dim">{cert.body}</p>
                </div>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">{cert.desc}</p>
            </div>
          ))}
        </div>

        {/* Quality promise */}
        <div className="rounded-2xl border border-primary-300/40 bg-primary-50 p-10 text-center shadow-warm-md">
          <Award className="mx-auto h-12 w-12 text-primary-500 mb-5" />
          <h2 className="mb-4 font-display text-3xl font-bold text-text">Our Quality Promise</h2>
          <p className="mx-auto max-w-xl text-text-muted mb-8">
            Every order includes: Certificate of Analysis (COA), Material Safety Data Sheet (MSDS),
            Technical Data Sheet (TDS), and origin documentation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['HPLC Tested', 'TLC Verified', 'Heavy Metal Free', 'Pesticide Free', 'Microbial Tested', 'COA Provided'].map((q) => (
              <div key={q} className="flex items-center gap-1.5 rounded-full border border-accent-300/50 bg-white px-4 py-1.5 shadow-warm-sm">
                <CheckCircle className="h-3.5 w-3.5 text-accent-500" />
                <span className="text-xs font-medium text-accent-700">{q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
