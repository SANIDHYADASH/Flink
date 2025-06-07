import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Lock, Menu, X, User, LogOut, FileText, Upload } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="container-xl">
        <div className="flex justify-between h-14">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Lock className="h-6 w-6 text-primary-600" />
              <span className="ml-2 text-lg font-bold text-gray-900">Fynk</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
              Home
            </Link>
            <Link to="/access" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
              Access Content
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
                  Dashboard
                </Link>
                <button
                  className="btn btn-primary"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">
                  Log in
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="sm:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/access" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Access Content
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-error-600 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar