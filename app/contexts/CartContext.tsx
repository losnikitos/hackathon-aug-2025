'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import catalogData from '../data/catalog.json';
import { sendGAEvent } from '@next/third-parties/google';

export interface CatalogItem {
  id: number;
  name: string;
  description: string;
  price_eur: number;
  weight_or_count: string;
  image: string;
}

export interface CartItem {
  itemId: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (itemId: number, quantity?: number) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  uniqueItems: number;
  totalPrice: number;
  getItemDetails: (itemId: number) => CatalogItem | undefined;
  getQuantity: (itemId: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    // { itemId: 1, quantity: 2 },  // Fresh Eggs (12 pcs)
    // { itemId: 2, quantity: 1 },  // All-Purpose Flour
    // { itemId: 3, quantity: 1 },  // White Sugar
    // { itemId: 4, quantity: 1 },  // Apples Gala
    // { itemId: 5, quantity: 1 }   // Cinnamon Powder
  ]);

  const addToCart = (itemId: number, quantity = 1) => {
    const itemDetails = getItemDetails(itemId);
    const itemName = itemDetails?.name || `Product ${itemId}`;
    const price = itemDetails?.price_eur || 0;
    
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.itemId === itemId);
      if (existingItem) {
        return prevItems.map(i => 
          i.itemId === itemId 
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prevItems, { itemId, quantity }];
    });
    
    // Track the add to cart event
    sendGAEvent('event', 'add_to_cart', {
      item_id: itemId,
      item_name: itemName,
      quantity: quantity,
      price: price,
      currency: 'EUR',
      value: price * quantity
    });
  };

  const removeFromCart = (itemId: number) => {
    const itemDetails = getItemDetails(itemId);
    const itemName = itemDetails?.name || `Product ${itemId}`;
    const price = itemDetails?.price_eur || 0;
    
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.itemId === itemId);
      const quantity = itemToRemove?.quantity || 0;
      
      // Track the remove from cart event
      sendGAEvent('event', 'remove_from_cart', {
        item_id: itemId,
        item_name: itemName,
        quantity: quantity,
        price: price,
        currency: 'EUR',
        value: price * quantity
      });
      
      return prevItems.filter(item => item.itemId !== itemId);
    });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    const itemDetails = getItemDetails(itemId);
    const itemName = itemDetails?.name || `Product ${itemId}`;
    const price = itemDetails?.price_eur || 0;
    
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.itemId === itemId);
      if (existingItem) {
        const oldQuantity = existingItem.quantity;
        
        // Track the update quantity event
        sendGAEvent('event', 'update_cart_quantity', {
          item_id: itemId,
          item_name: itemName,
          old_quantity: oldQuantity,
          new_quantity: quantity,
          quantity_change: quantity - oldQuantity,
          price: price,
          currency: 'EUR',
          value: price * Math.abs(quantity - oldQuantity)
        });
        
        return prevItems.map(item => 
          item.itemId === itemId ? { ...item, quantity } : item
        );
      } else {
        // Add the item to cart if it doesn't exist
        sendGAEvent('event', 'add_to_cart', {
          item_id: itemId,
          item_name: itemName,
          quantity: quantity,
          price: price,
          currency: 'EUR',
          value: price * quantity
        });
        return [...prevItems, { itemId, quantity }];
      }
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemDetails = (itemId: number): CatalogItem | undefined => {
    return catalogData.find(item => item.id === itemId);
  };

  const getQuantity = (itemId: number): number => {
    const item = items.find(i => i.itemId === itemId);
    return item ? item.quantity : 0;
  };

  const uniqueItems = items.length;
  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => {
      const itemDetails = getItemDetails(item.itemId);
      return sum + (itemDetails?.price_eur || 0) * item.quantity;
    }, 0);
  }, [items]);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      uniqueItems,
      totalPrice,
      getItemDetails,
      getQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
