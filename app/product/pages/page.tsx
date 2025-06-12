//app/product/pages/page.tsx

'use client';

import React, { useState } from 'react';
import { Download, Search, LoaderCircle } from 'lucide-react';
import axios from 'axios';
import { Input } from 'app/components/ui/input';

export default function EntityRegistryPage() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState<{ level: number; url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pageIndexes, setPageIndexes] = useState<Record<number, number>>({ 1: 1, 2: 1, 3: 1 });


  const itemsPerPage = 15;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/crawl', { url });
      setData(res.data.results);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pages.json';
    a.click();
  };

  const downloadCSV = () => {
    const header = 'Level,URL\n';
    const rows = data.map(row => `${row.level},${row.url}`).join('\n');
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pages.csv';
    a.click();
  };

  const renderTable = (level: number, title: string) => {
    const filtered = data.filter(d => d.level === level);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const currentPage = pageIndexes[level] || 1;
    const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
      <div key={level} className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
        <ul className="border rounded-md divide-y">
          {currentItems.map((item, idx) => (
            <li key={idx} className="px-4 py-2 text-sm text-gray-800">
              {item.url}
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <div className="flex justify-between items-center p-2 bg-gray-50 text-sm text-gray-600">
            <span>Total: {filtered.length} pages</span>
            <div className="space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setPageIndexes(prev => ({ ...prev, [level]: page }))}
                  className={`px-3 py-1 rounded border ${
                    currentPage === page ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Pages Entity Registry</h1>

      <form onSubmit={handleSubmit} className="flex items-center space-x-4 mb-6">
        <input
          type="url"
          placeholder="Enter website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border px-4 py-2 rounded-md"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center space-x-2 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
        >
          {loading ? (
            <LoaderCircle className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          <span>{loading ? 'Loading...' : 'Inspect'}</span>
        </button>
      </form>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {data.length > 0 && (
        <div className="space-y-6">
          <div className="flex gap-4 mb-4">
            <button onClick={downloadJSON} className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
              <Download className="w-4 h-4" /> Download JSON
            </button>
            <button onClick={downloadCSV} className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
              <Download className="w-4 h-4" /> Download CSV
            </button>
          </div>

          {renderTable(1, 'Primary Pages')}
          {renderTable(2, 'Second Degree')}
          {renderTable(3, 'Third Degree')}
        </div>
      )}
    </div>
  );
}
