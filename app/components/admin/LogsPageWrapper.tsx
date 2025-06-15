// app/components/admin/LogsPageWrapper.tsx

'use client';

import { useState } from 'react';
import SystemLogsTable from '@/components/admin/SystemLogsTable';
import PaymentLogsTable from '@/components/admin/PaymentLogsTable';

export default function LogsPageWrapper() {
  // ==================== Sekme durumu ====================
  const [activeTab, setActiveTab] = useState<'system' | 'payment'>('system');

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Logs</h1>

      {/* ==================== Sekme butonları ==================== */}
      <div className="flex gap-4 border-b pb-2">
        <button
          onClick={() => setActiveTab('system')}
          className={`px-4 py-2 rounded-t-md font-medium ${
            activeTab === 'system'
              ? 'bg-white border border-b-transparent shadow'
              : 'text-gray-500'
          }`}
        >
          System Logs
        </button>
        <button
          onClick={() => setActiveTab('payment')}
          className={`px-4 py-2 rounded-t-md font-medium ${
            activeTab === 'payment'
              ? 'bg-white border border-b-transparent shadow'
              : 'text-gray-500'
          }`}
        >
          Payment Logs
        </button>
      </div>

      {/* ==================== İçerik alanı ==================== */}
      <div className="mt-4">
        {activeTab === 'system' && <SystemLogsTable />}
        {activeTab === 'payment' && <PaymentLogsTable />}
      </div>
    </div>
  );
}
