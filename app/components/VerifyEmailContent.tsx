'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        if (res.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    };

    verifyEmail();
  }, [token]);

  if (status === 'loading') return <div className="text-center">Verifying email...</div>;
  if (status === 'success') return <div className="text-green-600 text-center">Email verified! You can now sign in.</div>;
  return <div className="text-red-600 text-center">Invalid or expired token.</div>;
}
