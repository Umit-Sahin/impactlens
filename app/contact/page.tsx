// app/contact/page.tsx

'use client';

import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ name: "", email: "", message: "" });
        setStatus("success");
      } else {
        throw new Error("Failed");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[60vh] bg-white px-6 py-12 space-y-10">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
              rows={4}
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
          {status === "success" && <p className="text-green-600 text-sm mt-2">✅ Your message was sent.</p>}
          {status === "error" && <p className="text-red-600 text-sm mt-2">❌ Your message was not sent. Please try again.</p>}
        </form>
      </div>

      <div className="max-w-2xl w-full bg-purple-50 p-6 rounded-2xl shadow-md border border-gray-200 text-center">
        <h2 className="text-xl font-semibold text-purple-700 mb-2">Address</h2>
        <p className="text-gray-700">Ankara, Türkiye</p>
      </div>
    </div>
  );
}
