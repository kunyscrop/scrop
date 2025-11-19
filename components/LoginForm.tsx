import React, { useState } from 'react';
import { login } from '../services/authService';
import type { User } from '../types';

interface LoginFormProps {
  onAuthSuccess: (user: User) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onAuthSuccess }) => {
  const [handleOrEmail, setHandleOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(handleOrEmail, password);
      onAuthSuccess(user);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="handleOrEmail" className="block text-sm font-medium text-text_secondary">Handle or Email</label>
        <input
          id="handleOrEmail"
          type="text"
          value={handleOrEmail}
          onChange={(e) => setHandleOrEmail(e.target.value)}
          required
          autoComplete="username"
          className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label htmlFor="password"  className="block text-sm font-medium text-text_secondary">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
      
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary_hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
      >
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
};