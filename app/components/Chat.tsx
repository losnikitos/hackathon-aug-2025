'use client';

import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import CartIcon from './CartIcon';
import CartPopup from './CartPopup';
import { ChatMessage as ChatMessageType, ChatResponse } from '../types/chat';

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      return response.json() as Promise<ChatResponse>;
    },
    onMutate: async (message) => {
      // Add user message immediately
      const userMessage: ChatMessageType = {
        id: Date.now().toString(),
        content: message,
        role: 'user',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      return { userMessage };
    },
    onSuccess: (data, sentMessage, context) => {
      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: data.timestamp,
      };

      setMessages(prev => [...prev, assistantMessage]);
    },
    onError: (error, sentMessage) => {
      console.error('Failed to send message:', error);
      
      // Add error message to chat
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    },
  });

  const handleSendMessage = (message: string) => {
    sendMessageMutation.mutate(message);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Chat Assistant
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ask me anything!
            </p>
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
        onSendMessage={handleSendMessage}
        isLoading={sendMessageMutation.isPending}
      />
      
      {/* Cart Popup */}
      <CartPopup 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}
