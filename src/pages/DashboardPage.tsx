import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Lock, Check, User, Archive } from 'lucide-react';
import { useShare } from '../contexts/ShareContext';
import { useAuth } from '../contexts/AuthContext';
import ShareTextForm from '../components/Dashboard/ShareTextForm';
import ShareFileForm from '../components/Dashboard/ShareFileForm';
import ShareItemCard from '../components/Dashboard/ShareItemCard';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { userShares, isExpired } = useShare();
  const [activeTab, setActiveTab] = useState<'files' | 'text' | 'upload-file' | 'upload-text'>('files');
  const [showExpired, setShowExpired] = useState(false);

  // Sort shares by creation date (newest first)
  const sortedShares = [...userShares].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Filter shares by type
  const fileShares = sortedShares.filter(share => share.type === 'file' && !isExpired(share));
  const textShares = sortedShares.filter(share => share.type === 'text' && !isExpired(share));
  const expiredShares = sortedShares.filter(share => isExpired(share));

  // Stats
  const stats = [
    {
      label: 'Total Shares',
      value: sortedShares.length,
      icon: <User className="h-7 w-7 text-primary-600" />,
      bg: 'bg-primary-50',
    },
    {
      label: 'Active Shares',
      value: sortedShares.length - expiredShares.length,
      icon: <Check className="h-7 w-7 text-green-600" />,
      bg: 'bg-green-50',
    },
    {
      label: 'File Shares',
      value: fileShares.length,
      icon: <Upload className="h-7 w-7 text-accent-600" />,
      bg: 'bg-accent-50',
    },
    {
      label: 'Text Shares',
      value: textShares.length,
      icon: <FileText className="h-7 w-7 text-secondary-600" />,
      bg: 'bg-secondary-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex flex-col items-center py-0">
      {/* Header */}
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="rounded-b-3xl bg-gradient-to-r from-primary-100 to-blue-100 shadow-md flex flex-col items-center py-10 mb-10">
          <div className="flex items-center gap-4 mb-2">
            <Lock className="h-10 w-10 text-primary-600" />
            <h1 className="text-4xl font-extrabold text-primary-700 tracking-tight">Dashboard</h1>
          </div>
          <p className="text-lg text-gray-600">
            Welcome back, <span className="font-semibold">{user?.name}</span>
          </p>
          {/* <div className="flex gap-4 mt-6">
            <button
              onClick={() => setActiveTab('upload-file')}
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition text-base"
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload File
            </button>
            <button
              onClick={() => setActiveTab('upload-text')}
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-secondary-600 text-white font-semibold shadow hover:bg-secondary-700 transition text-base"
            >
              <FileText className="mr-2 h-5 w-5" />
              Share Text
            </button>
          </div> */}
        </div>
      </div>

      {/* Main Content Card */}
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              className={`rounded-2xl shadow-lg bg-white hover:shadow-xl transition flex items-center gap-5 px-8 py-8 ${stat.bg} border border-gray-100`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.07 }}
            >
              <div className="flex-shrink-0">{stat.icon}</div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-base text-gray-500">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="mb-10 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setActiveTab('files')}
            className={`px-6 py-2 rounded-full font-semibold text-base transition shadow-sm ${
              activeTab === 'files'
                ? 'bg-primary-600 text-white shadow'
                : 'bg-white text-gray-700 hover:bg-primary-50 border border-primary-100'
            }`}
          >
            Your Files
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`px-6 py-2 rounded-full font-semibold text-base transition shadow-sm ${
              activeTab === 'text'
                ? 'bg-secondary-600 text-white shadow'
                : 'bg-white text-gray-700 hover:bg-secondary-50 border border-secondary-100'
            }`}
          >
            Your Texts
          </button>
          <button
            onClick={() => setActiveTab('upload-file')}
            className={`px-6 py-2 rounded-full font-semibold text-base transition shadow-sm ${
              activeTab === 'upload-file'
                ? 'bg-primary-600 text-white shadow'
                : 'bg-white text-gray-700 hover:bg-primary-50 border border-primary-100'
            }`}
          >
            Upload File
          </button>
          <button
            onClick={() => setActiveTab('upload-text')}
            className={`px-6 py-2 rounded-full font-semibold text-base transition shadow-sm ${
              activeTab === 'upload-text'
                ? 'bg-secondary-600 text-white shadow'
                : 'bg-white text-gray-700 hover:bg-secondary-50 border border-secondary-100'
            }`}
          >
            Share Text
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {/* Files Tab */}
          {activeTab === 'files' && (
            <>
              {fileShares.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Upload className="h-20 w-20 text-primary-200 mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">No files shared yet</h3>
                  <p className="text-gray-500 mb-6">Get started by uploading a file.</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setActiveTab('upload-file')}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload a file
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {fileShares.map((share) => (
                    <ShareItemCard key={share.id} share={share} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Text Tab */}
          {activeTab === 'text' && (
            <>
              {textShares.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <FileText className="h-20 w-20 text-secondary-200 mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">No texts shared yet</h3>
                  <p className="text-gray-500 mb-6">Get started by sharing a text.</p>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setActiveTab('upload-text')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Share a text
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {textShares.map((share) => (
                    <ShareItemCard key={share.id} share={share} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Upload File Tab */}
          {activeTab === 'upload-file' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ShareFileForm onSuccess={() => setActiveTab('files')} />
            </motion.div>
          )}

          {/* Share Text Tab */}
          {activeTab === 'upload-text' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ShareTextForm onSuccess={() => setActiveTab('text')} />
            </motion.div>
          )}

          {/* Expired Shares Section */}
          {expiredShares.length > 0 && (
            <div className="mt-14">
              <button
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-base mb-4"
                onClick={() => setShowExpired((v) => !v)}
              >
                <Archive className="h-5 w-5" />
                {showExpired ? 'Hide' : 'Show'} Expired Shares ({expiredShares.length})
              </button>
              {showExpired && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {expiredShares.map((share) => (
                    <ShareItemCard key={share.id} share={share} expired />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;