import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAxios } from '@/hooks/use-axios';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/utils/const';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isGymOwner: boolean;
  phoneNumber?: string;
  countryCode?: string;
  phoneVerified?: boolean;
  onboarded: boolean;
  onboardingData?: Record<string, string | boolean | number | object>;
}

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
  completeOnboarding: (userData: User) => void;
  storeUserData: (userData: User) => void;
  storeAuthToken: (idToken: string) => void;
  sendPhoneOtp: (phoneNumber: string, phoneCode: string) => Promise<boolean>;
  verifyPhoneOtp: (phoneNumber: string, otp: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const axios = useAxios();

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem('wellvantage_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signInWithGoogle = async () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  const storeUserData = (userData: User) => {
    localStorage.setItem('wellvantage_user', JSON.stringify(userData));
    setUser(userData);
  };

  const storeAuthToken = (idToken: string) => {
    localStorage.setItem('id_token', idToken);
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
    navigate('/signup');
  };

  const completeOnboarding = async (userData: User) => {
    if (user) {
      try {
        const updatedUser = { ...userData, onboarded: true };
        await axios.post(`/users/complete-onboarding`);
        storeUserData(updatedUser);
        navigate('/dashboard');
      } catch (err) {
        console.error('Error completing onboarding:', err);
        toast.error('Failed to complete onboarding. Please try again.');
        return;
      }
    }
  };

  const sendPhoneOtp = async (phoneNumber: string, phoneCode: string) => {
    try {
      await axios.post(`/users/send-phone-otp`, { phoneNumber, phoneCode });
      return true;
    } catch (err) {
      console.error('Error sending OTP:', err);
      toast.error('Failed to send OTP. Please try again.');
      return false;
    }
  };

  const verifyPhoneOtp = async (phoneNumber: string, otp: string) => {
    try {
      await axios.post(`/users/verify-phone-otp`, { phoneNumber, otp });
      return true;
    } catch (err) {
      console.error('Error verifying OTP:', err);
      toast.error('Failed to verify OTP. Please try again.');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signOut,
        completeOnboarding,
        storeUserData,
        storeAuthToken,
        sendPhoneOtp,
        verifyPhoneOtp,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
