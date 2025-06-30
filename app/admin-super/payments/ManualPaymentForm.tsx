// 📄 app/admin-super/payments/ManualPaymentForm.tsx

'use client';

import { useState } from 'react';

export default function ManualPaymentForm() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<'stripe' | 'lemon'>('stripe');
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCheckoutUrl(null);

    try {
      const res = await fetch(`/api/admin/payments/manual-${method}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, amount: parseFloat(amount) }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create payment link');
      } else {
        setCheckoutUrl(data.url);
      }
    } catch (err) {
      setError('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded bg-white shadow mt-8">
      <h2 className="text-lg font-semibold mb-4">💳 Manual Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 rounded w-1/2"
          />
          <input
            type="number"
            placeholder="Amount ($)"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border px-3 py-2 rounded w-1/2"
          />
        </div>

        <div className="flex gap-4 items-center">
          <label className="text-sm font-medium">Method:</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as 'stripe' | 'lemon')}
            className="border px-3 py-2 rounded"
          >
            <option value="stripe">Stripe</option>
            <option value="lemon">LemonSqueezy</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
        >
          {loading ? 'Creating...' : 'Create Payment Link'}
        </button>
      </form>

      {checkoutUrl && (
        <div className="mt-4 p-3 border rounded bg-green-50 text-green-800">
          ✅ Link ready:
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-blue-600 underline"
          >
            {checkoutUrl}
          </a>
        </div>
      )}

      {error && <p className="mt-3 text-red-600">{error}</p>}
    </div>
  );
}
