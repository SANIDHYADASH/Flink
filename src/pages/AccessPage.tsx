import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, AlertCircle, Lock, Download, Eye, FileText, File } from 'lucide-react';
import { useShare, ShareItem } from '../contexts/ShareContext';
import { supabase } from '../lib/supabase';
import CryptoJS from 'crypto-js';

const AccessPage: React.FC = () => {
  const { code } = useParams<{ code?: string }>();
  const navigate = useNavigate();
  const { getShareByCode, incrementDownload } = useShare();
  
  const [accessCode, setAccessCode] = useState(code || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [share, setShare] = useState<ShareItem | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if a share exists with the given code on mount
  useEffect(() => {
    if (code) {
      handleSearchShare();
    }
  }, [code]);

  // Handle search for share
  const handleSearchShare = async () => {
    if (!accessCode || accessCode.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const foundShare = await getShareByCode(accessCode);
      
      if (!foundShare) {
        setError('Invalid code or content has expired');
        setShare(null);
        setIsAuthenticated(false);
      } else {
        setShare(foundShare);
        // If no password is required, authenticate immediately
        if (!foundShare.hasPassword) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching the content');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press for access code input
  const handleAccessCodeKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchShare();
    }
  };

  // Handle Enter key press for password input
  const handlePasswordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handlePasswordSubmit(e as any);
    }
  };

  // Handle password submission
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!share) return;
    
    if (!password) {
      setError('Please enter the password');
      return;
    }
    
    try {
      // Get the share from database to verify password hash
      const { data, error } = await supabase
        .from('shares')
        .select('password_hash')
        .eq('access_code', share.accessCode)
        .single();

      if (error || !data) {
        setError('Failed to verify password');
        return;
      }

      const hashedInput = CryptoJS.SHA256(password).toString();
      const isValid = data.password_hash === hashedInput;
      
      if (isValid) {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Incorrect password');
      }
    } catch (error) {
      console.error('Password verification error:', error);
      setError('Failed to verify password');
    }
  };

  // Handle download file
  const handleDownload = async () => {
    if (!share || share.type !== 'file') return;
    
    try {
      // For files stored in Supabase Storage, the content is the public URL
      const link = document.createElement('a');
      link.href = share.content;
      link.download = share.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      await incrementDownload(share.id);
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to download the file');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Access Shared Content
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        {!share && (
          <motion.div
            className="bg-white shadow rounded-lg overflow-hidden max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Enter 6-digit access code
              </h2>
              
              {error && (
                <div className="mb-4 bg-error-50 text-error-700 p-3 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  className="input code-input flex-grow"
                  placeholder="000000"
                  maxLength={6}
                  value={accessCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setAccessCode(value);
                  }}
                  onKeyPress={handleAccessCodeKeyPress}
                  autoFocus
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSearchShare}
                  disabled={isLoading}
                >
                  {isLoading ? 'Searching...' : 'Access'}
                  {!isLoading && <Search className="ml-2 h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to search for the access code
              </p>
            </div>
          </motion.div>
        )}
        
        {/* Password Form */}
        {share && !isAuthenticated && (
          <motion.div
            className="bg-white shadow rounded-lg overflow-hidden max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-8">
              <div className="flex items-center mb-4">
                <Lock className="h-5 w-5 text-primary-600 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">
                  Password Protected Content
                </h2>
              </div>
              
              <p className="text-gray-500 mb-4">
                This content is protected with a password. Please enter the password to access it.
              </p>
              
              {error && (
                <div className="mb-4 bg-error-50 text-error-700 p-3 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-4">
                  <label htmlFor="password" className="label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handlePasswordKeyPress}
                    placeholder="Enter password"
                    autoFocus
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Press Enter to unlock content
                  </p>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShare(null);
                      setAccessCode('');
                      navigate('/access');
                    }}
                  >
                    Go Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Unlock Content
                    <Lock className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
        
        {/* Content Display - Full Width */}
        {share && isAuthenticated && (
          <motion.div
            className="bg-white shadow rounded-lg overflow-hidden w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {share.type === 'text' ? (
                    <FileText className="h-6 w-6 text-primary-600 mr-3" />
                  ) : (
                    <File className="h-6 w-6 text-primary-600 mr-3" />
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {share.title || share.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {share.type === 'file' ? 'File' : 'Text'} • Access Code: {share.accessCode}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {share.type === 'file' && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleDownload}
                    >
                      Download
                      <Download className="ml-2 h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShare(null);
                      setAccessCode('');
                      setIsAuthenticated(false);
                      navigate('/access');
                    }}
                  >
                    New Access
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full">
              {share.type === 'text' ? (
                <div className="p-6 w-full">
                  <div 
                    className="prose prose-lg max-w-none w-full"
                    dangerouslySetInnerHTML={{ __html: share.content }}
                    style={{
                      width: '100%',
                      maxWidth: 'none'
                    }}
                  />
                </div>
              ) : (
                <div className="p-6 w-full">
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <File className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {share.title || share.name}
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {share.fileType || 'File'} • {formatFileSize(share.size || 0)}
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      onClick={handleDownload}
                    >
                      Download File
                      <Download className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default AccessPage;