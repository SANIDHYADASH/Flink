import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertCircle } from 'lucide-react';
import { useShare } from '../../contexts/ShareContext';
import RichTextEditor from './RichTextEditor';

interface ShareTextFormProps {
  onSuccess: () => void;
  editShare?: any;
  showNeverExpireOption?: boolean;
  prefillData?: any;
}

const ShareTextForm: React.FC<ShareTextFormProps> = ({ 
  onSuccess, 
  editShare, 
  showNeverExpireOption = false, 
  prefillData 
}) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [expiresInDays, setExpiresInDays] = useState(7);
  const [usePassword, setUsePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successShare, setSuccessShare] = useState<{ accessCode: string } | null>(null);
  
  const { createTextShare, updateShare } = useShare();

  // Prefill form data when editing
  useEffect(() => {
    if (editShare || prefillData) {
      const data = editShare || prefillData;
      setName(data.title || data.name || '');
      setText(data.content || '');
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      setError('Please enter a name for this text');
      return;
    }
    
    if (!text || text.trim() === '<p><br></p>' || text.trim() === '') {
      setError('Please enter some text to share');
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
        // Update existing share
        const updatedData = {
          ...editShare,
          name,
          content: text,
          hasPassword: usePassword,
          password: usePassword ? password : undefined,
          expiresAt: expiresInDays === -1 ? 'never' : new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString(),
        };
        share = await updateShare(editShare.id, updatedData);
      } else {
        // Create new share
        share = await createTextShare(
          text,
          name,
          expiresInDays,
          usePassword ? password : undefined
        );
      }
      
      setSuccessShare(share);
      setTimeout(() => {
        onSuccess();
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(editShare ? 'Failed to update the text' : 'Failed to share the text');
    } finally {
      setIsSubmitting(false);
    }
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
          {editShare ? 'Edit Text Share' : 'Share Text'}
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
              {editShare ? 'Text Updated Successfully!' : 'Text Shared Successfully!'}
            </h3>
            <p className="mb-2">
              {editShare 
                ? 'Your text has been updated successfully.'
                : 'Your text has been shared with the following access code:'
              }
            </p>
            {!editShare && (
              <div className="bg-white p-3 rounded border border-success-200 text-center mb-2">
                <span className="text-2xl font-bold tracking-wider">{successShare.accessCode}</span>
              </div>
            )}
            <p className="text-sm">
              {editShare 
                ? 'Redirecting to your shared texts...'
                : 'Anyone with this code can access your text. Redirecting to your shared texts...'
              }
            </p>
          </div>
        )}
        
        {!successShare && (
          <form onSubmit={handleSubmit}>
            {/* Text Name */}
            <div className="mb-4">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="input"
                placeholder="Give your text a name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
              />
            </div>
            
            {/* Rich Text Content */}
            <div className="mb-4">
              <label className="label">
                Content
              </label>
              <RichTextEditor
                value={text}
                onChange={setText}
                placeholder="Enter the text you want to share with rich formatting..."
              />
            </div>
            
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
                  : (editShare ? 'Update Text' : 'Share Text')
                }
                {!isSubmitting && <FileText className="ml-2 h-4 w-4" />}
              </button>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default ShareTextForm;