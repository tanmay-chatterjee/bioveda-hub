import type { Metadata } from 'next';
import { Leaf, FlaskConical, Globe, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About BioVeda Hub | Trusted Ayurvedic Extract Supplier',
  description:
    'Learn about BioVeda Hub — India\'s trusted B2B wholesale supplier of pharmaceutical-grade Ayurvedic and herbal botanical extracts. Our mission, certifications, and commitment to quality.',
};

const milestones = [
  { year: '2008', title: 'Founded', description: 'BioVeda Hub established as a specialist in Ayurvedic botanical raw materials.' },
  { year: '2012', title: 'ISO Certified', description: 'Achieved ISO 9001:2015 certification across all manufacturing partners.' },
  { year: '2016', title: 'GMP Compliance', description: 'Full WHO-GMP compliance for pharmaceutical-grade extract production.' },
  { year: '2020', title: 'Global Expansion', description: 'Expanded distribution to 30+ countries across Europe, North America, and Southeast Asia.' },
  { year: '2024', title: '200+ Partners', description: 'Supplying 200+ pharmaceutical, nutraceutical, and cosmetic companies worldwide.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <div className="mb-20 text-center">
          <p className="mb-3 text-sm font-medium tracking-wider uppercase text-primary-400">Our Story</p>
          <h1 className="mb-6 font-display text-4xl font-bold text-text md:text-6xl">
            Bridging Ancient Wisdom <br className="hidden md:block" />
            with Modern Science
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-text-muted leading-relaxed">
            BioVeda Hub was founded with a singular mission: to make India&apos;s extraordinary
            botanical heritage accessible to the global pharmaceutical and wellness industry —
            with uncompromising quality, complete transparency, and reliable supply.
          </p>
        </div>

        {/* Values */}
        <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            { icon: Leaf, title: 'Sustainable Sourcing', text: 'We partner exclusively with certified organic farms committed to sustainable agricultural practices and fair trade.', color: 'text-primary-400', bg: 'bg-primary-500/10' },
            { icon: FlaskConical, title: 'Scientific Rigour', text: 'Every extract is standardized using HPLC and TLC testing. We maintain pharma-grade quality standards at every step.', color: 'text-accent-400', bg: 'bg-accent-500/10' },
            { icon: Users, title: 'Client Partnerships', text: 'We don\'t just supply raw materials — we act as technical partners helping clients formulate and scale their products.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { icon: Globe, title: 'Global Reach', text: 'Our logistics network spans 30+ countries with temperature-controlled shipping and complete export documentation.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
          ].map((v) => (
            <div key={v.title} className="rounded-2xl border border-surface-300 bg-surface-100 p-6">
              <div className={`mb-4 inline-flex rounded-xl p-3 ${v.bg}`}>
                <v.icon className={`h-6 w-6 ${v.color}`} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-text">{v.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div>
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-text">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 to-transparent md:left-1/2" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="pl-10 md:w-1/2 md:pl-0 md:pr-10">
                    <div className={`rounded-xl border border-surface-300 bg-surface-100 p-5 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                      <span className="text-sm font-bold text-primary-400">{m.year}</span>
                      <h3 className="mt-1 font-semibold text-text">{m.title}</h3>
                      <p className="mt-1 text-sm text-text-muted">{m.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 top-5 h-3 w-3 -translate-x-1/2 rounded-full bg-primary-500 md:left-1/2" />
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
