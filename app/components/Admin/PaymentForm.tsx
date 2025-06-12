// app/components/admin/PaymentForm.tsx

"use client";

import { useState } from "react";

export default function PaymentForm() {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, email }),
    });
    if (res.ok) {
      alert("Payment created!");
      setAmount("");
      setEmail("");
    } else {
      alert("Error submitting payment.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">User Email</label>
        <input
          type="email"
          className="w-full border px-2 py-1 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Amount (USD)</label>
        <input
          type="number"
          className="w-full border px-2 py-1 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Submit Payment
      </button>
    </form>
  );
}
