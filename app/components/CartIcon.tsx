'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartIconProps {
  onClick: () => void;
}

export default function CartIcon({ onClick }: CartIconProps) {
  const { totalItems } = useCart();

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="w-6 h-6" />
      
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
}
