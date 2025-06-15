//app/components/admin/PaymentLogsTable.tsx


/* ============================================================================
  📄 PaymentLogsTable.tsx
  - Admin panelde ödeme loglarını listeleyen tablo bileşeni
  - E-posta ve tarih aralığına göre filtreleme yapılabilir
============================================================================ */

'use client';

import { useEffect, useState } from 'react';

// 📌 1. Veri Tipi Tanımı
type PaymentLog = {
  id: string;
  action: string;
  level: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  } | null;
};

// 📌 2. Ana Bileşen
export default function PaymentLogsTable() {
  const [logs, setLogs] = useState<PaymentLog[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔍 3. Filtreleme için local state
  const [emailFilter, setEmailFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 📡 4. API'den veri çek
  const fetchLogs = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (emailFilter) queryParams.append('email', emailFilter);
      if (startDate) queryParams.append('start', startDate);
      if (endDate) queryParams.append('end', endDate);

      const res = await fetch(`/api/admin/logs/payment?${queryParams.toString()}`);
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error('Error fetching payment logs:', err);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 5. Sayfa yüklendiğinde ve filtre değiştiğinde veriyi çek
  useEffect(() => {
    fetchLogs();
  }, []);

  // 🔘 6. Filtreleri uygulamak için
  const handleFilter = () => {
    fetchLogs();
  };

  // 💬 7. Yükleniyor durumunda
  if (loading) {
    return <div className="text-sm text-gray-600">Loading payment logs...</div>;
  }

  // 📋 8. Render
  return (
    <div className="border rounded p-4 bg-white shadow">
      <h3 className="text-lg font-semibold mb-4">Payment Logs</h3>

      {/* 🎛️ 9. Filtreleme Formu */}
      <form onSubmit={handleFilter} className="mb-4 flex flex-wrap gap-4 items-end">
      <div>
        <label className="block text-sm font-medium">Filter by Email</label>
        <input
          type="text"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          className="w-full sm:w-64 border rounded px-2 py-1 text-sm"
          placeholder="user@example.com"
        />
      </div>
      <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full sm:w-48 border rounded px-2 py-1 text-sm"
          />
      </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full sm:w-48 border rounded px-2 py-1 text-sm"
          />
        </div>
        <div>
        <button
          onClick={handleFilter}
          className="bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700"
        >
          Filter
        </button>
      </div>
      </form>

      {/* 📊 10. Tablo */}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Action</th>
            <th className="py-2">Level</th>
            <th className="py-2">User</th>
            <th className="py-2">Email</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{log.action}</td>
              <td className="py-2">{log.level}</td>
              <td className="py-2">{log.user?.name || '-'}</td>
              <td className="py-2">{log.user?.email || '-'}</td>
              <td className="py-2">{new Date(log.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
