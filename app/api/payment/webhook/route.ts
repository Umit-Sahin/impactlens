// 📄 app/api/payment/webhook/route.ts

// ============================================================
// Stripe webhook handler
// Dinlenen eventler:
// 1) checkout.session.completed → Ödeme tamamlandıysa hasActivePayment = true yap
// 2) payment_intent.payment_failed → Ödeme başarısız olduysa log kaydı oluştur + uyarı mekanizması hazırlanır
// 3) Diğer tüm eventler → PaymentLog tablosuna INFO olarak kaydedilir
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@lib/prisma';

// Stripe istemcisi (API versiyonu ile birlikte)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  // Stripe'ın ham body'den signature üretmesi için raw text gerekir
  const rawBody = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  // Signature doğrulama (güvenlik için zorunlu)
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('❌ Invalid Stripe signature:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Loglama fonksiyonu
  const logEvent = async (
    eventType: string,
    level: 'INFO' | 'ERROR',
    message: string
  ) => {
    await prisma.paymentLog.create({
      data: {
        eventType,
        level,
        message,
        createdAt: new Date(),
      },
    });
  };

  // Event türüne göre işlem
  try {
    switch (event.type) {
      // ✅ Ödeme başarılıysa, kullanıcıya hasActivePayment = true olarak işaretle
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userEmail = session.customer_email;

        if (userEmail) {
          await prisma.user.update({
            where: { email: userEmail },
            data: { hasActivePayment: true },
          });

          await logEvent(
            'checkout.session.completed',
            'INFO',
            `Payment marked as complete for ${userEmail}`
          );
        }

        break;
      }

      // ❌ Ödeme başarısız olduysa, logla ve bildirim sistemi kurmak için hazırla
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const userEmail = paymentIntent.receipt_email || 'unknown';

        await logEvent(
          'payment_intent.payment_failed',
          'ERROR',
          `Payment failed for ${userEmail} - Reason: ${paymentIntent.last_payment_error?.message || 'unknown'}`
        );

        // 🔔 TODO: Kullanıcıya e-posta bildirim sistemi burada entegre edilebilir

        break;
      }

      // Diğer tüm eventler sadece bilgi olarak loglanır
      default: {
        await logEvent(
          event.type,
          'INFO',
          `Unhandled Stripe event received: ${event.type}`
        );
        break;
      }
    }

    return new NextResponse('✅ Webhook processed', { status: 200 });
  } catch (err) {
    console.error('❌ Webhook handler error:', err);
    await logEvent(event.type, 'ERROR', `Handler crashed: ${err}`);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
