// components/UserActions.tsx
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function UserActions() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return (
    <div className="flex items-center gap-4">
      {session?.user ? (
        <>
          <span className="text-sm text-gray-700">Hi, {session.user.name}</span>
          <Button onClick={() => signOut()} variant="outline">
            Sign Out
          </Button>
        </>
      ) : (
        <Button onClick={() => signIn("github")} variant="default">
          Sign In with GitHub
        </Button>
      )}
    </div>
  );
}
