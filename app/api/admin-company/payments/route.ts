// 📄 app/api/admin-company/payments/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import prisma from '@lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { company: true },
  });

  if (!user || !user.companyId) {
    return NextResponse.json({ message: 'No company associated' }, { status: 403 });
  }

  const payments = await prisma.payment.findMany({
    where: {
      user: {
        companyId: user.companyId,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  

  return NextResponse.json(payments);
}
