import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, AlertCircle, X, File } from 'lucide-react';
import { useShare } from '../../contexts/ShareContext';

interface ShareFileFormProps {
  onSuccess: () => void;
  editShare?: any;
  showNeverExpireOption?: boolean;
  showTitleField?: boolean;
  prefillData?: any;
}

const ShareFileForm: React.FC<ShareFileFormProps> = ({ 
  onSuccess, 
  editShare, 
  showNeverExpireOption = false, 
  showTitleField = false, 
  prefillData 
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [expiresInDays, setExpiresInDays] = useState(7);
  const [usePassword, setUsePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successShare, setSuccessShare] = useState<{ accessCode: string } | null>(null);
  const [showFileUpload, setShowFileUpload] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createFileShare, updateShare } = useShare();

  // Prefill form data when editing
  useEffect(() => {
    if (editShare || prefillData) {
      const data = editShare || prefillData;
      setTitle(data.title || data.name || '');
      setUsePassword(data.hasPassword || false);
      setPassword(data.password || '');
      
      // Handle expiry
      if (data.expiry === 'never' || data.expiresAt === 'never') {
        setExpiresInDays(-1); // -1 represents never expire
      } else if (data.expiresAt || data.expiry) {
        const expiryDate = new Date(data.expiresAt || data.expiry);
        const now = new Date();
        const diffTime = expiryDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 1) setExpiresInDays(1);
        else if (diffDays <= 3) setExpiresInDays(3);
        else if (diffDays <= 7) setExpiresInDays(7);
        else if (diffDays <= 14) setExpiresInDays(14);
        else if (diffDays <= 30) setExpiresInDays(30);
        else setExpiresInDays(30);
      }
    }
  }, [editShare, prefillData]);

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      if (!title && showTitleField) {
        setTitle(droppedFile.name);
      }
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (!title && showTitleField) {
        setTitle(selectedFile.name);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editShare && !file) {
      setError('Please select a file to share');
      return;
    }
    
    if (editShare && showFileUpload && !file) {
      setError('Please select a new file to upload');
      return;
    }
    
    if (usePassword && !password) {
      setError('Please enter a password or disable password protection');
      return;
    }
    
    try {
      setError('');
      setIsSubmitting(true);
      
      let share;
      
      if (editShare) {
        if (showFileUpload && file) {
          // Create new share with new file (replace existing)
          share = await createFileShare(
            file,
            expiresInDays,
            usePassword ? password : undefined,
            title || file.name
          );
          // Note: In a real app, you'd want to delete the old share after creating the new one
        } else {
          // Update existing share metadata only
          const updatedData = {
            ...editShare,
            title: title || editShare.name,
            hasPassword: usePassword,
            password: usePassword ? password : undefined,
            expiresAt: expiresInDays === -1 ? 'never' : new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString(),
          };
          share = await updateShare(editShare.id, updatedData);
        }
      } else {
        // Create new share
        share = await createFileShare(
          file!,
          expiresInDays,
          usePassword ? password : undefined,
          title || file!.name
        );
      }
      
      setSuccessShare(share);
      setTimeout(() => {
        onSuccess();
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(editShare ? 'Failed to update the file' : 'Failed to share the file');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <motion.div
      className="bg-white shadow rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {editShare ? 'Edit File Share' : 'Share a File'}
        </h2>
        
        {error && (
          <div className="mb-4 bg-error-50 text-error-700 p-3 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        
        {successShare && (
          <div className="mb-4 bg-success-50 text-success-700 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">
              {editShare ? 'File Updated Successfully!' : 'File Shared Successfully!'}
            </h3>
            <p className="mb-2">
              {editShare 
                ? 'Your file has been updated successfully.'
                : 'Your file has been shared with the following access code:'
              }
            </p>
            {!editShare && (
              <div className="bg-white p-3 rounded border border-success-200 text-center mb-2">
                <span className="text-2xl font-bold tracking-wider">{successShare.accessCode}</span>
              </div>
            )}
            <p className="text-sm">
              {editShare 
                ? 'Redirecting to your shared files...'
                : 'Anyone with this code can access your file. Redirecting to your shared files...'
              }
            </p>
          </div>
        )}
        
        {!successShare && (
          <form onSubmit={handleSubmit}>
            {/* Title Field */}
            {showTitleField && (
              <div className="mb-4">
                <label htmlFor="title\" className="label">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="input"
                  placeholder="Enter a title for your file"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  If left empty, the file name will be used as the title
                </p>
              </div>
            )}

            {/* Current File Display (for editing) */}
            {editShare && !showFileUpload && (
              <div className="mb-4">
                <label className="label">
                  Current File
                </label>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                  <div className="flex-shrink-0 mr-3">
                    <File className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {editShare.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {editShare.fileType || 'File'} • {formatFileSize(editShare.size || 0)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="ml-4 text-primary-600 hover:text-primary-700 text-sm font-medium"
                    onClick={() => setShowFileUpload(true)}
                  >
                    Replace File
                  </button>
                </div>
              </div>
            )}

            {/* File Upload Area */}
            {(!editShare || showFileUpload) && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="label">
                    {editShare ? 'New File' : 'File'}
                  </label>
                  {editShare && showFileUpload && (
                    <button
                      type="button"
                      className="text-sm text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        setShowFileUpload(false);
                        setFile(null);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
                
                {!file ? (
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                      isDragging
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-primary-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-600">
                      Drag and drop a file here, or click to select a file
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Max file size: 10MB
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                    <div className="flex-shrink-0 mr-3">
                      <File className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {file.type || 'Unknown type'} • {formatFileSize(file.size)}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="ml-4 text-gray-400 hover:text-gray-500"
                      onClick={() => setFile(null)}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Expiration */}
            <div className="mb-4">
              <label htmlFor="expiresInDays" className="label">
                Expires After
              </label>
              <select
                id="expiresInDays"
                className="input"
                value={expiresInDays}
                onChange={(e) => setExpiresInDays(parseInt(e.target.value))}
              >
                <option value={1}>1 day</option>
                <option value={3}>3 days</option>
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
                <option value={30}>30 days</option>
                {showNeverExpireOption && <option value={-1}>Never</option>}
              </select>
            </div>
            
            {/* Password Protection */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <input
                  id="usePassword"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={usePassword}
                  onChange={(e) => setUsePassword(e.target.checked)}
                />
                <label htmlFor="usePassword" className="ml-2 block text-sm text-gray-900">
                  Password Protect
                </label>
              </div>
              
              {usePassword && (
                <div className="mt-2">
                  <input
                    type="password"
                    className="input"
                    placeholder="Enter a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? (editShare ? 'Updating...' : 'Sharing...') 
                  : (editShare ? 'Update File' : 'Share File')
                }
                {!isSubmitting && <Upload className="ml-2 h-4 w-4" />}
              </button>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default ShareFileForm;