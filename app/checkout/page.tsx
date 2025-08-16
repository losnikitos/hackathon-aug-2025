'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../contexts/CartContext';
import { CheckCircle, Clock, ShoppingBag, ArrowLeft, Star, Trophy } from 'lucide-react';

// Perfect cart items (apples, sugar, salt, butter, flour, cinnamon)
const PERFECT_CART_IDS = [4, 3, 6, 7, 2, 5];

// Calculate edit distance between two arrays
function calculateEditDistance(arr1: number[], arr2: number[]): number {
  const m = arr1.length;
  const n = arr2.length;
  
  // Create a 2D array for dynamic programming
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  // Initialize first row and column
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }
  
  // Fill the dp table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // deletion
          dp[i][j - 1],     // insertion
          dp[i - 1][j - 1]  // substitution
        );
      }
    }
  }
  
  return dp[m][n];
}

// Calculate cart score based on edit distance
function calculateCartScore(cartItemIds: number[]): { score: number; maxScore: number; percentage: number; grade: string } {
  const maxScore = PERFECT_CART_IDS.length;
  const editDistance = calculateEditDistance(cartItemIds, PERFECT_CART_IDS);
  const score = Math.max(0, maxScore - editDistance);
  const percentage = Math.round((score / maxScore) * 100);
  
  let grade = 'F';
  if (percentage >= 90) grade = 'A+';
  else if (percentage >= 80) grade = 'A';
  else if (percentage >= 70) grade = 'B';
  else if (percentage >= 60) grade = 'C';
  else if (percentage >= 50) grade = 'D';
  
  return { score, maxScore, percentage, grade };
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, totalPrice, getItemDetails } = useCart();
  const [completionTime, setCompletionTime] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Calculate cart score
  const cartItemIds = items.map(item => item.itemId);
  const cartScore = calculateCartScore(cartItemIds);

  useEffect(() => {
    // Read start time from localStorage and calculate completion time
    const storedStartTime = localStorage.getItem('chatSessionStartTime');
    console.log('Checkout: Retrieved chatSessionStartTime:', storedStartTime);
    
    if (storedStartTime) {
      const startTime = parseInt(storedStartTime);
      const endTime = Date.now();
      const timeDiff = endTime - startTime;
      const minutes = Math.floor(timeDiff / 60000);
      const seconds = Math.floor((timeDiff % 60000) / 1000);
      const calculatedTime = `${minutes}min ${seconds}s`;
      console.log('Checkout: Calculated completion time:', calculatedTime);
      setCompletionTime(calculatedTime);
      
      // Clear the stored start time
      localStorage.removeItem('chatSessionStartTime');
      console.log('Checkout: Cleared chatSessionStartTime');
    } else {
      // Fallback if no start time found
      console.log('Checkout: No start time found, using fallback');
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
    <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 z-50 flex items-center justify-center p-4">
      <div className={`max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-700 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Congratulations! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            You have successfully assembled your cart!
          </p>
        </div>

        {/* Completion Time */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border-2 border-blue-200">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Clock className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Completion Time</h2>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
              {completionTime}
            </div>
            <div className="text-lg text-gray-600">
              Time to assemble your cart
            </div>
          </div>
        </div>

        {/* Cart Score */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-8 border-2 border-yellow-200">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Trophy className="w-8 h-8 text-yellow-600" />
            <h2 className="text-2xl font-bold text-gray-800">Cart Score</h2>
          </div>
          
          <div className="text-center mb-4">
            <div className="text-6xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">
              {cartScore.grade}
            </div>
            <div className="text-2xl font-semibold text-gray-700 mb-2">
              {cartScore.score}/{cartScore.maxScore} items correct
            </div>
            <div className="text-lg text-gray-600">
              {cartScore.percentage}% accuracy
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000"
              style={{ width: `${cartScore.percentage}%` }}
            ></div>
          </div>
          
          {/* Perfect cart info */}
          <div className="text-center text-sm text-gray-600">
            <p className="font-medium mb-1">Perfect cart contains:</p>
            <p className="text-xs">Apples, Sugar, Salt, Butter, Flour, Cinnamon</p>
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
              
              const isPerfectItem = PERFECT_CART_IDS.includes(item.itemId);
              
              return (
                <div key={item.itemId} className={`flex items-center justify-between p-3 rounded-lg shadow-sm ${
                  isPerfectItem ? 'bg-green-50 border border-green-200' : 'bg-white'
                }`}>
                  <div className="flex items-center space-x-3">
                    <img
                      src={itemDetails.image}
                      alt={itemDetails.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">{itemDetails.name}</h3>
                        {isPerfectItem && <Star className="w-4 h-4 text-green-500 fill-current" />}
                      </div>
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
            className="flex-1 flex justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Start Over
          </button>
        </div>

        {/* Celebration Animation */}
        <div className="absolute top-4 right-4 text-4xl animate-pulse">🎊</div>
        <div className="absolute bottom-4 left-4 text-3xl animate-spin">✨</div>
        <div className="absolute top-1/2 left-4 text-2xl animate-spin">🌟</div>
        <div className="absolute top-1/3 right-8 text-3xl animate-pulse">🎉</div>
      </div>
    </div>
  );
}
