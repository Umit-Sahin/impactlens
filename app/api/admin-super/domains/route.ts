// 📄 app/api/admin-super/domains/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import prisma from '@lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      include: {
        company: true,
        dataset: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('[ADMIN_SUPER_DOMAINS_GET_ERROR]', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
