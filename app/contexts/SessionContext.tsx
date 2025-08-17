'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface SessionContextType {
  sessionStartTime: number | null;
  sessionDuration: number | null;
  formattedDuration: string;
  startSession: () => void;
  endSession: () => void;
  isSessionActive: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [sessionDuration, setSessionDuration] = useState<number | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const pathname = usePathname();

  // Format duration as "Xmin Ys"
  const formattedDuration = sessionDuration 
    ? `${Math.floor(sessionDuration / 60000)}min ${Math.floor((sessionDuration % 60000) / 1000)}s`
    : '';

  const startSession = useCallback(() => {
    const startTime = Date.now();
    setSessionStartTime(startTime);
    setIsSessionActive(true);
    setSessionDuration(null);
    
    // Store in localStorage for persistence across page refreshes
    localStorage.setItem('sessionStartTime', startTime.toString());
    
    console.log('[Session] Session started at:', new Date(startTime).toISOString());
  }, []);

  const endSession = useCallback(() => {
    if (sessionStartTime) {
      const endTime = Date.now();
      const duration = endTime - sessionStartTime;
      
      setSessionDuration(duration);
      setIsSessionActive(false);
      
      // Clear localStorage
      localStorage.removeItem('sessionStartTime');
      
      console.log('[Session] Session ended. Duration:', formattedDuration);
    }
  }, [sessionStartTime, formattedDuration]);

  // Initialize session from localStorage on mount
  useEffect(() => {
    const storedStartTime = localStorage.getItem('sessionStartTime');
    if (storedStartTime) {
      const startTime = parseInt(storedStartTime);
      setSessionStartTime(startTime);
      setIsSessionActive(true);
      console.log('[Session] Restored session from localStorage, started at:', new Date(startTime).toISOString());
    }
  }, []);

  // Handle route changes
  useEffect(() => {
    // Start session when user visits /chat or /shop
    if (pathname === '/chat' || pathname === '/shop') {
      if (!isSessionActive) {
        startSession();
      }
    }
    
    // End session when user visits /checkout
    if (pathname === '/checkout') {
      if (isSessionActive) {
        endSession();
      }
    }
  }, [pathname, isSessionActive, startSession, endSession]);

  return (
    <SessionContext.Provider value={{
      sessionStartTime,
      sessionDuration,
      formattedDuration,
      startSession,
      endSession,
      isSessionActive
    }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
