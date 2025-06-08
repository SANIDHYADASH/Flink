import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, AlertCircle, ArrowLeft } from 'lucide-react';
import { useShare } from '../contexts/ShareContext';
import { useAuth } from '../contexts/AuthContext';
import RichTextEditor from '../components/Dashboard/RichTextEditor';

const ShareTextPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { createTextShare, updateShare } = useShare();

  // Get edit data from URL params if editing
  const editId = searchParams.get('edit');
  const editData = editId ? JSON.parse(decodeURIComponent(searchParams.get('data') || '{}')) : null;

  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [expiresInDays, setExpiresInDays] = useState(7);
  const [usePassword, setUsePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successShare, setSuccessShare] = useState<{ accessCode: string } | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Prefill form data when editing
  useEffect(() => {
    if (editData) {
      setName(editData.title || editData.name || '');
      setText(editData.content || '');
      setUsePassword(editData.hasPassword || false);
      setPassword(editData.password || '');
      
      // Handle expiry
      if (editData.expiry === 'never' || editData.expiresAt === 'never') {
        setExpiresInDays(-1); // -1 represents never expire
      } else if (editData.expiresAt || editData.expiry) {
        const expiryDate = new Date(editData.expiresAt || editData.expiry);
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
  }, [editData]);

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
      
      if (editData) {
        // Update existing share
        const updatedData = {
          ...editData,
          name,
          content: text,
          hasPassword: usePassword,
          password: usePassword ? password : undefined,
          expiresAt: expiresInDays === -1 ? 'never' : new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString(),
        };
        share = await updateShare(editData.id, updatedData);
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
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(editData ? 'Failed to update the text' : 'Failed to share the text');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                {editData ? 'Edit Text Share' : 'Share Text'}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="bg-white shadow rounded-lg overflow-hidden w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 py-8 w-full">
            {error && (
              <div className="mb-6 bg-error-50 text-error-700 p-4 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            
            {successShare && (
              <div className="mb-6 bg-success-50 text-success-700 p-6 rounded-md">
                <h3 className="text-lg font-medium mb-2">
                  {editData ? 'Text Updated Successfully!' : 'Text Shared Successfully!'}
                </h3>
                <p className="mb-2">
                  {editData 
                    ? 'Your text has been updated successfully.'
                    : 'Your text has been shared with the following access code:'
                  }
                </p>
                {!editData && (
                  <div className="bg-white p-4 rounded border border-success-200 text-center mb-3 max-w-md mx-auto">
                    <span className="text-2xl font-bold tracking-wider">{successShare.accessCode}</span>
                  </div>
                )}
                <p className="text-sm">
                  {editData 
                    ? 'Redirecting to your dashboard...'
                    : 'Anyone with this code can access your text. Redirecting to your dashboard...'
                  }
                </p>
              </div>
            )}
            
            {!successShare && (
              <form onSubmit={handleSubmit} className="space-y-6 w-full">
                {/* Text Name - Full Width */}
                <div className="w-full">
                  <label htmlFor="name" className="label">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="input w-full"
                    placeholder="Give your text a name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                  />
                </div>
                
                {/* Rich Text Content - Full Width */}
                <div className="w-full">
                  <label className="label mb-3">
                    Content
                  </label>
                  <div className="mb-16 w-full">
                    <RichTextEditor
                      value={text}
                      onChange={setText}
                      placeholder="Enter the text you want to share with rich formatting..."
                      className="min-h-[400px] w-full"
                    />
                  </div>
                </div>
                
                {/* Form Controls Row - Full Width */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                  {/* Expiration */}
                  <div className="w-full">
                    <label htmlFor="expiresInDays" className="label">
                      Expires After
                    </label>
                    <select
                      id="expiresInDays"
                      className="input w-full"
                      value={expiresInDays}
                      onChange={(e) => setExpiresInDays(parseInt(e.target.value))}
                    >
                      <option value={1}>1 day</option>
                      <option value={3}>3 days</option>
                      <option value={7}>7 days</option>
                      <option value={14}>14 days</option>
                      <option value={30}>30 days</option>
                      <option value={-1}>Never</option>
                    </select>
                  </div>
                  
                  {/* Password Protection */}
                  <div className="w-full">
                    <div className="flex items-center mb-3">
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
                      <input
                        type="password"
                        className="input w-full"
                        placeholder="Enter a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    )}
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t border-gray-200 w-full">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-8"
                    disabled={isSubmitting}
                  >
                    {isSubmitting 
                      ? (editData ? 'Updating...' : 'Sharing...') 
                      : (editData ? 'Update Text' : 'Share Text')
                    }
                    {!isSubmitting && <FileText className="ml-2 h-5 w-5" />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShareTextPage;