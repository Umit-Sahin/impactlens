'use client';

import React from "react";

export default function LandingPage() {
  const steps = [
    { title: "Sign in with GitHub", icon: "🔐" },
    { title: "Connect Your Repo", icon: "🔗" },
    { title: "Select a PR", icon: "📥" },
    { title: "See the Impact Map", icon: "📊" },
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="px-6 py-20 lg:py-32 bg-gradient-to-br from-purple-100 to-blue-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-purple-800 mb-6">
              Know What Your Code Changes Impact
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Visualize your pull request effects before merging. Identify affected files, modules, and risks instantly.
            </p>
            <div className="flex gap-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg rounded-xl">
                Try Free
              </button>
              <button className="text-purple-600 border border-purple-600 px-6 py-3 text-lg rounded-xl">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="/impact-graph-mock.png"
              alt="Impact graph visualization"
              className="w-full max-w-md rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="p-6 border border-gray-200 rounded-xl shadow-sm bg-white"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20 bg-gray-100">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
          <p className="text-gray-700 mb-6">
            Want to learn more or request a custom demo? Reach out and let’s talk.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-xl">
            Email Us
          </button>
        </div>
      </section>
    </div>
  );
}
