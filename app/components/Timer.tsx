'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function Timer() {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // Check if we already have a start time in localStorage
    const storedStartTime = localStorage.getItem('chatSessionStartTime');
    let startTime: number;

    if (storedStartTime) {
      // Use existing start time
      startTime = parseInt(storedStartTime);
    } else {
      // Create new start time and store it
      startTime = Date.now();
      localStorage.setItem('chatSessionStartTime', startTime.toString());
    }
    
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = Math.floor((currentTime - startTime) / 1000);
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800">
      <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
        {formatTime(elapsedTime)}
      </span>
    </div>
  );
}
