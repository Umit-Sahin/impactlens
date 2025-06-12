// app/components/ClientWrapper.tsx

"use client";

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { SessionProvider } from 'next-auth/react';

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showNavbar = !pathname.startsWith('/product') && !pathname.startsWith('/admin');

  return (
    <SessionProvider>
      {/* Product ve admin sayfalarında navbar gizli */}
      {showNavbar && <Navbar />}
      <main className="min-h-screen pb-28 bg-gray-50">{children}</main>
    </SessionProvider>
  );
}

// 📌 Not:
// ✅ SessionProvider artık sadece client component içinde (ClientWrapper) sarılıyor.
// ✅ Böylece alt komponentlerde useSession güvenle kullanılabilir.
// ✅ RootLayout'ta React Context hatası ortadan kalkar.