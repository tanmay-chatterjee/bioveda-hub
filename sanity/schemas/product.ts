import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Product Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 100 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'botanicalName', title: 'Botanical Name', type: 'string', description: 'e.g., Curcuma longa' }),
    defineField({ name: 'sku', title: 'Product Code / SKU', type: 'string' }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['Adaptogens', 'Antioxidants', 'Anti-inflammatory', 'Digestive', 'Immunity', 'Skin & Hair', 'General Wellness'] },
    }),
    defineField({
      name: 'industries', title: 'Target Industries', type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['Pharmaceutical', 'Nutraceutical', 'Cosmetic', 'Food & Beverage', 'Veterinary'] },
    }),
    defineField({
      name: 'form', title: 'Available Forms', type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['Powder', 'Liquid Extract', 'Oleoresin', 'Essential Oil', 'Granules', 'Capsule-ready'] },
    }),
    defineField({ name: 'activeCompound', title: 'Active Compound', type: 'string', description: 'e.g., Curcuminoids' }),
    defineField({ name: 'standardization', title: 'Standardization', type: 'string', description: 'e.g., 95% Curcuminoids by HPLC' }),
    defineField({ name: 'meshSize', title: 'Mesh Size', type: 'string' }),
    defineField({ name: 'solubility', title: 'Solubility', type: 'string' }),
    defineField({ name: 'shelfLife', title: 'Shelf Life', type: 'string', description: 'e.g., 24 months from date of manufacture' }),
    defineField({ name: 'storageConditions', title: 'Storage Conditions', type: 'string' }),
    defineField({ name: 'moq', title: 'Minimum Order Quantity', type: 'string', description: 'e.g., 25 kg' }),
    defineField({ name: 'packagingOptions', title: 'Packaging Options', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'description', title: 'Full Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'healthBenefits', title: 'Health Benefits', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'applications', title: 'Applications / Use Cases', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'faq', title: 'FAQ', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Question', type: 'string' },
          { name: 'answer', title: 'Answer', type: 'text' },
        ],
      }],
    }),
    defineField({
      name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
    }),
    defineField({ name: 'gallery', title: 'Gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'coaDocument', title: 'COA Document (PDF)', type: 'file' }),
    defineField({
      name: 'relatedProducts', title: 'Related Products', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'certifications', title: 'Certifications', type: 'array',
      of: [{ type: 'reference', to: [{ type: 'certification' }] }],
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title Override', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Meta Description', type: 'text', rows: 3 }),
    defineField({ name: 'seoKeywords', title: 'SEO Keywords', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
    defineField({
      name: 'status', title: 'Status', type: 'string',
      options: { list: ['Active', 'Coming Soon', 'Discontinued'], layout: 'radio' },
      initialValue: 'Active',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'heroImage' },
  },
});
