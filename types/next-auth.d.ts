// types/next-auth.d.ts

import { Role, Plan } from '@prisma/client';

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: Role;
      plan?: Plan;
      hasActivePayment?: boolean;
      isWhitelisted?: boolean;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: Role;
    plan?: Plan;
    hasActivePayment?: boolean;
    isWhitelisted?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: Role;
    plan?: Plan;
    hasActivePayment?: boolean;
    isWhitelisted?: boolean;
  }
}
