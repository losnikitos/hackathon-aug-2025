import {
  CartOperationResult as CartOperationResultType,
  CartItemInfo,
} from "../types/tools";
import catalogData from "../data/catalog.json";
import CartItemDisplay from "./CartItemDisplay";
interface CartOperationResultProps {
  result: CartOperationResultType;
}

export default function CartOperationResult({
  result,
}: CartOperationResultProps) {
  // Find the item in catalog by ID
  const catalogItem = catalogData.find((item) => item.id === result.itemId);

  // Create a CartItemInfo object for the CartItemDisplay component
  const cartItem: CartItemInfo = {
    id: result.itemId,
    name: catalogItem?.name || result.itemName,
    quantity: result.quantity,
    price: catalogItem?.price_eur || 0,
    total: (catalogItem?.price_eur || 0) * result.quantity,
  };

  return <CartItemDisplay item={cartItem} />;
}
