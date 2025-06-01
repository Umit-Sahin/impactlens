// app/product/admin/layout.tsx

import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-semibold text-purple-700">Admin Panel</h1>
      </div>

      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
