// app/components/ClientLayout.tsx

"use client";

import Navbar from "./Navbar";
import { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
