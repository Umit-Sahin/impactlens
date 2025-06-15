// 📄 app/api/admin/users/route.ts

// Backend endpoint test checklist:
// ✅ /api/admin/users GET  → SUPER_ADMIN & ADMIN erişimi → kullanıcı listesi döner
// ✅ /api/admin/users POST → sadece SUPER_ADMIN erişir → rol günceller

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import prisma from '@lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { role, id } = session.user;

  const baseSelect = {
    id: true,
    name: true,
    surname: true,
    email: true,
    role: true,
    isWhitelisted: true,
    createdAt: true,
    company: {
      select: { name: true },
    },
  };

  // 🔐 SUPER_ADMIN → tüm kullanıcılar
  if (role === 'SUPER_ADMIN') {
    const users = await prisma.user.findMany({
      select: baseSelect,
      orderBy: { createdAt: 'desc' },
    });

    const formatted = users.map((user) => ({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
      isWhitelisted: user.isWhitelisted,
      createdAt: user.createdAt,
      companyName: user.company?.name ?? null,
    }));

    return NextResponse.json(formatted);
  }

  // 🔐 ADMIN → sadece kendi şirketindekiler
  if (role === 'ADMIN') {
    const admin = await prisma.user.findUnique({
      where: { id },
      select: { companyId: true },
    });

    if (!admin?.companyId) {
      return NextResponse.json([], { status: 200 });
    }

    const users = await prisma.user.findMany({
      where: { companyId: admin.companyId },
      select: baseSelect,
      orderBy: { createdAt: 'desc' },
    });

    const formatted = users.map((user) => ({
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
      isWhitelisted: user.isWhitelisted,
      createdAt: user.createdAt,
      companyName: user.company?.name ?? null,
    }));

    return NextResponse.json(formatted);
  }

  return NextResponse.json({ message: 'Unauthorized: Invalid role' }, { status: 403 });
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
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        role: true,
        isWhitelisted: true,
        company: { select: { name: true } },
        createdAt: true,
      },
    });

    return NextResponse.json({
      ...updatedUser,
      companyName: updatedUser.company?.name ?? null,
    });
  } catch (error) {
    console.error('[UPDATE_ROLE_ERROR]', error);
    return NextResponse.json({ message: 'Failed to update role' }, { status: 500 });
  }
}
