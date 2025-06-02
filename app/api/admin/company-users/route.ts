// ✅ app/api/admin/company-users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as { role?: string })?.role !== 'ADMIN' && (session.user as { role?: string })?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { companyId, userId } = await req.json();
    if (!companyId || !userId) {
      return NextResponse.json({ message: 'Company ID and User ID are required' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { companyId },
      select: { id: true, name: true, email: true, role: true, companyId: true },
    });

    return NextResponse.json({ message: 'User linked to company', user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('[COMPANY_USERS_ERROR]', error);
    return NextResponse.json({ message: 'Failed to link user to company' }, { status: 500 });
  }
}