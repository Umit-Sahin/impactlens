// app/product/apis/page.tsx

import React from "react";

export default function ProductApisPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">API Overview</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Available APIs</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>User Authentication API</li>
          <li>Data Analytics API</li>
          <li>Product Metadata API</li>
          <li>Error Monitoring API</li>
        </ul>
      </div>
    </div>
  );
}
