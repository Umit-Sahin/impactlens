// 📄 app/onboarding/success/page.tsx

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';

export default async function SuccessPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin');
  }

  // Eğer kullanıcı zaten ödeme yapmışsa doğrudan product'a yönlendir
  if (session.user.hasActivePayment) {
    redirect('/product/dashboard');
  }

  return (
    <div className="max-w-2xl mx-auto mt-24 text-center px-4">
      <h1 className="text-4xl font-bold mb-6">🚀 Ready for Launch</h1>
      <p className="text-lg mb-4">
        Thank you for completing your payment, <strong>{session.user.email}</strong>.
      </p>
      <p className="mb-6">
        Your access will be activated in a few seconds. You will be redirected automatically.
      </p>

      <div className="animate-pulse text-2xl font-semibold text-green-600">Activating...</div>

      {/* Otomatik yönlendirme */}
      <meta http-equiv="refresh" content="4;url=/product/dashboard" />
    </div>
  );
}
