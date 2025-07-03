// 📄 app/product/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sparkles, ShieldCheck, Activity, LayoutDashboard, LayoutPanelLeft } from 'lucide-react';

export default function ProductPage() {
  const router = useRouter();

  const modules = [
    { label: 'Product Pipeline', path: '/product/pipeline' },
    { label: 'Data Entry', path: '/product/dataset' },
    { label: 'Pages', path: '/product/pages' },
    { label: 'Web Elements', path: '/product/web-elements' },
    { label: 'APIs', path: '/product/apis' },
    { label: 'Mapping', path: '/product/mapping' },
  ];

  return (
    <div className="p-10 space-y-10">
      {/* Başlık */}
      <div>
        <h1 className="text-4xl font-bold text-purple-700 mb-2">Welcome to ImpactLens</h1>
        <p className="text-gray-600 max-w-3xl">
          Analyze, track and visualize the impact of every code or product change. Empower your team with clarity.
        </p>
      </div>

      {/* Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-xl p-6 bg-white shadow text-center">
          <Sparkles className="mx-auto mb-3 text-purple-600" size={32} />
          <h2 className="font-semibold text-lg text-purple-800 mb-1">Visualize Changes</h2>
          <p className="text-sm text-gray-500">See the impact of your code with clear and interactive diagrams.</p>
        </div>
        <div className="border rounded-xl p-6 bg-white shadow text-center">
          <ShieldCheck className="mx-auto mb-3 text-purple-600" size={32} />
          <h2 className="font-semibold text-lg text-purple-800 mb-1">Stay Compliant</h2>
          <p className="text-sm text-gray-500">Built with SOC 2 & ISO standards to ensure secure analysis.</p>
        </div>
        <div className="border rounded-xl p-6 bg-white shadow text-center">
          <Activity className="mx-auto mb-3 text-purple-600" size={32} />
          <h2 className="font-semibold text-lg text-purple-800 mb-1">Track Progress</h2>
          <p className="text-sm text-gray-500">Follow feature flows and documentation in one place.</p>
        </div>
      </div>

      {/* Bilgi Alanları */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        
        <div className="bg-purple-50 p-10 rounded-xl shadow border">
          <div className="flex items-center space-x-2 text-purple-800 font-semibold">
            <LayoutPanelLeft size={20} />
            <span>Explore Product Modules</span>
          </div>
          <p className="text-sm text-gray-500 p-3 ml-6">Dive into individual pages and pipelines</p>

          {/* Navigasyon Butonları */}
          <div className="grid grid-cols-2 md:grid-cols-3  p-8 gap-4">
                {modules.map((mod) => (
                  <Button
                    key={mod.label}
                    variant="outline"
                    className="border-2 border-purple-600 text-purple-700 p-8 hover:bg-purple-100 font-semibold"
                    onClick={() => router.push(mod.path)}
                  >
                    {mod.label}
                  </Button>
                ))}
              </div>

        </div>
      </div>

    
    </div>
  );
}
