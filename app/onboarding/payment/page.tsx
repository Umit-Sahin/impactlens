// 📄 app/onboarding/payment/page.tsx

import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import { redirect } from 'next/navigation';
import StripePayButton from '@/onboarding/payment/StripePayButton';

export default async function PaymentPage() {
  const session = await getServerSession(authOptions);

  // 👤 Oturum kontrolü
  if (!session) {
    redirect('/auth/signin');
  }

  // 🔐 Yetkili kullanıcılar direkt yönlendirilsin
  if (session.user.role === 'SUPER_ADMIN' || session.user.hasActivePayment) {
    redirect('/product/dashboard');
  }

  return (
    <div className="max-w-2xl mx-auto mt-16 px-4">
      {/* 🎉 Başlık */}
      <h1 className="text-3xl font-bold mb-4">🎉 Welcome to ImpactLens</h1>

      {/* ✅ Email Doğrulama Mesajı */}
      <div className="bg-green-100 text-green-800 p-4 rounded mb-6">
        ✅ Your email <strong>{session.user.email}</strong> has been verified successfully.
      </div>

      {/* 💳 Ödeme Bilgisi */}
      <div className="bg-yellow-50 border border-yellow-300 p-4 rounded">
        <p className="text-lg font-medium mb-2">🧾 Payment Required</p>
        <p>
          Please complete your payment to access all features. This process might take 1-2 minutes.
          Once done, you'll see a <strong>"Ready for Launch"</strong> message.
        </p>
      </div>

      {/* 💳 Ödeme Butonu */}
      <div className="mt-8 text-center">
        <StripePayButton userId={session.user.id} />
      </div>
    </div>
  );
}
