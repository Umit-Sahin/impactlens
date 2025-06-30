'use client';

import React from 'react';

export default function LemonDonationForm() {
  const donationUrl = "https://impactlens.lemonsqueezy.com/buy/4afdd99b-5cc0-438d-b2b5-adfc0f59fffb";

  return (
    <div className="border rounded-lg p-6 bg-yellow-50 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-yellow-800">
        🍋 Support with a Small Donation
      </h2>

      <p className="text-gray-700 mb-4">
        If you'd like to support this project with a small donation, you can easily do so via Lemon Squeezy. 
        Donations help us improve and maintain the platform. Every bit counts!
      </p>

      <a
        href={donationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded transition"
      >
        Donate $2 via Lemon Squeezy
      </a>
    </div>
  );
}
