import { ProductDisplay as ProductDisplayType } from "../types/tools";
import { Check, X } from "lucide-react";
import CartItemControls from "./CartItemControls";
import { useCart } from "../contexts/CartContext";

interface ProductDisplayProps {
  product: ProductDisplayType;
  action?: "added" | "removed";
}

export default function ProductDisplay({
  product,
  action
}: ProductDisplayProps) {
  const { getQuantity } = useCart();
  const quantity = getQuantity(product.id);
  const isInCart = quantity > 0;

  const getActionIcon = () => {
    switch (action) {
      case "added":
        return <Check className="w-4 h-4 text-green-600" />;
      case "removed":
        return <X className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className={`relative w-36 p-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-600`}>
      {/* Status Icon Overlay */}
      {getActionIcon() && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-600">
          {getActionIcon()}
        </div>
      )}

      <img
        src={product.image}
        alt={product.name}
        className="square object-cover w-32 h-32 rounded-lg"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />

      {/* Item Details */}
      <div className="p-3">
        <div className="font-bold text-sm text-gray-900 dark:text-white truncate mb-1">
          {product.name}
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          {product.weight_or_count}
        </div>

        <div className="space-y-2">
          <CartItemControls itemId={product.id} />

          <div className="text-sm font-medium text-gray-900 dark:text-white">
            €{product.price_eur.toFixed(2)}
            {isInCart && (
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                (€{(product.price_eur * quantity).toFixed(2)})
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
