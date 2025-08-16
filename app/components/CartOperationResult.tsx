import { CartItemInfo } from '../types/tools';
import catalogData from '../data/catalog.json';
import CartItemDisplay from './CartItemDisplay';

interface CartOperationResultProps {
  operation: 'addToCart' | 'removeFromCart' | 'updateCartQuantity';
  output: string;
}

export default function CartOperationResult({ operation, output }: CartOperationResultProps) {
  // Parse the output to extract item information
  // The output format is typically something like "Added 2 Fresh Eggs (12 pcs) to cart"
  const parseOutput = (output: string) => {
    const addMatch = output.match(/Added (\d+) (.+) to your cart/);
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

  // Create a CartItemInfo object for the CartItemDisplay component
  const cartItem: CartItemInfo = {
    id: catalogItem?.id || 0,
    name: catalogItem?.name || parsed.itemName,
    quantity: parsed.quantity,
    price: catalogItem?.price_eur || 0,
    total: (catalogItem?.price_eur || 0) * parsed.quantity
  };

  const getAction = (): 'added' | 'removed' | 'updated' => {
    if (operation === 'addToCart') return 'added';
    if (operation === 'removeFromCart') return 'removed';
    return 'updated';
  };

  return (
    <CartItemDisplay 
      item={cartItem} 
      action={getAction()}
      showQuantity={true}
    />
  );
}
