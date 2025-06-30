// 📄 File: app/api/admin/payments/route.ts
// ============================================================
// Admin paneli için Payments API
// 1) GET  → Tüm ödemeleri listeler (yalnızca SUPER_ADMIN erişebilir)
// 2) POST → Stripe üzerinden yeni bir paymentIntent oluşturur,
//           veritabanına ödeme kaydı ekler
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import { stripe } from '@lib/stripe';

/* -----------------------------------------------------------
   GET /api/admin/payments
   Amaç   : Admin panelinde tüm ödemeleri listelemek
   Yetki  : Sadece SUPER_ADMIN
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

    // Admin UI için şekillendirilmiş çıktı
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

/* -----------------------------------------------------------
   POST /api/admin/payments
   Amaç   : Admin panelinden manuel Stripe ödemesi başlatmak
   Yetki  : Sadece SUPER_ADMIN
   Girdi  : email (zorunlu), amount (zorunlu)
----------------------------------------------------------- */
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { email, amount } = await req.json();
  const numericAmount = parseFloat(amount);

  if (!email || isNaN(numericAmount) || numericAmount <= 0) {
    return NextResponse.json(
      { error: 'Missing or invalid required fields' },
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

    // Stripe paymentIntent oluştur (kart bilgisi kullanıcıdan alınacak)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(numericAmount * 100), // Stripe cent bazlı ister
      currency: 'usd',
      receipt_email: email,
    });

    // Veritabanına ödeme kaydı oluştur (şimdilik PENDING)
    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        amount: numericAmount,
        currency: 'USD',
        status: 'PENDING',
        stripePaymentId: paymentIntent.id,
        cardLast4: null,
        source: 'stripe',

      },
    });

    // Frontend'e clientSecret ile dön
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
