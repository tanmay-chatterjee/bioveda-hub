import { defineField, defineType } from 'sanity';

export const certification = defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Certification Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'issuingBody', title: 'Issuing Body', type: 'string' }),
    defineField({ name: 'certNumber', title: 'Certificate Number', type: 'string' }),
    defineField({ name: 'validFrom', title: 'Valid From', type: 'date' }),
    defineField({ name: 'validUntil', title: 'Valid Until', type: 'date' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'icon', title: 'Icon / Badge', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'document', title: 'Certificate PDF', type: 'file' }),
    defineField({ name: 'featured', title: 'Show on Homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: { select: { title: 'name', subtitle: 'issuingBody' } },
});
