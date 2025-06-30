'use client';

import { useState } from 'react';
import StripePaymentForm from './StripePaymentForm';
import LemonDonationForm from './LemonDonationForm';
import ManualPaymentForm from './ManualPaymentForm';

type Props = {
  onClose: () => void;
};

export default function AddPaymentModal({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState<'stripe' | 'lemon' | 'manual'>('stripe');

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
        {/* Kapat Butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Add New Payment</h2>

        {/* Tab Seçici */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('stripe')}
            className={`px-4 py-2 rounded ${
              activeTab === 'stripe' ? 'bg-purple-700 text-white' : 'bg-gray-100'
            }`}
          >
            Stripe Payment
          </button>
          <button
            onClick={() => setActiveTab('lemon')}
            className={`px-4 py-2 rounded ${
              activeTab === 'lemon' ? 'bg-purple-700 text-white' : 'bg-gray-100'
            }`}
          >
            Lemon Donation
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`px-4 py-2 rounded ${
              activeTab === 'manual' ? 'bg-purple-700 text-white' : 'bg-gray-100'
            }`}
          >
            Manual (Bank Transfer)
          </button>
        </div>

        {/* İçerik */}
        <div className="mt-2">
          {activeTab === 'stripe' && <StripePaymentForm />}
          {activeTab === 'lemon' && <LemonDonationForm />}
          {activeTab === 'manual' && <ManualPaymentForm />}
        </div>
      </div>
    </div>
  );
}
