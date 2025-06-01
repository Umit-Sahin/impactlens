// app/product/layout.tsx

'use client';

import { SidebarProvider } from '@/app/context/SidebarContext';
import ProductLayout from '@/app/components/ProductLayout';

export default function ProductSectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ProductLayout>{children}</ProductLayout>
    </SidebarProvider>
  );
}


// 📌 Açıklama:
// ✅ ProductTopbar bileşeni artık layout içinde en üstte render edilir.
// ✅ Sadece SUPER_ADMIN kullanıcılarında "Admin Paneline Git" butonu görünür.
// ✅ SOC 2 uyumlu: sensitive bilgi yok, sadece role kontrolü.
// ✅ "use client" eklendi, çünkü ProductTopbar client component.