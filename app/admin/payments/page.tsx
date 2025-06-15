// app/admin/payments/page.tsx

'use client';

import { useEffect, useState } from 'react';
import PaymentForm from '@/components/admin/PaymentForm';
import PaymentDetailsDrawer from './PaymentDetailsDrawer';
import { Payment } from 'types/payment'; // Eğer ayrı type dosyasından alıyorsan

export default function AdminPaymentsPage() {
  /* ----------------- local state tanimlamalari ------------------ */
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  /* ----------------- odeme verileri çek ------------------ */
  useEffect(() => {
    const fetchPayments = async () => {
      const res = await fetch('/api/admin/payments');
      const data = await res.json();
      setPayments(data);
    };
    fetchPayments();
  }, []);

  /* ----------------- filtrelenmiş liste ------------------ */
  const filtered = payments.filter((p) =>
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  /* ----------------- render ------------------ */
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold mb-6">Payments</h1>

      {/* ----------------- Yeni ödeme formu ------------------ */}
      <div className="border p-4 rounded bg-white shadow">
        <h2 className="text-lg font-semibold mb-4">Add Payment</h2>
        <PaymentForm />
      </div>

      {/* ----------------- Arama / filtreleme ------------------ */}
      <div className="flex items-center justify-between mt-8 mb-4">
        <input
          type="text"
          placeholder="Search by email or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-1/2"
        />
      </div>

      {/* ----------------- Ödeme listesi tablosu ------------------ */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Surname</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Card Last 4</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.id}
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedId(p.id)}
              >
                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.surname}</td>
                <td className="px-4 py-2">{p.email}</td>
                <td className="px-4 py-2">{p.company}</td>
                <td className="px-4 py-2">${p.amount.toFixed(2)}</td>
                <td className="px-4 py-2">{p.cardLast4 || '-'}</td>
                <td className="px-4 py-2">{p.status}</td>
                <td className="px-4 py-2">{new Date(p.lastPaymentDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ----------------- Drawer: Satır detayları ------------------ */}
      {selectedId && (
        <PaymentDetailsDrawer
          paymentId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
