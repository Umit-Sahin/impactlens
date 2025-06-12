// app/api/admin/audit-logs/route.ts

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

    const auditLogs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      select: {
        id: true,
        action: true,
        level: true,
        details: true,
        createdAt: true,
        user: { select: { id: true, name: true, email: true, role: true } },
      },
    });

    return NextResponse.json(auditLogs, { status: 200 });
  } catch (error) {
    console.error('[FETCH_AUDIT_LOGS_ERROR]', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
