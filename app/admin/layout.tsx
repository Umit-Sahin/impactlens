// 📄 app/admin/layout.tsx

import { ReactNode } from 'react';
import { auth } from '@lib/auth';
import { redirect } from 'next/navigation';
import AdminHeader from './components/AdminHeader';
import AdminNav from './components/AdminNav';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session || session.user.role !== 'SUPER_ADMIN') {
    redirect('/signin');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <AdminNav />
      <main className="p-8 space-y-8">{children}</main>
    </div>
  );
}
