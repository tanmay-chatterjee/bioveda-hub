'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, FlaskConical, Filter, X, ArrowRight, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/components/providers/ModalContext';
import {
  CATALOG_PRODUCTS,
  getCatalogCategories,
  filterCatalog,
  type CatalogCategory,
} from '@/lib/catalog-data';

const CATEGORY_COLORS: Record<string, string> = {
  'Herbal Extracts':           'bg-primary-100 text-primary-700',
  'Ayurvedic Botanicals':      'bg-terra-100 text-terra-600',
  'Amino Acids':               'bg-blue-100 text-blue-700',
  'Essential Oils':            'bg-accent-100 text-accent-700',
  'Pharmaceutical Excipients': 'bg-amber-100 text-amber-700',
  'Pharmaceutical APIs':       'bg-red-100 text-red-700',
  'Flavours & Fragrances':     'bg-pink-100 text-pink-700',
  'Nutraceuticals':            'bg-green-100 text-green-700',
};

const CATEGORY_ICONS: Record<string, string> = {
  'Herbal Extracts':           '🌿',
  'Ayurvedic Botanicals':      '🌱',
  'Amino Acids':               '⚗️',
  'Essential Oils':            '💧',
  'Pharmaceutical Excipients': '🧪',
  'Pharmaceutical APIs':       '💊',
  'Flavours & Fragrances':     '🌸',
  'Nutraceuticals':            '✨',
};

