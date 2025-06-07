import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format, formatDistanceToNow } from 'date-fns';
import { File, FileText, Copy, Trash2, Lock, Clock, Eye, Download } from 'lucide-react';
import { useShare, ShareItem } from '../../contexts/ShareContext';

interface ShareItemCardProps {
  share: ShareItem;
}

const ShareItemCard: React.FC<ShareItemCardProps> = ({ share }) => {
  const { deleteShare, isExpired } = useShare();
  const [copied, setCopied] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  
  const expired = isExpired(share);
  
  // Handle copy access code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(share.accessCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Handle delete
  const handleDelete = () => {
    deleteShare(share.id);
    setShowConfirmDelete(false);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy');
  };
  
  // Get relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <motion.div
      className={`card ${expired ? 'opacity-75' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center">
            {share.type === 'file' ? (
              <File className="h-5 w-5 text-primary-600 mr-2" />
            ) : (
              <FileText className="h-5 w-5 text-primary-600 mr-2" />
            )}
            <h3 className="text-base font-medium text-gray-900 truncate max-w-[180px]">
              {share.name}
            </h3>
          </div>
          
          {expired ? (
            <span className="badge bg-gray-100 text-gray-800">
              Expired
            </span>
          ) : (
            <span className="badge bg-green-100 text-green-800">
              Active
            </span>
          )}
        </div>
        
        <div className="text-sm text-gray-500 mb-3">
          Created {getRelativeTime(share.createdAt)}
        </div>
        
        <div className="flex items-center mb-4 text-sm">
          <Clock className="h-4 w-4 text-gray-400 mr-1" />
          <span className="text-gray-600">
            {expired ? 'Expired' : `Expires ${getRelativeTime(share.expiresAt)}`}
          </span>
        </div>
        
        <div className="flex items-center mb-4 text-sm space-x-4">
          {share.hasPassword && (
            <div className="flex items-center">
              <Lock className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-gray-600">Password protected</span>
            </div>
          )}
          
          <div className="flex items-center">
            <Eye className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-gray-600">{share.downloadCount} {share.downloadCount === 1 ? 'view' : 'views'}</span>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded p-2 mb-4 flex items-center justify-between">
          <div className="font-mono text-sm font-bold tracking-wider text-gray-700">
            {share.accessCode}
          </div>
          <button
            type="button"
            className={`text-gray-500 hover:text-gray-700 ${copied ? 'text-green-500' : ''}`}
            onClick={handleCopyCode}
            disabled={expired}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        
        <div className="flex justify-between">
          {!showConfirmDelete ? (
            <button
              type="button"
              className="btn btn-secondary text-sm px-3 py-1"
              onClick={() => setShowConfirmDelete(true)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                type="button"
                className="btn btn-danger text-sm px-3 py-1"
                onClick={handleDelete}
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-secondary text-sm px-3 py-1"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Check component for using in the ShareItemCard
const Check = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default ShareItemCard;