// 📄 lib/auth.ts

import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@lib/prisma';
import { compare } from 'bcryptjs';
import { Role, Plan } from '@prisma/client';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            company: {
              select: { plan: true },
            },
          },
        });

        if (!user || !user.password) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          plan: user.company?.plan as Plan | undefined,
          hasActivePayment: user.hasActivePayment,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.plan = (user as any).plan;
        token.hasActivePayment = (user as any).hasActivePayment;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.plan = token.plan as Plan;
        (session.user as any).hasActivePayment = token.hasActivePayment;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
};

// ✅ Server-side session helper
import { getServerSession } from 'next-auth';
export const auth = () => getServerSession(authOptions);
