// 📄 app/admin-super/users/page.tsx

import UsersTable from '../components/UsersTable';

export default function AdminSuperUsersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <UsersTable />
    </div>
  );
}