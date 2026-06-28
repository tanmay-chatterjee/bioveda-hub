import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'companyName', title: 'Company Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'contactName', title: 'Contact Person', type: 'string' }),
    defineField({ name: 'designation', title: 'Designation', type: 'string' }),
    defineField({
      name: 'industry', title: 'Industry', type: 'string',
      options: { list: ['Pharmaceutical', 'Nutraceutical', 'Cosmetic', 'Food & Beverage'] },
    }),
    defineField({ name: 'quote', title: 'Testimonial Quote', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: 'rating', title: 'Rating (1–5)', type: 'number', validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: 'logo', title: 'Company Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'avatar', title: 'Person Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: { select: { title: 'companyName', subtitle: 'contactName' } },
});
