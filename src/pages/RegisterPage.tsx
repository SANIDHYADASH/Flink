import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const success = await register(name, email, password);

      if (success) {
        navigate('/dashboard');
      } else {
        setError('Email already in use');
      }
    } catch (err) {
      setError('Failed to create an account');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md px-5 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">
        Create account
      </h2>
      <p className="text-gray-500 mb-5 text-center text-sm">
        Start sharing securely with Fynk
      </p>
      {error && (
        <div className="mb-3 bg-red-50 border-l-4 border-red-400 p-3 rounded">
          <p className="text-xs text-red-700">{error}</p>
        </div>
      )}
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-medium text-gray-700 mb-0.5"
          >
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-gray-700 mb-0.5"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-medium text-gray-700 mb-0.5"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-xs font-medium text-gray-700 mb-0.5"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-3 w-full py-1.5 px-4 rounded-md bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow transition disabled:opacity-50 text-sm"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-200" />
        <span className="mx-2 text-gray-400 text-xs">or</span>
        <div className="flex-grow border-t border-gray-200" />
      </div>
      <div className="text-center">
        <span className="text-gray-600 text-xs">Already have an account?</span>
        <Link
          to="/login"
          className="ml-1 text-primary-600 font-medium hover:underline text-xs"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;