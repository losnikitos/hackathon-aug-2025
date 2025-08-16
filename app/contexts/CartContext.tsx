'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import catalogData from '../data/catalog.json';

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
  totalItems: number;
  totalPrice: number;
  getItemDetails: (itemId: number) => CatalogItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    { itemId: 1, quantity: 2 },  // Fresh Eggs (12 pcs)
    { itemId: 2, quantity: 1 },  // All-Purpose Flour
    { itemId: 3, quantity: 1 },  // White Sugar
    { itemId: 4, quantity: 1 },  // Apples Gala
    { itemId: 5, quantity: 1 }   // Cinnamon Powder
  ]);

  const addToCart = (itemId: number, quantity = 1) => {
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
  };

  const removeFromCart = (itemId: number) => {
    setItems(prevItems => prevItems.filter(item => item.itemId !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prevItems => 
      prevItems.map(item => 
        item.itemId === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemDetails = (itemId: number): CatalogItem | undefined => {
    return catalogData.find(item => item.id === itemId);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
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
      totalItems,
      totalPrice,
      getItemDetails
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
