'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
            disabled
          >
            Sign In (Coming Soon)
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 mb-2">or</p>
          <button
            onClick={() => signIn("github")}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded"
          >
            Sign In with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
