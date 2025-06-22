//app/admin/components/AdminNav.tsx

'use client';
import Link from 'next/link';

export default function AdminNav() {
  return (
    <nav className="flex gap-6 p-4 border-b bg-white shadow-sm">
      <Link href="/admin-super/dashboard" className="text-sm font-medium text-gray-700 hover:text-purple-700">
        Dashboard
      </Link>
      <Link href="/admin-super/users" className="text-sm font-medium text-gray-700 hover:text-purple-700">
        Manage Users
      </Link>
      <Link href="/admin-super/domains" className="text-sm font-medium text-gray-700 hover:text-purple-700">
        Domains
      </Link>
      <Link href="/admin-super/settings" className="relative text-sm font-medium text-gray-700 hover:text-purple-700">
        Settings
        <span className="absolute -top-2 -right-4 text-[10px] bg-red-400 text-white px-1.5 py-0.5 rounded-full">
          WIP
        </span>
      </Link>
      <Link href="/admin-super/logs" className="text-sm font-medium text-gray-700 hover:text-purple-700">
        Logs
      </Link>
      <Link href="/admin-super/payments" className="text-sm font-medium text-gray-700 hover:text-purple-700">
        Payments
      </Link>
      <Link href="/admin-super/reports" className="relative text-sm font-medium text-gray-700 hover:text-purple-700">
        Reports
        <span className="absolute -top-2 -right-4 text-[10px] bg-red-400 text-white px-1.5 py-0.5 rounded-full">
          WIP
        </span>
      </Link>
      <Link href="/admin-super/audit" className="text-sm font-medium text-gray-700 hover:text-purple-700">
        Audit Trail
      </Link>
    </nav>
  );
}
