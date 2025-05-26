// components/Header.tsx

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/corporate", label: "Corporate" },
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white w-full max-w-7xl mx-auto">
      <div className="text-4xl font-extrabold tracking-wide italic bg-gradient-to-r from-purple-700 to-purple-400 text-transparent bg-clip-text drop-shadow-sm">
        <Link href="/">
          <span className="hover:text-purple-900 transition-colors">ImpactLens</span>
        </Link>
      </div>
      <div className="flex gap-6">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-lg font-medium hover:text-purple-700 transition-colors ${
              pathname === href ? "text-purple-700 underline" : "text-gray-700"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
