// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { Footer } from "@/app/components/Footer";
import ClientWrapper from "@/app/components/ClientWrapper";

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
      <body className="pb-[20px] bg-gray-50 text-gray-900">
        <ClientWrapper>{children}</ClientWrapper>
        <Footer />
      </body>
    </html>
  );
}
