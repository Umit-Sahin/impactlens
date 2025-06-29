// 📄 app/api/payment/checkout/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';

// ✅ Stripe nesnesini başlat (versiyon belirtmek iyi bir pratiktir)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    // 🔐 Oturum kontrolü ve kullanıcı doğrulama
    const session = await getServerSession(authOptions);
    if (!session || session.user.id !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 🔐 Ortam değişkenlerinin kontrolü
    if (!process.env.STRIPE_PRICE_ID || !process.env.NEXT_PUBLIC_BASE_URL) {
      console.error('Missing Stripe config');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    // ✅ Checkout oturumu oluştur
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: session.user.email!,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/onboarding/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/onboarding/payment`,
      metadata: {
        userId,
        plan: session.user.plan || 'UNKNOWN', // 🔍 Plan bilgisi varsa ekle
      },
    });

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (err: any) {
    console.error('Stripe Checkout error:', err);
    return NextResponse.json({ error: 'Checkout session failed' }, { status: 500 });
  }
}
