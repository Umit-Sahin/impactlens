// app/api/admin/logs/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const logs = await prisma.log.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        user: {
          select: { email: true }
        }
      }
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error('[GET_LOGS_ERROR]', error);
    return NextResponse.json({ message: 'Failed to fetch logs' }, { status: 500 });
  }
}
