// app/admin/payments/page.tsx

'use client';

import { useEffect, useState } from 'react';
import PaymentForm from '@/components/admin/PaymentForm';

type Payment = {
  id: string;
  name: string;
  email: string;
  amount: number;
  lastPaymentDate: string;
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await fetch('/api/admin/payments');
      const data = await res.json();
      setPayments(data);
    };
    fetchPayments();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold mb-6">Payments</h1>

      <div className="border p-4 rounded bg-white shadow">
        <h2 className="text-lg font-semibold mb-4">Add Payment</h2>
        <PaymentForm />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border bg-white shadow mt-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Payment Amount</th>
              <th className="px-4 py-2">Last Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t">
                <td className="px-4 py-2">{payment.id}</td>
                <td className="px-4 py-2">{payment.name}</td>
                <td className="px-4 py-2">{payment.email}</td>
                <td className="px-4 py-2">${payment.amount.toFixed(2)}</td>
                <td className="px-4 py-2">{new Date(payment.lastPaymentDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
