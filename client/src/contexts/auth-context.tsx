import { createContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  hasUsedFreeChat: boolean;
  markFreeChat: () => void;
  resetFreeChat: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasUsedFreeChat, setHasUsedFreeChat] = useState<boolean>(() => {
    const savedValue = localStorage.getItem('hasUsedFreeChat');
    return savedValue ? JSON.parse(savedValue) : false;
  });

  // Mark that the user has used their free chat
  const markFreeChat = () => {
    setHasUsedFreeChat(true);
    localStorage.setItem('hasUsedFreeChat', JSON.stringify(true));
  };

  // Reset free chat usage (useful for testing or when needed)
  const resetFreeChat = () => {
    setHasUsedFreeChat(false);
    localStorage.setItem('hasUsedFreeChat', JSON.stringify(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      
      // If user logs in, reset the free chat usage
      if (firebaseUser) {
        resetFreeChat();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      hasUsedFreeChat, 
      markFreeChat,
      resetFreeChat
    }}>
      {children}
    </AuthContext.Provider>
  );
}
