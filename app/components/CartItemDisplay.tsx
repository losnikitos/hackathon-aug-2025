import { CartItemInfo } from '../types/tools';
import catalogData from '../data/catalog.json';
import { Minus, Plus, Trash2, Check, X } from 'lucide-react';

interface CartItemDisplayProps {
  item: CartItemInfo;
  action?: 'added' | 'removed' | 'updated' | 'current';
  showControls?: boolean;
  onQuantityChange?: (itemId: number, newQuantity: number) => void;
  onRemove?: (itemId: number) => void;
}

export default function CartItemDisplay({ 
  item, 
  action = 'current', 
  showControls = false,
  onQuantityChange,
  onRemove
}: CartItemDisplayProps) {
  // Find the item in catalog by ID or name
  const catalogItem = catalogData.find(catItem => 
    catItem.id === item.id ||
    catItem.name.toLowerCase().includes(item.name.toLowerCase()) ||
    item.name.toLowerCase().includes(catItem.name.toLowerCase())
  );

  if (!catalogItem) {
    return <div>Item not found</div>;
  }

  const getActionIcon = () => {
    switch (action) {
      case 'added':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'removed':
        return <X className="w-4 h-4 text-red-600" />;
      case 'updated':
        return null;
      default:
        return null;
    }
  };

  return (
    <div className={`relative w-36 p-2 bg-white rounded-2xl`}>
      {/* Status Icon Overlay */}
      
      <img src={catalogItem.image} alt={catalogItem.name} className="square object-cover w-32 h-32 rounded-lg"/>
        
             {getActionIcon() && (
         <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
           {getActionIcon()}
         </div>
       )}
      
      {/* Item Details */}
      <div className="p-3">
        <div className="font-medium text-sm text-gray-900 dark:text-white truncate mb-1">
          {catalogItem?.name || item.name}
        </div>
        
        {showControls ? (
          /* Interactive Controls */
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">Quantity:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{item.quantity}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onQuantityChange?.(item.id, item.quantity - 1)}
                className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                <Minus className="w-3 h-3" />
              </button>
              
              <button
                onClick={() => onQuantityChange?.(item.id, item.quantity + 1)}
                className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                <Plus className="w-3 h-3" />
              </button>
              
              <button
                onClick={() => onRemove?.(item.id)}
                className="w-6 h-6 rounded bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
            
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              €{item.total.toFixed(2)}
            </div>
          </div>
        ) : (
          /* Read-only Display */
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">Qty:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{item.quantity}</span>
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              €{item.total.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
