import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const success = await login(email, password);

      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Failed to log in');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md px-5 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">Sign in</h2>
      <p className="text-gray-500 mb-5 text-center text-sm">Access your Flink account</p>
      {error && (
        <div className="mb-3 bg-red-50 border-l-4 border-red-400 p-3 rounded">
          <p className="text-xs text-red-700">{error}</p>
        </div>
      )}
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-0.5">
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
          <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-0.5">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-900">
              Remember me
            </label>
          </div>
          <div className="text-xs">
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              Forgot password?
            </a>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-3 w-full py-1.5 px-4 rounded-md bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow transition disabled:opacity-50 text-sm"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-200" />
        <span className="mx-2 text-gray-400 text-xs">or</span>
        <div className="flex-grow border-t border-gray-200" />
      </div>
      <div className="text-center">
        <span className="text-gray-600 text-xs">Don't have an account?</span>
        <Link
          to="/register"
          className="ml-1 text-primary-600 font-medium hover:underline text-xs"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;