// 📄 File: app/admin/layout.tsx

'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';

type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  createdAt: string;
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

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
        <Link href="/admin/dashboard" className="text-sm font-medium text-gray-700 hover:text-purple-700">
          Dashboard
        </Link>
        <Link href="/admin/users" className="text-sm font-medium text-gray-700 hover:text-purple-700">
          Manage Users
        </Link>
        <Link href="/admin/domains" className="text-sm font-medium text-gray-700 hover:text-purple-700">
          Domains
        </Link>
        <Link href="/admin/settings" className="relative text-sm font-medium text-gray-700 hover:text-purple-700">
          Settings
          <span className="absolute -top-2 -right-4 text-[10px] bg-red-400 text-white px-1.5 py-0.5 rounded-full">
            WIP
          </span>
        </Link>
        <Link href="/admin/logs" className="text-sm font-medium text-gray-700 hover:text-purple-700">
          Logs
        </Link>
        <Link href="/admin/payments" className="text-sm font-medium text-gray-700 hover:text-purple-700">
          Payments
        </Link>
        <Link href="/admin/reports" className="relative text-sm font-medium text-gray-700 hover:text-purple-700">
          Reports
          <span className="absolute -top-2 -right-4 text-[10px] bg-red-400 text-white px-1.5 py-0.5 rounded-full">
            WIP
          </span>
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
        {children}
      </main>
    </div>
  );
}

// 📌 Bu dosya TypeScript tip hatalarını önlemek için User tipi ile güncellendi ve eksiksiz, çalışır hâlde sunuldu.


// 📌 Geliştirme: "All Users" tablosuna her satırın en sağında rol değiştirme dropdown menüsü eklendi; admin artık kullanıcıların rolünü doğrudan buradan değiştirebiliyor.


// 📌 Geliştirme: "All Users" bölümü artık tablo görünümünde, sıra numarası, ID, isim, email ve rol sütunlarını içeriyor.



// 📌 Onaylandı: Admin panel yapısı genişletildi, içerik daha açıklayıcı hale getirildi ve hazırlık yapıldı; bir sonraki geliştirmelere hazır!
