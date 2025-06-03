// app/api/admin/logs/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized: No session' }, { status: 401 });
    }

    const userRole = (session.user as { role?: string })?.role;
    if (userRole !== 'SUPER_ADMIN') {
      return NextResponse.json({ message: 'Unauthorized: Insufficient role' }, { status: 403 });
    }

    const logs = await prisma.log.findMany({
      orderBy: { created_at: 'desc' },
      take: 100,
      select: {
        id: true,
        action: true,
        ip_address: true,
        created_at: true,
        user: { select: { id: true, name: true, email: true, role: true } },
      },
    });

    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    console.error('[FETCH_LOGS_ERROR]', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}