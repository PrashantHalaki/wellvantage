import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from '@/types';
import { useAxios } from '@/hooks/use-axios';
import { clearSessionToken } from '@/utils/getToken';

import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
  verifyPhone: (code: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const axios = useAxios();

  //Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('sessionId');

        if (!savedUser || !token) {
          setUser(null);
          clearSessionToken();
          return;
        }

        const userData = JSON.parse(savedUser);
        const userId = userData?.id;

        if (!userId) {
          setUser(null);
          clearSessionToken();
          return;
        }
        setUser(userData as User);
      } catch (err) {
        console.error('Auth check failed:', err);
        setUser(null);
        clearSessionToken();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    await axios.get('signout', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('sessionId')}`,
      },
    });
    toast.success('You have been successfully logged out.');
    clearSessionToken();
    setUser(null);
    navigate('/');
    localStorage.clear();
  };

  const verifyPhone = async (code: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('verify-phone', { code });

      if (user && response.status === 200) {
        const updatedUser = { ...user, phoneVerified: true } as User;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Phone verification failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated: !!user?.id,
    user,
    logout,
    verifyPhone,
    isLoading,
    error,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
