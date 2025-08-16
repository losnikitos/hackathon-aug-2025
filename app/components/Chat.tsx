'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import CartIcon from './CartIcon';
import CartPopup from './CartPopup';
import CartSidebar from './CartSidebar';
import Timer from './Timer';
import { useChat } from '@ai-sdk/react';
import { lastAssistantMessageIsCompleteWithToolCalls } from 'ai';
import { useCart } from '../contexts/CartContext';
import catalogData from '../data/catalog.json';
import { 
  AddToCartInput, 
  RemoveFromCartInput, 
  UpdateCartQuantityInput, 
  ShowProductsInput,
  ShowProductsResult,
  CartSummary,
  CartItemInfo
} from '../types/tools';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart, removeFromCart, updateQuantity, items, uniqueItems, totalPrice, getItemDetails } = useCart();

  // Set session start time when user opens /chat page
  useEffect(() => {
    const stored = localStorage.getItem('chatSessionStartTime');
    console.log(stored ? 'Was set' : 'Was not set, setting now');
    if(!stored) {
      localStorage.setItem('chatSessionStartTime', Date.now().toString());
    } 
  }, []);

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
            output: {
              itemId,
              itemName: itemDetails?.name || `Product ${itemId}`,
              quantity,
              action: 'added',
              success: true,
              message: `Added ${quantity} ${quantity === 1 ? 'item' : 'items'} of "${itemDetails?.name || `Product ${itemId}`}" to your cart.`
            },
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
            output: {
              itemId,
              itemName: itemDetails?.name || `Product ${itemId}`,
              quantity: 0,
              action: 'removed',
              success: true,
              message: `Removed "${itemDetails?.name || `Product ${itemId}`}" from your cart.`
            },
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
              output: {
                itemId,
                itemName: itemDetails?.name || `Product ${itemId}`,
                quantity: 0,
                action: 'removed',
                success: true,
                message: `Removed "${itemDetails?.name || `Product ${itemId}`}" from your cart.`
              },
            });
          } else {
            updateQuantity(itemId, quantity);
            addToolResult({
              tool: 'updateCartQuantity',
              toolCallId: toolCall.toolCallId,
              output: {
                itemId,
                itemName: itemDetails?.name || `Product ${itemId}`,
                quantity,
                action: 'updated',
                success: true,
                message: `Updated quantity of "${itemDetails?.name || `Product ${itemId}`}" to ${quantity} in your cart.`
              },
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
            output: cartSummary,
          });
          break;
        }
        
        case 'showProducts': {
          const input = toolCall.input as ShowProductsInput;
          const { category, searchTerm, limit = 10 } = input;
          
          let filteredProducts = [...catalogData];
          
          // Filter by category if specified
          if (category) {
            const categoryLower = category.toLowerCase();
            filteredProducts = filteredProducts.filter(product => {
              const productName = product.name.toLowerCase();
              const productDesc = product.description.toLowerCase();
              return productName.includes(categoryLower) || productDesc.includes(categoryLower);
            });
          }
          
          // Filter by search term if specified
          if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filteredProducts = filteredProducts.filter(product => {
              const productName = product.name.toLowerCase();
              const productDesc = product.description.toLowerCase();
              return productName.includes(searchLower) || productDesc.includes(searchLower);
            });
          }
          
          // Limit results
          const limitedProducts = filteredProducts.slice(0, limit);
          
          const result: ShowProductsResult = {
            products: limitedProducts,
            totalFound: filteredProducts.length,
            category,
            searchTerm
          };
          
          addToolResult({
            tool: 'showProducts',
            toolCallId: toolCall.toolCallId,
            output: result,
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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 min-w-0">
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
            <div className="flex items-center space-x-4">
              {/* Timer - visible on all screen sizes */}
              <Timer />
              {/* Show cart icon only on small screens */}
              <div className="md:hidden">
                <CartIcon onClick={() => setIsCartOpen(true)} />
              </div>
            </div>
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
      </div>

      {/* Cart Sidebar - Hidden on small screens, shown on medium and larger */}
      <div className="hidden md:block">
        <CartSidebar />
      </div>
      
      {/* Cart Popup - Only shown on small screens */}
      <CartPopup 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}
