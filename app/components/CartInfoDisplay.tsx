import { CartSummary } from '../types/tools';
import catalogData from '../data/catalog.json';

interface CartInfoDisplayProps {
  cartInfo: string;
}

export default function CartInfoDisplay({ cartInfo }: CartInfoDisplayProps) {
  let parsedCart: CartSummary;
  
  try {
    parsedCart = JSON.parse(cartInfo);
  } catch {
    // If parsing fails, show the raw string
    return (
      <div className="text-sm bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-2">
        <div className="font-medium text-green-800 dark:text-green-200">
          Cart Information:
        </div>
        <div className="text-green-700 dark:text-green-300 mt-1">
          <pre className="text-xs overflow-x-auto">{cartInfo}</pre>
        </div>
      </div>
    );
  }

  if (!parsedCart.items || parsedCart.items.length === 0) {
    return (
      <div className="text-sm bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-3">
        <div className="font-medium text-green-800 dark:text-green-200 mb-2">
          Cart Information
        </div>
        <div className="text-green-700 dark:text-green-300">
          Your cart is empty
        </div>
      </div>
    );
  }

  return (
    <div className="text-sm bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-3">
      <div className="font-medium text-green-800 dark:text-green-200 mb-3">
        Cart Information
      </div>
      
      {/* Cart Summary */}
      <div className="mb-3 p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {parsedCart.uniqueItems} unique item{parsedCart.uniqueItems !== 1 ? 's' : ''} • Total: {parsedCart.totalPrice}
        </div>
      </div>
      
      {/* Items Grid */}
      <div className="grid grid-cols-2 gap-2">
        {parsedCart.items.map((item) => {
          // Find the item in catalog by name
          const catalogItem = catalogData.find(catItem => 
            catItem.name.toLowerCase().includes(item.name.toLowerCase()) ||
            item.name.toLowerCase().includes(catItem.name.toLowerCase())
          );

          return (
            <div key={item.id} className="flex items-center space-x-2 p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
              {/* Item Image */}
              <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
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
                <div className="font-medium text-green-800 dark:text-green-200 text-xs truncate">
                  {catalogItem?.name || item.name}
                </div>
                <div className="text-green-700 dark:text-green-300 text-xs">
                  Qty: {item.quantity} • €{item.total.toFixed(2)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
