// ✅ app/api/admin/create-user/route.ts

import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import prisma from '@lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, surname, email, password, role } = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    const newUser = await prisma.user.create({
      data: { name, surname, email, password: hashedPassword, role },
      select: { id: true, name: true, surname: true, email: true, role: true, createdAt: true },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Create User Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
