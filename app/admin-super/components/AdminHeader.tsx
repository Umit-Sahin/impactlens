//app/admin/components/AdminHeader.tsx

'use client';
import Link from 'next/link';

export default function AdminHeader() {
  return (
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
  );
}
