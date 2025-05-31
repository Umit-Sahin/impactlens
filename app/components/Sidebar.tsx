'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Activity,
  Book,
  FileText,
  LayoutList,
  Code2,
  Network,
  HelpCircle,
  Mail,
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [openPages, setOpenPages] = useState(false);
  const [openElements, setOpenElements] = useState(false);

  const isActive = (path: string) =>
    pathname === path
      ? 'text-purple-700 font-semibold bg-purple-50 rounded-lg px-3 py-2 block'
      : 'text-gray-700 hover:text-purple-700 px-3 py-2 block';

  return (
    <aside className="w-64 bg-white h-full border-r border-gray-200 px-4 py-6 space-y-6 text-sm">
      {/* Dashboard */}
      <div>
        <Link href="/product" className={isActive('/product')}>
          <div className="flex items-center gap-2">
            <LayoutDashboard size={18} />
            Dashboard
          </div>
        </Link>
      </div>

      {/* Product Development */}
      <div>
        <p className="text-gray-400 uppercase text-xs mb-2">Product Development</p>
        <Link href="/product/pipeline" className={isActive('/product/pipeline')}>
          <div className="flex items-center gap-2">
            <Activity size={18} />
            Product Pipeline
          </div>
        </Link>
      </div>

      {/* Product Mapping */}
      <div>
        <p className="text-gray-400 uppercase text-xs mb-2 mt-4">Product Mapping</p>

        {/* Pages Dropdown */}
        <button
          onClick={() => setOpenPages(!openPages)}
          className="w-full flex items-center gap-2 text-gray-700 hover:text-purple-700 px-3 py-2"
        >
          <FileText size={18} />
          Pages
        </button>
        {openPages && (
          <div className="ml-6 mt-2 flex flex-col space-y-1">
            <Link href="/product/pages/primary" className={isActive('/product/pages/primary')}>
              Main Pages
            </Link>
            <Link href="/product/pages/secondary" className={isActive('/product/pages/secondary')}>
              Second Degree
            </Link>
            <Link href="/product/pages/third" className={isActive('/product/pages/third')}>
              Third Degree
            </Link>
          </div>
        )}

        {/* Web Elements Dropdown */}
        <button
          onClick={() => setOpenElements(!openElements)}
          className="w-full flex items-center gap-2 text-gray-700 hover:text-purple-700 px-3 py-2"
        >
          <LayoutList size={18} />
          Web Elements
        </button>
        {openElements && (
          <div className="ml-6 mt-2 flex flex-col space-y-1">
            <Link href="/product/elements/forms" className={isActive('/product/elements/forms')}>
              Forms
            </Link>
            <Link href="/product/elements/components" className={isActive('/product/elements/components')}>
              Components
            </Link>
          </div>
        )}

        {/* Diğer Menü Öğeleri */}
        <Link href="/product/apis" className={isActive('/product/apis')}>
          <div className="flex items-center gap-2">
            <Code2 size={18} />
            APIs
          </div>
        </Link>

        <Link href="/product/mapping" className={isActive('/product/mapping')}>
          <div className="flex items-center gap-2">
            <Network size={18} />
            Mapping
          </div>
        </Link>

        <Link href="/product/document" className={isActive('/product/document')}>
          <div className="flex items-center gap-2">
            <Book size={18} />
            Document
          </div>
        </Link>
      </div>

      {/* Support */}
      <div>
        <p className="text-gray-400 uppercase text-xs mb-2 mt-4">Support</p>
        <Link href="/product/faq" className={isActive('/product/faq')}>
          <div className="flex items-center gap-2">
            <HelpCircle size={18} />
            F.A.Q
          </div>
        </Link>

        <Link href="/product/support" className={isActive('/product/support')}>
          <div className="flex items-center gap-2">
            <Mail size={18} />
            Contact Support
          </div>
        </Link>
      </div>
    </aside>
  );
}
