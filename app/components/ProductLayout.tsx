// 📄 File: app/components/ProductLayout.tsx

'use client';

import Sidebar from "./Sidebar";
import ProductTopbar from "./ProductTopbar";
import { useSidebar } from "@/app/context/SidebarContext";
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useSidebar();
  const { data: session } = useSession();
  const pathname = usePathname();

  // ✅ Admin panelde hem ProductTopbar hem de genel Navbar'ı gizle
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <div className="flex flex-col h-screen w-full max-w-full">
      {/* Üstte tam genişlik header sadece admin dışında görünsün */}
      {!isAdminPage && (
        <header className="w-full">
          <ProductTopbar />
        </header>
      )}

      {/* Alt kısım: Sidebar + Main içerik */}
      <div className="flex flex-1 overflow-hidden w-full max-w-full">
        {isSidebarOpen && !isAdminPage && (
          <aside className="w-64 border-r border-gray-200">
            <Sidebar />
          </aside>
        )}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 w-full max-w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

// 📌 Güncelleme: Hem ProductTopbar hem Sidebar artık admin sayfalarında tamamen gizleniyor.
