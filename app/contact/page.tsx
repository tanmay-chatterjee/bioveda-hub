import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/sections/ContactForm';
import { COMPANY_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Request a Quote | Herbal Extract Enquiries',
  description:
    "Get pricing for bulk Ayurvedic and herbal extracts. BioVeda Hub responds within 24 business hours. GMP certified wholesale raw materials.",
  keywords: [
    'herbal extract enquiries', 'wholesale pricing', 'ayurvedic extract quote',
    'bulk herbal ingredients', 'organic extract supplier',
  ],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium tracking-wider uppercase text-primary-400">
            Get In Touch
          </p>
          <h1 className="mb-4 font-display text-4xl font-bold text-text md:text-5xl">
            Request a Quote
          </h1>
          <p className="mx-auto max-w-xl text-text-muted">
            Fill in your requirements and our team will respond with pricing,
            specifications, and samples within 24 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Contact info — static, no client JS needed */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-surface-300 bg-surface-100 p-6">
              <h3 className="mb-5 font-semibold text-text">Contact Information</h3>
              <div className="space-y-4">
                <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-start gap-3 group">
                  <div className="mt-0.5 rounded-lg bg-primary-500/10 p-2">
                    <Mail className="h-4 w-4 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-xs text-text-dim">Email</p>
                    <p className="text-sm text-text group-hover:text-primary-400 transition-colors">
                      {COMPANY_INFO.email}
                    </p>
                  </div>
                </a>
                <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-start gap-3 group">
                  <div className="mt-0.5 rounded-lg bg-primary-500/10 p-2">
                    <Phone className="h-4 w-4 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-xs text-text-dim">Phone</p>
                    <p className="text-sm text-text group-hover:text-primary-400 transition-colors">
                      {COMPANY_INFO.phone}
                    </p>
                  </div>
                </a>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary-500/10 p-2">
                    <MapPin className="h-4 w-4 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-xs text-text-dim">Location</p>
                    <p className="text-sm text-text">{COMPANY_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary-500/10 p-2">
                    <Clock className="h-4 w-4 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-xs text-text-dim">Business Hours</p>
                    <p className="text-sm text-text">Mon–Sat, 9 AM – 6 PM IST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form — client component */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
