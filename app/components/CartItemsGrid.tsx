import { CartItemInfo } from "../types/tools";
import CartItemDisplay from "./CartItemDisplay";

interface CartItemsGridProps {
  items: CartItemInfo[];
  action?: "added" | "removed" | "updated" | "current";
}

export default function CartItemsGrid({ items }: CartItemsGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-4">
        No items to display
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <CartItemDisplay key={item.id} item={item} />
      ))}
    </div>
  );
}
