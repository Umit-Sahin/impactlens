// app/signup/page.tsx

import { Suspense } from 'react';
import SignUpPageContent from '@/app/components/SignUpPageContent';

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpPageContent />
    </Suspense>
  );
}
