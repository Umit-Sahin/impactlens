'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignIn = () => {
    // Gerçek kimlik doğrulama burada yapılır (şimdilik sadece simülasyon)
    alert(`Signed in as ${email}`);
    router.push('/');
  };

  const handleGitHubSignIn = () => {
    alert("GitHub ile giriş yapılacak (örnek)");
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 px-4">
      <div className="bg-white p-10 rounded-xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-purple-800 mb-6">Sign in to ImpactLens</h1>

        {/* Email/Password Form */}
        <div className="space-y-4 text-left">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handleEmailSignIn}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="text-purple-600 border border-purple-600 hover:bg-purple-50 px-5 py-2 rounded-lg transition"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200" />

        {/* GitHub Button */}
        <button
          onClick={handleGitHubSignIn}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg text-lg flex items-center justify-center gap-2 transition"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.49 11.49 0 0 1 3.003-.403 11.49 11.49 0 0 1 3.003.403c2.292-1.552 3.297-1.23 3.297-1.23.654 1.653.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.823 1.103.823 2.222v3.293c0 .319.218.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"
              clipRule="evenodd"
            />
          </svg>
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
