import React, { createContext, useContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { format, addDays, isAfter } from 'date-fns';
import CryptoJS from 'crypto-js';
import { supabase } from '../lib/supabase';
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
  filePath?: string;
}

interface ShareContextType {
  shares: ShareItem[];
  userShares: ShareItem[];
  loading: boolean;
  getShareByCode: (code: string) => Promise<ShareItem | null>;
  createTextShare: (text: string, name: string, expiresInDays: number, password?: string) => Promise<ShareItem>;
  createFileShare: (file: File, expiresInDays: number, password?: string, title?: string) => Promise<ShareItem>;
  updateShare: (id: string, updatedData: Partial<ShareItem>) => Promise<ShareItem>;
  verifySharePassword: (share: ShareItem, password: string) => boolean;
  deleteShare: (id: string) => Promise<void>;
  incrementDownload: (id: string) => Promise<void>;
  isExpired: (share: ShareItem) => boolean;
  refreshShares: () => Promise<void>;
}

// Generate a 6-digit code
const generate6DigitCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Hash password
const hashPassword = (password: string): string => {
  return CryptoJS.SHA256(password).toString();
};

// Create context with default values
const ShareContext = createContext<ShareContextType>({
  shares: [],
  userShares: [],
  loading: true,
  getShareByCode: async () => null,
  createTextShare: async () => ({} as ShareItem),
  createFileShare: async () => ({} as ShareItem),
  updateShare: async () => ({} as ShareItem),
  verifySharePassword: () => false,
  deleteShare: async () => {},
  incrementDownload: async () => {},
  isExpired: () => false,
  refreshShares: async () => {},
});

// Custom hook to use the share context
export const useShare = () => useContext(ShareContext);

