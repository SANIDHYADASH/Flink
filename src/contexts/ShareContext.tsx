import React, { createContext, useContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { format, addDays, isAfter } from 'date-fns';
import CryptoJS from 'crypto-js';
import { useAuth } from './AuthContext';

// Types
export interface ShareItem {
  id: string;
  userId: string;
  type: 'file' | 'text';
  name: string;
  title?: string;
  content: string;
  fileType?: string;
  size?: number;
  accessCode: string;
  hasPassword: boolean;
  password?: string;
  expiresAt: string;
  createdAt: string;
  downloadCount: number;
}

interface ShareContextType {
  shares: ShareItem[];
  userShares: ShareItem[];
  loading: boolean;
  getShareByCode: (code: string) => ShareItem | null;
  createTextShare: (text: string, name: string, expiresInDays: number, password?: string) => Promise<ShareItem>;
  createFileShare: (file: File, expiresInDays: number, password?: string, title?: string) => Promise<ShareItem>;
  updateShare: (id: string, updatedData: Partial<ShareItem>) => Promise<ShareItem>;
  verifySharePassword: (share: ShareItem, password: string) => boolean;
  deleteShare: (id: string) => void;
  incrementDownload: (id: string) => void;
  isExpired: (share: ShareItem) => boolean;
}

// Generate a 6-digit code
const generate6DigitCode = (): string => {
  // Generate a random number between 100000 and 999999
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create context with default values
const ShareContext = createContext<ShareContextType>({
  shares: [],
  userShares: [],
  loading: true,
  getShareByCode: () => null,
  createTextShare: async () => ({} as ShareItem),
  createFileShare: async () => ({} as ShareItem),
  updateShare: async () => ({} as ShareItem),
  verifySharePassword: () => false,
  deleteShare: () => {},
  incrementDownload: () => {},
  isExpired: () => false,
});

// Custom hook to use the share context
export const useShare = () => useContext(ShareContext);

// Provider component
export const ShareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shares, setShares] = useState<ShareItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load shares from localStorage on mount
  useEffect(() => {
    try {
      const storedShares = localStorage.getItem('shares');
      if (storedShares) {
        setShares(JSON.parse(storedShares));
      }
    } catch (error) {
      console.error('Failed to load shares:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save shares to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('shares', JSON.stringify(shares));
    }
  }, [shares, loading]);

  // Filter shares for the current user
  const userShares = user 
    ? shares.filter(share => share.userId === user.id)
    : [];

  // Check if a share is expired
  const isExpired = (share: ShareItem): boolean => {
    if (share.expiresAt === 'never') return false;
    return isAfter(new Date(), new Date(share.expiresAt));
  };

  // Get a share by its access code
  const getShareByCode = (code: string): ShareItem | null => {
    const share = shares.find(s => s.accessCode === code);
    if (!share) return null;
    if (isExpired(share)) return null;
    return share;
  };

  // Create a text share
  const createTextShare = async (
    text: string, 
    name: string, 
    expiresInDays: number, 
    password?: string
  ): Promise<ShareItem> => {
    if (!user) throw new Error('User must be logged in');

    // Generate a unique access code
    let accessCode = generate6DigitCode();
    while (shares.some(s => s.accessCode === accessCode)) {
      accessCode = generate6DigitCode();
    }

    const hasPassword = !!password;
    
    const newShare: ShareItem = {
      id: nanoid(),
      userId: user.id,
      type: 'text',
      name,
      content: text,
      accessCode,
      hasPassword,
      password: hasPassword ? password : undefined,
      expiresAt: expiresInDays === -1 ? 'never' : addDays(new Date(), expiresInDays).toISOString(),
      createdAt: new Date().toISOString(),
      downloadCount: 0,
    };

    setShares(prev => [...prev, newShare]);
    return newShare;
  };

  // Create a file share
  const createFileShare = async (
    file: File, 
    expiresInDays: number, 
    password?: string,
    title?: string
  ): Promise<ShareItem> => {
    if (!user) throw new Error('User must be logged in');

    // Read the file as a base64 string
    const fileContent = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    // Generate a unique access code
    let accessCode = generate6DigitCode();
    while (shares.some(s => s.accessCode === accessCode)) {
      accessCode = generate6DigitCode();
    }

    const hasPassword = !!password;
    
    const newShare: ShareItem = {
      id: nanoid(),
      userId: user.id,
      type: 'file',
      name: file.name,
      title: title || file.name,
      content: fileContent,
      fileType: file.type,
      size: file.size,
      accessCode,
      hasPassword,
      password: hasPassword ? password : undefined,
      expiresAt: expiresInDays === -1 ? 'never' : addDays(new Date(), expiresInDays).toISOString(),
      createdAt: new Date().toISOString(),
      downloadCount: 0,
    };

    setShares(prev => [...prev, newShare]);
    return newShare;
  };

  // Update a share
  const updateShare = async (id: string, updatedData: Partial<ShareItem>): Promise<ShareItem> => {
    if (!user) throw new Error('User must be logged in');

    setShares(prev => 
      prev.map(share => 
        share.id === id && share.userId === user.id
          ? { ...share, ...updatedData }
          : share
      )
    );

    const updatedShare = shares.find(s => s.id === id);
    if (!updatedShare) throw new Error('Share not found');
    
    return { ...updatedShare, ...updatedData };
  };

  // Verify a share's password
  const verifySharePassword = (share: ShareItem, password: string): boolean => {
    if (!share.hasPassword) return true;
    return share.password === password;
  };

  // Delete a share
  const deleteShare = (id: string): void => {
    setShares(prev => prev.filter(share => share.id !== id));
  };

  // Increment download count
  const incrementDownload = (id: string): void => {
    setShares(prev => 
      prev.map(share => 
        share.id === id 
          ? { ...share, downloadCount: share.downloadCount + 1 } 
          : share
      )
    );
  };

  const value = {
    shares,
    userShares,
    loading,
    getShareByCode,
    createTextShare,
    createFileShare,
    updateShare,
    verifySharePassword,
    deleteShare,
    incrementDownload,
    isExpired,
  };

  return <ShareContext.Provider value={value}>{children}</ShareContext.Provider>;
};