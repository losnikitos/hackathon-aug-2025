'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../contexts/CartContext';
import { CheckCircle, Clock, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, totalPrice, getItemDetails } = useCart();
  const [completionTime, setCompletionTime] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Read start time from localStorage and calculate completion time
    const storedStartTime = localStorage.getItem('chatSessionStartTime');
    
    if (storedStartTime) {
      const startTime = parseInt(storedStartTime);
      const endTime = Date.now();
      const timeDiff = endTime - startTime;
      const minutes = Math.floor(timeDiff / 60000);
      const seconds = Math.floor((timeDiff % 60000) / 1000);
      setCompletionTime(`${minutes}min ${seconds}s`);
      
      // Clear the stored start time
      localStorage.removeItem('chatSessionStartTime');
    } else {
      // Fallback if no start time found
      setCompletionTime('0min 0s');
    }

    // Add a small delay for animation effect
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleStartOver = () => {
    clearCart();
    router.push('/');
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 z-50 flex items-center justify-center p-4">
      <div className={`max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-700 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Congratulations! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            You have successfully assembled your cart!
          </p>
          <div className="flex items-center justify-center space-x-2 text-lg text-gray-700">
            <Clock className="w-5 h-5" />
            <span>Completed in <span className="font-semibold text-blue-600">{completionTime}</span></span>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Cart Summary</h2>
          </div>
          
          <div className="space-y-3 mb-6">
            {items.map((item) => {
              const itemDetails = getItemDetails(item.itemId);
              if (!itemDetails) return null;
              
              return (
                <div key={item.itemId} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center space-x-3">
                    <img
                      src={itemDetails.image}
                      alt={itemDetails.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{itemDetails.name}</h3>
                      <p className="text-sm text-gray-500">{itemDetails.weight_or_count}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">€{itemDetails.price_eur.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">Total Items:</span>
              <span className="text-lg font-bold text-blue-600">{items.length}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xl font-bold text-gray-800">Total Price:</span>
              <span className="text-2xl font-bold text-green-600">€{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            onClick={handleStartOver}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Start Over
          </button>
        </div>

        {/* Celebration Animation */}
        <div className="absolute top-4 right-4 text-4xl animate-pulse">🎊</div>
        <div className="absolute bottom-4 left-4 text-3xl animate-bounce">✨</div>
        <div className="absolute top-1/2 left-4 text-2xl animate-spin">🌟</div>
        <div className="absolute top-1/3 right-8 text-3xl animate-pulse">🎉</div>
      </div>
    </div>
  );
}
