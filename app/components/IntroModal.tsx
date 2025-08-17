'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

export default function IntroModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;



  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/30 transition-all duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto transition-all duration-500 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-30'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl text-gray-900 dark:text-white">
            Please buy all ingredients for an apple pie. Here&apos;s a shopping list:
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="size-8" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 pt-0">
          <div className="mb-6">
            
            <div className="mb-10 flex justify-center">
              <Image
                src="/shopping-list.png"
                alt="Apple Pie Shopping List"
                width={300}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          
          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200"
          >
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
