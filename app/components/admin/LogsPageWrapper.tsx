// app/components/admin/LogsPageWrapper.tsx

"use client";

import { useEffect, useState } from "react";

interface Log {
  id: string;
  action: string;
  level: string;
  ip_address?: string;
  created_at: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export default function LogsPageWrapper() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    fetch(`${origin}/api/admin/logs`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch logs");
        return res.json();
      })
      .then((data) => setLogs(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load logs");
      });
  }, []);

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">System Logs</h1>
      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Action</th>
            <th className="px-4 py-2">Level</th>
            <th className="px-4 py-2">IP Address</th>
            <th className="px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t">
              <td className="px-4 py-2">{log.user.name}</td>
              <td className="px-4 py-2">{log.user.email}</td>
              <td className="px-4 py-2">{log.action}</td>
              <td className="px-4 py-2">{log.level}</td>
              <td className="px-4 py-2">{log.ip_address || "-"}</td>
              <td className="px-4 py-2">{new Date(log.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
