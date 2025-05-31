// components/UserActions.tsx

'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function UserActions() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p className="text-sm text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex gap-4 items-center">
      {session ? (
        <button
          onClick={() => signOut({ callbackUrl: '/signin' })}
          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-700 to-purple-500 rounded-md shadow hover:from-purple-800 hover:to-purple-600 transition"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => signIn()}
          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-400 rounded-md shadow hover:from-purple-700 hover:to-purple-500 transition"
        >
          Sign In
        </button>
      )}
    </div>
  );
}
