// app/components/Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/corporate", label: "Company" },
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact Us" },
   
  
];

export default function Navbar() {
  const pathname = usePathname();

  const showDivider = true;

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <div className="text-4xl font-extrabold text-purple-900 tracking-wider italic">
          <Link href="/">
          <span className="text-purple-800">Impact</span>
          <span className="text-purple-600 text-2xlg">Lens</span>
          </Link>
        </div>
        
        <div className="flex gap-6">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-2xlg font-semibold hover:text-purple-700 transition-colors ${
                pathname === href ? "text-purple-700 underline" : "text-gray-700"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
      {showDivider && <div className="border-t border-gray-200" />}
    </>
  );
}