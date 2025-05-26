// app/layout.tsx

import "./globals.css";
import { Footer } from "@/app/components/Footer";
import { ReactNode } from "react";
import Navbar from "@/app/components/Navbar";

export const metadata = {
  title: "ImpactLens",
  description: "Code impact insights for developers",
  icons: {
    icon: "/docs/favicon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="pb-[100px] bg-gray-50 text-gray-900">
        <Navbar />
        <main className="min-h-screen pb-28 bg-gray-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
