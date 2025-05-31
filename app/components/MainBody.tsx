// components/MainBody.tsx

import React, { ReactNode } from "react";

interface MainBodyProps {
  children: ReactNode;
}

export default function MainBody({ children }: MainBodyProps) {
  return (
    <main className="min-h-[40vh] pb-20 bg-gray-50">
      {children}
    </main>
  );
}
