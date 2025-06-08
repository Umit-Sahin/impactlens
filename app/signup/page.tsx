// app/signup/page.tsx

'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SignUpForm from '@/app/components/SignUpForm';
import classNames from 'classnames';

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get('plan');
  const router = useRouter();

  const steps = [
    { title: 'Choose Plan' },
    { title: 'Sign Up Form' },
    { title: 'Verification' },
  ];

  const currentStep = selectedPlan ? 2 : 1;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="flex justify-center mb-10">
        <div className="flex space-x-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={classNames(
                  'w-8 h-8 rounded-full text-white flex items-center justify-center',
                  {
                    'bg-green-500': index + 1 < currentStep,
                    'bg-purple-700': index + 1 === currentStep,
                    'bg-gray-300': index + 1 > currentStep,
                  }
                )}
              >
                {index + 1}
              </div>
              <span className="mt-2 text-sm text-gray-700 text-center">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedPlan ? (
        <div className="flex flex-col items-center min-h-[60vh] space-y-6">
          <div className="w-full max-w-md bg-white px-6 py-3 rounded-xl text-left">
            <button
              onClick={() => router.push('/signup')}
              className="text-purple-700 hover:underline text-md font-semibold"
            >
              ← Change Plan
            </button>
          </div>
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Continue for the <span className="text-purple-700">{selectedPlan}</span> Plan
            </h2>
            <SignUpForm selectedPlan={selectedPlan} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center min-h-[60vh] space-y-6">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-center mb-6">Select a Plan to Continue</h2>
            <div className="flex flex-col space-y-4">
              {['Basic', 'Pro', 'Enterprise'].map((plan) => (
                <button
                  key={plan}
                  onClick={() => router.push(`/signup?plan=${plan}`)}
                  className="w-full bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition"
                >
                  Choose {plan}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
