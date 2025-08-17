'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartIconProps {
  onClick: () => void;
}

export default function CartIcon({ onClick }: CartIconProps) {
  const { uniqueItems } = useCart();

  return (
    <button
      onClick={onClick}
      className={`relative flex items-center space-x-2 px-3 py-2 transition-all duration-200 rounded-lg ${
        uniqueItems > 0
          ? 'bg-green-600 text-white hover:bg-green-700'
          : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
      aria-label="Shopping cart"
    >
      <ShoppingCart className="w-5 h-5" />
      <span className="text-sm font-medium">Checkout</span>
      
      {uniqueItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-white text-green-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium border border-green-600">
          {uniqueItems > 99 ? '99+' : uniqueItems}
        </span>
      )}
    </button>
  );
}
