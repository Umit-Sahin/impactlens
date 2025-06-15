// 📄 app/api/admin/payments/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  const paymentId = params.id;

  try {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        user: {
          select: {
            name: true,
            surname: true,
            email: true,
            company: {
              select: {
                name: true,
                plan: true, // ✅ plan buradan alınır
              },
            },
          },
        },
      },
    });

    if (!payment) {
      return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
    }

    const history = await prisma.payment.findMany({
      where: { userId: payment.userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        createdAt: true,
        amount: true,
        cardLast4: true,
      },
    });

    return NextResponse.json({
      user: {
        name: payment.user.name,
        surname: payment.user.surname,
        email: payment.user.email,
        companyName: payment.user.company?.name ?? null,
        plan: payment.user.company?.plan ?? null,
      },
      payment: {
        amount: payment.amount,
        last4: payment.cardLast4,
        status: payment.status,
        lastPaymentDate: payment.createdAt,
      },
      history,
    });
  } catch (error) {
    console.error('[PAYMENT_DETAILS_ERROR]', error);
    return NextResponse.json(
      { message: 'Error fetching payment details' },
      { status: 500 }
    );
  }
}
