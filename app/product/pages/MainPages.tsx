// app/product/pages/MainPages.tsx

'use client';

import React, { useState } from 'react';
import { Input } from 'app/components/ui/input';
import { Button } from 'app/components/ui/button';
import { saveAs } from 'file-saver';

export default function MainPages() {
  const [url, setUrl] = useState('');
  const [pages, setPages] = useState<{ title: string; url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCrawl = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/crawl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      setPages(data.pages || []);
    } catch (err) {
      setError('Failed to fetch page hierarchy.');
    } finally {
      setLoading(false);
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(pages, null, 2)], {
      type: 'application/json',
    });
    saveAs(blob, 'pages.json');
  };

  const downloadCSV = () => {
    const header = 'Title,URL\n';
    const rows = pages
      .map((page) => `"${page.title}","${page.url}"`)
      .join('\n');
    const blob = new Blob([header + rows], {
      type: 'text/csv;charset=utf-8;',
    });
    saveAs(blob, 'pages.csv');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Primary Pages</h1>

      <div className="flex space-x-4 mb-6">
        <Input
          type="text"
          placeholder="Enter website URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full"
        />
        <Button onClick={handleCrawl} disabled={loading}>
          {loading ? 'Scanning...' : 'Sorgula'}
        </Button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {pages.length > 0 && (
        <div className="flex space-x-4 mb-6">
          <Button variant="outline" onClick={downloadJSON}>
            İndir (JSON)
          </Button>
          <Button variant="outline" onClick={downloadCSV}>
            İndir (CSV)
          </Button>
        </div>
      )}

      <ul className="space-y-2">
        {pages.map((page, idx) => (
          <li key={idx} className="border p-3 rounded-md shadow-sm bg-white">
            <span className="font-semibold">{page.title}</span>{' '}
            <span className="text-sm text-gray-500">({page.url})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
