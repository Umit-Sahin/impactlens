// 📄 File: app/admin/layout.tsx

'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users');
        const data = await res.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;
    if (searchTerm) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterRole) {
      filtered = filtered.filter((user) => user.role === filterRole);
    }
    setFilteredUsers(filtered);
  }, [searchTerm, filterRole, users]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterRole(e.target.value);
  };

  const handleUserRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newRole }),
      });
      if (res.ok) {
        const updated = await res.json();
        setUsers((prev) =>
          prev.map((user) => (user.id === updated.id ? { ...user, role: updated.role } : user))
        );
      } else {
        console.error('Failed to update role');
      }
    } catch (err) {
      console.error('Error updating role', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center p-6 border-b bg-white shadow-sm">
        <span className="text-2xl font-extrabold tracking-wide italic bg-gradient-to-r from-purple-700 to-purple-400 text-transparent bg-clip-text drop-shadow-sm">
          Impact<span className="text-purple-400">Lens</span>
        </span>
        <h1 className="text-2xl font-bold text-center flex-grow">Admin Panel</h1>
        <Link
          href="/product"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium"
        >
          ← Back to Product
        </Link>
      </header>

      <nav className="flex gap-6 p-4 border-b bg-white shadow-sm">
        <Link href="/admin" className="text-sm font-medium text-gray-700 hover:text-purple-700">
          Dashboard
        </Link>
        <Link href="/admin/users" className="text-sm font-medium text-gray-700 hover:text-purple-700">
          Manage Users
        </Link>
        <Link href="/admin/settings" className="text-sm font-medium text-gray-700 hover:text-purple-700">
          Settings
        </Link>
        <Link href="/admin/logs" className="text-sm font-medium text-gray-700 hover:text-purple-700">
          Logs
        </Link>
        <Link href="/admin/reports" className="text-sm font-medium text-gray-700 hover:text-purple-700">
          Reports
        </Link>
        <Link href="/admin/audit" className="text-sm font-medium text-gray-700 hover:text-purple-700">
          Audit Trail
        </Link>
      </nav>

      <div className="flex gap-4 p-4 bg-white shadow-sm border-b">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by user name..."
          className="border rounded px-3 py-2 w-1/3"
        />
        <select
          value={filterRole}
          onChange={handleRoleChange}
          className="border rounded px-3 py-2"
        >
          <option value="">All Roles</option>
          <option value="SUPER_ADMIN">SUPER_ADMIN</option>
          <option value="ADMIN">ADMIN</option>
          <option value="DEVELOPER">DEVELOPER</option>
          <option value="USER">USER</option>
        </select>
      </div>

      <main className="p-8 space-y-8">
        <div className="p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700 rounded">
          <p className="text-sm">Welcome to the ImpactLens Admin Panel! Use the search and filter options above to narrow down users by name or role.</p>
        </div>

        <div className="p-6 bg-white shadow rounded-md">
          <h2 className="text-lg font-semibold mb-4">Filtered Users</h2>
          <ul className="space-y-2">
            {filteredUsers.map((user) => (
              <li key={user.id} className="p-2 border rounded bg-gray-100">
                <strong>{user.name}</strong> — {user.email} — <span className="font-semibold text-blue-600">{user.role}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 bg-white shadow rounded-md">
          <h2 className="text-lg font-semibold mb-4">All Users (Full Table)</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2 font-semibold text-purple-600">{user.role}</td>
                  <td className="border px-4 py-2">
                    <select
                      value={user.role}
                      onChange={(e) => handleUserRoleChange(user.id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="DEVELOPER">DEVELOPER</option>
                      <option value="USER">USER</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

// 📌 Geliştirme: "All Users" tablosuna her satırın en sağında rol değiştirme dropdown menüsü eklendi; admin artık kullanıcıların rolünü doğrudan buradan değiştirebiliyor.


// 📌 Geliştirme: "All Users" bölümü artık tablo görünümünde, sıra numarası, ID, isim, email ve rol sütunlarını içeriyor.



// 📌 Onaylandı: Admin panel yapısı genişletildi, içerik daha açıklayıcı hale getirildi ve hazırlık yapıldı; bir sonraki geliştirmelere hazır!
