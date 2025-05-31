// app/components/ProductLayout.tsx

'use client';

import Sidebar from "./Sidebar";
import ProductTopbar from "./ProductTopbar";
import { useSidebar } from "@/app/context/SidebarContext";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="flex flex-col h-screen">
      {/* Üstte tam genişlik header */}
      <ProductTopbar />

      {/* Alt kısım: Sidebar + Main içerik */}
      <div className="flex flex-1 overflow-hidden">
        {isSidebarOpen && (
          <div className="w-64 border-r border-gray-200">
            <Sidebar />
          </div>
        )}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">{children}</main>
      </div>
    </div>
  );
}
