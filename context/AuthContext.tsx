import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (isNewUser: boolean) => void;
  logout: () => void;
  saveUserProfile: (userData: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (isNewUser: boolean) => {
    try {
      const newUser: User = { isNewUser };
      setUser(newUser);
      await AsyncStorage.setItem("user", JSON.stringify(newUser)); // 🔑 Save immediately
    } catch (error) {
      console.error("Error saving login state:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const saveUserProfile = async (userData: Partial<User>) => {
    try {
      const updatedUser = { ...user, ...userData, isNewUser: false };
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    saveUserProfile,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};