// app/product/apis/page.tsx

'use client';

import React, { useState } from 'react';
import { Download, Search, LoaderCircle } from 'lucide-react';
import axios from 'axios';
import { Input } from 'app/components/ui/input';

export default function ApiInspectorPage() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 15;
  const filteredData = data; // filtre uygulanırsa burada düzenlenebilir
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setData([]);
    try {
      const res = await axios.post('/api/crawl/apis', { url });
      setData(res.data.apiEndpoints);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    const csv = 'Endpoint\n' + data.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'api_endpoints.csv';
    a.click();
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">API Inspector</h1>

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

      {data.length > 0 && !loading && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <Input placeholder="Filter endpoints…" className="w-64 h-8 text-sm" />
            <button onClick={downloadCSV} className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
              <Download className="w-4 h-4" /> Download CSV
            </button>
          </div>

          <table className="w-full text-sm text-left border rounded overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Endpoint</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((endpoint, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2 text-gray-800">{endpoint}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex justify-between items-center p-4 bg-gray-50 text-sm text-gray-600">
              <span>Total: {filteredData.length} endpoints</span>
              <div className="space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
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
      )}
    </div>
  );
}
