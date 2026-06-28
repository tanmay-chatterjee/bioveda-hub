// ─── GROQ queries ─────────────────────────────────────────────────────────────

export const PRODUCTS_QUERY = `
  *[_type == "product" && status == "Active"] | order(featured desc, name asc) {
    _id,
    name,
    slug,
    botanicalName,
    category,
    industries,
    form,
    activeCompound,
    standardization,
    shortDescription,
    heroImage { asset, hotspot, alt },
    featured,
    status
  }
`;

export const FEATURED_PRODUCTS_QUERY = `
  *[_type == "product" && featured == true && status == "Active"] | order(name asc) [0...6] {
    _id,
    name,
    slug,
    botanicalName,
    category,
    industries,
    form,
    activeCompound,
    standardization,
    shortDescription,
    heroImage { asset, hotspot, alt },
    featured,
    status
  }
`;

export const PRODUCT_SLUGS_QUERY = `
  *[_type == "product" && status == "Active"] {
    "slug": slug.current
  }
`;

export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    botanicalName,
    sku,
    category,
    industries,
    form,
    activeCompound,
    standardization,
    meshSize,
    solubility,
    shelfLife,
    storageConditions,
    moq,
    packagingOptions,
    shortDescription,
    description,
    healthBenefits,
    applications,
    faq,
    heroImage { asset, hotspot, alt },
    gallery[] { asset, hotspot, alt },
    coaDocument { asset },
    relatedProducts[]-> {
      _id, name, slug, category, shortDescription, heroImage { asset, hotspot, alt }, standardization
    },
    certifications[]-> { _id, name, issuingBody, icon { asset, hotspot } },
    seoTitle,
    seoDescription,
    seoKeywords,
    featured,
    status
  }
`;

export const CERTIFICATIONS_QUERY = `
  *[_type == "certification"] | order(order asc) {
    _id,
    name,
    slug,
    issuingBody,
    certNumber,
    validFrom,
    validUntil,
    description,
    icon { asset, hotspot },
    featured
  }
`;

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && featured == true] | order(order asc) [0...6] {
    _id,
    companyName,
    contactName,
    designation,
    industry,
    quote,
    rating,
    logo { asset, hotspot },
    avatar { asset, hotspot }
  }
`;
