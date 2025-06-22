// app/admin/reports/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ReportsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user.role !== 'SUPER_ADMIN') {
      router.replace('/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') return <p>Loading session...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Reports</h1>
      <p className="text-gray-600">This page will contain advanced system and user reports (CSV exports, usage analytics, etc).</p>

      <div className="bg-white border rounded p-4 shadow-sm">
        <h2 className="font-semibold text-lg mb-2">Coming Soon</h2>
        <p className="text-sm text-gray-500">Report generation and filtering features will be added in the next sprint.</p>
      </div>
    </div>
  );
}
