import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  FileText, 
  Upload, 
  Clock, 
  Key, 
  Shield, 
  Database, 
  Code, 
  Settings,
  Users,
  Zap,
  Globe,
  CheckCircle,
  AlertTriangle,
  Info,
  ExternalLink
} from 'lucide-react';

const DocsPage: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Lock className="h-12 w-12 mr-3" />
              <h1 className="text-4xl font-bold">Flink Documentation</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Complete guide to using Flink - The NextGen File and Text Sharing Platform
            </p>
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-50 border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto py-4">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'features', label: 'Features' },
              { id: 'getting-started', label: 'Getting Started' },
              { id: 'user-guide', label: 'User Guide' },
              { id: 'architecture', label: 'Architecture' },
              { id: 'security', label: 'Security' },
              { id: 'api', label: 'API Reference' },
              { id: 'deployment', label: 'Deployment' },
              { id: 'troubleshooting', label: 'Troubleshooting' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-gray-600 hover:text-primary-600 whitespace-nowrap py-2 border-b-2 border-transparent hover:border-primary-600 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#overview" className="text-primary-600 hover:text-primary-700">Overview</a></li>
                  <li><a href="#features" className="text-primary-600 hover:text-primary-700">Key Features</a></li>
                  <li><a href="#getting-started" className="text-primary-600 hover:text-primary-700">Getting Started</a></li>
                  <li><a href="#user-guide" className="text-primary-600 hover:text-primary-700">User Guide</a></li>
                  <li><a href="#architecture" className="text-primary-600 hover:text-primary-700">Architecture</a></li>
                  <li><a href="#security" className="text-primary-600 hover:text-primary-700">Security</a></li>
                  <li><a href="#api" className="text-primary-600 hover:text-primary-700">API Reference</a></li>
                  <li><a href="#deployment" className="text-primary-600 hover:text-primary-700">Deployment</a></li>
                  <li><a href="#troubleshooting" className="text-primary-600 hover:text-primary-700">Troubleshooting</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 prose prose-lg max-w-none">
            {/* Overview Section */}
            <section id="overview" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Info className="h-8 w-8 text-primary-600 mr-3" />
                Overview
              </h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>Flink</strong> is a modern, secure, and responsive web application for sharing files and text snippets with others using simple 6-digit sharing codes. Built with cutting-edge technologies, Flink provides a seamless experience for uploading, sharing, and managing your files and texts with enterprise-grade security features.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Built With</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• React 18.3.1 - Modern UI Framework</li>
                    <li>• TypeScript 5.5.3 - Type Safety</li>
                    <li>• Supabase - Backend as a Service</li>
                    <li>• Tailwind CSS 3.4.0 - Styling</li>
                    <li>• Vite 5.4.2 - Build Tool</li>
                  </ul>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Stats</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 6-digit access codes for easy sharing</li>
                    <li>• Password protection available</li>
                    <li>• Custom expiration dates</li>
                    <li>• File size limit: 10MB</li>
                    <li>• Rich text editor with formatting</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Zap className="h-8 w-8 text-primary-600 mr-3" />
                Key Features
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-primary-600 mr-3" />
                    <h3 className="text-lg font-semibold">Secure Authentication</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Email/password authentication with Supabase Auth, session management, and protected routes.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Upload className="h-6 w-6 text-primary-600 mr-3" />
                    <h3 className="text-lg font-semibold">File Sharing</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Upload and share files with automatic 6-digit code generation and secure storage.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <FileText className="h-6 w-6 text-primary-600 mr-3" />
                    <h3 className="text-lg font-semibold">Rich Text Sharing</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Share formatted text with full WYSIWYG editor support and preserved formatting.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Key className="h-6 w-6 text-primary-600 mr-3" />
                    <h3 className="text-lg font-semibold">Password Protection</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Optional password protection for sensitive content with SHA256 encryption.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Clock className="h-6 w-6 text-primary-600 mr-3" />
                    <h3 className="text-lg font-semibold">Expiration Control</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Set custom expiration dates (1, 3, 7, 14, 30 days) or never-expire options.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Globe className="h-6 w-6 text-primary-600 mr-3" />
                    <h3 className="text-lg font-semibold">Public Access</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Share content without requiring recipients to sign up or create accounts.</p>
                </div>
              </div>
            </section>

            {/* Getting Started Section */}
            <section id="getting-started" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="h-8 w-8 text-primary-600 mr-3" />
                Getting Started
              </h2>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Prerequisites</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Node.js (v18 or higher)</li>
                        <li>npm or yarn package manager</li>
                        <li>Supabase account (free tier available)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Installation Steps</h3>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Clone the Repository</h4>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
                    <code>git clone https://github.com/SANIDHYADASH/flink.git{'\n'}cd flink</code>
                  </pre>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Install Dependencies</h4>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
                    <code>npm install{'\n'}# or{'\n'}yarn install</code>
                  </pre>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Set up Supabase</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 mb-4">
                    <li>Create a new project at <a href="https://supabase.com" className="text-primary-600 hover:text-primary-700">supabase.com</a></li>
                    <li>Copy your project URL and anon key</li>
                    <li>Run the migration scripts in your Supabase SQL editor</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">4. Configure Environment Variables</h4>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
                    <code>cp .env.example .env</code>
                  </pre>
                  <p className="text-sm text-gray-600 mt-2">Update .env with your Supabase credentials:</p>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto mt-2">
                    <code>VITE_SUPABASE_URL=your-supabase-url{'\n'}VITE_SUPABASE_ANON_KEY=your-supabase-anon-key</code>
                  </pre>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">5. Start Development Server</h4>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
                    <code>npm run dev{'\n'}# or{'\n'}yarn dev</code>
                  </pre>
                  <p className="text-sm text-gray-600 mt-2">Navigate to <code className="bg-gray-200 px-1 rounded">http://localhost:5173</code></p>
                </div>
              </div>
            </section>

            {/* User Guide Section */}
            <section id="user-guide" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="h-8 w-8 text-primary-600 mr-3" />
                User Guide
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">For Content Creators</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        Registration & Login
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>Create an account with email and password</li>
                        <li>Login to access your personal dashboard</li>
                        <li>Secure session management with automatic token refresh</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Upload className="h-5 w-5 text-blue-500 mr-2" />
                        Sharing Files
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>Click "ADD NEW" → "Share File"</li>
                        <li>Upload any file type (max 10MB)</li>
                        <li>Add optional title and password protection</li>
                        <li>Set expiration date or choose "Never Expire"</li>
                        <li>Get a unique 6-digit access code</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <FileText className="h-5 w-5 text-purple-500 mr-2" />
                        Sharing Text
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>Click "ADD NEW" → "Share Text"</li>
                        <li>Use the rich text editor with formatting options</li>
                        <li>Add titles, headers, lists, code blocks, and more</li>
                        <li>Set password protection and expiration</li>
                        <li>Get a unique 6-digit access code</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Settings className="h-5 w-5 text-gray-500 mr-2" />
                        Managing Shares
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>View all shares in a responsive dashboard</li>
                        <li>Search and filter by title or content</li>
                        <li>Edit existing shares (update content, settings)</li>
                        <li>Delete shares with automatic cleanup</li>
                        <li>Track download/access statistics</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">For Recipients</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Globe className="h-5 w-5 text-green-500 mr-2" />
                        Accessing Content
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>No account required</li>
                        <li>Enter the 6-digit code provided by the sender</li>
                        <li>Enter password if the content is protected</li>
                        <li>View text content or download files</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <FileText className="h-5 w-5 text-blue-500 mr-2" />
                        Content Display
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li><strong>Text:</strong> Full-width rich text display with formatting</li>
                        <li><strong>Files:</strong> File preview with download button</li>
                        <li><strong>Security:</strong> Automatic expiration handling</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Architecture Section */}
            <section id="architecture" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Database className="h-8 w-8 text-primary-600 mr-3" />
                Architecture
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Technology Stack</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technology</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Frontend</td><td className="px-6 py-4 text-sm text-gray-500">React</td><td className="px-6 py-4 text-sm text-gray-500">18.3.1</td><td className="px-6 py-4 text-sm text-gray-500">UI Framework</td></tr>
                        <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Language</td><td className="px-6 py-4 text-sm text-gray-500">TypeScript</td><td className="px-6 py-4 text-sm text-gray-500">5.5.3</td><td className="px-6 py-4 text-sm text-gray-500">Type Safety</td></tr>
                        <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Styling</td><td className="px-6 py-4 text-sm text-gray-500">Tailwind CSS</td><td className="px-6 py-4 text-sm text-gray-500">3.4.0</td><td className="px-6 py-4 text-sm text-gray-500">Utility-first CSS</td></tr>
                        <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Build Tool</td><td className="px-6 py-4 text-sm text-gray-500">Vite</td><td className="px-6 py-4 text-sm text-gray-500">5.4.2</td><td className="px-6 py-4 text-sm text-gray-500">Fast Development & Build</td></tr>
                        <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Backend</td><td className="px-6 py-4 text-sm text-gray-500">Supabase</td><td className="px-6 py-4 text-sm text-gray-500">Latest</td><td className="px-6 py-4 text-sm text-gray-500">Database, Auth, Storage</td></tr>
                        <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Routing</td><td className="px-6 py-4 text-sm text-gray-500">React Router</td><td className="px-6 py-4 text-sm text-gray-500">6.22.3</td><td className="px-6 py-4 text-sm text-gray-500">Client-side Routing</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Database Schema</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">shares Table</h4>
                    <p className="text-sm text-gray-600 mb-4">The core table that stores all shared files and text content:</p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Field</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-sm">
                          <tr><td className="px-4 py-2 font-mono">id</td><td className="px-4 py-2">UUID</td><td className="px-4 py-2">Primary key, auto-generated</td></tr>
                          <tr><td className="px-4 py-2 font-mono">user_id</td><td className="px-4 py-2">UUID</td><td className="px-4 py-2">Foreign key to auth.users</td></tr>
                          <tr><td className="px-4 py-2 font-mono">type</td><td className="px-4 py-2">TEXT</td><td className="px-4 py-2">Either 'file' or 'text'</td></tr>
                          <tr><td className="px-4 py-2 font-mono">name</td><td className="px-4 py-2">TEXT</td><td className="px-4 py-2">Original filename or text title</td></tr>
                          <tr><td className="px-4 py-2 font-mono">access_code</td><td className="px-4 py-2">TEXT</td><td className="px-4 py-2">6-digit unique access code</td></tr>
                          <tr><td className="px-4 py-2 font-mono">has_password</td><td className="px-4 py-2">BOOLEAN</td><td className="px-4 py-2">Password protection flag</td></tr>
                          <tr><td className="px-4 py-2 font-mono">expires_at</td><td className="px-4 py-2">TIMESTAMPTZ</td><td className="px-4 py-2">Expiration date (null = never)</td></tr>
                          <tr><td className="px-4 py-2 font-mono">download_count</td><td className="px-4 py-2">INTEGER</td><td className="px-4 py-2">Access/download counter</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Security Section */}
            <section id="security" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="h-8 w-8 text-primary-600 mr-3" />
                Security Features
              </h2>

              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Authentication</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    <li><strong>Supabase Auth</strong> - Industry-standard authentication</li>
                    <li><strong>Email/Password</strong> - Secure credential-based login</li>
                    <li><strong>Session Management</strong> - Automatic token refresh and validation</li>
                    <li><strong>Protected Routes</strong> - Route-level authentication guards</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Protection</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    <li><strong>Row Level Security (RLS)</strong> - Database-level access control</li>
                    <li><strong>Password Hashing</strong> - SHA256 encryption for password-protected shares</li>
                    <li><strong>Secure File Storage</strong> - Supabase Storage with proper access policies</li>
                    <li><strong>Input Validation</strong> - Client and server-side validation</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Access Control</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    <li><strong>User Isolation</strong> - Users can only access their own shares</li>
                    <li><strong>Public Access</strong> - Controlled public access via access codes</li>
                    <li><strong>Expiration Management</strong> - Automatic content expiration</li>
                    <li><strong>Download Tracking</strong> - Monitor access patterns</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* API Reference Section */}
            <section id="api" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Code className="h-8 w-8 text-primary-600 mr-3" />
                API Reference
              </h2>

              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">ShareContext Methods</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded p-4">
                      <h4 className="font-mono text-sm font-semibold text-gray-900 mb-2">createTextShare(text, name, expiresInDays, password?)</h4>
                      <p className="text-sm text-gray-600 mb-2">Creates a new text share with rich formatting.</p>
                      <div className="text-xs text-gray-500">
                        <p><strong>Parameters:</strong></p>
                        <ul className="list-disc list-inside ml-4">
                          <li><code>text</code> (string): Rich HTML content</li>
                          <li><code>name</code> (string): Share title</li>
                          <li><code>expiresInDays</code> (number): Expiration in days (-1 for never)</li>
                          <li><code>password</code> (string, optional): Protection password</li>
                        </ul>
                        <p className="mt-2"><strong>Returns:</strong> Promise&lt;ShareItem&gt;</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded p-4">
                      <h4 className="font-mono text-sm font-semibold text-gray-900 mb-2">createFileShare(file, expiresInDays, password?, title?)</h4>
                      <p className="text-sm text-gray-600 mb-2">Creates a new file share with upload to storage.</p>
                      <div className="text-xs text-gray-500">
                        <p><strong>Parameters:</strong></p>
                        <ul className="list-disc list-inside ml-4">
                          <li><code>file</code> (File): File object to upload</li>
                          <li><code>expiresInDays</code> (number): Expiration in days (-1 for never)</li>
                          <li><code>password</code> (string, optional): Protection password</li>
                          <li><code>title</code> (string, optional): Custom title</li>
                        </ul>
                        <p className="mt-2"><strong>Returns:</strong> Promise&lt;ShareItem&gt;</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded p-4">
                      <h4 className="font-mono text-sm font-semibold text-gray-900 mb-2">getShareByCode(code)</h4>
                      <p className="text-sm text-gray-600 mb-2">Retrieves a share by its access code.</p>
                      <div className="text-xs text-gray-500">
                        <p><strong>Parameters:</strong></p>
                        <ul className="list-disc list-inside ml-4">
                          <li><code>code</code> (string): 6-digit access code</li>
                        </ul>
                        <p className="mt-2"><strong>Returns:</strong> Promise&lt;ShareItem | null&gt;</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Deployment Section */}
            <section id="deployment" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Globe className="h-8 w-8 text-primary-600 mr-3" />
                Deployment
              </h2>

              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Build for Production</h3>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
                    <code>npm run build{'\n'}# or{'\n'}yarn build</code>
                  </pre>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Deployment Options</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Vercel (Recommended)</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                        <li>Connect your GitHub repository</li>
                        <li>Set environment variables in Vercel dashboard</li>
                        <li>Deploy automatically on push</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Netlify</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                        <li>Build the project locally</li>
                        <li>Upload dist folder to Netlify</li>
                        <li>Configure environment variables</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Other Platforms</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>Firebase Hosting</li>
                        <li>AWS S3 + CloudFront</li>
                        <li>GitHub Pages</li>
                        <li>Surge.sh</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Environment Setup</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>Ensure your production environment has:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>Correct Supabase URL and keys</li>
                          <li>HTTPS enabled (required for Supabase)</li>
                          <li>Proper CORS configuration</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Troubleshooting Section */}
            <section id="troubleshooting" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="h-8 w-8 text-primary-600 mr-3" />
                Troubleshooting
              </h2>

              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Issues</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">1. Supabase Connection Error</h4>
                      <div className="bg-red-50 border border-red-200 rounded p-3 mb-2">
                        <code className="text-sm text-red-700">Error: Missing Supabase environment variables</code>
                      </div>
                      <p className="text-sm text-gray-600"><strong>Solution:</strong> Ensure .env file has correct VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">2. File Upload Fails</h4>
                      <div className="bg-red-50 border border-red-200 rounded p-3 mb-2">
                        <code className="text-sm text-red-700">Error: Failed to upload file</code>
                      </div>
                      <p className="text-sm text-gray-600"><strong>Solutions:</strong></p>
                      <ul className="list-disc list-inside text-sm text-gray-600 ml-4">
                        <li>Check file size (max 10MB)</li>
                        <li>Verify storage bucket permissions</li>
                        <li>Ensure user is authenticated</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">3. Access Code Not Working</h4>
                      <div className="bg-red-50 border border-red-200 rounded p-3 mb-2">
                        <code className="text-sm text-red-700">Error: Invalid code or content has expired</code>
                      </div>
                      <p className="text-sm text-gray-600"><strong>Solutions:</strong></p>
                      <ul className="list-disc list-inside text-sm text-gray-600 ml-4">
                        <li>Verify code is exactly 6 digits</li>
                        <li>Check if content has expired</li>
                        <li>Ensure share exists in database</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">4. Rich Text Editor Issues</h4>
                      <div className="bg-red-50 border border-red-200 rounded p-3 mb-2">
                        <code className="text-sm text-red-700">Error: Quill editor not loading</code>
                      </div>
                      <p className="text-sm text-gray-600"><strong>Solutions:</strong></p>
                      <ul className="list-disc list-inside text-sm text-gray-600 ml-4">
                        <li>Clear browser cache</li>
                        <li>Check for JavaScript errors</li>
                        <li>Verify React Quill installation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Debug Mode</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>Enable debug logging by adding to your .env:</p>
                        <pre className="bg-blue-100 p-2 rounded mt-2 text-xs">
                          <code>VITE_DEBUG=true</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Getting Help</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>📧 Email:</strong>{' '}
                      <a href="mailto:sanidhyadash32@gmail.com" className="text-primary-600 hover:text-primary-700">
                        sanidhyadash32@gmail.com
                      </a>
                    </p>
                    <p>
                      <strong>🐛 Issues:</strong>{' '}
                      <a
                        href="https://github.com/SANIDHYADASH/flink/issues"
                        className="text-primary-600 hover:text-primary-700 inline-flex items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub Issues <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-8 mt-16">
              <div className="text-center text-sm text-gray-500">
                <p>Made with ❤️ by Sanidhya</p>
                <p className="mt-2">
                  <a href="https://github.com/SANIDHYADASH/flink" className="text-primary-600 hover:text-primary-700 inline-flex items-center">
                    ⭐ Star us on GitHub <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;