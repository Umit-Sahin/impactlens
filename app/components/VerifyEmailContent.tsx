// 📄 app/components/VerifyEmailContent.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(`/api/verify-email?token=${token}`);
        if (res.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    };

    if (token) verify();
    else setStatus('error');
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10 max-w-md w-full text-center border border-purple-200 dark:border-purple-600">
        {status === 'verifying' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-700 mx-auto mb-6"></div>
            <h1 className="text-lg text-gray-700 dark:text-white">Verifying your email...</h1>
          </>
        )}

        {status === 'success' && (
          <>
            <svg className="w-16 h-16 text-purple-700 dark:text-purple-400 mx-auto mb-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Email Verified</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Your email address has been successfully verified.</p>
          </>
        )}

        {status === 'error' && (
          <>
            <svg className="w-16 h-16 text-red-600 dark:text-red-500 mx-auto mb-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856C18.403 19 19 18.403 19 17.828V6.172C19 5.597 18.403 5 17.828 5H6.172C5.597 5 5 5.597 5 6.172v11.656C5 18.403 5.597 19 6.172 19z" />
            </svg>
            <h1 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">Invalid or Expired Token</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">This verification link is no longer valid. Please try signing up again.</p>
            <a href="/signup" className="inline-block bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg transition">
              Back to Sign Up
            </a>
          </>
        )}
      </div>
    </div>
  );
}
