'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CartItemControls from './CartItemControls';

export default function CartSidebar() {
  const { items, updateQuantity, removeFromCart, uniqueItems, totalPrice, clearCart, getItemDetails } = useCart();

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Shopping Cart ({items.length} items, {uniqueItems} unique)
        </h2>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => {
              const itemDetails = getItemDetails(item.itemId);
              if (!itemDetails) return null;
              
              return (
                <div key={item.itemId} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <img
                    src={itemDetails.image}
                    alt={itemDetails.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {itemDetails.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {itemDetails.weight_or_count}
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      €{itemDetails.price_eur.toFixed(2)}
                    </p>
                  </div>
                  
                  <CartItemControls
                    itemId={item.itemId}
                    quantity={item.quantity}
                    onUpdateQuantity={updateQuantity}
                    onRemoveFromCart={removeFromCart}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Total: €{totalPrice.toFixed(2)}
            </span>
            <button
              onClick={clearCart}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
            >
              Clear Cart
            </button>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
