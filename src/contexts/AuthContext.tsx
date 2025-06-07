import React, { createContext, useContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

// Types
interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isAuthenticated: false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to restore auth state:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo: Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => 
        u.email === email && u.password === password
      );
      
      if (!foundUser) {
        return false;
      }
      
      // Create user object (without password)
      const userObj = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      };
      
      // Save to state and localStorage
      setUser(userObj);
      localStorage.setItem('user', JSON.stringify(userObj));
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo: Check if email already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some((u: any) => u.email === email);
      
      if (userExists) {
        return false;
      }
      
      // Create new user
      const newUser = {
        id: nanoid(),
        name,
        email,
        password, // In a real app, this would be hashed
        createdAt: new Date().toISOString(),
      };
      
      // Save to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Log user in
      const userObj = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };
      
      setUser(userObj);
      localStorage.setItem('user', JSON.stringify(userObj));
      
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};