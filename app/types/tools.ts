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

// Tool input types
export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type RemoveFromCartInput = z.infer<typeof removeFromCartSchema>;
export type UpdateCartQuantityInput = z.infer<typeof updateCartQuantitySchema>;
export type GetCartInfoInput = z.infer<typeof getCartInfoSchema>;

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

// Tool output types
export type AddToCartOutput = string;
export type RemoveFromCartOutput = string;
export type UpdateCartQuantityOutput = string;
export type GetCartInfoOutput = string; // JSON stringified CartSummary

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
  }
} as const;

// Tool names type
export type CartToolName = keyof typeof cartTools;
