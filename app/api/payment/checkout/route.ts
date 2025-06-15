// 📄 app/api/payment/checkout/route.ts

import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {

});

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL;

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: session.user.email!,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'ImpactLens Monthly Plan',
          },
          unit_amount: 9900, // $99.00
        },
        quantity: 1,
      },
    ],
    success_url: `${DOMAIN}/onboarding/success`,
    cancel_url: `${DOMAIN}/onboarding/payment`,
    metadata: {
      userId: session.user.id,
    },
  });

  return NextResponse.json({ url: stripeSession.url });
}
