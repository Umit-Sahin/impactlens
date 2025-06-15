// app/components/admin/PaymentForm.tsx

'use client';

import { useState } from 'react';

export default function PaymentForm() {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Payment created!');
        setAmount('');
        setEmail('');
      } else {
        setMessage(`❌ ${data?.error || 'Error submitting payment.'}`);
      }
    } catch (err) {
      setMessage('❌ Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">User Email</label>
        <input
          type="email"
          className="w-full border px-2 py-1 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Amount (USD)</label>
        <input
          type="number"
          className="w-full border px-2 py-1 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Payment'}
      </button>

      {message && (
        <p className="text-sm mt-2">{message}</p>
      )}
    </form>
  );
}
