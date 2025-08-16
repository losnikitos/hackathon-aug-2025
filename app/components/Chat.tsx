'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import CartIcon from './CartIcon';
import CartPopup from './CartPopup';
import { useChat } from '@ai-sdk/react';
import { lastAssistantMessageIsCompleteWithToolCalls } from 'ai';
import { useCart } from '../contexts/CartContext';
import { 
  AddToCartInput, 
  RemoveFromCartInput, 
  UpdateCartQuantityInput, 
  CartSummary,
  CartItemInfo
} from '../types/tools';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart, removeFromCart, updateQuantity, items, uniqueItems, totalPrice, getItemDetails } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const { messages, sendMessage, status, addToolResult } = useChat({
    onError: (error) => {
      console.error('Chat error:', error);
    },
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    
    // Handle client-side tool calls
    async onToolCall({ toolCall }) {
      switch (toolCall.toolName) {
        case 'addToCart': {
          const input = toolCall.input as AddToCartInput;
          const { itemId, quantity = 1 } = input;
          addToCart(itemId, quantity);
          const itemDetails = getItemDetails(itemId);
          
          addToolResult({
            tool: 'addToCart',
            toolCallId: toolCall.toolCallId,
            output: `Added ${quantity} ${quantity === 1 ? 'item' : 'items'} of "${itemDetails?.name || `Product ${itemId}`}" to your cart.`,
          });
          break;
        }
        
        case 'removeFromCart': {
          const input = toolCall.input as RemoveFromCartInput;
          const { itemId } = input;
          const itemDetails = getItemDetails(itemId);
          removeFromCart(itemId);
          
          addToolResult({
            tool: 'removeFromCart',
            toolCallId: toolCall.toolCallId,
            output: `Removed "${itemDetails?.name || `Product ${itemId}`}" from your cart.`,
          });
          break;
        }
        
        case 'updateCartQuantity': {
          const input = toolCall.input as UpdateCartQuantityInput;
          const { itemId, quantity } = input;
          const itemDetails = getItemDetails(itemId);
          
          if (quantity <= 0) {
            removeFromCart(itemId);
            addToolResult({
              tool: 'updateCartQuantity',
              toolCallId: toolCall.toolCallId,
              output: `Removed "${itemDetails?.name || `Product ${itemId}`}" from your cart.`,
            });
          } else {
            updateQuantity(itemId, quantity);
            addToolResult({
              tool: 'updateCartQuantity',
              toolCallId: toolCall.toolCallId,
              output: `Updated quantity of "${itemDetails?.name || `Product ${itemId}`}" to ${quantity} in your cart.`,
            });
          }
          break;
        }
        
        case 'getCartInfo': {
          const cartItems: CartItemInfo[] = items.map(item => {
            const itemDetails = getItemDetails(item.itemId);
            return {
              id: item.itemId,
              name: itemDetails?.name || `Product ${item.itemId}`,
              quantity: item.quantity,
              price: itemDetails?.price_eur || 0,
              total: (itemDetails?.price_eur || 0) * item.quantity
            };
          });
          
          const cartSummary: CartSummary = {
            uniqueItems,
            totalPrice: totalPrice.toFixed(2),
            items: cartItems
          };
          
          addToolResult({
            tool: 'getCartInfo',
            toolCallId: toolCall.toolCallId,
            output: JSON.stringify(cartSummary, null, 2),
          });
          break;
        }
      }
    },
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendUserMessage = async (message: string) => {
    await sendMessage({
      role: 'user',
      parts: [{ type: 'text', text: message }],
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                Chat Assistant
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ask me anything!
              </p>
            </div>
          </div>
          <CartIcon onClick={() => setIsCartOpen(true)} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            <p>Start a conversation by typing a message below.</p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput 
        onSendMessage={sendUserMessage}
        isLoading={status === 'streaming'}
      />
      
      {/* Cart Popup */}
      <CartPopup 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}
