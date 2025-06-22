// 📄 app/admin-super/components/UsersTable.tsx

'use client';

import { useEffect, useState } from 'react';

/* ----------------------------- 1️⃣ Tip Tanımı ----------------------------- */
type User = {
  id: string;
  name: string | null;
  surname: string | null;
  email: string | null;
  role: string;
  companyName?: string | null;
  isWhitelisted?: boolean;
};

/* ----------------------------- 2️⃣ Bileşen ----------------------------- */
export default function UsersTable() {
  /* 🔧 State'ler */
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filtre state'leri
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');
  const [selectedCompany, setSelectedCompany] = useState('ALL');
  const [selectedWhitelist, setWhitelistFilter] = useState('ALL');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  /* ----------------------------- 3️⃣ API'den Kullanıcı Verisi Çek ----------------------------- */
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/users');
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to fetch users');
      }
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* 🔄 Sayfa yüklendiğinde veri çek */
  useEffect(() => {
    fetchUsers();
  }, []);

  /* 🌀 Sayfa değiştiğinde yukarı kaydır */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  /* 🧼 Filtre değiştiğinde ilk sayfaya dön */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedRole, selectedCompany, selectedWhitelist]);

  /* 🧮 Filtreleme */
  const filteredUsers = users.filter((user) => {
    const nameMatch = user.name?.toLowerCase().includes(search.toLowerCase());
    const roleMatch = selectedRole === 'ALL' || user.role === selectedRole;
    const companyMatch = selectedCompany === 'ALL' || user.companyName === selectedCompany;
    const whitelistMatch =
      selectedWhitelist === 'ALL' ||
      (selectedWhitelist === 'WHITELISTED' && user.isWhitelisted) ||
      (selectedWhitelist === 'NOT_WHITELISTED' && !user.isWhitelisted);

    return nameMatch && roleMatch && companyMatch && whitelistMatch;
  });

  const uniqueCompanies = Array.from(
    new Set(users.map((u) => u.companyName).filter(Boolean))
  );

  // Sayfa hesaplamaları
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentItems = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* ----------------------------- 4️⃣ Rol & Whitelist Güncellemeleri ----------------------------- */
  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newRole }),
      });
      if (!res.ok) throw new Error('Failed to update role');
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const toggleWhitelist = async (userId: string, newValue: boolean) => {
    try {
      const res = await fetch('/api/admin/users/toggle-whitelist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, isWhitelisted: newValue }),
      });
      if (!res.ok) throw new Error('Failed to update whitelist status');
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  /* ----------------------------- 5️⃣ UI: Yükleniyor / Hata ----------------------------- */
  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  /* ----------------------------- 6️⃣ UI: Filtreler ve Tablo ----------------------------- */
  return (
    <div>
      {/* 🔍 Filtre Alanı */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 border px-3 py-1 rounded"
        />

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="ALL">All Roles</option>
          <option value="SUPER_ADMIN">SUPER_ADMIN</option>
          <option value="ADMIN">ADMIN</option>
          <option value="DEVELOPER">DEVELOPER</option>
          <option value="USER">USER</option>
        </select>

        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="ALL">All Companies</option>
          {uniqueCompanies.map((company) => (
            <option key={company ?? 'unknown'} value={company ?? ''}>
              {company ?? 'Unknown'}
            </option>
          ))}
        </select>

        <select
          value={selectedWhitelist}
          onChange={(e) => setWhitelistFilter(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="ALL">All Whitelists</option>
          <option value="WHITELISTED">Whitelisted</option>
          <option value="NOT_WHITELISTED">Not Whitelisted</option>
        </select>
      </div>

      {/* 📋 Kullanıcı Tablosu */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Surname</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Company</th>
            <th className="py-2 px-4 border-b">Whitelisted</th>
            <th className="py-2 px-4 border-b">Change Role</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.surname}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">{user.companyName || '-'}</td>
              <td className="py-2 px-4 border-b flex gap-2">
                {/* 🔴 Remove */}
                <button
                  onClick={() => toggleWhitelist(user.id, false)}
                  disabled={!user.isWhitelisted}
                  className={`px-2 py-1 rounded text-xs font-medium transition
                    ${user.isWhitelisted
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                  Remove
                </button>

                {/* 🟢 Add */}
                <button
                  onClick={() => toggleWhitelist(user.id, true)}
                  disabled={user.isWhitelisted}
                  className={`px-2 py-1 rounded text-xs font-medium transition
                    ${!user.isWhitelisted
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                  Add
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
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

      {/* 📄 Pagination */}
      {totalPages > 0 && (
        <div className="flex justify-between items-center p-4 bg-gray-50 text-sm text-gray-600 mt-4">
          <span>Total: {filteredUsers.length} users</span>
          <div className="space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
