'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartItemControlsProps {
  itemId: number;
}

export default function CartItemControls({
  itemId,
}: CartItemControlsProps) {
  const { updateQuantity, removeFromCart, getQuantity, addToCart } = useCart();
  const quantity = getQuantity(itemId);
  const isInCart = quantity > 0;

  if (!isInCart) {
    return (
      <button
        onClick={() => addToCart(itemId, 1)}
        className="w-full flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium py-1.5 px-2 rounded-md transition-colors"
      >
        <Plus className="w-3 h-3" />
        Add to Cart
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => updateQuantity(itemId, quantity - 1)}
        className="size-7 flex-shrink-0 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
      >
        <Minus className="w-3 h-3" />
      </button>
      
      <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
        {quantity}
      </span>
      
      <button
        onClick={() => updateQuantity(itemId, quantity + 1)}
        className="size-7 flex-shrink-0 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
      >
        <Plus className="w-3 h-3" />
      </button>
      
      <button
        onClick={() => removeFromCart(itemId)}
        className="size-7 flex-shrink-0 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
}
