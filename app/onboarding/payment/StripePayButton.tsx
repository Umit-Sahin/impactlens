//app/onboarding/payment/StripePayButton.tsx

'use client';

export default function StripePayButton() {
  const handlePayment = async () => {
    const res = await fetch('/api/payment/checkout', { method: 'POST' });
    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Something went wrong while redirecting to payment.');
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded"
    >
      Proceed to Payment
    </button>
  );
}
