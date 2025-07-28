'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  // State for the user's identifier (email or username)
  const [identifier, setIdentifier] = useState('');
  // State for the user's password
  const [password, setPassword] = useState('');
  // State for storing and displaying login errors
  const [error, setError] = useState('');
  // State to manage the loading status during form submission
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      if (res.ok) {
        router.push('/admin/dashboard/sme');

        // Refresh the router to re-fetch server components and
        // reflect the new authentication state (the cookie being set).
        // This ensures protected layouts and pages update correctly.
        router.refresh();
      } else {
        // const data = await res.json();
        setError('Failed to login. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Sign In
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Access Admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            {/* Identifier Input */}
            <div>
              <label htmlFor="identifier" className="sr-only">
                Email
              </label>
              <input
                id="identifier"
                name="identifier"
                type="email"
                autoComplete="email"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter your email"
              />
            </div>
            {/* Password Input */}
            <div>
              <label htmlFor="password" className="sr-only">
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
                className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="p-3 text-sm text-center text-red-800 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-200">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              aria-busy={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}