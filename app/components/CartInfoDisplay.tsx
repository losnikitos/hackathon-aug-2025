import { CartSummary } from '../types/tools';
import CartItemsGrid from './CartItemsGrid';

interface CartInfoDisplayProps {
  cartInfo: CartSummary;
}

export default function CartInfoDisplay({ cartInfo }: CartInfoDisplayProps) {
  if (!cartInfo.items || cartInfo.items.length === 0) {
    return (
      <div className="text-sm bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-3">
        <div className="font-medium text-green-800 dark:text-green-200 mb-2">
          Cart Information
        </div>
        <div className="text-green-700 dark:text-green-300">
          Your cart is empty
        </div>
      </div>
    );
  }

  return (
    <div className="text-sm bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-3">
      <div className="font-medium text-green-800 dark:text-green-200 mb-3">
        Cart Information
      </div>
      
      {/* Cart Summary */}
      <div className="mb-3 p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {cartInfo.uniqueItems} unique item{cartInfo.uniqueItems !== 1 ? 's' : ''} • Total: {cartInfo.totalPrice}
        </div>
      </div>
      
      {/* Items Grid */}
      <CartItemsGrid 
        items={cartInfo.items}
        action="current"
        showControls={false}
      />
    </div>
  );
}
