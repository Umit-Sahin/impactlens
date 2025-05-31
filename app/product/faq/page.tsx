'use client';

import React from 'react';

export default function FAQPage() {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
      <ul className="space-y-4 text-gray-700">
        <li>
          <strong>What is ImpactLens?</strong><br />
          ImpactLens helps developers visualize and understand the effects of code changes before they merge.
        </li>
        <li>
          <strong>Can I integrate it with GitHub?</strong><br />
          Yes, GitHub integration is built-in using our secure OAuth-based system.
        </li>
      </ul>
    </div>
  );
}
