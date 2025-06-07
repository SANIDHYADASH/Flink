import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div 
        className="sm:mx-auto sm:w-full sm:max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <AlertCircle className="mx-auto h-16 w-16 text-error-500" />
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
          404 - Page Not Found
        </h1>
        <p className="mt-2 text-base text-gray-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="btn btn-primary"
          >
            Go back home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;