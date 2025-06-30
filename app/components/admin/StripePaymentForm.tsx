// app/components/admin/StripePaymentForm.tsx

'use client';

import React, { useState } from 'react';

export default function StripePaymentForm() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !amount) {
      setError('Please enter both email and amount.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, amount: parseFloat(amount) }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Stripe ile redirect işlemi için URL döndürülmüyorsa, frontend'de stripe.js ile çalışabilirsin.
      // Biz burada success için clientSecret yerine checkout sayfası açıyoruz varsayımıyla:
      const stripeUrl = `/api/admin/payments/create`;
      const createRes = await fetch(stripeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, amount }),
      });
      const createData = await createRes.json();
      if (createData.url) {
        window.location.href = createData.url;
      } else {
        throw new Error('Failed to create checkout session.');
      }
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-6 bg-white shadow">
      <h2 className="text-lg font-semibold mb-4 text-purple-800">
        💳 Collect Stripe Payment
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            step="0.01"
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded transition"
        >
          {loading ? 'Processing...' : 'Generate Stripe Payment'}
        </button>
      </div>
    </form>
  );
}
