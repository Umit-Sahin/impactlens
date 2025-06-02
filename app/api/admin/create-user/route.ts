// ✅ app/api/admin/create-user/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as { role?: string })?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, email, username, password, role } = await req.json();
    if (!name || !email || !username || !password || !role) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, username, password: hashedPassword, role },
      select: { id: true, name: true, email: true, username: true, role: true, createdAt: true },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('[CREATE_USER_ERROR]', error);
    return NextResponse.json({ message: 'Failed to create user' }, { status: 500 });
  }
}