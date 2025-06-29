// app/pricing/page.tsx

'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MainBody from "@/components/MainBody";
import DonateCard from "./DonateCard";

export default function PricingPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      title: "Basic",
      price: "Contact us",
      description: "Perfect for individuals getting started.",
      features: ["1 project", "Basic insights", "Community support"],
    },
    {
      title: "Pro",
      price: "Contact us",
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

  const handleSignUp = () => {
    if (selectedPlan) {
      router.push(`/signup?plan=${selectedPlan}`);
    }
  };

  return (
    <MainBody>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Choose Your Plan
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.title;
            return (
              <div
                key={plan.title}
                onClick={() => setSelectedPlan(plan.title)}
                className={`cursor-pointer border rounded-2xl p-6 shadow transition 
                  ${isSelected ? 'border-purple-700 bg-purple-50' : 'border-gray-200 hover:shadow-md'}
                `}
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
                    <li key={i} className="text-gray-700">• {feature}</li>
                  ))}
                </ul>
                {isSelected && (
                  <p className="text-sm text-purple-700 font-medium">
                    ✓ Selected
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={handleSignUp}
            disabled={!selectedPlan}
            className={`px-6 py-3 rounded-lg text-white transition
              ${selectedPlan ? 'bg-purple-700 hover:bg-purple-800' : 'bg-gray-300 cursor-not-allowed'}
            `}
          >
            {selectedPlan ? `Sign Up for ${selectedPlan}` : "Select a Plan to Sign Up"}
          </button>
        </div>
      </div>
      <div className="mt-16 max-w-md mx-auto">
         <DonateCard />
      </div>

    </MainBody>
  );
}

