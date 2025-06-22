// 📄 app/api/verify-email/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ message: 'Token is missing.' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        emailVerifyToken: token,
        isEmailVerified: false, // token aktifse ve hâlâ doğrulanmamışsa
      },
    });

    if (!user) {
      // Token geçersiz, süresi dolmuş ya da zaten kullanılmış olabilir
      return NextResponse.json(
        { message: 'This email has already been verified or the token is invalid.' },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerifiedAt: new Date(),
        emailVerifyToken: null, // Token artık geçersiz kılınır
      },
    });

    const baseUrl =
      process.env.NEXTAUTH_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.NODE_ENV === 'production'
        ? 'https://impactlens.co'
        : 'http://localhost:3000');

    return NextResponse.redirect(`${baseUrl}/auth/verified`);
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
