import { z } from 'zod';

export const enquirySchema = z.object({
  contactName: z.string().min(2, 'Name must be at least 2 characters'),
  companyName: z.string().min(2, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  country: z.string().optional(),
  companyType: z.string().optional(),
  companyWebsite: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  productSlugs: z.array(z.string()).optional().default([]),
  productNames: z.array(z.string()).optional().default([]),
  customRequirement: z.string().optional(),
  estimatedVolume: z.string().optional(),
  frequency: z.string().optional(),
  requiresCoa: z.boolean().optional().default(false),
  requiresSample: z.boolean().optional().default(false),
  complianceNeeds: z.array(z.string()).optional().default([]),
  message: z.string().optional(),
  sourcePage: z.string().optional(),
});

export type EnquirySchema = z.infer<typeof enquirySchema>;
