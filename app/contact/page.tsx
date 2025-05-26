// app/contact/page.tsx

import React from "react";
import Header from "@/app/components/Header";

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center min-h-[60vh] bg-white px-6 py-12 space-y-10">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Contact Us</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
              rows={4}
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Address Section */}
      <div className="max-w-2xl w-full bg-purple-50 p-6 rounded-2xl shadow-md border border-gray-200 text-center">
        <h2 className="text-xl font-semibold text-purple-700 mb-2">Address</h2>
        <p className="text-gray-700">Ankara, Türkiye</p>
      </div>
    </div>
  );
}
