import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, FileText, Upload, Clock, Key, Copy, FileCode, Shield } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 h-full w-full" aria-hidden="true">
          <div className="relative h-full">
            <svg
              className="absolute right-full transform translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect x="0" y="0" width="4" height="4" className="text-gray-100" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="784" fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)" />
            </svg>
            <svg
              className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="d2a68204-c383-44b1-b99f-42ccff4e5365"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect x="0" y="0" width="4" height="4" className="text-gray-100" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="784" fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)" />
            </svg>
          </div>
        </div>

        <div className="relative pt-6 pb-16 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-16 mx-auto max-w-3xl"
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Secure File & Text</span>
                  <span className="block text-primary-600">Sharing Made Simple</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  <strong>The NextGen File and Text Sharing Platform.</strong><br/><br></br>
                  Share files and text securely with 6-digit access codes. Add password protection and set expiration dates for complete control over your shared content.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <Link
                    to="/register"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/access"
                    className="mt-3 sm:mt-0 sm:ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm"
                  >
                    Access Content
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex flex-col" aria-hidden="true">
            <div className="flex-1" />
            <div className="flex-1 w-full bg-gray-50" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.img
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-lg shadow-lg"
              src="https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Share securely dashboard"
            />
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">Features</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
              Simple, Secure, and Fast
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Share your files and text securely with anyone, anywhere, without requiring them to sign up.
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <motion.div
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-sm h-full border border-gray-100">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary-600 rounded-md shadow-lg">
                        <Shield className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">6-Digit Access Codes</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Every upload automatically generates a unique 6-digit code that can be easily shared and remembered.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-sm h-full border border-gray-100">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary-600 rounded-md shadow-lg">
                        <Key className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Password Protection</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Add an extra layer of security with optional password protection for your shared content.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-sm h-full border border-gray-100">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary-600 rounded-md shadow-lg">
                        <Clock className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Expiration Control</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Set custom expiration dates to ensure your shared content is only available for as long as needed.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-sm h-full border border-gray-100">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary-600 rounded-md shadow-lg">
                        <FileText className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Text Sharing</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Share code snippets, notes, or any text content quickly and securely with formatting preserved.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-sm h-full border border-gray-100">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary-600 rounded-md shadow-lg">
                        <Upload className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">File Sharing</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Upload and share files of any type with automatic 6-digit code generation for easy access.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-sm h-full border border-gray-100">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary-600 rounded-md shadow-lg">
                        <Copy className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Easy Sharing</h3>
                    <p className="mt-5 text-base text-gray-500">
                      One-click copy for sharing links and access codes, making it simple to share with anyone.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to share?</span>
                  <span className="block">Start sharing today.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-white">
                  Sign up for free and start sharing your files and text securely with our easy-to-use platform.
                </p>
                <Link
                  to="/register"
                  className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-primary-600 hover:bg-gray-50"
                >
                  Sign up for free
                </Link>
              </div>
            </div>
            <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
              <img
                className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                src="https://images.pexels.com/photos/4068314/pexels-photo-4068314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="App screenshot"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;