export function ProductCatalog() {
  const { open } = useModal();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => ['All', ...getCatalogCategories()], []);

  const filtered = useMemo(
    () => filterCatalog(CATALOG_PRODUCTS, activeCategory, search),
    [activeCategory, search],
  );

  const featured = useMemo(
    () => CATALOG_PRODUCTS.filter((p) => p.featured),
    [],
  );

  const hasFilters = search.trim().length > 0 || activeCategory !== 'All';

  function clearFilters() {
    setSearch('');
    setActiveCategory('All');
  }

  return (
    <div>
      {/* ── Search & filter bar ───────────────────────────────────────────── */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search extracts, botanicals, amino acids…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-surface-300 bg-surface-100 py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter toggle on mobile */}
        <button
          className="flex items-center gap-2 rounded-xl border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm text-text-muted hover:border-primary-400 hover:text-text transition-colors sm:hidden"
          onClick={() => setShowFilters((v) => !v)}
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeCategory !== 'All' && (
            <span className="ml-1 rounded-full bg-primary-500 px-1.5 py-0.5 text-xs text-white leading-none">1</span>
          )}
        </button>

        {/* Results count */}
        <span className="hidden sm:block text-sm text-text-muted whitespace-nowrap">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          {hasFilters && (
            <button onClick={clearFilters} className="ml-2 text-primary-500 hover:text-primary-400 underline underline-offset-2">
              Clear
            </button>
          )}
        </span>
      </div>

      {/* ── Category pills ───────────────────────────────────────────────── */}
      <div className={`mb-8 ${showFilters ? 'block' : 'hidden sm:block'}`}>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = cat === activeCategory;
            const icon = CATEGORY_ICONS[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'border-primary-500 bg-primary-500 text-white shadow-sm shadow-primary-500/30'
                    : 'border-surface-300 bg-surface-100 text-text-muted hover:border-primary-400 hover:text-text'
                }`}
              >
                {icon && <span className="mr-1">{icon}</span>}
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Featured strip (shown when no filters active) ──────────────── */}
      {!hasFilters && (
        <div className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted flex items-center gap-2">
            <span className="text-amber-400">★</span> Featured Products
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <div
                key={p.id}
                className="warm-card overflow-hidden group hover:-translate-y-1 transition-transform duration-300 ring-1 ring-primary-500/20"
              >
                <div className="relative h-44 overflow-hidden">
                  {p.img ? (
                    <img
                      src={p.img}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary-950 to-surface-200">
                      <Leaf className="h-10 w-10 text-primary-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-2 right-2 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-semibold text-black">
                    Featured
                  </span>
                </div>
                <div className="p-4">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium mb-2 ${CATEGORY_COLORS[p.category] ?? 'bg-surface-200 text-text-muted'}`}>
                    {p.category}
                  </span>
                  <h3 className="text-sm font-semibold text-text mb-1 leading-snug">{p.name}</h3>
                  {p.standardization && (
                    <div className="flex items-center gap-1 mb-2">
                      <FlaskConical className="h-3 w-3 text-primary-500 flex-shrink-0" />
                      <span className="text-xs text-primary-500 font-medium truncate">{p.standardization}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-surface-200 pt-3 mt-2">
                    {p.moq && <span className="text-xs text-text-dim">MOQ: <span className="font-medium text-text">{p.moq}</span></span>}
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => open({ productSlug: p.slug, productName: p.name })}
                    >
                      Quote
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Full grid ────────────────────────────────────────────────────── */}
      <div>
        {hasFilters && (
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
              {filtered.length} Result{filtered.length !== 1 ? 's' : ''}
            </h2>
            <button onClick={clearFilters} className="text-sm text-primary-500 hover:text-primary-400 underline underline-offset-2">
              Clear filters
            </button>
          </div>
        )}
        {!hasFilters && (
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
            Full Catalog — {filtered.length} Products
          </h2>
        )}

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-surface-300 bg-surface-100 p-12 text-center">
            <Search className="mx-auto mb-3 h-8 w-8 text-text-dim" />
            <p className="text-text-muted mb-2">No products matched your search.</p>
            <button onClick={clearFilters} className="text-sm text-primary-500 hover:text-primary-400 underline underline-offset-2">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="warm-card overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  {p.img ? (
                    <img
                      src={p.img}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary-950 to-surface-200">
                      <Leaf className="h-10 w-10 text-primary-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span
                    className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                      CATEGORY_COLORS[p.category] ?? 'bg-surface-200 text-text-muted'
                    }`}
                  >
                    {CATEGORY_ICONS[p.category]} {p.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-text mb-0.5 leading-snug">{p.name}</h3>
                  {p.botanicalName && (
                    <p className="text-xs italic text-text-dim mb-1">{p.botanicalName}</p>
                  )}
                  {p.standardization && (
                    <div className="flex items-center gap-1 mb-2">
                      <FlaskConical className="h-3 w-3 text-primary-500 flex-shrink-0" />
                      <span className="text-xs text-primary-500 font-medium line-clamp-1">{p.standardization}</span>
                    </div>
                  )}
                  <p className="text-xs text-text-muted leading-relaxed mb-3 line-clamp-2">
                    {p.shortDescription}
                  </p>

                  {/* Benefits pills */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.benefits.slice(0, 3).map((b) => (
                      <span
                        key={b}
                        className="rounded-full bg-surface-100 border border-surface-300 px-2 py-0.5 text-xs text-text-dim"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-surface-200 pt-3">
                    {p.moq ? (
                      <span className="text-xs text-text-dim">
                        MOQ: <span className="font-medium text-text">{p.moq}</span>
                      </span>
                    ) : (
                      <span />
                    )}
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => open({ productSlug: p.slug, productName: p.name })}
                    >
                      Get Quote
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── CTA strip ────────────────────────────────────────────────────── */}
      <div className="mt-16 rounded-2xl border border-primary-500/20 bg-gradient-to-br from-primary-950/5 to-surface-100 p-8 text-center">
        <h3 className="font-display text-2xl font-bold text-text mb-2">
          Can't find what you need?
        </h3>
        <p className="text-text-muted mb-6 max-w-lg mx-auto text-sm">
          Our full catalog extends to 200+ botanicals, amino acids, excipients, flavours, and
          specialty APIs. Send us your requirement and our team will respond within 24 hours.
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => open({ productSlug: 'custom', productName: 'Custom Requirement' })}
        >
          Submit a Custom Requirement <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
