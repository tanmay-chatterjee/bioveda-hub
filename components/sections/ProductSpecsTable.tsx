import type { Product } from '@/types';

interface ProductSpecsTableProps {
  product: Product;
}

const specFields: Array<{ key: keyof Product; label: string }> = [
  { key: 'activeCompound', label: 'Active Compound' },
  { key: 'standardization', label: 'Standardization' },
  { key: 'meshSize', label: 'Mesh Size' },
  { key: 'solubility', label: 'Solubility' },
  { key: 'shelfLife', label: 'Shelf Life' },
  { key: 'storageConditions', label: 'Storage Conditions' },
  { key: 'moq', label: 'Minimum Order Quantity' },
  { key: 'botanicalName', label: 'Botanical Name' },
  { key: 'sku', label: 'Product Code' },
];

export function ProductSpecsTable({ product }: ProductSpecsTableProps) {
  const specs = specFields.filter(({ key }) => product[key]);

  if (specs.length === 0) return null;

  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 font-display text-3xl font-bold text-text">Technical Specifications</h2>
        <div className="rounded-2xl border border-surface-300 overflow-hidden">
          <table className="w-full">
            <tbody>
              {specs.map(({ key, label }, i) => (
                <tr
                  key={key}
                  className={`border-b border-surface-300 last:border-0 ${i % 2 === 0 ? 'bg-surface-100' : 'bg-surface-200/50'}`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-text-muted w-1/3">{label}</td>
                  <td className="px-6 py-4 text-sm text-text font-medium">
                    {Array.isArray(product[key])
                      ? (product[key] as string[]).join(', ')
                      : String(product[key])}
                  </td>
                </tr>
              ))}
              {product.form && product.form.length > 0 && (
                <tr className="border-b border-surface-300 last:border-0 bg-surface-100">
                  <td className="px-6 py-4 text-sm font-medium text-text-muted w-1/3">Available Forms</td>
                  <td className="px-6 py-4 text-sm text-text font-medium">{product.form.join(', ')}</td>
                </tr>
              )}
              {product.packagingOptions && product.packagingOptions.length > 0 && (
                <tr className="border-b border-surface-300 last:border-0 bg-surface-200/50">
                  <td className="px-6 py-4 text-sm font-medium text-text-muted w-1/3">Packaging Options</td>
                  <td className="px-6 py-4 text-sm text-text font-medium">{product.packagingOptions.join(', ')}</td>
                </tr>
              )}
              {product.industries && product.industries.length > 0 && (
                <tr className="bg-surface-100">
                  <td className="px-6 py-4 text-sm font-medium text-text-muted w-1/3">Target Industries</td>
                  <td className="px-6 py-4 text-sm text-text font-medium">{product.industries.join(', ')}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
