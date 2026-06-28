// ─── Sanity document types ───────────────────────────────────────────────────

export interface SanityImage {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
}

export interface SanityFile {
  _type: 'file';
  asset: { _ref: string; _type: 'reference' };
}

export interface PortableTextBlock {
  _key: string;
  _type: string;
  children?: Array<{ _key: string; _type: string; marks?: string[]; text: string }>;
  markDefs?: Array<{ _key: string; _type: string; href?: string }>;
  style?: string;
}

export interface FAQ {
  _key: string;
  question: string;
  answer: string;
}

export interface Certification {
  _id: string;
  _type: 'certification';
  name: string;
  slug: { current: string };
  issuingBody?: string;
  certNumber?: string;
  validFrom?: string;
  validUntil?: string;
  description?: string;
  icon?: SanityImage;
  document?: SanityFile;
  featured: boolean;
  order?: number;
}

export interface Testimonial {
  _id: string;
  _type: 'testimonial';
  companyName: string;
  contactName: string;
  designation?: string;
  industry?: string;
  quote: string;
  rating?: number;
  logo?: SanityImage;
  avatar?: SanityImage;
  featured: boolean;
  order?: number;
}

export interface Product {
  _id: string;
  _type: 'product';
  name: string;
  slug: { current: string };
  botanicalName?: string;
  sku?: string;
  category?: string;
  industries?: string[];
  form?: string[];
  activeCompound?: string;
  standardization?: string;
  meshSize?: string;
  solubility?: string;
  shelfLife?: string;
  storageConditions?: string;
  moq?: string;
  packagingOptions?: string[];
  shortDescription?: string;
  description?: PortableTextBlock[];
  healthBenefits?: string[];
  applications?: string[];
  faq?: FAQ[];
  heroImage?: SanityImage;
  gallery?: SanityImage[];
  coaDocument?: SanityFile;
  relatedProducts?: Product[];
  certifications?: Certification[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  featured: boolean;
  status: 'Active' | 'Coming Soon' | 'Discontinued';
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ─── Filter state ─────────────────────────────────────────────────────────────

export interface ProductFilters {
  category?: string;
  industry?: string;
  form?: string;
  search?: string;
}

// ─── Enquiry form ─────────────────────────────────────────────────────────────

export interface EnquiryFormData {
  contactName: string;
  companyName: string;
  email: string;
  phone?: string;
  country?: string;
  companyType?: string;
  companyWebsite?: string;
  productSlugs?: string[];
  productNames?: string[];
  customRequirement?: string;
  estimatedVolume?: string;
  frequency?: string;
  requiresCoa?: boolean;
  requiresSample?: boolean;
  complianceNeeds?: string[];
  message?: string;
  sourcePage?: string;
}

export interface EnquiryInsert {
  contact_name: string;
  company_name: string;
  email: string;
  phone?: string;
  country?: string;
  company_type?: string;
  company_website?: string;
  product_slugs?: string[];
  product_names?: string[];
  custom_requirement?: string;
  estimated_volume?: string;
  frequency?: string;
  requires_coa?: boolean;
  requires_sample?: boolean;
  compliance_needs?: string[];
  message?: string;
  source?: string;
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}
