import { CartItemInfo } from '../types/tools';
import catalogData from '../data/catalog.json';

interface CartItemDisplayProps {
  item: CartItemInfo;
  action?: 'added' | 'removed' | 'updated' | 'current';
  showQuantity?: boolean;
  compact?: boolean;
}

export default function CartItemDisplay({ 
  item, 
  action = 'current', 
  showQuantity = true,
  compact = false
}: CartItemDisplayProps) {
  // Find the item in catalog by ID or name
  const catalogItem = catalogData.find(catItem => 
    catItem.id === item.id ||
    catItem.name.toLowerCase().includes(item.name.toLowerCase()) ||
    item.name.toLowerCase().includes(catItem.name.toLowerCase())
  );

  const getActionColor = () => {
    switch (action) {
      case 'added':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200';
      case 'removed':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
      case 'updated':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  const getActionIcon = () => {
    switch (action) {
      case 'added':
        return '✅';
      case 'removed':
        return '❌';
      case 'updated':
        return '🔄';
      default:
        return '🛒';
    }
  };

  const getActionText = () => {
    switch (action) {
      case 'added':
        return 'Added to cart';
      case 'removed':
        return 'Removed from cart';
      case 'updated':
        return 'Updated quantity';
      default:
        return 'In cart';
    }
  };

  if (compact) {
    return (
      <div className={`text-xs border rounded p-2 ${getActionColor()}`}>
        <div className="flex items-center space-x-2">
          {/* Action Icon */}
          <div className="text-sm flex-shrink-0">
            {getActionIcon()}
          </div>
          
          {/* Item Image */}
          <div className="w-8 h-8 rounded overflow-hidden bg-white dark:bg-gray-800 flex-shrink-0">
            {catalogItem?.image ? (
              <img 
                src={catalogItem.image} 
                alt={catalogItem.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-gray-400 text-xs">📦</div>
              </div>
            )}
          </div>
          
          {/* Item Details */}
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate text-xs">
              {catalogItem?.name || item.name}
            </div>
            <div className="text-xs opacity-80">
              {showQuantity && (
                <span>Qty: {item.quantity} • </span>
              )}
              €{item.total.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`text-sm border rounded-lg p-3 ${getActionColor()}`}>
      <div className="flex items-center space-x-3">
        {/* Action Icon */}
        <div className="text-lg flex-shrink-0">
          {getActionIcon()}
        </div>
        
        {/* Item Image */}
        <div className="w-12 h-12 rounded overflow-hidden bg-white dark:bg-gray-800 flex-shrink-0">
          {catalogItem?.image ? (
            <img 
              src={catalogItem.image} 
              alt={catalogItem.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-gray-400 text-sm">📦</div>
            </div>
          )}
        </div>
        
        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">
            {catalogItem?.name || item.name}
          </div>
          <div className="text-sm opacity-80">
            {showQuantity && (
              <span>Qty: {item.quantity} • </span>
            )}
            €{item.total.toFixed(2)}
          </div>
        </div>
        
        {/* Action Label */}
        <div className="text-xs opacity-70 flex-shrink-0">
          {getActionText()}
        </div>
      </div>
    </div>
  );
}
