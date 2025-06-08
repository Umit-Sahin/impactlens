//app/verify-email/page.tsx

import { Suspense } from 'react';
import VerifyEmailContent from '@/app/components/VerifyEmailContent';

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
