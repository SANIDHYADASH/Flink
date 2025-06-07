import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertCircle } from 'lucide-react';
import { useShare } from '../../contexts/ShareContext';

interface ShareTextFormProps {
  onSuccess: () => void;
}

const ShareTextForm: React.FC<ShareTextFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [expiresInDays, setExpiresInDays] = useState(7);
  const [usePassword, setUsePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successShare, setSuccessShare] = useState<{ accessCode: string } | null>(null);
  
  const { createTextShare } = useShare();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      setError('Please enter a name for this text');
      return;
    }
    
    if (!text) {
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
      
      const share = await createTextShare(
        text,
        name,
        expiresInDays,
        usePassword ? password : undefined
      );
      
      setSuccessShare(share);
      setTimeout(() => {
        onSuccess();
      }, 3000);
    } catch (err) {
      console.error(err);
      setError('Failed to share the text');
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
          Share Text
        </h2>
        
        {error && (
          <div className="mb-4 bg-error-50 text-error-700 p-3 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        
        {successShare && (
          <div className="mb-4 bg-success-50 text-success-700 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">Text Shared Successfully!</h3>
            <p className="mb-2">Your text has been shared with the following access code:</p>
            <div className="bg-white p-3 rounded border border-success-200 text-center mb-2">
              <span className="text-2xl font-bold tracking-wider">{successShare.accessCode}</span>
            </div>
            <p className="text-sm">
              Anyone with this code can access your text. Redirecting to your shared texts...
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
            
            {/* Text Content */}
            <div className="mb-4">
              <label htmlFor="text" className="label">
                Content
              </label>
              <textarea
                id="text"
                className="input h-32"
                placeholder="Enter the text you want to share"
                value={text}
                onChange={(e) => setText(e.target.value)}
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
                {isSubmitting ? 'Sharing...' : 'Share Text'}
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