// app/api/admin/payments/route.ts
// ============================================================
// Bu API dosyası, admin panelindeki payments ekranı için
// 1) GET  → Tüm ödemeleri listeler  (yalnızca SUPER_ADMIN)
// 2) POST → Stripe paymentIntent oluşturur ve ödeme kaydeder
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import { stripe } from '@lib/stripe';

/* -----------------------------------------------------------
   GET /api/admin/payments
   - Amaç : Tüm ödemeleri listelemek
   - Yetki : Sadece SUPER_ADMIN rolü
----------------------------------------------------------- */

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const payments = await prisma.payment.findMany({
      include: {
        user: {
          select: {
            name: true,
            surname: true,
            email: true,
            company: { select: { name: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const formatted = payments.map((p) => ({
      id: p.id,
      name: p.user?.name || '',
      surname: p.user?.surname || '',
      email: p.user?.email || '',
      company: p.user?.company?.name || '-',
      amount: p.amount,
      cardLast4: p.cardLast4,
      status: p.status,
      lastPaymentDate: p.createdAt,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('[PAYMENTS_FETCH_ERROR]', error);
    return NextResponse.json(
      { error: 'Error fetching payments' },
      { status: 500 }
    );
  }
}

/* ------------------ POST: Yeni Ödeme Kaydet ------------------ */
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { email, amount } = await req.json();

  if (!email || !amount) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      receipt_email: email,
    });

    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        amount,
        currency: 'USD',
        status: 'PENDING',
        stripePaymentId: paymentIntent.id,
        cardLast4: null,
      },
    });

    return NextResponse.json({
      paymentId: payment.id,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('[PAYMENT_CREATE_ERROR]', error);
    return NextResponse.json(
      { error: 'Payment creation failed.' },
      { status: 500 }
    );
  }
}



