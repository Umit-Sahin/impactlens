//app/components/Sidebar.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Activity,
  ClipboardList,
  FileText,
  LayoutList,
  Code2,
  Network,
  Book,
  HelpCircle,
  Mail,
} from 'lucide-react';

const menuGroups = [
  {
    title: '',
    items: [
      {
        label: 'Dashboard',
        href: '/product',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: 'Product Development',
    items: [
      {
        label: 'Product Pipeline',
        href: '/product/pipeline',
        icon: Activity,
      },
    ],
  },
  {
    title: 'Product Registry',
    items: [
      {
        label: 'Data Entry',
        href: '/product/dataset',
        icon: ClipboardList,
      },
    ],
  },
  {
    title: 'Product Mapping',
    items: [
      {
        label: 'Pages',
        href: '/product/pages',
        icon: FileText,
      },
      {
        label: 'Web Elements',
        href: '/product/elements',
        icon: LayoutList,
      },
      {
        label: 'APIs',
        href: '/product/apis',
        icon: Code2,
      },
      {
        label: 'Mapping',
        href: '/product/mapping',
        icon: Network,
      },
      {
        label: 'Document',
        href: '/product/document',
        icon: Book,
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        label: 'F.A.Q',
        href: '/product/faq',
        icon: HelpCircle,
      },
      {
        label: 'Contact Support',
        href: '/product/support',
        icon: Mail,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path
      ? 'text-purple-700 font-semibold bg-purple-50 rounded-lg px-3 py-2 block'
      : 'text-gray-700 hover:text-purple-700 px-3 py-2 block';

  return (
    <aside className="w-64 bg-white h-full border-r border-gray-200 px-4 py-6 space-y-6 text-sm">
      {menuGroups.map((group, i) => (
        <div key={i}>
          {group.title && (
            <p className="text-gray-400 uppercase text-xs mb-2 mt-4">{group.title}</p>
          )}

          {group.items.map((item) => (
            <Link key={item.href} href={item.href} className={isActive(item.href)}>
              <div className="flex items-center gap-2">
                <item.icon size={18} />
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      ))}
    </aside>
  );
}

