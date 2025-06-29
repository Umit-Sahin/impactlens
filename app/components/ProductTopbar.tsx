//app/components/ProductTopbar.tsx

'use client';

import { useSidebar } from '@/context/SidebarContext';
import { Menu, Bell, User } from 'lucide-react';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProductTopbar() {
  const { toggleSidebar } = useSidebar();
  const [openDropdown, setOpenDropdown] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleAdminClick = () => {
    router.push('/admin-super');
  };

  return (
    <header className="flex items-center px-6 py-3 bg-white shadow-sm sticky top-0 z-50">
      {/* Sol: Logo + Menü */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-gray-700 hover:text-purple-700">
          <Menu size={24} />
        </button>
        <span className="text-2xl font-extrabold tracking-wide italic bg-gradient-to-r from-purple-700 to-purple-400 text-transparent bg-clip-text drop-shadow-sm">
          Impact<span className="text-purple-400">Lens</span>
        </span>
      </div>

      {/* Orta: Arama */}
      <div className="flex-1 mx-8 max-w-xl">
        <input
          type="text"
          placeholder="Search modules, APIs..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Sağ: Admin Butonu + Bildirimler + Kullanıcı Menüsü */}
      <div className="flex items-center gap-4 ml-auto">
        {session?.user?.role === 'SUPER_ADMIN' && (
          <button
            onClick={handleAdminClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go Admin Panel
          </button>
        )}
        <Bell className="text-gray-600 hover:text-purple-700 cursor-pointer" />
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-purple-700"
          >
            <User className="w-5 h-5" />
            <span>{session?.user?.name || 'Kullanıcı'}</span>
          </button>
          {openDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border z-50">
              <div className="px-4 py-2 border-b text-right">
                <p className="text-sm font-bold">{session?.user?.name}</p>
                <p className="text-xs text-blue-600 font-semibold">{session?.user?.role}</p>
              </div>
              <ul className="text-sm text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Profile</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Account Settings</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Need Help?</li>
              </ul>
              <button
                onClick={() => signOut({ callbackUrl: '/signin' })}
                className="w-full text-left px-4 py-2 text-sm font-bold text-black hover:bg-gray-100 border-t"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// 📌 Düzeltme: Çift görünümlü Admin Paneli butonu kaldırıldı; yalnızca üst barda bir kez, bildirim ve kullanıcı menüsünün hemen solunda yer alacak şekilde düzenlendi.

