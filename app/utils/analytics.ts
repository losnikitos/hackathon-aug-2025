import { sendGAEvent } from '@next/third-parties/google';

// Extend Window interface for Yandex Metrika
declare global {
  interface Window {
    ym?: (id: number, action: string, eventName: string, parameters?: Record<string, unknown>) => void;
  }
}

// Yandex Metrika tracking function
export const trackYandexEvent = (eventName: string, parameters: Record<string, unknown> = {}) => {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(103784170, 'reachGoal', eventName, parameters);
  }
};

// Combined tracking function for both GA and Yandex
export const trackEvent = (eventName: string, parameters: Record<string, unknown> = {}) => {
  // Track to Google Analytics
  sendGAEvent('event', eventName, parameters);
  
  // Track to Yandex Metrika
  trackYandexEvent(eventName, parameters);
};

// Specific event tracking functions
export const trackAddToCart = (itemId: number, itemName: string, quantity: number, price: number) => {
  const parameters = {
    item_id: itemId,
    item_name: itemName,
    quantity: quantity,
    price: price,
    currency: 'EUR',
    value: price * quantity
  };
  
  trackEvent('add_to_cart', parameters);
};

export const trackRemoveFromCart = (itemId: number, itemName: string, quantity: number, price: number) => {
  const parameters = {
    item_id: itemId,
    item_name: itemName,
    quantity: quantity,
    price: price,
    currency: 'EUR',
    value: price * quantity
  };
  
  trackEvent('remove_from_cart', parameters);
};

export const trackUpdateCartQuantity = (itemId: number, itemName: string, oldQuantity: number, newQuantity: number, price: number) => {
  const parameters = {
    item_id: itemId,
    item_name: itemName,
    old_quantity: oldQuantity,
    new_quantity: newQuantity,
    quantity_change: newQuantity - oldQuantity,
    price: price,
    currency: 'EUR',
    value: price * Math.abs(newQuantity - oldQuantity)
  };
  
  trackEvent('update_cart_quantity', parameters);
};

export const trackCheckout = (timeTaken: string, cartScore: number, cartMaxScore: number, cartPercentage: number, cartGrade: string, totalItems: number, totalPrice: number) => {
  const parameters = {
    time_taken: timeTaken,
    cart_score: cartScore,
    cart_max_score: cartMaxScore,
    cart_percentage: cartPercentage,
    cart_grade: cartGrade,
    total_items: totalItems,
    total_price: totalPrice,
    currency: 'EUR',
    value: totalPrice,
    timestamp: Date.now()
  };
  
  trackEvent('checkout', parameters);
};

export const trackToolCall = (toolName: string, toolData: unknown) => {
  const parameters = {
    tool_name: toolName,
    tool_data: JSON.stringify(toolData),
    timestamp: Date.now()
  };
  
  trackEvent('tool_call', parameters);
};
