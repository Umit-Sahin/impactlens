// 📄 File: app/api/admin/users/create/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // ❌ Eğer giriş yapılmamışsa veya kullanıcı SUPER_ADMIN değilse
  if (!session || session.user?.role !== 'SUPER_ADMIN') {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { name, email, username, password, role } = await req.json();

    // ✅ Zorunlu alanların kontrolü
    if (!name || !email || !username || !password || !role) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
    }

    // ✅ Şifreyi hashle
    const hashedPassword = await hash(password, 10);

    // ✅ Kullanıcıyı oluştur
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error('[CREATE_USER_ERROR]', error);
    return new Response(JSON.stringify({ message: 'Failed to create user' }), { status: 500 });
  }
}
