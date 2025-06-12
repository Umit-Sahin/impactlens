// app/signup/page.tsx

import { Suspense } from 'react';
import SignUpPageContent from '@/components/SignUpPageContent';

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpPageContent />
    </Suspense>
  );
}
