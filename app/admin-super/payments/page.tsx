// 📄 File: app/admin-super/payments/page.tsx
'use client';

// --------------------- IMPORTS ---------------------
import { useEffect, useState } from 'react';
import PaymentDetailsDrawer from './PaymentDetailsDrawer';
import { Payment } from 'types/payment';
import AddPaymentModal from '@/components/admin/AddPaymentModal';
import ManualPaymentForm from '@/components/admin/ManualPaymentForm';
import LemonDonationForm from '@/components/admin/LemonDonationForm';
import StripePaymentForm from '@/components/admin/StripePaymentForm';

// --------------------- COMPONENT ---------------------
export default function AdminPaymentsPage() {
  // ------------ STATE TANIMLAMALARI ------------
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'stripe' | 'lemon'>('stripe');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ------------ ÖDEMELERI ÇEK ------------
  useEffect(() => {
    const fetchPayments = async () => {
      const res = await fetch('/api/admin/payments');
      const data = await res.json();
      setPayments(data);
    };
    fetchPayments();
  }, []);

  // ------------ FILTRELE ------------
  const filtered = payments
  .filter((p) =>
    activeTab === 'stripe' ? p.source !== 'lemonsqueezy' : p.source === 'lemonsqueezy'
  )
  .filter((p) => {
    const matchesSearch =
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      !statusFilter || p.status.toLowerCase() === statusFilter.toLowerCase();

    const paymentDate = new Date(p.lastPaymentDate);
    const from = startDate ? new Date(startDate) : null;
    const to = endDate ? new Date(endDate) : null;

    const matchesDate =
      (!from || paymentDate >= from) && (!to || paymentDate <= to);

    return matchesSearch && matchesStatus && matchesDate;
  });


  // ------------ PAGINATION ------------
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ------------ RENDER ------------
  return (
    <div className="p-6 space-y-8">
      {/* -------- Header & Add Payment -------- */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold">Payments</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
        >
          + Add Payment
        </button>
      </div>

      {/* -------- Add Payment Modal -------- */}
      {showModal && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <StripePaymentForm />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <LemonDonationForm />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <ManualPaymentForm />
          </div>
        </div>
      )}

      {/* -------- Tabs -------- */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => setActiveTab('stripe')}
          className={`px-4 py-2 rounded ${
            activeTab === 'stripe'
              ? 'bg-purple-700 text-white'
              : 'bg-gray-100'
          }`}
        >
          Stripe Payments
        </button>
        <button
          onClick={() => setActiveTab('lemon')}
          className={`px-4 py-2 rounded ${
            activeTab === 'lemon'
              ? 'bg-purple-700 text-white'
              : 'bg-gray-100'
          }`}
        >
          Lemon Donations
        </button>
      </div>

      {/* -------- Filters -------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search by email or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">All Statuses</option>
          <option value="SUCCESS">Success</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>

      {/* -------- Table -------- */}
      <div className="overflow-x-auto mt-4">
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
            {paginated
              .filter((p) =>
                activeTab === 'stripe'
                  ? p.source !== 'lemonsqueezy'
                  : p.source === 'lemonsqueezy'
              )
              .map((p) => (
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

        {/* -------- Pagination -------- */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">Total: {filtered.length} payments</span>
          <div>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 mx-1 border rounded"
            >
              ◀
            </button>
            <span className="px-3 py-1 text-purple-700 font-semibold">
              {currentPage}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  prev < Math.ceil(filtered.length / itemsPerPage) ? prev + 1 : prev
                )
              }
              disabled={currentPage >= Math.ceil(filtered.length / itemsPerPage)}
              className="px-3 py-1 mx-1 border rounded"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      {/* -------- Drawer -------- */}
      {selectedId && (
        <PaymentDetailsDrawer
          paymentId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