// Provider component
export const ShareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shares, setShares] = useState<ShareItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Convert database row to ShareItem
  const dbRowToShareItem = (row: any): ShareItem => ({
    id: row.id,
    userId: row.user_id,
    type: row.type,
    name: row.name,
    title: row.title,
    content: row.content,
    fileType: row.file_type,
    size: row.file_size,
    accessCode: row.access_code,
    hasPassword: row.has_password,
    expiresAt: row.expires_at || 'never',
    createdAt: row.created_at,
    downloadCount: row.download_count,
    filePath: row.file_path,
  });

  // Load user shares from Supabase
  const loadUserShares = async () => {
    if (!user) {
      setShares([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('shares')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const shareItems = data.map(dbRowToShareItem);
      setShares(shareItems);
    } catch (error) {
      console.error('Failed to load shares:', error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh shares
  const refreshShares = async () => {
    await loadUserShares();
  };

  // Load shares when user changes
  useEffect(() => {
    loadUserShares();
  }, [user]);

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
  const getShareByCode = async (code: string): Promise<ShareItem | null> => {
    try {
      const { data, error } = await supabase
        .from('shares')
        .select('*')
        .eq('access_code', code)
        .single();

      if (error || !data) return null;

      const share = dbRowToShareItem(data);
      if (isExpired(share)) return null;
      
      return share;
    } catch (error) {
      console.error('Failed to get share by code:', error);
      return null;
    }
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
    let codeExists = true;
    
    while (codeExists) {
      const { data } = await supabase
        .from('shares')
        .select('id')
        .eq('access_code', accessCode)
        .single();
      
      if (!data) {
        codeExists = false;
      } else {
        accessCode = generate6DigitCode();
      }
    }

    const hasPassword = !!password;
    const passwordHash = hasPassword ? hashPassword(password) : null;
    const expiresAt = expiresInDays === -1 ? null : addDays(new Date(), expiresInDays).toISOString();

    const shareData = {
      user_id: user.id,
      type: 'text' as const,
      name,
      title: name,
      content: text,
      access_code: accessCode,
      has_password: hasPassword,
      password_hash: passwordHash,
      expires_at: expiresAt,
    };

    const { data, error } = await supabase
      .from('shares')
      .insert(shareData)
      .select()
      .single();

    if (error) throw error;

    const newShare = dbRowToShareItem(data);
    setShares(prev => [newShare, ...prev]);
    
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

    // Generate a unique access code
    let accessCode = generate6DigitCode();
    let codeExists = true;
    
    while (codeExists) {
      const { data } = await supabase
        .from('shares')
        .select('id')
        .eq('access_code', accessCode)
        .single();
      
      if (!data) {
        codeExists = false;
      } else {
        accessCode = generate6DigitCode();
      }
    }

    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${nanoid()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('shares')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Get public URL for the file
    const { data: { publicUrl } } = supabase.storage
      .from('shares')
      .getPublicUrl(fileName);

    const hasPassword = !!password;
    const passwordHash = hasPassword ? hashPassword(password) : null;
    const expiresAt = expiresInDays === -1 ? null : addDays(new Date(), expiresInDays).toISOString();

    const shareData = {
      user_id: user.id,
      type: 'file' as const,
      name: file.name,
      title: title || file.name,
      content: publicUrl, // Store the public URL as content
      file_type: file.type,
      file_size: file.size,
      access_code: accessCode,
      has_password: hasPassword,
      password_hash: passwordHash,
      expires_at: expiresAt,
      file_path: fileName,
    };

    const { data, error } = await supabase
      .from('shares')
      .insert(shareData)
      .select()
      .single();

    if (error) {
      // Clean up uploaded file if database insert fails
      await supabase.storage.from('shares').remove([fileName]);
      throw error;
    }

    const newShare = dbRowToShareItem(data);
    setShares(prev => [newShare, ...prev]);
    
    return newShare;
  };

  // Update a share
  const updateShare = async (id: string, updatedData: Partial<ShareItem>): Promise<ShareItem> => {
    if (!user) throw new Error('User must be logged in');

    const updatePayload: any = {};
    
    if (updatedData.name) updatePayload.name = updatedData.name;
    if (updatedData.title) updatePayload.title = updatedData.title;
    if (updatedData.content) updatePayload.content = updatedData.content;
    if (updatedData.hasPassword !== undefined) updatePayload.has_password = updatedData.hasPassword;
    if (updatedData.password) updatePayload.password_hash = hashPassword(updatedData.password);
    if (updatedData.expiresAt) {
      updatePayload.expires_at = updatedData.expiresAt === 'never' ? null : updatedData.expiresAt;
    }

    const { data, error } = await supabase
      .from('shares')
      .update(updatePayload)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;

    const updatedShare = dbRowToShareItem(data);
    setShares(prev => 
      prev.map(share => 
        share.id === id ? updatedShare : share
      )
    );

    return updatedShare;
  };

  // Verify a share's password
  const verifySharePassword = (share: ShareItem, password: string): boolean => {
    if (!share.hasPassword) return true;
    
    // For shares from database, we need to compare with the stored hash
    // For backward compatibility, we'll also check direct password comparison
    const hashedInput = hashPassword(password);
    return share.password === hashedInput || share.password === password;
  };

  // Delete a share
  const deleteShare = async (id: string): Promise<void> => {
    if (!user) throw new Error('User must be logged in');

    // Get the share to check if it has a file to delete
    const shareToDelete = shares.find(s => s.id === id);
    
    const { error } = await supabase
      .from('shares')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;

    // Delete file from storage if it exists
    if (shareToDelete?.filePath) {
      await supabase.storage
        .from('shares')
        .remove([shareToDelete.filePath]);
    }

    setShares(prev => prev.filter(share => share.id !== id));
  };

  // Increment download count
  const incrementDownload = async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('shares')
        .update({ download_count: supabase.sql`download_count + 1` })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setShares(prev => 
        prev.map(share => 
          share.id === id 
            ? { ...share, downloadCount: share.downloadCount + 1 } 
            : share
        )
      );
    } catch (error) {
      console.error('Failed to increment download count:', error);
    }
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
    refreshShares,
  };

  return <ShareContext.Provider value={value}>{children}</ShareContext.Provider>;
};