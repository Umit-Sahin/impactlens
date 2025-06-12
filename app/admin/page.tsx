//app/admin/page.tsx

import { auth } from '@lib/auth';
import { redirect } from 'next/navigation';
import UsersTable from './components/UsersTable';

export default async function AdminPage() {
  const session = await auth();

  if (!session || session.user.role !== 'SUPER_ADMIN') {
    redirect('/signin');
  }

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Users Table</h2>
      <UsersTable />
    </div>
  );
}
