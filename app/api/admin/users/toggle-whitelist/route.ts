// 📄 app/api/admin/users/toggle-whitelist/route.ts

import { NextResponse } from 'next/server';
import prisma from '@lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { userId, isWhitelisted } = await req.json();

  if (!userId || typeof isWhitelisted !== 'boolean') {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { isWhitelisted },
      select: {
        id: true,
        isWhitelisted: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('[TOGGLE_WHITELIST_ERROR]', error);
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}
