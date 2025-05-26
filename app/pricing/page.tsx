// app/pricing/page.tsx

import React from "react";
import MainBody from "@/app/components/MainBody";



export default function PricingPage() {
  const plans = [
    {
      title: "Basic",
      price: "$0",
      description: "Perfect for individuals getting started.",
      features: ["1 project", "Basic insights", "Community support"],
    },
    {
      title: "Pro",
      price: "$19/month",
      description: "Ideal for small teams.",
      features: ["Up to 10 projects", "Advanced insights", "Priority support"],
    },
    {
      title: "Enterprise",
      price: "Contact us",
      description: "Tailored solutions for enterprises.",
      features: ["Unlimited projects", "Custom analytics", "Dedicated support"],
    },
  ];

  return (
    <MainBody>
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Choose Your Plan
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className="border border-gray-200 rounded-2xl p-6 shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-purple-700 mb-2">
              {plan.title}
            </h2>
            <p className="text-3xl font-bold text-gray-800 mb-4">
              {plan.price}
            </p>
            <p className="text-gray-600 mb-6">{plan.description}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-gray-700">
                  • {feature}
                </li>
              ))}
            </ul>
            <button className="w-full bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition">
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
    </MainBody>
  );

}

