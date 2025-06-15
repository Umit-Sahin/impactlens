//app/components/admin/SystemLogsTable.tsx

'use client';

'use client';

import { useEffect, useState } from 'react';

type SystemLog = {
  id: string;
  action: string;
  level: string;
  ip_address: string;
  created_at: string;
  user: {
    name: string;
    email: string;
  } | null;
};

export default function SystemLogsTable() {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Filtreleme state'leri
  const [emailFilter, setEmailFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (emailFilter) params.append('email', emailFilter);
      if (levelFilter) params.append('level', levelFilter);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const res = await fetch(`/api/admin/logs/system?${params.toString()}`);
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error('Error fetching logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []); // ilk yüklemede

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLogs();
  };

  return (
    <div className="border rounded p-4 bg-white shadow">
      <h3 className="text-lg font-semibold mb-4">System Logs</h3>

      {/* 🔎 Filtreleme Alanları */}
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
          <label className="block text-sm font-medium">Level</label>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="w-full sm:w-35 border rounded px-2 py-1 text-sm"
          >
            <option value="">All</option>
            <option value="INFO">INFO</option>
            <option value="WARN">WARN</option>
            <option value="ERROR">ERROR</option>
          </select>
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
        <button
          type="submit"
          className="bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700"
        >
          Filter
        </button>
      </form>

      {/* 📋 Log Tablosu */}
      {loading ? (
        <div className="text-sm text-gray-600">Loading system logs...</div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Action</th>
              <th className="py-2">Level</th>
              <th className="py-2">User</th>
              <th className="py-2">Email</th>
              <th className="py-2">IP</th>
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
                <td className="py-2">{log.ip_address}</td>
                <td className="py-2">
                  {new Date(log.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
