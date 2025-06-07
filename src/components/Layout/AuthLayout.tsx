import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const AuthLayout: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-100 min-h-screen">
      <div className="flex w-[92vw] max-w-4xl shadow-2xl rounded-3xl overflow-hidden bg-white">
        {/* Illustration panel (hidden on mobile) */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-primary-600 to-blue-500 text-white p-6">
          <Lock className="h-12 w-12 mb-3" />
          <h2 className="text-2xl font-extrabold mb-1">Welcome Back!</h2>
          <p className="text-sm opacity-90 mb-4 text-center">
            Securely share files and text with Flink.
          </p>
          {/* Inline SVG illustration */}
          <svg className="w-auto max-w-[11rem] h-24 text-gray-800 dark:text-white" aria-hidden="true" width="610" height="524" viewBox="0 0 610 524" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* ...existing SVG content... */}
          </svg>
        </div>
        {/* Auth form panel */}
        <motion.div
          className="flex-1 flex flex-col justify-center px-4 py-6 md:px-8"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col items-center mb-4">
            <Link to="/" className="flex items-center gap-2">
              <Lock className="h-8 w-8 text-primary-600" />
              <span className="text-lg font-bold text-primary-700 tracking-tight">Flink</span>
            </Link>
          </div>
          <div className="w-full max-w-sm mx-auto">
            <Outlet />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;