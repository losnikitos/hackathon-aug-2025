import {
  CartOperationResult as CartOperationResultType,
} from "../types/tools";
import catalogData from "../data/catalog.json";
import ProductDisplay from "./ProductDisplay";

interface CartOperationResultProps {
  result: CartOperationResultType;
}

export default function CartOperationResult({
  result,
}: CartOperationResultProps) {
  // Find the item in catalog by ID
  const catalogItem = catalogData.find((item) => item.id === result.itemId);

  if (!catalogItem) {
    return (
      <div className="text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-2">
        <div className="font-medium text-red-800 dark:text-red-200">Error:</div>
        <div className="text-red-700 dark:text-red-300 mt-1">Product not found</div>
      </div>
    );
  }

  return (
    <ProductDisplay
      product={{
        id: result.itemId,
        name: catalogItem.name,
        description: catalogItem.description,
        price_eur: catalogItem.price_eur,
        weight_or_count: catalogItem.weight_or_count,
        image: catalogItem.image
      }}
      action={result.action === "added" ? "added" : result.action === "removed" ? "removed" : undefined}
    />
  );
}
