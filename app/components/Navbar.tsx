// app/components/Navbar.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/company', label: 'Company' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-3xl font-extrabold tracking-wide italic bg-gradient-to-r from-purple-700 to-purple-400 text-transparent bg-clip-text drop-shadow-sm">
          Impact<span className="text-purple-400">Lens</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-lg font-medium transition-colors ${
                pathname === href ? 'text-purple-700 underline' : 'text-gray-700 hover:text-purple-700'
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Sign In Button */}
          <Link
            href="/signin"
            className="ml-4 px-4 py-2 bg-purple-700 text-white rounded-md text-sm font-medium hover:bg-purple-800 transition"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            {menuOpen ? (
              <XMarkIcon className="w-6 h-6 text-gray-800" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 px-4">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`text-base font-medium ${
                pathname === href ? 'text-purple-700 underline' : 'text-gray-700 hover:text-purple-700'
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Mobile Sign In Button */}
          <Link
            href="/signin"
            onClick={() => setMenuOpen(false)}
            className="block mt-2 px-4 py-2 bg-purple-700 text-white text-center rounded-md text-sm font-medium hover:bg-purple-800 transition"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}
