'use client';

import { useCart } from '../contexts/CartContext';

interface CartFooterProps {
  onCheckout?: () => void;
}

export default function CartFooter({ onCheckout }: CartFooterProps) {
  const { totalPrice, clearCart } = useCart();

  return (
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
      <button
        onClick={onCheckout}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Checkout
      </button>
    </div>
  );
}
