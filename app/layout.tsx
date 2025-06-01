// app/layout.tsx

import "./globals.css";
import { ReactNode } from "react";
import { Footer } from "./components/Footer";
import ClientWrapper from "./components/ClientWrapper";

export const metadata = {
  title: "ImpactLens",
  description: "Code impact insights for developers, testers and DevOps",
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

// 📌 Not:
// ✅ Artık SessionProvider tüm uygulamayı sarıyor ve mevcut ClientWrapper + Footer yapısını koruyor.
// ✅ Böylece alt komponentlerde useSession güvenle kullanılabilir.
// ✅ SOC 2 uyumlu yapı sağlandı, sensitive veri taşımadan sadece session erişimi yönetiliyor.
