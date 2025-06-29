// 📄 app/onboarding/payment/StripePayButton.tsx

'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { LoaderCircle } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface StripePayButtonProps {
  userId: string;
}

export default function StripePayButton({ userId }: StripePayButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Checkout session failed.');
      }

      const { sessionId } = await res.json();
      const stripe = await stripePromise;

      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      } else {
        throw new Error('Stripe.js not loaded');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="bg-purple-700 text-white px-6 py-3 rounded hover:bg-purple-800 transition font-medium flex items-center justify-center gap-2"
      >
        {loading ? <LoaderCircle className="w-5 h-5 animate-spin" /> : null}
        {loading ? 'Redirecting to Stripe...' : 'Proceed to Payment'}
      </button>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
}
