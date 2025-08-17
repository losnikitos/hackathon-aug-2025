import { z } from 'zod';

// Tool input schemas
export const addToCartSchema = z.object({
  itemId: z.number().describe('The ID of the product to add to cart'),
  quantity: z.number().optional().describe('Quantity to add (defaults to 1)')
});

export const removeFromCartSchema = z.object({
  itemId: z.number().describe('The ID of the product to remove from cart')
});

export const updateCartQuantitySchema = z.object({
  itemId: z.number().describe('The ID of the product to update'),
  quantity: z.number().describe('The new quantity (use 0 to remove the item)')
});

export const getCartInfoSchema = z.object({});

export const showProductsSchema = z.object({
  category: z.string().optional().describe('Product category to show (e.g., "fruits", "dairy", "baking")'),
  searchTerm: z.string().optional().describe('Search term to filter products'),
  limit: z.number().optional().describe('Maximum number of products to show (defaults to 10)')
});

export const suggestMoreOptionsSchema = z.object({});

// Tool input types
export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type RemoveFromCartInput = z.infer<typeof removeFromCartSchema>;
export type UpdateCartQuantityInput = z.infer<typeof updateCartQuantitySchema>;
export type GetCartInfoInput = z.infer<typeof getCartInfoSchema>;
export type ShowProductsInput = z.infer<typeof showProductsSchema>;
export type SuggestMoreOptionsInput = z.infer<typeof suggestMoreOptionsSchema>;

// Cart item type for getCartInfo output
export interface CartItemInfo {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

// Cart summary type for getCartInfo output
export interface CartSummary {
  uniqueItems: number;
  totalPrice: string;
  items: CartItemInfo[];
}

// Product display type for showProducts output
export interface ProductDisplay {
  id: number;
  name: string;
  description: string;
  price_eur: number;
  weight_or_count: string;
  image: string;
}

export interface ShowProductsResult {
  products: ProductDisplay[];
  totalFound: number;
  category?: string;
  searchTerm?: string;
}

export interface SuggestMoreOptionsResult {
  suggestions: string[];
  message: string;
}

// Structured output types for cart operations
export interface CartOperationResult {
  itemId: number;
  itemName: string;
  quantity: number;
  action: 'added' | 'removed' | 'updated';
  success: boolean;
  message?: string;
}

// Tool output types - now using structured data
export type AddToCartOutput = CartOperationResult;
export type RemoveFromCartOutput = CartOperationResult;
export type UpdateCartQuantityOutput = CartOperationResult;
export type GetCartInfoOutput = CartSummary; // No longer stringified
export type ShowProductsOutput = ShowProductsResult;
export type SuggestMoreOptionsOutput = SuggestMoreOptionsResult;

// Tool definitions for the AI SDK
export const cartTools = {
  addToCart: {
    description: 'Add a product to the shopping cart',
    inputSchema: addToCartSchema
  },
  
  removeFromCart: {
    description: 'Remove a product from the shopping cart',
    inputSchema: removeFromCartSchema
  },
  
  updateCartQuantity: {
    description: 'Update the quantity of a product in the shopping cart',
    inputSchema: updateCartQuantitySchema
  },
  
  getCartInfo: {
    description: 'Get information about the current shopping cart including items, quantities, and total price',
    inputSchema: getCartInfoSchema
  },

  showProducts: {
    description: 'Show product options without adding them to cart. Use when user asks about options, alternatives, or wants to browse products without committing to purchase.',
    inputSchema: showProductsSchema
  },

  suggestMoreOptions: {
    description: 'Suggest additional options or next steps when the cart has 3 or more items. Use this to provide helpful suggestions for what the user might want to do next.',
    inputSchema: suggestMoreOptionsSchema
  }
} as const;

// Tool names type
export type CartToolName = keyof typeof cartTools;
