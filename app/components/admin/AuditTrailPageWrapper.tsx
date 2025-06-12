// app/components/admin/AuditTrailPageWrapper.tsx

"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { saveAs } from "file-saver";

interface AuditLog {
  id: string;
  action: string;
  level: string;
  details: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export default function AuditTrailPageWrapper() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 15;

  useEffect(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    fetch(`${origin}/api/admin/logs`)
      .then((res) => res.json())
      .then((data) => setLogs(data));
  }, []);
  
  useEffect(() => {
    const from = startDate ? new Date(startDate) : null;
    const to = endDate ? new Date(endDate) : null;

    const filtered = logs.filter((log) => {
      const created = new Date(log.createdAt);
      if (from && created < from) return false;
      if (to && created > to) return false;
      if (userFilter && !log.user.name.toLowerCase().includes(userFilter.toLowerCase())) return false;
      return true;
    });
    setFilteredLogs(filtered);
    setCurrentPage(1);
  }, [startDate, endDate, userFilter, logs]);

  const exportCSV = () => {
    const headers = ["ID", "Action", "Level", "Details", "User Name", "User Email", "Created At"];
    const rows = filteredLogs.map((log) => [
      log.id,
      log.action,
      log.level,
      log.details,
      log.user.name,
      log.user.email,
      format(new Date(log.createdAt), "yyyy-MM-dd HH:mm:ss"),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `audit_logs_${Date.now()}.csv`);
  };

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap items-end">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">User</label>
          <input
            type="text"
            placeholder="Search user name"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <button
          onClick={exportCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export CSV
        </button>
      </div>

      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Action</th>
            <th className="px-4 py-2">Level</th>
            <th className="px-4 py-2">Details</th>
            <th className="px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.map((log) => (
            <tr key={log.id} className="border-t">
              <td className="px-4 py-2">{log.user.name}</td>
              <td className="px-4 py-2">{log.user.email}</td>
              <td className="px-4 py-2">{log.action}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                  log.level === "info"
                    ? "bg-blue-500"
                    : log.level === "warning"
                    ? "bg-yellow-500"
                    : log.level === "error"
                    ? "bg-red-500"
                    : log.level === "critical"
                    ? "bg-black"
                    : "bg-gray-500"
                }`}>
                  {log.level}
                </span>
              </td>
              <td className="px-4 py-2">{log.details}</td>
              <td className="px-4 py-2">{format(new Date(log.createdAt), "yyyy-MM-dd HH:mm")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center pt-4">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstLog + 1} to {Math.min(indexOfLastLog, filteredLogs.length)} of {filteredLogs.length} logs
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
