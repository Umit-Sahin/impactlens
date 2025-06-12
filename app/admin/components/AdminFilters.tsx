//app/admin/components/AdminFilters.tsx

'use client';
import { useState } from 'react';

export default function AdminFilters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');

  return (
    <div className="flex gap-4 p-4 bg-white shadow-sm border-b">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by user name..."
        className="border rounded px-3 py-2 w-1/3"
      />
      <select
        value={filterRole}
        onChange={(e) => setFilterRole(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">All Roles</option>
        <option value="SUPER_ADMIN">SUPER_ADMIN</option>
        <option value="ADMIN">ADMIN</option>
        <option value="DEVELOPER">DEVELOPER</option>
        <option value="USER">USER</option>
      </select>
    </div>
  );
}
