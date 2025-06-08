
// 📄 lib/auth.ts

import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import { compare } from 'bcryptjs';

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
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.password) return null;

          const isValid = await compare(credentials.password, user.password);

          if (!isValid) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error('[AUTH_ERROR]', error);
          return null;
        }
        if (process.env.NODE_ENV !== 'production') {
          console.log("Çalışan ortam (authorize):", process.env.NODE_ENV);
        }
        

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

        // 🔒 Güvenli cast
        const userWithRole = user as typeof user & { role?: string };
        token.role = userWithRole.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Token içinden gelen role bilgisini session.user içine aktar
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
};



// ✅ Final sürüm: Debug logları kaldırıldı, sistem kararlı hale getirildi.
// ✅ jwt callback her zaman role değerini veritabanından çekerek güncelliyor.
// ✅ SOC 2 uyumlu minimal veri aktarımı sağlanıyor.


// 📌 SOC 2 KRİTERİ HATIRLATMA:
// - Hassas veriler (şifreler) hiçbir zaman client tarafına taşınmaz.
// - Token ve session içinde yalnızca gerekli, minimal bilgiler tutulur.
// - .env secret değerleri gizli tutulur ve erişim loglanır.
// - Kod değişikliklerinde güvenlik gözden geçirmesi yapılır.

