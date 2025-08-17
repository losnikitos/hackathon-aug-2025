import { ShowProductsResult } from '../types/tools';
import ProductsGrid from './ProductsGrid';

interface ProductOptionsDisplayProps {
  result: ShowProductsResult;
}

export default function ProductOptionsDisplay({ result }: ProductOptionsDisplayProps) {
  const getSubtitle = () => {
    const parts = [];
    if (result.category) {
      parts.push(`Category: ${result.category}`);
    }
    parts.push(`Found ${result.totalFound} product${result.totalFound !== 1 ? 's' : ''}`);
    return parts.join(' • ');
  };

  return (
    <ProductsGrid
      products={result.products}
      title="Product Options"
      subtitle={getSubtitle()}
      emptyMessage="No products found matching your criteria."
    />
  );
}
