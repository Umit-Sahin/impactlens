"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/company", label: "Company" },
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
        {/* Logo */}
        <div className="text-4xl font-extrabold text-purple-900 tracking-wider italic">
          <Link href="/">
            <span className="text-purple-800">Impact</span>
            <span className="text-purple-600 text-2xlg">Lens</span>
          </Link>
        </div>

        {/* Navigation + SignIn */}
        <div className="flex items-center gap-6">
          {/* Nav Links */}
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

          {/* Sign In Button */}
          <Link href="/signin">
            <button className="ml-4 bg-gray-500 font-semibold hover:bg-purple-700 text-white px-5 py-2 rounded-xl text-sm transition">
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      <div className="border-t border-gray-200" />
    </>
  );
}
