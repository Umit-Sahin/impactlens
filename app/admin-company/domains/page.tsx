// 📄 app/admin-company/domains/page.tsx

'use client';

import { useEffect, useState } from 'react';

export default function ManageDomainsPage() {
  const [domains, setDomains] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [limit, setLimit] = useState(1); // varsayılan BASIC
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDomains = async () => {
      const res = await fetch('/api/company/domains');
      const data = await res.json();
      setDomains(data?.domains || []);

      // Plan bilgisi session üzerinden alınabilir
      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json();
      const plan = session?.user?.plan;
      if (plan === 'PRO') setLimit(3);
      else if (plan === 'ENTERPRISE') setLimit(10);
      else setLimit(1);

      setLoading(false);
    };

    fetchDomains();
  }, []);

  const handleAddDomain = () => {
    if (domains.length >= limit) {
      setMessage(`Your plan allows maximum ${limit} domains.`);
      return;
    }
    if (input && !domains.includes(input)) {
      setDomains([...domains, input]);
      setInput('');
      setMessage('');
    }
  };

  const handleSave = async () => {
    const res = await fetch('/api/company/domains', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domains }),
    });

    if (res.ok) {
      setMessage('Domains saved successfully.');
    } else {
      setMessage('Failed to save domains.');
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Manage Domains</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="example.com"
          className="border px-3 py-1 rounded w-full"
        />
        <button
          onClick={handleAddDomain}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          Add
        </button>
      </div>

      <ul className="mb-4 space-y-1">
        {domains.map((d, idx) => (
          <li key={idx} className="flex justify-between items-center border p-2 rounded">
            {d}
            <button
              onClick={() => setDomains(domains.filter((_, i) => i !== idx))}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
}

