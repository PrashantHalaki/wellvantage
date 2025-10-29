import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isGymOwner: boolean;
  onboardingCompleted: boolean;
  phoneNumber: string;
  countryCode: string;
  phoneVerified?: boolean;
  onboarded: boolean;
  role: {
    title: string;
  };
}

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
  completeOnboarding: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem('wellvantage_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signInWithGoogle = async () => {
    // Mock Google sign-in
    const mockUser: User = {
      email: 'user@example.com',
      id: Math.random().toString(36).substr(2, 9),
      firstName: 'John',
      lastName: 'Doe',
      isGymOwner: false,
      onboardingCompleted: false,
      phoneNumber: '',
      countryCode: '+1',
      phoneVerified: false,
      onboarded: false,
      role: {
        title: 'User',
      },
    };

    localStorage.setItem('wellvantage_user', JSON.stringify(mockUser));
    setUser(mockUser);
    navigate('/onboarding');
  };

  const signOut = () => {
    localStorage.removeItem('wellvantage_user');
    setUser(null);
    navigate('/signup');
  };

  const completeOnboarding = () => {
    if (user) {
      const updatedUser = { ...user, onboarded: true };
      localStorage.setItem('wellvantage_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      navigate('/dashboard');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signOut,
        completeOnboarding,
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
