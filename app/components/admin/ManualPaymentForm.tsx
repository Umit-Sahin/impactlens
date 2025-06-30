'use client';

import { useState } from 'react';

export default function ManualPaymentForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    amount: '',
    bankName: '',
    ibanReference: '',
    paymentDate: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // API POST işlemi yapılabilir
    console.log('Manual payment submitted:', form);
    setSubmitted(true);
  };

  return (
    <div className="border p-6 rounded-lg bg-white shadow space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Manual Bank Transfer</h2>

      <div className="text-gray-700 text-sm space-y-2 bg-gray-50 p-4 rounded">
        <p><strong>Step 1:</strong> Transfer the amount to the bank account listed below.</p>
        <p><strong>Step 2:</strong> In the transfer description, include your <em>Full Name</em> and <em>Email</em>.</p>
        <p><strong>Step 3:</strong> After completing the transfer, fill out the form below.</p>
        <p><strong>Step 4:</strong> Your payment will be reviewed and approved within 1–2 business days.</p>

        <div className="bg-white border p-4 rounded mt-3 text-sm">
          <p><strong>Bank Name:</strong> Example Bank</p>
          <p><strong>IBAN:</strong> TR00 0000 0000 0000 0000 0000 00</p>
          <p><strong>Account Holder:</strong> ImpactLens Yazılım A.Ş.</p>
        </div>
      </div>

      {submitted ? (
        <div className="text-green-700 font-semibold">
          ✅ Your manual payment request has been submitted successfully.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
            <input
              name="amount"
              type="number"
              placeholder="Transferred Amount (USD)"
              value={form.amount}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
            <input
              name="bankName"
              type="text"
              placeholder="Your Bank's Name"
              value={form.bankName}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
            <input
              name="ibanReference"
              type="text"
              placeholder="Your IBAN or Transfer Reference"
              value={form.ibanReference}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
            <input
              name="paymentDate"
              type="date"
              value={form.paymentDate}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          <textarea
            name="notes"
            placeholder="Additional Notes (optional)"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            className="border px-3 py-2 rounded w-full"
          />

          <button
            type="submit"
            className="bg-purple-700 text-white px-5 py-2 rounded hover:bg-purple-800"
          >
            Submit Payment Info
          </button>
        </form>
      )}
    </div>
  );
}
