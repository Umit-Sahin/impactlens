// app/signup/page.tsx

import dynamic from 'next/dynamic';

// Client component'i dinamik olarak yükle
const SignUpPageContent = dynamic(() => import('@/app/components/SignUpPageContent'), {
  ssr: false,
});

export default function SignUpPage() {
  return <SignUpPageContent />;
}
