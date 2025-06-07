import React from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Lock className="h-6 w-6 text-primary-600" />
            <span className="ml-2 text-lg font-bold text-gray-900">Flink</span>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <Link to="/access" className="text-sm text-gray-500 hover:text-gray-700">
              Access Content
            </Link>
            <Link to="/register" className="text-sm text-gray-500 hover:text-gray-700">
              Sign Up
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
          &copy; {currentYear} Flink. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;