import { CartItemInfo } from '../types/tools';
import catalogData from '../data/catalog.json';
import { Check, X } from 'lucide-react';
import CartItemControls from './CartItemControls';

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
        <div className="font-bold text-sm text-gray-900 dark:text-white truncate mb-1">
          {catalogItem?.name || item.name}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">Quantity:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{item.quantity}</span>
          </div>
          
          <CartItemControls
            itemId={item.id}
            quantity={item.quantity}
            onUpdateQuantity={onQuantityChange || (() => {})}
            onRemoveFromCart={onRemove || (() => {})}
          />
          
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            €{item.total.toFixed(2)}
          </div>
        </div>

      </div>
    </div>
  );
}
