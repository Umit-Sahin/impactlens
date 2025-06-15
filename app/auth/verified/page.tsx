//app/auth/verified/page.tsx

export const metadata = {
    title: "Email verified – ImpactLens",
  };
  
  export default function EmailVerifiedPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            Email successfully verified!
          </h1>
  
          <p className="text-gray-700 mb-6">
            Your email address is now confirmed. You can sign in and start using ImpactLens.
          </p>
  
          <a
            href="/signin"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded transition"
          >
            Go to Sign-In
          </a>
        </div>
      </div>
    );
  }
  