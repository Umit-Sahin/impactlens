// app/product/page.tsx

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';

export default async function ProductPage() {
  const session = await getServerSession(authOptions);

  const isSuperAdmin = session?.user?.role === 'SUPER_ADMIN';
  const isWhitelisted = session?.user?.isWhitelisted;
  const hasPaid = session?.user?.hasActivePayment;

  if (!hasPaid && !isSuperAdmin && !isWhitelisted) {
    redirect('/payment-required'); // Bu sayfayı ayrıca yaparız
  }

  return (
    <div>
      {/* ürün içeriği */}
      <h1 className="text-2xl font-bold">Welcome to ImpactLens</h1>
    </div>
  );
}
