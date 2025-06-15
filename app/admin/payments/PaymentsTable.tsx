//app/admin/payments/PaymentsTable.tsx

'use client';

import { useState, useEffect } from 'react';

type Payment = {
  id: string;
  name: string;
  email: string;
  amount: number;
  lastPaymentDate: string;
};

export default function PaymentsTable() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Payment | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await fetch('/api/admin/payments');
      const data = await res.json();
      setPayments(data);
    };
    fetchPayments();
  }, []);

  const filtered = payments.filter(p =>
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Search by ID or Email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 w-1/2"
      />

      <table className="min-w-full text-sm text-left border bg-white shadow mt-2">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Last Payment</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((payment) => (
            <tr
              key={payment.id}
              onClick={() => setSelected(payment)}
              className="border-t cursor-pointer hover:bg-gray-50"
            >
              <td className="px-4 py-2">{payment.id}</td>
              <td className="px-4 py-2">{payment.name}</td>
              <td className="px-4 py-2">{payment.email}</td>
              <td className="px-4 py-2">${payment.amount.toFixed(2)}</td>
              <td className="px-4 py-2">{new Date(payment.lastPaymentDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ⬇️ Detaylı bilgi açılır */}
      {selected && (
        <div className="p-4 bg-white border shadow rounded">
          <h2 className="text-lg font-bold mb-2">Payment Details</h2>
          <p><strong>Name:</strong> {selected.name}</p>
          <p><strong>Email:</strong> {selected.email}</p>
          <p><strong>Amount:</strong> ${selected.amount}</p>
          <p><strong>Last Payment:</strong> {new Date(selected.lastPaymentDate).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
