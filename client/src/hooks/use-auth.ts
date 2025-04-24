import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth-context';
import { User } from 'firebase/auth';
import { apiRequest } from '@/lib/queryClient';
import { useQuery } from '@tanstack/react-query';

export interface UserProfile {
  id: number;
  email: string;
  displayName: string | null;
  photoUrl: string | null;
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  const { user, loading, hasUsedFreeChat, markFreeChat, resetFreeChat } = context;
  const [token, setToken] = useState<string | null>(null);
  
  // Get the Firebase token when the user changes
  useEffect(() => {
    let isMounted = true;
    
    const getToken = async () => {
      if (user) {
        try {
          const idToken = await user.getIdToken();
          if (isMounted) setToken(idToken);
        } catch (error) {
          console.error('Error getting token:', error);
        }
      } else {
        if (isMounted) setToken(null);
      }
    };
    
    getToken();
    
    return () => {
      isMounted = false;
    };
  }, [user]);
  
  // Get the user profile from the API
  const { data: profile, isLoading: profileLoading, error } = useQuery({
    queryKey: ['/api/me'],
    queryFn: async () => {
      if (!user || !token) return null;
      
      const res = await fetch('/api/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch user profile');
      }
      
      return res.json() as Promise<UserProfile>;
    },
    enabled: !!user && !!token
  });
  
  // Check if the user can use chat (is authenticated or hasn't used free chat yet)
  const canUseChat = !!user || !hasUsedFreeChat;
  
  return {
    user,
    profile,
    token,
    isAuthenticated: !!user,
    isLoading: loading || (!!user && profileLoading),
    error,
    hasUsedFreeChat,
    markFreeChat,
    resetFreeChat,
    canUseChat
  };
}
