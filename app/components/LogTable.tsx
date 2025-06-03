// app/components/LogTable.tsx

'use client';

import useSWR from 'swr';
import { ShieldCheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function LogTable() {
  const { data, error, isLoading } = useSWR('/api/admin/logs', fetcher);
  const [filter, setFilter] = useState('');

  const filteredLogs = data?.filter((log: any) =>
    log.user.email.toLowerCase().includes(filter.toLowerCase()) ||
    log.action.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading) {
    return <p className="p-4 text-sm text-gray-500">Loading logs...</p>;
  }

  if (error) {
    return <p className="p-4 text-sm text-red-500">Failed to load logs.</p>;
  }

  return (
    <div className="rounded-lg border bg-white shadow">
      <div className="flex items-center bg-gray-50 p-4 border-b">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="Filter by action or user..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="ml-2 bg-transparent outline-none flex-1 text-sm"
        />
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="p-3">Action</th>
            <th>User</th>
            <th>IP</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs?.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-400">
                No logs found.
              </td>
            </tr>
          )}
          {filteredLogs?.map((log: any) => (
            <tr key={log.id} className="border-t hover:bg-gray-50">
              <td className="p-3 font-medium text-gray-800">{log.action}</td>
              <td className="text-gray-700">{log.user?.email || '—'}</td>
              <td className="text-gray-600">{log.ip_address || '—'}</td>
              <td className="text-gray-500">
                {new Date(log.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
