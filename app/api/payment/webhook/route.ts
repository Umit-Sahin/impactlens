import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
});

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook Error:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // ✅ Ödeme tamamlandıysa
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const userEmail = session.customer_email;

    if (userEmail) {
      await prisma.user.update({
        where: { email: userEmail },
        data: { hasActivePayment: true },
      });
      console.log(`✅ Payment marked as complete for ${userEmail}`);
    }
  }

  return new NextResponse('Webhook received', { status: 200 });
}
