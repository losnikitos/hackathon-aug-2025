import { CartItemInfo } from '../types/tools';
import catalogData from '../data/catalog.json';

interface CartOperationResultProps {
  operation: 'addToCart' | 'removeFromCart' | 'updateCartQuantity';
  output: string;
}

export default function CartOperationResult({ operation, output }: CartOperationResultProps) {
  // Parse the output to extract item information
  // The output format is typically something like "Added 2 Fresh Eggs (12 pcs) to cart"
  const parseOutput = (output: string) => {
    const addMatch = output.match(/Added (\d+) (.+) to cart/);
    const removeMatch = output.match(/Removed (\d+) (.+) from cart/);
    const updateMatch = output.match(/Updated (.+) quantity to (\d+)/);
    
    if (addMatch) {
      return { quantity: parseInt(addMatch[1]), itemName: addMatch[2], action: 'added' };
    } else if (removeMatch) {
      return { quantity: parseInt(removeMatch[1]), itemName: removeMatch[2], action: 'removed' };
    } else if (updateMatch) {
      return { quantity: parseInt(updateMatch[2]), itemName: updateMatch[1], action: 'updated' };
    }
    
    return null;
  };

  const parsed = parseOutput(output);
  
  if (!parsed) {
    return (
      <div className="text-sm bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-2">
        <div className="text-green-700 dark:text-green-300">{output}</div>
      </div>
    );
  }

  // Find the item in catalog by name
  const catalogItem = catalogData.find(item => 
    item.name.toLowerCase().includes(parsed.itemName.toLowerCase()) ||
    parsed.itemName.toLowerCase().includes(item.name.toLowerCase())
  );

  const isAddOperation = operation === 'addToCart' || (operation === 'updateCartQuantity' && parsed.action === 'updated');
  const isRemoveOperation = operation === 'removeFromCart';
  const isQuantityUpdate = operation === 'updateCartQuantity';

  return (
    <div className="text-sm bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-3">
      <div className="font-medium text-green-800 dark:text-green-200 mb-2">
        {operation === 'addToCart' ? 'Item Added to Cart' : 
         operation === 'removeFromCart' ? 'Item Removed from Cart' : 
         'Cart Updated'}
      </div>
      
      <div className="flex items-center space-x-3">
        {/* Item Image Square */}
        <div className="relative">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 flex items-center justify-center">
            {catalogItem?.image ? (
              <img 
                src={catalogItem.image} 
                alt={catalogItem.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400 text-xs text-center p-2">
                {parsed.itemName}
              </div>
            )}
          </div>
          
          {/* Plus/Minus Indicator */}
          <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold ${
            isAddOperation ? 'bg-green-500' : 
            isRemoveOperation ? 'bg-red-500' : 
            'bg-blue-500'
          }`}>
            {isAddOperation ? '+' : isRemoveOperation ? '-' : '±'}
          </div>
        </div>
        
        {/* Item Details */}
        <div className="flex-1">
          <div className="font-medium text-green-800 dark:text-green-200">
            {catalogItem?.name || parsed.itemName}
          </div>
          <div className="text-green-700 dark:text-green-300 text-xs">
            Quantity: {parsed.quantity}
            {catalogItem && (
              <span className="ml-2">
                • €{(catalogItem.price_eur * parsed.quantity).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
