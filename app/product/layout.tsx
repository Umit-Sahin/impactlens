// app/product/layout.tsx

import { SidebarProvider } from "@/app/context/SidebarContext";
import ProductLayout from "@/app/components/ProductLayout";

export default function ProductSectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ProductLayout>{children}</ProductLayout>
    </SidebarProvider>
  );
}
