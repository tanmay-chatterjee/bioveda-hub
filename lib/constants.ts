import type { NavItem } from '@/types';

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/bioveda-hub',
  twitter: 'https://twitter.com/biovedahub',
  email: 'mailto:sales@biovedahub.com',
  whatsapp: 'https://wa.me/91XXXXXXXXXX',
};

export const COMPANY_INFO = {
  name: 'BioVeda Hub',
  tagline: 'Pharmaceutical-Grade Ayurvedic & Herbal Extracts',
  email: 'sales@biovedahub.com',
  phone: '+91 98XXX XXXXX',
  address: 'Mumbai, Maharashtra, India',
  gst: 'XXXXXXXXXXXX',
  website: 'https://www.biovedahub.com',
};

export const PRODUCT_CATEGORIES = [
  'All',
  'Adaptogens',
  'Antioxidants',
  'Anti-inflammatory',
  'Digestive',
  'Immunity',
  'Skin & Hair',
  'General Wellness',
] as const;

export const INDUSTRIES = [
  'All',
  'Pharmaceutical',
  'Nutraceutical',
  'Cosmetic',
  'Food & Beverage',
  'Veterinary',
] as const;

export const EXTRACT_FORMS = [
  'All',
  'Powder',
  'Liquid Extract',
  'Oleoresin',
  'Essential Oil',
  'Granules',
  'Capsule-ready',
] as const;

export const COMPLIANCE_OPTIONS = [
  { label: 'GMP Certified', value: 'GMP' },
  { label: 'ISO 9001:2015', value: 'ISO' },
  { label: 'FSSAI Approved', value: 'FSSAI' },
  { label: 'Organic Certified', value: 'Organic' },
  { label: 'Halal Certified', value: 'Halal' },
  { label: 'Kosher Certified', value: 'Kosher' },
  { label: 'COA Required', value: 'COA' },
];

export const VOLUME_OPTIONS = [
  '< 25 kg',
  '25–100 kg',
  '100–500 kg',
  '500 kg – 1 MT',
  '1–5 MT',
  '5+ MT',
];
