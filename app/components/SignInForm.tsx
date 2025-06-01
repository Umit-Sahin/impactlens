'use client';

'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.ok) {
      router.push("/product");
    } else {
      alert("Invalid credentials");
    }
  };

  const signInAsDev = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      username: "dev",
      password: "dev",
    });

    if (result?.ok) {
      router.push("/product");
    } else {
      alert("Dev login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">
        Sign In to ImpactLens
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition"
        >
          Sign In
        </button>
      </form>

      {/* Sign in as Dev - only in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-6 text-center">
          <button
              onClick={() => window.location.href = '/api/dev-login'}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
            🚀 Sign in as Dev
          </button>
        </div>
      )}
    </div>
  );
}

