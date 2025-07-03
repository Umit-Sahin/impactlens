// app/pricing/DonateCard.tsx

"use client";

import { ExternalLink } from "lucide-react";

export default function DonateCard() {
  return (
    <div className="border rounded-2xl shadow-md text-center p-6 bg-white">
      <h3 className="text-xl font-bold mb-2 text-blue-700">
        Support ImpactLens
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        If you like what we’re building, support the project with a $2 donation.
      </p>
      <a
        href="https://impactlens.lemonsqueezy.com/buy/4afdd99b-5cc0-438d-b2b5-adfc0f59fffb"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-purple-800 transition"
      >
        Donate $2 <ExternalLink className="w-4 h-4 ml-2" />
      </a>
    </div>
  );
}
