//app/verify-email/page.tsx

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (res.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (err) {
        setStatus('error');
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        {status === 'verifying' && <p className="text-gray-700">Verifying your email...</p>}
        {status === 'success' && (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-4">Email Verified</h2>
            <p className="text-gray-700 mb-6">Your email has been successfully verified.</p>
            <button
              onClick={() => router.push('/signin')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition"
            >
              Go to Sign In
            </button>
          </>
        )}
        {status === 'error' && (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Verification Failed</h2>
            <p className="text-gray-700 mb-6">The verification link is invalid or has expired.</p>
          </>
        )}
      </div>
    </div>
  );
}
