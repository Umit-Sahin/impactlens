//app/api/admin/users/route.tsx

// Backend endpoint test checklist:
// ✅ /api/admin/users GET → sadece SUPER_ADMIN erişir → kullanıcı listesi döner
// ✅ /api/admin/users POST → sadece SUPER_ADMIN erişir → rol günceller

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import prisma from '@lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized: No session' }, { status: 401 });
  }

  if (session.user?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('[GET_USERS_ERROR]', error);
    return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized: No session' }, { status: 401 });
  }

  if (session.user?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ message: 'Unauthorized: Insufficient role' }, { status: 403 });
  }

  try {
    const { userId, newRole } = await req.json();

    if (!userId || !newRole) {
      return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
    }

    const validRoles = ['SUPER_ADMIN', 'ADMIN', 'DEVELOPER', 'USER'];
    if (!validRoles.includes(newRole)) {
      return NextResponse.json({ message: 'Invalid role' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('[UPDATE_ROLE_ERROR]', error);
    return NextResponse.json({ message: 'Failed to update role' }, { status: 500 });
  }
}

// ⚠️ Test sırasında: 
// - Frontend isteği header’a auth cookie taşıyor mu kontrol et
// - GET ve POST endpoint’lerinin çalışmasını Postman veya curl ile deneyebilirsin
// - Console’daki hata mesajlarını dikkatle izle
