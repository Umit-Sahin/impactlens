//app/auth/verified/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function VerifiedPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/signin');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10 max-w-md w-full text-center border border-purple-200 dark:border-purple-600">
        <div className="flex justify-center mb-6">
          <svg
            className="w-16 h-16 text-purple-700 dark:text-purple-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Email Verified Successfully
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your email has been verified. You can now log in to your account.
        </p>

        <button
          onClick={() => router.push('/signin')}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-medium py-2 rounded-lg transition"
        >
          Go to Sign In
        </button>

        <p className="text-sm text-gray-400 dark:text-gray-500 mt-4">
          Redirecting to Sign In in 5 seconds...
        </p>
      </div>
    </div>
  );
}
