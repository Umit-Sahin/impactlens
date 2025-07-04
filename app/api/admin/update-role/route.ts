// ✅ app/api/admin/update-role/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@lib/auth';
import prisma from '@lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized: No session' }, { status: 401 });
    }

    const userRole = (session.user as { role?: string })?.role;
    if (userRole !== 'SUPER_ADMIN') {
      return NextResponse.json({ message: 'Unauthorized: Insufficient role' }, { status: 403 });
    }

    const { userId, newRole } = await req.json();
    const validRoles = ['SUPER_ADMIN', 'ADMIN', 'DEVELOPER', 'USER'];
    if (!userId || !validRoles.includes(newRole)) {
      return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: { id: true, name: true, email: true, role: true },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('[UPDATE_ROLE_ERROR]', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}