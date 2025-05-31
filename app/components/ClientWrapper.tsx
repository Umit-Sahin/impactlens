// app/components/ClientWrapper.tsx
"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/app/components/Navbar";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showNavbar = !pathname.startsWith("/product");

  return (
    <>
      {showNavbar && <Navbar />}
      <main className="min-h-screen pb-28 bg-gray-50">{children}</main>
    </>
  );
}
