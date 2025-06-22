//app/check-email/page.tsx

export default function CheckEmailPage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-3xl font-bold mb-4">E-mail Verification</h1>
        <p className="text-gray-600 max-w-md">
            Please click on the verification link sent to your email address. 
            If you can't find it in your inbox, check your spam folder.
        </p>
      </div>
    );
  }
  