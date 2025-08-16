'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemControlsProps {
  itemId: number;
  quantity: number;
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onRemoveFromCart: (itemId: number) => void;
}

export default function CartItemControls({
  itemId,
  quantity,
  onUpdateQuantity,
  onRemoveFromCart,
}: CartItemControlsProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onUpdateQuantity(itemId, quantity - 1)}
        className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
      >
        <Minus className="w-3 h-3" />
      </button>
      
      <span className="text-sm font-medium text-gray-900 dark:text-white  text-center">
        {quantity}
      </span>
      
      <button
        onClick={() => onUpdateQuantity(itemId, quantity + 1)}
        className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
      >
        <Plus className="w-3 h-3" />
      </button>
      
      <button
        onClick={() => onRemoveFromCart(itemId)}
        className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
}
