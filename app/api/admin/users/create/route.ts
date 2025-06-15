//app/api/admin/users/create/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import prisma from '@lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { role, id } = session.user;

  // Yalnızca ADMIN ve SUPER_ADMIN kullanıcılar yeni kullanıcı oluşturabilir
  if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    const { name, surname, email, password, newRole } = await req.json();

    if (!name || !email || !password || !newRole) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const validRoles = ['USER', 'DEVELOPER', 'ADMIN'];
    if (role !== 'SUPER_ADMIN' && newRole === 'SUPER_ADMIN') {
      return NextResponse.json({ message: 'Only SUPER_ADMIN can assign SUPER_ADMIN' }, { status: 403 });
    }

    if (!validRoles.includes(newRole) && role !== 'SUPER_ADMIN') {
      return NextResponse.json({ message: 'Invalid role' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
    }

    const hashedPassword = await hash(password, 12);

    // ADMIN sadece kendi şirketine kullanıcı ekleyebilir
    const companyId = role === 'ADMIN'
      ? (await prisma.user.findUnique({ where: { id }, select: { companyId: true } }))?.companyId
      : (await req.json()).companyId;

    if (!companyId) {
      return NextResponse.json({ message: 'Company ID is required' }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword,
        role: newRole,
        isEmailVerified: false,
        companyId,
      },
    });

    return NextResponse.json({ id: newUser.id });
  } catch (error) {
    console.error('[CREATE_USER_ERROR]', error);
    return NextResponse.json({ message: 'Failed to create user' }, { status: 500 });
  }
}
