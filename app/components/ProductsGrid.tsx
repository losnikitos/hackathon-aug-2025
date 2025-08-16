import { ProductDisplay as ProductDisplayType, CartItemInfo } from "../types/tools";
import ProductDisplay from "./ProductDisplay";
import catalogData from "../data/catalog.json";

interface ProductsGridProps {
  products: ProductDisplayType[] | CartItemInfo[];
  title?: string;
  subtitle?: string;
  emptyMessage?: string;
}

export default function ProductsGrid({ 
  products, 
  title, 
  subtitle, 
  emptyMessage = "No items to display" 
}: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-4">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {products.map((product) => {
          // Handle both ProductDisplayType and CartItemInfo
          if ('description' in product) {
            // It's a ProductDisplayType
            return (
              <ProductDisplay
                key={product.id}
                product={product}
              />
            );
          } else {
            // It's a CartItemInfo - need to look up catalog data
            const cartItem = product as CartItemInfo;
            const catalogItem = catalogData.find(item => item.id === cartItem.id);
            
            if (!catalogItem) {
              return null; // Skip items not found in catalog
            }
            
            return (
              <ProductDisplay
                key={cartItem.id}
                product={{
                  id: cartItem.id,
                  name: catalogItem.name,
                  description: catalogItem.description,
                  price_eur: catalogItem.price_eur,
                  weight_or_count: catalogItem.weight_or_count,
                  image: catalogItem.image
                }}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
